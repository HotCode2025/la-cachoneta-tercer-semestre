from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask import jsonify

from services.verduleria_service import VerduleriaService


app = Flask(__name__)

service = VerduleriaService()


@app.route("/")
def index():

    productos = service.obtener_productos()

    total_ventas = service.obtener_total_ventas()

    return render_template(
        "index.html",
        productos=productos,
        total_ventas=total_ventas
    )


@app.route("/agregar", methods=["GET","POST"])
def agregar_producto():
    if request.method == "POST":
        nombre = request.form.get("nombre", "").strip()
        precio_raw = request.form.get("precio", "")
        stock_raw = request.form.get("stock", "")

        if not nombre or not precio_raw or not stock_raw:
            return render_template("agregar.html", error="todos los campos son obligatorios", tipo="danger", nombre=nombre, precio=precio_raw, stock=stock_raw)

        if nombre.isdigit() or len(nombre) < 3:
            return render_template("agregar.html", error="El nombre del producto debe ser un texto válido (mínimo 3 caracteres y no pueden ser solo números).", tipo="danger", nombre=nombre, precio=precio_raw, stock=stock_raw)
        
        try:
            precio = float(precio_raw)
            stock = int(stock_raw)

            if precio <= 0 or stock < 0:
                return render_template("agregar.html", error="El precio y/o el stock deben ser mayores a 0.", tipo="warning",  nombre=nombre, precio=precio_raw, stock=stock_raw)
                
        except ValueError:
            return render_template("agregar.html", error="El precio y/o el stock deben ser numeros validos.", tipo="danger",  nombre=nombre, precio=precio_raw, stock=stock_raw)
        
        creado_con_exito = service.agregar_producto(nombre, precio, stock)

        if not creado_con_exito:
            return render_template("agregar.html", error=f"El producto '{nombre}' ya existe. Si querés cambiar su precio o stock, usá la opción de editar.", tipo="danger", nombre=nombre, precio=precio_raw, stock=stock_raw)

        service.agregar_producto(nombre, precio, stock)
        return redirect(url_for("index"))

    return render_template("agregar.html")

@app.route("/comprar")
def comprar_productos():
    todos_productos = service.obtener_productos()
    
    # Segmentación idéntica: 6 por página
    PER_PAGE = 6
    page = request.args.get('page', 1, type=int)
    total_productos = len(todos_productos)
    
    start = (page - 1) * PER_PAGE
    end = start + PER_PAGE
    productos_paginados = todos_productos[start:end]
    
    total_pages = (total_productos + PER_PAGE - 1) // PER_PAGE if total_productos > 0 else 1

    return render_template(
        "comprar.html",
        productos=productos_paginados,
        current_page=page,
        total_pages=total_pages,
        total_count=total_productos
    )

@app.route("/vender_lote", methods=["POST"])
def vender_lote():
    data = request.get_json()
    items = data.get("items", [])
    
    if not items:
        return jsonify({"success": False, "error": "El carrito está vacío."}), 400

    # Procesamos uno por uno en tu servicio existente
    for item in items:
        nombre = item.get("nombre")
        cantidad = int(item.get("cantidad"))
        
        # Validamos stock antes de procesar
        producto = service.buscar_producto(nombre)
        if not producto or producto.stock < cantidad:
            return jsonify({"success": False, "error": f"Stock insuficiente para {nombre}."}), 400

    # Si todos tienen stock, impactamos las ventas de manera definitiva
    for item in items:
        service.vender_producto(item["nombre"], int(item["cantidad"]))

    return jsonify({"success": True, "redirect": url_for("ventas")})

@app.route("/editar/<nombre>", methods=["GET", "POST"])
def editar_producto(nombre):
    if request.method == "POST":
        precio_raw = request.form.get("precio", "")
        stock_raw = request.form.get("stock", "")

        if not precio_raw or not stock_raw:
            return jsonify({"error": "Todos los campos son obligatorios.", "tipo": "danger"}), 400

        # Validación de tipos de datos y valores positivos
        try:
            precio = float(precio_raw)
            stock = int(stock_raw)

            if precio <= 0 or stock < 0:
                return jsonify({"error": "El precio debe ser mayor a 0 y el stock no puede ser negativo.", "tipo": "warning"}), 400
                
        except ValueError:
            return jsonify({"error": "El precio y el stock deben ser números válidos.", "tipo": "danger"}), 400

        # Si pasó todas las validaciones modifico el producto con éxito
        service.modificar_producto(nombre, precio, stock)
        
        # Le avisamos a JS que todo salió perfecto para que pueda redireccionar
        return jsonify({"success": True, "redirect": url_for("mostrar_productos")})

    producto = service.buscar_producto(nombre)
    if producto is None:
        return redirect(url_for("mostrar_productos"))

    return render_template("editar.html", producto=producto)


@app.route("/eliminar/<nombre>")
def eliminar_producto(nombre):

    service.eliminar_producto(nombre)

    return redirect(url_for("mostrar_productos"))


@app.route("/vender", methods=["POST"])
def vender_producto():

    nombre = request.form["nombre"]
    cantidad = int(request.form["cantidad"])

    service.vender_producto(
        nombre,
        cantidad
    )

    return redirect(url_for("index"))

@app.route("/productos")
def mostrar_productos():
    todos_productos = service.obtener_productos()
    
    # Configuración de paginación (6 por página)
    PER_PAGE = 6
    page = request.args.get('page', 1, type=int)
    total_productos = len(todos_productos)
    
    # Segmentación de la lista en porciones
    start = (page - 1) * PER_PAGE
    end = start + PER_PAGE
    productos_paginados = todos_productos[start:end]
    
    # Cálculo total de páginas (redondeo hacia arriba)
    total_pages = (total_productos + PER_PAGE - 1) // PER_PAGE if total_productos > 0 else 1

    return render_template(
        "productos.html",
        productos=productos_paginados,
        current_page=page,
        total_pages=total_pages,
        total_count=total_productos
    )

@app.route("/ventas")
def ventas():
    # 1. PEDIR LOS DATOS A LA BD
    # Llamamos al servicio que viaja a Cloud Firestore
    lista_ventas = service.obtener_ventas()
    
    # 2. CÁLCULO DE KPIs BÁSICOS
    total_acumulado = service.obtener_total_ventas()
    # Sacamos el ticket medio metiendo un "if" en una sola línea para evitar el error de división por cero si la BD está vacía
    ticket_medio = total_acumulado / len(lista_ventas) if lista_ventas else 0
    
    # 3. PROCESAMIENTO Y AGRUPACIÓN DE DATOS
    # Como Firestore nos devuelve documentos sueltos agrupamos manualmente por producto usando diccionarios de Python
    kg_por_producto = {}
    dinero_por_producto = {}
    
    for v in lista_ventas:
        # Usamos .get() con valores por defecto por si algún documento de la BD vino medio incompleto o corrupto
        prod = v.get("producto", "Desconocido").capitalize()
        cant = v.get("cantidad", 0)
        total_v = v.get("total", 0)
        
        # Acumulamos los Kg: si el producto no existe en el diccionario, .get(prod, 0) devuelve 0 y le suma la cantidad
        kg_por_producto[prod] = kg_por_producto.get(prod, 0) + cant
        # Acumulamos la plata recaudada por cada fruta/verdura de la misma manera
        dinero_por_producto[prod] = dinero_por_producto.get(prod, 0) + total_v

    # 4. ORDENAMIENTO (De Mayor a Menor para los gráficos de barras)
    # Convertimos los diccionarios en listas de tuplas y las ordenamos usando sorted()
    # key=lambda x: x[1] nos sirve para decirle a Python que ordene por el VALOR acumulado (los kg o la plata) y NO por la clave (el nombre)
    # reverse=True asegura que el más vendido quede primero en la lista
    
    # Gráfico de Kilogramos
    prod_kg_ordenados = sorted(kg_por_producto.items(), key=lambda x: x[1], reverse=True)
    # Separamos en dos listas limpias (Eje X: etiquetas, Eje Y: valores numéricos) usando "List Comprehension"
    grafico_kg_labels = [item[0] for item in prod_kg_ordenados]
    grafico_kg_valores = [item[1] for item in prod_kg_ordenados]

    # Gráfico de Dinero recaudado
    prod_dinero_ordenados = sorted(dinero_por_producto.items(), key=lambda x: x[1], reverse=True)
    grafico_dinero_labels = [item[0] for item in prod_dinero_ordenados]
    grafico_dinero_valores = [item[1] for item in prod_dinero_ordenados]

    # 5. LÓGICA DE PAGINACIÓN
    PER_PAGE = 4 # Mostramos de a 4 órdenes por página para no saturar la pantalla
    page = request.args.get('page', 1, type=int) # Agarramos el número de página de la URL (?page=2), si no hay nada, por defecto es 1
    total_ventas_count = len(lista_ventas)
    
    # Cortamos la lista usando "Slicing" de Python según los índices calculados
    start = (page - 1) * PER_PAGE
    end = start + PER_PAGE
    ventas_paginadas = lista_ventas[start:end]
    
    # Calculamos el total de páginas redondeando para arriba usando división entera "//"
    total_pages = (total_ventas_count + PER_PAGE - 1) // PER_PAGE if total_ventas_count > 0 else 1

    # 6. RENDERIZADO Y ENVÍO DE DATOS
    # Inyectamos todas las variables procesadas al template de Jinja2
    return render_template(
        "ventas.html",
        ventas=ventas_paginadas,
        total_ventas=total_acumulado,
        ticket_medio=ticket_medio,
        current_page=page,
        total_pages=total_pages,
        total_count=total_ventas_count,
        grafico_labels=grafico_kg_labels,
        grafico_valores=grafico_kg_valores,
        grafico_dinero_labels=grafico_dinero_labels,
        grafico_dinero_valores=grafico_dinero_valores
    )


@app.route("/stock-critico")
def stock_critico():

    productos = service.obtener_stock_critico(10)

    return render_template(
        "stock_critico.html",
        productos=productos
    )

if __name__ == "__main__":
    app.run(debug=True)
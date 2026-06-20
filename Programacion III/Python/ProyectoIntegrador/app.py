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
    lista_ventas = service.obtener_ventas()
    total_acumulado = service.obtener_total_ventas()
    ticket_medio = total_acumulado / len(lista_ventas) if lista_ventas else 0
    
    # Configuración de paginación (6 por página)
    PER_PAGE = 4
    page = request.args.get('page', 1, type=int)
    total_ventas_count = len(lista_ventas)
    
    # Segmentación de la lista en porciones
    start = (page - 1) * PER_PAGE
    end = start + PER_PAGE
    ventas_paginadas = lista_ventas[start:end]
    
    total_pages = (total_ventas_count + PER_PAGE - 1) // PER_PAGE if total_ventas_count > 0 else 1

    return render_template(
        "ventas.html",
        ventas=ventas_paginadas,
        total_ventas=total_acumulado,
        ticket_medio=ticket_medio,
        current_page=page,
        total_pages=total_pages,
        total_count=total_ventas_count
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
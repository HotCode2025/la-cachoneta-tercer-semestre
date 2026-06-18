from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for

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

        service.agregar_producto(nombre, precio, stock)
        return redirect(url_for("index"))

    return render_template("agregar.html")
    

@app.route("/comprar")
def comprar_productos():
    productos = service.obtener_productos()
    
    return render_template(
        "comprar.html",
        productos=productos
    )

@app.route("/inventario/editar")
def vista_editar_inventario():
    lista_productos = service.obtener_productos() 
    
    return render_template(
        "inventario.html", 
        productos=lista_productos, 
        accion="editar"
    )

@app.route("/inventario/eliminar")
def vista_eliminar_inventario():
    lista_productos = service.obtener_productos()
    
    return render_template(
        "inventario.html", 
        productos=lista_productos, 
        accion="eliminar"
    )

@app.route("/editar/<nombre>", methods=["GET", "POST"])
def editar_producto(nombre):
    if request.method == "POST":
        precio = float(request.form["precio"])
        stock = int(request.form["stock"])

        # Llama al método de tu servicio para actualizar en Firestore
        service.modificar_producto(nombre, precio, stock)

        return redirect(url_for("index"))

    # Llama al método de tu servicio para recuperar el producto actual
    producto = service.buscar_producto(nombre)
    
    # Control opcional por si intentan ingresar una URL de un producto que no existe
    if producto is None:
        return redirect(url_for("index"))

    return render_template(
        "editar.html",
        producto=producto
    )


@app.route("/eliminar/<nombre>")
def eliminar_producto(nombre):

    service.eliminar_producto(nombre)

    return redirect(url_for("index"))


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
    productos = service.obtener_productos()

    return render_template(
        "productos.html",
        productos=productos
    )

@app.route("/ventas")
def ventas():

    ventas = service.obtener_ventas()

    return render_template(
        "ventas.html",
        ventas=ventas
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
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


@app.route("/agregar", methods=["POST"])
def agregar_producto():

    nombre = request.form["nombre"]
    precio = float(request.form["precio"])
    stock = int(request.form["stock"])

    service.agregar_producto(
        nombre,
        precio,
        stock
    )

    return redirect(url_for("index"))

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
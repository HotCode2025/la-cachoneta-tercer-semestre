from firebase_config import db

from models.producto import Producto


class VerduleriaService:


    def agregar_producto(self, nombre, precio, stock):

        producto = Producto(
            nombre,
            precio,
            stock
        )

        db.collection("productos") \
          .document(nombre) \
          .set(producto.to_dict())


    def obtener_productos(self):

        productos = []

        docs = db.collection("productos").stream()

        for doc in docs:

            productos.append(
                Producto.from_dict(doc.to_dict())
            )

        return productos


    def buscar_producto(self, nombre):

        doc = db.collection("productos") \
                .document(nombre) \
                .get()

        if doc.exists:

            return Producto.from_dict(
                doc.to_dict()
            )

        return None


    def eliminar_producto(self, nombre):

        db.collection("productos") \
          .document(nombre) \
          .delete()


    def modificar_producto(self, nombre, precio, stock):

        db.collection("productos") \
          .document(nombre) \
          .update({
              "precio": precio,
              "stock": stock
          })


    def vender_producto(self, nombre, cantidad):

        ref = db.collection("productos") \
                .document(nombre)

        doc = ref.get()

        if not doc.exists:
            return False

        data = doc.to_dict()

        if data["stock"] < cantidad:
            return False

        nuevo_stock = data["stock"] - cantidad

        ref.update({
            "stock": nuevo_stock
        })

        total = data["precio"] * cantidad

        venta = {
            "producto": nombre,
            "cantidad": cantidad,
            "total": total
        }

        db.collection("ventas").add(venta)

        return True


    def obtener_ventas(self):

        ventas = []

        docs = db.collection("ventas").stream()

        for doc in docs:

            ventas.append(
                doc.to_dict()
            )

        return ventas


    def obtener_total_ventas(self):

        total = 0

        docs = db.collection("ventas").stream()

        for doc in docs:

            data = doc.to_dict()

            total += data["total"]

        return total


    def obtener_stock_critico(self, limite):

        productos = self.obtener_productos()

        return [
            p for p in productos
            if p.stock <= limite
        ]
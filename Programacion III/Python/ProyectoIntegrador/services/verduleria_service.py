from firebase_config import db

from models.producto import Producto


class VerduleriaService:


    def agregar_producto(self, nombre, precio, stock):
        if self.buscar_producto(nombre) is not None:
            return False  

        producto = Producto(
            nombre,
            precio,
            stock
        )

        db.collection("productos") \
          .document(nombre) \
          .set(producto.to_dict())
        
        return True 


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
        # db.collection("ventas").stream() viaja a Cloud Firestore (NoSQL)
        # y nos trae en tiempo real todos los documentos que hay cargados.
        docs = db.collection("ventas").stream()
        
        for doc in docs:
            # .to_dict() limpia los metadatos de Google y transforma
            # cada documento en un diccionario común de Python (clave: valor).
            ventas.append(doc.to_dict())
            
        return ventas

    def obtener_total_ventas(self):
        total = 0
        docs = db.collection("ventas").stream() # Volvemos a leer la colección
        
        for doc in docs:
            data = doc.to_dict()
            # Buscamos el campo "total" de cada venta y lo acumulamos
            total += data["total"]
            
        return total


    def obtener_stock_critico(self, limite):
        productos = self.obtener_productos()

        return [
            p for p in productos
            if p.stock <= limite
        ]
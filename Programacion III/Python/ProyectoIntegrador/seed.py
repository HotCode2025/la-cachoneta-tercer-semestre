from firebase_config import db


productos = [
    {"nombre": "manzana", "precio": 100, "stock": 50},
    {"nombre": "banana", "precio": 80, "stock": 30},
    {"nombre": "tomate", "precio": 120, "stock": 40},
    {"nombre": "papa", "precio": 60, "stock": 100},
    {"nombre": "anana", "precio": 90, "stock": 60},
    {"nombre": "coco", "precio": 200, "stock": 25},
]


for producto in productos:

    db.collection("productos") \
      .document(producto["nombre"]) \
      .set(producto)

print("Productos cargados")
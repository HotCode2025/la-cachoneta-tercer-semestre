class ManejoArchivos:
    def __init__(self, nombre):
        self.nombre = nombre
        self.archivo = None

    def __enter__(self):
        print("Obtenemos el recurso".center(50, "-"))
        self.archivo = open(self.nombre, "r", encoding="utf-8")
        return self.archivo

    def __exit__(self, tipo_excepcion, valor_excepcion, traza_error):
        print("Cerramos el recurso".center(50, "-"))
        if self.archivo:
            self.archivo.close()
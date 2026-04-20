archivo = open("Phyton/Leccion02/prueba.txt", "r", encoding='utf-8')

contenido = archivo.read()  # guardamos el contenido

print(contenido)

# anexamos información al archivo, copiamos a otro archivo
archivo2 = open("copia.txt", "a", encoding='utf-8')

archivo2.write(contenido)  # usamos el contenido guardado

archivo.close()
archivo2.close()

print("Archivo copiado exitosamente")
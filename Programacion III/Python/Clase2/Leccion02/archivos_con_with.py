#MANEJO DE ARCHIVOS CON WITH 
from ManejoArchivos import ManejoArchivos


#with open("prueba.txt", "r", encoding='utf-8') as archivo:
    #print(archivo.read())  # Leemos el contenido del archivo y lo mostramos

#No hace falta ni el try ni el finally, con with se encarga de cerrar el archivo automáticamente, incluso si ocurre un error.
#Utiliza diferentes metodos: __enter__ y __exit__.

with ManejoArchivos("Phyton/Leccion02/prueba.txt") as archivo:
    print(archivo.read())  # Leemos el contenido del archivo y lo mostramos
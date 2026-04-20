#Declaramos una variable
try:
    with open("prueba.txt", "w", encoding='utf-8') as archivo: #Abrimos el archivo en modo escritura, si no existe lo crea
        archivo.write("Programamos con diferentes tipos de archivos, ahora en txt.\n")
        archivo.write("Los acentos son importantes para las palabras\n")
        archivo.write("como por ejemplo: accion, ejecucion y producción.\n")
        archivo.write("Las letras son \n r de lectura, \n w de escritura, \n a de agregar, \n x de creación.\n")
        archivo.write("\n t es para textosm, \n b es para binarios.\n")
        archivo.write("Saludos a todos los que están aprendiendo a programar.\n")

        archivo.write("Con esto terminamos\n")
except Exception as e:
    print(e)  # Siempre que exista un error lo mostramos
finally:
    archivo.close()  # Cerramos el archivo para liberar recursos
# archivo.write("ESTO ES UN ERROR") 

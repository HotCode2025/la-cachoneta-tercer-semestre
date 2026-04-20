import os

class CatalogoPeliculas:
    ruta_archivo = 'peliculas.txt'
    
    @staticmethod
    def agregar_pelicula(pelicula):
        archivo = open(f'{CatalogoPeliculas.ruta_archivo}', 'a', encoding='utf8')
        archivo.write(f'- {pelicula}\n')
        archivo.close()
    
    @staticmethod
    def listar_peliculas():
        try:
            archivo = open(f'{CatalogoPeliculas.ruta_archivo}', 'r', encoding='utf8')
            print('\n')
            print('LISTA DE PELICULAS'.center(50, '-') + '\n')
            for linea in archivo:
                print(linea)
            archivo.close()
        except FileNotFoundError:
            print('\nEl archivo no ha sido encontrado')
        except Exception as e:
            print('\nHa ocurrido un error', e)

    @staticmethod
    def eliminar():
        try:
            os.remove(f'{CatalogoPeliculas.ruta_archivo}')
        except FileNotFoundError:
            print('\nEl archivo no ha sido encontrado')
        except Exception as e:
            print('\nHa ocurrido un error', e)
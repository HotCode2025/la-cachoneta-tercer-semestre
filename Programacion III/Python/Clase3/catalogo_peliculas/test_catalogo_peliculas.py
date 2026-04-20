from servicio.CatalogoPeliculas import CatalogoPeliculas
from dominio.Pelicula import Pelicula
i = 1

while i != 0:
  opcion = int(input('\n1) Agregar película\n2) Listar película\n3) Eliminar archivo de películas\n4) Salir\nDigite la opcion: '))
  match opcion:
    case 1:
      nuevaPelicula = Pelicula(str(input('\nIngrese el nombre de la pelicula: ')))
      CatalogoPeliculas.agregar_pelicula(nuevaPelicula)
    case 2:
      CatalogoPeliculas.listar_peliculas()
    case 3:
      CatalogoPeliculas.eliminar()
    case 4:
      i = 0
    case default:
      print('\nOpcion incorrecta')


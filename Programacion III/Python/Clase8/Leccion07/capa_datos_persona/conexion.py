import psycopg2 as bd
from logger_base import log
import sys

class Conexion:
  _DATABASE = "test_bd"
  _HOST = "127.0.0.1"
  _PORT = 5432
  _USERNAME = "agus_postgre"
  _PASSWORD = "admin"
  _conexion = None
  _cursor = None

  @classmethod
  def obtenerConexion(cls):
    if cls._conexion is None:
      try:
        cls._conexion = bd.connect(
          host=cls._HOST,
          user=cls._USERNAME,
          password=cls._PASSWORD,
          port=cls._PORT,
          database=cls._DATABASE,
        )
        log.debug(f'Conexión Exitosa: {cls._conexion}')
        return cls._conexion
      except Exception as e:
        log.error(f"Ocurrio un error: {e}")
        sys.exit()
    else:
      return cls._conexion

  @classmethod
  def obtenerCursor(cls):
    if cls._cursor is None:
      try:
        cls._cursor = cls.obtenerConexion().cursor()
        log.debug(f'Se abrió correctamente el cursor: {cls._cursor}')
        return cls._cursor
      except Exception as e:
        log.error(f"Ocurrio un error: {e}")
        sys.exit()
    else:
      return cls._cursor

  @classmethod
  def cerrar(cls):
    # Cerramos primero el cursor
    if cls._cursor is not None:
      try:
        cls._cursor.close()
        print("Cursor cerrado exitosamente")
        cls._cursor = None
      except Exception as e:
        print(f"Ocurrio un error al cerrar el cursor: {e}")

    # Luego cerramos la conexion
    if cls._conexion is not None:
      try:
        cls._conexion.close()
        print("Conexion cerrada exitosamente")
        cls._conexion = None
      except Exception as e:
        print(f"Ocurrio un error al cerrar la conexion: {e}")


if __name__ == '__main__':
  Conexion.obtenerConexion()
  Conexion.obtenerCursor()
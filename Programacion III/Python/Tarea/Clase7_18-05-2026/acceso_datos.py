import psycopg2

class Conexion:
  DATABASE = "test_bd"
  HOST = "127.0.0.1"
  PORT = 5432
  USERNAME = "agus_postgre"
  PASSWORD = "admin"
  conexion = None
  cursor = None

  @classmethod
  def obtener_conexion(cls):
    if cls.conexion is None:
      try:
        cls.conexion = psycopg2.connect(
          user=cls.USERNAME,
          password=cls.PASSWORD,
          host=cls.HOST,
          port=cls.PORT,
          database=cls.DATABASE,
        )
        print("Conexion exitosa")
      except Exception as e:
        print(f"Ocurrio un error al obtener la conexion: {e}")
      
    return cls.conexion

  @classmethod
  def obtener_cursor(cls):
    if cls.cursor is None:
      try:
        cls.cursor = cls.obtener_conexion().cursor()
        print("Cursor obtenido exitosamente")
      except Exception as e:
        print(f"Ocurrio un error al obtener el cursor: {e}")
      
    return cls.cursor

  @classmethod
  def cerrar(cls):
    # Cerramos primero el cursor
    if cls.cursor is not None:
      try:
        cls.cursor.close()
        print("Cursor cerrado exitosamente")
        cls.cursor = None
      except Exception as e:
        print(f"Ocurrio un error al cerrar el cursor: {e}")

    # Luego cerramos la conexion
    if cls.conexion is not None:
      try:
        cls.conexion.close()
        print("Conexion cerrada exitosamente")
        cls.conexion = None
      except Exception as e:
        print(f"Ocurrio un error al cerrar la conexion: {e}")


class Persona:
  def __init__(self, nombre=None, apellido=None, email=None, id_persona=None):
    self._id_persona = id_persona # esto solo es necesario a la hora de actualizar o eliminar un registro
    self._nombre = nombre
    self._apellido = apellido
    self._email = email

  def __str__(self):
    return f"Persona [nombre={self.nombre}, apellido={self.apellido}, email={self.email}]"

  # NOMBRE GETTER Y SETTER
  @property
  def nombre(self):
    return self._nombre
  @nombre.setter
  def nombre(self, nombre):
    self._nombre = nombre

  # APELLIDO GETTER Y SETTER
  @property
  def apellido(self):
    return self._apellido
  @apellido.setter
  def apellido(self, apellido):
    self._apellido = apellido
  
  # EMAIL GETTER Y SETTER
  @property
  def email(self):
    return self._email
  @email.setter
  def email(self, email):
    self._email = email
  

class PersonaDAO:
  SELECCIONAR = "SELECT id_persona, nombre, apellido, email FROM persona"
  INSERTAR = "INSERT INTO persona(nombre, apellido, email) VALUES (%s, %s, %s)"
  ACTUALIZAR = "UPDATE persona SET nombre = COALESCE(%s, nombre), apellido = COALESCE(%s, apellido), email = COALESCE(%s, email) WHERE id_persona = %s"
  ELIMINAR = "DELETE FROM persona WHERE id_persona = %s"

  @classmethod
  def seleccionar(cls):
    personas = []
    try:
      cursor = Conexion.obtener_cursor()
      query = 'SELECT * FROM persona'
      cursor.execute(query)
      registros = cursor.fetchall()
      for registro in registros:
        persona = Persona(id_persona=registro[0], nombre=registro[1], apellido=registro[2], email=registro[3])
        personas.append(persona)
      return personas
    except Exception as e:
      print(f'Ocurrio un error al seleccionar las personas: {e}')
    finally:
      Conexion.cerrar()
  
  @classmethod
  def insertar(cls, persona):
    try:
      conexion = Conexion.obtener_conexion()
      cursor = Conexion.obtener_cursor()
      valores = (persona.nombre, persona.apellido, persona.email)
      cursor.execute(cls.INSERTAR, valores)
      conexion.commit()
      print(f"Persona insertada: {persona}")
    except Exception as e:
      print(f"Ocurrio un error al insertar la persona: {e}")
    finally:
      Conexion.cerrar()

  @classmethod
  def actualizar(cls, persona):
    try:
      conexion = Conexion.obtener_conexion()
      cursor = Conexion.obtener_cursor()
      valores = (persona.nombre, persona.apellido, persona.email, persona._id_persona)
      cursor.execute(cls.ACTUALIZAR, valores)
      conexion.commit()
      print(f"Persona actualizada: {persona}")
    except Exception as e:
      print(f"Ocurrio un error al actualizar la persona: {e}")
    finally:
      Conexion.cerrar()
  
  @classmethod
  def eliminar(cls, persona):
    try:
      conexion = Conexion.obtener_conexion()
      cursor = Conexion.obtener_cursor()
      valores = (persona._id_persona,)
      cursor.execute(cls.ELIMINAR, valores)
      conexion.commit()
      print(f"Persona eliminada: {persona}")
    except Exception as e:
      print(f"Ocurrio un error al eliminar la persona: {e}")
    finally:
      Conexion.cerrar()

# Ahora vamos a testear que funcione

persona_sin_id = Persona(nombre="Agustin", apellido="Gonzalez", email="agonzalez@email.com")
persona_a_actualizar = Persona(nombre="Ramon", apellido="Ñuñez", email="rñuñez@email.com", id_persona=1)
persona_a_eliminar = Persona(id_persona=16)

# Insertamos una persona
PersonaDAO.insertar(persona_sin_id)

# Seleccionamos todas las personas
personas = PersonaDAO.seleccionar()
for persona in personas:
  print(persona)

# Actualizamos una persona
PersonaDAO.insertar(persona_a_actualizar)
persona_a_actualizar.nombre = "Don Ramon"
persona_a_actualizar.apellido = "Baldez"
persona_a_actualizar.email = "drbaldez@email.com"
PersonaDAO.actualizar(persona_a_actualizar)

# Eliminamos una persona
PersonaDAO.eliminar(persona_a_eliminar)

# Testado en la base de datos local y funciona correctamente
# Aclaracion, usamos la base de datos de las clases pasadas, por lo que ya teniamos la tabla creada y con algunos registros, por eso el id_persona 16 existe y se puede eliminar sin problemas.
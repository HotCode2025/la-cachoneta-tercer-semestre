## ¿Como desactivo el entorno virtual desde la terminal?

Para desactivar el entorno virtual tanto en windows como en linux desde la terminal solo se necesita insertar el siguiente comando: **deactivate**

>Obviamente esto solo funciona si el entorno virtual esta inicialmente activo y eso se puede corroborar si aparece "(.venv)" al inicio de la linea para escribir en la terminal. Algo como esto: `(.venv) PS D:\Facultad\la-cachoneta-tercer-semestre> ` (en Powershell)


## ¿Que es el DOM?

Las siglas de DOM son para Document Object Model, o en español Modelo de Objetos  del Documento. 

El DOM es una interfaz que permite que un script (como de JavaScript) sea capaz de interactuar con la estructura de una pagina web. El DOM convierte el codigo HTML a un objeto **VIVO** manipulable. 

>Es un objeto VIVO porque este es dinamico, vive en la memoria de tu computadora y este cambia constantemente, permitiendo que un script interactuee con este objeto en tiempo real

El DOM genera un Árbol de Nodos que representa la jerarquia de un documento HTML. Cada una de las etiquetas, atributos y fragmentos de texto se convierten en nodos, cada uno con su padre. Algunos nodos de ejemplo son:
* Document: Es el nodo raiz y de donde parte todo.
* Elements: Es el nodo que representa las etiquetas como `<div>, <h1>, <a>`.
* Text: Este nodo representa el contenido dentro de las etiquetas.
* Attributes: Este nodo representa los atributos de las etiquetas como `class, id o src`.

### Imagen de ejemplo del Arbol de Nodos
![image_alt]()

### Ejemplo de uso del DOM:
Si tenemos este HTML:
```
<button id="botonDeEjemplo">Clickea aquí</button>
```
Con el DOM podemos hacer que, por ejemplo en este caso, JavaScript sea capaz de encontrarlo y manipularlo:
```
const boton = document.getElementById('botonDeEjemplo');
boton.innerText = "Hiciste Click!";
boton.style.backgroundColor = "red";
```
En este ejemplo:
1. Accedimos al nodo del boton usando el DOM
2. Modificamos el texto del botón
3. Modificamos su estilo

Todo gracias al DOM.
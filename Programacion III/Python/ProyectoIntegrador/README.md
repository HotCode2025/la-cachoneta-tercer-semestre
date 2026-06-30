# 🍅 La Cachoneta - Gestión de Verdulería
### Proyecto Integrador - Programación III (Tercer Semestre)

¡Bienvenido al sistema de gestión de **La Cachoneta**!

Este proyecto es una aplicación web desarrollada para el **Proyecto Integrador del Tercer Semestre (Programación III)**. El sistema permite administrar de forma eficiente el inventario de productos, el stock crítico, las ventas y los roles de administración de una verdulería local, combinando la robustez de **Python** en el backend con una interfaz web limpia, ágil y moderna.

---

# 🚀 Características Principales

- 📊 **Panel de Administración Integral**
  - Visualización clara de métricas clave del negocio.
  - Cantidad total de productos.
  - Alertas de stock.
  - Control de caja.

- 🥬 **Gestión de Inventario Dinámica**
  - Alta de productos.
  - Baja de productos.
  - Modificación.
  - Consulta en tiempo real.

- ⚠️ **Alertas de Stock Crítico**
  - Indicadores visuales para productos con bajo stock.
  - Badges de alerta optimizados para facilitar la visualización.

- 📱 **Diseño Responsive**
  - Adaptado para escritorio.
  - Menú lateral fijo.
  - Menú hamburguesa para dispositivos móviles.

- 🧩 **Arquitectura Modular**
  - Uso de **Jinja2** para reutilizar componentes como:
    - Header
    - Navbar
    - Footer
    - Alertas

---

# 🛠️ Tecnologías Utilizadas

El proyecto fue desarrollado utilizando tecnologías nativas, priorizando una arquitectura limpia y escalable.

| Tecnología | Uso |
|------------|-----|
| Python | Backend |
| Flask | Framework Web |
| Jinja2 | Motor de Plantillas |
| HTML5 | Estructura |
| CSS3 | Diseño Responsive |
| Flexbox | Layout |
| CSS Grid | Distribución |
| Variables CSS | Paleta de colores |

---

# 📂 Estructura del Proyecto

```text
la-cachoneta/
│
├── app.py   # Archivo principal y rutas de Flask
│
├── firebase_config.py
|
├── requierments.txt
|
├── models/       
|    └── producto.py
|  
├── services/       
|    └── verduleria_service.py   
|
├── static/
│   ├── css/
│   │   ├── agregar.css
│   │   ├── comprar.css
│   │   ├── productos.css
│   │   ├── style.css
│   │   └── ventas.css
│   │
│   ├── icons/
│   │   ├── bin_icon.png
│   │   ├── buy-icon.png
│   │   └── edit-icon.png
│   │
│   ├── js/
│   │   ├── comprar.js
│   │   ├── main.js
│   │   └── productos.js
│   │
│   └── img/
│       └── logo-cachoneta.png
│
└── templates/
    ├── base.html
    ├── index.html
    ├── agregar.html
    ├── comprar.html
    ├── productos.html
    └── ventas.html
````

---

# 📦 Instalación

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/HotCode2025/la-cachoneta-tercer-semestre.git

cd la-cachoneta-tercer-semestre/Programacion\ III/Python/ProyectoIntegrador
```

---

## 2️⃣ Crear un entorno virtual

### Windows

```bash
python -m venv venv

.\venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## 3️⃣ Instalar las dependencias

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Ejecutar la aplicación

```bash
python app.py
```

---

## 🌐 Abrir en el navegador

Una vez iniciado el servidor, ingresar a:

```text
http://127.0.0.1:5000
```

---

# 🎨 Diseño y UX/UI

La interfaz fue completamente rediseñada para brindar una experiencia moderna, intuitiva y agradable.

## 🎨 Paleta de Colores

Se utilizan variables CSS para mantener una identidad visual consistente.

```css
--primary-color
--danger-color
--bg-body
```

---

## 📋 Tablas

* Bordes suaves.
* Espaciado uniforme.
* Hover sobre filas.
* Mejor legibilidad.

---

## 📱 Responsive

El proyecto incorpora un diseño adaptable que incluye:

* Sidebar fijo en escritorio.
* Menú hamburguesa.
* Overlay para dispositivos móviles.
* Navegación optimizada para pantallas pequeñas.

---

# 💡 Futuras Mejoras

* ✅ Login de usuarios.
* ✅ Gestión de clientes.
* ✅ Gestión de proveedores.
* ✅ Reportes PDF.
* ✅ Estadísticas de ventas.
* ✅ Base de datos SQL.
* ✅ API REST.

---

# 👥 Autores

### Equipo de Desarrollo

**Programación III**

- Enzo Ulloa
- Agustin Gonzalez
- Esteban Montenegro
- Ramiro Soria
- German Fratucello
- Emmanuel yapura

**Tercer Semestre - 2026**

---

# 📄 Licencia

Proyecto desarrollado con fines educativos para la materia **Programación III**.

---

```
¡No olvides dejar una ⭐ en el repositorio!
```

// static/js/productos.js
document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('actionDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const closeBtn = document.getElementById('closeDrawerBtn');
    const confirmBtn = document.getElementById('confirmDrawerBtn');
    const deleteLink = document.getElementById('drawerDeleteLink');
    const alertContainer = document.getElementById('drawerAlertContainer');
    
    const drawerImg = document.getElementById('drawerProductImg');
    const drawerName = document.getElementById('drawerProductName');
    
    const priceInput = document.getElementById('priceInput');
    const stockInput = document.getElementById('stockInput');

    const pricePlus = document.getElementById('pricePlusBtn');
    const priceMinus = document.getElementById('priceMinusBtn');
    const stockPlus = document.getElementById('stockPlusBtn');
    const stockMinus = document.getElementById('stockMinusBtn');

    let productoNombreActual = "";

    // Función unificada para rellenar los datos de los inputs del formulario
    const cargarDatosFormulario = (row) => {
        alertContainer.innerHTML = ""; 

        productoNombreActual = row.getAttribute('data-nombre'); 
        const precio = parseFloat(row.getAttribute('data-precio'));
        const stock = parseInt(row.getAttribute('data-stock'));
        const imgName = productoNombreActual.toLowerCase().replace(/ /g, '_');

        drawerName.innerText = productoNombreActual;
        priceInput.value = precio;
        stockInput.value = stock;
        
        deleteLink.href = `/eliminar/${encodeURIComponent(productoNombreActual)}`;
        
        drawerImg.src = `/static/img/${imgName}.png`;
        drawerImg.onerror = () => { drawerImg.src = '/static/img/cachoneta.png'; };
        
        drawer.classList.add('open');
    };

    // 1. Interrupción en mobile (click en toda la fila)
    document.querySelectorAll('.product-row').forEach(row => {
        row.addEventListener('click', (e) => {
            if (e.target.closest('.action-btn')) return; 

            if (window.innerWidth < 768) {
                cargarDatosFormulario(row);
            }
        });
    });

    // 2. Interrupción en Desktop / Tablet (click únicamente en el lápiz ✏️)
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = btn.closest('.product-row');
            if (row) {
                cargarDatosFormulario(row);
            }
        });
    });

    // Controles de botones más y menos
    pricePlus.addEventListener('click', () => { priceInput.value = parseFloat(priceInput.value) + 10; });
    priceMinus.addEventListener('click', () => {
        priceInput.value = parseFloat(priceInput.value) - 10;
    });

    stockPlus.addEventListener('click', () => { stockInput.value = parseInt(stockInput.value) + 1; });
    stockMinus.addEventListener('click', () => {
        stockInput.value = parseInt(stockInput.value) - 1;
    });

    // Enviar formulario por POST a Flask e interceptar el JSON de error de validación
    confirmBtn.addEventListener('click', () => {
        alertContainer.innerHTML = ""; 

        const formData = new FormData();
        formData.append('precio', priceInput.value);
        formData.append('stock', stockInput.value);

        fetch(`/editar/${encodeURIComponent(productoNombreActual)}`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(res => {
            if (res.status === 200 && res.body.success) {
                window.location.href = res.body.redirect;
            } else {
                const tipoIcono = res.body.tipo === 'danger' ? '🛑' : '⚠️';
                alertContainer.innerHTML = `
                    <div class="alert alert-${res.body.tipo}">
                        <span class="alert-icon">${tipoIcono}</span>
                        <div class="alert-message">${res.body.error}</div>
                    </div>`;
            }
        })
        .catch(error => {
            console.error("Error al guardar:", error);
            alertContainer.innerHTML = `
                <div class="alert alert-danger">
                    <span class="alert-icon">🛑</span>
                    <div class="alert-message">Error de comunicación con el servidor. Inténtalo de nuevo.</div>
                </div>`;
        });
    });

    const closeDrawer = () => {
        drawer.classList.remove('open');
        alertContainer.innerHTML = "";
    };
    overlay.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('click', closeDrawer);
});
// static/js/comprar.js
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cachoneta_cart')) || [];
    
    const cartItemsList = document.getElementById('cartItemsList');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryIva = document.getElementById('summaryIva');
    const summaryTotal = document.getElementById('summaryTotal');
    const checkoutBtn = document.getElementById('confirmCheckoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const alertContainer = document.getElementById('carritoAlertContainer');
    
    // Elementos del control del Drawer
    const carritoDrawer = document.getElementById('carritoDrawer');
    const openCartBtn = document.getElementById('openCartDrawerBtn');
    const closeCartBtn = document.getElementById('closeCartDrawerBtn');
    const carritoOverlay = document.getElementById('carritoOverlay');
    const floatingCartBadge = document.getElementById('floatingCartBadge');

    const updateBadgeCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
        if (floatingCartBadge) {
            floatingCartBadge.innerText = totalItems;
        }
    };

    const renderCart = () => {
        cartItemsList.innerHTML = "";
        alertContainer.innerHTML = "";

        updateBadgeCount();

        if (cart.length === 0) {
            cartItemsList.innerHTML = `<div class="cart-empty-message">El carrito está vacío</div>`;
            summarySubtotal.innerText = "$0.00";
            summaryIva.innerText = "$0.00";
            summaryTotal.innerText = "$0.00";
            return;
        }

        let subtotal = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.precio * item.cantidad;
            subtotal += itemTotal;

            const node = document.createElement('div');
            node.className = "cart-item-node";
            node.innerHTML = `
                <div>
                    <div class="cart-node-title">${item.nombre}</div>
                    <div class="cart-node-meta">${item.cantidad} kg x $${item.precio}</div>
                </div>
                <div class="cart-node-right">
                    <span class="cart-node-total">$${itemTotal.toFixed(2)}</span>
                    <button class="btn-remove-node" data-index="${index}">🗑</button>
                </div>
            `;
            cartItemsList.appendChild(node);
        });

        const iva = subtotal * 0.10;
        const total = subtotal + iva;

        summarySubtotal.innerText = `$${subtotal.toFixed(2)}`;
        summaryIva.innerText = `$${iva.toFixed(2)}`;
        summaryTotal.innerText = `$${total.toFixed(2)}`;
    };

    // Agregar producto al carrito
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('.comprar-product-row');
            const nombre = row.getAttribute('data-nombre');
            const precio = parseFloat(row.getAttribute('data-precio'));
            const stockMax = parseInt(row.getAttribute('data-stock'));
            const qtyInput = row.querySelector('.qty-selector-input');
            const cantidadSolicitada = parseInt(qtyInput.value);

            if (isNaN(cantidadSolicitada) || cantidadSolicitada < 1) return;

            const existingItem = cart.find(item => item.nombre === nombre);
            const cantidadEnCarrito = existingItem ? existingItem.cantidad : 0;

            if (cantidadEnCarrito + cantidadSolicitada > stockMax) {
                alertContainer.innerHTML = `<div class="alert alert-danger">No puedes añadir más unidades de las disponibles.</div>`;
                // Si es mobile y salta error, abrimos el drawer para que lo vea
                if (window.innerWidth < 1024) carritoDrawer.classList.add('open');
                return;
            }

            if (existingItem) {
                existingItem.browse = true;
                existingItem.cantidad += cantidadSolicitada;
            } else {
                cart.push({ nombre, precio, cantidad: cantidadSolicitada });
            }

            localStorage.setItem('cachoneta_cart', JSON.stringify(cart));
            qtyInput.value = 1; 
            renderCart();
        });
    });

    // Remover elemento
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove-node')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cachoneta_cart', JSON.stringify(cart));
            renderCart();
        }
    });

    // Vaciar carrito
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cachoneta_cart');
        renderCart();
    });

    // Controladores de eventos de apertura y cierre del Drawer en Mobile/Tablet
    if (openCartBtn) openCartBtn.addEventListener('click', () => carritoDrawer.classList.add('open'));
    
    const closeDrawer = () => carritoDrawer.classList.remove('open');
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeDrawer);
    if (carritoOverlay) carritoOverlay.addEventListener('click', closeDrawer);

    // Enviar lote completo a Flask
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;

        fetch('/vender_lote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                cart = [];
                localStorage.removeItem('cachoneta_cart');
                window.location.href = data.redirect; 
            } else {
                alertContainer.innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
            }
        })
        .catch(() => {
            alertContainer.innerHTML = `<div class="alert alert-danger">Error de comunicación.</div>`;
        });
    });

    renderCart();
});
document.addEventListener('DOMContentLoaded', function () {

  const mobileBtn = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      if (mainNav.style.display === 'flex') mainNav.style.display = '';
      else {
        mainNav.style.display = 'flex';
        mainNav.style.flexDirection = 'column';
        mainNav.style.background = '#0b0b0b';
        mainNav.style.padding = '10px';
        mainNav.style.position = 'absolute';
        mainNav.style.right = '20px';
        mainNav.style.top = '72px';
        mainNav.style.borderRadius = '6px';
      }
    });
  }

  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchHeader');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = (searchInput.value || '').trim();
      if (!q) {
        alert('Ingresa un término para buscar.');
        return;
      }
      alert('Buscando: ' + q);
      searchInput.value = '';
    });
  }


  const newsletterForm = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('emailInput');
  const privacyCheck = document.getElementById('privacyCheck');
  const subscribeMsg = document.getElementById('subscribeMsg');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      subscribeMsg.textContent = '';
      const email = (emailInput.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) {
        subscribeMsg.style.color = '#ff8a8a';
        subscribeMsg.textContent = 'Ingresa un email válido.';
        return;
      }
      if (!privacyCheck.checked) {
        subscribeMsg.style.color = '#ff8a8a';
        subscribeMsg.textContent = 'Debes aceptar la política de privacidad.';
        return;
      }
      subscribeMsg.style.color = '#9ff39f';
      subscribeMsg.textContent = '¡Gracias! Te has suscrito correctamente.';
      emailInput.value = '';
      privacyCheck.checked = false;
    });
  }


  const cartBtn = document.getElementById('cartBtn');
  const cartCountEl = document.getElementById('cartCount');
  const cartPanel = document.getElementById('cartPanel');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('subtotal');
  const buyNowBtn = document.getElementById('buyNowBtn');
  const closePanelBtn = document.getElementById('closeCartPanel');

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let descuentoAplicado = false;

  document.querySelectorAll('.product-card').forEach((card) => {
    const btn = card.querySelector('.addCart');
    btn.addEventListener('click', () => {
      const nombre = card.querySelector('h3').textContent;
      const precioText = card.querySelector('.price').textContent.replace(/[^\d\.]/g,'');
      const precio = parseFloat(precioText);
      const imagen = card.querySelector('img').src;

      
      const existing = carrito.find(p => p.nombre === nombre);
      if (existing) {
        existing.cantidad = (existing.cantidad || 1) + 1;
      } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
      }


      localStorage.setItem('carrito', JSON.stringify(carrito));

    
      actualizarCarrito();

  
      btn.textContent = 'Agregado ✓';
      setTimeout(() => btn.textContent = 'Agregar', 900);
    });
  });

  function actualizarCarrito() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    carrito.forEach((p, i) => {
      subtotal += p.precio * (p.cantidad || 1);

      const item = document.createElement('div');
      item.classList.add('cart-item');
      item.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}">
        <div>
          <h4>${p.nombre}</h4>
          <p>Cantidad: ${p.cantidad || 1}</p>
          <p>S/${(p.precio * (p.cantidad || 1)).toFixed(2)}</p>
        </div>
        <button class="removeBtn" data-index="${i}">✕</button>
      `;
      cartItemsContainer.appendChild(item);
    });

    if (subtotalEl) subtotalEl.textContent = `S/${subtotal.toFixed(2)}`;
    if (cartCountEl) cartCountEl.textContent = carrito.reduce((acc, i) => acc + (i.cantidad || 1), 0);
    if (cartPanel) cartPanel.classList.remove('hidden');

  
    document.querySelectorAll('.removeBtn').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = e.target.dataset.index;
        carrito.splice(i, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
      });
    });
  }

  actualizarCarrito();


  const applyCouponBtn = document.getElementById('applyCoupon');
  const couponInput = document.getElementById('couponInput');
  const totalEl = document.getElementById('total');

  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = couponInput.value.trim().toUpperCase();
      if (descuentoAplicado) {
        alert("⚠️ Ya aplicaste un cupón de descuento.");
        return;
      }

      let subtotal = carrito.reduce((acc, i) => acc + (i.precio * (i.cantidad || 1)), 0);
      let descuento = 0;

      if (code === "DESCUENTO10") descuento = subtotal * 0.10;
      else if (code === "DESCUENTO20") descuento = subtotal * 0.20;
      else {
        alert("❌ Cupón inválido. Intenta con DESCUENTO10 o DESCUENTO20.");
        return;
      }

      descuentoAplicado = true;
      alert(`✅ Cupón válido, ${descuento === subtotal*0.10 ? 10 : 20}% de descuento aplicado.`);
      totalEl.textContent = `S/${(subtotal - descuento).toFixed(2)}`;
    });
  }


  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('¡Compra finalizada! Gracias por tu compra.');
      localStorage.removeItem('carrito');
      window.location.href = 'index.html';
    });
  }

  
  if (cartBtn) cartBtn.addEventListener('click', () => cartPanel.classList.toggle('hidden'));
  if (closePanelBtn) closePanelBtn.addEventListener('click', () => cartPanel.classList.add('hidden'));
});

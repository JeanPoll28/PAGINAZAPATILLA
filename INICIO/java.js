
const applyCouponBtn = document.getElementById("applyCoupon");
const couponInput = document.getElementById("couponInput");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const summaryDiv = document.querySelector(".summary");


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const productsDivs = summaryDiv.querySelectorAll(".product");
productsDivs.forEach(div => div.remove());


carrito.forEach(item => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}" width="60" />
    <div>
      <p><strong>${item.nombre}</strong><br />Cantidad: ${item.cantidad}</p>
      <p>S/${(item.precio * item.cantidad).toFixed(2)}</p>
    </div>
  `;
  summaryDiv.insertBefore(div, summaryDiv.querySelector(".apply-coupon"));
});


let subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
subtotalEl.textContent = `S/${subtotal.toFixed(2)}`;
totalEl.textContent = `S/${subtotal.toFixed(2)}`;

let descuentoAplicado = false;

applyCouponBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const code = couponInput.value.trim().toUpperCase();

  if (descuentoAplicado) {
    alert("⚠️ Ya aplicaste un cupón de descuento.");
    return;
  }

  let descuento = 0;

  if (code === "DESCUENTO10") {
    descuento = subtotal * 0.10;
    descuentoAplicado = true;
    alert("✅ Cupón válido, 10% de descuento aplicado.");
  } else if (code === "DESCUENTO20") {
    descuento = subtotal * 0.20;
    descuentoAplicado = true;
    alert("✅ Cupón válido, 20% de descuento aplicado.");
  } else {
    alert("❌ Cupón inválido. Intenta con DESCUENTO10 o DESCUENTO20.");
    return;
  }

  const totalConDescuento = subtotal - descuento;
  totalEl.textContent = `S/${totalConDescuento.toFixed(2)}`;
});

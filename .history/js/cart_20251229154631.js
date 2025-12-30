// cart.js — robust cart with quantities + normalization

// load and normalize cart from localStorage
function loadCart() {
    const raw = JSON.parse(localStorage.getItem("cart")) || [];
    const normalized = [];

    raw.forEach(item => {
        // if item is a string (old format), convert to object
        if (typeof item === "string") {
            const existing = normalized.find(i => i.name === item);
            if (existing) existing.quantity += 1;
            else normalized.push({ name: item, quantity: 1 });
            return;
        }

        // if item is object
        if (typeof item === "object" && item !== null) {
            const name = item.name || item.title || item.label;
            const qty = Number(item.quantity) || 1;
            const existing = normalized.find(i => i.name === name);
            if (existing) existing.quantity += qty;
            else normalized.push({ name, quantity: qty });
            return;
        }
    });

    return normalized;
}

let cart = loadCart();
saveCart();

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productName) {
    if (!productName) return;
    const existing = cart.find(i => i.name === productName);
    if (existing) existing.quantity += 1;
    else cart.push({ name: productName, quantity: 1 });

    saveCart();
    alert(productName + " added to cart");
}

function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;
    const total = cart.reduce((s, i) => s + (Number(i.quantity) || 0), 0);
    countEl.innerText = total;
}

function renderCartItems() {
    const container = document.getElementById("cartItems");
    if (!container) return;

    if (!cart.length) {
        container.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
        return;
    }

    container.innerHTML = cart.map((item, idx) => {
        const safeName = escapeHtml(item.name);
        const qty = Number(item.quantity) || 0;
        return `
      <div class="cart-item" data-index="${idx}">
        <p class="cart-item-name">${safeName} <span class="cart-item-qty">× ${qty}</span></p>
        <div class="cart-item-actions">
          <button class="decrease-btn" onclick="changeQty(${idx}, -1)">−</button>
          <button class="increase-btn" onclick="changeQty(${idx}, 1)">+</button>
          <button class="remove-btn" onclick="removeItem(${idx})">Remove</button>
        </div>
      </div>
    `;
    }).join("");
}

function changeQty(index, delta) {
    if (typeof index !== "number" || !cart[index]) return;
    cart[index].quantity = Math.max(0, (Number(cart[index].quantity) || 0) + delta);
    if (cart[index].quantity === 0) {
        cart.splice(index, 1);
    }
    saveCart();
    renderCartItems();
}

function removeItem(index) {
    if (typeof index !== "number" || !cart[index]) return;
    cart.splice(index, 1);
    saveCart();
    renderCartItems();
}

function checkoutWhatsApp() {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  const phone = "2347042424239";

  let message = "Hello, I want to order the following products:\n\n";

  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.name} (x${item.quantity})\n`;
  });

  const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}


// escape simple HTML to avoid injection when rendering
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Init: update counter and render cart page if on it
updateCartCount();
if (document.getElementById("cartItems")) {
    renderCartItems();
}

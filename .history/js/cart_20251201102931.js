// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart (called from product.html)
function addToCart(productName) {
    // Always save as object for consistency
    cart.push({ name: productName });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(productName + " added to cart!");
    updateCartCount();
}

// Update cart count if icon exists
function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) count.innerText = cart.length;
}

// Display cart items in cart.html
if (document.getElementById("cartItems")) {
    let container = document.getElementById("cartItems");

    if (cart.length === 0) {
        container.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
    } else {
        container.innerHTML = cart
            .map((item, index) => {
                let name = item.name || item; // support old string items
                return `
                    <div class="cart-item">
                        <p>${name}</p>
                        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                    </div>
                `;
            })
            .join("");
    }
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// WhatsApp Checkout
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "Hello, I want to order the following products:%0A%0A";

    cart.forEach((item, i) => {
        let name = item.name || item;
        message += `${i + 1}. ${name}%0A`;
    });

    window.open(
        "https://wa.me/2347042424239?text=" + message,
        "_blank"
    );
}

// Update cart count on load (for product.html)
updateCartCount();

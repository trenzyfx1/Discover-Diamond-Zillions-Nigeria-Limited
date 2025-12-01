// Load the cart from localStorage (now objects with name + quantity)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart (with quantity)
function addToCart(productName) {
    let existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(productName + " added to cart!");
}

// Display cart items in cart.html
if (document.getElementById("cartItems")) {
    let container = document.getElementById("cartItems");

    if (cart.length === 0) {
        container.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
    } else {
        container.innerHTML = cart
            .map(item => `
                <div class="cart-item">
                    <p>${item.name} × ${item.quantity}</p>
                    <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
                </div>
            `)
            .join("");
    }
}

// Remove item
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
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

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (x${item.quantity})%0A`;
    });

    window.open(
        "https://wa.me/2347042424239?text=" + message,
        "_blank"
    );
}

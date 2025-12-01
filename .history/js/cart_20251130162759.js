// Load the cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(productName) {
    cart.push(productName);
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
                    <p>${item}</p>
                    <button class="remove-btn" onclick="removeItem('${item}')">Remove</button>
                </div>
            `)
            .join("");
    }
}

// Remove item from cart
function removeItem(name) {
    cart = cart.filter(item => item !== name);
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
        message += (index + 1) + ". " + item + "%0A";
    });

    window.open(
        "https://wa.me/2347042424239?text=" + message,
        "_blank"
    );
}

// Simple cart system – front-end only (no backend)

// Auto year in footer
document.getElementById("year").textContent = new Date().getFullYear();

const cart = [];
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");

const cartEl = document.getElementById("cart");
const openCartBtn = document.getElementById("open-cart");
const closeCartBtn = document.getElementById("close-cart");
const checkoutBtn = document.getElementById("checkout-btn");

// Open / close cart
openCartBtn.addEventListener("click", () => cartEl.classList.add("open"));
closeCartBtn.addEventListener("click", () => cartEl.classList.remove("open"));

// Add to cart from buttons
function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart, .hero-card-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price, 10) || 0;
      addToCart(name, price);
    });
  });
}

function addToCart(name, price) {
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
}

function removeFromCart(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  cartItemsEl.innerHTML = "";

  let total = 0;
  let totalCount = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
    totalCount += item.qty;

    const li = document.createElement("li");
    li.className = "cart-item";

    li.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">Qty: ${item.qty}</div>
      </div>
      <div class="cart-item-price">₹${item.price * item.qty}</div>
      <button class="remove-btn">x</button>
    `;

    li.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(item.name);
    });

    cartItemsEl.appendChild(li);
  });

  cartTotalEl.textContent = `₹${total}`;
  cartCountEl.textContent = totalCount;
}

// Checkout demo
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("This is a demo checkout. In a real app, payment gateway will be here.");
});

// Simple category filter (just visual)
const categoryButtons = document.querySelectorAll(".category-btn");
const cards = document.querySelectorAll(".card[data-category]");

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.textContent.trim();
    cards.forEach((card) => {
      const cardCat = card.dataset.category;
      if (category === "All" || cardCat === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Init
setupAddToCartButtons();

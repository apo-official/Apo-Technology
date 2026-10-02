const categoryButton = document.getElementById("categoryButton");
const categoryMenu = document.getElementById("categoryMenu");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const productCards = [...document.querySelectorAll(".product-card")];
const cartCount = document.getElementById("cartCount");
const savedCount = document.getElementById("savedCount");
const resultText = document.getElementById("resultText");
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let currentFilter = "all";
let cart = [];
let saved = 0;

function openCategories() {
  categoryMenu.classList.toggle("show");
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  productCards.forEach(card => {
    const name = (card.dataset.name || "").toLowerCase();
    const category = card.dataset.category || "";
    const matchesText = !query || name.includes(query);
    const matchesCategory = currentFilter === "all" || category === currentFilter;
    const show = matchesText && matchesCategory;
    card.style.display = show ? "" : "none";
    if (show) visible += 1;
  });

  resultText.textContent = `${visible} product${visible === 1 ? "" : "s"} shown`;
}

function setFilter(filter) {
  currentFilter = filter;
  searchInput.value = "";
  categoryMenu.classList.remove("show");
  applyFilters();
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function parsePrice(card) {
  const text = card.querySelector(".price-row strong")?.textContent || "0";
  const value = Number(text.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function updateCart() {
  cartCount.textContent = String(cart.length);
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty">Your cart is empty.</p>';
    cartTotal.textContent = "0₾";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const row = document.createElement("div");
    row.className = "cart-line";
    row.innerHTML = `<div><b>${item.name}</b><br><span>${item.price.toLocaleString()}₾</span></div><button type="button" data-remove="${index}">REMOVE</button>`;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = `${total.toLocaleString()}₾`;
}

function showCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
}

function hideCart() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
}

categoryButton?.addEventListener("click", openCategories);
searchButton?.addEventListener("click", applyFilters);
searchInput?.addEventListener("input", applyFilters);
searchInput?.addEventListener("keydown", e => {
  if (e.key === "Enter") applyFilters();
});

document.addEventListener("click", e => {
  if (categoryMenu && categoryButton && !categoryMenu.contains(e.target) && !categoryButton.contains(e.target)) {
    categoryMenu.classList.remove("show");
  }
});

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

document.querySelectorAll("[data-nav-filter]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    setFilter(link.dataset.navFilter);
  });
});

document.querySelectorAll(".heart").forEach(button => {
  button.addEventListener("click", () => {
    const active = button.classList.toggle("saved");
    button.textContent = active ? "♥" : "♡";
    saved += active ? 1 : -1;
    saved = Math.max(0, saved);
    savedCount.textContent = String(saved);
  });
});

document.querySelectorAll(".cart-btn:not(.disabled)").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    cart.push({ name: card.dataset.name, price: parsePrice(card) });
    updateCart();
    button.textContent = "ADDED ✓";
    setTimeout(() => (button.textContent = "ADD TO CART"), 850);
  });
});

document.querySelectorAll(".swatch").forEach(swatch => {
  swatch.addEventListener("click", () => {
    const group = swatch.closest(".swatches");
    group.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
    swatch.classList.add("active");
    const card = swatch.closest(".product-card");
    const variant = card.querySelector(".variant");
    if (variant && swatch.title) variant.textContent = swatch.title;
  });
});

cartButton?.addEventListener("click", showCart);
closeCart?.addEventListener("click", hideCart);
overlay?.addEventListener("click", hideCart);
cartItems?.addEventListener("click", e => {
  const button = e.target.closest("[data-remove]");
  if (!button) return;
  cart.splice(Number(button.dataset.remove), 1);
  updateCart();
});

document.getElementById("shopNow")?.addEventListener("click", () => setFilter("iphone"));
document.getElementById("viewDeals")?.addEventListener("click", () => document.getElementById("deals").scrollIntoView({ behavior: "smooth" }));
document.getElementById("dealShopButton")?.addEventListener("click", () => document.getElementById("products").scrollIntoView({ behavior: "smooth" }));

updateCart();
applyFilters();
console.log("APO Technology loaded successfully.");

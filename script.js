// ------------------ SIGNUP ------------------
function signup() {
  const user = document.getElementById("signupUser").value;
  const pass = document.getElementById("signupPass").value;

  if (!user || !pass) {
    alert("Please fill all fields");
    return;
  }

  if (localStorage.getItem("user_" + user)) {
    alert("Username already exists");
    return;
  }

  localStorage.setItem("user_" + user, pass);
  alert("Account created! Please login.");
  window.location.href = "login.html";
}

// ------------------ LOGIN ------------------
function login() {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  if (!user || !pass) {
    alert("Please fill all fields");
    return;
  }

  const storedPass = localStorage.getItem("user_" + user);

  if (storedPass === pass) {
    localStorage.setItem("loggedInUser", user);
    window.location.href = "shop.html";
  } else {
    alert("Invalid username or password");
  }
}

// ------------------ LOGOUT ------------------
function logout() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

// ------------------ ADD TO CART ------------------
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart");
}

// ------------------ SHOW CART IN SUMMARY ------------------
function showCart() {
  const cartContainer = document.getElementById("cartContainer");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>No items in cart.</p>";
    return;
  }

  let html = "<ul>";
  let total = 0;
  cart.forEach(item => {
    html += `<li>${item.name} - ₹${item.price}</li>`;
    total += item.price;
  });
  html += `</ul><h3>Total: ₹${total}</h3>`;
  cartContainer.innerHTML = html;
}

// ------------------ PAY NOW ------------------
function payNow() {
  alert("Payment Successful!");
  localStorage.removeItem("cart");
  window.location.href = "success.html";
}

// ------------------ AUTO RUN SHOW CART IF SUMMARY PAGE ------------------
if (window.location.pathname.endsWith("summary.html")) {
  showCart();
}

// ------------------ PROTECT SHOP/SUMMARY PAGES ------------------
const protectedPages = ["shop.html", "summary.html"];
const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage)) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
  }
}
// Task 1: User Authentication with Cookies
document.getElementById('loginButton').addEventListener('click', function(e) {
  e.preventDefault();
  document.cookie = "authToken=user123; expires=Fri, 31 Dec 2024 12:00:00 UTC; Secure; HttpOnly; path=/";
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('logoutButton').style.display = 'block';
});

document.getElementById('logoutButton').addEventListener('click', function() {
  document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.getElementById('logoutButton').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
});

// Task 2: Theme Preferences with Local Storage
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

document.getElementById('toggleTheme').addEventListener('click', function() {
  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  document.body.classList.remove(currentTheme);
  document.body.classList.add(newTheme);
});

// Task 3: Session-Specific Shopping Cart
function updateCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const cartItemsList = document.getElementById('cartItems');
  cartItemsList.innerHTML = "";
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.product} (x${item.quantity})`;
    cartItemsList.appendChild(listItem);
  });
}

document.getElementById('addToCart').addEventListener('click', function() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push({ product: "Book", quantity: 1 });
  sessionStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
});

updateCart();

// Task 4: Security Implementation - Input Sanitization and CSRF Token
document.getElementById('csrfForm').addEventListener('submit', function(e) {
  e.preventDefault();  // Prevent form submission to handle in JS
  
  const userInput = document.getElementById('userInput').value;
  const sanitizedInput = encodeURIComponent(userInput);  // Sanitizing input to prevent XSS
  console.log("Sanitized Input:", sanitizedInput);

  // Add feedback to the user
  const feedbackDiv = document.createElement('div');
  feedbackDiv.textContent = `Sanitized Input: ${sanitizedInput}`;
  document.body.appendChild(feedbackDiv);  // Display the sanitized input on the page
});

// Generate CSRF token and add to form
const csrfToken = Math.random().toString(36).substr(2);
const csrfInput = document.createElement('input');
csrfInput.type = "hidden";
csrfInput.name = "csrfToken";
csrfInput.value = csrfToken;
document.getElementById('csrfForm').appendChild(csrfInput);

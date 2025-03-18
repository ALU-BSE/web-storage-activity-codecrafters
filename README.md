# E-Commerce Web Storage Implementation

This project demonstrates the implementation of various web storage mechanisms (Cookies, Local Storage, and Session Storage) in an e-commerce application. The application includes user authentication, theme customization, shopping cart functionality, and security measures.

## Features

### User Authentication with Cookies
- Secure login system using cookies to retain user sessions
- Cookie-based authentication with 7-day expiration
- Logout functionality that clears authentication cookies

### Theme Preferences with Local Storage
- Persistent theme settings (light/dark mode) using local storage
- Font size customization stored in local storage
- Settings are saved across browser sessions

### Shopping Cart with Session Storage
- Session-specific shopping cart that resets when the browser is closed
- Add to cart functionality
- Dynamic cart display with item count and total price

### Security Implementations
- Input sanitization using encodeURIComponent
- CSRF token generation and validation
- Sensitive data encryption in local storage using CryptoJS

## Project Structure
project-root/
│
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css         # Styles for the application
│   ├── js/
│   │   ├── auth.js            # Authentication functionality
│   │   ├── cart.js            # Shopping cart functionality
│   │   ├── products.js        # Product display functionality
│   │   ├── theme.js           # Theme management functionality
│   │   └── app.js             # Main script that initializes everything
│   └── images/
│       ├── headphones.jpg     # Product images
│       ├── watch.jpg
│       ├── speaker.jpg
│       ├── backpack.jpg
│       ├── powerbank.jpg
│       └── mouse.jpg

## Setup Instructions

1. **Clone or download the project files** to your local machine

2. **Ensure all files are in the correct folder structure** as shown above

3. **Open `index.html`** in your web browser

## How to Use

### Authentication
1. Enter a username, password, and email in the login form
2. Click "Login" to authenticate
3. The login section will be replaced with the product display and cart
4. Click "Logout" in the header to end your session

### Theme Customization
1. Toggle the switch in the top-right corner to switch between light and dark modes
2. Use the "A-" and "A+" buttons in the Theme Settings section to decrease or increase font size

### Shopping Cart
1. Browse the product catalog
2. Click "Add to Cart" for any product you want to purchase
3. View your cart items and total at the bottom of the page
4. The cart counter will update to show the number of items in your cart

## Security Features

- **HttpOnly and Secure Flags**: Simulated in this demo but would be properly implemented server-side in production
- **CSRF Protection**: Random tokens are generated for form submissions
- **XSS Prevention**: User input is sanitized before being displayed
- **Data Encryption**: User email is encrypted in local storage using CryptoJS

## Dependencies

- **CryptoJS**: Used for encrypting sensitive data (loaded from CDN)

## Browser Storage Information

| Feature | Storage Type | Purpose | Persistence |
|---------|--------------|---------|-------------|
| User Authentication | Cookies | Store user login state | 7 days |
| Theme Settings | Local Storage | Remember user preferences | Until cleared |
| Shopping Cart | Session Storage | Track items in cart | Until browser closes |
| User Email | Local Storage (encrypted) | Store user information securely | Until logout |
| CSRF Token | Generated on page load | Protect against cross-site request forgery | Single session |


## Answers to Discussion Questions

### Task 1: User Authentication with Cookies
- **Why are HttpOnly and Secure flags important for cookies?**
  - HttpOnly prevents JavaScript access to cookies, protecting against XSS attacks
  - Secure ensures cookies are only sent over HTTPS connections, preventing man-in-the-middle attacks

- **How do session cookies differ from persistent cookies?**
  - Session cookies expire when the browser closes
  - Persistent cookies have an explicit expiration date and remain until that date

### Task 2: Theme Preferences with Local Storage
- **What happens if local storage exceeds its size limit?**
  - Browsers typically allow 5-10MB per domain
  - When exceeded, browsers will throw a QUOTA_EXCEEDED_ERR exception
  - The application handles this by showing an alert to the user

### Task 3: Session-Specific Shopping Cart
- **Why is session storage suitable for this use case?**
  - Cart data doesn't need to persist between sessions
  - It automatically clears when the browser closes
  - It provides enough storage space for cart data

### Task 5: Storage Comparison
- **When would you use cookies over local storage?**
  - When data needs to be sent to the server with every request
  - For authentication tokens that need to be HttpOnly
  - When you need cross-subdomain data sharing

- **What are the risks of storing passwords in session storage?**
  - Session storage isn't encrypted by default
  - Vulnerable to XSS attacks
  - Still accessible in the same tab until closed
  - Not suitable for sensitive data like passwords
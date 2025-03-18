// Products functionality

// Product data
const products = [
    { id: 1, name: "Wireless Headphones", price: 89.99, image: "headphones.jpg" },
    { id: 2, name: "Smart Watch", price: 129.99, image: "watch.jpg" },
    { id: 3, name: "Bluetooth Speaker", price: 59.99, image: "speaker.jpg" },
    { id: 4, name: "Laptop Backpack", price: 49.99, image: "backpack.jpg" },
    { id: 5, name: "Power Bank", price: 39.99, image: "powerbank.jpg" },
    { id: 6, name: "Wireless Mouse", price: 24.99, image: "mouse.jpg" }
];

// Function to initialize product list
function initializeProducts() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        
        // Sanitize product name for security (Task 4)
        const sanitizedName = encodeURIComponent(product.name);
        
        productElement.innerHTML = `
            <div class="product-image" style="background-image: url('assets/images/${product.image}')"></div>
            <div class="product-details">
                <h3 class="product-title">${decodeURIComponent(sanitizedName)}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productElement);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Setup products functionality
function setupProducts() {
    initializeProducts();
}
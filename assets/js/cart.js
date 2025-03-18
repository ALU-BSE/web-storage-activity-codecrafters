// Shopping Cart Functions

// Function to get cart from session storage
function getCart() {
    try {
        return JSON.parse(sessionStorage.getItem('cart')) || [];
    } catch (e) {
        console.error('Error parsing cart:', e);
        return [];
    }
}

// Function to save cart to session storage
function saveCart(cart) {
    try {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    } catch (e) {
        console.error('Error saving cart:', e);
        alert('Could not save cart. Session storage may be full.');
    }
}

// Function to load cart from session storage
function loadCart() {
    updateCartDisplay();
}

// Function to add a product to the cart
function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            product: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    saveCart(cart);
}

// Function to update the cart display
function updateCartDisplay() {
    const cart = getCart();
    const cartItemsElement = document.getElementById('cartItems');
    const cartCountElement = document.getElementById('cartCount');
    const headerCartCountElement = document.getElementById('headerCartCount');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Update cart count in both places
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    headerCartCountElement.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        let cartHTML = '';
        let totalPrice = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            // Sanitize product name for security (Task 4)
            const sanitizedProduct = encodeURIComponent(item.product);
            
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${decodeURIComponent(sanitizedProduct)}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                    </div>
                    <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                </div>
            `;
        });
        
        cartItemsElement.innerHTML = cartHTML;
        cartTotalElement.textContent = totalPrice.toFixed(2);
    }
}

// Setup cart functionality
function setupCart() {
    loadCart();
}
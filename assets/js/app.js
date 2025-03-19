// Main application script

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up authentication
    setupAuth();
    
    // Set up theme functionality
    setupTheme();
    
    // Set up products
    setupProducts();
    
    // Set up cart
    setupCart();
    
    console.log('E-Commerce app initialized successfully');
});

/*....   */
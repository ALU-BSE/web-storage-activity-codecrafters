// Authentication functions

// Function to check authentication status
function checkAuthStatus() {
    const token = getCookie('authToken');
    
    if (token) {
        // User is logged in
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('authenticatedContent').style.display = 'block';
        document.getElementById('userSection').style.display = 'flex';
        
        // Decrypt and display user email
        try {
            const encryptedEmail = localStorage.getItem('userEmail');
            if (encryptedEmail) {
                const decryptedBytes = CryptoJS.AES.decrypt(encryptedEmail, 'demo-secret-key');
                const email = decryptedBytes.toString(CryptoJS.enc.Utf8);
                document.getElementById('userEmail').textContent = email;
            }
        } catch (e) {
            console.error('Error decrypting email:', e);
        }
    } else {
        // User is not logged in
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('authenticatedContent').style.display = 'none';
        document.getElementById('userSection').style.display = 'none';
    }
}

// Helper function to get cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Function to show messages
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `message message-${type}`;
    element.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Function to set up login form and event listeners
function setupAuth() {
    // Generate CSRF token for forms (Task 4)
    const csrfToken = Math.random().toString(36).substr(2);
    document.getElementById("csrfToken").value = csrfToken;
    
    // Check if user is logged in
    checkAuthStatus();
    
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const formCsrfToken = document.getElementById('csrfToken').value;
        
        // Check if CSRF token is valid (in a real app, this would be validated on the server)
        if (formCsrfToken !== csrfToken) {
            showMessage('loginMessage', 'Invalid CSRF token. Please refresh the page.', 'error');
            return;
        }
        
        // In a real app, you would validate credentials against a server
        // For this demo, we'll accept any non-empty values
        if (username && password) {
            // Set authentication cookie (in real app, this would be a secure token from server)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7); // 7 days from now
            
            // In a real application, this would be set by the server with HttpOnly flag
            // For demo purposes, we're setting it in JS
            document.cookie = `authToken=${username}123; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
            
            // Store encrypted email in local storage (Task 4 security challenge)
            const encryptedEmail = CryptoJS.AES.encrypt(email, 'demo-secret-key').toString();
            localStorage.setItem('userEmail', encryptedEmail);
            
            showMessage('loginMessage', 'Login successful!', 'success');
            checkAuthStatus(); // Update UI based on auth status
        } else {
            showMessage('loginMessage', 'Please enter both username and password', 'error');
        }
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        // Delete the auth cookie
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('userEmail');
        checkAuthStatus(); // Update UI based on auth status
        showMessage('loginMessage', 'You have been logged out.', 'success');
    });
}
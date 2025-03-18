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
    // Generate CSRF token for forms 
    const csrfToken = Math.random().toString(36).substr(2);
    document.getElementById("csrfToken").value = csrfToken;
    
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const formCsrfToken = document.getElementById('csrfToken').value;
        
        // Check if CSRF token is valid 
        if (formCsrfToken !== csrfToken) {
            showMessage('loginMessage', 'Invalid CSRF token. Please refresh the page.', 'error');
            return;
        }
        
        // Set authentication cookie emo
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // 7 days from now
        
        document.cookie = `authToken=${username || 'guest'}123; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
        
        // Store encrypted email in local storage 
        const emailToStore = email || 'guest@example.com';
        const encryptedEmail = CryptoJS.AES.encrypt(emailToStore, 'demo-secret-key').toString();
        localStorage.setItem('userEmail', encryptedEmail);
        
        // Always show authenticated content regardless of credentials
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('authenticatedContent').style.display = 'block';
        document.getElementById('userSection').style.display = 'flex';
        
        // Update user email display
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedEmail, 'demo-secret-key');
            const decryptedEmail = decryptedBytes.toString(CryptoJS.enc.Utf8);
            document.getElementById('userEmail').textContent = decryptedEmail;
        } catch (e) {
            console.error('Error decrypting email:', e);
        }
        
        showMessage('loginMessage', 'Login successful!', 'success');
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        // Delete the auth cookie
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('userEmail');
        
        // Redirect to login screen
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('authenticatedContent').style.display = 'none';
        document.getElementById('userSection').style.display = 'none';
        
        showMessage('loginMessage', 'You have been logged out.', 'success');
    });
    
    // Initial check for authentication status
    checkAuthStatus();
}
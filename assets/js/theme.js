// Theme management functions

// Function to get settings from local storage
function getSettings() {
    try {
        const settings = JSON.parse(localStorage.getItem('settings')) || {};
        return {
            theme: settings.theme || 'light',
            fontSize: settings.fontSize || 16
        };
    } catch (e) {
        console.error('Error parsing settings:', e);
        return { theme: 'light', fontSize: 16 };
    }
}

// Function to save settings to local storage
function saveSettings(settings) {
    try {
        localStorage.setItem('settings', JSON.stringify(settings));
    } catch (e) {
        console.error('Error saving settings:', e);
        alert('Could not save settings. Local storage may be full.');
    }
}

// Function to load theme settings from local storage
function loadThemeSettings() {
    const settings = getSettings();
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
    
    // Update UI controls
    document.getElementById('themeToggle').checked = settings.theme === 'dark';
    document.getElementById('currentFontSize').textContent = settings.fontSize;
}

// Function to apply theme to the page
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

// Function to apply font size to the page
function applyFontSize(size) {
    document.documentElement.style.fontSize = `${size}px`;
    document.getElementById('currentFontSize').textContent = size;
}

// Function to set up theme controls
function setupTheme() {
    // Initialize theme
    loadThemeSettings();
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('change', function() {
        const settings = getSettings();
        settings.theme = this.checked ? 'dark' : 'light';
        saveSettings(settings);
        applyTheme(settings.theme);
    });
    
    // Font size controls
    document.getElementById('increaseFontBtn').addEventListener('click', function() {
        const settings = getSettings();
        settings.fontSize = Math.min(24, settings.fontSize + 2);
        saveSettings(settings);
        applyFontSize(settings.fontSize);
    });
    
    document.getElementById('decreaseFontBtn').addEventListener('click', function() {
        const settings = getSettings();
        settings.fontSize = Math.max(12, settings.fontSize - 2);
        saveSettings(settings);
        applyFontSize(settings.fontSize);
    });
}
// Samsung Wallet Clone - Apple Design System
// Vertical List Interactions

class WalletApp {
    constructor() {
        this.cardsContainer = document.getElementById('cardsContainer');
        this.cards = [];
        this.cardsData = [];
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadCardsData();
            this.renderCards();
            this.setupCardEvents();
            this.setupButtonEvents();
        } catch (error) {
            console.error('Failed to initialize wallet app:', error);
            // Show error message to user
            this.showErrorMessage('Failed to load cards. Please refresh the page.');
        }
    }
    
    // Show error message to user
    showErrorMessage(message) {
        const container = this.cardsContainer;
        container.innerHTML = `
            <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
                <p style="font-size: 16px; margin-bottom: 12px;">⚠️ ${message}</p>
            </div>
        `;
    }
    
    // Load cards data from JSON
    async loadCardsData() {
        try {
            const response = await fetch('cards-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.cardsData = data.cards;
        } catch (error) {
            console.error('Error loading cards data:', error);
            this.cardsData = [];
            throw error;
        }
    }
    
    // Render cards dynamically from JSON data
    renderCards() {
        this.cardsContainer.innerHTML = '';
        
        this.cardsData.forEach((cardData, index) => {
            const cardWrapper = this.createCardElement(cardData, index);
            this.cardsContainer.appendChild(cardWrapper);
        });
        
        // Update cards reference after rendering
        this.cards = document.querySelectorAll('.card-wrapper');
    }
    
    // Create a card element from data
    createCardElement(cardData, index) {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-wrapper';
        cardWrapper.setAttribute('data-card', String(cardData.id));
        
        const card = document.createElement('div');
        card.className = 'card';
        
        // Apply background based on type with validation
        if (cardData.background.type === 'color') {
            // Sanitize CSS gradient value
            const bgValue = this.sanitizeCSSValue(cardData.background.value);
            card.style.background = bgValue;
        } else if (cardData.background.type === 'image') {
            // Sanitize image URL
            const imageUrl = this.sanitizeURL(cardData.background.value);
            card.style.backgroundImage = `url(${imageUrl})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }
        
        // Create card elements using DOM methods for security
        card.appendChild(this.createChipSVG());
        card.appendChild(this.createNFCSVG());
        
        // Create bank name element
        const bankEl = document.createElement('div');
        bankEl.className = 'card-bank';
        bankEl.textContent = cardData.bank; // Use textContent for security
        card.appendChild(bankEl);
        
        // Create card number element
        const numberEl = document.createElement('div');
        numberEl.className = 'card-number';
        numberEl.textContent = cardData.cardNumber;
        card.appendChild(numberEl);
        
        // Create card holder section
        const holderSection = document.createElement('div');
        holderSection.className = 'card-holder';
        
        const holderLabel = document.createElement('div');
        holderLabel.className = 'card-label';
        holderLabel.textContent = 'Card Holder';
        holderSection.appendChild(holderLabel);
        
        const holderName = document.createElement('div');
        holderName.className = 'card-name';
        holderName.textContent = cardData.holderName;
        holderSection.appendChild(holderName);
        
        card.appendChild(holderSection);
        
        // Create expiry section
        const expirySection = document.createElement('div');
        expirySection.className = 'card-expiry';
        
        const expiryLabel = document.createElement('div');
        expiryLabel.className = 'card-label';
        expiryLabel.textContent = 'Expires';
        expirySection.appendChild(expiryLabel);
        
        const expiryDate = document.createElement('div');
        expiryDate.className = 'card-date';
        expiryDate.textContent = cardData.expiryDate;
        expirySection.appendChild(expiryDate);
        
        card.appendChild(expirySection);
        
        // Create logo element
        const logoContainer = document.createElement('div');
        logoContainer.className = 'card-logo';
        logoContainer.innerHTML = this.getProtocolLogo(cardData.protocol);
        card.appendChild(logoContainer);
        
        cardWrapper.appendChild(card);
        return cardWrapper;
    }
    
    // Sanitize CSS value to prevent injection
    sanitizeCSSValue(value) {
        // Allow only safe CSS values (gradients, colors)
        const safePattern = /^(linear-gradient|radial-gradient|#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))/;
        if (safePattern.test(value)) {
            return value;
        }
        // Return default gradient if validation fails
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    // Sanitize URL to prevent XSS
    sanitizeURL(url) {
        // Allow only relative URLs and data URIs for safety
        if (url.startsWith('data:image/') || url.startsWith('/') || url.startsWith('./') || /^[a-zA-Z0-9._-]+\.(svg|png|jpg|jpeg|webp)$/i.test(url)) {
            return url;
        }
        // Return empty string if validation fails
        return '';
    }
    
    // Create chip SVG element
    createChipSVG() {
        const chipDiv = document.createElement('div');
        chipDiv.className = 'card-chip';
        chipDiv.innerHTML = `
            <svg width="40" height="32" viewBox="0 0 40 32">
                <rect width="40" height="32" rx="4" fill="#D4AF37"/>
                <rect x="8" y="8" width="8" height="8" rx="1" fill="#B8941F"/>
                <rect x="16" y="8" width="8" height="8" rx="1" fill="#B8941F"/>
                <rect x="24" y="8" width="8" height="8" rx="1" fill="#B8941F"/>
                <rect x="8" y="16" width="8" height="8" rx="1" fill="#B8941F"/>
                <rect x="24" y="16" width="8" height="8" rx="1" fill="#B8941F"/>
            </svg>
        `;
        return chipDiv;
    }
    
    // Create NFC SVG element
    createNFCSVG() {
        const nfcDiv = document.createElement('div');
        nfcDiv.className = 'card-nfc';
        nfcDiv.innerHTML = `
            <svg width="32" height="24" viewBox="0 0 32 24">
                <path d="M4 4C4 4 8 8 8 12C8 16 4 20 4 20" stroke="white" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
                <path d="M10 6C10 6 14 9 14 12C14 15 10 18 10 18" stroke="white" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
                <path d="M16 8C16 8 19 10 19 12C19 14 16 16 16 16" stroke="white" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
            </svg>
        `;
        return nfcDiv;
    }
    
    // Get logo SVG based on card protocol
    getProtocolLogo(protocol) {
        if (protocol === 'American Express') {
            return `
                <svg width="60" height="40" viewBox="0 0 60 40">
                    <rect x="2" y="8" width="56" height="24" rx="2" fill="none" stroke="white" stroke-width="2"/>
                    <text x="30" y="26" text-anchor="middle" fill="white" font-size="12" font-weight="bold">AMEX</text>
                </svg>
            `;
        } else {
            // Default Mastercard/Visa logo
            return `
                <svg width="60" height="40" viewBox="0 0 60 40">
                    <circle cx="20" cy="20" r="16" fill="rgba(255,255,255,0.8)"/>
                    <circle cx="40" cy="20" r="16" fill="rgba(255,255,255,0.6)"/>
                </svg>
            `;
        }
    }
    
    // Setup individual card events
    setupCardEvents() {
        this.cards.forEach((cardWrapper, index) => {
            const card = cardWrapper.querySelector('.card');
            
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleCardClick(index);
                this.hapticFeedback('medium');
            });
            
            // Add touch feedback
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = '';
            });
        });
    }
    
    // Handle card click
    handleCardClick(index) {
        console.log(`Card ${index + 1} selected`);
        
        // Visual feedback
        const card = this.cards[index].querySelector('.card');
        const originalTransform = card.style.transform;
        
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = originalTransform;
        }, 150);
        
        // Future: Show card details or expand
    }
    
    // Setup button events with haptic feedback
    setupButtonEvents() {
        const menuBtn = document.getElementById('menuBtn');
        const actionBtns = document.querySelectorAll('.action-btn');
        
        // Menu button
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                this.hapticFeedback('light');
                this.animateButton(menuBtn);
            });
        }
        
        // Action buttons
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.hapticFeedback('medium');
                this.animateButton(btn);
                this.handleActionButton(e.currentTarget);
            });
        });
    }
    
    // Simulate haptic feedback with visual cues
    hapticFeedback(intensity = 'light') {
        // iOS-style haptic feedback simulation
        if (navigator.vibrate) {
            switch(intensity) {
                case 'light':
                    navigator.vibrate(10);
                    break;
                case 'medium':
                    navigator.vibrate(20);
                    break;
                case 'heavy':
                    navigator.vibrate(30);
                    break;
            }
        }
    }
    
    // Animate button press
    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
    }
    
    // Handle action button clicks
    handleActionButton(button) {
        const btnText = button.querySelector('span').textContent;
        
        // Simple visual feedback
        const originalBg = button.style.backgroundColor;
        button.style.backgroundColor = 'rgba(0, 102, 204, 0.1)';
        
        setTimeout(() => {
            button.style.backgroundColor = originalBg;
        }, 200);
        
        console.log(`Action: ${btnText}`);
    }
    

    
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new WalletApp();
    
    // Lock orientation to landscape (if supported)
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(err => {
            console.log('Orientation lock not supported:', err);
        });
    }
    
    // Optimize for 60fps animations
    document.querySelectorAll('.card, .action-btn, .header-btn').forEach(el => {
        el.style.willChange = 'transform';
    });
});

// Performance optimization: Cleanup will-change after animations
setTimeout(() => {
    document.querySelectorAll('[style*="will-change"]').forEach(el => {
        el.style.willChange = 'auto';
    });
}, 3000);

// Prevent context menu on long press
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}, { passive: false });

// Prevent double-tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

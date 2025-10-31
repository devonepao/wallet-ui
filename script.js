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
        await this.loadCardsData();
        this.renderCards();
        this.setupCardEvents();
        this.setupButtonEvents();
    }
    
    // Load cards data from JSON
    async loadCardsData() {
        try {
            const response = await fetch('cards-data.json');
            const data = await response.json();
            this.cardsData = data.cards;
        } catch (error) {
            console.error('Error loading cards data:', error);
            this.cardsData = [];
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
        cardWrapper.setAttribute('data-card', cardData.id);
        
        const card = document.createElement('div');
        card.className = 'card';
        
        // Apply background based on type
        if (cardData.background.type === 'color') {
            card.style.background = cardData.background.value;
        } else if (cardData.background.type === 'image') {
            card.style.backgroundImage = `url(${cardData.background.value})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }
        
        // Determine logo based on protocol
        const logo = this.getProtocolLogo(cardData.protocol);
        
        card.innerHTML = `
            <div class="card-chip">
                <svg width="40" height="32" viewBox="0 0 40 32">
                    <rect width="40" height="32" rx="4" fill="#D4AF37"/>
                    <rect x="8" y="8" width="8" height="8" rx="1" fill="#B8941F"/>
                    <rect x="16" y="8" width="8" height="8" rx="1" fill="#B8941F"/>
                    <rect x="24" y="8" width="8" height="8" rx="1" fill="#B8941F"/>
                    <rect x="8" y="16" width="8" height="8" rx="1" fill="#B8941F"/>
                    <rect x="24" y="16" width="8" height="8" rx="1" fill="#B8941F"/>
                </svg>
            </div>
            <div class="card-nfc">
                <svg width="32" height="24" viewBox="0 0 32 24">
                    <path d="M4 4C4 4 8 8 8 12C8 16 4 20 4 20" stroke="white" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
                    <path d="M10 6C10 6 14 9 14 12C14 15 10 18 10 18" stroke="white" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
                    <path d="M16 8C16 8 19 10 19 12C19 14 16 16 16 16" stroke="white" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
                </svg>
            </div>
            <div class="card-bank">${cardData.bank}</div>
            <div class="card-number">${cardData.cardNumber}</div>
            <div class="card-holder">
                <div class="card-label">Card Holder</div>
                <div class="card-name">${cardData.holderName}</div>
            </div>
            <div class="card-expiry">
                <div class="card-label">Expires</div>
                <div class="card-date">${cardData.expiryDate}</div>
            </div>
            <div class="card-logo">
                ${logo}
            </div>
        `;
        
        cardWrapper.appendChild(card);
        return cardWrapper;
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

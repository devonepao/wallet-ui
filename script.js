// Samsung Wallet Clone - Apple Design System
// Vertical List Interactions

class WalletApp {
    constructor() {
        this.cardsContainer = document.getElementById('cardsContainer');
        this.cards = document.querySelectorAll('.card-wrapper');
        
        this.init();
    }
    
    init() {
        this.setupCardEvents();
        this.setupButtonEvents();
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


// Global variables
let cookiesAccepted = localStorage.getItem('cookiesAccepted');

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCookieBanner();
    initializeScrollAnimations();
    initializeContactForm();
    initializeModals();
    initializeFloatingElements();
    initializeMarketingTabs();
    initializePortfolioButtons();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Cookie banner functionality
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    
    if (!cookiesAccepted && cookieBanner) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    hideCookieBanner();
    
    // Initialize analytics or other tracking here
    console.log('Cookies accepted - Analytics initialized');
}

function declineCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    hideCookieBanner();
}

function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .value-item, .stat-item, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            submitContactForm(formObject);
        });
    }
}

function submitContactForm(formData) {
    // Show loading state
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // If using Formspree, let the form submit naturally
    // The form will handle the actual submission
    // This function now just handles the UI feedback
    
    // Show immediate feedback
    showNotification('Sending message...', 'info');
    
    // Reset button after a short delay for better UX
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 3000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Modal functionality
function initializeModals() {
    // Modal close functionality
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Legal modal functions
function showPrivacyPolicy() {
    document.getElementById('privacyModal').style.display = 'block';
}

function showTermsRefundDispute() {
    document.getElementById('termsModal').style.display = 'block';
}

function showBillingPolicy() {
    document.getElementById('billingModal').style.display = 'block';
}

function showGDPRInfo() {
    showNotification('NEXORATECH is fully compliant with GDPR and CCPA regulations. We respect your privacy and handle your data with the utmost care.', 'info');
}

// Initialize floating elements animations
function initializeFloatingElements() {
    // Add random delays to floating animations
    const floatingElements = document.querySelectorAll('.floating-laptop, .neural-network, .dashboard-widget');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Typing animation for code lines
function initializeTypingAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.width = '0%';
            setTimeout(() => {
                line.style.width = line.dataset.width || '70%';
            }, 100);
        }, index * 500);
    });
}

// Performance optimization
function initializePerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
}

function handleScroll() {
    // Handle scroll-based animations here
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Update progress indicator if exists
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${scrollProgress * 100}%`;
    }
}

// Initialize all performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    initializePerformanceOptimizations();
    initializeTypingAnimation();
    initializePWAFeatures();
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send error reports to your analytics service here
});

// Enhanced Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ ServiceWorker registration successful');
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showNotification('🚀 New version available! Refresh to update.', 'info');
                        }
                    });
                });
            })
            .catch(function(err) {
                console.log('❌ ServiceWorker registration failed:', err);
            });
    });
}

// PWA Install functionality
let deferredPrompt;
const installButton = document.createElement('button');
installButton.textContent = '📱 Install App';
installButton.className = 'install-btn';
installButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 25px;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    cursor: pointer;
    z-index: 1000;
    display: none;
    transition: all 0.3s ease;
`;

// Hide install button initially
document.body.appendChild(installButton);

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show install button
    installButton.style.display = 'block';
    
    // Show notification about PWA capability
    setTimeout(() => {
        showNotification('📱 Install NEXORATECH app for quick access!', 'info');
    }, 3000);
});

installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            showNotification('🎉 Thanks for installing NEXORATECH!', 'success');
        }
        
        // Clear the deferredPrompt
        deferredPrompt = null;
        installButton.style.display = 'none';
    }
});

// Hide install button when app is installed
window.addEventListener('appinstalled', () => {
    installButton.style.display = 'none';
    showNotification('✅ NEXORATECH app installed successfully!', 'success');
});

// PWA functionality detection
function initializePWAFeatures() {
    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        document.body.classList.add('pwa-mode');
        console.log('🚀 Running as PWA');
        
        // Add PWA-specific styles
        const pwaStyles = document.createElement('style');
        pwaStyles.textContent = `
            .pwa-mode .navbar {
                padding-top: env(safe-area-inset-top, 0);
            }
            .pwa-mode .install-btn {
                display: none !important;
            }
        `;
        document.head.appendChild(pwaStyles);
    }
    
    // Network status monitoring
    function updateNetworkStatus() {
        if (navigator.onLine) {
            showNotification('🌐 Back online!', 'success');
        } else {
            showNotification('📱 Offline mode - cached content available', 'info');
        }
    }
    
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
}

// Marketing tabs functionality
function initializeMarketingTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Portfolio button functionality
function initializePortfolioButtons() {
    // Add click event listeners to portfolio buttons
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    portfolioButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Portfolio link handler
function openPortfolioLink(serviceType) {
    // Define portfolio URLs for each service type
    const portfolioUrls = {
        'landing': 'https://t.me/nexoratechllc',
        'ecommerce': 'https://t.me/nexoratechllc', 
        'bots': 'https://t.me/nexoratechllc',
        'creative': 'https://t.me/nexoratechllc',
        'payments': 'https://t.me/nexoratechllc',
        'automation': 'https://t.me/nexoratechllc'
    };
    
    const url = portfolioUrls[serviceType] || 'https://t.me/nexoratechllc';
    
    // Show notification
    showNotification(`Opening ${serviceType} portfolio...`, 'info');
    
    // Open link in new tab
    setTimeout(() => {
        window.open(url, '_blank');
    }, 500);
}

// Enhanced scroll animations for new elements
function enhanceScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special animation for marketing cards
                if (entry.target.classList.contains('marketing-card')) {
                    entry.target.style.animationDelay = '0.1s';
                    entry.target.classList.add('animate-in');
                }
                
                // Add stagger animation for service features
                if (entry.target.classList.contains('service-features')) {
                    const tags = entry.target.querySelectorAll('.feature-tag');
                    tags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.transform = 'scale(1)';
                            tag.style.opacity = '1';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe new elements
    const newElements = document.querySelectorAll('.marketing-card, .service-features, .credential-item, .marketing-cta');
    newElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Special handling for feature tags
    const featureTags = document.querySelectorAll('.feature-tag');
    featureTags.forEach(tag => {
        tag.style.transform = 'scale(0.8)';
        tag.style.opacity = '0';
        tag.style.transition = 'all 0.3s ease';
    });
}

// Add floating animation to marketing icons
function initializeMarketingAnimations() {
    const marketingIcons = document.querySelectorAll('.marketing-icon');
    
    marketingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.style.animation = 'float 3s ease-in-out infinite';
    });
}

// Missing functions - add these
function showTermsOfService() {
    document.getElementById('termsModal').style.display = 'block';
}

function showTermsRefundDispute() {
    document.getElementById('termsModal').style.display = 'block';
}

function showBillingRefundPolicy() {
    document.getElementById('billingRefundModal').style.display = 'block';
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
window.showPrivacyPolicy = showPrivacyPolicy;
window.showTermsOfService = showTermsOfService;
window.showTermsRefundDispute = showTermsRefundDispute;
window.showBillingPolicy = showBillingRefundPolicy;
window.showBillingRefundPolicy = showBillingRefundPolicy;
window.showGDPRInfo = showGDPRInfo;
window.openPortfolioLink = openPortfolioLink;

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        enhanceScrollAnimations();
        initializeMarketingAnimations();
    }, 1000);
});

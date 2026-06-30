// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const backToTopBtn = document.getElementById('backToTop');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            // Scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navigation Active Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scrollable elements
document.querySelectorAll('.section, .section-header, .welcome-card, .location-grid, .landmarks-grid, .history-content, .wall-content').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// Text Animation for Hero
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');

if (heroTitle && heroSubtitle) {
    const titleText = heroTitle.getAttribute('data-text');
    const subtitleText = heroSubtitle.getAttribute('data-text');
    
    // Animate title letters
    heroTitle.innerHTML = '';
    titleText.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.animation = `letterFade 0.5s ease-out ${index * 0.05}s both`;
        heroTitle.appendChild(span);
    });
    
    // Animate subtitle letters
    heroSubtitle.innerHTML = '';
    subtitleText.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.animation = `letterFade 0.5s ease-out ${0.5 + index * 0.05}s both`;
        heroSubtitle.appendChild(span);
    });
}

// Add letter fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes letterFade {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Enhanced intersection observer for staggered animations
const animatedElements = document.querySelectorAll('.landmark-card, .section-content, .wall-card');

const staggeredObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animatedElements.forEach(el => {
    staggeredObserver.observe(el);
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent layout shift on scroll
let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
if (scrollbarWidth > 0) {
    document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
}

// Handle window resize
window.addEventListener('resize', () => {
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
        document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
    }
});

// Accessibility: Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Performance: Lazy load images (for future image implementation)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Fade in on page load
    document.body.style.opacity = '1';
    
    // Add loaded class for CSS transitions
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});

// Detect user preference for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    // Remove animation-related styles
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Monitor scroll performance
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollState();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

function updateScrollState() {
    const scrollPosition = window.pageYOffset;
    
    // Update navbar style based on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    console.log('Website loaded successfully');
    console.log('All content preserved from original presentation');
});

// Export functions for potential future use
window.siteFunctions = {
    scrollToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    toggleMenu: () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    },
    closeMenu: () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
};

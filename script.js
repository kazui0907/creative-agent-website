// ============================================
// CREATIVE AGENT - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initHeader();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                // Add/remove scrolled class
                if (currentScroll > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Hide/show header on scroll
                if (currentScroll > lastScroll && currentScroll > 300) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            // Add mobile menu logic here
        });
    }
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initScrollAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .featured-content, .featured-image-container, ' +
        '.about-visual, .about-content, .process-step, .gallery-item, ' +
        '.statement-content, .contact-content'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Create observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with stagger effect
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const heroImage = document.querySelector('.hero-image');

    if (!heroImage) return;

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `scale(1.05) translateY(${rate}px)`;
            }
        });
    });
}

// ============================================
// IMAGE LAZY LOADING
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// CURSOR EFFECT (Optional - for luxury feel)
// ============================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

// ============================================
// GALLERY HOVER EFFECT
// ============================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.gallery-overlay').style.opacity = '1';
    });

    item.addEventListener('mouseleave', function() {
        this.querySelector('.gallery-overlay').style.opacity = '0';
    });
});

// ============================================
// SERVICE CARD HOVER ANIMATION
// ============================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.service-image');
        if (img) {
            img.style.transform = 'scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.service-image');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// ============================================
// COUNTER ANIMATION (for statistics if needed)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ============================================
// FORM VALIDATION (for contact form)
// ============================================
function initFormValidation() {
    const form = document.querySelector('.contact-form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Add validation logic here
        const formData = new FormData(form);

        // Simulate form submission
        console.log('Form submitted:', Object.fromEntries(formData));

        // Show success message
        alert('お問い合わせありがとうございます。');
    });
}

/* ============================================
   TENNESSEE TITANS BIBLE - MASTER SCRIPTS
   Animations, interactions, and effects
   ============================================ */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initNavScroll();
    initCountUpAnimations();
    initHeroEffects();
});

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.titans-animate-on-scroll, .titans-stagger');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('visible'));
    }
}

/* ===== NAVIGATION SCROLL EFFECT ===== */
function initNavScroll() {
    const nav = document.querySelector('.titans-nav, .main-nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* ===== COUNT-UP ANIMATIONS ===== */
function initCountUpAnimations() {
    const statValues = document.querySelectorAll('.titans-stat-value[data-value], .stat-number[data-value]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateValue(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        statValues.forEach(el => observer.observe(el));
    }
}

function animateValue(element) {
    const target = parseInt(element.dataset.value) || parseInt(element.textContent);
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
            element.classList.add('animate');
        }
    }

    requestAnimationFrame(update);
}

/* ===== HERO EFFECTS ===== */
function initHeroEffects() {
    const hero = document.querySelector('.titans-hero');
    if (!hero) return;

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.titans-hero-content');
        const heroBg = hero.querySelector('.titans-hero-bg');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }

        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, { passive: true });
}

/* ===== CARD HOVER EFFECTS ===== */
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.titans-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ===== PAGE TRANSITION EFFECT ===== */
function initPageTransitions() {
    // Add fade effect on page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Add fade effect on navigation
    document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const href = this.href;

                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// Initialize page transitions
initPageTransitions();

/* ===== TICKER AUTO-UPDATE (placeholder) ===== */
function updateTicker() {
    // This would fetch live data in production
    const tickerElement = document.querySelector('.titans-ticker-value');
    if (tickerElement) {
        // Placeholder for live updates
    }
}

/* ===== FLAME PARTICLE EFFECT ===== */
function createFlameParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'flame-particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 15 + 10}px;
        background: radial-gradient(ellipse, rgba(255,170,0,0.8), rgba(200,16,46,0.6), transparent);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        left: ${Math.random() * 100}%;
        bottom: 0;
        opacity: 0;
        animation: particleRise ${Math.random() * 2 + 1}s ease-out forwards;
        pointer-events: none;
    `;

    container.appendChild(particle);

    setTimeout(() => particle.remove(), 3000);
}

// Add particle animation CSS dynamically
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleRise {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
        }
    }
`;
document.head.appendChild(particleStyle);

// Start flame particles if hero exists
const flameContainer = document.querySelector('.titans-flame-container');
if (flameContainer) {
    setInterval(() => createFlameParticle(flameContainer), 200);
}

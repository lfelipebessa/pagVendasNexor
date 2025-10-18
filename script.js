// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
const animateElements = document.querySelectorAll('.about-card, .benefit-item, .module-card, .cta-box, .testimonial-card, .bonus-card, .instructor-card, .faq-item, .pain-content, .pain-image, .pain-bottom, .benefits-header, .benefits-image');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Parallax scrolling effect for content blocks
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Select all cards and blocks
    const cards = document.querySelectorAll('.about-card, .module-card, .testimonial-card, .bonus-card, .instructor-card');

    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + scrolled;
        const cardHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Only apply effect when card is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate parallax offset based on card position
            const speed = (index % 2 === 0) ? 0.05 : -0.05; // Alternate direction
            const yPos = (scrolled - cardTop) * speed;

            card.style.transform = `translateY(${yPos}px)`;
        }
    });

    // Parallax for benefit items (horizontal shift)
    const benefits = document.querySelectorAll('.benefit-item');
    benefits.forEach((benefit, index) => {
        const rect = benefit.getBoundingClientRect();
        const benefitTop = rect.top + scrolled;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.03;
            const xPos = (scrolled - benefitTop) * speed;
            benefit.style.transform = `translateX(${xPos}px)`;
        }
    });
});

// Stats counter animation
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const text = num.textContent;
                const match = text.match(/\d+/);
                if (match) {
                    const target = parseInt(match[0]);
                    num.dataset.suffix = text.replace(/\d+/, '');
                    num.textContent = '0';
                    setTimeout(() => animateCounter(num, target), 200);
                }
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add active state to nav on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add cursor follow effect (optional, futuristic touch)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor follow
const animateCursor = () => {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
};

animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .about-card, .module-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// Add custom cursor styles
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s, border-color 0.2s;
        transform: translate(-50%, -50%);
    }

    .custom-cursor.cursor-hover {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: #ff6f3c;
    }

    body {
        cursor: none;
    }

    a, button, .about-card, .module-card {
        cursor: none;
    }

    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }

        body, a, button, .about-card, .module-card {
            cursor: auto !important;
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero title (optional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.setAttribute('data-text', text);
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff6f3c, #ff8c5a);
    z-index: 999;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.1s;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight);
    progressBar.style.transform = `scaleX(${scrolled})`;
});

// Add nav background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// FAQ Toggle functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Função genérica para criar carrosséis reutilizáveis
function createCarousel(config) {
    const {
        carouselSelector,
        trackSelector,
        nextButtonSelector,
        prevButtonSelector,
        dotsContainerSelector,
        autoplayDelay = 8000,
        slideLabel = 'slide'
    } = config;

    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return;

    const track = carousel.querySelector(trackSelector);
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector(nextButtonSelector);
    const prevButton = carousel.querySelector(prevButtonSelector);
    const dotsContainer = document.querySelector(dotsContainerSelector);

    let currentIndex = 0;
    let autoplayInterval;

    // Criar dots de navegação
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Ir para ${slideLabel} ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index, true));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Calcular quantos slides mostrar por vez baseado na largura da tela
    function getSlidesPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    function updateSlideWidth() {
        const slidesPerView = getSlidesPerView();
        const gap = 32; // 2rem
        slides.forEach(slide => {
            slide.style.minWidth = `calc(${100 / slidesPerView}% - ${(gap * (slidesPerView - 1)) / slidesPerView}px)`;
        });
    }

    function goToSlide(index, resetTimer = true) {
        const slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        currentIndex = Math.max(0, Math.min(index, maxIndex));

        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 32;
        const offset = -(slideWidth + gap) * currentIndex;

        track.style.transform = `translateX(${offset}px)`;

        // Atualizar dots ativos
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }

        // Reiniciar timer se navegação manual
        if (resetTimer) {
            stopAutoplay();
            startAutoplay();
        }
    }

    function nextSlide(manual = false) {
        const slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1, manual);
        } else {
            goToSlide(0, manual); // Volta ao início
        }
    }

    function prevSlide(manual = false) {
        const slidesPerView = getSlidesPerView();
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1, manual);
        } else {
            goToSlide(maxIndex, manual); // Vai para o final
        }
    }

    function startAutoplay() {
        autoplayInterval = setInterval(() => nextSlide(false), autoplayDelay);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Event listeners
    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide(true); // true = navegação manual, reinicia timer
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide(true); // true = navegação manual, reinicia timer
        });
    }

    // Pausar autoplay ao passar o mouse
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Atualizar ao redimensionar a janela
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSlideWidth();
            goToSlide(currentIndex, false);
        }, 250);
    });

    // Inicializar
    updateSlideWidth();
    setTimeout(() => {
        goToSlide(0, false); // false = não reinicia timer na inicialização
        startAutoplay();
    }, 100);
}

// Inicializar carrossel de depoimentos
createCarousel({
    carouselSelector: '.testimonials-carousel',
    trackSelector: '.testimonials-track',
    nextButtonSelector: '.carousel-next',
    prevButtonSelector: '.carousel-prev',
    dotsContainerSelector: '.carousel-dots',
    autoplayDelay: 8000,
    slideLabel: 'depoimento'
});

// Inicializar carrossel de bônus
createCarousel({
    carouselSelector: '.bonuses-carousel',
    trackSelector: '.bonuses-track',
    nextButtonSelector: '.carousel-next-bonus',
    prevButtonSelector: '.carousel-prev-bonus',
    dotsContainerSelector: '.carousel-dots-bonus',
    autoplayDelay: 5000,
    slideLabel: 'bônus'
});

// Fix mobile nav-links movement issue
if (window.innerWidth <= 768) {
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');

    if (navLinks && navContainer) {
        // Force static positioning and prevent any movement
        const fixNavLinks = () => {
            const computedStyle = window.getComputedStyle(navLinks);
            const currentRight = computedStyle.getPropertyValue('right');
            const currentTransform = computedStyle.getPropertyValue('transform');

            // Debug: log if position is changing
            if (currentRight !== '1.5rem' && currentRight !== '24px') {
                console.warn('Nav-links right position changed to:', currentRight);
            }
            if (currentTransform !== 'translateY(-50%)' && currentTransform !== 'matrix(1, 0, 0, 1, 0, -12)' && currentTransform !== 'none') {
                console.warn('Nav-links transform changed to:', currentTransform);
            }

            // Force correct positioning
            navLinks.style.position = 'absolute';
            navLinks.style.right = '1.5rem';
            navLinks.style.top = '50%';
            navLinks.style.transform = 'translateY(-50%)';
            navLinks.style.animation = 'none';
            navLinks.style.transition = 'none';
        };

        // Run immediately
        fixNavLinks();

        // Monitor and fix on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(fixNavLinks, 10);
        }, { passive: true });

        // Monitor with MutationObserver for style changes
        const observer = new MutationObserver(fixNavLinks);
        observer.observe(navLinks, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
}

// Log page load
console.log('%c🚀 Nexor Academy - Futuristic Landing Page', 'font-size: 20px; font-weight: bold; color: #ff6f3c; background: #000000; padding: 10px;');
console.log('%cPage loaded successfully!', 'font-size: 14px; color: #666666;');

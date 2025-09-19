// ARNAV ENTERPRISES - JavaScript Functionality

// Global variables for carousels
let currentMachinerySlideIndex = 0;
const totalMachinerySlides = 12;

// Smooth scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const offset = headerHeight + 20;
        
        setTimeout(() => {
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 10);
    }
}

// Machinery Carousel functionality
function showMachinerySlide(index) {
    const container = document.getElementById('machineryCarouselContainer');
    const translateX = -index * 100;
    container.style.transform = `translateX(${translateX}%)`;
    
    const dots = document.querySelectorAll('#machineryCarouselDots .dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextMachinerySlide() {
    currentMachinerySlideIndex = (currentMachinerySlideIndex + 1) % totalMachinerySlides;
    showMachinerySlide(currentMachinerySlideIndex);
}

function prevMachinerySlide() {
    currentMachinerySlideIndex = (currentMachinerySlideIndex - 1 + totalMachinerySlides) % totalMachinerySlides;
    showMachinerySlide(currentMachinerySlideIndex);
}

function currentMachinerySlide(index) {
    currentMachinerySlideIndex = index - 1;
    showMachinerySlide(currentMachinerySlideIndex);
}

// Product Image Carousel functionality
function nextProductImage(button) {
    const imageContainer = button.closest('.product-image-carousel').querySelector('.image-container');
    const scrollAmount = imageContainer.clientWidth;
    imageContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

function prevProductImage(button) {
    const imageContainer = button.closest('.product-image-carousel').querySelector('.image-container');
    const scrollAmount = imageContainer.clientWidth;
    imageContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
}

// Auto-slide functionality for machinery carousel
let autoMachinerySlideInterval = setInterval(nextMachinerySlide, 5000);

// Header scroll effect and initialization
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.borderBottom = '1px solid rgba(0, 255, 255, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.borderBottom = '1px solid rgba(0, 255, 255, 0.2)';
        }
    });

    const carousel = document.querySelector('.machinery-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoMachinerySlideInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            autoMachinerySlideInterval = setInterval(nextMachinerySlide, 5000);
        });

        let startX = 0;
        let isDragging = false;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(autoMachinerySlideInterval);
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const deltaX = startX - endX;
            
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    nextMachinerySlide();
                } else {
                    prevMachinerySlide();
                }
            }
            
            autoMachinerySlideInterval = setInterval(nextMachinerySlide, 5000);
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section, .nav-card, .product-item, .info-card, .clients-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(section);
    });

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(autoMachinerySlideInterval);
        } else {
            autoMachinerySlideInterval = setInterval(nextMachinerySlide, 5000);
        }
    });
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleScroll = debounce(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.borderBottom = '1px solid rgba(0, 255, 255, 0.3)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.borderBottom = '1px solid rgba(0, 255, 255, 0.2)';
    }
}, 16);

function safeCarouselOperation(operation) {
    try {
        operation();
    } catch (error) {
        console.warn('Carousel operation failed:', error);
    }
}

document.addEventListener('keydown', function(e) {
    if (document.activeElement.closest('.machinery-carousel')) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                safeCarouselOperation(() => prevMachinerySlide());
                break;
            case 'ArrowRight':
                e.preventDefault();
                safeCarouselOperation(() => nextMachinerySlide());
                break;
        }
    }
});

function preloadImages() {
    const imageUrls = [
        // Add actual image URLs here for preloading
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

document.addEventListener('DOMContentLoaded', preloadImages);

function trackUserInteraction(action, element) {
    console.log(`User interaction: ${action} on ${element}`);
}

document.addEventListener('DOMContentLoaded', function() {
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            trackUserInteraction('navigation_card_click', cardTitle);
        });
    });
});
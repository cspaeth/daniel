// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Service Modal Functionality
const serviceModal = document.getElementById('serviceModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

const serviceDetails = {
    malerarbeiten: {
        title: 'Malerarbeiten',
        content: `
            <p>Mit hochwertigen Materialien und Professionalität lasse ich Ihre Räume in neuem Glanz erstrahlen. In Weiß, abgetönt, hygienisch abwaschbar. 
            </p>
        `,
        image: 'img/Maler_2.jpeg'
    },
    lackierarbeiten: {
        title: 'Lackierarbeiten',
        content: `
            <p>Ob Holz oder Metallkonstruktion mit umweltfreundlichen Lacken erstrahlen Ihre Fenster, Türen, Zargen, Zäune, Handläufe oder Dachunterstände in neuem Glanz.</p>
        `,
        image: 'img/Lackieren.jpeg'
    },
    trockenbau: {
        title: 'Trockenbauarbeiten',
        content: `
            <p>Ob Neubau oder Sanierung, mit Präzision, handwerklichem Können und der Liebe zum Detail setze ich Ihre Wünsche und Vorstellungen gekonnt um.</p>
            <p><strong>Schnell, sauber und zuverlässig.</strong></p>
            <p>Von der Planung bis zur Ausführung - ich realisiere Ihre Trockenbau-Projekte professionell.</p>
        `
    },
    boden: {
        title: 'Bodenbeschichtung',
        content: `
            <p>Eine Bodenbeschichtung ist eine spezielle Beschichtung, die auf einen Boden aufgetragen wird, um dessen Oberfläche zu schützen, zu versiegeln und zu verschönern.</p>
        `,
        image: 'img/Bodenbeschichtung.jpeg'
    },
    fassade: {
        title: 'Fassadenanstriche',
        content: `
            <p>Unter Verwendung von hochwertigen und umweltfreundlichen Materialien garantiere ich für strahlendes Ergebnis durch Meister-Qualität.</p>
            <p>Bei einer kostenlosen Vor-Ort-Besichtigung berate ich Sie individuell, um Ihrem Gebäude einen frischen Anstrich und Schutz vor Witterungseinflüssen zu geben.</p>
            
        `,
        image: 'img/Fassade.jpeg'
    },
    tapezieren: {
        title: 'Tapezierarbeiten',
        content: `
            <p>Neben allgemeinen Tapezierarbeiten mit Raufaser, Vlies, Textil, Vinyl , Bordüren und Mustertapeten biete ich Ihnen eine individuelle Beratung zu Tapetenwahl und Raumgestaltung.
            <p>Hochwertige Materialien garantieren ein langanhaltendes Ergebnis und Wohlfühlatmosphäre.</p>
        `,
        image: 'img/Tapezieren.jpeg'
    },
    kreativ: {
        title: 'Kreative Gestaltung',
        content: `
            <p>Ihre kreative Vision steht im Mittelpunkt.</p>
            <p>Mit meinem Fachwissen und einem Auge fürs Detail kreieren wir in individueller Beratung einzigartige Designs, an denen Sie lange Freude haben.</p>
            <p>Gestaltung, Spachtel- und Spritztechnik</p>

        `,
        image: 'img/Kreativ.jpeg'
    }
};

// Add click event listeners to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const serviceType = card.getAttribute('data-service');
        const service = serviceDetails[serviceType];
        
        if (service) {
            let html = `<h2>${service.title}</h2>`;
            
            if (service.image) {
                html += `
                    <div class="modal-content-grid">
                        <div class="modal-text">
                            ${service.content}
                        </div>
                        <div class="modal-image">
                            <img src="${service.image}" alt="${service.title}">
                        </div>
                    </div>
                `;
            } else {
                html += service.content;
            }
            
            modalContent.innerHTML = html;
            serviceModal.style.display = 'block';
        }
    });
});

// Close modal events
closeModal.addEventListener('click', () => {
    serviceModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
        serviceModal.style.display = 'none';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Create mailto link
    const subject = encodeURIComponent('Anfrage von ' + name);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `E-Mail: ${email}\n` +
        `Telefon: ${phone || 'Nicht angegeben'}\n\n` +
        `Nachricht:\n${message}`
    );
    
    const mailtoLink = `mailto:danielchristianmueller94@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Ihr E-Mail-Programm wird geöffnet. Vielen Dank für Ihre Anfrage!');
    
    // Reset form
    this.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
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

// Observe service cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Initialize carousel
    initCarousel();
    
    // Initialize lightbox
    initLightbox();
});

// Carousel Functionality
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    const slidesToShow = 4; // Number of slides visible at once
    const slidesToScroll = 4; // Number of slides to scroll
    const maxIndex = Math.max(0, slides.length - slidesToShow);
    
    // Calculate number of pages for indicators
    const numPages = Math.ceil(slides.length / slidesToScroll);
    
    // Create indicators based on pages
    for (let i = 0; i < numPages; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToPage(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
    
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        const gap = 16; // 1rem gap
        const offset = currentIndex * (slideWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
        
        // Update indicators based on current page
        const currentPage = Math.floor(currentIndex / slidesToScroll);
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentPage);
        });
    }
    
    function goToPage(pageIndex) {
        currentIndex = Math.min(pageIndex * slidesToScroll, maxIndex);
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = Math.min(currentIndex + slidesToScroll, maxIndex);
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = Math.max(currentIndex - slidesToScroll, 0);
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-play carousel
    let autoplayInterval = setInterval(() => {
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex = Math.min(currentIndex + slidesToScroll, maxIndex);
        }
        updateCarousel();
    }, 5000);
    
    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.gallery-carousel');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex = Math.min(currentIndex + slidesToScroll, maxIndex);
            }
            updateCarousel();
        }, 5000);
    });
    
    // Open lightbox on slide click
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Update carousel on window resize
    window.addEventListener('resize', updateCarousel);
}

// Lightbox Functionality
function initLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    
    if (!lightboxModal || slides.length === 0) return;
    
    let currentLightboxIndex = 0;
    
    window.openLightbox = function(index) {
        currentLightboxIndex = index;
        updateLightboxImage();
        lightboxModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    function updateLightboxImage() {
        const imageSrc = slides[currentLightboxIndex].getAttribute('data-image');
        lightboxImage.src = imageSrc;
    }
    
    function closeLightbox() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function nextLightboxImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % slides.length;
        updateLightboxImage();
    }
    
    function prevLightboxImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + slides.length) % slides.length;
        updateLightboxImage();
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevLightboxImage);
    lightboxNext.addEventListener('click', nextLightboxImage);
    
    // Close on background click
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxModal.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevLightboxImage();
            if (e.key === 'ArrowRight') nextLightboxImage();
        }
    });
}

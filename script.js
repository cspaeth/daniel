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
            <h3>Malerarbeiten</h3>
            <p>Mit hochwertigen Materialien und Professionalität in den verschiedensten Techniken wie:</p>
            <ul>
                <li>Wisch-, Spachtel-, Putz-, Lasur-, Schwamm- und Lacktechniken</li>
                <li>Marmorierung</li>
                <li>Schablonierung</li>
                <li>Gestaltung mit Bruchmarmor, Fliesen oder Steinen</li>
            </ul>
            <p>Lasse ich Ihre Räume in neuem Glanz erstrahlen.</p>
        `
    },
    lackierarbeiten: {
        title: 'Lackierarbeiten',
        content: `
            <h3>Lackierarbeiten</h3>
            <p>Ob Holz oder Metallkonstruktion - mit umweltfreundlichen Lacken erstrahlen Ihre Fenster, Türen, Zargen, Zäune, Handläufe oder Dachunterstände in neuem Glanz.</p>
            <p>Ich verwende ausschließlich hochwertige, umweltfreundliche Lacksysteme für langanhaltende Ergebnisse.</p>
        `
    },
    trockenbau: {
        title: 'Trockenbauarbeiten',
        content: `
            <h3>Trockenbauarbeiten</h3>
            <p>Ob Neubau oder Sanierung, mit Präzision, handwerklichem Können und der Liebe zum Detail setze ich Ihre Wünsche und Vorstellungen gekonnt um.</p>
            <p><strong>Schnell, sauber und zuverlässig.</strong></p>
            <p>Von der Planung bis zur Ausführung - ich realisiere Ihre Trockenbau-Projekte professionell.</p>
        `
    },
    fassade: {
        title: 'Fassadenanstriche',
        content: `
            <h3>Fassadenanstriche</h3>
            <p>Unter Verwendung von hochwertigen und umweltfreundlichen Materialien garantiere ich für dauerhafte Ergebnisse durch Meister-Qualität.</p>
            <p>Bei einer kostenlosen Vor-Ort-Besichtigung berate ich Sie individuell um Ihrem Gebäude einen frischen Anstrich und Schutz vor Witterungseinflüssen zu geben.</p>
        `
    },
    tapezieren: {
        title: 'Tapezierarbeiten',
        content: `
            <h3>Tapezierarbeiten</h3>
            <p>Neben allgemeinen Tapezierarbeiten mit Rauhfaser, Vlies, Textil, Vinyl, Bordüren und Mustertapeten biete ich Ihnen eine individuelle Beratung zu Tapetenwahl und Raumgestaltung.</p>
            <p>Hochwertige Materialien garantieren langanhaltende Ergebnisse und eine Wohlfühlatmosphäre.</p>
        `
    },
    kreativ: {
        title: 'Kreative Gestaltung',
        content: `
            <h3>Kreative Gestaltung</h3>
            <p>Ihre kreative Vision steht im Mittelpunkt.</p>
            <p>Mit meinem Fachwissen und einem Auge fürs Detail kreieren wir in individueller Beratung einzigartige Designs an denen Sie lange Freude haben.</p>
            <p>Lassen Sie uns gemeinsam Ihre Räume zu etwas Besonderem machen.</p>
        `
    }
};

// Add click event listeners to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const serviceType = card.getAttribute('data-service');
        const service = serviceDetails[serviceType];
        
        if (service) {
            modalContent.innerHTML = service.content;
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
});

// Footer Functionality
function initFooter() {
    // Dynamic Year Update
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Footer Social Links Animation
    const socialLinks = document.querySelectorAll('.footer-social-link');
    socialLinks.forEach(link => {
        // Hover effect with particles
        link.addEventListener('mouseenter', (e) => {
            createParticles(e.target);
        });

        // Magnetic effect
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) rotate(${x * 0.05}deg)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });

    // Particle Effect Function
    function createParticles(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'footer-particle';
            document.querySelector('footer').appendChild(particle);

            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const destinationX = x + (Math.random() - 0.5) * 100;
            const destinationY = y - 50 - Math.random() * 50;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${destinationX - x}px, ${destinationY - y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            }).onfinish = () => particle.remove();
        }
    }

    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Footer Wave Animation
    const wave = document.querySelector('.footer-wave');
    if (wave) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            wave.style.transform = `rotate(180deg) translate3d(0, ${scrolled * 0.1}px, 0)`;
        });
    }

    // Footer Links Hover Effect
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });

    // Contact Info Hover Effect
    const contactItems = document.querySelectorAll('.footer-contact-info li');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = '#FBBF24';
            }
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = '';
                icon.style.color = '';
            }
        });
    });
}

// Initialize footer functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', initFooter);

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
});
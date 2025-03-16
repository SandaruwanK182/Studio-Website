document.addEventListener('DOMContentLoaded', () => {
    // Social Media Links Animation
    const socialLinks = document.querySelectorAll('.footer-social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const icon = link.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            createParticles(e.target);
        });

        link.addEventListener('mouseleave', (e) => {
            const icon = link.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Particle Effect Function
    function createParticles(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'footer-particle';
            element.appendChild(particle);

            const size = Math.random() * 3 + 2;
            const destinationX = (Math.random() - 0.5) * 100;
            const destinationY = -50 - Math.random() * 50;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const animation = particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${destinationX}px, ${destinationY}px)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

            animation.onfinish = () => particle.remove();
        }
    }

    // Footer Links Hover Effect
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
            link.style.color = '#FBBF24';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
            link.style.color = '';
        });
    });

    // Contact Info Icons Animation
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

    // Update Copyright Year
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Footer Wave Animation
    const wave = document.querySelector('.footer-wave');
    if (wave) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const amplitude = 20;
            const frequency = 0.02;
            const waveEffect = Math.sin(scrolled * frequency) * amplitude;
            wave.style.transform = `translateY(${waveEffect}px)`;
        });
    }

    // Fade In Animation on Scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observe all footer columns and items
    document.querySelectorAll('.footer-column, .footer-links li, .footer-contact-info li').forEach(el => {
        observer.observe(el);
    });
});
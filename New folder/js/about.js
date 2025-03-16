document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    // Scroll Progress Indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        const bar = progressBar.querySelector('.scroll-progress-bar');
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            bar.style.width = `${scrollPercent}%`;
        });
    };

    // Stats Counter Animation
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-item span:first-child');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + '+';
                }
            };
            updateCount();
        });
    };

    // Parallax Effect for Profile Image
    const handleParallax = () => {
        const profileImage = document.querySelector('.profile-image-wrapper');
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX - innerWidth / 2) / 30;
            const y = (clientY - innerHeight / 2) / 30;
            profileImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    };

    // Timeline Animation
    const animateTimeline = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline');
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach(item => observer.observe(item));
    };

    // Smooth Scroll for Navigation
    const initSmoothScroll = () => {
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
    };

    // Initialize all features
    createScrollProgress();
    animateStats();
    handleParallax();
    animateTimeline();
    initSmoothScroll();

    // Add cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .specialty-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // Gallery and Lightbox functionality
    const lightbox = document.querySelector('.lightbox-modal');
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.close-lightbox');

    // Open lightbox
    document.querySelectorAll('.gallery-item, .process-image-container').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.remove('hidden');
            setTimeout(() => lightbox.classList.add('active'), 10);
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.classList.add('hidden'), 300);
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    // Equipment cards hover effect
    const equipmentCards = document.querySelectorAll('.equipment-card');
    equipmentCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Process cards parallax effect
    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Smooth scroll for process timeline
    const processTimeline = document.querySelector('.process-timeline');
    if (processTimeline) {
        const scrollAnimation = () => {
            const cards = processTimeline.querySelectorAll('.process-card');
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 100;
                
                if (isVisible) {
                    setTimeout(() => {
                        card.classList.add('fade-scale');
                    }, index * 200);
                }
            });
        };

        window.addEventListener('scroll', scrollAnimation);
        scrollAnimation(); // Initial check
    }

    // Enhanced Intersection Observer
    const createObserver = (elements, options = {}) => {
        const defaultOptions = {
            threshold: 0.2,
            rootMargin: '0px',
            ...options
        };

    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.getElementById('closeModal');
    const playButtons = document.querySelectorAll('.play-btn');

    // Behind the Scenes Section Enhancement
    const mediaElements = document.querySelectorAll('.behind-scenes-card img, .behind-scenes-card video');
    
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.tagName.toLowerCase() === 'img') {
                        element.src = element.dataset.src;
                    } else if (element.tagName.toLowerCase() === 'video') {
                        element.src = element.dataset.src;
                        element.load();
                        if (element.autoplay) {
                            element.play().catch(() => {
                                console.log('Video autoplay failed');
                            });
                        }
                    }
                    
                    element.classList.remove('media-loading');
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    mediaElements.forEach(lazyLoad);

    // Smooth parallax effect
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 100}ms`;
        
        step.addEventListener('mouseenter', function() {
            this.querySelector('.icon-container').style.transform = 'scale(1.1)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.querySelector('.icon-container').style.transform = 'scale(1)';
        });
    });

    // Video controls
    const videos = document.querySelectorAll('.behind-scenes-card video');
    videos.forEach(video => {
        video.addEventListener('mouseenter', function() {
            this.play().catch(() => {
                console.log('Video play failed');
            });
        });

        video.addEventListener('mouseleave', function() {
            this.pause();
        });
    });

    // Dynamic content loading animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                contentObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.behind-scenes-card, .process-step').forEach(element => {
        contentObserver.observe(element);
    });

    // Handle image load errors
    document.querySelectorAll('.behind-scenes-card img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'path/to/fallback-image.jpg'; // Replace with your fallback image
            this.classList.add('error-image');
        });
    });

    // Optional: Add touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const mediaGrid = document.querySelector('.media-grid');
    if (mediaGrid) {
        mediaGrid.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        mediaGrid.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                // Swipe left
                scrollMediaGrid('left');
            } else {
                // Swipe right
                scrollMediaGrid('right');
            }
        }
    }

    function scrollMediaGrid(direction) {
        if (mediaGrid) {
            const scrollAmount = 300; // Adjust as needed
            mediaGrid.scrollBy({
                left: direction === 'left' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    // Smooth scroll handling
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Video hover interactions
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        
        card.addEventListener('mouseenter', () => {
            video.play().catch(() => console.log('Video autoplay failed'));
        });
        
        card.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // Progress bar animation
    const animateProgress = (element) => {
        const progress = element.querySelector('.progress-bar');
        const targetWidth = progress.getAttribute('data-width');
        progress.style.width = '0%';
        
        setTimeout(() => {
            progress.style.width = targetWidth + '%';
        }, 100);
    };

    // Intersection Observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgress(entry.target);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-progress').forEach(progress => {
        progressObserver.observe(progress);
    });

    // Image lazy loading with blur effect
    const lazyImages = document.querySelectorAll('.lazy-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Testimonial carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = i === index ? '1' : '0';
            testimonial.style.transform = i === index ? 'translateX(0)' : 'translateX(100px)';
        });
    };

    // Auto-rotate testimonials
    if (testimonials.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Equipment list animation
    const equipmentItems = document.querySelectorAll('.equipment-item');
    equipmentItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Handle modal interactions
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                
                // Add closing animation
                const closeModal = () => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                };

                modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal();
                });
            }
        });
    });

    // Enhanced Awards Section Interactions

    class AwardsSection {
        constructor() {
            this.section = document.querySelector('.awards-section');
            this.cards = document.querySelectorAll('.award-card');
            this.counters = document.querySelectorAll('.counter');
            this.init();
        }

        init() {
            this.initParallax();
            this.initCounters();
            this.initCardInteractions();
            this.initMouseTrailing();
        }

        // Enhanced Parallax Effect
        initParallax() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                
                this.cards.forEach((card, index) => {
                    const delay = index * 0.1;
                    card.style.transform = `translateY(${rate * delay}px)`;
                });
            });
        }

        // Enhanced Counter Animation
        initCounters() {
            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            this.counters.forEach(counter => observer.observe(counter));
        }

        animateCounter(counter) {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // Animation duration in milliseconds
            const steps = 60; // Steps per second
            const stepDuration = duration / (steps * (target / 100));
            
            let current = 0;
            const increment = target / (duration / stepDuration);

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    this.addCounterEffect(counter);
                }
            };

            updateCounter();
        }

        // Add completion effect to counter
        addCounterEffect(counter) {
            counter.style.transform = 'scale(1.2)';
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 200);
        }

        // Enhanced Card Interactions
        initCardInteractions() {
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => this.handleCardTilt(e, card));
                card.addEventListener('mouseleave', () => this.resetCardTilt(card));
            });
        }

        handleCardTilt(e, card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        resetCardTilt(card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }

        // Mouse Trail Effect
        initMouseTrailing() {
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            document.body.appendChild(trail);

            let timeout;
            this.section.addEventListener('mousemove', (e) => {
                trail.style.left = e.pageX + 'px';
                trail.style.top = e.pageY + 'px';
                trail.style.opacity = '1';

                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    trail.style.opacity = '0';
                }, 150);
            });
        }
    }

    // Initialize when DOM is loaded
    const awardsSection = new AwardsSection();
});

// Add smooth scrolling for anchor links
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

// Initialize Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.initSwiper();
        this.initAnimations();
    }

    initSwiper() {
        this.swiper = new Swiper('.testimonial-slider .swiper-container', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 30,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
            },
            on: {
                slideChange: () => {
                    this.animateContent();
                },
            },
        });
    }

    initAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll('.testimonial-card').forEach(card => {
            observer.observe(card);
        });
    }

    animateContent() {
        const activeSlide = this.swiper.slides[this.swiper.activeIndex];
        const stars = activeSlide.querySelectorAll('.star-rating i');
        
        stars.forEach((star, index) => {
            star.style.animation = 'none';
            star.offsetHeight; // Trigger reflow
            star.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        });
    }

    // Add parallax effect to background
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            document.querySelector('.feedback-section').style.backgroundPositionY = 
                `${scrolled * 0.5}px`;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const testimonialSlider = new TestimonialSlider();

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
 
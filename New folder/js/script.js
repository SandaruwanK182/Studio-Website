document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('menu-open');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            mobileMenuBtn.classList.remove('menu-open');
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('menu-open');
            navMenu.classList.remove('active');
        });
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    }

    // Initial check for elements in view
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Counter animation
    const counterElements = document.querySelectorAll('.counter-value');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const step = target / (duration / 16); // Update every 16ms (60fps)
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    }

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Header scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            if (currentScroll > 100) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            } else {
                header.style.backgroundColor = 'transparent';
            }
        }
        
        lastScroll = currentScroll;
    });

    // Services Section Enhancements
    const servicesSection = document.querySelector('#services');
    const serviceCards = document.querySelectorAll('.service-card-modern');

    // Create fireflies
    function createFireflies() {
        const numberOfFireflies = 15;
        for (let i = 0; i < numberOfFireflies; i++) {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            firefly.style.left = `${Math.random() * 100}%`;
            firefly.style.top = `${Math.random() * 100}%`;
            firefly.style.animationDelay = `${Math.random() * 15}s`;
            servicesSection.appendChild(firefly);
        }
    }

    // Initialize fireflies
    createFireflies();

    // Parallax effect for service cards
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            serviceCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const moveX = (clientX - cardCenterX) * 0.01;
                const moveY = (clientY - cardCenterY) * 0.01;

                card.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    // Service card interaction
    serviceCards.forEach(card => {
        const features = card.querySelectorAll('.feature-list li');
        const icon = card.querySelector('.service-icon-wrapper');

        // Stagger feature list animation
        features.forEach((feature, index) => {
            feature.style.transitionDelay = `${index * 0.1}s`;
        });

        // Add hover effect
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            features.forEach(feature => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(10px)';
            });
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
            features.forEach(feature => {
                feature.style.opacity = '0.7';
                feature.style.transform = 'translateX(0)';
            });
        });
    });

    // Service button hover effect
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // Intersection Observer for service cards
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                serviceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });

    // Package Cards Interaction
    const packageCards = document.querySelectorAll('.package-card');
    
    // Mouse move effect for custom package
    packageCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Modern Package Interactions
    // Smooth reveal animation on scroll
    const revealPackages = () => {
        packageCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;

            if (cardTop < triggerBottom) {
                card.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealPackages);
    revealPackages();

    // Price counter animation
    const animatePrice = (element, targetPrice) => {
        const duration = 1500;
        const frameDuration = 1000/60;
        const totalFrames = Math.round(duration/frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame/totalFrames;
            const currentPrice = Math.round(targetPrice * progress);

            if (frame === totalFrames) {
                clearInterval(counter);
            }

            element.textContent = currentPrice;
        }, frameDuration);
    };

    // Initialize price animations when cards become visible
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target.querySelector('.amount');
                const targetPrice = parseInt(priceElement.textContent);
                animatePrice(priceElement, targetPrice);
                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    packageCards.forEach(card => priceObserver.observe(card));

    // Interactive features highlight
    const features = document.querySelectorAll('.package-features li:not(.disabled)');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.style.transform = 'translateX(8px)';
        });

        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'translateX(0)';
        });
    });

    // Package comparison tooltip
    packageCards.forEach(card => {
        const comparison = document.createElement('div');
        comparison.className = 'package-comparison';
        comparison.innerHTML = `
            <h4>Package Highlights</h4>
            <ul>
                ${Array.from(card.querySelectorAll('.package-features li:not(.disabled)'))
                    .slice(0, 3)
                    .map(li => `<li>${li.textContent}</li>`)
                    .join('')}
            </ul>
        `;
        card.appendChild(comparison);
    });

    // Package selection handling
    const packageButtons = document.querySelectorAll('.package-btn');
    packageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageType = button.closest('.package-card').querySelector('.package-title').textContent;
            
            // Smooth scroll to contact form
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Pre-fill contact form if it exists
                const packageInput = document.querySelector('#package-type');
                if (packageInput) {
                    packageInput.value = packageType;
                }
            }
        });
    });

    // Service Packages Interactions
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize Tilt Effect
        const packageCards = document.querySelectorAll('.service-package-card');
        
        packageCards.forEach(card => {
            // Mouse movement effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Update CSS variables for gradient movement
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            // Hover effect for features
            const features = card.querySelectorAll('.package-features li');
            features.forEach((feature, index) => {
                feature.style.transitionDelay = `${index * 50}ms`;
            });
        });

        // Price Counter Animation
        const priceElements = document.querySelectorAll('.package-price .amount');
        
        const animatePrice = (element) => {
            const targetPrice = parseInt(element.textContent);
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;
            let currentStep = 0;
            
            const animation = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                const currentPrice = Math.floor(targetPrice * progress);
                
                element.textContent = currentPrice;
                
                if (currentStep === steps) {
                    clearInterval(animation);
                    element.textContent = targetPrice;
                }
            }, stepDuration);
        };

        // Intersection Observer for price animation
        const priceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePrice(entry.target);
                    priceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        priceElements.forEach(price => priceObserver.observe(price));

        // Smooth scroll to contact form when CTA is clicked
        const ctaButtons = document.querySelectorAll('.package-cta');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });

    // Gallery Section Functionality
    const gallery = {
        container: document.querySelector('.gallery-grid'),
        items: document.querySelectorAll('.gallery-item'),
        filters: document.querySelectorAll('.gallery-filter'),
        currentIndex: 0,

        init() {
            if (!this.container) return;
            this.setupFilters();
            this.setupImageViewer();
            this.preloadImages();
            this.setupLoadMore();
        },

        // Preload images for smoother transitions
        preloadImages() {
            this.items.forEach(item => {
                const img = item.querySelector('img');
                if (img) {
                    const preloadImg = new Image();
                    preloadImg.src = img.src;
                }
            });
        },

        // Filter functionality
        setupFilters() {
            this.filters.forEach(filter => {
                filter.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (filter.classList.contains('active')) return;

                    this.filters.forEach(f => f.classList.remove('active'));
                    filter.classList.add('active');

                    const category = filter.getAttribute('data-filter');
                    this.filterItems(category);
                });
            });
        },

        filterItems(category) {
            this.items.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = category === 'all' || category === itemCategory;

                if (shouldShow) {
                    item.style.display = 'block';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        },

        // Image viewer functionality
        setupImageViewer() {
            // Create image viewer container if it doesn't exist
            if (!document.getElementById('image-viewer')) {
                const viewer = document.createElement('div');
                viewer.id = 'image-viewer';
                viewer.className = 'fixed inset-0 z-50 hidden bg-black/95 backdrop-blur-sm';
                viewer.innerHTML = `
                    <div class="absolute inset-0 flex items-center justify-center p-4">
                        <button class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                        
                        <button class="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm">
                            <i class="fas fa-chevron-left text-2xl"></i>
                        </button>
                        
                        <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm">
                            <i class="fas fa-chevron-right text-2xl"></i>
                        </button>

                        <div class="relative max-w-7xl w-full mx-auto">
                            <div class="image-container relative aspect-video overflow-hidden rounded-lg">
                                <img src="" alt="" class="w-full h-full object-contain">
                            </div>
                            
                            <div class="image-info mt-4 text-white text-center opacity-0 transform translate-y-4 transition-all duration-300">
                                <h3 class="text-2xl font-bold mb-2"></h3>
                                <p class="text-gray-300"></p>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(viewer);

                // Add event listeners
                this.setupViewerControls(viewer);
            }

            // Add click listeners to gallery items
            this.items.forEach((item, index) => {
                const viewBtn = item.querySelector('.view-btn');
                if (viewBtn) {
                    viewBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.openImage(index);
                    });
                }
            });
        },

        setupViewerControls(viewer) {
            const closeBtn = viewer.querySelector('button:first-child');
            const prevBtn = viewer.querySelector('button:nth-child(2)');
            const nextBtn = viewer.querySelector('button:nth-child(3)');

            closeBtn.addEventListener('click', () => this.closeViewer());
            prevBtn.addEventListener('click', () => this.showImage(this.currentIndex - 1));
            nextBtn.addEventListener('click', () => this.showImage(this.currentIndex + 1));

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!viewer.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape': this.closeViewer(); break;
                    case 'ArrowLeft': this.showImage(this.currentIndex - 1); break;
                    case 'ArrowRight': this.showImage(this.currentIndex + 1); break;
                }
            });

            // Click outside to close
            viewer.addEventListener('click', (e) => {
                if (e.target === viewer) this.closeViewer();
            });
        },

        openImage(index) {
            this.currentIndex = index;
            const viewer = document.getElementById('image-viewer');
            viewer.classList.remove('hidden');
            requestAnimationFrame(() => {
                viewer.classList.add('active');
                document.body.style.overflow = 'hidden';
                this.showImage(index);
            });
        },

        showImage(index) {
            const totalItems = this.items.length;
            this.currentIndex = (index + totalItems) % totalItems;

            const viewer = document.getElementById('image-viewer');
            const img = viewer.querySelector('img');
            const title = viewer.querySelector('h3');
            const desc = viewer.querySelector('p');
            const info = viewer.querySelector('.image-info');
            const container = viewer.querySelector('.image-container');

            // Add loading state
            container.classList.add('loading');
            info.style.opacity = '0';
            info.style.transform = 'translateY(1rem)';

            // Get current item
            const item = this.items[this.currentIndex];
            const itemImg = item.querySelector('img');
            const itemTitle = item.querySelector('h3');
            const itemDesc = item.querySelector('p');

            // Load new image
            const newImg = new Image();
            newImg.onload = () => {
                img.src = newImg.src;
                container.classList.remove('loading');
                
                // Show info with delay
                setTimeout(() => {
                    info.style.opacity = '1';
                    info.style.transform = 'translateY(0)';
                }, 300);
            };
            newImg.src = itemImg.src;

            // Update info
            title.textContent = itemTitle.textContent;
            desc.textContent = itemDesc.textContent;
        },

        closeViewer() {
            const viewer = document.getElementById('image-viewer');
            viewer.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => viewer.classList.add('hidden'), 300);
        },

        setupLoadMore() {
            const loadMoreBtn = document.querySelector('.load-more');
            if (!loadMoreBtn) return;

            // Mouse move effect
            loadMoreBtn.addEventListener('mousemove', (e) => {
                const rect = loadMoreBtn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                loadMoreBtn.style.setProperty('--mouse-x', `${x}px`);
                loadMoreBtn.style.setProperty('--mouse-y', `${y}px`);
            });

            loadMoreBtn.addEventListener('click', () => {
                if (loadMoreBtn.disabled) return;

                // Add loading state
                loadMoreBtn.disabled = true;
                loadMoreBtn.classList.add('loading');
                const spinner = loadMoreBtn.querySelector('.fa-spinner');
                spinner.classList.remove('hidden');

                // Simulate loading more items
                setTimeout(() => {
                    // Show more items logic here
                    this.currentItems += this.itemsToShow;
                    this.showItems();

                    // Remove loading state
                    loadMoreBtn.disabled = false;
                    loadMoreBtn.classList.remove('loading');
                    spinner.classList.add('hidden');

                    // Hide button if no more items
                    if (this.currentItems >= this.items.length) {
                        loadMoreBtn.style.opacity = '0';
                        setTimeout(() => {
                            loadMoreBtn.style.display = 'none';
                        }, 300);
                    }
                }, 1000);
            });
        }
    };

    // Initialize gallery
    gallery.init();

    const statsLearnMoreBtn = document.querySelector('.stats-learn-more');
    
    if (statsLearnMoreBtn) {
        statsLearnMoreBtn.addEventListener('click', openStatsModal);
    }

    function openStatsModal() {
        const modal = document.createElement('div');
        modal.className = 'stats-modal';
        
        modal.innerHTML = `
            <div class="stats-modal-content">
                <button class="modal-close" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
                
                <h2 class="text-3xl font-playfair font-bold mb-6">Our Journey in Numbers</h2>
                
                <div class="stats-grid">
                    <div class="stat-item">
                        <h3 class="text-4xl font-bold text-yellow-400 mb-2">2500+</h3>
                        <p class="text-gray-300">Happy Clients</p>
                        <p class="text-sm text-gray-400 mt-2">Satisfied customers who trust our services</p>
                    </div>
                    <div class="stat-item">
                        <h3 class="text-4xl font-bold text-yellow-400 mb-2">150+</h3>
                        <p class="text-gray-300">Events Covered</p>
                        <p class="text-sm text-gray-400 mt-2">Successfully documented special moments</p>
                    </div>
                    <div class="stat-item">
                        <h3 class="text-4xl font-bold text-yellow-400 mb-2">15+</h3>
                        <p class="text-gray-300">Awards Won</p>
                        <p class="text-sm text-gray-400 mt-2">Recognition for excellence in photography</p>
                    </div>
                </div>

                <div class="space-y-6 mt-8">
                    <h3 class="text-xl font-semibold">Our Commitment</h3>
                    <p class="text-gray-300 leading-relaxed">
                        We're dedicated to providing exceptional photography services with a focus on quality, 
                        creativity, and customer satisfaction. Our team of professional photographers brings 
                        years of experience and artistic vision to every project.
                    </p>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="text-lg font-semibold mb-3">Our Expertise</h4>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Professional portrait photography</li>
                                <li>• Event documentation</li>
                                <li>• Aerial photography</li>
                                <li>• Commercial shoots</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-3">Our Values</h4>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Quality and attention to detail</li>
                                <li>• Customer satisfaction</li>
                                <li>• Professional excellence</li>
                                <li>• Timely delivery</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 50);
        
        // Close button functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    // Enhanced Blog Section Functionality
    document.addEventListener('DOMContentLoaded', () => {
        const blogCards = document.querySelectorAll('.blog-card');
        const viewAllBtn = document.querySelector('.view-all-posts-btn');
        
        // 3D Card Effect
        blogCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'none';
            });
        });

        // Read Time Calculator
        function calculateReadTime(content) {
            const wordsPerMinute = 200;
            const words = content.trim().split(/\s+/).length;
            return Math.ceil(words / wordsPerMinute);
        }

        // Share Functionality
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const shareMenu = btn.nextElementSibling;
                shareMenu.classList.toggle('active');
                
                // Close other share menus
                shareButtons.forEach(otherBtn => {
                    if (otherBtn !== btn) {
                        otherBtn.nextElementSibling.classList.remove('active');
                    }
                });
            });
        });

        // Close share menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.blog-share')) {
                document.querySelectorAll('.share-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        });

        // Social Share Functions
        function shareOnTwitter(title, url) {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        }

        function shareOnFacebook(url) {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        }

        function shareOnLinkedIn(title, url) {
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
        }

        // Infinite Scroll Simulation
        let isLoading = false;
        let page = 1;

        function loadMorePosts() {
            if (isLoading) return;
            isLoading = true;

            // Add loading state
            const loadingCard = document.createElement('div');
            loadingCard.className = 'blog-card loading';
            document.querySelector('.blog-grid').appendChild(loadingCard);

            // Simulate API call
            setTimeout(() => {
                loadingCard.remove();
                // Add new posts logic here
                isLoading = false;
            }, 1500);
        }

        // Intersection Observer for infinite scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isLoading) {
                    loadMorePosts();
                }
            });
        }, { threshold: 0.5 });

        if (viewAllBtn) {
            observer.observe(viewAllBtn);
        }

        // Category Filter
        const categoryButtons = document.querySelectorAll('.category-filter');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                // Update active state
                categoryButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter cards
                blogCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Save for Later Functionality
        const saveButtons = document.querySelectorAll('.save-btn');
        saveButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = btn.dataset.postId;
                const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
                
                if (savedPosts.includes(postId)) {
                    // Remove from saved
                    const index = savedPosts.indexOf(postId);
                    savedPosts.splice(index, 1);
                    btn.classList.remove('saved');
                } else {
                    // Add to saved
                    savedPosts.push(postId);
                    btn.classList.add('saved');
                }
                
                localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
            });
        });
    });

    // Add this to your existing blog section JavaScript
    function initViewAllPostsButton() {
        const viewAllBtn = document.querySelector('.view-all-posts-btn');
        if (!viewAllBtn) return;

        // Mouse move effect
        viewAllBtn.addEventListener('mousemove', (e) => {
            const rect = viewAllBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            viewAllBtn.style.setProperty('--mouse-x', `${x}px`);
            viewAllBtn.style.setProperty('--mouse-y', `${y}px`);
        });

        // Click effect with loading state
        viewAllBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Add loading state
            viewAllBtn.classList.add('loading');
            const originalContent = viewAllBtn.innerHTML;
            viewAllBtn.innerHTML = `
                <span class="view-all-posts-content">
                    <span>Loading</span>
                    <i class="fas fa-spinner"></i>
                </span>
            `;

            try {
                // Simulate loading more posts
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Smooth scroll to blog section
                const blogSection = document.querySelector('#blogs');
                if (blogSection) {
                    blogSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Add success state
                viewAllBtn.innerHTML = `
                    <span class="view-all-posts-content">
                        <span>All Posts Loaded</span>
                        <i class="fas fa-check"></i>
                    </span>
                `;

                // Reset button after delay
                setTimeout(() => {
                    viewAllBtn.classList.remove('loading');
                    viewAllBtn.innerHTML = originalContent;
                }, 2000);

            } catch (error) {
                console.error('Error loading posts:', error);
                viewAllBtn.innerHTML = `
                    <span class="view-all-posts-content">
                        <span>Error Loading Posts</span>
                        <i class="fas fa-exclamation-circle"></i>
                    </span>
                `;
            }
        });

        // Add magnetic effect
        const magneticEffect = (e) => {
            const rect = viewAllBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            viewAllBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-2px)`;
        };

        viewAllBtn.addEventListener('mousemove', magneticEffect);
        viewAllBtn.addEventListener('mouseleave', () => {
            viewAllBtn.style.transform = '';
        });
    }

    // Initialize the button functionality
    document.addEventListener('DOMContentLoaded', initViewAllPostsButton);

    // Add this to your existing JavaScript
    function initNavCTA() {
        const navCTA = document.querySelector('.nav-cta');
        if (!navCTA) return;

        // Mouse move effect
        navCTA.addEventListener('mousemove', (e) => {
            const rect = navCTA.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            navCTA.style.setProperty('--mouse-x', `${x}px`);
            navCTA.style.setProperty('--mouse-y', `${y}px`);
        });

        // Click effect
        navCTA.addEventListener('click', (e) => {
            e.preventDefault();

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'nav-cta-ripple';
            const rect = navCTA.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            navCTA.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);

            // Add loading state
            navCTA.classList.add('loading');
            const originalContent = navCTA.innerHTML;
            navCTA.innerHTML = `
                <span class="nav-cta-content">
                    <span>Processing</span>
                    <i class="fas fa-spinner"></i>
                </span>
            `;

            // Simulate loading and scroll
            setTimeout(() => {
                const bookingSection = document.querySelector('#book');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Reset button after scroll
                    setTimeout(() => {
                        navCTA.classList.remove('loading');
                        navCTA.innerHTML = originalContent;
                    }, 500);
                }
            }, 1000);
        });

        // Add floating animation on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navCTA.style.animation = 'navButtonFloat 3s ease-in-out infinite';
                    } else {
                        navCTA.style.animation = 'none';
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(navCTA);
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', initNavCTA);

    // Contact Section Functionality
    function initContactSection() {
        const contactForm = document.getElementById('contactForm');
        const newsletterForm = document.getElementById('newsletterForm');

        // Contact Form Handling
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnContent = submitBtn.innerHTML;

                // Add loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="btn-content">
                        <span>Sending...</span>
                        <i class="fas fa-spinner fa-spin"></i>
                    </span>
                `;

                try {
                    // Simulate form submission
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    // Show success message
                    submitBtn.innerHTML = `
                        <span class="btn-content">
                            <span>Message Sent!</span>
                            <i class="fas fa-check"></i>
                        </span>
                    `;

                    // Reset form
                    contactForm.reset();

                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnContent;
                    }, 3000);

                } catch (error) {
                    console.error('Error sending message:', error);
                    submitBtn.innerHTML = `
                        <span class="btn-content">
                            <span>Error Sending</span>
                            <i class="fas fa-exclamation-circle"></i>
                        </span>
                    `;
                }
            });

            // Input animations
            const inputs = contactForm.querySelectorAll('.floating-input');
            inputs.forEach(input => {
                // Add focus effects
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });

                input.addEventListener('blur', () => {
                    input.parentElement.classList.remove('focused');
                    if (input.value.trim() !== '') {
                        input.parentElement.classList.add('has-value');
                    } else {
                        input.parentElement.classList.remove('has-value');
                    }
                });

                // Validate on input
                input.addEventListener('input', () => {
                    validateInput(input);
                });
            });
        }

        // Newsletter Form Handling
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = newsletterForm.querySelector('button');
                const input = newsletterForm.querySelector('input');
                const originalBtnContent = submitBtn.innerHTML;

                // Add loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                try {
                    // Simulate subscription
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Show success state
                    submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                    input.value = '';

                    // Add success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'newsletter-success';
                    successMsg.textContent = 'Successfully subscribed!';
                    newsletterForm.appendChild(successMsg);

                    // Reset after delay
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnContent;
                        successMsg.remove();
                    }, 3000);

                } catch (error) {
                    console.error('Error subscribing:', error);
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                }
            });
        }

        // Social Links Animation
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const icon = link.querySelector('i');
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            });

            link.addEventListener('mouseleave', (e) => {
                const icon = link.querySelector('i');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    // Input Validation
    function validateInput(input) {
        const container = input.parentElement;
        const errorClass = 'has-error';
        let isValid = true;

        switch (input.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                break;
            case 'tel':
                isValid = /^[0-9\s\-\+\(\)]{10,}$/.test(input.value);
                break;
            default:
                isValid = input.value.trim().length > 0;
        }

        if (!isValid && input.value.trim() !== '') {
            container.classList.add(errorClass);
        } else {
            container.classList.remove(errorClass);
        }
    }

    // Initialize Contact Section
    document.addEventListener('DOMContentLoaded', initContactSection);

    // Enhanced Contact Form Functionality
    function initEnhancedContactForm() {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('.floating-input');
        const submitBtn = form.querySelector('.contact-submit-btn');

        // Input Focus Effects
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'input-ripple';
                input.parentElement.appendChild(ripple);
                setTimeout(() => ripple.remove(), 1000);
            });

            // Real-time validation
            input.addEventListener('input', () => {
                validateInput(input);
                updateSubmitButtonState();
            });

            // Magnetic effect on hover
            input.addEventListener('mousemove', (e) => {
                const bounds = input.getBoundingClientRect();
                const x = e.clientX - bounds.left - bounds.width / 2;
                const y = e.clientY - bounds.top - bounds.height / 2;
                
                input.style.transform = `translate(${x * 0.01}px, ${y * 0.01}px)`;
            });

            input.addEventListener('mouseleave', () => {
                input.style.transform = '';
            });
        });

        // Enhanced Form Submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!isFormValid()) {
                showMessage('Please fill all fields correctly', 'error');
                return;
            }

            // Add loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <div class="submit-loading">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            `;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success state
                submitBtn.innerHTML = `
                    <div class="submit-success">
                        <i class="fas fa-check"></i>
                        <span>Message Sent!</span>
                    </div>
                `;

                showMessage('Message sent successfully!', 'success');
                form.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                }, 3000);

            } catch (error) {
                showMessage('Error sending message. Please try again.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }
        });

        // Show message function
        function showMessage(text, type) {
            const message = document.createElement('div');
            message.className = `form-message ${type}`;
            message.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${text}</span>
            `;
            document.body.appendChild(message);
            
            setTimeout(() => message.classList.add('show'), 100);
            setTimeout(() => {
                message.classList.remove('show');
                setTimeout(() => message.remove(), 300);
            }, 3000);
        }

        // Form validation
        function isFormValid() {
            let valid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) valid = false;
            });
            return valid;
        }

        // Update submit button state
        function updateSubmitButtonState() {
            submitBtn.disabled = !isFormValid();
        }
    }

    // Initialize enhanced contact form
    document.addEventListener('DOMContentLoaded', initEnhancedContactForm);

    // Enhanced Footer Functionality
    function initEnhancedFooter() {
        // Particle Animation
        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'footer-particle';
            document.querySelector('footer').appendChild(particle);

            const destinationX = x + (Math.random() - 0.5) * 200;
            const destinationY = y - 100 - Math.random() * 100;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = '1';
            
            particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${destinationX - x}px, ${destinationY - y}px)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                fill: 'forwards'
            }).onfinish = () => particle.remove();
        }

        // Add particle effect to social links
        document.querySelectorAll('.footer-social-link').forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const rect = link.getBoundingClientRect();
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
                    }, i * 50);
                }
            });
        });

        // Magnetic effect on social links
        document.querySelectorAll('.footer-social-link').forEach(link => {
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

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.footer-column, .footer-contact-info li').forEach(el => {
            observer.observe(el);
        });

        // Enhanced hover effect for contact info items
        document.querySelectorAll('.footer-contact-info li').forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const icon = item.querySelector('i');
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = '#FBBF24';
            });

            item.addEventListener('mouseleave', (e) => {
                const icon = item.querySelector('i');
                icon.style.transform = '';
                icon.style.color = '';
            });
        });

        // Smooth scroll for footer links
        document.querySelectorAll('.footer-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Dynamic copyright year
        const yearElement = document.querySelector('.copyright-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Footer wave animation
        const wave = document.querySelector('.footer-wave');
        if (wave) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                wave.style.transform = `rotate(180deg) translate3d(0, ${scrolled * 0.1}px, 0)`;
            });
        }
    }

    // Initialize enhanced footer
    document.addEventListener('DOMContentLoaded', initEnhancedFooter);
});
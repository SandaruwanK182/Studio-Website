// Gallery data
const galleryItems = [
    // Portraits
    {
        id: 1,
        category: 'portraits',
        image: 'https://images.pexels.com/photos/1154059/pexels-photo-1154059.jpeg',
        title: 'Professional Portrait',
        description: 'Studio photography session'
    },
    {
        id: 2,
        category: 'portraits',
        image: 'https://portraitphotoawards.net/imagecache/i600/photos/5714/martadankiewicz_8439_1636456841.JPG',
        title: 'Natural Light Portrait',
        description: 'Outdoor portrait photography'
    },
    {
        id: 3,
        category: 'portraits',
        image: 'https://img.freepik.com/free-photo/fashion-portrait-stylish-woman-colorful-print-long-sleeve-top-pink-shorts-beach-tropical-background_343596-1039.jpg',
        title: 'Fashion Portrait',
        description: 'Fashion and lifestyle photography'
    },

    // Drone Shots
    {
        id: 4,
        category: 'drone',
        image: 'https://www.shutterstock.com/image-photo/colombosri-lanka-december-05-2018-600nw-1444012382.jpg',
        title: 'City Aerial View',
        description: 'Downtown skyline from above'
    },
    {
        id: 5,
        category: 'drone',
        image: 'https://t3.ftcdn.net/jpg/02/49/69/48/240_F_249694869_Z279FVEUlMXmwpbcyKdMRqKD0nWnJX3j.jpg',
        title: 'Coastal Landscape',
        description: 'Beach and ocean aerial view'
    },
    {
        id: 6,
        category: 'drone',
        image: 'https://lankanewsweb.net/wp-content/uploads/2023/05/finlays-kenya-tea-farm-aerial-800x600.jpg-768x513.jpg',
        title: 'Agricultural Patterns',
        description: 'Farmland from above'
    },

    // Events
    {
        id: 7,
        category: 'events',
        image: 'https://i.pinimg.com/736x/3b/61/1e/3b611e2d0db3c2b68d2dfef03ac5a253.jpg',
        title: 'Wedding Ceremony',
        description: 'Beautiful wedding moments'
    },
    {
        id: 8,
        category: 'events',
        image: 'https://www.srilankainsurance.com/images/news/peoples-bank-ties-up.jpg',
        title: 'Corporate Conference',
        description: 'Business event coverage'
    },
    {
        id: 9,
        category: 'events',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsNsOfI8ZUi9KDshgRhPp9EiZsoNsfbmHctyH5OegERDgtC7uB619ggLdXjwKzhU2n_uo&usqp=CAU',
        title: 'Birthday Celebration',
        description: 'Special moments captured'
    },

    // Nature
    {
        id: 10,
        category: 'nature',
        image: 'https://res.cloudinary.com/enchanting/q_70,f_auto,c_lfill,g_auto/exodus-web/2021/12/adams-peak-3.jpg',
        title: 'Mountain Landscape',
        description: 'Majestic mountain views'
    },
    {
        id: 11,
        category: 'nature',
        image: 'https://yangadventure.com/wp-content/uploads/2023/05/gerandi-ella-1-1024x577.webp',
        title: 'Forest Waterfall',
        description: 'Hidden waterfall in nature'
    },
    {
        id: 12,
        category: 'nature',
        image: 'https://marriedtoourbackpacks.wordpress.com/wp-content/uploads/2014/10/wpid-img_20141011_153321.jpg',
        title: 'Sunset at Beach',
        description: 'Golden hour photography'
    },
    
    // Additional Mixed Categories
    {
        id: 13,
        category: 'portraits',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrAlUmm4a-UfeV_7AUyt8G_arYyCHo-nnmWw&s',
        title: 'Street Portrait',
        description: 'Urban photography session'
    },
    {
        id: 14,
        category: 'drone',
        image: 'https://srilankangreenway.wordpress.com/wp-content/uploads/2014/09/2678483191_0444e1f209.jpg',
        title: 'Mountain Range Aerial',
        description: 'Mountain peaks from above'
    },
    {
        id: 15,
        category: 'events',
        image: 'https://cdn.hirunews.lk/Data/News_Images/202203/1647195432_5618942_hirunews.jpg',
        title: 'Music Festival',
        description: 'Live concert photography'
    },
    {
        id: 16,
        category: 'nature',
        image: 'https://www.shutterstock.com/image-photo/desert-landscape-sand-dunes-sunset-600nw-1444012382.jpg',
        title: 'Desert Landscape',
        description: 'Sand dunes at sunset'
    }
];

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true
    });
    
    initGallery();
});

function initGallery() {
    const gallery = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentCategory = 'all';

    // Render initial gallery
    renderGallery(currentCategory);

    // Filter button click handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            currentCategory = category;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Re-render gallery
            renderGallery(category);
        });
    });

    // Lightbox functionality
    initLightbox();
}

function renderGallery(category) {
    const gallery = document.querySelector('.gallery-grid');
    gallery.innerHTML = '';

    const filteredItems = category === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const element = createGalleryItem(item);
        gallery.appendChild(element);
    });
}

function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item fade-enter';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-item-overlay">
            <h3 class="text-white text-xl font-bold mb-2">${item.title}</h3>
            <p class="text-gray-300 text-sm">${item.description}</p>
        </div>
    `;

    // Add animation class after element is added to DOM
    requestAnimationFrame(() => {
        div.classList.remove('fade-enter');
        div.classList.add('fade-enter-active');
    });

    div.addEventListener('click', () => openLightbox(item));
    return div;
}

function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-content img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;

    // Convert NodeList to Array for easier navigation
    const galleryArray = Array.from(galleryItems);

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            showImage(currentImageIndex);
            lightbox.classList.remove('hidden');
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigate images
    lightboxPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryArray.length) % galleryArray.length;
        showImage(currentImageIndex);
    });

    lightboxNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryArray.length;
        showImage(currentImageIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrev.click();
            if (e.key === 'ArrowRight') lightboxNext.click();
        }
    });

    function showImage(index) {
        const newSrc = galleryArray[index].src;
        lightboxImg.src = newSrc;
        lightboxImg.alt = galleryArray[index].alt;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.classList.add('hidden');
        }, 300);
    }

    // Handle image loading errors
    galleryItems.forEach(img => {
        img.addEventListener('error', function() {
            this.src = '../images/placeholder.jpg'; // Add a placeholder image
            this.alt = 'Image not found';
        });
    });
}

function openLightbox(item) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    
    updateLightboxImage(item);
    lightbox.classList.remove('hidden');
}

function updateLightboxImage(item) {
    const lightboxImg = document.querySelector('.lightbox-content img');
    lightboxImg.src = item.image;
    lightboxImg.alt = item.title;
}


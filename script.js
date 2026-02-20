document.addEventListener('DOMContentLoaded', function () {

    // ------------------------------------------------
    // 1. Mobile Menu
    // ------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuOverlay.addEventListener('click', toggleMenu);
    }

    // ------------------------------------------------
    // 2. Sticky Header Effects
    // ------------------------------------------------
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '15px 0';
        }
    });

    // ------------------------------------------------
    // 3. Scroll to Top
    // ------------------------------------------------
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    // ------------------------------------------------
    // 4. Contact Form Redirect to WhatsApp
    // ------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Format message
            const whatsappMsg = `Hi, I'm ${name} (${phone}). ${message}`;
            const whatsappUrl = `https://wa.me/94728983133?text=${encodeURIComponent(whatsappMsg)}`;

            window.open(whatsappUrl, '_blank');
        });
    }

    // ------------------------------------------------
    // 5. Product Modal Gallery Slider
    // ------------------------------------------------

    // Product Database
    /* 
       We use the naming convention: 
       baseName-index.jpg (e.g. dress1-1.jpg, dress1-2.jpg)
       Ensure you have these images in images/products/
    */
    // Product Database
    const products = {
        'p1': {
           name: "Flowy Dress",
           price: "Rs 3990",
            images: ["p1-1.jpg", "p1-2.jpg"] // Add more like "p1-2.jpg" when you have them
        },
        'p2': {
           name: "Beige Ribbed Dress",
           price: "Rs 3750",
            images: ["p2-1.jpg", "p2-2.jpg"]
        },
        'p3': {
           name: "Maroon Ribbed Dress",
           price: "Rs 3750",
            images: ["p3-1.jpg", "p3-2.jpg"]
        },
        'p4': {
            name: "Bow-Detail Dress - Black",
            price: "Rs 3750",
            images: ["p4-1.jpg", "p4-2.jpg"]
        },
        'p5': {
            name: "Bow-Detail Dress - Red",
            price: "Rs 3750",
            images: ["p5-1.jpg", "p5-2.jpg", "p5-3.jpg"]
        },
        'p6': {
            name: "Graphic Crop Tee",
            price: "Rs 2400",
            images: ["p6-1.jpg", "p6-2.jpg", "p6-3.jpg"]
        }
    };

    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('gallery-image');
    const modalTitle = document.getElementById('gallery-title');
    const modalPrice = document.getElementById('gallery-price');
    const whatsappBtn = document.getElementById('gallery-whatsapp-btn');
    const closeBtn = document.getElementById('close-gallery');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentProduct = null;
    let currentIndex = 0; // 0-indexed for arrays

    // Open Gallery Function (Global)
    window.openProductGallery = function (productId) {
        const product = products[productId];
        if (!product) return;

        currentProduct = product;
        currentIndex = 0;

        // Set Content
        modalTitle.textContent = product.name;
        modalPrice.textContent = product.price;

        // Set WhatsApp Link
        const orderMsg = `I want to order ${product.name} from Damsel`;
        whatsappBtn.href = `https://wa.me/94728983133?text=${encodeURIComponent(orderMsg)}`;

        // Show Modal
        updateImage();
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Disable scroll
    };

    function updateImage() {
        if (!currentProduct) return;

        // Path: images/products/filename.jpg
        const path = `${currentProduct.images[currentIndex]}`;

        // Fade out
        modalImg.style.opacity = '0.5';

        setTimeout(() => {
            modalImg.src = path;
            modalImg.onload = () => {
                modalImg.style.opacity = '1';
            };
        }, 150);
    }

    // Controls
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < currentProduct.images.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop
            }
            updateImage();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = currentProduct.images.length - 1; // Loop
            }
            updateImage();
        });
    }

    // Close
    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto'; // Enable scroll
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Click outside to close
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'Escape') closeModal();
    });

});







document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.getElementById('account1-slideshow-container');
    if (!slideshowContainer) return;

    const slideshowImage = document.getElementById('slideshow-image');
    const prevButton = document.getElementById('slideshow-prev');
    const nextButton = document.getElementById('slideshow-next');

    const imagePaths = [];
    for (let i = 0; i < 19; i++) { // A.png to S.png (19 images)
        const charCode = 'A'.charCodeAt(0) + i;
        imagePaths.push(`images/account-1/${String.fromCharCode(charCode)}.png`);
    }

    let currentIndex = 0;
    let autoRotateInterval;
    let userInteracted = false;

    function updateImage() {
        slideshowImage.src = imagePaths[currentIndex];
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % imagePaths.length;
        updateImage();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
        updateImage();
    }

    function startAutoRotate() {
        if (autoRotateInterval) clearInterval(autoRotateInterval); // Clear any existing interval
        if (!userInteracted) {
            autoRotateInterval = setInterval(showNextImage, 2000); // Speed up to 2 seconds
        }
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
        userInteracted = true;
    }

    // Initial image load
    updateImage();
    startAutoRotate();

    // Event listeners for manual navigation
    prevButton.addEventListener('click', () => {
        stopAutoRotate();
        showPrevImage();
    });

    nextButton.addEventListener('click', () => {
        stopAutoRotate();
        showNextImage();
    });

    // Lightbox functionality
    let lightboxOverlay = null;
    let lightboxImage = null;

    function openLightbox(src) {
        if (!lightboxOverlay) {
            lightboxOverlay = document.createElement('div');
            lightboxOverlay.id = 'slideshow-lightbox-overlay';
            Object.assign(lightboxOverlay.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '10000', // Higher than other elements
                cursor: 'pointer',
                opacity: '0',
                transition: 'opacity 0.3s ease'
            });

            lightboxImage = document.createElement('img');
            Object.assign(lightboxImage.style, {
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
            });

            lightboxOverlay.appendChild(lightboxImage);
            document.body.appendChild(lightboxOverlay);

            lightboxOverlay.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', handleKeydown);
        }

        lightboxImage.src = src;
        lightboxOverlay.style.opacity = '1';
        lightboxOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    }

    function closeLightbox() {
        if (lightboxOverlay) {
            lightboxOverlay.style.opacity = '0';
            setTimeout(() => {
                lightboxOverlay.style.display = 'none';
                if (lightboxOverlay.parentNode) {
                    lightboxOverlay.parentNode.removeChild(lightboxOverlay); // Remove from DOM
                }
                lightboxOverlay = null; // Reset for next open
                lightboxImage = null;
            }, 300);
            document.body.style.overflow = ''; // Restore scrolling
            document.removeEventListener('keydown', handleKeydown); // Clean up keydown listener
        }
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    }

    slideshowImage.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent js/lightbox.js from also reacting if it targets this image
        openLightbox(slideshowImage.src);
    });
});

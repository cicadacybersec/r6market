document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelectorAll('.carousel-screenshot img, .screenshot-placeholder img');
    let lightboxOverlay = null;
    let lightboxImage = null;

    function openLightbox(src) {
        if (!lightboxOverlay) {
            lightboxOverlay = document.createElement('div');
            lightboxOverlay.id = 'lightbox-overlay';
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
                zIndex: '1000',
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
        lightboxOverlay.style.display = 'flex'; // Ensure it's visible
    }

    function closeLightbox() {
        if (lightboxOverlay) {
            lightboxOverlay.style.opacity = '0';
            // Use a timeout to hide after transition
            setTimeout(() => {
                lightboxOverlay.style.display = 'none';
            }, 300); // Match transition duration
        }
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    }

    carouselImages.forEach(img => {
        img.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from propagating to overlay immediately
            openLightbox(img.src);
        });
    });
});

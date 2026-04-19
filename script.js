document.addEventListener('DOMContentLoaded', () => {
    console.log('script.js loaded and DOMContentLoaded fired.'); // Debug log
    const typewriterEl = document.getElementById('typewriter-title');
    if (typewriterEl) { // Only run typewriter logic if element exists
        const typewriterText = 'SIEGEVAULT';
        let charIndex = 0;

        function typeNextChar() {
            if (charIndex < typewriterText.length) {
                typewriterEl.textContent = typewriterText.slice(0, charIndex + 1);
                charIndex++;
                setTimeout(typeNextChar, 80);
            } else {
                typewriterEl.classList.add('typing-done');
            }
        }

        typewriterEl.classList.add('typing-active');
        setTimeout(typeNextChar, 300);
    }

    const interestModal = document.getElementById('interestModal');
    if (interestModal) { // Check if modal exists
        const closeButton = interestModal.querySelector('.close-button');
        const registerButtons = document.querySelectorAll('.modal-submit-button[data-account-id]'); // Select only account-related buttons
        const accountWantedInput = document.getElementById('accountWanted');
        const modalAccountSubtitle = document.getElementById('modalAccountSubtitle');
        const interestForm = document.getElementById('interestForm');
        const confirmationMessage = document.getElementById('confirmationMessage');

        // Function to open the modal
        function openInterestModal(accountName) {
            console.log('openInterestModal called for:', accountName); // Debug log
            if (!interestModal) {
                console.error('Interest Modal element not found!'); // Debug log
                return;
            }
            accountWantedInput.value = accountName;
            modalAccountSubtitle.textContent = accountName;
            interestModal.classList.add('active'); // Use class for active state
            console.log('Interest Modal active class added. Current classes:', interestModal.classList); // Debug log
            confirmationMessage.style.display = 'none'; // Hide confirmation if previously shown
            interestForm.reset(); // Reset form fields
            interestForm.style.display = 'block'; // Show form
        }

        // Function to close the modal
        function closeInterestModal() {
            interestModal.classList.remove('active'); // Use class for active state
        }

        // Event listeners for opening modal
        registerButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                console.log('Register Interest button clicked!'); // Debug log
                const accountName = event.target.dataset.accountName;
                console.log('Account Name:', accountName); // Debug log
                openInterestModal(accountName);
            });
        });

        // Event listener for closing modal
        closeButton.addEventListener('click', closeInterestModal);

        // Close modal if clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === interestModal) {
                closeInterestModal();
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && interestModal.classList.contains('active')) {
                closeInterestModal();
            }
        });

        // Handle form submission (removed specific submit listener as global-form-handler.js manages it)
    }

    // --- Enhancements Modals Logic ---
    const standardRequestModal = document.getElementById('standardRequestModal');
    const premiumRequestModal = document.getElementById('premiumRequestModal');
    const requestEnhancementButtons = document.querySelectorAll('.request-enhancement-button');

    function setupEnhancementModal(modalElement, formId, confirmationId, productSubtitleId, productWantedId) {
        if (!modalElement) return;

        const closeButton = modalElement.querySelector('.close-button');
        const form = document.getElementById(formId);
        const confirmationMessage = document.getElementById(confirmationId);
        const productSubtitle = document.getElementById(productSubtitleId);
        const productWantedInput = document.getElementById(productWantedId);

        function openEnhancementModal(productType) {
            productSubtitle.textContent = productType;
            productWantedInput.value = productType;
            modalElement.classList.add('active');
            confirmationMessage.style.display = 'none';
            form.reset();
            form.style.display = 'block';
        }

        function closeEnhancementModal() {
            modalElement.classList.remove('active');
        }

        closeButton.addEventListener('click', closeEnhancementModal);
        window.addEventListener('click', (event) => {
            if (event.target === modalElement) {
                closeEnhancementModal();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modalElement.classList.contains('active')) {
                closeEnhancementModal();
            }
        });

        // Removed form.addEventListener('submit') as global-form-handler.js manages it

        return openEnhancementModal; // Return the open function for external use
    }

    const openStandardEnhancementModal = setupEnhancementModal(
        standardRequestModal,
        'standardRequestForm',
        'standardConfirmationMessage',
        'standardModalProductSubtitle',
        'standardProductWanted'
    );

    const openPremiumEnhancementModal = setupEnhancementModal(
        premiumRequestModal,
        'premiumRequestForm',
        'premiumConfirmationMessage',
        'premiumModalProductSubtitle',
        'premiumProductWanted'
    );

    requestEnhancementButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productType = event.target.dataset.productType;
            if (productType === 'Standard Anti Recoil Macros') {
                openStandardEnhancementModal(productType);
            } else if (productType === 'Premium Anti Recoil Macros') {
                openPremiumEnhancementModal(productType);
            }
        });
    });


    const accountRequestForm = document.getElementById('accountRequestForm');
    const requestConfirmationMessage = document.getElementById('requestConfirmationMessage');

    if (accountRequestForm) {
        // Removed accountRequestForm.addEventListener('submit') as global-form-handler.js manages it
    }

    const contactForm = document.getElementById('contactForm');
    const contactConfirmationMessage = document.getElementById('contactConfirmationMessage');

    if (contactForm) {
        // Removed contactForm.addEventListener('submit') as global-form-handler.js manages it
    }
});
// Carousel logic
(function() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  let current = 0;
  let autoplay = true;
  let interval;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const total = slides.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * (100 / total)}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAutoplay() {
    interval = setInterval(() => { if (autoplay) goTo(current + 1); }, 3500);
  }

  function stopAutoplay() {
    autoplay = false;
    clearInterval(interval);
  }

  document.querySelector('.carousel-prev')?.addEventListener('click', () => { stopAutoplay(); goTo(current - 1); });
  document.querySelector('.carousel-next')?.addEventListener('click', () => { stopAutoplay(); goTo(current + 1); });
  dots.forEach(dot => dot.addEventListener('click', () => { stopAutoplay(); goTo(parseInt(dot.dataset.index)); }));

  startAutoplay();
})();

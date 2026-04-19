// Global Turnstile callbacks
window.onTurnstileSuccess = function (token, widgetId) {
    const turnstileElement = document.getElementById(widgetId);
    if (!turnstileElement) return;

    const form = turnstileElement.closest('form');
    if (form) {
        updateFormState(form);
    }
};

window.onTurnstileExpired = function (widgetId) {
    const turnstileElement = document.getElementById(widgetId);
    if (!turnstileElement) return;

    const form = turnstileElement.closest('form');
    if (form) {
        updateFormState(form);
    }
};

// Update form submission state
function updateFormState(form) {
    const submitButton = form.querySelector('[type="submit"]');
    const termsCheckbox = form.querySelector('.termsCheck');
    const errorMessage = form.querySelector('.form-error-message');
    const turnstileResponseInput = form.querySelector('[name="cf-turnstile-response"]');

    // If required elements are missing, do nothing (prevents breaking unrelated forms)
    if (!submitButton || !termsCheckbox || !turnstileResponseInput) {
        return false;
    }

    const isTurnstileVerified = turnstileResponseInput.value && turnstileResponseInput.value.length > 0;
    const areTermsAccepted = termsCheckbox.checked;

    if (isTurnstileVerified && areTermsAccepted) {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');

        if (errorMessage) {
            errorMessage.style.display = 'none';
        }

        return true;
    } else {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form').forEach(form => {
        const submitButton = form.querySelector('[type="submit"]');
        const termsCheckbox = form.querySelector('.termsCheck');
        const turnstileDiv = form.querySelector('.cf-turnstile');
        const errorMessage = form.querySelector('.form-error-message');

        // Skip forms that aren't using this system
        if (!submitButton || !termsCheckbox || !turnstileDiv) {
            return;
        }

        // Initial state
        updateFormState(form);

        // Terms checkbox change
        termsCheckbox.addEventListener('change', () => {
            updateFormState(form);
        });

        // Submit handling
        form.onsubmit = async function(event) {
            event.preventDefault();

            const turnstileInput = form.querySelector('[name="cf-turnstile-response"]');
            const termsCheckbox = form.querySelector('.termsCheck');
            const errorMessage = form.querySelector('.form-error-message');

            const isTurnstileValid = turnstileInput && turnstileInput.value.length > 0;
            const isTermsAccepted = termsCheckbox && termsCheckbox.checked;

            if (!isTurnstileValid || !isTermsAccepted) {
                if (errorMessage) errorMessage.style.display = 'block';
                return;
            }

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {
                    window.location.href = "/thank-you.html";
                } else {
                    // Handle non-OK responses from Formspree
                    if (errorMessage) {
                        errorMessage.style.display = 'block';
                        errorMessage.textContent = "Submission failed. Please try again.";
                    }
                }

            } catch (err) {
                console.error("Submission error:", err);
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = "Network error. Please check your connection.";
                }
            }
        };
    });
});

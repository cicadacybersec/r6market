document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (hamburger && navDropdown) {
        hamburger.addEventListener('click', () => {
            navDropdown.classList.toggle('active');
            hamburger.classList.toggle('open'); // Optional: for animating the hamburger icon
        });

        // Close dropdown when a link is clicked
        navDropdown.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navDropdown.classList.remove('active');
                hamburger.classList.remove('open');
            });
        });
    }
});

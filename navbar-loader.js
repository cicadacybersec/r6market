document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;
  fetch('navbar.html')
    .then(res => res.text())
    .then(html => {
      placeholder.innerHTML = html;

      // Load navbar-specific JavaScript after the navbar is in the DOM
      const script = document.createElement('script');
      script.src = 'js/navbar.js';
      script.defer = true;
      document.body.appendChild(script);
    });
});

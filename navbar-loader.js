document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;
  fetch('navbar.html')
    .then(res => res.text())
    .then(html => {
      placeholder.innerHTML = html;
    });
});

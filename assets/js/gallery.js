const imgs = document.querySelectorAll('.gallery img');
const full = document.querySelector('.full');

imgs.forEach(img => {
  img.addEventListener('click', function() {
    full.style.backgroundImage = 'url(' + img.src + ')';
    full.style.display = 'block';
  });
});
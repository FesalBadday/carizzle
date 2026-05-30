const form = document.getElementById('contactForm');
const msg = document.querySelector('.thank-you-msg');
const btn = document.querySelector('.form-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Hide the button to simulate system processing
  btn.classList.add('hide');

  // Reveal the terminal success transmission message
  msg.classList.remove('hide');

  // Terminal typing simulation for effect
  let originalText = msg.innerText;
  msg.innerText = "";
  let i = 0;
  let typingEffect = setInterval(() => {
    msg.innerText += originalText.charAt(i);
    i++;
    if (i >= originalText.length) {
      clearInterval(typingEffect);
      setTimeout(() => form.submit(), 2500); // Standard submission delay
    }
  }, 30);
});
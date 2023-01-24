const form = document.querySelector('form');
const msg = document.querySelector('.thank-you-msg');
const btn = document.querySelector('.form-btn');
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  msg.classList.toggle('hide');
  btn.classList.toggle('hide');
  setTimeout(() => form.submit(), 2500);
});
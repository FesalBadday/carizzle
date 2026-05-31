document.addEventListener('DOMContentLoaded', () => {

  // 1. System Boot Sequence
  const bootScreen = document.getElementById('boot-sequence');
  setTimeout(() => {
    bootScreen.style.opacity = '0';
    setTimeout(() => {
      bootScreen.style.display = 'none';
    }, 800);
  }, 2200);

  // 2. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal-up');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => revealOnScroll.observe(el));

  // 3. Simple Parallax for Hero Background
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY;
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollPos * 0.4}px)`;
    }
  });

  // 5. Interactive Particle Canvas Background
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particlesArray = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 30) + 1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        this.x -= dx / this.density;
        this.y -= dy / this.density;
      } else {
        if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 20;
        if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 20;
      }

      this.baseX += this.directionX;
      this.baseY += this.directionY;

      if (this.baseX < 0 || this.baseX > canvas.width) this.directionX = -this.directionX;
      if (this.baseY < 0 || this.baseY > canvas.height) this.directionY = -this.directionY;

      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 12000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 0.5;
      let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 0.4) - 0.2;
      let directionY = (Math.random() * 0.4) - 0.2;
      let color = 'rgba(0, 243, 255, 0.4)';
      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
  }

  // Preload the 3D model so it's cached in the background
  const preloadModel = document.createElement('link');
  preloadModel.rel = 'preload';
  preloadModel.href = 'assets/images/model.glb';
  preloadModel.as = 'fetch';
  document.head.appendChild(preloadModel);

  // 6. Simulation Button Action
  const simBtn = document.querySelector('.pulse-btn');
  if (simBtn) {
    simBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const originalText = simBtn.innerText;
      simBtn.innerText = 'INITIALIZING...';
      
      setTimeout(() => {
        const scanner = document.querySelector('.config-scanner');
        if (scanner) {
          // Hide the hologram text
          const holoText = scanner.querySelector('.hologram-text');
          if (holoText) holoText.style.display = 'none';
          
          // Hide the scanning line
          const scanLine = scanner.querySelector('.scanner-line');
          if (scanLine) scanLine.style.display = 'none';
          
          // Insert the model image
          let modelImg = scanner.querySelector('.scanner-model-img');
          if (!modelImg) {
            modelImg = document.createElement('model-viewer');
            modelImg.src = 'assets/images/model.glb';
            modelImg.alt = 'Simulation 3D Model';
            modelImg.className = 'scanner-model-img';
            modelImg.setAttribute('auto-rotate', '');
            modelImg.setAttribute('camera-controls', '');

            // Wait for the model to fully load before revealing it and hiding the button
            modelImg.addEventListener('load', () => {
              modelImg.classList.add('visible');
              simBtn.style.display = 'none';
            });
            
            scanner.appendChild(modelImg);
          }
        }
      }, 1200);
    });
  }

  initParticles();
  animateParticles();
});
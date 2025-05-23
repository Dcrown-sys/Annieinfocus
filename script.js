const track = document.querySelector('.portfolio-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dotsContainer = document.querySelector('.portfolio-dots');

let slideWidth = slides[0].getBoundingClientRect().width;
let index = 0;
let interval;

// Create Dots
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

// Dot Navigation
const dots = Array.from(dotsContainer.children);
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    moveSlide();
    resetAutoplay();
  });
});

// Slide Functions
function moveSlide() {
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Prev/Next Buttons
nextButton.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  moveSlide();
  resetAutoplay();
});

prevButton.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  moveSlide();
  resetAutoplay();
});

// Autoplay
function startAutoplay() {
  interval = setInterval(() => {
    index = (index + 1) % slides.length;
    moveSlide();
  }, 4000); // Change every 4 seconds
}

function resetAutoplay() {
  clearInterval(interval);
  startAutoplay();
}

startAutoplay();

// Update slideWidth if window resizes
window.addEventListener('resize', () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  moveSlide();
});


// stars align
const canvas = document.getElementById('star-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
      });
    }
  }
  createStars(120); // You can adjust star quantity here

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';

    stars.forEach(star => {
      star.x += star.speedX;
      star.y += star.speedY;

      if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
      if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animateStars);
  }
  animateStars();
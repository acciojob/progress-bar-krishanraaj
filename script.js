const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

next.addEventListener('click', () => {
  currentActive++;
  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
  update();
});

prev.addEventListener('click', () => {
  currentActive--;
  if (currentActive < 1) {
    currentActive = 1;
  }
  update();
});

function update() {
  circles.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add('active');
    } else {
      circle.classList.remove('active');
    }
  });

  const actives = document.querySelectorAll('.active');
  progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';

  // Set disabled attribute explicitly for Cypress compatibility
  if (currentActive === 1) {
    prev.disabled = true;
    prev.removeAttribute('aria-disabled');
  } else {
    prev.disabled = false;
    prev.removeAttribute('aria-disabled');
  }

  if (currentActive === circles.length) {
    next.disabled = true;
    next.removeAttribute('aria-disabled');
  } else {
    next.disabled = false;
    next.removeAttribute('aria-disabled');
  }
}

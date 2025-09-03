const progress = document.getElementById('progress');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');

    // Ensure circles are used in ID order (circle-1..circle-5)
    const circles = Array.from(document.querySelectorAll('.circle'))
      .sort((a, b) => {
        const ai = parseInt(a.id.split('-')[1], 10);
        const bi = parseInt(b.id.split('-')[1], 10);
        return ai - bi;
      });

    // Index of the last active circle (0-based). Initial: circle-1 active.
    let currentIndex = 0;

    // Helper to toggle both property & attribute (for strict tests)
    function setDisabled(btn, isDisabled) {
      btn.disabled = isDisabled;
      btn.toggleAttribute('disabled', isDisabled);
      btn.setAttribute('aria-disabled', String(isDisabled));
    }

    function render() {
      // Activate circles up to currentIndex; deactivate the rest
      circles.forEach((c, i) => c.classList.toggle('active', i <= currentIndex));

      // Progress width: 0% at first circle, 100% at last
      const percent = (currentIndex / (circles.length - 1)) * 100;
      progress.style.width = percent + '%';

      // Button states
      setDisabled(prev, currentIndex === 0);
      setDisabled(next, currentIndex === circles.length - 1);
    }

    next.addEventListener('click', () => {
      if (currentIndex < circles.length - 1) {
        currentIndex += 1;
        render();
      }
    });

    prev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex -= 1;
        render();
      }
    });

    // Initial paint guarantees expected initial state for tests
    render();
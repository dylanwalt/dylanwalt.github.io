/**
 * Scroll-scrubbed cinematic hero (video time mapped to scroll progress).
 * Inspired by luxury hospitality sites and scroll-sequence patterns.
 */
export function initCinemaHero() {
  const section = document.getElementById('cinema-hero');
  const video = section?.querySelector('.cinema-video');
  const drone = section?.querySelector('.cinema-drone');
  const header = document.querySelector('.site-header--hero');
  if (!section) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !video) {
    if (video) video.removeAttribute('src');
    return;
  }

  let duration = 0;
  let ready = false;

  const update = () => {
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable));

    if (ready && duration > 0) {
      const target = progress * Math.max(0, duration - 0.05);
      if (Math.abs(video.currentTime - target) > 0.04) {
        video.currentTime = target;
      }
    }

    if (drone) {
      const x = progress * 140 - 20;
      const y = -progress * 60 + 10;
      const rot = progress * 12 - 6;
      drone.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    }

    section.style.setProperty('--cinema-progress', String(progress));

    if (header) {
      header.classList.toggle('is-solid', progress > 0.82 || window.scrollY > window.innerHeight * 0.5);
    }
  };

  const onScroll = () => requestAnimationFrame(update);

  video.addEventListener('loadedmetadata', () => {
    duration = video.duration || 0;
    ready = true;
    video.pause();
    update();
  });

  video.addEventListener('error', () => {
    video.classList.add('is-hidden');
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

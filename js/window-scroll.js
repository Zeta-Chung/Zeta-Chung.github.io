'use strict';

(() => {
  const frame = document.querySelector('.main.win95-window');
  if (!frame) return;
  const content = frame.querySelector('.main-inner');
  const desktop = window.matchMedia('(min-width: 768px)');
  const back = document.querySelector('.back-to-top');

  function update() {
    if (!desktop.matches) return;
    const distance = content.scrollHeight - content.clientHeight;
    const percent = distance > 0 ? Math.min(100, content.scrollTop / distance * 100) : 0;
    if (back) {
      back.classList.toggle('back-to-top-on', percent >= 5);
      const label = back.querySelector('span');
      if (label) label.textContent = `${Math.round(percent)}%`;
    }
    document.querySelector('.reading-progress-bar')?.style.setProperty('--progress', `${percent}%`);
    const links = [...frame.querySelectorAll('.post-toc .nav-link')];
    let current = 0;
    links.forEach((link, index) => {
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (target && target.getBoundingClientRect().top <= content.getBoundingClientRect().top + 24) current = index;
    });
    if (links.length && window.NexT?.utils) window.NexT.utils.activateNavByIndex(current);
  }

  window.scrollWindowTarget = (target, alignment = 'start') => {
    if (!desktop.matches || !content.contains(target)) return false;
    const offset = alignment === 'center' ? (content.clientHeight - target.getBoundingClientRect().height) / 2 : 12;
    content.scrollTo({ top: content.scrollTop + target.getBoundingClientRect().top - content.getBoundingClientRect().top - offset, behavior: 'auto' });
    return true;
  };

  function layout() {
    document.body.classList.toggle('window-scroll-mode', desktop.matches);
    if (desktop.matches && !frame.hidden) {
      frame.style.setProperty('--window-top-space', `${frame.getBoundingClientRect().top + window.scrollY}px`);
      frame.style.setProperty('--xp-content-height', `${content.clientHeight}px`);
    }
    update();
  }

  document.addEventListener('click', event => {
    if (!desktop.matches || !event.target.closest('.back-to-top')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    content.scrollTo({ top: 0, behavior: 'auto' });
  }, true);
  content.addEventListener('scroll', update, { passive: true });
  frame.querySelector('.window-caption-maximize')?.addEventListener('click', layout);
  window.addEventListener('resize', layout);
  window.addEventListener('load', () => {
    layout();
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) window.scrollWindowTarget(target);
  });
  layout();
})();

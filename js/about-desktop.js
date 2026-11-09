'use strict';

(() => {
  const desktop = document.querySelector('.xp-desktop-nav');
  if (!desktop) return;
  const shortcuts = [...desktop.querySelectorAll('.xp-desktop-icon')];
  const pages = [...document.querySelectorAll('.xp-page')];
  const caption = document.querySelector('.window-caption-title');
  const captionIcon = document.querySelector('.xp-caption-icon');
  const frame = document.querySelector('.main.win95-window');

  function select(shortcut) {
    shortcuts.forEach(item => item.classList.toggle('is-selected', item === shortcut));
  }

  function openPage(id) {
    const shortcut = shortcuts.find(item => item.dataset.xpPage === id);
    if (!shortcut) return;
    frame.hidden = false;
    pages.forEach(page => { page.hidden = page.id !== `xp-${id}`; });
    shortcuts.forEach(item => {
      if (item === shortcut) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
    select(shortcut);
    caption.textContent = shortcut.querySelector('.xp-icon-label').textContent;
    captionIcon.src = shortcut.querySelector('.xp-icon-art').src;
  }

  function closeWindow() {
    const current = shortcuts.find(item => item.hasAttribute('aria-current'));
    frame.hidden = true;
    select(null);
    shortcuts.forEach(item => item.removeAttribute('aria-current'));
    if (current) current.focus({ preventScroll: true });
  }

  frame.querySelector('.window-caption-close').addEventListener('click', () => {
    closeWindow();
    location.hash = '#xp-desktop';
  });

  function showLocation() {
    if (location.hash === '#xp-desktop') closeWindow();
    else openPage(location.hash.replace('#xp-', '') || 'profile');
  }

  desktop.addEventListener('click', event => {
    const shortcut = event.target.closest('.xp-desktop-icon');
    if (!shortcut) return;
    select(shortcut);
    if (!shortcut.dataset.xpPage || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    // Hash navigation also makes browser back/forward restore a content page.
    if (location.hash === shortcut.hash) openPage(shortcut.dataset.xpPage);
    else location.hash = shortcut.hash;
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.xp-desktop-icon')) select(null);
  });
  window.addEventListener('hashchange', showLocation);
  showLocation();
})();

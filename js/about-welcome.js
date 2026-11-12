'use strict';

(() => {
  const welcome = document.getElementById('xpWelcome');
  if (!welcome) return;

  function enterAbout() {
    welcome.hidden = true;
    document.body.classList.remove('xp-welcome-open');
    const title = document.querySelector('.main[hidden]')
      ? document.querySelector('.xp-desktop-icon')
      : document.querySelector('.xp-page:not([hidden])');
    if (title) {
      title.setAttribute('tabindex', '-1');
      title.focus({ preventScroll: true });
    }
  }

  welcome.focus({ preventScroll: true });
  window.setTimeout(enterAbout, 2500);
})();

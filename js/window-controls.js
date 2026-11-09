'use strict';

(() => {
  const frame = document.querySelector('.main.win95-window');
  const toggle = document.querySelector('.window-caption-maximize');
  if (!frame || !toggle) return;
  let restoreScrollY = 0;

  frame.querySelector('.window-caption-close').addEventListener('click', event => {
    if (document.body.classList.contains('xp-about')) return;
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    try {
      sessionStorage.setItem('zetac-notifications-replay', '1');
    } catch (_) {
      // The ordinary home link remains usable without browser storage.
    }
  });

  toggle.addEventListener('click', () => {
    const maximizing = !document.body.classList.contains('window-is-maximized');
    if (maximizing) {
      restoreScrollY = window.scrollY;
      const bar = frame.querySelector('.window-titlebar');
      const style = getComputedStyle(frame);
      const captionSpace = bar.getBoundingClientRect().height +
        parseFloat(getComputedStyle(bar).marginBottom) +
        parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      frame.style.setProperty('--window-top-space', `${frame.getBoundingClientRect().top + window.scrollY}px`);
      frame.style.setProperty('--window-caption-space', `${captionSpace}px`);
    }
    document.body.classList.toggle('window-is-maximized', maximizing);
    toggle.setAttribute('aria-pressed', String(maximizing));
    toggle.setAttribute('aria-label', maximizing ? '还原窗口' : '最大化窗口');
    toggle.title = maximizing ? '还原窗口' : '最大化窗口';
    // Keep document scrolling so article TOC, search and browser history still work.
    if (!maximizing) window.scrollTo(0, restoreScrollY);
  });
})();

'use strict';

(() => {
  const directory = document.querySelector('.classification-directory');
  if (!directory) return;
  const tabs = [...directory.querySelectorAll('[role="tab"]')];
  function showTab(tab) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showTab(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') target = tabs[(index + tabs.length - 1) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (!target) return;
      event.preventDefault();
      showTab(target);
      target.focus();
    });
  });
  const folders = [...directory.querySelectorAll('.collection-folder')];
  folders.forEach(folder => folder.addEventListener('click', () => {
    folders.forEach(item => {
      const active = item === folder;
      item.setAttribute('aria-pressed', String(active));
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
  }));
})();

/**
 * Theme: auto (solar by visitor local clock) | light | dark
 * No geolocation. Longitude approximated from timezone offset so solar noon ≈ 12:00 local.
 */
(function () {
  const STORAGE_KEY = 'theme-mode';
  const MODES = ['auto', 'light', 'dark'];

  function dayOfYear(date) {
    const start = Date.UTC(date.getFullYear(), 0, 0);
    const now = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor((now - start) / 86400000);
  }

  /** Mid-latitude (~40°) day length; enough seasonal swing without asking for location. */
  function dayLengthHours(date) {
    const phi = (40 * Math.PI) / 180;
    const decl =
      ((-23.44 * Math.PI) / 180) *
      Math.cos((2 * Math.PI * (dayOfYear(date) + 10)) / 365);
    const cosHa = Math.max(-1, Math.min(1, -Math.tan(phi) * Math.tan(decl)));
    return (24 * Math.acos(cosHa)) / Math.PI;
  }

  function solarResolved(date) {
    const len = dayLengthHours(date);
    const sunrise = 12 - len / 2;
    const sunset = 12 + len / 2;
    const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
    return hours >= sunrise && hours < sunset ? 'light' : 'dark';
  }

  function getMode() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (MODES.includes(saved)) return saved;
    } catch (_) {}
    return 'auto';
  }

  function setMode(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (_) {}
  }

  function resolve(mode, date) {
    if (mode === 'light' || mode === 'dark') return mode;
    return solarResolved(date || new Date());
  }

  function apply(mode) {
    const resolved = resolve(mode);
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.style.colorScheme = resolved;
    return resolved;
  }

  function labelFor(mode, resolved) {
    if (mode === 'light') return 'Theme: light (click for dark)';
    if (mode === 'dark') return 'Theme: dark (click for auto / solar)';
    return `Theme: auto / solar — ${resolved} (click for light)`;
  }

  function syncToggle(button, mode, resolved) {
    if (!button) return;
    button.dataset.mode = mode;
    button.setAttribute('aria-label', labelFor(mode, resolved));
    button.title = labelFor(mode, resolved);
    button.querySelectorAll('[data-theme-icon]').forEach((el) => {
      el.hidden = el.getAttribute('data-theme-icon') !== mode;
    });
  }

  function boot() {
    const mode = getMode();
    const resolved = apply(mode);
    syncToggle(document.getElementById('theme-toggle'), mode, resolved);
  }

  function cycle() {
    const current = getMode();
    const next = MODES[(MODES.indexOf(current) + 1) % MODES.length];
    setMode(next);
    const resolved = apply(next);
    syncToggle(document.getElementById('theme-toggle'), next, resolved);
  }

  window.__theme = { getMode, setMode, resolve, apply, cycle, boot, solarResolved };

  boot();

  document.addEventListener('DOMContentLoaded', () => {
    boot();
    const button = document.getElementById('theme-toggle');
    if (button) button.addEventListener('click', cycle);

    // Re-evaluate auto theme around sunrise/sunset boundaries.
    setInterval(() => {
      if (getMode() === 'auto') {
        const resolved = apply('auto');
        syncToggle(document.getElementById('theme-toggle'), 'auto', resolved);
      }
    }, 60 * 1000);
  });
})();

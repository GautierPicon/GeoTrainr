import { browser } from '$app/environment';

export function applyTheme(themeValue) {
  if (!browser) return;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark =
    themeValue === 'dark' || (themeValue === 'system' && prefersDark);
  document.documentElement.classList.toggle('dark', dark);
}

function createTheme() {
  const initial = browser
    ? (localStorage.getItem('theme') ?? 'system')
    : 'system';
  let current = $state(initial);

  if (browser) applyTheme(initial);

  return {
    get current() {
      return current;
    },
    set current(value) {
      current = value;
      if (!browser) return;
      localStorage.setItem('theme', value);
      applyTheme(value);
    },
  };
}

function createTimerSettings() {
  let enabled = $state(
    browser ? localStorage.getItem('quizTimerEnabled') === 'true' : false
  );
  let duration = $state(
    browser
      ? parseInt(localStorage.getItem('quizTimerDuration') || '10', 10)
      : 10
  );

  return {
    get enabled() {
      return enabled;
    },
    set enabled(value) {
      enabled = value;
      if (browser) localStorage.setItem('quizTimerEnabled', String(value));
    },
    get duration() {
      return duration;
    },
    set duration(value) {
      duration = value;
      if (browser) localStorage.setItem('quizTimerDuration', String(value));
    },
  };
}

export const theme = createTheme();
export const timerSettings = createTimerSettings();

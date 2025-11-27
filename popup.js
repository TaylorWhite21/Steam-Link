/**
 * Popup script for Steam Link Redirector
 */

// Cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Default settings
const DEFAULT_SETTINGS = {
  enabled: true,
  pauseUntil: null,
  totalRedirects: 0,
  todayRedirects: 0,
  lastResetDate: new Date().toDateString()
};

let timerInterval = null;

// Load settings from storage
async function loadSettings() {
  const settings = await browserAPI.storage.sync.get(DEFAULT_SETTINGS);

  // Reset today's count if it's a new day
  const today = new Date().toDateString();
  if (settings.lastResetDate !== today) {
    settings.todayRedirects = 0;
    settings.lastResetDate = today;
    await browserAPI.storage.sync.set({
      todayRedirects: 0,
      lastResetDate: today
    });
  }

  // Check if pause has expired
  if (settings.pauseUntil && new Date(settings.pauseUntil) <= new Date()) {
    settings.pauseUntil = null;
    settings.enabled = true;
    await browserAPI.storage.sync.set({
      pauseUntil: null,
      enabled: true
    });
  }

  return settings;
}

// Save settings to storage
async function saveSettings(settings) {
  await browserAPI.storage.sync.set(settings);
}

// Update badge on extension icon
function updateBadge(settings) {
  // Cross-browser action API (browserAction for Firefox, action for Chrome)
  const actionAPI = browserAPI.browserAction || browserAPI.action;

  if (settings.pauseUntil && new Date(settings.pauseUntil) > new Date()) {
    // Paused - show red badge
    actionAPI.setBadgeText({ text: '⏸' });
    actionAPI.setBadgeBackgroundColor({ color: '#ff6b6b' });
  } else if (!settings.enabled) {
    // Disabled - show red badge
    actionAPI.setBadgeText({ text: 'OFF' });
    actionAPI.setBadgeBackgroundColor({ color: '#ff6b6b' });
  } else {
    // Active - clear badge
    actionAPI.setBadgeText({ text: '' });
  }
}

// Update UI based on settings
function updateUI(settings) {
  const enableToggle = document.getElementById('enableToggle');
  const statusText = document.getElementById('statusText');
  const pauseTimer = document.getElementById('pauseTimer');
  const pauseOptions = document.getElementById('pauseOptions');
  const timerText = document.getElementById('timerText');
  const timerValue = document.getElementById('timerValue');

  enableToggle.checked = settings.enabled;

  if (settings.pauseUntil) {
    const pauseDate = new Date(settings.pauseUntil);

    // Check if indefinite pause (year 9999)
    if (pauseDate.getFullYear() >= 9999) {
      // Indefinitely paused
      statusText.textContent = 'Paused';
      statusText.className = 'status paused';
      pauseTimer.classList.add('show');
      pauseOptions.style.display = 'none';
      timerText.textContent = 'Redirects paused indefinitely';
      timerValue.textContent = '∞';
      stopTimer();
    } else if (pauseDate > new Date()) {
      // Timed pause
      statusText.textContent = 'Paused';
      statusText.className = 'status paused';
      pauseTimer.classList.add('show');
      pauseOptions.style.display = 'none';
      timerText.textContent = 'Redirects paused - resuming in:';
      startTimer(pauseDate);
    } else {
      // Pause expired
      statusText.textContent = 'Active';
      statusText.className = 'status active';
      pauseTimer.classList.remove('show');
      pauseOptions.style.display = 'grid';
      stopTimer();
    }
  } else if (!settings.enabled) {
    // Manually disabled
    statusText.textContent = 'Disabled';
    statusText.className = 'status paused';
    pauseTimer.classList.remove('show');
    pauseOptions.style.display = 'grid';
  } else {
    // Active
    statusText.textContent = 'Active';
    statusText.className = 'status active';
    pauseTimer.classList.remove('show');
    pauseOptions.style.display = 'grid';
    stopTimer();
  }

  // Update badge
  updateBadge(settings);

  // Update statistics
  document.getElementById('totalRedirects').textContent = settings.totalRedirects;
  document.getElementById('todayRedirects').textContent = settings.todayRedirects;
}

// Start countdown timer
function startTimer(endTime) {
  stopTimer(); // Clear any existing timer

  function updateTimer() {
    const now = new Date();
    const diff = endTime - now;

    if (diff <= 0) {
      // Timer expired
      stopTimer();
      loadSettings().then(updateUI);
      return;
    }

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    document.getElementById('timerValue').textContent =
      `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// Stop countdown timer
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Pause for specified minutes
async function pauseFor(minutes) {
  let pauseUntil;

  if (minutes === -1) {
    // Indefinite pause - set to far future date
    pauseUntil = new Date('9999-12-31T23:59:59Z');
  } else {
    pauseUntil = new Date(Date.now() + minutes * 60000);
  }

  await saveSettings({
    enabled: false,
    pauseUntil: pauseUntil.toISOString()
  });

  const settings = await loadSettings();
  updateUI(settings);
}

// Resume redirects
async function resume() {
  await saveSettings({
    enabled: true,
    pauseUntil: null
  });

  const settings = await loadSettings();
  updateUI(settings);
}

// Initialize popup
async function init() {
  const settings = await loadSettings();
  updateUI(settings);

  // Enable/disable toggle
  document.getElementById('enableToggle').addEventListener('change', async (e) => {
    if (e.target.checked) {
      await resume();
    } else {
      await saveSettings({ enabled: false, pauseUntil: null });
      const settings = await loadSettings();
      updateUI(settings);
    }
  });

  // Pause buttons
  document.querySelectorAll('.pause-button').forEach(button => {
    button.addEventListener('click', () => {
      const minutes = parseInt(button.dataset.minutes);
      pauseFor(minutes);
    });
  });

  // Settings link
  document.getElementById('settingsLink').addEventListener('click', (e) => {
    e.preventDefault();
    browserAPI.runtime.openOptionsPage();
  });

  // Listen for storage changes (if settings change in another tab)
  browserAPI.storage.onChanged.addListener(async (changes, areaName) => {
    if (areaName === 'sync') {
      const settings = await loadSettings();
      updateUI(settings);
    }
  });
}

// Cleanup on popup close
window.addEventListener('unload', () => {
  stopTimer();
});

// Run initialization
document.addEventListener('DOMContentLoaded', init);

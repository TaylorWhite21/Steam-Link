/**
 * Background service worker for Steam Link Redirector
 * Intercepts Steam URLs and redirects them to the Steam client
 */

// Import the converter function
importScripts('converter.js');

// Default settings
const DEFAULT_SETTINGS = {
  enabled: true,
  pauseUntil: null,
  redirectStore: true,
  redirectCommunity: true,
  redirectHelp: false,
  redirectHelpTickets: false,
  redirectHelpWizard: false,
  totalRedirects: 0,
  todayRedirects: 0,
  weeklyRedirects: 0,
  monthlyRedirects: 0,
  lastResetDate: new Date().toDateString(),
  lastWeekReset: getWeekString(),
  lastMonthReset: getMonthString(),
  redirectHistory: [] // Array of {date, count} for historical data
};

// Helper to get week string (YYYY-Wnn)
function getWeekString() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const week = Math.ceil(diff / oneWeek);
  return `${now.getFullYear()}-W${week.toString().padStart(2, '0')}`;
}

// Helper to get month string (YYYY-MM)
function getMonthString() {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
}

/**
 * Check if redirects are currently enabled
 */
async function isEnabled() {
  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);

  // Check if manually disabled
  if (!settings.enabled) {
    return false;
  }

  // Check if paused
  if (settings.pauseUntil && new Date(settings.pauseUntil) > new Date()) {
    return false;
  }

  // If pause expired, re-enable
  if (settings.pauseUntil && new Date(settings.pauseUntil) <= new Date()) {
    await chrome.storage.sync.set({
      enabled: true,
      pauseUntil: null
    });
  }

  return true;
}

/**
 * Check if a specific domain should be redirected
 */
async function shouldRedirectDomain(url) {
  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  const urlObj = new URL(url);
  const hostname = urlObj.hostname.toLowerCase();
  const pathname = urlObj.pathname.toLowerCase();

  if (hostname.includes('store.steampowered.com')) {
    return settings.redirectStore;
  }

  if (hostname.includes('steamcommunity.com')) {
    return settings.redirectCommunity;
  }

  if (hostname.includes('help.steampowered.com')) {
    // Granular help page controls
    if (pathname.includes('/wizard/') && settings.redirectHelpWizard) {
      return true;
    }
    if (pathname.includes('/ticket') && settings.redirectHelpTickets) {
      return true;
    }
    // General help redirect setting
    return settings.redirectHelp;
  }

  return false;
}

/**
 * Increment redirect statistics
 */
async function incrementStats() {
  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);

  // Reset today's count if it's a new day
  const today = new Date().toDateString();
  const thisWeek = getWeekString();
  const thisMonth = getMonthString();

  let updates = {
    totalRedirects: settings.totalRedirects + 1,
    todayRedirects: settings.todayRedirects + 1,
    weeklyRedirects: settings.weeklyRedirects + 1,
    monthlyRedirects: settings.monthlyRedirects + 1
  };

  if (settings.lastResetDate !== today) {
    // Save yesterday's count to history before resetting
    if (settings.todayRedirects > 0) {
      const history = settings.redirectHistory || [];
      history.push({
        date: settings.lastResetDate,
        count: settings.todayRedirects
      });
      // Keep last 90 days
      if (history.length > 90) {
        history.shift();
      }
      updates.redirectHistory = history;
    }
    updates.todayRedirects = 1;
    updates.lastResetDate = today;
  }

  if (settings.lastWeekReset !== thisWeek) {
    updates.weeklyRedirects = 1;
    updates.lastWeekReset = thisWeek;
  }

  if (settings.lastMonthReset !== thisMonth) {
    updates.monthlyRedirects = 1;
    updates.lastMonthReset = thisMonth;
  }

  await chrome.storage.sync.set(updates);
}

/**
 * Update extension badge based on state
 */
async function updateBadge() {
  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);

  if (settings.pauseUntil && new Date(settings.pauseUntil) > new Date()) {
    chrome.action.setBadgeText({ text: '⏸' });
    chrome.action.setBadgeBackgroundColor({ color: '#ff6b6b' });
  } else if (!settings.enabled) {
    chrome.action.setBadgeText({ text: 'OFF' });
    chrome.action.setBadgeBackgroundColor({ color: '#ff6b6b' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

/**
 * Handles web navigation events to Steam domains
 */
chrome.webNavigation.onBeforeNavigate.addListener(
  async (details) => {
    // Only process main frame navigations (not iframes)
    if (details.frameId !== 0) {
      return;
    }

    // Check if redirects are enabled
    const enabled = await isEnabled();
    if (!enabled) {
      return;
    }

    const url = details.url;

    // Check if this domain should be redirected
    const shouldRedirect = await shouldRedirectDomain(url);
    if (!shouldRedirect) {
      return;
    }

    const steamProtocolUrl = convertToSteamProtocol(url);

    if (steamProtocolUrl) {
      // Increment statistics
      await incrementStats();

      // Navigate the current tab to the steam:// protocol
      // Chrome will show a dialog asking the user to confirm opening Steam
      // If the user checks "Always allow", future redirects will be seamless
      chrome.tabs.update(details.tabId, { url: steamProtocolUrl });

      // Note: We don't auto-close the tab anymore
      // If the user clicks "Open Steam", Chrome closes it automatically
      // If the user clicks "Cancel", they can stay on the tab (which shows the protocol URL)
      // This respects user choice and leverages browser's native protocol handling
    }
  },
  {
    url: [
      { hostContains: 'steampowered.com' },
      { hostContains: 'steamcommunity.com' }
    ]
  }
);

// Listen for storage changes to update badge
chrome.storage.onChanged.addListener((_changes, areaName) => {
  if (areaName === 'sync') {
    updateBadge();
  }
});

// Update badge on startup
updateBadge();

console.log('Steam Link Redirector: Background service worker loaded');

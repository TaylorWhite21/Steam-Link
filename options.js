/**
 * Options page script for Steam Link Redirector
 */

// Default settings
const DEFAULT_SETTINGS = {
  redirectStore: true,
  redirectCommunity: true,
  redirectHelp: false,
  redirectHelpWizard: false,
  redirectHelpTickets: false,
  totalRedirects: 0,
  todayRedirects: 0,
  weeklyRedirects: 0,
  monthlyRedirects: 0,
  lastResetDate: new Date().toDateString(),
  redirectHistory: []
};

// Load settings from storage
async function loadSettings() {
  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);

  // Reset today's count if it's a new day
  const today = new Date().toDateString();
  if (settings.lastResetDate !== today) {
    settings.todayRedirects = 0;
    settings.lastResetDate = today;
    await chrome.storage.sync.set({
      todayRedirects: 0,
      lastResetDate: today
    });
  }

  return settings;
}

// Save settings to storage
async function saveSettings(settings) {
  await chrome.storage.sync.set(settings);
  showStatusMessage();
}

// Show success message
function showStatusMessage() {
  const message = document.getElementById('statusMessage');
  message.classList.add('show');

  setTimeout(() => {
    message.classList.remove('show');
  }, 2000);
}

// Update statistics display
function updateStats(settings) {
  document.getElementById('totalRedirects').textContent = settings.totalRedirects;
  document.getElementById('todayRedirects').textContent = settings.todayRedirects;
  document.getElementById('weeklyRedirects').textContent = settings.weeklyRedirects || 0;
  document.getElementById('monthlyRedirects').textContent = settings.monthlyRedirects || 0;
}

// Export statistics as CSV
function exportCSV(settings) {
  const history = settings.redirectHistory || [];
  let csv = 'Date,Redirects\n';

  // Add historical data
  history.forEach(entry => {
    csv += `${entry.date},${entry.count}\n`;
  });

  // Add current day if it has data
  if (settings.todayRedirects > 0) {
    csv += `${settings.lastResetDate},${settings.todayRedirects}\n`;
  }

  // Summary row
  csv += `\nSummary\n`;
  csv += `Total,${settings.totalRedirects}\n`;
  csv += `This Week,${settings.weeklyRedirects || 0}\n`;
  csv += `This Month,${settings.monthlyRedirects || 0}\n`;

  downloadFile(csv, 'steam-redirector-stats.csv', 'text/csv');
}

// Export statistics as JSON
function exportJSON(settings) {
  const data = {
    exportDate: new Date().toISOString(),
    summary: {
      total: settings.totalRedirects,
      today: settings.todayRedirects,
      weekly: settings.weeklyRedirects || 0,
      monthly: settings.monthlyRedirects || 0
    },
    history: settings.redirectHistory || [],
    currentPeriod: {
      date: settings.lastResetDate,
      count: settings.todayRedirects
    }
  };

  const json = JSON.stringify(data, null, 2);
  downloadFile(json, 'steam-redirector-stats.json', 'application/json');
}

// Download file helper
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Initialize the options page
async function init() {
  const settings = await loadSettings();

  // Set checkbox states
  document.getElementById('redirectStore').checked = settings.redirectStore;
  document.getElementById('redirectCommunity').checked = settings.redirectCommunity;
  document.getElementById('redirectHelp').checked = settings.redirectHelp;
  document.getElementById('redirectHelpWizard').checked = settings.redirectHelpWizard || false;
  document.getElementById('redirectHelpTickets').checked = settings.redirectHelpTickets || false;

  // Update statistics
  updateStats(settings);

  // Add event listeners for checkboxes
  document.getElementById('redirectStore').addEventListener('change', async (e) => {
    await saveSettings({ redirectStore: e.target.checked });
  });

  document.getElementById('redirectCommunity').addEventListener('change', async (e) => {
    await saveSettings({ redirectCommunity: e.target.checked });
  });

  document.getElementById('redirectHelp').addEventListener('change', async (e) => {
    await saveSettings({ redirectHelp: e.target.checked });
  });

  document.getElementById('redirectHelpWizard').addEventListener('change', async (e) => {
    await saveSettings({ redirectHelpWizard: e.target.checked });
  });

  document.getElementById('redirectHelpTickets').addEventListener('change', async (e) => {
    await saveSettings({ redirectHelpTickets: e.target.checked });
  });

  // Export buttons
  document.getElementById('exportCSV').addEventListener('click', () => {
    exportCSV(settings);
  });

  document.getElementById('exportJSON').addEventListener('click', () => {
    exportJSON(settings);
  });

  // Reset statistics button
  document.getElementById('resetStats').addEventListener('click', async () => {
    if (confirm('Are you sure you want to reset all statistics?')) {
      await saveSettings({
        totalRedirects: 0,
        todayRedirects: 0,
        weeklyRedirects: 0,
        monthlyRedirects: 0,
        redirectHistory: [],
        lastResetDate: new Date().toDateString()
      });
      updateStats({ totalRedirects: 0, todayRedirects: 0, weeklyRedirects: 0, monthlyRedirects: 0 });
    }
  });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

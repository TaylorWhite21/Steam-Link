# 🎮 Steam Link Redirector

**Automatically open Steam links in the Steam client instead of your browser.**

A browser extension that seamlessly redirects Steam web links (store pages, community profiles, workshop items, etc.) to launch directly in the Steam desktop application.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()
[![Tests](https://img.shields.io/badge/tests-23%20passing-brightgreen.svg)]()
[![Chrome](https://img.shields.io/badge/Chrome-✓-green.svg)]()
[![Firefox](https://img.shields.io/badge/Firefox-✓-green.svg)]()
[![Edge](https://img.shields.io/badge/Edge-✓-green.svg)]()
[![Opera](https://img.shields.io/badge/Opera-✓-green.svg)]()

---

## 🌐 Browser Support

**Works on ALL major browsers:**
- ✅ Chrome
- ✅ Microsoft Edge
- ✅ Firefox
- ✅ Opera
- ✅ Brave
- ✅ Vivaldi

See [BROWSERS.md](BROWSERS.md) for installation guides for each browser.

---

## ✨ Features

- **🔄 Automatic Redirection** - Click any Steam link, it opens in Steam
- **🌐 Cross-Browser** - Works on Chrome, Firefox, Edge, Opera, Brave, Vivaldi
- **⏸️ Pause Controls** - Temporarily disable (5m, 15min, 30m, 1hr, or indefinitely)
- **📊 Statistics** - Track redirects (today, this week, this month, all-time)
- **💾 Export Data** - Download stats as CSV or JSON
- **⚙️ Granular Settings** - Control which Steam domains to redirect
- **🎯 Visual Indicators** - Extension badge shows status at a glance
- **🧪 Fully Tested** - 23+ unit tests covering all URL patterns

---

## 🚀 Quick Start

### For Chrome/Edge/Opera/Brave/Vivaldi

Use the Chrome installation method - all these browsers are Chromium-based!

### For Firefox

See [BROWSERS.md](BROWSERS.md) for Firefox-specific installation.

---

## Installation (Chrome/Edge/Opera/Brave/Vivaldi)

### 1. Generate Icons (30 seconds)
1. Open `generate-icons.html` in your browser
2. Click **"Download All Icons"**
3. Save the 3 files to the `icons/` folder

### 2. Install Extension (1 minute)
1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** (top-right toggle)
3. Click **"Load unpacked"**
4. Select the `Steam Link` folder
5. Extension now appears in your toolbar! ✅

### 3. First-Time Setup (one click)
1. Click any Steam link (try opening `test.html`)
2. Chrome asks: **"Open Steam?"**
3. ✅ **Check "Always allow steam links"**
4. Click **"Open Steam"**
5. Done! Future links open automatically

---

## 📖 How It Works

1. You click a Steam link anywhere (Reddit, Discord, Google, etc.)
2. Extension intercepts the URL
3. Converts it to `steam://` protocol
4. Chrome launches Steam client
5. Tab closes automatically
6. Steam opens to the correct page

### Supported URLs

| Type | Example | Opens In Steam |
|------|---------|----------------|
| Store Page | `store.steampowered.com/app/730` | ✅ Game store page |
| Community Profile | `steamcommunity.com/id/username` | ✅ User profile |
| Workshop Item | `steamcommunity.com/sharedfiles/...` | ✅ Workshop page |
| Game Hub | `steamcommunity.com/app/730` | ✅ Community hub |
| Groups | `steamcommunity.com/groups/...` | ✅ Group page |

---

## 🎛️ Using the Extension

### Extension Icon (Click It!)
- **Toggle on/off** - Instant enable/disable
- **Pause temporarily** - 5min, 15min, 30min, 1hr, or indefinitely
- **View statistics** - See redirect counts
- **Access settings** - Link to options page

### Settings Page (Right-click → Options)
- **Domain Controls**:
  - Store pages (ON by default)
  - Community pages (ON by default)
  - Help pages (OFF by default - better in browser)
  - Granular help controls (Wizard, Tickets)
- **Statistics**:
  - Total redirects (all-time)
  - Today's count
  - This week's count
  - This month's count
- **Export**: Download as CSV or JSON
- **Reset**: Clear all statistics

### Pause Feature
Perfect for when you want to browse Steam in your browser:
- Click extension icon → Choose pause duration
- Badge shows ⏸ or OFF when paused
- Auto-resumes when timer expires
- Or pause indefinitely until you manually resume

---

## 🧪 Testing

### Run Unit Tests
```bash
npm test
# or
node test.js
```

**Result:** 23 tests covering all Steam URL patterns

### Manual Testing
1. Open `test.html` in your browser
2. Click any Steam link
3. Verify Steam opens correctly
4. Use the converter tool to test custom URLs

---

## 📊 Statistics & Privacy

### What Gets Tracked
- Number of redirects (total, daily, weekly, monthly)
- Historical data (last 90 days)
- **All stored locally** - nothing sent anywhere

### What Doesn't Get Tracked
- ❌ Which specific links you clicked
- ❌ Personal information
- ❌ Browsing history
- ❌ No external servers, no analytics, no tracking

### Export Your Data
- CSV format: Historical daily counts + summary
- JSON format: Structured data with metadata
- Use for personal tracking or data analysis

---

## ⚙️ Configuration

### Domain Settings
Choose which Steam domains to redirect:
- **Store** (`store.steampowered.com`) - Game store pages
- **Community** (`steamcommunity.com`) - Profiles, workshops, hubs
- **Help** (`help.steampowered.com`) - Support pages (OFF by default)
  - Wizard pages - `help.steampowered.com/wizard/*`
  - Ticket pages - `help.steampowered.com/ticket*`

### Chrome Protocol Settings
To change "Always allow" behavior:
1. Go to `chrome://settings/content/protocolHandlers`
2. Find `steam` in the list
3. Change to "Allow", "Ask", or "Block"

---

## 🔧 Troubleshooting

### Extension Doesn't Redirect
**Check:**
- Extension icon badge (⏸ or OFF = disabled)
- Settings → Verify domains are toggled ON
- Test `steam://store/730` in address bar

**If Steam doesn't open from address bar:**
- Steam client may not be installed
- Protocol handler not registered
- Solution: Reinstall Steam or run as Administrator

### Statistics Not Updating
- Extension might be paused (check badge)
- Reload extension at `chrome://extensions/`

### Dialog Appears Every Time
- You didn't check "Always allow steam links"
- Fix: Click a link, check the box, click "Open Steam"

### Need More Help?
See [INSTALLATION.md](INSTALLATION.md) for detailed troubleshooting

---

## 🛠️ Development

### Project Structure
```
Steam Link/
├── manifest.json          # Extension config
├── background.js          # Core redirect logic
├── converter.js           # URL → steam:// conversion
├── popup.html/js         # Toolbar popup
├── options.html/js       # Settings page
├── test.js               # Unit tests
├── test.html             # Interactive testing
└── icons/                # Extension icons
```

### For Developers
- **Technical docs**: See [claude.md](claude.md)
- **Future plans**: See [ROADMAP.md](ROADMAP.md)
- **Full installation guide**: See [INSTALLATION.md](INSTALLATION.md)

### Running Tests
```bash
npm test  # Runs 23 unit tests
```

All tests must pass before committing changes.

---

## 🗺️ Roadmap

### ✅ Version 1.0 (Current)
- Core redirection functionality
- Pause controls with multiple durations
- Statistics tracking (4 metrics)
- CSV/JSON export
- Granular domain controls
- Extension badge indicators
- 23+ unit tests

### 🔮 Future Versions
- **1.1**: Firefox support
- **1.2**: Context menu "Open in Steam" option
- **2.0**: System-wide protocol handler (works with Discord desktop)
- **3.0**: Advanced features (link preview, wishlist integration)

See [ROADMAP.md](ROADMAP.md) for detailed plans.

---

## 📄 License

MIT License - Free to use, modify, and distribute.

See the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with Chrome Extension Manifest V3
- Uses Steam's `steam://` protocol handler
- Icon generator included for easy setup
- Designed for the Steam gaming community

---

## 📞 Support

- **Issues**: Check [INSTALLATION.md](INSTALLATION.md) troubleshooting section
- **Questions**: Read [claude.md](claude.md) for technical details
- **Contributing**: Pull requests welcome (GitHub repo coming soon)

---

**Made with ❤️ for PC gamers who prefer the Steam client**

🎮 **Install it. Set "Always allow". Enjoy seamless Steam links!**

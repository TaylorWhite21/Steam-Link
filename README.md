# Steam Link Redirector

**Tired of Steam links opening in your browser? This extension fixes that.**

Steam Link Redirector is a browser extension that automatically redirects Steam web links to your Steam desktop client. Click a store page, workshop item, or community profile anywhere on the web, and it opens directly in Steam—no more tabs you don't need.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()
[![Tests](https://img.shields.io/badge/tests-23%20passing-brightgreen.svg)]()
[![Chrome](https://img.shields.io/badge/Chrome-✓-green.svg)]()
[![Firefox](https://img.shields.io/badge/Firefox-✓-green.svg)]()
[![Edge](https://img.shields.io/badge/Edge-✓-green.svg)]()
[![Opera](https://img.shields.io/badge/Opera-✓-green.svg)]()

---

## Browser Support

Works on all major browsers:
- Chrome
- Microsoft Edge
- Firefox
- Opera
- Brave
- Vivaldi

Need help with a specific browser? Check out [BROWSERS.md](BROWSERS.md) for installation guides.

---

## What It Does

The extension is simple: when you click a Steam link anywhere on the web, it intercepts the URL and opens it in your Steam client instead of your browser. The tab closes automatically, and you're taken directly to the right page in Steam.

### Features

**Automatic redirection** - Works on store pages, community profiles, workshop items, game hubs, and groups.

**Cross-browser support** - Install once on Chrome, Firefox, Edge, Opera, Brave, or Vivaldi.

**Pause controls** - Need to browse Steam in your browser? Pause for 5 minutes, 15 minutes, 30 minutes, 1 hour, or indefinitely.

**Statistics tracking** - See how many redirects happened today, this week, this month, or all time.

**Export your data** - Download your stats as CSV or JSON anytime.

**Domain controls** - Choose which Steam domains get redirected (store, community, help pages).

**Privacy-first** - All data stays on your device. Nothing is sent to external servers.

---

## Quick Start

### For Chrome, Edge, Opera, Brave, and Vivaldi

These browsers all use the same installation method since they're built on Chromium.

**Step 1: Install extension (1 minute)**
1. Go to `chrome://extensions/` (or your browser's equivalent)
2. Turn on "Developer mode" (toggle in the top-right)
3. Click "Load unpacked"
4. Select the `Steam Link` folder
5. Done! The extension appears in your toolbar

**Step 2: First-time setup (one click)**
1. Click any Steam link (you can open `test.html` to try it)
2. Your browser asks: "Open Steam?"
3. Check "Always allow steam links"
4. Click "Open Steam"

That's it. Every Steam link from now on will open in Steam automatically.

### For Firefox

Firefox uses a slightly different installation process. See [BROWSERS.md](BROWSERS.md) for the full Firefox guide.

---

## How It Works

Here's what happens when you click a Steam link:

1. The extension intercepts the URL
2. Converts it to a `steam://` protocol URL
3. Your browser launches the Steam client
4. The tab closes automatically
5. Steam opens to the correct page

### Supported URLs

The extension handles all major Steam URL types:

| Type | Example | What Opens |
|------|---------|------------|
| Store pages | `store.steampowered.com/app/730` | Game store page in Steam |
| Community profiles | `steamcommunity.com/id/username` | User profile in Steam |
| Workshop items | `steamcommunity.com/sharedfiles/...` | Workshop page in Steam |
| Game hubs | `steamcommunity.com/app/730` | Community hub in Steam |
| Groups | `steamcommunity.com/groups/...` | Group page in Steam |

---

## Using the Extension

### Extension Icon

Click the extension icon in your toolbar to:
- Toggle the extension on or off
- Pause for a set amount of time
- View redirect statistics
- Access the settings page

### Settings Page

Right-click the extension icon and select "Options" to configure:

**Domain controls** - Choose which Steam domains to redirect:
- Store pages (on by default)
- Community pages (on by default)
- Help pages (off by default—these are usually better in a browser)
- Specific help sections (wizard pages, ticket pages)

**Statistics** - View your redirect counts:
- Total (all-time)
- Today
- This week
- This month

**Export** - Download your data as CSV or JSON

**Reset** - Clear all statistics

### Pause Feature

Sometimes you want to browse Steam in your browser. That's what the pause feature is for.

Click the extension icon and choose a pause duration:
- 5 minutes
- 15 minutes
- 30 minutes
- 1 hour
- Until you turn it back on

While paused, the extension badge shows a pause symbol or "OFF". When the timer expires, redirects resume automatically.

---

## Privacy

Your privacy matters. Here's what this extension does and doesn't do:

**What gets tracked:**
- Number of redirects (total, daily, weekly, monthly)
- Historical data for the last 90 days
- All stored locally on your device

**What doesn't get tracked:**
- Which specific links you clicked
- Any personal information
- Your browsing history
- Nothing is sent to external servers

**Data export:**
- CSV format: Daily counts and summary statistics
- JSON format: Structured data with metadata
- Use it for personal tracking or data analysis

---

## Testing

### Run Unit Tests

The extension includes 23 unit tests covering all URL patterns:

```bash
npm test
# or
node test.js
```

### Manual Testing

1. Open `test.html` in your browser
2. Click any Steam link
3. Verify Steam opens correctly
4. Use the converter tool to test custom URLs

---

## Configuration

### Domain Settings

Choose which Steam domains to redirect:

**Store** (`store.steampowered.com`) - Game store pages, bundles, packages

**Community** (`steamcommunity.com`) - Profiles, groups, workshops, game hubs

**Help** (`help.steampowered.com`) - Support pages (off by default)
  - Wizard pages: `help.steampowered.com/wizard/*`
  - Ticket pages: `help.steampowered.com/ticket*`

Help pages are off by default because they're often easier to navigate in a browser.

### Protocol Handler Settings

To change the "Always allow" behavior:

1. Go to `chrome://settings/content/protocolHandlers` (or your browser's equivalent)
2. Find `steam` in the list
3. Change to "Allow", "Ask", or "Block"

---

## Troubleshooting

### Extension doesn't redirect

**Check these first:**
- Look at the extension badge. If it shows a pause symbol or "OFF", the extension is disabled.
- Open settings and verify the domains you want are toggled on.
- Test by typing `steam://store/730` in your address bar. If Steam doesn't open, the issue is with your Steam installation.

**If Steam doesn't open from the address bar:**
- Steam client might not be installed
- Protocol handler might not be registered
- Try reinstalling Steam or running it as Administrator

### Statistics not updating

- Check if the extension is paused (look at the badge)
- Try reloading the extension at `chrome://extensions/`

### Dialog appears every time

You didn't check "Always allow steam links" the first time. To fix:
- Click any Steam link
- Check the "Always allow" box
- Click "Open Steam"

### Need more help?

See [INSTALLATION.md](INSTALLATION.md) for detailed troubleshooting.

---

## Development

### Project Structure

```
Steam Link/
├── manifest.json          # Chrome/Edge/Opera config
├── manifest-firefox.json  # Firefox config
├── background.js          # Core redirect logic
├── converter.js           # URL to steam:// conversion
├── popup.html/js         # Toolbar popup
├── options.html/js       # Settings page
├── test.js               # Unit tests
├── test.html             # Interactive testing
├── build.bat             # Build script for all browsers
└── icons/                # Extension icons
```

### For Developers

- **Technical documentation**: [claude.md](claude.md)
- **Future plans**: [ROADMAP.md](ROADMAP.md)
- **Installation guide**: [INSTALLATION.md](INSTALLATION.md)
- **Browser support**: [BROWSERS.md](BROWSERS.md)
- **Security**: [SECURITY.md](SECURITY.md)

### Running Tests

```bash
npm test  # Runs 23 unit tests
```

All tests must pass before committing changes.

### Building for Distribution

```bash
build.bat
```

This creates:
- `build/chrome/` - Chrome, Edge, Opera, Brave, Vivaldi
- `build/firefox/` - Firefox
- `build/steam-link-redirector-chrome.zip` - Ready for Chrome Web Store
- `build/steam-link-redirector-firefox.zip` - Ready for Firefox Add-ons

---

## Roadmap

### Version 1.0 (Current)

- Core redirection functionality
- Pause controls with multiple durations
- Statistics tracking
- CSV/JSON export
- Domain controls
- Cross-browser support (Chrome, Firefox, Edge, Opera, Brave, Vivaldi)
- 23+ unit tests

### Future Versions

- **1.1**: Enhanced Firefox features
- **1.2**: Context menu "Open in Steam" option
- **2.0**: System-wide protocol handler (works with Discord desktop)
- **3.0**: Advanced features (link preview, wishlist integration)

See [ROADMAP.md](ROADMAP.md) for detailed plans.

---

## Contributing

Contributions are welcome! See [SECURITY.md](SECURITY.md) for security guidelines.

---

## License

MIT License - Free to use, modify, and distribute.

See [LICENSE](LICENSE) for details.

---

## Acknowledgments

Built with Chrome Extension Manifest V3 and Firefox Manifest V2. Uses Steam's `steam://` protocol handler. Designed for PC gamers who prefer the Steam client over the browser.

---

**Made for PC gamers**

Install it. Click "Always allow". Enjoy seamless Steam links.

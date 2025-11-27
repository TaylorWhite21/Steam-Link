# Browser Support Guide

Steam Link Redirector supports multiple browsers! This guide explains how to install and use the extension across different platforms.

---

## Supported Browsers

| Browser | Status | Installation Method |
|---------|--------|---------------------|
| **Chrome** | ✅ Fully Supported | Load unpacked or Chrome Web Store |
| **Edge** | ✅ Fully Supported | Load unpacked or Edge Add-ons |
| **Opera** | ✅ Fully Supported | Load unpacked (same as Chrome) |
| **Brave** | ✅ Fully Supported | Load unpacked (same as Chrome) |
| **Vivaldi** | ✅ Fully Supported | Load unpacked (same as Chrome) |
| **Firefox** | ✅ Fully Supported | Load temporary or Firefox Add-ons |
| **Safari** | ❌ Not Supported | Requires complete rewrite for Safari's extension format |

---

## Quick Installation

### Chrome, Edge, Opera, Brave, Vivaldi (Chromium-based)

1. **Build the extension:**
   ```bash
   build.bat
   ```
   This creates `build\steam-link-redirector-chrome.zip`

2. **Install:**
   - Go to `chrome://extensions/` (or `edge://extensions/`, `opera://extensions/`, etc.)
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `build\chrome\` folder
   - Done! ✅

### Firefox

1. **Build the extension:**
   ```bash
   build.bat
   ```
   This creates `build\steam-link-redirector-firefox.zip`

2. **Temporary Install (for testing):**
   - Go to `about:debugging#/runtime/this-firefox`
   - Click **Load Temporary Add-on**
   - Select any file from `build\firefox\` folder
   - Extension loads (removed when Firefox closes)

3. **Permanent Install:**
   - Extension must be signed by Mozilla
   - Submit to [Firefox Add-ons](https://addons.mozilla.org/developers/)
   - Or use [web-ext sign](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) for self-distribution

---

## Browser-Specific Differences

### Chrome/Edge/Opera/Brave/Vivaldi
- Uses **Manifest V3** (latest standard)
- Badge shows ⏸ when paused, OFF when disabled
- One-time "Always allow steam links" prompt
- Chrome sync available (if enabled in browser)

### Firefox
- Uses **Manifest V2** (Firefox doesn't fully support V3 yet)
- Same badge behavior as Chrome
- One-time protocol handler approval
- Firefox sync available (if enabled in browser)

### Technical Differences

| Feature | Chrome/Edge/Opera | Firefox |
|---------|-------------------|---------|
| Manifest Version | V3 | V2 |
| API Namespace | `chrome.*` | `browser.*` |
| Background | Service worker | Background scripts |
| Action API | `chrome.action` | `browser.browserAction` |
| All other features | Identical | Identical |

**Good news:** Our code handles these differences automatically! The same JavaScript files work across all browsers.

---

## Building for Distribution

### Build Script

Run `build.bat` to create both versions:

```bash
build.bat
```

**Output:**
- `build\chrome\` - Ready for Chrome/Edge/Opera/Brave/Vivaldi
- `build\firefox\` - Ready for Firefox
- `build\steam-link-redirector-chrome.zip` - Chrome Web Store submission
- `build\steam-link-redirector-firefox.zip` - Firefox Add-ons submission

### What the Build Script Does

1. **Chrome Build:**
   - Copies all files
   - Uses `manifest.json` (Manifest V3)
   - Creates ZIP for Chrome Web Store

2. **Firefox Build:**
   - Copies all files
   - Uses `manifest-firefox.json` as `manifest.json` (Manifest V2)
   - Creates ZIP for Firefox Add-ons

---

## Publishing to Official Stores

### Chrome Web Store

1. **Prepare:**
   - Run `build.bat`
   - Upload `build\steam-link-redirector-chrome.zip`

2. **Submit:**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Create new item ($5 one-time fee)
   - Upload ZIP
   - Fill out listing details
   - Submit for review (1-3 days)

3. **Also available on:**
   - Microsoft Edge Add-ons (free, uses same ZIP)
   - Opera Add-ons (free, uses same ZIP)

### Firefox Add-ons

1. **Prepare:**
   - Run `build.bat`
   - Upload `build\steam-link-redirector-firefox.zip`

2. **Submit:**
   - Go to [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/)
   - Create account (free)
   - Upload ZIP
   - Fill out listing details
   - Submit for review (1-7 days)

---

## Testing Checklist

Before publishing, test on each browser:

### Chrome/Edge/Opera Testing
- [ ] Extension loads without errors
- [ ] Icon appears in toolbar
- [ ] Popup opens and shows stats
- [ ] Settings page opens
- [ ] Steam links redirect correctly
- [ ] "Always allow" dialog appears on first click
- [ ] Pause feature works (5min, 15min, 30min, 1hr, indefinite)
- [ ] Statistics update correctly
- [ ] Export CSV/JSON works
- [ ] Badge shows correct status (⏸, OFF, or empty)

### Firefox Testing
- [ ] Extension loads without errors
- [ ] Icon appears in toolbar
- [ ] Popup opens and shows stats
- [ ] Settings page opens
- [ ] Steam links redirect correctly
- [ ] Protocol handler approval works
- [ ] Pause feature works (all durations)
- [ ] Statistics update correctly
- [ ] Export CSV/JSON works
- [ ] Badge shows correct status

---

## Cross-Browser Compatibility Notes

### How We Achieve Cross-Browser Support

**1. Browser API Detection:**
```javascript
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
```
- Firefox provides `browser` namespace
- Chrome provides `chrome` namespace
- Our code uses `browserAPI` everywhere

**2. Action API Compatibility:**
```javascript
const actionAPI = browserAPI.browserAction || browserAPI.action;
```
- Chrome uses `chrome.action` (Manifest V3)
- Firefox uses `browser.browserAction` (Manifest V2)
- Code automatically picks the right one

**3. Script Loading:**
```javascript
// Chrome: Uses importScripts in service worker
if (typeof importScripts === 'function') {
  importScripts('converter.js');
}
// Firefox: Loads via manifest "background.scripts"
```

**Result:** Same JavaScript files work everywhere!

---

## Troubleshooting

### Chrome/Edge/Opera Issues

**Extension won't load:**
- Check Developer mode is enabled
- Try reloading extension
- Check browser console for errors

**Protocol handler not working:**
- Click any Steam link once
- Check "Always allow steam links"
- Click "Open Steam"

### Firefox Issues

**Temporary extension removed:**
- Firefox removes temporary extensions on restart
- Use permanent install via Add-ons site
- Or reload temporary extension each time

**Protocol handler not working:**
- Firefox may ask permission each time (security feature)
- Check Firefox preferences → Applications → steam
- Set to "Use Steam (default)"

---

## Development Workflow

### Testing Changes Across Browsers

1. **Make code changes** (edit JavaScript files)
2. **Run build script** (`build.bat`)
3. **Reload extension in each browser:**
   - Chrome: Go to `chrome://extensions/` → Click reload
   - Firefox: Go to `about:debugging` → Click reload

### Only Need to Update Once

All JavaScript files are shared between browsers:
- `background.js` - Cross-browser compatible
- `converter.js` - Cross-browser compatible
- `popup.js` - Cross-browser compatible
- `options.js` - Cross-browser compatible

Only manifest files differ:
- `manifest.json` - Chrome (Manifest V3)
- `manifest-firefox.json` - Firefox (Manifest V2)

---

## Future Browser Support

### Planned
- **Safari** (major rewrite required)
  - Safari uses different extension format
  - Requires Swift/Objective-C conversion
  - Protocol handler works differently

### Not Planned
- Internet Explorer (end-of-life)
- Legacy Edge (replaced by Chromium Edge)

---

## Questions?

- **Installation help:** See [INSTALLATION.md](INSTALLATION.md)
- **Technical details:** See [claude.md](claude.md)
- **Feature requests:** See [ROADMAP.md](ROADMAP.md)

---

**Last Updated:** January 26, 2025
**Supported Browsers:** Chrome, Edge, Opera, Brave, Vivaldi, Firefox

# Steam Link Redirector - Complete Documentation for Claude

## Project Overview

**Steam Link Redirector** is a Chrome browser extension that automatically intercepts Steam web links and redirects them to open in the Steam desktop client instead of the browser. This provides a seamless gaming experience for users who prefer the native Steam application.

**Current Version:** 1.0.0
**Status:** Feature-complete, ready for testing and distribution
**Target Platform:** Chrome/Chromium-based browsers (Chrome, Edge, Brave, etc.)

---

## Core Functionality

### How It Works

1. **URL Interception**: Uses Chrome's `webNavigation.onBeforeNavigate` API to intercept navigation to Steam domains
2. **Protocol Conversion**: Converts HTTP/HTTPS Steam URLs to `steam://` protocol URLs
3. **Client Launch**: Browser navigates to `steam://` URL, triggering Chrome's protocol handler
4. **User Approval**: First time, user checks "Always allow steam links" (one-time setup)
5. **Automatic Tab Closure**: Chrome automatically closes tab when Steam launches successfully
6. **Statistics Tracking**: Records all redirects with daily/weekly/monthly breakdowns

### Supported Steam Domains

- **store.steampowered.com** - Game store pages, bundles, packages
- **steamcommunity.com** - Profiles, groups, workshops, game hubs
- **help.steampowered.com** - Support pages (configurable, granular controls)

### URL Pattern Examples

| Web URL | Converts To | Description |
|---------|-------------|-------------|
| `store.steampowered.com/app/730` | `steam://store/730` | Store app page |
| `steamcommunity.com/id/username` | `steam://url/SteamIDPage/username` | User profile |
| `steamcommunity.com/app/730` | `steam://url/GameHub/730` | Game community hub |
| `steamcommunity.com/sharedfiles/filedetails/?id=123` | `steam://url/CommunityFilePage/123` | Workshop item |

---

## Project Structure

```
Steam Link/
├── Core Extension Files
│   ├── manifest.json           # Extension configuration (Manifest V3)
│   ├── background.js           # Service worker (URL interception, settings, stats)
│   ├── converter.js            # URL conversion logic (pure function)
│   │
├── User Interface
│   ├── popup.html/js          # Toolbar popup (pause, toggle, stats)
│   ├── options.html/js        # Settings page (domain config, export, stats)
│   │
├── Testing
│   ├── test.js                # Unit tests (23+ automated tests)
│   ├── test.html              # Interactive browser test page
│   ├── package.json           # npm test configuration
│   │
├── Documentation
│   ├── README.md              # User-facing documentation
│   ├── INSTALLATION.md        # Step-by-step setup guide
│   ├── ROADMAP.md            # Development phases and future plans
│   ├── PROJECT_STRUCTURE.md   # Architecture overview
│   ├── claude.md             # This file - comprehensive AI documentation
│   │
└── Assets
    └── icons/                 # Extension icons (16px, 48px, 128px)
        └── ICONS_NEEDED.md    # Icon requirements and instructions
```

---

## Features

### ✅ Completed Features

#### 1. **Automatic URL Redirection**
- Silent, seamless interception of all Steam links
- No user interaction required
- Works from any website (Reddit, Discord, Google, etc.)

#### 2. **Comprehensive URL Support**
- Store pages (apps, DLC, bundles, packages, subscriptions)
- Community profiles (by ID and Steam ID)
- Workshop items
- Game hubs and discussions
- Groups and communities

#### 3. **Pause & Resume Controls**
- **Timed Pause**: 5min, 15min, 30min, 1hr options
- **Indefinite Pause**: "Pause Indefinitely" option
- **Live Countdown Timer**: Shows remaining time in popup
- **Auto-Resume**: Automatically re-enables when timer expires
- **Visual Badge**: Extension icon shows pause status (⏸ or OFF)

#### 4. **Granular Domain Controls**
- Toggle redirects for specific domains:
  - ✅ Store pages (default: ON)
  - ✅ Community pages (default: ON)
  - ⚠️ Help pages - General (default: OFF)
  - ⚠️ Help pages - Wizard (default: OFF)
  - ⚠️ Help pages - Tickets (default: OFF)
- Fine-grained control over help.steampowered.com paths

#### 5. **Statistics & Analytics**
- **Live Tracking**:
  - Total redirects (all-time)
  - Today's redirects
  - This week's redirects
  - This month's redirects
- **Historical Data**: Last 90 days saved
- **Export Functionality**:
  - CSV export (with historical data + summary)
  - JSON export (structured data with metadata)
- **Auto-Reset**: Daily at midnight, weekly/monthly tracking

#### 6. **User Interface**
- **Toolbar Popup** (320px compact design):
  - Enable/disable toggle
  - Pause buttons with live timer
  - Statistics display
  - Link to settings page
- **Settings Page** (full-page experience):
  - Domain-specific toggles
  - Statistics grid (2x2 layout, responsive)
  - Export buttons
  - Reset functionality
  - Steam-themed dark UI

#### 7. **Visual Indicators**
- **Extension Badge**:
  - ⏸ (red) = Paused (timed)
  - OFF (red) = Disabled/Paused indefinitely
  - (blank) = Active
- **Status Display**: "Active", "Paused", "Disabled" in popup

#### 8. **Testing Suite**
- **23+ Unit Tests**: Covers all URL patterns and edge cases
- **Run without installation**: `npm test` or `node test.js`
- **Interactive Test Page**: test.html with live converter tool
- **All tests passing** ✅

---

## Technical Architecture

### Technologies & APIs Used

- **Chrome Extension Manifest V3**: Latest standard
- **Service Workers**: Background script execution
- **Chrome Storage API**: `chrome.storage.sync` for cross-device settings
- **Chrome WebNavigation API**: URL interception
- **Chrome Action API**: Toolbar popup and badge
- **Steam Protocol**: `steam://` custom URL scheme

### Data Flow

#### Redirect Flow
```
1. User clicks Steam link
   ↓
2. webNavigation.onBeforeNavigate fires
   ↓
3. background.js checks:
   - Is extension enabled?
   - Is extension paused?
   - Should this domain redirect?
   ↓
4. converter.js converts URL → steam:// protocol
   ↓
5. Tab redirected to steam:// URL
   ↓
6. Statistics incremented (total, daily, weekly, monthly)
   ↓
7. Historical data saved (90-day rolling window)
   ↓
8. Browser tab closed (100ms delay)
   ↓
9. Steam client launches with appropriate page
```

#### Settings Flow
```
1. User changes setting in popup/options
   ↓
2. JavaScript saves to chrome.storage.sync
   ↓
3. Storage change event fires
   ↓
4. background.js updates badge
   ↓
5. All open popups/options pages listen to onChanged
   ↓
6. UI updates across all instances
   ↓
7. Settings sync across user's Chrome instances
```

### Key Files Explained

#### manifest.json
- Defines extension metadata, permissions, and entry points
- Permissions: `webNavigation`, `tabs`, `storage`
- Host permissions for Steam domains
- Declares popup, options page, and service worker

#### background.js (Service Worker)
- **Core Logic**: URL interception and redirection
- **Settings Management**: Reads user preferences before each redirect
- **Statistics Engine**: Tracks and updates redirect counts
- **Badge Controller**: Updates extension icon based on state
- **Helper Functions**:
  - `isEnabled()`: Checks if extension is active
  - `shouldRedirectDomain()`: Domain-specific settings check
  - `incrementStats()`: Updates all statistics with daily/weekly/monthly resets
  - `updateBadge()`: Visual indicator management

#### converter.js
- **Pure Function**: No side effects, easily testable
- **URL Parser**: Analyzes Steam URLs and extracts components
- **Protocol Mapper**: Converts to appropriate `steam://` URL
- **Pattern Matching**: Handles all Steam URL variations
- **Exported**: Used by both extension and test suite

#### popup.js
- **UI State Management**: Updates interface based on settings
- **Pause Controls**: Handles timed and indefinite pauses
- **Countdown Timer**: Live timer display with 1-second updates
- **Badge Updates**: Calls Chrome API to set icon badge
- **Settings Sync**: Listens for changes from options page

#### options.js
- **Settings Persistence**: Saves to chrome.storage.sync
- **Statistics Display**: Shows all four metrics
- **Export Functions**:
  - `exportCSV()`: Generates CSV with history + summary
  - `exportJSON()`: Creates structured JSON export
  - `downloadFile()`: Blob download helper
- **Reset Handler**: Confirms and clears all statistics

---

## Settings Schema

### Chrome Storage Structure

```javascript
{
  // Core Settings
  enabled: boolean,              // Master on/off switch
  pauseUntil: ISO8601 | null,   // Pause expiry (9999-12-31 = indefinite)

  // Domain Controls
  redirectStore: boolean,        // store.steampowered.com
  redirectCommunity: boolean,    // steamcommunity.com
  redirectHelp: boolean,         // help.steampowered.com (general)
  redirectHelpWizard: boolean,   // help.steampowered.com/wizard/*
  redirectHelpTickets: boolean,  // help.steampowered.com/ticket*

  // Statistics
  totalRedirects: number,        // All-time count
  todayRedirects: number,        // Today's count
  weeklyRedirects: number,       // This week's count
  monthlyRedirects: number,      // This month's count

  // Tracking
  lastResetDate: string,         // "Mon Jan 01 2025" format
  lastWeekReset: string,         // "2025-W01" format
  lastMonthReset: string,        // "2025-01" format

  // Historical Data
  redirectHistory: Array<{       // Last 90 days
    date: string,                // Date of redirect
    count: number                // Number of redirects that day
  }>
}
```

---

## Testing

### Running Unit Tests

```bash
cd "d:\Coding Projects\Steam Link"
npm test
# OR
node test.js
```

**Output:**
```
🧪 Running Steam Link Redirector Tests
============================================================
✅ Convert store app URL to steam protocol
✅ Convert store app URL without trailing slash
✅ Convert store homepage
... (20 more tests)
============================================================
📊 Results: 23 passed, 0 failed
✅ All tests passed!
```

### Test Coverage

- ✅ Store app pages (with/without trailing slash)
- ✅ Store homepage
- ✅ Store packages and bundles
- ✅ HTTP → HTTPS handling
- ✅ Community homepage
- ✅ Profile pages (ID and Steam ID)
- ✅ App hubs
- ✅ Groups
- ✅ Workshop items (with query parameters)
- ✅ Help pages (return null)
- ✅ Invalid URLs (error handling)
- ✅ Non-Steam URLs (return null)
- ✅ Edge cases (malformed URLs, empty strings)

### Manual Testing

1. Open `test.html` in browser
2. Click any test link
3. Verify Steam client opens
4. Use converter tool for custom URLs

---

## Installation & Deployment

### Development Installation

1. **Prerequisites**: Chrome browser, Steam client installed
2. **Add Icons**: Place 16x16, 48x48, 128x128 PNG files in `icons/`
3. **Load Extension**:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select `Steam Link` folder
4. **Test**: Click Steam links or use test.html

### Production Distribution

#### Chrome Web Store Checklist
- [ ] Create professional icon set (Steam-themed, brand-compliant)
- [ ] Prepare screenshots (popup, settings, in-action)
- [ ] Record demo video (optional but recommended)
- [ ] Write privacy policy (extension doesn't collect data)
- [ ] Create store listing (title, description, category)
- [ ] Submit for review
- [ ] Monitor reviews and ratings

#### Firefox Port (Future)
- Adapt to Firefox Manifest V2/V3
- Replace Chrome-specific APIs with WebExtension equivalents
- Test on Firefox
- Submit to Firefox Add-ons

---

## Future Development

### Phase 3: Multi-Browser Support
- Firefox extension
- Safari extension (if feasible)
- Maintain feature parity across browsers

### Phase 4: System-Wide Protocol Handler
- **Windows**: Registry-based protocol handler, installer
- **macOS**: Launch Services registration, app bundle
- **Linux**: .desktop file, xdg-open integration
- Catches links from Discord desktop, Slack, email clients, etc.

### Phase 5: Advanced Features
- Context menu: "Open in Steam" / "Open in Browser"
- Smart detection (only redirect if Steam is running)
- Link preview on hover
- Steam wishlist quick-add
- Price tracking integration
- Library check ("already owned")

### Phase 6: Polish & Distribution
- Automated testing CI/CD
- Error monitoring (Sentry)
- Telemetry (opt-in, privacy-focused)
- Localization (multiple languages)
- Community contributions (GitHub)

---

## Common Use Cases

### Use Case 1: Browsing Reddit/Discord
**Scenario**: User sees Steam game link in Reddit post
**Flow**: Click link → Extension intercepts → Steam opens → Tab closes
**Result**: Seamless experience, no manual copy-paste

### Use Case 2: Temporarily Need Browser
**Scenario**: User wants to read Steam reviews in browser
**Flow**: Click extension icon → Pause 15m → Browse normally
**Result**: Extension automatically resumes after 15 minutes

### Use Case 3: Help Pages Should Stay in Browser
**Scenario**: User prefers support tickets in browser
**Flow**: Open settings → Disable "Support Ticket Pages"
**Result**: Store/community redirect, help tickets stay in browser

### Use Case 4: Tracking Usage
**Scenario**: User wants to see redirect statistics
**Flow**: Click extension icon → View stats, or Settings → Export CSV
**Result**: Data analysis of redirect patterns over time

---

## Troubleshooting

### Extension Doesn't Redirect

**Possible Causes:**
1. Extension is paused/disabled (check badge icon)
2. Domain redirect is disabled in settings
3. Steam client not installed or `steam://` protocol not registered
4. Browser blocked the redirect (check console for errors)

**Solutions:**
1. Check extension icon badge (⏸ or OFF means inactive)
2. Open settings, verify domain toggles are ON
3. Test `steam://` protocol: type `steam://store` in address bar
4. Reinstall Steam client to register protocol handler

### Statistics Not Updating

**Possible Causes:**
1. Extension is paused (stats don't increment when paused)
2. Storage sync is disabled
3. Browser privacy mode blocking storage

**Solutions:**
1. Ensure extension is active (no badge on icon)
2. Check chrome://extensions/ for errors
3. Disable incognito mode or allow extension in incognito

### Tests Failing

**Possible Causes:**
1. converter.js was modified incorrectly
2. Node.js not installed
3. Working directory incorrect

**Solutions:**
1. Review converter.js for syntax errors
2. Install Node.js (any recent version)
3. Run tests from project root: `cd "d:\Coding Projects\Steam Link"`

---

## Code Maintenance

### Adding New URL Patterns

1. **Update converter.js**:
   ```javascript
   // Add new pattern matching in convertToSteamProtocol()
   const newMatch = pathname.match(/\/newpattern\/(\d+)/);
   if (newMatch) {
     return `steam://url/NewPage/${newMatch[1]}`;
   }
   ```

2. **Add Test Case**:
   ```javascript
   // In test.js
   runner.test('Convert new pattern URL', (t) => {
     const result = convertToSteamProtocol('https://store.steampowered.com/newpattern/123');
     t.assertEqual(result, 'steam://url/NewPage/123');
   });
   ```

3. **Run Tests**: `npm test` to verify

4. **Update Documentation**: Add example to README.md

### Adding New Settings

1. **Update DEFAULT_SETTINGS** in background.js, popup.js, options.js
2. **Add UI Controls** in options.html
3. **Wire Up Event Listeners** in options.js
4. **Implement Logic** in background.js (e.g., `shouldRedirectDomain()`)
5. **Test Functionality**: Manually verify setting works

### Debugging

- **Background Service Worker**: `chrome://extensions/` → "Inspect views: service worker"
- **Popup**: Right-click popup → "Inspect"
- **Options Page**: Right-click options page → "Inspect"
- **Console Logs**: `console.log('Steam Link Redirector: ...')` messages

---

## Export Data Formats

### CSV Export Format

```csv
Date,Redirects
Mon Jan 01 2025,5
Tue Jan 02 2025,12
Wed Jan 03 2025,8

Summary
Total,125
This Week,25
This Month,78
```

### JSON Export Format

```json
{
  "exportDate": "2025-01-26T12:34:56.789Z",
  "summary": {
    "total": 125,
    "today": 8,
    "weekly": 25,
    "monthly": 78
  },
  "history": [
    { "date": "Mon Jan 01 2025", "count": 5 },
    { "date": "Tue Jan 02 2025", "count": 12 }
  ],
  "currentPeriod": {
    "date": "Wed Jan 03 2025",
    "count": 8
  }
}
```

---

## Performance Considerations

- **Lightweight**: Service worker only active during navigation events
- **No Background Polling**: Event-driven architecture
- **Efficient Storage**: chrome.storage.sync syncs across devices
- **Minimal Memory**: Popup/options only loaded when opened
- **Fast Redirects**: URL conversion is synchronous pattern matching
- **History Limit**: 90-day cap prevents unbounded growth

---

## Privacy & Security

- **No External Servers**: All processing happens locally
- **No Data Collection**: Extension doesn't send any data anywhere
- **No Tracking**: Statistics stored locally only
- **Minimal Permissions**: Only requests necessary APIs
- **Open Source**: All code is auditable
- **Chrome Sync**: Uses Google's sync (user controls in Chrome settings)

---

## Known Limitations

1. **Browser Only**: Doesn't catch links from desktop apps (see Phase 4)
2. **Chrome Family**: Currently Chrome/Edge/Brave only (Firefox in Phase 3)
3. **Protocol Dependency**: Requires Steam client installed
4. **Tab Close Timing**: 100ms delay may not work on very slow systems
5. **Storage Sync Quota**: Chrome limits sync storage (~100KB, sufficient for stats)

---

## Command Reference

```bash
# Run unit tests
npm test
node test.js

# Load extension in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer Mode
# 3. Click "Load unpacked"
# 4. Select project folder

# Reload extension after changes
# Click reload icon on chrome://extensions/

# View service worker console
# chrome://extensions/ → "Inspect views: service worker"
```

---

## Links & Resources

- **Chrome Extension Docs**: https://developer.chrome.com/docs/extensions/
- **Steam Protocol Docs**: https://developer.valvesoftware.com/wiki/Steam_browser_protocol
- **Manifest V3 Guide**: https://developer.chrome.com/docs/extensions/mv3/intro/
- **Steam Brand Guidelines**: https://partner.steamgames.com/doc/marketing/branding

---

## Changelog

### Version 1.0.0 (Current)
- ✅ Core redirection functionality
- ✅ Popup with pause controls (5m, 15m, 30m, 1hr, indefinite)
- ✅ Settings page with domain toggles
- ✅ Granular help page controls (general, wizard, tickets)
- ✅ Statistics tracking (total, daily, weekly, monthly)
- ✅ 90-day historical data storage
- ✅ CSV/JSON export functionality
- ✅ Extension badge indicator (⏸/OFF)
- ✅ 23+ unit tests (all passing)
- ✅ Interactive test page
- ✅ Comprehensive documentation

### Future Versions
- 1.1.0: Firefox support
- 1.2.0: Context menu integration
- 2.0.0: System-wide protocol handler
- 3.0.0: Advanced features (link preview, wishlist integration)

---

## Contact & Contribution

**Current Status**: Solo development, ready for community contributions
**License**: MIT License - Free to use and modify
**Future**: GitHub repository for issues, PRs, and discussions

---

## Quick Start for AI Assistants

When helping with this project:

1. **For Code Changes**: Always run `npm test` after modifying converter.js
2. **For New Features**: Update manifest.json permissions if needed
3. **For Settings**: Add to all three DEFAULT_SETTINGS objects (background.js, popup.js, options.js)
4. **For UI Changes**: Match Steam color scheme (#1b2838, #66c0f4, #c7d5e0)
5. **For Documentation**: Update README.md for user-facing, claude.md for technical
6. **For Testing**: Write unit tests before implementing new URL patterns

**Key Principles:**
- Keep it simple and fast
- Privacy-first (no data collection)
- User control (granular settings)
- Seamless UX (silent redirects)
- Well-tested (unit tests for all patterns)

---

## Design Decisions

### Why No Auto-Close Timer?

**Final Approach:** Let Chrome's native protocol handler manage everything.

**Rationale:**
- Chrome's security model blocks automatic protocol launches
- Requires user consent ("Always allow steam links") - respects privacy
- After one-time setup, completely seamless (no dialogs)
- Chrome automatically closes tabs when protocol succeeds
- More reliable than arbitrary timeouts
- Cleaner code, better UX

**User Experience:**
1. **First click**: Dialog appears → Check "Always allow" → Click "Open Steam"
2. **Every click after**: Tab opens → Steam launches → Tab closes automatically
3. **Result**: Zero friction after initial setup

---

**Last Updated**: January 26, 2025
**Project Status**: Feature-complete, production-ready, tested and working
**Next Steps**: Use personally, gather feedback, prepare for Chrome Web Store

# Steam Link Redirector - Roadmap

## ✅ Phase 1: Core Chrome Extension (COMPLETED)

- [x] Basic extension structure with Manifest V3
- [x] URL pattern detection for Steam domains
- [x] Conversion logic for steam:// protocol
- [x] Automatic redirection on navigation
- [x] Support for all major Steam URL types:
  - Store pages (apps, bundles, packages)
  - Community profiles and hubs
  - Workshop items
  - Groups
- [x] Test page for validation
- [x] Documentation and installation guide

## 🚧 Phase 2: Enhanced Chrome Extension (NEXT)

- [ ] **Settings/Options Page**
  - Toggle to enable/disable specific URL types
  - Whitelist/blacklist certain domains
  - Option to show notification on redirect (vs silent)
  - Statistics (how many links redirected)

- [ ] **Icon Assets**
  - Create professional icon set (16px, 48px, 128px)
  - Steam-themed design
  - Brand compliance check

- [ ] **Improved User Experience**
  - Optional notification when redirecting
  - Context menu option: "Open in Steam" / "Open in Browser"
  - Badge counter showing redirections

- [ ] **Additional URL Patterns**
  - Steam market links
  - Steam support/help pages (make configurable)
  - SteamDB integration (optional)
  - Regional store URLs (different languages)

- [ ] **Testing & Quality**
  - Unit tests for URL converter
  - Edge case handling (malformed URLs, etc.)
  - Performance optimization
  - Error logging and reporting

## 🔮 Phase 3: Multi-Browser Support

- [ ] **Firefox Extension**
  - Port to Firefox Manifest V2/V3
  - Submit to Firefox Add-ons
  - Maintain feature parity

- [ ] **Safari Extension** (if feasible)
  - Investigate Safari extension compatibility
  - Implement if technically viable

## 🚀 Phase 4: System-Wide Protocol Handler

This enables Steam link redirection from ANY application (Discord desktop, Slack, email clients, etc.)

### Windows Implementation
- [ ] Create Windows installer
- [ ] Register protocol handler in Windows Registry
- [ ] System tray application for settings
- [ ] Auto-start with Windows option

### macOS Implementation
- [ ] Create macOS app bundle
- [ ] Register protocol handler with Launch Services
- [ ] Menu bar application
- [ ] Sandboxing and security compliance

### Linux Implementation
- [ ] Create .desktop file
- [ ] Register with xdg-open
- [ ] Support for major desktop environments (GNOME, KDE, etc.)

## 💎 Phase 5: Advanced Features

- [ ] **Smart Detection**
  - Only redirect if Steam is running
  - Fallback to browser if Steam not installed
  - Detect Steam installation path

- [ ] **Link Preview**
  - Optional hover preview before redirecting
  - Show game metadata (name, price, reviews)
  - Quick "Open in Browser" override

- [ ] **Analytics & Insights**
  - Track which types of links are most common
  - User engagement metrics
  - Privacy-focused (local only)

- [ ] **Integration Features**
  - Steam wishlist quick-add from browser
  - Price tracking integration
  - Library check (already owned?)

## 📦 Phase 6: Distribution & Community

- [ ] **Chrome Web Store**
  - Prepare store listing
  - Screenshots and demo video
  - Privacy policy
  - Submit for review

- [ ] **Open Source Community**
  - GitHub repository setup
  - Contribution guidelines
  - Issue templates
  - CI/CD pipeline

- [ ] **Documentation**
  - User guide with screenshots
  - Developer documentation
  - FAQ section
  - Troubleshooting guide

- [ ] **Marketing**
  - Reddit posts (r/Steam, r/pcgaming)
  - Steam community announcement
  - Product Hunt launch
  - Blog post/article

## 🔧 Technical Debt & Maintenance

- [ ] Automated testing suite
- [ ] Error monitoring (Sentry or similar)
- [ ] Update mechanism
- [ ] Telemetry (opt-in, privacy-focused)
- [ ] Regular Steam API updates check

## 💡 Ideas for Consideration

These are brainstorming ideas that need validation:

- Browser toolbar popup showing recent Steam activity
- Quick search Steam store from extension
- Integration with Steam Web API for enhanced features
- Mobile companion (for phones/tablets)
- Discord bot integration
- Keyboard shortcuts for power users
- Dark/light theme support
- Localization (multiple languages)

## Notes

- Prioritize user privacy and minimal permissions
- Keep extension lightweight and fast
- Maintain backwards compatibility where possible
- Focus on reliability over feature bloat
- Regular security audits

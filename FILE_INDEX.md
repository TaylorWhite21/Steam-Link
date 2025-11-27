# 📁 File Index

Quick reference for all files in the project.

---

## 📄 Documentation (Read These!)

| File | Purpose | Who It's For |
|------|---------|--------------|
| **[README.md](README.md)** | Main documentation - features, installation, usage | **Everyone - START HERE** |
| **[BROWSERS.md](BROWSERS.md)** | Multi-browser installation guide | Users on Firefox/Edge/Opera |
| **[INSTALLATION.md](INSTALLATION.md)** | Detailed installation guide with troubleshooting | Users needing help |
| **[SECURITY.md](SECURITY.md)** | Security policy and privacy details | Security-conscious users |
| **[claude.md](claude.md)** | Complete technical documentation | Developers & AI assistants |
| **[ROADMAP.md](ROADMAP.md)** | Future development plans | Contributors & curious users |
| **[FILE_INDEX.md](FILE_INDEX.md)** | This file - navigation guide | Everyone |

---

## 🔧 Core Extension Files

| File | Lines | Purpose |
|------|-------|---------|
| **[manifest.json](manifest.json)** | ~35 | Chrome/Edge/Opera configuration (Manifest V3) |
| **[manifest-firefox.json](manifest-firefox.json)** | ~40 | Firefox configuration (Manifest V2) |
| **[background.js](background.js)** | ~240 | Service worker - URL interception & redirect logic (cross-browser) |
| **[converter.js](converter.js)** | ~100 | Pure function: URL → steam:// conversion (cross-browser) |

---

## 🎨 User Interface

| File | Lines | Purpose |
|------|-------|---------|
| **[popup.html](popup.html)** | ~250 | Toolbar popup UI |
| **[popup.js](popup.js)** | ~240 | Popup logic (pause, stats, settings) - cross-browser |
| **[options.html](options.html)** | ~320 | Full settings page UI |
| **[options.js](options.js)** | ~185 | Settings logic (domain controls, export) - cross-browser |

---

## 🧪 Testing

| File | Lines | Purpose |
|------|-------|---------|
| **[test.js](test.js)** | ~200 | 23 unit tests - run with `npm test` |
| **[test.html](test.html)** | ~150 | Interactive browser test page |

---

## 🛠️ Utilities & Build

| File | Purpose |
|------|---------|
| **[build.bat](build.bat)** | Build script - packages for Chrome & Firefox |
| **[setup-git.bat](setup-git.bat)** | Git initialization helper script |
| **[package.json](package.json)** | npm configuration - defines test script |
| **[.gitignore](.gitignore)** | Git exclusions - build artifacts, temp files |
| **[LICENSE](LICENSE)** | MIT License |

---

## 📁 Directories

| Directory | Contents |
|-----------|----------|
| **icons/** | Extension icons (16x16, 48x48, 128x128 PNGs) |
| **.claude/** | Claude Code configuration (auto-generated) |

---

## 🔍 Quick Navigation

### Want to...

**Install the extension?**
→ Read [README.md](README.md) Quick Start section

**Understand how it works?**
→ Read [claude.md](claude.md) Core Functionality section

**Fix a problem?**
→ Check [INSTALLATION.md](INSTALLATION.md) Troubleshooting section

**Add a feature?**
→ Read [claude.md](claude.md) Code Maintenance section

**Run tests?**
→ `npm test` or `node test.js`

**Modify UI?**
→ Edit [popup.html](popup.html) or [options.html](options.html)

**Change redirect logic?**
→ Edit [background.js](background.js)

**Add URL patterns?**
→ Edit [converter.js](converter.js) + add tests to [test.js](test.js)

---

## 📊 Project Stats

- **Total Files**: 22 files
- **Documentation**: 7 markdown files
- **Code Files**: 8 JavaScript/HTML files
- **Manifests**: 2 (Chrome & Firefox)
- **Build Scripts**: 2 batch files
- **Tests**: 23 unit tests (all passing ✅)
- **Lines of Code**: ~2,700
- **Version**: 1.0.0
- **Status**: Production-ready, cross-browser
- **Browsers Supported**: Chrome, Firefox, Edge, Opera, Brave, Vivaldi

---

## 🎯 File Relationships

### Chrome/Edge/Opera Build
```
manifest.json (Manifest V3)
├── background.js (service worker, cross-browser)
│   └── converter.js (imports, cross-browser)
├── popup.html → popup.js (cross-browser)
└── options.html → options.js (cross-browser)
```

### Firefox Build
```
manifest-firefox.json → manifest.json (Manifest V2)
├── background.js (background script, cross-browser)
│   ├── converter.js (loaded via manifest, cross-browser)
├── popup.html → popup.js (cross-browser)
└── options.html → options.js (cross-browser)
```

### Testing
```
test.js → converter.js (imports for testing)
test.html → converter.js (imports for UI testing)
```

---

**Lost? Start with [README.md](README.md) - it has everything you need!**

# 📁 File Index

Quick reference for all files in the project.

---

## 📄 Documentation (Read These!)

| File | Purpose | Who It's For |
|------|---------|--------------|
| **[README.md](README.md)** | Main documentation - features, installation, usage | **Everyone - START HERE** |
| **[INSTALLATION.md](INSTALLATION.md)** | Detailed installation guide with troubleshooting | Users needing help |
| **[claude.md](claude.md)** | Complete technical documentation | Developers & AI assistants |
| **[ROADMAP.md](ROADMAP.md)** | Future development plans | Contributors & curious users |
| **[FILE_INDEX.md](FILE_INDEX.md)** | This file - navigation guide | Everyone |

---

## 🔧 Core Extension Files

| File | Lines | Purpose |
|------|-------|---------|
| **[manifest.json](manifest.json)** | ~40 | Extension configuration (Manifest V3) |
| **[background.js](background.js)** | ~230 | Service worker - URL interception & redirect logic |
| **[converter.js](converter.js)** | ~100 | Pure function: URL → steam:// conversion |

---

## 🎨 User Interface

| File | Lines | Purpose |
|------|-------|---------|
| **[popup.html](popup.html)** | ~250 | Toolbar popup UI |
| **[popup.js](popup.js)** | ~200 | Popup logic (pause, stats, settings) |
| **[options.html](options.html)** | ~320 | Full settings page UI |
| **[options.js](options.js)** | ~180 | Settings logic (domain controls, export) |

---

## 🧪 Testing

| File | Lines | Purpose |
|------|-------|---------|
| **[test.js](test.js)** | ~200 | 23 unit tests - run with `npm test` |
| **[test.html](test.html)** | ~150 | Interactive browser test page |

---

## 🛠️ Utilities

| File | Purpose |
|------|---------|
| **[generate-icons.html](generate-icons.html)** | Icon generator tool - creates placeholder PNGs |
| **[package.json](package.json)** | npm configuration - defines test script |

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

**Generate icons?**
→ Open [generate-icons.html](generate-icons.html)

**Modify UI?**
→ Edit [popup.html](popup.html) or [options.html](options.html)

**Change redirect logic?**
→ Edit [background.js](background.js)

**Add URL patterns?**
→ Edit [converter.js](converter.js) + add tests to [test.js](test.js)

---

## 📊 Project Stats

- **Total Files**: 17 files
- **Documentation**: 5 markdown files
- **Code Files**: 8 JavaScript/HTML files
- **Tests**: 23 unit tests (all passing ✅)
- **Lines of Code**: ~2,500
- **Version**: 1.0.0
- **Status**: Production-ready

---

## 🎯 File Relationships

```
manifest.json (entry point)
├── background.js (service worker)
│   └── converter.js (imports)
├── popup.html → popup.js
└── options.html → options.js

test.js → converter.js (imports for testing)
test.html → converter.js (imports for UI testing)
```

---

**Lost? Start with [README.md](README.md) - it has everything you need!**

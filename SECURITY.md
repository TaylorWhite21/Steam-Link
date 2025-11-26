# Security Policy

## Overview

Steam Link Redirector is designed with security and privacy as top priorities. This document outlines our security practices and how to report vulnerabilities.

---

## Security Features

### Minimal Permissions
- **webNavigation**: Required to intercept Steam URLs
- **tabs**: Required to redirect tabs to Steam client
- **storage**: Required to save user preferences and statistics

**No dangerous permissions** - We do NOT request:
- `<all_urls>` - Only specific Steam domains
- `cookies` - No cookie access
- `history` - No browsing history access
- `downloads` - No file access
- `webRequest` or `webRequestBlocking` - No request modification

### Privacy-First Design
- **No external servers** - All processing happens locally
- **No analytics** - Zero telemetry or tracking
- **No PII collection** - We don't track which URLs you visit
- **Local storage only** - Statistics stored in Chrome sync (encrypted by Google)
- **Full transparency** - Export all your data anytime (CSV/JSON)

### Secure Code Practices
- **Input validation** - All URLs validated with `URL()` constructor
- **No code injection** - No `eval()`, `Function()`, or dynamic scripts
- **Safe DOM manipulation** - Uses `textContent` (not `innerHTML`)
- **Content Security Policy** - Manifest V3 enforces strict CSP
- **Scoped permissions** - Only Steam domains, no wildcards

---

## What Data We Collect

### Stored Locally (Chrome Sync Storage)
- **Statistics**: Count of redirects (total, daily, weekly, monthly)
- **Settings**: User preferences (which domains to redirect, pause state)
- **History**: Last 90 days of daily redirect counts

### What We DON'T Collect
- Specific URLs you clicked
- Personal information
- Browsing history
- Cookies or session data
- Any data sent to external servers

**All data stays on your device** and is only synced via Chrome's encrypted sync (if you enable Chrome sync).

---

## Chrome Web Store Review

Before publishing to Chrome Web Store, this extension will undergo:
- Automated security scans
- Manual code review by Google
- Compliance checks for privacy policies
- Permission justification review

---

## Security Best Practices

### For Users
1. **Only install from official sources** - Chrome Web Store or this GitHub repository
2. **Review permissions** - Check what the extension requests before installing
3. **Check for updates** - Keep the extension updated
4. **Report issues** - See reporting section below

### For Developers
1. **Code review required** - All changes must be reviewed
2. **No external dependencies** - Pure JavaScript, no npm packages in production
3. **Test before release** - All 23 unit tests must pass
4. **Follow principle of least privilege** - Request minimum permissions needed

---

## Known Limitations

### Protocol Handler Trust
- Extension relies on `steam://` protocol handler
- User must explicitly approve "Always allow steam links" (one-time)
- Chrome validates protocol handlers - no security risk

### Chrome Sync Storage
- Data synced via Google's encrypted Chrome sync (if enabled)
- Stored locally if Chrome sync is disabled
- No third-party servers involved

---

## Reporting Security Vulnerabilities

We take security seriously. If you discover a vulnerability:

### Please Report
- Code injection vulnerabilities
- Permission escalation issues
- Data leakage or privacy concerns
- Any security-related bugs

### How to Report
1. **DO NOT** open a public GitHub issue for security vulnerabilities
2. **Email**: [Your security contact email here]
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect
- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 1 week
- **Fix timeline**: Depends on severity (critical issues patched immediately)
- **Credit**: We'll credit you in release notes (if desired)

---

## Security Update Policy

### Version Scheme
- **Major.Minor.Patch** (e.g., 1.0.0)
- **Security patches**: Increment patch version (1.0.0 → 1.0.1)
- **Published via**: Chrome Web Store auto-update

### Update Timeline
- **Critical vulnerabilities**: 24-48 hours
- **High severity**: 1 week
- **Medium/Low severity**: Next scheduled release

---

## Audit History

| Date | Version | Audit Type | Result |
|------|---------|------------|--------|
| 2025-01-26 | 1.0.0 | Internal security review | ✅ Pass - No critical issues |
| TBD | 1.0.0 | Chrome Web Store review | Pending |

---

## Security Checklist for v1.0.0

- ✅ Minimal permissions (only webNavigation, tabs, storage)
- ✅ No external network requests
- ✅ Input validation on all URLs
- ✅ No code injection vectors (eval, Function, etc.)
- ✅ Safe DOM manipulation (textContent only)
- ✅ Content Security Policy compliant (Manifest V3)
- ✅ No analytics or tracking
- ✅ No PII collection
- ✅ User data exportable (CSV/JSON)
- ✅ Code reviewed and tested (23 unit tests)
- ✅ Scoped host permissions (Steam domains only)
- ✅ Privacy-first design (local storage only)

---

## Additional Resources

- [Chrome Extension Security Best Practices](https://developer.chrome.com/docs/extensions/mv3/security/)
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)

---

**Last Updated**: January 26, 2025
**Version**: 1.0.0

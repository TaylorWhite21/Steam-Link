# Installation Guide

## Prerequisites

- Google Chrome, Microsoft Edge, or any Chromium-based browser
- Steam client installed and configured on your system

## Step-by-Step Installation

### 1. Load the Extension in Chrome

1. Open Chrome (or Edge, Brave, etc.)
2. Navigate to the extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Or click the three-dot menu → Extensions → Manage Extensions

3. Enable **Developer mode**:
   - Look for a toggle switch in the top-right corner
   - Turn it ON

4. Click **Load unpacked**

5. Navigate to and select the `Steam Link` folder (the folder containing `manifest.json`)

6. The extension should now appear in your extensions list

### 2. Verify Installation

You should see "Steam Link Redirector" in your extensions list with:
- ✓ Enabled toggle switched ON
- Version 1.0.0
- Description: "Automatically opens Steam links in the Steam client instead of your browser"

## Testing the Extension

### Method 1: Use the Test Page

1. Open `test.html` in your browser (File → Open File)
2. Click any of the Steam links
3. Steam should open automatically instead of navigating in the browser
4. Use the converter test tool to validate URL conversions

### Method 2: Test with Real Links

Try these links from anywhere (Google, Discord web, etc.):
- https://store.steampowered.com/app/730
- https://steamcommunity.com/
- https://store.steampowered.com/

### Expected Behavior

✓ Clicking a Steam link should:
1. Briefly show a loading state
2. Launch the Steam client
3. Close the browser tab automatically
4. Open the appropriate page in Steam

✗ If Steam doesn't open:
- Check that Steam is installed and the `steam://` protocol is registered
- Check the browser console for errors (F12 → Console tab)
- Verify the extension is enabled

## Troubleshooting

### Extension doesn't appear
- Make sure you selected the correct folder (containing `manifest.json`)
- Check that all required files exist: `manifest.json`, `background.js`, `converter.js`
- Look for error messages in the extensions page

### Steam doesn't open
- Test if `steam://` protocol works by typing `steam://store` in your browser address bar
- On Windows, verify Steam is in the system registry
- Make sure Steam client is installed

### Extension causes errors
1. Open the extensions page
2. Click "Details" on Steam Link Redirector
3. Click "Inspect views: service worker" to see console logs
4. Check for any error messages

### Links still open in browser
- Verify the extension is enabled (toggle is ON)
- Check that the URL is a Steam domain we support
- Some Steam help pages intentionally stay in browser

## Updating the Extension

When you make changes to the code:

1. Go to `chrome://extensions/`
2. Find "Steam Link Redirector"
3. Click the refresh/reload icon (circular arrow)
4. Test the changes

## Uninstalling

1. Go to `chrome://extensions/`
2. Find "Steam Link Redirector"
3. Click "Remove"
4. Confirm the removal

## Next Steps

Once testing is complete, you can:
- Package the extension for distribution
- Submit to Chrome Web Store
- Add Firefox support
- Implement a system-wide protocol handler

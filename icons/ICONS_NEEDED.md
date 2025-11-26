# Icons Needed

The extension requires three icon sizes:
- 16x16 pixels (icon16.png)
- 48x48 pixels (icon48.png)
- 128x128 pixels (icon128.png)

## Quick Solution

You can:

1. **Use Steam's logo** (recommended for recognition):
   - Download Steam logos from Steam's brand assets
   - Resize to required dimensions

2. **Create simple icons**:
   - Use any image editor (GIMP, Photoshop, Figma, etc.)
   - Create a simple Steam-related icon (gear, link, etc.)
   - Export in the three required sizes

3. **Temporary placeholder**:
   - For testing, you can use any PNG images in these sizes
   - The extension will work without icons, they just won't display

## Simple Icon Template

Below is an SVG you can convert to PNG at different sizes:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <circle cx="64" cy="64" r="60" fill="#1b2838"/>
  <path d="M64 20 L64 64 L90 64" stroke="#66c0f4" stroke-width="8" fill="none" stroke-linecap="round"/>
  <circle cx="64" cy="64" r="12" fill="#66c0f4"/>
</svg>
```

Save this as SVG and use an online converter or tool like Inkscape to export as PNG at 16x16, 48x48, and 128x128.

/**
 * Converts Steam web URLs to steam:// protocol URLs
 */

/**
 * Converts a Steam web URL to the appropriate steam:// protocol URL
 * @param {string} url - The Steam web URL to convert
 * @returns {string|null} - The steam:// protocol URL, or null if not convertible
 */
function convertToSteamProtocol(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    const pathname = urlObj.pathname;
    const searchParams = urlObj.searchParams;

    // Store pages: store.steampowered.com/app/123456
    if (hostname.includes('store.steampowered.com')) {
      // App pages
      const appMatch = pathname.match(/\/app\/(\d+)/);
      if (appMatch) {
        return `steam://store/${appMatch[1]}`;
      }

      // Sub pages (subscriptions/packages)
      const subMatch = pathname.match(/\/sub\/(\d+)/);
      if (subMatch) {
        return `steam://url/StoreAppPage/${subMatch[1]}`;
      }

      // Bundle pages
      const bundleMatch = pathname.match(/\/bundle\/(\d+)/);
      if (bundleMatch) {
        return `steam://url/StoreAppPage/${bundleMatch[1]}`;
      }

      // General store homepage
      if (pathname === '/' || pathname === '') {
        return 'steam://store';
      }
    }

    // Community pages: steamcommunity.com
    if (hostname.includes('steamcommunity.com')) {
      // Profile pages by ID
      const profileIdMatch = pathname.match(/\/id\/([^\/]+)/);
      if (profileIdMatch) {
        return `steam://url/SteamIDPage/${profileIdMatch[1]}`;
      }

      // Profile pages by Steam ID (numbers)
      const profileMatch = pathname.match(/\/profiles\/(\d+)/);
      if (profileMatch) {
        return `steam://url/SteamIDPage/${profileMatch[1]}`;
      }

      // Workshop items
      const workshopMatch = pathname.match(/\/sharedfiles\/filedetails/);
      if (workshopMatch) {
        const fileId = searchParams.get('id');
        if (fileId) {
          return `steam://url/CommunityFilePage/${fileId}`;
        }
      }

      // App hubs/communities
      const appHubMatch = pathname.match(/\/app\/(\d+)/);
      if (appHubMatch) {
        return `steam://url/GameHub/${appHubMatch[1]}`;
      }

      // Groups
      const groupMatch = pathname.match(/\/groups\/([^\/]+)/);
      if (groupMatch) {
        return `steam://url/GroupSteamIDPage/${groupMatch[1]}`;
      }

      // General community
      if (pathname === '/' || pathname === '') {
        return 'steam://url/CommunityHome';
      }
    }

    // Help/Support pages
    if (hostname.includes('help.steampowered.com')) {
      // Keep help pages in browser as they're better suited for web
      return null;
    }

    return null;
  } catch (error) {
    console.error('Error converting Steam URL:', error);
    return null;
  }
}

// Export for use in background script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { convertToSteamProtocol };
}

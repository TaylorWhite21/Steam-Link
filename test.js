/**
 * Unit tests for Steam Link Redirector
 * Run with: node test.js
 */

// Simple test framework
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(description, testFn) {
    this.tests.push({ description, testFn });
  }

  assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(
        message || `Expected "${expected}" but got "${actual}"`
      );
    }
  }

  assertNull(actual, message) {
    if (actual !== null) {
      throw new Error(
        message || `Expected null but got "${actual}"`
      );
    }
  }

  async run() {
    console.log('\n🧪 Running Steam Link Redirector Tests\n');
    console.log('='.repeat(60));

    for (const { description, testFn } of this.tests) {
      try {
        await testFn(this);
        this.passed++;
        console.log(`✅ ${description}`);
      } catch (error) {
        this.failed++;
        console.log(`❌ ${description}`);
        console.log(`   Error: ${error.message}\n`);
      }
    }

    console.log('='.repeat(60));
    console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);

    if (this.failed > 0) {
      console.log('\n❌ Some tests failed!\n');
      process.exit(1);
    } else {
      console.log('\n✅ All tests passed!\n');
      process.exit(0);
    }
  }
}

// Load the converter module
const { convertToSteamProtocol } = require('./converter.js');

// Create test runner
const runner = new TestRunner();

// ==================== STORE TESTS ====================

runner.test('Convert store app URL to steam protocol', (t) => {
  const result = convertToSteamProtocol('https://store.steampowered.com/app/730/CounterStrike_2/');
  t.assertEqual(result, 'steam://store/730');
});

runner.test('Convert store app URL without trailing slash', (t) => {
  const result = convertToSteamProtocol('https://store.steampowered.com/app/1091500');
  t.assertEqual(result, 'steam://store/1091500');
});

runner.test('Convert store homepage', (t) => {
  const result = convertToSteamProtocol('https://store.steampowered.com/');
  t.assertEqual(result, 'steam://store');
});

runner.test('Convert store sub (package) URL', (t) => {
  const result = convertToSteamProtocol('https://store.steampowered.com/sub/54029/');
  t.assertEqual(result, 'steam://url/StoreAppPage/54029');
});

runner.test('Convert store bundle URL', (t) => {
  const result = convertToSteamProtocol('https://store.steampowered.com/bundle/232/Valve_Complete_Pack/');
  t.assertEqual(result, 'steam://url/StoreAppPage/232');
});

runner.test('Handle HTTP URLs (should upgrade to HTTPS internally)', (t) => {
  const result = convertToSteamProtocol('http://store.steampowered.com/app/570/');
  t.assertEqual(result, 'steam://store/570');
});

// ==================== COMMUNITY TESTS ====================

runner.test('Convert community homepage', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/');
  t.assertEqual(result, 'steam://url/CommunityHome');
});

runner.test('Convert community profile by ID', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/id/gabelogannewell');
  t.assertEqual(result, 'steam://url/SteamIDPage/gabelogannewell');
});

runner.test('Convert community profile by Steam ID', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/profiles/76561197960287930');
  t.assertEqual(result, 'steam://url/SteamIDPage/76561197960287930');
});

runner.test('Convert community app hub', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/app/730');
  t.assertEqual(result, 'steam://url/GameHub/730');
});

runner.test('Convert community group', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/groups/steamuniverse');
  t.assertEqual(result, 'steam://url/GroupSteamIDPage/steamuniverse');
});

runner.test('Convert workshop item', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/sharedfiles/filedetails/?id=123456789');
  t.assertEqual(result, 'steam://url/CommunityFilePage/123456789');
});

runner.test('Handle workshop URL with additional parameters', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/sharedfiles/filedetails/?id=123456789&searchtext=test');
  t.assertEqual(result, 'steam://url/CommunityFilePage/123456789');
});

// ==================== HELP PAGES (should return null) ====================

runner.test('Help pages should return null (not converted)', (t) => {
  const result = convertToSteamProtocol('https://help.steampowered.com/en/wizard/HelpWithGame');
  t.assertNull(result);
});

// ==================== EDGE CASES ====================

runner.test('Invalid URL should return null', (t) => {
  const result = convertToSteamProtocol('not-a-url');
  t.assertNull(result);
});

runner.test('Non-Steam URL should return null', (t) => {
  const result = convertToSteamProtocol('https://google.com');
  t.assertNull(result);
});

runner.test('Steam URL without app ID should return null or appropriate protocol', (t) => {
  const result = convertToSteamProtocol('https://store.steampowered.com/genre/Action/');
  // This should return null as we don't have a specific handler for genre pages
  t.assertNull(result);
});

runner.test('Malformed app URL should return null', (t) => {
  const result = convertToSteamProtocol('https://store.steampowered.com/app/notanumber/');
  t.assertNull(result);
});

runner.test('Empty string should return null', (t) => {
  const result = convertToSteamProtocol('');
  t.assertNull(result);
});

runner.test('Workshop URL without ID should return null', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/sharedfiles/filedetails/');
  t.assertNull(result);
});

// ==================== URL VARIATIONS ====================

runner.test('Handle URL with www subdomain', (t) => {
  const result = convertToSteamProtocol('https://www.store.steampowered.com/app/730/');
  t.assertEqual(result, 'steam://store/730');
});

runner.test('Handle community URL with trailing slash on profile', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/id/gabelogannewell/');
  t.assertEqual(result, 'steam://url/SteamIDPage/gabelogannewell');
});

runner.test('Handle profile with subpages (should still convert to profile)', (t) => {
  const result = convertToSteamProtocol('https://steamcommunity.com/id/testuser/games');
  t.assertEqual(result, 'steam://url/SteamIDPage/testuser');
});

// Run all tests
runner.run();

import type { AutomationSignals } from '../types.js';

export function detectBrowserAutomation(): AutomationSignals {
  const signals: AutomationSignals = {
    detected: false,
    webdriver: false,
    headless: false,
    abnormalProperties: false,
    confidence: 0,
  };

  const w = window as any;

  // 1. Check navigator.webdriver
  if ((navigator as any).webdriver === true) {
    signals.webdriver = true;
  }

  // 2. Check for headless Chrome flags
  const ua = navigator.userAgent.toLowerCase();
  const headlessPatterns = [
    'headless',
    'headlesschrome',
    'phantomjs',
    'jsdom',
  ];
  if (headlessPatterns.some((p) => ua.includes(p))) {
    signals.headless = true;
  }

  // 3. Check missing or abnormal plugins
  try {
    if (navigator.plugins?.length === 0 && !ua.includes('safari')) {
      signals.headless = true;
    }
  } catch {
    signals.headless = true;
  }

  // 4. Check for Selenium/Playwright/Puppeteer CDP signals
  if (w.$cdc_asdjflasutopfhvcZLmcfl_ !== undefined) {
    signals.headless = true;
  }
  if (w.callPhantom !== undefined) {
    signals.headless = true;
  }
  if (w._phantom !== undefined) {
    signals.headless = true;
  }
  if (w.__nightmare !== undefined) {
    signals.headless = true;
  }
  if (w.__selenium_unwrapped !== undefined) {
    signals.headless = true;
  }
  if (w.chrome?.runtime?.id !== undefined && !w.chrome?.app) {
    signals.abnormalProperties = true;
  }

  // 5. Check for abnormal screen dimensions (0x0)
  try {
    if (window.screenX === 0 && window.screenY === 0 &&
        window.outerWidth === 0 && window.outerHeight === 0) {
      signals.abnormalProperties = true;
    }
  } catch {
    signals.abnormalProperties = true;
  }

  // 6. Check permissions API behavior (headless browsers often reject instantly)
  try {
    if (navigator.permissions?.query) {
      navigator.permissions.query({ name: 'camera' as PermissionName }).catch(() => {});
    }
  } catch {
    signals.abnormalProperties = true;
  }

  // 7. Check for Chrome runtime vs actual Chrome
  const hasChrome = w.chrome !== undefined;
  const hasProperChromeProps =
    hasChrome && typeof w.chrome.app === 'object' &&
    typeof w.chrome.csi === 'function' &&
    typeof w.chrome.loadTimes === 'function';

  if (hasChrome && !hasProperChromeProps) {
    signals.abnormalProperties = true;
  }

  // Compute confidence
  const trueCount = [signals.webdriver, signals.headless, signals.abnormalProperties]
    .filter(Boolean).length;

  signals.confidence = trueCount / 3;
  signals.detected = signals.webdriver || signals.headless || signals.abnormalProperties;

  return signals;
}

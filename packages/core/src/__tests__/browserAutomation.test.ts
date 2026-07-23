import { describe, it, expect, beforeEach } from 'vitest';
import { detectBrowserAutomation } from '../checks/browserAutomation.js';

describe('detectBrowserAutomation', () => {
  beforeEach(() => {
    delete (window as any).$cdc_asdjflasutopfhvcZLmcfl_;
    delete (window as any).callPhantom;
    delete (window as any)._phantom;
    delete (window as any).__nightmare;
    delete (window as any).__selenium_unwrapped;
    delete (window as any).chrome;
  });

  it('returns detected=false for a normal browser', () => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
      configurable: true,
    });
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3] as any,
      configurable: true,
    });
    const result = detectBrowserAutomation();
    expect(result.detected).toBe(false);
  });

  it('detects webdriver=true', () => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => true,
      configurable: true,
    });
    const result = detectBrowserAutomation();
    expect(result.webdriver).toBe(true);
    expect(result.detected).toBe(true);
  });

  it('detects headless userAgent', () => {
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Mozilla/5.0 HeadlessChrome/120.0',
      configurable: true,
    });
    const result = detectBrowserAutomation();
    expect(result.headless).toBe(true);
  });

  it('detects PhantomJS', () => {
    (window as any).callPhantom = {};
    const result = detectBrowserAutomation();
    expect(result.headless).toBe(true);
  });

  it('detects $cdc_ signal (Selenium CDP)', () => {
    (window as any).$cdc_asdjflasutopfhvcZLmcfl_ = 'secret';
    const result = detectBrowserAutomation();
    expect(result.headless).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { computeFrameDiff, computeGlobalBrightness } from '../utils/canvas.js';

function makeImageData(pixels: number[]): ImageData {
  const data = new Uint8ClampedArray(pixels);
  return { data, width: 1, height: pixels.length / 4 } as ImageData;
}

describe('computeFrameDiff', () => {
  it('returns 0 for identical frames', () => {
    const a = makeImageData([255, 0, 0, 255, 0, 255, 0, 255]);
    const b = makeImageData([255, 0, 0, 255, 0, 255, 0, 255]);
    expect(computeFrameDiff(a, b)).toBe(0);
  });

  it('returns >0 for different frames', () => {
    const a = makeImageData([255, 0, 0, 255, 0, 0, 0, 255]);
    const b = makeImageData([0, 0, 0, 255, 0, 0, 0, 255]);
    const diff = computeFrameDiff(a, b);
    expect(diff).toBeGreaterThan(0);
  });
});

describe('computeGlobalBrightness', () => {
  it('returns 255 for white pixel', () => {
    const frame = makeImageData([255, 255, 255, 255]);
    expect(computeGlobalBrightness(frame)).toBeCloseTo(255, 0);
  });

  it('returns 0 for black pixel', () => {
    const frame = makeImageData([0, 0, 0, 255]);
    expect(computeGlobalBrightness(frame)).toBe(0);
  });
});

import { describe, it, expect } from 'vitest';

// Mock a MediaStream with an audio track
function makeMockStream(label: string): MediaStream {
  const track = {
    kind: 'audio',
    label,
    stop: () => {},
  } as unknown as MediaStreamTrack;
  return { getAudioTracks: () => [track] } as MediaStream;
}

// Inline the label-checking logic from microphoneIntegrity
function checkLabel(label: string): boolean {
  const virtualIndicators = [
    'virtual',
    'loopback',
    'screen capture',
    'display',
    'blackhole',
    'soundflower',
    'vb cable',
    'voicemeeter',
  ];
  const lower = label.toLowerCase();
  if (virtualIndicators.some((v) => lower.includes(v))) return true;
  if (!lower || lower === '' || lower === 'unknown') return true;
  return false;
}

describe('microphoneIntegrity label check', () => {
  it('detects virtual audio cable', () => {
    expect(checkLabel('VB-Cable Virtual')).toBe(true);
  });

  it('detects loopback', () => {
    expect(checkLabel('BlackHole 16ch')).toBe(true);
  });

  it('detects Soundflower', () => {
    expect(checkLabel('Soundflower (2ch)')).toBe(true);
  });

  it('passes real microphone', () => {
    expect(checkLabel('MacBook Pro Microphone')).toBe(false);
  });

  it('passes USB microphone', () => {
    expect(checkLabel('Yeti Stereo Microphone')).toBe(false);
  });

  it('flags empty label', () => {
    expect(checkLabel('')).toBe(true);
  });

  it('flags unknown label', () => {
    expect(checkLabel('unknown')).toBe(true);
  });
});

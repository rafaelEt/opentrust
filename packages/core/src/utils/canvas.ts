export function captureFrame(
  video: HTMLVideoElement,
  width = 320,
  height = 240
): ImageData | null {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(video, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

export function computeFrameDiff(
  prev: ImageData,
  curr: ImageData
): number {
  if (prev.data.length !== curr.data.length) return 0;
  const data = prev.data;
  const currData = curr.data;
  let diff = 0;
  const len = data.length;
  for (let i = 0; i < len; i += 4) {
    const dr = Math.abs(data[i] - currData[i]);
    const dg = Math.abs(data[i + 1] - currData[i + 1]);
    const db = Math.abs(data[i + 2] - currData[i + 2]);
    const lum = 0.2126 * dr + 0.7152 * dg + 0.0722 * db;
    if (lum > 30) diff++;
  }
  return diff / (len / 4);
}

export function computeGlobalBrightness(frame: ImageData): number {
  const data = frame.data;
  let sum = 0;
  const len = data.length;
  for (let i = 0; i < len; i += 4) {
    sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  }
  return sum / (len / 4);
}

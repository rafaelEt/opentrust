export async function getCameraStream(
  timeoutMs = 10000
): Promise<MediaStream | null> {
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      return null;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user',
      },
      audio: false,
    });
    clearTimeout(timeout);
    return stream;
  } catch {
    return null;
  }
}

export function stopCameraStream(stream: MediaStream) {
  for (const track of stream.getTracks()) {
    track.stop();
  }
}

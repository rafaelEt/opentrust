export async function getMicrophoneStream(
  timeoutMs = 10000
): Promise<MediaStream | null> {
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      return null;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
      video: false,
    });
    clearTimeout(timeout);
    return stream;
  } catch {
    return null;
  }
}

export function stopAudioStream(stream: MediaStream) {
  for (const track of stream.getTracks()) {
    track.stop();
  }
}

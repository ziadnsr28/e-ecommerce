/**
 * Synthesizes a subtle, pleasant confirmation sound using Web Audio API
 * when a deletion action completes successfully.
 * Does not require external audio files and handles browser autoplay restrictions gracefully.
 */
export function playDeleteSuccessSound(): void {
  try {
    if (typeof window === "undefined") return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Subtle, gentle descending chime (A4 -> E4)
    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(440, now); // A4
    osc.frequency.exponentialRampToValueAtTime(330, now + 0.14); // E4

    // Low, comfortable volume that doesn't startle the user
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch {
    // Graceful fallback if audio is not supported or blocked by browser policy
  }
}

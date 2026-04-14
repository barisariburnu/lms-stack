"use client";

import confetti from "canvas-confetti";

export function useConfetti() {
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: Record<string, unknown>) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 70 });
    fire(0.35, { spread: 100, decay: 0.91, origin: { y: 0.9 } });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      origin: { y: 0.9 },
    });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return { triggerConfetti };
}

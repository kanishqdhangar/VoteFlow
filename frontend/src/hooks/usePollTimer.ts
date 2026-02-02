import { useEffect, useState } from "react";

export function usePollTimer(startedAt: string, duration: number) {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const start = new Date(startedAt).getTime();

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const left = Math.max(duration - elapsed, 0);
      setRemaining(left);
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt, duration]);

  return remaining;
}

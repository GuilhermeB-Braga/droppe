"use client";

import { useState, useEffect, useRef } from "react";

export default function useTimer(
  initialDate: Date | string,
  minutesTime = 15,
  onExpire?: () => unknown,
) {
  const [remainingTime, setRemainingTime] = useState(0);
  const [notified, setNotified] = useState(false);

  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const startTime =
    initialDate instanceof Date
      ? initialDate.getTime()
      : new Date(initialDate).getTime();

  useEffect(() => {
    if (!startTime || isNaN(startTime)) return;

    const targetDate =
      new Date(initialDate).getTime() + minutesTime * 60 * 1000;

    const calculate = () => {
      const now = Date.now();
      const diff = targetDate - now;
      const newRemainingTime = Math.max(0, diff);

      setRemainingTime(newRemainingTime);

      if (newRemainingTime <= 0 && !notified) {
        setNotified(true);
        onExpireRef.current?.();
      }
    };

    calculate();
    const intervalId = setInterval(calculate, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, notified, minutesTime, initialDate]);

  const minutes = Math.floor((remainingTime / 60000) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  return {
    minutes,
    seconds,
    text: `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
    finished: remainingTime === 0,
    loading: remainingTime === null,
  };
}

'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date('2026-06-11').getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="border-2 border-amber-400 rounded px-6 py-4 min-w-20 text-center">
        <div className="text-3xl font-light text-amber-400">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="text-xs text-white/50 mt-3 tracking-widest uppercase">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full py-16 px-4 relative overflow-hidden">
      {/* Decorative flowers */}
      <svg className="absolute top-12 left-10 w-20 h-20 opacity-20 animate-pulse" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="20" r="12" fill="#ffd700" />
        <circle cx="80" cy="30" r="12" fill="#ffd700" />
        <circle cx="85" cy="60" r="12" fill="#ffd700" />
        <circle cx="50" cy="80" r="12" fill="#ffd700" />
        <circle cx="20" cy="70" r="12" fill="#ffd700" />
        <circle cx="15" cy="40" r="12" fill="#ffd700" />
        <circle cx="50" cy="50" r="8" fill="#ffffff" />
      </svg>

      <svg className="absolute bottom-12 right-10 w-24 h-24 opacity-15 animate-pulse" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="20" r="12" fill="#ffd700" />
        <circle cx="80" cy="30" r="12" fill="#ffd700" />
        <circle cx="85" cy="60" r="12" fill="#ffd700" />
        <circle cx="50" cy="80" r="12" fill="#ffd700" />
        <circle cx="20" cy="70" r="12" fill="#ffd700" />
        <circle cx="15" cy="40" r="12" fill="#ffd700" />
        <circle cx="50" cy="50" r="8" fill="#ffffff" />
      </svg>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex justify-center items-center gap-4 mb-12">
          <TimeUnit value={timeLeft.days} label="Days" />
          <div className="text-3xl text-amber-400 font-light">:</div>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <div className="text-3xl text-amber-400 font-light">:</div>
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <div className="text-3xl text-amber-400 font-light">:</div>
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
        <p className="text-center text-white/60 text-sm tracking-widest uppercase">
          UNTIL THE BIG DAY
        </p>
      </div>
    </div>
  );
}

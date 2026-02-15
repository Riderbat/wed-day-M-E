'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // Format: '2026-06-20'
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-center py-8 md:py-12">
      <div className="text-xl md:text-2xl font-light mb-6 md:mb-8">Осталось</div>
      <div className="flex justify-center gap-2 md:gap-4 lg:gap-8 mb-4 flex-wrap">
        <div className="text-center min-w-[60px] md:min-w-[80px]">
          <div className="text-3xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2">
            {String(timeLeft.days).padStart(3, '0')}
          </div>
          <div className="text-base md:text-sm lg:text-base opacity-70">дни</div>
        </div>
        <div className="text-center min-w-[60px] md:min-w-[80px]">
          <div className="text-3xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-base md:text-sm lg:text-base opacity-70">часы</div>
        </div>
        <div className="text-center min-w-[60px] md:min-w-[80px]">
          <div className="text-3xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-base md:text-sm lg:text-base opacity-70">минуты</div>
        </div>
        <div className="text-center min-w-[60px] md:min-w-[80px]">
          <div className="text-3xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-base md:text-sm lg:text-base opacity-70">секунды</div>
        </div>
      </div>
    </div>
  );
}

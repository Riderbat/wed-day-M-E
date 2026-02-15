"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * Delay in ms before starting the animation once visible
   */
  delayMs?: number;
  /**
   * How much of the element should be visible to trigger (0..1)
   */
  threshold?: number;
  /**
   * Animate only once (true) or toggle on enter/leave (false)
   */
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delayMs = 0,
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            const timer = setTimeout(() => setIsVisible(true), delayMs);
            if (!once) {
              // If toggling, also clear when leaving later
              (element as any)._revealTimer = timer;
            }
          } else {
            setIsVisible(true);
          }
          if (once) observer.unobserve(element);
        } else if (!once) {
          // Toggle off when leaving viewport
          if ((element as any)._revealTimer) {
            clearTimeout((element as any)._revealTimer);
          }
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => {
      if ((element as any)._revealTimer) {
        clearTimeout((element as any)._revealTimer);
      }
      observer.disconnect();
    };
  }, [delayMs, once, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        // Start hidden and moved down
        "opacity-0 translate-y-6 transition-all duration-700 ease-out will-change-transform will-change-opacity",
        // When visible, fade in and slide up
        isVisible && "opacity-100 translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Reveal;

 
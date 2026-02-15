'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MusicPlayerProps {
  src: string;
  showText?: boolean;
  className?: string;
}

export default function MusicPlayer({ src, showText = false, className = '' }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';

    const tryPlay = () => {
      if (hasStartedRef.current || !audio.paused) return;
      hasStartedRef.current = true;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            hasStartedRef.current = false;
          });
      }
    };

    // Пробуем запустить при загрузке (работает не во всех браузерах из-за политики autoplay)
    const t = setTimeout(tryPlay, 100);

    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true });
    document.addEventListener('keydown', tryPlay, { once: true });

    return () => {
      clearTimeout(t);
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('keydown', tryPlay);
      if (!hasStartedRef.current) audio.pause();
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasInteracted) {
      // Первое взаимодействие - начинаем воспроизведение
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
            audio.muted = false;
            setIsMuted(false);
          })
          .catch((error) => {
            console.log('Ошибка воспроизведения:', error);
          });
      }
    } else {
      // Переключение mute/unmute
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <div className={`flex flex-col sm:flex-row items-center justify-center flex-wrap gap-3 w-full ${className}`}>
        {showText && (
          <p className="text-base sm:text-sm md:text-base text-black text-center mb-2 sm:mb-0 w-full sm:w-auto sm:max-w-md px-2 sm:px-0 break-words hyphens-auto overflow-hidden">
            Если музыка вам мешает, вы можете её отключить с помощью кнопки
          </p>
        )}
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="icon"
          className="bg-stone-100 hover:bg-stone-200 rounded-full w-10 h-10 md:w-12 md:h-12 touch-manipulation flex-shrink-0"
          aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-stone-700" />
          ) : (
            <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-stone-700" />
          )}
        </Button>
      </div>
    </>
  );
}



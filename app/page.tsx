'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import MusicPlayer from '@/components/MusicPlayer';
import CountdownTimer from '@/components/CountdownTimer';
import Reveal from '@/components/Reveal';
import QrRedirectPage from '@/components/QrRedirectPage';
import PageLoader from '@/components/PageLoader';

const MOBILE_PORTRAIT_MAX_WIDTH = 768;

/** Все картинки сайта — подгружаются до показа контента */
const PRELOAD_IMAGES = [
  '/dog.png',
  '/wend_1.jpg',
  '/wend_2.jpg',
  '/wend_3.jpg',
  '/wend_4.jpg',
  '/wend_5.jpg',
  '/wend_6.jpg',
  '/bac_1.jpg',
  '/flowers.png',
  '/location.jpg',
  '/1.png',
  '/2.png',
  '/3.png',
  '/4.png',
  '/5.png',
  '/6.png',
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src.startsWith('/') ? `${window.location.origin}${src}` : src;
  });
}

function getIsMobilePortrait(): boolean {
  if (typeof window === 'undefined') return false;
  const portrait = window.matchMedia('(orientation: portrait)').matches;
  const narrow = window.innerWidth <= MOBILE_PORTRAIT_MAX_WIDTH;
  return narrow && portrait;
}

export default function WeddingInvitation() {
  const [mounted, setMounted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobilePortrait(getIsMobilePortrait());
    const onResize = () => setIsMobilePortrait(getIsMobilePortrait());
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onLoad = () => setPageLoaded(true);
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  // Сначала подгружаем все картинки, потом показываем контент
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    Promise.all(PRELOAD_IMAGES.map(preloadImage)).then(() => setImagesPreloaded(true));
  }, [mounted]);

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    attendance: '',
    transfer: '',
    drinks: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const [flowerVisible, setFlowerVisible] = useState(true);
  const [flowerExiting, setFlowerExiting] = useState(false);
  const [flowerExitStyleApplied, setFlowerExitStyleApplied] = useState(false);

  const handleFlowerClick = () => {
    if (flowerExiting) return;
    setFlowerExiting(true);
  };

  // Применяем стиль исчезновения на следующем кадре, чтобы transition успел запуститься
  useEffect(() => {
    if (!flowerExiting) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlowerExitStyleApplied(true);
      });
    });
    return () => cancelAnimationFrame(id);
  }, [flowerExiting]);

  const handleFlowerTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName === 'transform' && flowerExitStyleApplied) {
      setFlowerVisible(false);
    }
  };

  // Блокировка скролла до клика по цветку
  useEffect(() => {
    document.body.style.overflow = flowerVisible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [flowerVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/send-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitStatus('error');
        setSubmitError(data.error || 'Не удалось отправить. Попробуйте позже.');
        return;
      }
      setSubmitStatus('success');
      setFormData({ lastName: '', firstName: '', attendance: '', transfer: '', drinks: [] });
    } catch {
      setSubmitStatus('error');
      setSubmitError('Ошибка сети. Проверьте интернет и попробуйте снова.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDrinkChange = (drink: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        drinks: [...formData.drinks, drink],
      });
    } else {
      setFormData({
        ...formData,
        drinks: formData.drinks.filter((d) => d !== drink),
      });
    }
  };

  if (!mounted || !pageLoaded || !imagesPreloaded) {
    return <PageLoader />;
  }
  if (!isMobilePortrait) {
    return <QrRedirectPage />;
  }

  return (
    <div className={`min-h-screen bg-white ${flowerVisible ? 'overflow-hidden h-screen' : ''}`}>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <Image src="/wend_1.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-7xl sm:text-5xl md:text-7xl font-light mb-3 md:mb-4 font-rightism">
            Егор
          </h1>
          <div className="text-3xl sm:text-3xl md:text-4xl font-light mb-3 md:mb-4">и</div>
          <h1 className="text-7xl sm:text-5xl md:text-7xl font-light mb-6 md:mb-8 font-rightism">
            Мария
          </h1>
          <div className="text-2xl sm:text-2xl md:text-3xl font-light mb-8 md:mb-12">
            20.06.2026
          </div>
          <div className="min-h-[1.5em] text-base sm:text-lg md:text-xl">
            <span
              className={
                flowerVisible
                  ? 'invisible'
                  : 'opacity-80 animate-bounce inline-block'
              }
            >
              Листайте вниз
            </span>
          </div>
        </div>

        {/* Цветок: появляется по центру при загрузке, по клику крутится и исчезает */}
        {flowerVisible && (
          <button
            type="button"
            className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer select-none w-full h-full border-0 bg-transparent p-0"
            onClick={handleFlowerClick}
            aria-label="Нажмите, чтобы открыть приглашение"
          >
            {/* Обёртка только сдвигает блок вверх — и до, и после клика одна и та же высота */}
            <div className="-translate-y-14 flex items-center justify-center">
              <div
                className={`relative w-[28rem] h-[28rem] sm:w-[32rem] sm:h-[32rem] md:w-[42rem] md:h-[42rem] flower-exit ${flowerExiting ? '' : 'animate-flower-appear'
                  }`}
                style={
                  flowerExitStyleApplied
                    ? {
                      transform: 'rotate(720deg) scale(0)',
                      opacity: 0,
                    }
                    : undefined
                }
                onTransitionEnd={handleFlowerTransitionEnd}
              >
                <Image
                  src="/flowers.png"
                  alt=""
                  fill
                  className="object-contain pointer-events-none"
                  sizes="(max-width: 640px) 448px, (max-width: 768px) 512px, 672px"
                  priority
                />
              </div>
            </div>
          </button>
        )}
      </section>

      {/* Music Player Section */}
      {/* <section className="py-6 sm:py-8 px-4 sm:px-6 bg-white border-b border-stone-200 overflow-hidden">
        <div className="max-w-2xl mx-auto w-full">
          <MusicPlayer src="/Basta.mp3" showText={true} />
        </div>
      </section> */}

      {/* Invitation Text */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden min-h-[400px]">
        <Image src="/bac_1.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="relative z-10 text-center text-stone-800">
          <Reveal><div className="py-6 max-w-2xl mx-auto w-full">
            <MusicPlayer src="/Basta.mp3" showText={true} />
          </div></Reveal>
          <Reveal delayMs={80}><h2 className="text-5xl sm:text-8xl md:text-[10rem] font-rightism text-stone-800 mb-3 sm:mb-4">
            Дорогие родные<br />и близкие!
          </h2></Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <Reveal delayMs={120}><p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6">
              Приглашаем Вас разделить<br />
              с нами радость особенного<br />
              для нас события и стать частью<br />
              нашей семейной истории!
            </p></Reveal>
            <Reveal delayMs={160}><p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6">
              Совсем скоро состоится наша<br />
              <strong>СВАДЬБА!</strong><br />
              И мы не представляем этот<br />
              праздник без Вас, близких и<br />
              дорогих нам людей.
            </p></Reveal>
          </div>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-0 px-0">
        <div className="w-full">
          <div className="relative aspect-[4/3] sm:aspect-[3/2] overflow-hidden">
            <Image
              src="/wend_2.jpg"
              alt="Егор и Мария"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden min-h-[400px]">
        <Image src="/bac_1.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal><div className="relative inline-block rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-xl overflow-hidden bg-white/95 backdrop-blur-sm shadow-xl">
            <div className="relative z-10">
              <div className="text-7xl sm:text-8xl md:text-[10rem] font-rightism text-stone-800 mb-3 sm:mb-4">Дата</div>
              <div className="text-3xl sm:text-4xl font-light italic mb-3 sm:mb-4 text-stone-800">Июнь</div>
              <div className="grid grid-cols-7 gap-0 text-center text-stone-800 mb-3 sm:mb-4">
                <div className="p-0 text-stone-700 font-medium text-base sm:text-lg">ПН</div>
                <div className="p-0 text-stone-700 font-medium text-base sm:text-lg">ВТ</div>
                <div className="p-0 text-stone-700 font-medium text-base sm:text-lg">СР</div>
                <div className="p-0 text-stone-700 font-medium text-base sm:text-lg">ЧТ</div>
                <div className="p-0 text-stone-700 font-medium text-base sm:text-lg">ПТ</div>
                <div className="p-0 text-stone-700 font-medium text-base sm:text-lg">СБ</div>
                <div className="p-0 text-stone-700 font-medium text-base sm:text-lg">ВС</div>

                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">1</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">2</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">3</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">4</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">5</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">6</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">7</div>

                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">8</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">9</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">10</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">11</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">12</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">13</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">14</div>

                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">15</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">16</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">17</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">18</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">19</div>
                <div className="relative p-0">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8">
                      <Image src="/flowers.png" alt="" fill className="object-contain" sizes="32px" />
                    </div>
                  </div>
                  <div className="text-white text-stone-800 font-bold relative z-10 text-base sm:text-lg md:text-xl">20</div>
                </div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">21</div>

                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">22</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">23</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">24</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">25</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">26</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">27</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">28</div>

                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">29</div>
                <div className="p-0 text-stone-600 text-base sm:text-lg md:text-xl">30</div>
              </div>
            </div>
          </div></Reveal>
          <Reveal delayMs={100}><div className="py-12 relative z-10 max-w-2xl mx-auto text-center">
            <Reveal delayMs={0}><h2 className="text-7xl sm:text-7xl md:text-9xl font-rightism text-center text-stone-800 mb-3 sm:mb-4">Welcome</h2></Reveal>
            <Reveal delayMs={60}><div className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8">
              20 ИЮНЯ 2026
            </div></Reveal>
            <Reveal delayMs={100}><div className="text-xl sm:text-2xl md:text-3xl font-light ">Сбор гостей в 16:00</div></Reveal>
            <Reveal delayMs={140}><div className="py-2 text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-4">
              Наш праздник пройдет в парк-отеле
            </div></Reveal>
            <Reveal delayMs={180}><div className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6">
              "ЦИТАДЕЛЬ"
            </div></Reveal>
            <Reveal delayMs={220}><div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative w-full max-w-[300px] sm:max-w-[360px] aspect-video rounded-lg overflow-hidden shadow-md">
                <Image src="/location.jpg" alt="Локация" fill className="object-cover" sizes="260px" />
              </div>
            </div></Reveal>
            <Reveal delayMs={260}><div className="text-lg sm:text-xl font-light mb-3 sm:mb-4">Локация</div></Reveal>
            <Reveal delayMs={300}>
              <Button
                variant="default"
                className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 touch-manipulation"
                onClick={() => window.open('https://yandex.ru/maps/-/CPQv4Ii2', '_blank')}
              >
                СМОТРЕТЬ АДРЕС НА КАРТЕ <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
            </Reveal>
          </div></Reveal>

        </div>
      </section>

      {/* Photo Section */}
      <section className="py-0 px-0">
        <div className="w-full">
          <div className="relative aspect-[4/6] sm:aspect-[3/3] overflow-hidden">
            <Image
              src="/wend_3.jpg"
              alt="Егор и Мария"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden min-h-[400px]">
        <Image src="/bac_1.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Reveal><h2 className="text-7xl sm:text-7xl md:text-9xl font-rightism text-center text-black mb-3 sm:mb-4">Dress code</h2></Reveal>
          <Reveal delayMs={80}><div className="text-center mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-black px-2">
              {/* Нам будет приятно,<br />
              если Вы поддержите стиль<br />
              торжества в своих нарядах. */}
              Мы готовим этот день с большой любовью и вниманием к деталям.<br />
              Оттенки оранжевого и голубого станут основой атмосферы нашей свадьбы — тёплой, лёгкой и радостной.<br />
            </p>
          </div></Reveal>

          <Reveal delayMs={120}><div className="text-center mb-6 sm:mb-8">
            <p className="text-base sm:text-base text-black mb-4 sm:mb-6 px-2">
              {/* Для Вашего удобства мы<br />
              подготовили примеры образов, отображающие стиль торжества */}
              Будем благодарны, если вы поддержите выбранный стиль, но самое главное — приходите такими, какими вам комфортно быть с нами <span className="emoji">🌸</span><br />
            </p>
          </div></Reveal>

          <Reveal delayMs={160}><div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-light text-center mb-3 sm:mb-4">Образы для мужчин</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image src="/1.png" alt="Образ для девушки" fill className="object-contain" sizes="(max-width: 768px) 33vw, 200px" />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image src="/2.png" alt="Образ для девушки" fill className="object-contain" sizes="(max-width: 768px) 33vw, 200px" />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image src="/3.png" alt="Образ для девушки" fill className="object-contain" sizes="(max-width: 768px) 33vw, 200px" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-light text-center mb-3 sm:mb-4">Образы для девушек</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image src="/4.png" alt="Образ для мужчины" fill className="object-contain" sizes="(max-width: 768px) 33vw, 200px" />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image src="/5.png" alt="Образ для мужчины" fill className="object-contain" sizes="(max-width: 768px) 33vw, 200px" />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image src="/6.png" alt="Образ для мужчины" fill className="object-contain" sizes="(max-width: 768px) 33vw, 200px" />
                </div>
              </div>
            </div>
          </div></Reveal>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-0 px-0">
        <div className="w-full">
          <div className="relative aspect-[3/5] sm:aspect-[3/3] overflow-hidden">
            <Image
              src="/wend_5.jpg"
              alt="Егор и Мария"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Photo and Video Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden min-h-[320px]">
        <Image src="/bac_1.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <Reveal><div className="max-w-2xl mx-auto text-center">
            <h2 className="text-6xl sm:text-7xl md:text-9xl font-rightism text-center text-black mt-10 mb-3 sm:mb-4">Подарки и цветы</h2>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 px-2">
              Самый главный подарок для нас — ваше присутствие в этот день <span className="emoji">🤍</span> <br />
              Если вы захотите порадовать нас дополнительно, будем благодарны за подарок в конверте.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed px-2">
              А вместо цветов — которые, к сожалению, быстро вянут —
              вы можете оформить для нас цветочную подписку по ссылке ниже <br />
              или подарить бутылочку вашего любимого алкоголя, который станет частью наших будущих теплых вечеров<span className="emoji">✨</span>

            </p>
            <Reveal delayMs={220}>
              <Button
                variant="default"
                className="mt-7 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 touch-manipulation"
                onClick={() => window.open('https://tbank.ru/cf/1MSxrMjxqDs', '_blank')}
              >
                Оформить подписку <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
            </Reveal>
          </div></Reveal>
          <Reveal delayMs={100}><h2 className="text-6xl sm:text-7xl md:text-9xl font-rightism text-center text-black mt-10 mb-3 sm:mb-4">Фото и видео</h2></Reveal>
          <Reveal delayMs={140}><p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 px-2">
            Мы сделали общий телеграм-чат <span className="emoji">💫</span><br />
            Там можно не стесняться и предлагать идеи (серьёзные, смешные и внезапные — всё принимается), <br />
            объединяться для подарков, а после праздника делиться фото и видео.<br />
            Заходите, шум разрешён — по делу <span className="emoji">😌</span><br />

          </p></Reveal>

          <Reveal delayMs={220}>
            <Button
              variant="default"
              className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 touch-manipulation"
              onClick={() => window.open('https://t.me/+WdNwqiNob342MWJi', '_blank')}
            >
              Вступить <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-0 px-0">
        <div className="w-full">
          <div className="relative aspect-[4/5] sm:aspect-[3/3] overflow-hidden">
            <Image
              src="/wend_4.jpg"
              alt="Егор и Мария"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      {/* <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-6 sm:mb-8">До свадьбы</h2>
          <CountdownTimer targetDate="2026-06-20" />
        </div>
      </section> */}

      {/* RSVP Form Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden min-h-[500px]">
        <Image src="/bac_1.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal><div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-3 sm:mb-4">АНКЕТА ГОСТЯ</h2>
            <p className="text-base sm:text-lg mb-2 px-2">
              Подтвердите, пожалуйста,<br />
              своё присутствие
            </p>
            <p className="text-sm sm:text-base text-stone-600 mb-6 sm:mb-8">
              до 01.05.2026
            </p>
          </div></Reveal>

          <Reveal delayMs={100}><Card className="bg-white shadow-lg">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="lastName" className="text-stone-700 font-medium mb-1 sm:mb-2 block text-sm sm:text-base">
                    Напишите пожалуйста Ваши ФИО:
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="ФИО"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="border-stone-300 focus:border-stone-500 text-base sm:text-lg py-2 sm:py-3"
                  />
                </div>

                <div>
                  <Label className="text-stone-700 font-medium mb-1 sm:mb-2 block text-sm sm:text-base">
                    Сможете ли вы присутствовать на нашем торжестве ?
                  </Label>
                  <RadioGroup
                    value={formData.attendance}
                    onValueChange={(value) => setFormData({ ...formData, attendance: value })}
                  >
                    <div className="flex items-start space-x-2 mb-2">
                      <RadioGroupItem value="yes" id="attendance-yes" className="mt-1" />
                      <Label htmlFor="attendance-yes" className="text-stone-600 cursor-pointer text-sm sm:text-base leading-tight">
                        Да
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="no" id="attendance-no" className="mt-1" />
                      <Label htmlFor="attendance-no" className="text-stone-600 cursor-pointer text-sm sm:text-base leading-tight">
                        Нет
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="firstName" className="text-stone-700 font-medium mb-1 sm:mb-2 block text-sm sm:text-base">
                    В каком составе Вас ждать?
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Напишите ФИО всех гостей"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="border-stone-300 focus:border-stone-500 text-base sm:text-lg py-2 sm:py-3"
                  />
                </div>



                <div>
                  <Label className="text-stone-700 font-medium mb-1 sm:mb-2 block text-sm sm:text-base">
                    Что предпочитаете из напитков?
                  </Label>
                  <div className="space-y-2">
                    {['Вино', 'Шампанское', 'Водка', 'Виски', 'Коньяк', 'Настойка', 'Безалкогольный напиток'].map((drink) => (
                      <div key={drink} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={drink}
                          checked={formData.drinks.includes(drink)}
                          onChange={(e) => handleDrinkChange(drink, e.target.checked)}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-primary border-stone-300 rounded focus:ring-primary touch-manipulation"
                        />
                        <Label htmlFor={drink} className="text-stone-600 cursor-pointer text-sm sm:text-base">
                          {drink}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-stone-700 font-medium mb-1 sm:mb-2 block text-sm sm:text-base">
                    Нужен ли Вам трансфер?
                  </Label>
                  <RadioGroup
                    value={formData.transfer}
                    onValueChange={(value) => setFormData({ ...formData, transfer: value })}
                  >
                    <div className="flex items-start space-x-2 mb-2">
                      <RadioGroupItem value="yes" id="transfer-yes" className="mt-1" />
                      <Label htmlFor="transfer-yes" className="text-stone-600 cursor-pointer text-sm sm:text-base leading-tight">
                        Да
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="no" id="transfer-no" className="mt-1" />
                      <Label htmlFor="transfer-no" className="text-stone-600 cursor-pointer text-sm sm:text-base leading-tight">
                        Нет
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {submitStatus === 'success' && (
                  <p className="text-green-600 text-sm sm:text-base text-center py-2">
                    Спасибо за ваш ответ! Мы получили вашу анкету.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm sm:text-base text-center py-2">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="default"
                  disabled={submitting}
                  className="w-full py-3 sm:py-4 text-base sm:text-lg touch-manipulation"
                >
                  {submitting ? 'Отправка…' : 'Подтвердить'}
                </Button>
              </form>
            </CardContent>
          </Card></Reveal>


          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <Reveal><div className="max-w-2xl mx-auto">
              <h2 className="text-6xl sm:text-7xl md:text-9xl font-rightism text-center text-black mt-10 mb-3 sm:mb-4">До свадьбы</h2>
              <CountdownTimer targetDate="2026-06-20" />
            </div></Reveal>
          </div>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-0 px-0">
        <div className="w-full">
          <div className="relative aspect-[4/5] sm:aspect-[3/3] overflow-hidden">
            <Image
              src="/wend_6.jpg"
              alt="Егор и Мария"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden min-h-[500px]">
        <Image src="/bac_1.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="text-center relative z-10 max-w-2xl mx-auto">
          <Reveal delayMs={80}><h2 className="text-6xl sm:text-7xl md:text-9xl font-rightism text-center text-black mt-10 mb-3 sm:mb-4">Детали</h2></Reveal>
          <Reveal delayMs={120}><div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-3 sm:mb-4">Организатор</h3>
            <p className="text-base sm:text-lg md:text-xl mb-2 px-2">
              По всем вопросам в день мероприятия<br />
              обращайтесь к нашему организатору:
            </p>
            <div className="text-xl sm:text-xl md:text-2xl font-light mb-2">
              Полина
            </div>
            <a href="tel:+79997807509" className="text-base sm:text-lg md:text-xl hover:underline touch-manipulation">
              +7 (999) 780-75-09
            </a>
            <p className="text-base sm:text-lg mt-8 md:text-xl mb-2 px-2">
              Или если хотите просто поболтать:
            </p>
            <div className="text-xl sm:text-xl md:text-2xl font-light mb-2">
              Егор
            </div>
            <a href="tel:+79105895380" className="text-base sm:text-lg md:text-xl hover:underline touch-manipulation">
              +7 (910) 589-53-80
            </a>
            <div className="text-xl sm:text-xl md:text-2xl font-light mb-2">
              Мария
            </div>
            <a href="tel:+79534248085" className="text-base sm:text-lg md:text-xl hover:underline touch-manipulation">
              +7 (953) 424-80-85
            </a>
          </div>
          </Reveal>
          <footer className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden min-h-[180px]">
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <Reveal><div className="text-xl sm:text-2xl md:text-3xl font-light mb-3 sm:mb-4">
                Искренне Ваши,<br />
                Егор и Мария
              </div></Reveal>
              <Reveal delayMs={80}><div className="text-lg sm:text-xl md:text-2xl font-light">
                Ждём Вас!
              </div></Reveal>
            </div>
          </footer>
        </div>
      </section >


      {/* Organizer Section */}
      {/* <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden min-h-[260px]">
        <Image src="/bac_1.jpg" alt="" fill className="object-cover" sizes="100vw" />

      </section> */}



      {/* Footer */}

    </div >
  );
}

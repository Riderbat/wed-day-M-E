'use client';

import React, { useState, useEffect } from 'react';

export default function QrRedirectPage() {
  const [inviteUrl, setInviteUrl] = useState('');

  useEffect(() => {
    setInviteUrl(typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '');
  }, []);

  const qrSrc = inviteUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inviteUrl)}`
    : '';

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-black text-sm sm:text-base font-normal mb-4 max-w-md" style={{ fontFamily: 'var(--font-trixiepro), Lora, serif' }}>
        Данная страница отображается только на смартфонах в вертикальной ориентации
      </p>
      <h1 className="text-black text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-wide mb-4" style={{ fontFamily: 'var(--font-trixiepro), Lora, serif' }}>
        ДЛЯ ПРОСМОТРА ПРИГЛАШЕНИЯ
      </h1>
      <p className="text-black text-base sm:text-lg font-normal mb-8 max-w-sm" style={{ fontFamily: 'var(--font-trixiepro), Lora, serif' }}>
        отсканируйте QR-код при помощи камеры Вашего телефона
      </p>
      {qrSrc ? (
        <img
          src={qrSrc}
          alt="QR-код для перехода на приглашение"
          width={200}
          height={200}
          className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]"
        />
      ) : (
        <div className="w-[200px] h-[200px] bg-stone-100 animate-pulse rounded" aria-hidden />
      )}
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <Image
        src="/dog.png"
        alt="Загрузка"
        width={160}
        height={160}
        className="animate-spin"
      />
    </div>
  );
}

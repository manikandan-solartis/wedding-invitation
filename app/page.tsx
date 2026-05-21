'use client';

import { useState } from 'react';
import Cover from '@/components/Cover';
import Invitation from '@/components/Invitation';

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      {!isOpened ? (
        <Cover onOpen={() => setIsOpened(true)} />
      ) : (
        <Invitation />
      )}
    </main>
  );
}

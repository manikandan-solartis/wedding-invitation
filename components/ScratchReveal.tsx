'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw scratch surface
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let i = 0; i < canvas.width; i += 2) {
      ctx.fillRect(i, 0, 1, canvas.height);
    }

    let isDrawing = false;

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

      const rect = canvas.getBoundingClientRect();
      let x, y;

      if (e instanceof TouchEvent) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }

      ctx.clearRect(x - 15, y - 15, 30, 30);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleMouseDown = () => {
      isDrawing = true;
    };

    const handleMouseUp = () => {
      isDrawing = false;
      checkRevealed();
    };

    const handleTouchStart = () => {
      isDrawing = true;
    };

    const handleTouchEnd = () => {
      isDrawing = false;
      checkRevealed();
    };

    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);

    const checkRevealed = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparentPixels = 0;

      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 128) transparentPixels++;
      }

      if (transparentPixels / (data.length / 4) > 0.5) {
        setIsRevealed(true);
      }
    };

    return () => {
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-light text-center text-white mb-4">Reveal</h2>
        <p className="text-center text-white/60 mb-8">Scratch to discover the date</p>

        <div className="flex justify-center gap-8 mb-12">
          <div className="relative w-32 h-32">
            <canvas
              ref={canvasRef}
              className="w-32 h-32 rounded-full cursor-pointer shadow-lg absolute inset-0"
              style={{ touchAction: 'none' }}
            />
            <div className="w-32 h-32 rounded-full bg-white/5 border-4 border-white/20 flex items-center justify-center absolute inset-0">
              <svg className="w-12 h-12 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="text-white/40">1</div>
            <div className="text-white/40">1</div>
            <div className="text-white/40">.</div>
            <div className="text-white/40">0</div>
            <div className="text-white/40">6</div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="text-white/40">.</div>
            <div className="text-white/40">2</div>
            <div className="text-white/40">0</div>
            <div className="text-white/40">2</div>
            <div className="text-white/40">6</div>
          </div>
        </div>

        {isRevealed && (
          <div className="text-center animate-fade-in">
            <p className="text-3xl font-light text-amber-400">11.06.2026</p>
          </div>
        )}
      </div>
    </div>
  );
}

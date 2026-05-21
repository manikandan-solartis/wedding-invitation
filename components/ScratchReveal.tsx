'use client';

import { useEffect, useRef, useState } from 'react';

const CANVAS_SIZE = 128;

export default function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas size explicitly
    canvas.width = CANVAS_SIZE * 2;
    canvas.height = CANVAS_SIZE * 2;

    // Draw scratch surface
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let i = 0; i < canvas.width; i += 4) {
      ctx.fillRect(i, 0, 2, canvas.height);
    }

    let isDrawing = false;

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true;
      scratch(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing) {
        scratch(e);
      }
    };

    const handleMouseUp = () => {
      isDrawing = false;
      checkRevealed();
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDrawing = true;
      scratch(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDrawing) {
        e.preventDefault();
        scratch(e);
      }
    };

    const handleTouchEnd = () => {
      isDrawing = false;
      checkRevealed();
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let x, y;

      if (e instanceof TouchEvent) {
        x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
        y = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
      } else {
        x = (e.clientX - rect.left) * (canvas.width / rect.width);
        y = (e.clientY - rect.top) * (canvas.height / rect.height);
      }

      // Clear the canvas at the scratched location
      ctx.clearRect(x - 20, y - 20, 40, 40);
    };

    const checkRevealed = () => {
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let transparentPixels = 0;

        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 128) transparentPixels++;
        }

        const revealPercentage = transparentPixels / (data.length / 4);
        if (revealPercentage > 0.4) {
          setIsRevealed(true);
        }
      } catch (e) {
        console.error('Error checking revealed:', e);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

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
        <h2 className="text-4xl font-light text-center text-white mb-4">Reveal</h2>
        <p className="text-center text-white/60 mb-8">Scratch to discover the date</p>

        <div className="flex justify-center items-center gap-8 mb-12">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute w-32 h-32 rounded-full bg-white/5 border-4 border-white/20 flex items-center justify-center pointer-events-none">
              <svg className="w-12 h-12 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <canvas
              ref={canvasRef}
              className="w-32 h-32 rounded-full cursor-pointer shadow-lg"
              style={{ touchAction: 'none', display: 'block' }}
            />
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="text-white/40 text-sm">1</div>
            <div className="text-white/40 text-sm">1</div>
            <div className="text-white/40 text-sm">.</div>
            <div className="text-white/40 text-sm">0</div>
            <div className="text-white/40 text-sm">6</div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="text-white/40 text-sm">.</div>
            <div className="text-white/40 text-sm">2</div>
            <div className="text-white/40 text-sm">0</div>
            <div className="text-white/40 text-sm">2</div>
            <div className="text-white/40 text-sm">6</div>
          </div>
        </div>

        {isRevealed && (
          <div className="text-center animate-fade-in">
            <p className="text-3xl font-light text-amber-400">11.06.2026</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

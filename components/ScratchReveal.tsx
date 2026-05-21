'use client';

import { useEffect, useRef, useState } from 'react';

const CANVAS_SIZE = 100;

interface ScratchCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  value: string;
  label: string;
  onRevealed?: (revealed: boolean) => void;
}

const ScratchCanvas = ({ canvasRef, value, label, onRevealed }: ScratchCanvasProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = CANVAS_SIZE * 2;
    canvas.height = CANVAS_SIZE * 2;

    // Draw scratch surface with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#d4af37');
    gradient.addColorStop(1, '#c9a227');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let i = 0; i < canvas.width; i += 4) {
      ctx.fillRect(i, 0, 2, canvas.height);
    }

    let isDrawing = false;

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true;
      scratch(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing) scratch(e);
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
          onRevealed?.(true);
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
  }, [onRevealed]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full bg-white/5 border-4 border-amber-400 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <p className="text-white/60 text-xs">{label}</p>
            <p className="text-white/40 text-2xl font-light">{value}</p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="w-28 h-28 rounded-full cursor-pointer shadow-lg absolute"
          style={{ touchAction: 'none', display: 'block' }}
        />
      </div>
    </div>
  );
};

export default function ScratchReveal() {
  const dayCanvasRef = useRef<HTMLCanvasElement>(null);
  const monthCanvasRef = useRef<HTMLCanvasElement>(null);
  const yearCanvasRef = useRef<HTMLCanvasElement>(null);

  const [dayRevealed, setDayRevealed] = useState(false);
  const [monthRevealed, setMonthRevealed] = useState(false);
  const [yearRevealed, setYearRevealed] = useState(false);

  return (
    <div className="w-full min-h-screen py-16 px-4 bg-gradient-to-b from-blue-900 to-blue-950 relative overflow-hidden">
      {/* Rose Flower Design - Top Left */}
      <svg className="absolute top-0 left-0 w-48 h-48 opacity-30" viewBox="0 0 200 200" fill="none">
        {/* Rose petals */}
        <circle cx="100" cy="60" r="15" fill="#dc143c" />
        <circle cx="130" cy="75" r="15" fill="#ff1744" />
        <circle cx="140" cy="110" r="15" fill="#c41c3b" />
        <circle cx="120" cy="140" r="15" fill="#dc143c" />
        <circle cx="80" cy="150" r="15" fill="#ff1744" />
        <circle cx="50" cy="130" r="15" fill="#c41c3b" />
        <circle cx="40" cy="90" r="15" fill="#dc143c" />
        <circle cx="60" cy="60" r="15" fill="#ff1744" />
        <circle cx="100" cy="100" r="12" fill="#ffd700" />
        {/* Leaves */}
        <path d="M 120 140 Q 140 130 150 150" stroke="#2d5016" strokeWidth="3" />
        <path d="M 50 130 Q 30 120 20 140" stroke="#2d5016" strokeWidth="3" />
      </svg>

      {/* Rose Flower Design - Bottom Right */}
      <svg className="absolute bottom-0 right-0 w-56 h-56 opacity-25" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="60" r="15" fill="#ff69b4" />
        <circle cx="130" cy="75" r="15" fill="#ff1493" />
        <circle cx="140" cy="110" r="15" fill="#ff69b4" />
        <circle cx="120" cy="140" r="15" fill="#ff1493" />
        <circle cx="80" cy="150" r="15" fill="#ff69b4" />
        <circle cx="50" cy="130" r="15" fill="#ff1493" />
        <circle cx="40" cy="90" r="15" fill="#ff69b4" />
        <circle cx="60" cy="60" r="15" fill="#ff1493" />
        <circle cx="100" cy="100" r="12" fill="#ffd700" />
        <path d="M 120 140 Q 140 130 150 150" stroke="#2d5016" strokeWidth="3" />
        <path d="M 50 130 Q 30 120 20 140" stroke="#2d5016" strokeWidth="3" />
      </svg>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-light text-center text-white mb-2">Reveal</h2>
        <p className="text-center text-white/60 mb-12">Scratch each circle to discover the date</p>

        {/* Three Scratch Circles for Day, Month, Year */}
        <div className="flex justify-center items-center gap-8 mb-16 flex-wrap">
          <ScratchCanvas
            canvasRef={dayCanvasRef}
            value="11"
            label="DAY"
            onRevealed={setDayRevealed}
          />
          <div className="text-4xl text-amber-400 font-light">·</div>
          <ScratchCanvas
            canvasRef={monthCanvasRef}
            value="06"
            label="MONTH"
            onRevealed={setMonthRevealed}
          />
          <div className="text-4xl text-amber-400 font-light">·</div>
          <ScratchCanvas
            canvasRef={yearCanvasRef}
            value="2026"
            label="YEAR"
            onRevealed={setYearRevealed}
          />
        </div>

        {/* Show full date when all revealed */}
        {dayRevealed && monthRevealed && yearRevealed && (
          <div className="text-center animate-fade-in mb-8">
            <p className="text-4xl font-light text-amber-400 mb-2">11.06.2026</p>
            <p className="text-white/60 text-sm tracking-widest">SAVE THE DATE</p>
          </div>
        )}
      </div>
    </div>
  );
}

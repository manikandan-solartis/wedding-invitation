'use client';

import { useState } from 'react';
import ScratchReveal from './ScratchReveal';
import Countdown from './Countdown';
import Venue from './Venue';

export default function Invitation() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      id: 'intro',
      Component: () => (
        <div className="w-full h-screen flex flex-col items-center justify-center px-4 bg-white">
          <div className="text-center">
            <p className="text-sm tracking-widest text-blue-900/60 mb-4 uppercase">
              You are cordially invited to celebrate
            </p>
            <h1 className="text-5xl md:text-6xl font-light text-blue-900 mb-2">
              The Wedding of
            </h1>
            <div className="my-12">
              <h2 className="text-4xl md:text-5xl font-script text-amber-600 mb-6">
                C G Aarthy
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex-1 h-px bg-amber-400"></div>
                <span className="text-amber-400 font-light">&</span>
                <div className="flex-1 h-px bg-amber-400"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-script text-amber-600">
                T S Satheesh
              </h2>
            </div>
            <p className="text-white/70 text-sm">scroll down to explore</p>
          </div>
        </div>
      ),
    },
    {
      id: 'scratch',
      Component: () => (
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex flex-col items-center justify-center">
          <ScratchReveal />
        </div>
      ),
    },
    {
      id: 'countdown',
      Component: () => (
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 flex flex-col items-center justify-center">
          <Countdown />
        </div>
      ),
    },
    {
      id: 'venue',
      Component: () => (
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col items-center justify-center">
          <Venue />
        </div>
      ),
    },
  ];

  const Section = sections[currentSection]?.Component;

  return (
    <div className="w-full overflow-y-auto snap-y snap-mandatory h-screen" onWheel={(e) => {
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(currentSection - 1);
      }
    }}>
      <div className="snap-start">
        <Section />
      </div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSection
                ? 'bg-amber-400 scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

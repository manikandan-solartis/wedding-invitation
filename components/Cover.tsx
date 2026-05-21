interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps) {
  return (
    <div
      className="w-full h-full cursor-pointer flex items-center justify-center relative"
      onClick={onOpen}
      style={{
        background: 'linear-gradient(135deg, #0051cc 0%, #0066ff 100%)',
      }}
    >
      {/* Decorative ornaments - top corners */}
      <div className="absolute top-8 left-8 w-24 h-24 opacity-40">
        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1">
          <path d="M10,10 Q20,20 30,10 Q40,20 50,10 Q60,20 70,10 Q80,20 90,10" />
          <path d="M10,30 Q20,40 30,30 Q40,40 50,30 Q60,40 70,30 Q80,40 90,30" />
          <circle cx="20" cy="20" r="3" fill="white" />
          <circle cx="50" cy="20" r="3" fill="white" />
          <circle cx="80" cy="20" r="3" fill="white" />
        </svg>
      </div>

      {/* Top right ornament */}
      <div className="absolute top-8 right-8 w-24 h-24 opacity-40 scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1">
          <path d="M10,10 Q20,20 30,10 Q40,20 50,10 Q60,20 70,10 Q80,20 90,10" />
          <path d="M10,30 Q20,40 30,30 Q40,40 50,30 Q60,40 70,30 Q80,40 90,30" />
          <circle cx="20" cy="20" r="3" fill="white" />
          <circle cx="50" cy="20" r="3" fill="white" />
          <circle cx="80" cy="20" r="3" fill="white" />
        </svg>
      </div>

      {/* Bottom left ornament */}
      <div className="absolute bottom-8 left-8 w-24 h-24 opacity-40 scale-y-[-1]">
        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1">
          <path d="M10,10 Q20,20 30,10 Q40,20 50,10 Q60,20 70,10 Q80,20 90,10" />
          <path d="M10,30 Q20,40 30,30 Q40,40 50,30 Q60,40 70,30 Q80,40 90,30" />
          <circle cx="20" cy="20" r="3" fill="white" />
          <circle cx="50" cy="20" r="3" fill="white" />
          <circle cx="80" cy="20" r="3" fill="white" />
        </svg>
      </div>

      {/* Bottom right ornament */}
      <div className="absolute bottom-8 right-8 w-24 h-24 opacity-40 scale-[-1]">
        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1">
          <path d="M10,10 Q20,20 30,10 Q40,20 50,10 Q60,20 70,10 Q80,20 90,10" />
          <path d="M10,30 Q20,40 30,30 Q40,40 50,30 Q60,40 70,30 Q80,40 90,30" />
          <circle cx="20" cy="20" r="3" fill="white" />
          <circle cx="50" cy="20" r="3" fill="white" />
          <circle cx="80" cy="20" r="3" fill="white" />
        </svg>
      </div>

      {/* Center content */}
      <div className="text-center z-10">
        <div className="mb-8">
          <svg className="w-16 h-16 mx-auto text-white opacity-60 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
          </svg>
        </div>
        <h1 className="text-5xl font-light text-white mb-6 tracking-widest">
          YOU ARE
        </h1>
        <h2 className="text-5xl font-light text-white mb-6 tracking-wider">
          CORDIALLY INVITED
        </h2>
        <p className="text-xl text-white opacity-80 font-light tracking-widest">TAP TO OPEN</p>
      </div>
    </div>
  );
}

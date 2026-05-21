interface CoverProps {
  onOpen: () => void;
}

const Flower = ({ x, y, size = 40, delay = 0 }: { x: string; y: string; size?: number; delay?: number }) => (
  <svg
    className="absolute opacity-40 animate-pulse"
    style={{ left: x, top: y, animationDelay: `${delay}s` }}
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
  >
    {/* Petals */}
    <circle cx="50" cy="20" r="12" fill="#ffd700" opacity="0.8" />
    <circle cx="80" cy="30" r="12" fill="#ffd700" opacity="0.8" />
    <circle cx="85" cy="60" r="12" fill="#ffd700" opacity="0.8" />
    <circle cx="50" cy="80" r="12" fill="#ffd700" opacity="0.8" />
    <circle cx="20" cy="70" r="12" fill="#ffd700" opacity="0.8" />
    <circle cx="15" cy="40" r="12" fill="#ffd700" opacity="0.8" />
    {/* Center */}
    <circle cx="50" cy="50" r="8" fill="#ffffff" />
  </svg>
);

export default function Cover({ onOpen }: CoverProps) {
  return (
    <div
      className="w-full h-full cursor-pointer flex items-center justify-center relative overflow-hidden"
      onClick={onOpen}
      style={{
        background: 'linear-gradient(135deg, #0051cc 0%, #0066ff 100%)',
      }}
    >
      {/* Decorative Flowers */}
      <Flower x="5%" y="10%" size={50} delay={0} />
      <Flower x="90%" y="15%" size={45} delay={0.3} />
      <Flower x="8%" y="85%" size={48} delay={0.6} />
      <Flower x="88%" y="80%" size={52} delay={0.2} />
      <Flower x="15%" y="50%" size={40} delay={0.4} />
      <Flower x="85%" y="45%" size={42} delay={0.5} />

      {/* Decorative ornaments - top corners */}
      <div className="absolute top-8 left-8 w-24 h-24 opacity-30">
        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1">
          <path d="M10,10 Q20,20 30,10 Q40,20 50,10 Q60,20 70,10 Q80,20 90,10" />
          <path d="M10,30 Q20,40 30,30 Q40,40 50,30 Q60,40 70,30 Q80,40 90,30" />
          <circle cx="20" cy="20" r="3" fill="white" />
          <circle cx="50" cy="20" r="3" fill="white" />
          <circle cx="80" cy="20" r="3" fill="white" />
        </svg>
      </div>

      {/* Top right ornament */}
      <div className="absolute top-8 right-8 w-24 h-24 opacity-30 scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1">
          <path d="M10,10 Q20,20 30,10 Q40,20 50,10 Q60,20 70,10 Q80,20 90,10" />
          <path d="M10,30 Q20,40 30,30 Q40,40 50,30 Q60,40 70,30 Q80,40 90,30" />
          <circle cx="20" cy="20" r="3" fill="white" />
          <circle cx="50" cy="20" r="3" fill="white" />
          <circle cx="80" cy="20" r="3" fill="white" />
        </svg>
      </div>

      {/* Bottom left ornament */}
      <div className="absolute bottom-8 left-8 w-24 h-24 opacity-30 scale-y-[-1]">
        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1">
          <path d="M10,10 Q20,20 30,10 Q40,20 50,10 Q60,20 70,10 Q80,20 90,10" />
          <path d="M10,30 Q20,40 30,30 Q40,40 50,30 Q60,40 70,30 Q80,40 90,30" />
          <circle cx="20" cy="20" r="3" fill="white" />
          <circle cx="50" cy="20" r="3" fill="white" />
          <circle cx="80" cy="20" r="3" fill="white" />
        </svg>
      </div>

      {/* Bottom right ornament */}
      <div className="absolute bottom-8 right-8 w-24 h-24 opacity-30 scale-[-1]">
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
        <h1 className="text-5xl font-light text-white mb-6 tracking-widest drop-shadow-lg">
          YOU ARE
        </h1>
        <h2 className="text-5xl font-light text-white mb-6 tracking-wider drop-shadow-lg">
          CORDIALLY INVITED
        </h2>
        <p className="text-xl text-white opacity-80 font-light tracking-widest drop-shadow-lg">TAP TO OPEN</p>
      </div>
    </div>
  );
}

export default function Venue() {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-amber-400 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-3xl font-light text-white mb-4">M.K.S Mahal</h3>

        <p className="text-white/70 mb-6 text-sm leading-relaxed">
          Kalumangalam Main Road, Komaklam, Maharaj
        </p>

        <a
          href="https://maps.app.goo.gl/DiRfq2SStDfoFBxT6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-400 text-amber-400 rounded-full hover:bg-amber-400 hover:text-blue-900 transition-all duration-300 text-sm font-light tracking-wider"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          VIEW ON GOOGLE MAPS
        </a>

        <p className="text-white/50 text-xs mt-8 tracking-widest uppercase">
          11.06.2026
        </p>
      </div>
    </div>
  );
}

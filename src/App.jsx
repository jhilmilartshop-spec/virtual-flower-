import React, { useState, useMemo, useEffect } from "react";
import { Share2, Mail, Link2, QrCode, Check, Sparkles, Volume2, VolumeX } from "lucide-react";

// ===== SUNSET COLOR PALETTE =====
const SUNSET = {
  darkPlum: "#3E2A44",
  coral: "#E38665",
  marigold: "#E9B44C",
  violet: "#9A7FB8",
  blush: "#EFC9C0",
  cream: "#FBF4E8",
  skyBlue: "#8FB3D9",
  dustyRose: "#C7857F"
};

// ===== FLOWER DEFINITIONS =====
const FLOWERS = [
  { id: "daisy", label: "daisy", color: "#FFF9E8", accent: "#E9B84A", petals: 8 },
  { id: "rose", label: "rose", color: "#D96873", accent: "#9C3948", petals: 12 },
  { id: "lavender", label: "lavender", color: "#B69AD8", accent: "#7E639F", petals: 6 },
  { id: "tulip", label: "tulip", color: "#F28FA4", accent: "#C95D78", petals: 6 },
  { id: "sunflower", label: "sunflower", color: "#F3C84B", accent: "#8C5B2C", petals: 18 },
  { id: "lily", label: "lily", color: "#F7F1DE", accent: "#C9A98B", petals: 6 },
  { id: "peony", label: "peony", color: "#F2A8BD", accent: "#C96A8B", petals: 16 },
  { id: "gerbera", label: "gerbera", color: "#E990AD", accent: "#B94D74", petals: 14 },
  { id: "hydrangea", label: "hydrangea", color: "#91A9D7", accent: "#6677A9", petals: 10 },
  { id: "forget", label: "forget-me-not", color: "#8DB7E8", accent: "#4B79B8", petals: 5 },
];

// ===== PREMIUM RIBBON STYLES =====
const RIBBONS = [
  { id: "silk-bow", label: "silk bow", style: "bow", color: "#E38665" },
  { id: "satin-wrap", label: "satin wrap", style: "wrap", color: "#C71585" },
  { id: "velvet-knot", label: "velvet knot", style: "knot", color: "#8B4513" },
  { id: "lace-tie", label: "lace tie", style: "lace", color: "#F5F5DC" },
  { id: "rope-cord", label: "rope cord", style: "rope", color: "#DAA520" },
  { id: "pearl-string", label: "pearl string", style: "beads", color: "#F0F8FF" },
  { id: "ribbon-cascade", label: "ribbon cascade", style: "cascade", color: "#FFB6D9" },
  { id: "twine-wrap", label: "twine wrap", style: "twine", color: "#8B7355" },
];

// ===== PREMIUM WRAPS =====
const WRAPS = [
  { id: "kraft", label: "kraft paper", color: "#D9BE9A" },
  { id: "floral", label: "floral print", color: "#F5DEB3" },
  { id: "gold-leaf", label: "gold leaf", color: "#FFD700" },
  { id: "lace-overlay", label: "lace overlay", color: "#FFF8DC" },
  { id: "silk-tissue", label: "silk tissue", color: "#F0E68C" },
  { id: "vintage-map", label: "vintage map", color: "#D2B48C" },
];

// ===== SAMPLE BOUQUETS =====
const SAMPLE_BOUQUETS = [
  {
    name: "Romantic Rose Garden",
    flowers: ["rose", "rose", "rose", "peony", "lavender"],
    ribbon: "silk-bow",
    wrap: "floral",
    description: "Perfect for anniversaries and special moments"
  },
  {
    name: "Sunshine Blossom",
    flowers: ["sunflower", "sunflower", "daisy", "daisy", "gerbera"],
    ribbon: "ribbon-cascade",
    wrap: "silk-tissue",
    description: "Cheerful and bright, brings warmth and joy"
  },
  {
    name: "Lavender Dreams",
    flowers: ["lavender", "lavender", "tulip", "rose", "lily"],
    ribbon: "velvet-knot",
    wrap: "lace-overlay",
    description: "Elegant and calming, perfect for any occasion"
  },
  {
    name: "Botanical Mix",
    flowers: ["tulip", "lily", "gerbera", "daisy", "peony"],
    ribbon: "twine-wrap",
    wrap: "vintage-map",
    description: "A beautiful mix of colors and textures"
  },
  {
    name: "Garden Pastels",
    flowers: ["peony", "tulip", "lavender", "rose", "gerbera", "daisy"],
    ribbon: "satin-wrap",
    wrap: "gold-leaf",
    description: "Soft, dreamy colors perfect for any celebration"
  }
];

// ===== FAIRY LIGHT COMPONENT =====
function FairyLightString({ top, left, count = 12 }) {
  const lights = Array.from({ length: count });
  
  return (
    <div className="absolute" style={{ top: `${top}%`, left: `${left}%`, width: "80%", height: "20px", opacity: 0.8 }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 20">
        <path d="M 0 10 Q 250 5 500 10 T 1000 10" stroke={SUNSET.coral} strokeWidth="1" fill="none" opacity="0.4" />
        {lights.map((_, i) => {
          const x = (i / (count - 1)) * 1000;
          const colors = [SUNSET.marigold, SUNSET.blush, SUNSET.skyBlue, SUNSET.coral];
          const color = colors[i % colors.length];
          return (
            <g key={i}>
              <circle cx={x} cy="10" r="6" fill={color} opacity="0.3" />
              <circle cx={x} cy="10" r="3" fill={color} opacity="0.9" />
              <circle cx={x} cy="10" r="2" fill="#FFF" opacity="0.5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ===== ADVANCED FLOWER GRAPHICS =====
function AdvancedFlower({ type, size = 1 }) {
  const flower = FLOWERS.find(f => f.id === type);
  if (!flower) return null;

  return (
    <svg width={48 * size} height={48 * size} viewBox="0 0 48 48" className="drop-shadow-lg">
      <defs>
        <filter id={`glow-${type}`}>
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        <radialGradient id={`grad-${type}`}>
          <stop offset="0%" stopColor={flower.color} />
          <stop offset="100%" stopColor={flower.accent} />
        </radialGradient>
      </defs>

      {/* Stem with leaves */}
      <path d="M 24 48 Q 22 36 24 24" stroke={flower.accent} strokeWidth="1.5" fill="none" opacity="0.6" />
      <ellipse cx="20" cy="38" rx="3" ry="6" fill={flower.accent} opacity="0.4" />
      <ellipse cx="28" cy="32" rx="3" ry="6" fill={flower.accent} opacity="0.4" />

      {/* Layered petals */}
      {Array.from({ length: flower.petals }).map((_, i) => {
        const angle = (360 / flower.petals) * i;
        const layerOpacity = 0.85 - (i % 3) * 0.15;
        return (
          <g key={i} transform={`translate(24, 16) rotate(${angle})`}>
            <ellipse cx="0" cy="-9" rx="4.5" ry="9" fill={flower.color} opacity={layerOpacity} filter={`url(#glow-${type})`} />
          </g>
        );
      })}

      {/* Center with depth */}
      <circle cx="24" cy="16" r="5.5" fill={flower.accent} />
      <circle cx="24" cy="16" r="3" fill={flower.accent} opacity="0.3" />
      <circle cx="22" cy="14" r="1.5" fill="#FFF" opacity="0.6" />
    </svg>
  );
}

// ===== RIBBON RENDERING =====
function RibbonRender({ ribbonId, width = 60, height = 30 }) {
  const ribbon = RIBBONS.find(r => r.id === ribbonId);
  if (!ribbon) return null;

  if (ribbon.style === "bow") {
    return (
      <svg width={width} height={height} viewBox="0 0 60 30" className="drop-shadow-md">
        <ellipse cx="20" cy="15" rx="12" ry="10" fill={ribbon.color} />
        <ellipse cx="40" cy="15" rx="12" ry="10" fill={ribbon.color} />
        <rect x="27" y="12" width="6" height="6" rx="1" fill="#8B4513" />
        <ellipse cx="22" cy="12" rx="4" ry="3" fill="#FFF" opacity="0.3" />
      </svg>
    );
  }

  if (ribbon.style === "wrap") {
    return (
      <svg width={width} height={height} viewBox="0 0 60 30" className="drop-shadow-md">
        <path d="M 10 15 Q 30 5 50 15 Q 30 25 10 15" fill={ribbon.color} opacity="0.8" />
        <path d="M 10 15 Q 30 8 50 15" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>
    );
  }

  if (ribbon.style === "cascade") {
    return (
      <svg width={width} height={height} viewBox="0 0 60 30" className="drop-shadow-md">
        {[0, 8, 16, 24].map((y, i) => (
          <path key={i} d={`M 20 ${y} L 40 ${y + 5}`} stroke={ribbon.color} strokeWidth="2" />
        ))}
      </svg>
    );
  }

  if (ribbon.style === "beads") {
    return (
      <svg width={width} height={height} viewBox="0 0 60 30" className="drop-shadow-md">
        {[10, 20, 30, 40, 50].map((x, i) => (
          <circle key={i} cx={x} cy="15" r="3" fill={ribbon.color} />
        ))}
        <path d="M 7 15 L 53 15" stroke="#DDD" strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }

  return <div className="w-full h-full rounded" style={{ background: ribbon.color }} />;
}

// ===== AUDIO PLAYER =====
function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (isPlaying) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      const playAmbientSound = () => {
        const now = audioContext.currentTime;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.value = 220;
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
        
        osc.start(now);
        osc.stop(now + 3);
      };

      const interval = setInterval(playAmbientSound, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed top-6 right-6 p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
      style={{ background: `linear-gradient(135deg, ${SUNSET.blush}, ${SUNSET.violet})` }}
      title={isPlaying ? "Stop music" : "Play ambient music"}
    >
      {isPlaying ? (
        <Volume2 size={20} style={{ color: SUNSET.cream }} />
      ) : (
        <VolumeX size={20} style={{ color: SUNSET.cream }} />
      )}
    </button>
  );
}

// ===== HERO SECTION =====
function HeroSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            ${SUNSET.darkPlum} 0%, 
            #6B4A6E 20%, 
            ${SUNSET.coral} 45%, 
            ${SUNSET.marigold} 65%, 
            #F3D9A4 85%, 
            #FFF8E7 100%)`
        }}
      />

      {/* Fairy lights */}
      <FairyLightString top="15" left="5" count={14} />
      <FairyLightString top="28" left="-10" count={16} />
      <FairyLightString top="42" left="8" count={13} />
      <FairyLightString top="55" left="-5" count={15} />
      <FairyLightString top="68" left="10" count={12} />

      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse" style={{ background: SUNSET.coral }} />

      {/* Floating hearts */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80 + 10}%`,
            fontSize: `${6 + Math.random() * 8}px`,
            opacity: 0.3 + Math.random() * 0.3,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            color: [SUNSET.blush, SUNSET.coral, SUNSET.violet][Math.floor(Math.random() * 3)]
          }}
        >
          ❤️
        </div>
      ))}

      <div className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10">
        <p
          className="text-sm md:text-base tracking-[0.3em] mb-6 opacity-80"
          style={{ fontFamily: "'Poppins', sans-serif", color: SUNSET.cream, fontWeight: 300 }}
        >
          WELCOME TO THE GARDEN
        </p>

        <h1
          className="text-7xl md:text-9xl font-light mb-2 drop-shadow-2xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: SUNSET.cream,
            letterSpacing: "0.15em",
            textShadow: `0 2px 4px rgba(62, 42, 68, 0.3), 0 4px 8px rgba(62, 42, 68, 0.2)`,
            fontWeight: 300
          }}
        >
          jhilmill
        </h1>

        <p
          className="text-xs md:text-sm tracking-[0.25em] mb-12 opacity-90"
          style={{ fontFamily: "'Poppins', sans-serif", color: SUNSET.cream, fontWeight: 400, textTransform: "uppercase" }}
        >
          VIRTUAL FLOWER HOUSE
        </p>

        <div className="w-24 h-1 bg-gradient-to-r mb-12 opacity-60" style={{ backgroundImage: `linear-gradient(90deg, transparent, ${SUNSET.marigold}, transparent)` }} />

        <p
          className="text-xl md:text-3xl max-w-2xl leading-relaxed mb-16 opacity-95"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: SUNSET.cream, fontWeight: 300 }}
        >
          a garden of daisies everywhere
          <br />
          <span className="text-sm md:text-lg opacity-80">lilies at dusk, orchids in bloom</span>
        </p>

        <p
          className="text-sm md:text-base max-w-lg mb-20 opacity-75"
          style={{ fontFamily: "'Poppins', sans-serif", color: SUNSET.cream, fontWeight: 300, lineHeight: "1.8" }}
        >
          handpick your blooms, choose your ribbons, wrap with care, and share something beautiful with the world
        </p>

        <button
          className="px-10 py-4 rounded-full font-light tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: `linear-gradient(135deg, ${SUNSET.coral} 0%, ${SUNSET.blush} 100%)`,
            color: SUNSET.cream,
            fontSize: "0.95rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            border: `2px solid ${SUNSET.cream}`,
            boxShadow: `0 8px 16px rgba(62, 42, 68, 0.2)`
          }}
        >
          Begin Your Garden
        </button>

        <div className="absolute bottom-8 animate-bounce" style={{ animationDelay: "0.5s" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SUNSET.cream} strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(8deg); opacity: 0.6; }
        }

        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ===== BOUQUET PREVIEW =====
function BouquetPreview({ flowers, ribbonId, wrapId }) {
  const wrapData = WRAPS.find(w => w.id === wrapId);
  
  return (
    <div className="relative w-full h-96 flex items-end justify-center">
      <div
        className="absolute bottom-8"
        style={{
          width: 0,
          height: 0,
          borderLeft: "70px solid transparent",
          borderRight: "70px solid transparent",
          borderBottom: `170px solid ${wrapData?.color || "#D9BE9A"}`,
          filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.15))"
        }}
      />

      <div className="absolute bottom-48 left-1/2 -translate-x-1/2">
        <RibbonRender ribbonId={ribbonId} width={150} height={25} />
      </div>

      <div className="absolute bottom-56 flex justify-center gap-4 flex-wrap">
        {flowers.map((flower, i) => (
          <div key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
            <AdvancedFlower type={flower} size={0.8} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== SAMPLE BOUQUET CARD =====
function SampleBouquetCard({ bouquet, onSelect }) {
  return (
    <div
      className="rounded-lg p-4 border-2 hover:shadow-lg transition-all cursor-pointer"
      style={{ background: `linear-gradient(to bottom, ${SUNSET.blush}40, ${SUNSET.cream})`, borderColor: SUNSET.blush }}
      onClick={onSelect}
    >
      <h3 className="font-bold mb-1" style={{ color: SUNSET.darkPlum, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
        {bouquet.name}
      </h3>
      <p className="text-xs mb-3" style={{ color: SUNSET.coral }}>{bouquet.description}</p>
      <div className="h-32 bg-white rounded mb-2">
        <BouquetPreview flowers={bouquet.flowers} ribbonId={bouquet.ribbon} wrapId={bouquet.wrap} />
      </div>
    </div>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [selectedFlowers, setSelectedFlowers] = useState(["rose", "lavender"]);
  const [selectedRibbon, setSelectedRibbon] = useState("silk-bow");
  const [selectedWrap, setSelectedWrap] = useState("floral");
  const [note, setNote] = useState("");
  const [showSamples, setShowSamples] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const toggleFlower = (id) => {
    setSelectedFlowers(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const applySample = (sample) => {
    setSelectedFlowers(sample.flowers);
    setSelectedRibbon(sample.ribbon);
    setSelectedWrap(sample.wrap);
    setShowSamples(false);
  };

  const wrapItUp = () => {
    setAssembled(true);
    const payload = { selectedFlowers, selectedRibbon, selectedWrap, note };
    const token = btoa(JSON.stringify(payload)).slice(0, 24);
    setShareUrl(`https://jhilmill.com/b/${token}`);
  };

  return (
    <div style={{ background: SUNSET.cream, minHeight: "100vh" }}>
      <BackgroundMusic />
      <HeroSection />

      {/* Assembling Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl text-center mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", color: SUNSET.darkPlum }}>
          The Assembling Table
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Flowers */}
          <div className="rounded-lg p-6 shadow-lg" style={{ background: "#FFF" }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: SUNSET.darkPlum, fontFamily: "'Poppins', sans-serif" }}>
              Flowers
            </h3>
            <div className="flex flex-wrap gap-2">
              {FLOWERS.map(flower => (
                <button
                  key={flower.id}
                  onClick={() => toggleFlower(flower.id)}
                  className="px-3 py-1 rounded text-xs transition-all"
                  style={{
                    background: selectedFlowers.includes(flower.id) ? SUNSET.darkPlum : "#F0F0F0",
                    color: selectedFlowers.includes(flower.id) ? SUNSET.cream : SUNSET.darkPlum
                  }}
                >
                  {flower.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ribbons */}
          <div className="rounded-lg p-6 shadow-lg" style={{ background: "#FFF" }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: SUNSET.darkPlum, fontFamily: "'Poppins', sans-serif" }}>
              Ribbons
            </h3>
            <div className="space-y-2">
              {RIBBONS.map(ribbon => (
                <button
                  key={ribbon.id}
                  onClick={() => setSelectedRibbon(ribbon.id)}
                  className="w-full p-2 rounded text-sm transition-all text-left"
                  style={{
                    background: selectedRibbon === ribbon.id ? SUNSET.darkPlum : "#F0F0F0",
                    color: selectedRibbon === ribbon.id ? SUNSET.cream : SUNSET.darkPlum
                  }}
                >
                  {ribbon.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wraps */}
          <div className="rounded-lg p-6 shadow-lg" style={{ background: "#FFF" }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: SUNSET.darkPlum, fontFamily: "'Poppins', sans-serif" }}>
              Wrapping
            </h3>
            <div className="space-y-2">
              {WRAPS.map(wrap => (
                <button
                  key={wrap.id}
                  onClick={() => setSelectedWrap(wrap.id)}
                  className="w-full p-2 rounded text-sm transition-all text-left"
                  style={{
                    background: selectedWrap === wrap.id ? SUNSET.darkPlum : "#F0F0F0",
                    color: selectedWrap === wrap.id ? SUNSET.cream : SUNSET.darkPlum
                  }}
                >
                  {wrap.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-lg p-8 shadow-lg mb-12" style={{ background: "#FFF" }}>
          <BouquetPreview flowers={selectedFlowers} ribbonId={selectedRibbon} wrapId={selectedWrap} />
        </div>

        {/* Note */}
        <div className="rounded-lg p-6 shadow-lg mb-12" style={{ background: "#FFF" }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: SUNSET.darkPlum, fontFamily: "'Poppins', sans-serif" }}>
            Add a Note
          </h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write something warm and personal..."
            className="w-full p-4 border-2 rounded resize-none focus:outline-none"
            style={{ borderColor: SUNSET.blush, color: SUNSET.darkPlum }}
            rows={4}
          />
        </div>

        {/* Samples */}
        <div className="mb-12">
          <button
            onClick={() => setShowSamples(!showSamples)}
            className="w-full py-3 text-white rounded-lg font-bold mb-4 hover:shadow-lg transition-all"
            style={{ background: `linear-gradient(135deg, ${SUNSET.coral}, ${SUNSET.blush})` }}
          >
            {showSamples ? "Hide" : "View"} Sample Bouquets
          </button>

          {showSamples && (
            <div className="grid md:grid-cols-3 gap-4">
              {SAMPLE_BOUQUETS.map((bouquet, i) => (
                <SampleBouquetCard key={i} bouquet={bouquet} onSelect={() => applySample(bouquet)} />
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={wrapItUp}
            className="px-6 py-3 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2"
            style={{ background: SUNSET.darkPlum }}
          >
            <Sparkles size={18} /> Wrap It Up
          </button>
          <button
            className="px-6 py-3 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center gap-2"
            style={{ background: SUNSET.coral }}
          >
            <Share2 size={18} /> Share
          </button>
        </div>

        {/* Share Info */}
        {assembled && (
          <div className="mt-12 p-6 rounded-lg text-center" style={{ background: SUNSET.blush + "40", borderLeft: `4px solid ${SUNSET.coral}` }}>
            <p style={{ color: SUNSET.darkPlum, fontFamily: "'Poppins', sans-serif", marginBottom: "0.5rem" }}>
              Your bouquet is ready to share!
            </p>
            <p style={{ color: SUNSET.coral, fontSize: "0.9rem", fontFamily: "monospace" }}>
              {shareUrl}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&display=swap');
      `}</style>
    </div>
  );
  }

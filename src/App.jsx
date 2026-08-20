import React, { useState, useMemo, useRef } from "react";
import { Flower2, Share2, Mail, Link2, QrCode, Check, Sparkles } from "lucide-react";

const FLOWER_TYPES = [
  { id: "daisy", label: "daisies", petals: 12, petalShape: "round", colors: ["#FBF4E8"], centerColor: "#E9B44C" },
  { id: "lily", label: "lilies", petals: 6, petalShape: "long", colors: ["#E38665", "#FBF4E8", "#9A7FB8"], centerColor: "#8B5E2E" },
  { id: "mum", label: "chrysanthemums", petals: 18, petalShape: "thin", colors: ["#E9B44C", "#E38665", "#FBF4E8"], centerColor: "#8B5E2E" },
  { id: "orchid", label: "orchids", petals: 5, petalShape: "orchid", colors: ["#9A7FB8", "#E38665"], centerColor: "#FBF4E8" },
  { id: "wild", label: "wildflowers", petals: 8, petalShape: "small", colors: ["#8FB3D9", "#E9B44C", "#9A7FB8"], centerColor: "#3E2A44" },
  { id: "tulip", label: "tulips", petals: 6, petalShape: "cup", distScale: 0.6, colors: ["#E38665", "#9A7FB8", "#EFC9C0"], centerColor: "#E9B44C" },
  { id: "rose", label: "roses", petals: 8, layers: 2, petalShape: "ruffle", distScale: 0.75, colors: ["#E38665", "#FBF4E8", "#E9B44C"], centerColor: "#C77B62" },
  { id: "peony", label: "peonies", petals: 10, layers: 3, petalShape: "ruffle", distScale: 0.7, colors: ["#EFC9C0", "#FBF4E8", "#9A7FB8"], centerColor: "#E9B44C" },
  { id: "ranunculus", label: "ranunculus", petals: 10, layers: 2, petalShape: "round", distScale: 0.55, colors: ["#E38665", "#E9B44C", "#FBF4E8"], centerColor: "#C77B62" },
  { id: "sunflower", label: "sunflowers", petals: 16, petalShape: "ray", distScale: 1.3, colors: ["#E9B44C"], centerColor: "#4A2E1A" },
  { id: "babysbreath", label: "baby's breath", spray: true, colors: ["#FBF4E8"] },
];

const ARRANGEMENTS = [
  { id: "round", label: "hand-tied round" },
  { id: "cascade", label: "cascading" },
  { id: "wild", label: "wild gather" },
  { id: "formal", label: "tiered formal" },
];

const RIBBONS = [
  { id: "coral", label: "coral", hex: "#E38665" },
  { id: "violet", label: "violet", hex: "#9A7FB8" },
  { id: "gold", label: "marigold", hex: "#E9B44C" },
  { id: "cream", label: "cream", hex: "#FBF4E8" },
];

const WRAPS = [
  { id: "kraft", label: "kraft paper", hex: "#D9BE9A" },
  { id: "blush", label: "blush", hex: "#EFC9C0" },
  { id: "sage", label: "sage", hex: "#B9C7A8" },
  { id: "plum", label: "plum", hex: "#6E5470" },
];

const PETAL_SHAPES = {
  round: { w: 9, h: 9, r: "9999px" },
  long: { w: 6, h: 15, r: "50% 50% 4px 4px" },
  thin: { w: 4, h: 13, r: "9999px" },
  orchid: { w: 8, h: 12, r: "60% 40% 60% 40%" },
  small: { w: 6, h: 6, r: "9999px" },
  cup: { w: 10, h: 13, r: "50% 50% 70% 70%" },
  ruffle: { w: 7, h: 9, r: "40% 70% 40% 70%" },
  ray: { w: 4, h: 22, r: "50% 50% 2px 2px" },
};

function Petal({ shape, color, rotate, dist, scale = 1 }) {
  const s = PETAL_SHAPES[shape] || PETAL_SHAPES.round;
  return (
    <div
      style={{
        position: "absolute",
        width: s.w * scale,
        height: s.h * scale,
        background: color,
        borderRadius: s.r,
        left: "50%",
        top: "50%",
        transform: `translate(-50%,-50%) rotate(${rotate}deg) translateY(-${dist}px)`,
      }}
    />
  );
}

function Flower({ type, size = 1, seedColor, style, animDelay = 0, sway = false }) {
  const def = FLOWER_TYPES.find((f) => f.id === type) || FLOWER_TYPES[0];
  const color = seedColor || def.colors[0];
  const baseDist = 8 * size;
  const layers = def.layers || 1;

  return (
    <div
      className={sway ? "gb-sway" : ""}
      style={{ position: "relative", width: 40 * size, height: 40 * size, animationDelay: `${animDelay}s`, ...style }}
    >
      {def.spray
        ? Array.from({ length: 7 }).map((_, k) => {
            const ang = (k * 137.5) % 360;
            const r = 7 * size * ((k % 3) + 1) / 3;
            const x = Math.cos((ang * Math.PI) / 180) * r;
            const y = Math.sin((ang * Math.PI) / 180) * r;
            return (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 5 * size,
                  height: 5 * size,
                  background: color,
                  borderRadius: "9999px",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              />
            );
          })
        : Array.from({ length: layers }).map((_, L) =>
            Array.from({ length: def.petals }).map((_, i) => (
              <Petal
                key={`${L}-${i}`}
                shape={def.petalShape}
                color={color}
                rotate={(360 / def.petals) * i + L * (180 / def.petals)}
                dist={baseDist * (def.distScale || 1) * (1 - L * 0.25)}
                scale={1 - L * 0.12}
              />
            ))
          )}
      {!def.spray && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 8 * size,
            height: 8 * size,
            background: def.centerColor || "#E9B44C",
            borderRadius: "9999px",
            transform: "translate(-50%,-50%)",
          }}
        />
      )}
    </div>
  );
}

function OrchidArch() {
  const orchidSpots = [];
  for (let t = 0; t <= 1; t += 0.09) {
    orchidSpots.push({ angle: Math.PI * (1 - t) });
  }
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
      <path d="M 20 220 Q 20 20 200 20 Q 380 20 380 220" fill="none" stroke="#6E8C5C" strokeWidth="10" strokeLinecap="round" />
      {orchidSpots.map((s, i) => {
        const cx = 200 - 180 * Math.cos(s.angle);
        const cy = 220 - 200 * Math.sin(s.angle);
        const color = i % 2 === 0 ? "#9A7FB8" : "#E9B44C";
        return (
          <g key={i} transform={`translate(${cx},${cy})`}>
            <circle r="7" fill={color} opacity="0.9" />
            <circle r="3" fill="#FBF4E8" opacity="0.9" />
          </g>
        );
      })}
    </svg>
  );
}

function GardenHero() {
  const daisyRow = Array.from({ length: 22 });
  return (
    <div className="relative w-full h-[62vh] min-h-[420px] overflow-hidden rounded-b-[2.5rem]">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #3E2A44 0%, #6B4A6E 22%, #C77B62 48%, #E9B44C 68%, #F3D9A4 100%)" }}
      />
      <div
        className="gb-sun absolute rounded-full"
        style={{ width: 120, height: 120, left: "50%", top: "38%", background: "radial-gradient(circle, #FBEFD0 0%, #E9B44C 60%, rgba(233,180,76,0) 75%)", transform: "translate(-50%,-50%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "38%", background: "#4B6B45", borderRadius: "50% 50% 0 0 / 100% 100% 0 0", transform: "scaleX(1.3)", opacity: 0.85 }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "26%", background: "#3E5A38", borderRadius: "50% 50% 0 0 / 100% 100% 0 0", transform: "scaleX(1.15)" }} />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-[280px] h-[190px] opacity-95">
        <OrchidArch />
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-around px-4">
        {daisyRow.map((_, i) => (
          <Flower key={i} type="daisy" size={0.55 + (i % 3) * 0.12} sway animDelay={(i % 7) * 0.3} />
        ))}
      </div>
      <Flower type="mum" size={0.7} sway animDelay={0.2} style={{ position: "absolute", left: "12%", bottom: "30%" }} />
      <Flower type="wild" size={0.6} seedColor="#8FB3D9" sway animDelay={0.6} style={{ position: "absolute", left: "78%", bottom: "34%" }} />
      <Flower type="lily" size={0.75} seedColor="#9A7FB8" sway animDelay={0.4} style={{ position: "absolute", left: "22%", bottom: "38%" }} />
      <Flower type="orchid" size={0.65} sway animDelay={0.9} style={{ position: "absolute", left: "68%", bottom: "26%" }} />
      <Flower type="sunflower" size={0.6} sway animDelay={0.5} style={{ position: "absolute", left: "88%", bottom: "22%" }} />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
        <span className="text-[#FBF4E8] text-lg tracking-[0.15em] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          jhilmiil
        </span>
        <span className="block text-[#FBF4E8]/70 text-[10px] tracking-[0.35em] uppercase mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
          virtual flower house
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-[#FBF4E8] text-4xl sm:text-6xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          grow me a bouquet
        </h1>
        <p className="text-[#FBF4E8]/85 mt-3 max-w-md text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
          daisies everywhere, lilies at dusk, an orchid arch against the last light.
          pick your blooms and wrap something someone will keep.
        </p>
      </div>
    </div>
  );
}

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function getStemPosition(i, n, style) {
  const spread = 150;
  if (style === "wild") {
    const r1 = pseudoRandom(i * 3.1);
    const r2 = pseudoRandom(i * 7.7 + 1);
    return { offset: (r1 - 0.5) * spread * 1.3, lift: 25 + r2 * 75, rotate: (r1 - 0.5) * 40 };
  }
  if (style === "cascade") {
    const mainCount = Math.max(Math.ceil(n * 0.6), 1);
    if (i < mainCount) {
      const offset = mainCount > 1 ? (i / (mainCount - 1) - 0.5) * spread * 0.8 : 0;
      return { offset, lift: 95 - Math.abs(offset) * 0.3, rotate: offset * 0.1 };
    }
    const j = i - mainCount;
    const trailCount = Math.max(n - mainCount, 1);
    const offset = (j / Math.max(trailCount - 1, 1) - 0.5) * 36;
    return { offset, lift: 90 - (j + 1) * 34, rotate: offset * 0.3 };
  }
  if (style === "formal") {
    const cols = Math.min(n, 5) || 1;
    const row = Math.floor(i / cols);
    const rowStart = row * cols;
    const rowCount = Math.min(cols, n - rowStart);
    const col = i - rowStart;
    const offset = rowCount > 1 ? (col / (rowCount - 1) - 0.5) * spread : 0;
    return { offset, lift: 55 + row * 32, rotate: 0 };
  }
  const offset = n > 1 ? (i / (n - 1) - 0.5) * spread : 0;
  return { offset, lift: 60 - Math.abs(offset) * 0.35, rotate: offset * 0.12 };
}

function BouquetPreview({ selected, ribbon, wrap, size, arrangement }) {
  const wrapHex = WRAPS.find((w) => w.id === wrap)?.hex || "#D9BE9A";
  const ribbonHex = RIBBONS.find((r) => r.id === ribbon)?.hex || "#E38665";
  const stems = useMemo(() => {
    const arr = [];
    let idx = 0;
    selected.forEach((f) => {
      const def = FLOWER_TYPES.find((d) => d.id === f);
      const count = size === "large" ? 6 : size === "medium" ? 4 : 3;
      for (let i = 0; i < count; i++) {
        arr.push({ type: f, color: def.colors[i % def.colors.length], idx: idx++ });
      }
    });
    return arr;
  }, [selected, size]);

  return (
    <div className="relative w-full h-[420px] flex items-end justify-center overflow-visible">
      <div
        className="absolute bottom-8"
        style={{ width: 0, height: 0, borderLeft: "70px solid transparent", borderRight: "70px solid transparent", borderBottom: `170px solid ${wrapHex}`, filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.15))" }}
      />
      <div className="absolute bottom-[128px] w-[70px] h-[16px] rounded-sm" style={{ background: ribbonHex, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
      <div className="absolute bottom-[158px] w-full flex justify-center">
        {stems.length === 0 && (
          <p className="text-[#8B7E6E] text-sm italic mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            choose a few flowers to begin assembling
          </p>
        )}
        {stems.map((s, i) => {
          const { offset, lift, rotate } = getStemPosition(i, stems.length, arrangement);
          return (
            <div
              key={i}
              className="gb-pop absolute"
              style={{ left: `calc(50% + ${offset}px)`, bottom: `${lift}px`, transform: `translateX(-50%) rotate(${rotate}deg)`, animationDelay: `${i * 0.1}s` }}
            >
              <Flower type={s.type} seedColor={s.color} size={0.85} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-sm border transition-colors ${active ? "bg-[#3E2A44] text-[#FBF4E8] border-[#3E2A44]" : "bg-transparent text-[#3E2A44] border-[#D9BE9A] hover:border-[#3E2A44]"}`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {children}
    </button>
  );
}

function SwatchButton({ hex, active, onClick, label }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1" title={label}>
      <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ background: hex, borderColor: active ? "#3E2A44" : "transparent" }}>
        {active && <Check size={14} color="#fff" />}
      </span>
    </button>
  );
}

export default function App() {
  const [selected, setSelected] = useState(["daisy", "orchid"]);
  const [ribbon, setRibbon] = useState("coral");
  const [wrap, setWrap] = useState("kraft");
  const [size, setSize] = useState("medium");
  const [arrangement, setArrangement] = useState("round");
  const [note, setNote] = useState("");
  const [assembled, setAssembled] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleFlower = (id) => {
    setAssembled(false);
    setSelected((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const wrapItUp = () => {
    setAssembled(true);
    const payload = { selected, ribbon, wrap, size, arrangement, note };
    const token = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).slice(0, 24);
    setShareUrl(`https://jhilmiil.app/b/${token}`);
    setCopied(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      setCopied(false);
    }
  };

  const mailtoHref = `mailto:?subject=${encodeURIComponent("a bouquet for you, from jhilmiil")}&body=${encodeURIComponent((note ? note + "\n\n" : "") + "open your bouquet here: " + shareUrl)}`;
  const qrSrc = shareUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}` : "";

  return (
    <div style={{ background: "#FBF4E8", minHeight: "100vh" }}>
      <style>{`
        .gb-sway { animation: gbSway 4.5s ease-in-out infinite; transform-origin: bottom center; }
        @keyframes gbSway { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        .gb-sun { animation: gbGlow 6s ease-in-out infinite; }
        @keyframes gbGlow { 0%,100% { opacity: 0.9; } 50% { opacity: 1; filter: brightness(1.08); } }
        .gb-pop { opacity: 0; animation: gbPop 0.5s ease-out forwards; }
        @keyframes gbPop { from { opacity: 0; transform: translateX(-50%) translateY(14px) scale(0.7); } to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .gb-sway, .gb-sun, .gb-pop { animation: none !important; }
        }
      `}</style>

      <GardenHero />

      <div className="max-w-3xl mx-auto text-center px-6 py-10">
        <p className="text-[#6E5470] text-sm tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
          the assembling table
        </p>
        <h2 className="text-3xl text-[#3E2A44]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          pick your blooms, choose how they're gathered
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div>
            <h3 className="text-[#3E2A44] mb-3 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              flowers
            </h3>
            <div className="flex flex-wrap gap-2">
              {FLOWER_TYPES.map((f) => (
                <Toggle key={f.id} active={selected.includes(f.id)} onClick={() => toggleFlower(f.id)}>
                  {f.label}
                </Toggle>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#3E2A44] mb-3 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              how it's gathered
            </h3>
            <div className="flex flex-wrap gap-2">
              {ARRANGEMENTS.map((a) => (
                <Toggle key={a.id} active={arrangement === a.id} onClick={() => { setArrangement(a.id); setAssembled(false); }}>
                  {a.label}
                </Toggle>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#3E2A44] mb-3 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              bouquet size
            </h3>
            <div className="flex gap-2">
              {["small", "medium", "large"].map((s) => (
                <Toggle key={s} active={size === s} onClick={() => { setSize(s); setAssembled(false); }}>
                  {s}
                </Toggle>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#3E2A44] mb-3 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              ribbon
            </h3>
            <div className="flex gap-3">
              {RIBBONS.map((r) => (
                <SwatchButton key={r.id} hex={r.hex} active={ribbon === r.id} onClick={() => setRibbon(r.id)} label={r.label} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#3E2A44] mb-3 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              wrapping paper
            </h3>
            <div className="flex gap-3">
              {WRAPS.map((w) => (
                <SwatchButton key={w.id} hex={w.hex} active={wrap === w.id} onClick={() => setWrap(w.id)} label={w.label} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#3E2A44] mb-3 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              a little note
            </h3>
            <div className="rounded-2xl p-4" style={{ background: "#F3E6C9", border: "1px solid #E3D1A6" }}>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="write something warm, lowercase and unhurried..."
                rows={4}
                className="w-full bg-transparent outline-none text-[#3E2A44] placeholder:text-[#8B7E6E] resize-none text-sm"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}
              />
            </div>
          </div>

          <button
            onClick={wrapItUp}
            disabled={selected.length === 0}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-[#FBF4E8] flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
            style={{ background: "#3E2A44", fontFamily: "'Poppins', sans-serif" }}
          >
            <Sparkles size={16} /> wrap it up
          </button>
        </div>

        <div>
          <div className="rounded-3xl" style={{ background: "linear-gradient(180deg,#F3E6C9,#EFC9C0)" }}>
            <BouquetPreview selected={selected} ribbon={ribbon} wrap={wrap} size={size} arrangement={arrangement} />
          </div>

          {assembled && (
            <div className="mt-6 rounded-2xl p-5 space-y-4" style={{ background: "#FFFFFF", border: "1px solid #E3D1A6" }}>
              <div className="flex items-center gap-2 text-[#3E2A44]">
                <Share2 size={16} />
                <span className="text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  send this bouquet
                </span>
              </div>

              <div className="flex items-center gap-2 bg-[#FBF4E8] rounded-full px-4 py-2">
                <Link2 size={14} className="text-[#6E5470] shrink-0" />
                <span className="text-xs text-[#3E2A44] truncate flex-1" style={{ fontFamily: "monospace" }}>
                  {shareUrl}
                </span>
                <button onClick={copyLink} className="text-xs text-[#6E5470] shrink-0 underline">
                  {copied ? "copied" : "copy"}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a href={mailtoHref} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#3E2A44] border border-[#D9BE9A]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <Mail size={14} /> email it
                </a>
                <div className="flex items-center gap-2 text-xs text-[#6E5470]">
                  <QrCode size={14} /> scan to open
                </div>
                {qrSrc && <img src={qrSrc} alt="QR code for bouquet link" width={80} height={80} className="rounded-lg border border-[#E3D1A6]" />}
              </div>
              <p className="text-[11px] text-[#8B7E6E] leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                this link is a preview — once the site is deployed with a database, it will open a real page showing this exact bouquet and note.
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center pb-10 text-[#8B7E6E] text-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="flex items-center justify-center gap-1">
          <Flower2 size={12} /> jhilmiil · handpicked, wrapped with care
        </div>
      </footer>
    </div>
  );
}

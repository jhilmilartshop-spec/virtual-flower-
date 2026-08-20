import React, { useMemo, useState } from "react";
import {
  Flower2,
  Share2,
  Mail,
  Link2,
  QrCode,
  Check,
  Sparkles,
  Heart,
  RotateCcw,
  Copy,
} from "lucide-react";

/*
  JHILMIIL — VIRTUAL FLOWER HOUSE
  Complete App.jsx replacement.

  This version keeps the original bouquet-builder behaviour, but upgrades:
  - warmer pastel palette
  - richer layered flower illustrations
  - pixel-art flower choices
  - varied hearts
  - 15 wrapping-paper patterns
  - more realistic folded wrapping + ribbon bow
  - softer motion graphics
  - responsive layout
  - reduced-motion support
*/

const FLOWERS = [
  { id: "daisy", label: "daisy", kind: "real", color: "#FFF9E8", accent: "#E9B84A" },
  { id: "lavender", label: "lavender", kind: "real", color: "#B69AD8", accent: "#7E639F" },
  { id: "forget", label: "forget-me-not", kind: "real", color: "#8DB7E8", accent: "#4B79B8" },
  { id: "tulip", label: "tulip", kind: "real", color: "#F28FA4", accent: "#C95D78" },
  { id: "rose", label: "rose", kind: "real", color: "#D96873", accent: "#9C3948" },
  { id: "peony", label: "peony", kind: "real", color: "#F2A8BD", accent: "#C96A8B" },
  { id: "sunflower", label: "sunflower", kind: "real", color: "#F3C84B", accent: "#8C5B2C" },
  { id: "baby", label: "baby's breath", kind: "real", color: "#FFFDF4", accent: "#C9C6B8" },
  { id: "hydrangea", label: "hydrangea", kind: "real", color: "#91A9D7", accent: "#6677A9" },
  { id: "lily", label: "lily", kind: "real", color: "#F7F1DE", accent: "#C9A98B" },
  { id: "gerbera", label: "gerbera", kind: "real", color: "#E990AD", accent: "#B94D74" },
  { id: "calla", label: "calla lily", kind: "real", color: "#F8F3D9", accent: "#B7A878" },
  { id: "pixel-daisy", label: "pixel daisy", kind: "pixel", color: "#FFF4D2", accent: "#E6B94C" },
  { id: "pixel-tulip", label: "pixel tulip", kind: "pixel", color: "#F08BA5", accent: "#B64E6A" },
  { id: "pixel-lavender", label: "pixel lavender", kind: "pixel", color: "#B79BDB", accent: "#715697" },
  { id: "pixel-rose", label: "pixel rose", kind: "pixel", color: "#D86C7A", accent: "#8F3447" },
  { id: "pixel-sunflower", label: "pixel sunflower", kind: "pixel", color: "#F0C84D", accent: "#8A5B28" },
  { id: "pixel-bouquet", label: "pixel bouquet", kind: "pixel", color: "#E9A9BD", accent: "#8B6C7C" },
];


const FLOWER_PALETTES = {
  garden: {
    label: "garden pastel",
    description: "soft botanical colours",
    colors: {
      daisy: ["#FFFDF2", "#F4C95D"], lavender: ["#B99AD9", "#77539B"], forget: ["#9FC9EE", "#4D79B7"],
      tulip: ["#F08FA3", "#B94765"], rose: ["#D95F72", "#8F3046"], peony: ["#F2A5BE", "#B95678"],
      sunflower: ["#F4C94F", "#9B6328"], baby: ["#FFFDF7", "#D8CFC1"], hydrangea: ["#9BAFE0", "#6573A5"],
      lily: ["#FFF8E7", "#C79E75"], gerbera: ["#EF8FAE", "#A93F69"], calla: ["#FFF7E3", "#B39A62"],
      "pixel-daisy": ["#FFF3C9", "#D5A83B"], "pixel-tulip": ["#F08FA3", "#B94765"], "pixel-lavender": ["#B99AD9", "#77539B"],
      "pixel-rose": ["#D95F72", "#8F3046"], "pixel-sunflower": ["#F4C94F", "#9B6328"], "pixel-bouquet": ["#E8A8BA", "#765B8E"]
    }
  },
  sunset: {
    label: "sunset garden",
    description: "peach, coral & plum",
    colors: {
      daisy: ["#FFF0C7", "#E7A63E"], lavender: ["#C7A0D9", "#754B87"], forget: ["#8FB6D8", "#456E9C"],
      tulip: ["#F28A79", "#B8444E"], rose: ["#D96A69", "#8E3341"], peony: ["#F2A0A1", "#B95662"],
      sunflower: ["#F4B83F", "#8D5422"], baby: ["#FFF2DF", "#D3B59D"], hydrangea: ["#A6A4D3", "#66598E"],
      lily: ["#FFE8C8", "#B97C62"], gerbera: ["#F18B82", "#A74358"], calla: ["#FFEBD0", "#A9785A"],
      "pixel-daisy": ["#FFE8B7", "#D69432"], "pixel-tulip": ["#F18A79", "#A83F4A"], "pixel-lavender": ["#C7A0D9", "#754B87"],
      "pixel-rose": ["#D96A69", "#8E3341"], "pixel-sunflower": ["#F4B83F", "#8D5422"], "pixel-bouquet": ["#E7A2A7", "#765274"]
    }
  },
  vintage: {
    label: "vintage botanical",
    description: "dusty rose, cream & sage",
    colors: {
      daisy: ["#F5EED8", "#C79D55"], lavender: ["#B7A4C3", "#6F607D"], forget: ["#9AAFC1", "#5C7180"],
      tulip: ["#D79A9A", "#8D555A"], rose: ["#C98184", "#7E474E"], peony: ["#D7A0A7", "#98616B"],
      sunflower: ["#D8B45B", "#7C6030"], baby: ["#F3EBDD", "#BFB5A2"], hydrangea: ["#9EA8B7", "#66717D"],
      lily: ["#EEE5D0", "#9E816B"], gerbera: ["#D79A9A", "#8A5960"], calla: ["#EEE4C9", "#8F8062"],
      "pixel-daisy": ["#EDE3C7", "#B48B4B"], "pixel-tulip": ["#D39A9B", "#88535A"], "pixel-lavender": ["#B7A4C3", "#6F607D"],
      "pixel-rose": ["#C98184", "#7E474E"], "pixel-sunflower": ["#D8B45B", "#7C6030"], "pixel-bouquet": ["#C9A0A5", "#746479"]
    }
  }
};

const ARRANGEMENTS = [
  { id: "round", label: "hand-tied", emoji: "✿" },
  { id: "wild", label: "wild gather", emoji: "❀" },
  { id: "cascade", label: "cascade", emoji: "⌁" },
  { id: "formal", label: "tiered", emoji: "❁" },
];

const SIZES = ["small", "medium", "large"];

const RIBBONS = [
  { id: "blush", label: "blush", hex: "#D98FA1" },
  { id: "sage", label: "sage", hex: "#9CAF8D" },
  { id: "lavender", label: "lavender", hex: "#9C82B7" },
  { id: "cream", label: "cream", hex: "#E9D9B9" },
  { id: "berry", label: "berry", hex: "#9E4C62" },
];

const WRAPS = [
  { id: "cream", label: "paper cream", bg: "#F8EBDD" },
  { id: "blush-hearts", label: "blush hearts", bg: "#F3D1D5", pattern: "hearts" },
  { id: "tiny-floral", label: "tiny floral", bg: "#F7E4D9", pattern: "flowers" },
  { id: "sage-leaves", label: "sage leaves", bg: "#DCE4D2", pattern: "leaves" },
  { id: "lilac-bows", label: "lilac bows", bg: "#E6DAEE", pattern: "bows" },
  { id: "gingham-pink", label: "pink gingham", bg: "#F1C8CF", pattern: "gingham" },
  { id: "blue-daisy", label: "blue daisies", bg: "#C9DCE8", pattern: "daisy" },
  { id: "cherry", label: "cherry picnic", bg: "#F1C5C0", pattern: "cherry" },
  { id: "wild-petal", label: "wild petals", bg: "#EBD5DF", pattern: "petals" },
  { id: "newspaper", label: "love letter", bg: "#EEE7D8", pattern: "newspaper" },
  { id: "peach-grid", label: "peach grid", bg: "#F1D0BC", pattern: "grid" },
  { id: "butterflies", label: "butterflies", bg: "#DDD4E9", pattern: "butterfly" },
  { id: "sunny-check", label: "buttercup check", bg: "#F0D98A", pattern: "gingham" },
  { id: "lavender-check", label: "lavender check", bg: "#D9CBE7", pattern: "gingham" },
  { id: "kraft", label: "kraft", bg: "#C9AD87", pattern: "speckles" },
];

const HEART_STYLES = ["classic", "double", "tiny", "outlined", "sparkle"];

const NOTE_ACCESSORIES = [
  "✨️", "🦋", "🐾", "🥞", "🧀", "🍕", "🍟", "🍭", "🍬", "🍫",
  "🧁", "🎂", "🍩", "🍧", "🍦", "⚡️", "🎗", "🎁", "👑", "🏳️‍🌈", "🏳️‍⚧️"
];

const FLOATERS = [
  { x: 6, y: 19, type: "heart", style: 0, delay: 0 },
  { x: 91, y: 23, type: "spark", style: 1, delay: 1.2 },
  { x: 14, y: 72, type: "heart", style: 2, delay: 2.1 },
  { x: 83, y: 70, type: "petal", style: 0, delay: 0.7 },
  { x: 48, y: 12, type: "heart", style: 3, delay: 1.8 },
  { x: 72, y: 41, type: "petal", style: 1, delay: 2.6 },
];

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function HeartDoodle({ style = "classic", size = 18, color = "#C9798D" }) {
  if (style === "sparkle") {
    return (
      <span className="heart-sparkle" style={{ color, fontSize: size }}>
        ✦♡✦
      </span>
    );
  }

  if (style === "outlined") {
    return <Heart size={size} strokeWidth={1.5} fill="none" color={color} />;
  }

  if (style === "double") {
    return (
      <span className="double-heart" style={{ color, fontSize: size }}>
        ♡
        <span>♡</span>
      </span>
    );
  }

  if (style === "tiny") {
    return <span style={{ color, fontSize: size, lineHeight: 1 }}>♥</span>;
  }

  return <Heart size={size} fill={color} strokeWidth={1.4} color={color} />;
}

function FlowerIllustration({ flower, scale = 1, className = "", palette = "garden" }) {
  const f = FLOWERS.find((x) => x.id === flower) || FLOWERS[0];
  const paletteData = FLOWER_PALETTES[palette]?.colors?.[f.id] || [f.color, f.accent];
  if (f.kind === "pixel") return <PixelFlower type={f.id} scale={scale} palette={palette} />;

  const petalCount = f.id === "rose" ? 11 : f.id === "peony" ? 16 : f.id === "hydrangea" ? 10 : f.id === "lavender" ? 8 : f.id === "forget" ? 8 : f.id === "baby" ? 12 : f.id === "sunflower" ? 16 : f.id === "calla" ? 1 : 8;
  if (f.id === "lavender") return (
    <div className={`flower-art lavender-art ${className}`} style={{ "--flower": paletteData[0], "--accent": paletteData[1], transform: `scale(${scale})` }}>
      <div className="lavender-stem" />
      {Array.from({ length: 10 }).map((_, i) => <span key={i} className="lavender-bud" style={{ left: `${22 + pseudoRandom(i + 5) * 48}%`, top: `${6 + i * 8}%`, transform: `rotate(${(pseudoRandom(i + 10) - 0.5) * 45}deg)` }} />)}
      <span className="leaf leaf-a" /><span className="leaf leaf-b" />
    </div>
  );
  if (f.id === "baby") return (
    <div className={`flower-art baby-art ${className}`} style={{ "--flower": paletteData[0], "--accent": paletteData[1], transform: `scale(${scale})` }}>
      <div className="baby-stem" />
      {Array.from({ length: 14 }).map((_, i) => <span key={i} className="baby-flower" style={{ left: `${14 + pseudoRandom(i * 2) * 70}%`, top: `${6 + pseudoRandom(i * 4) * 66}%` }}>✿</span>)}
    </div>
  );
  if (f.id === "calla") return (
    <div className={`flower-art calla-art ${className}`} style={{ "--flower": paletteData[0], "--accent": paletteData[1], transform: `scale(${scale})` }}>
      <div className="calla-leaf leaf-a" /><div className="calla-leaf leaf-b" /><div className="calla-bloom"><span /></div>
    </div>
  );
  return (
    <div className={`flower-art ${f.id}-art ${className}`} style={{ "--flower": paletteData[0], "--accent": paletteData[1], transform: `scale(${scale})` }}>
      <div className="flower-head">
        {Array.from({ length: petalCount }).map((_, i) => <span key={i} className="petal" style={{ "--i": i, "--n": petalCount, "--wobble": `${(pseudoRandom(i + f.id.length * 3) - 0.5) * 7}deg` }} />)}
        <span className="flower-core" />
        {["rose", "peony", "hydrangea"].includes(f.id) && <span className="flower-inner">{Array.from({ length: 9 }).map((_, i) => <i key={i} />)}</span>}
      </div>
      <div className="stem" /><span className="leaf leaf-a" /><span className="leaf leaf-b" />
    </div>
  );
}

function PixelFlower({ type, scale = 1, palette = "garden" }) {
  const colors = FLOWER_PALETTES[palette]?.colors?.[type] || ["#F2D6D8", "#A97080"];
  const leaf = palette === "vintage" ? "#64745F" : palette === "sunset" ? "#667C55" : "#64815B";
  const cells = Array.from({ length: 12 });
  return <div className="pixel-flower" style={{ transform: `scale(${scale})` }}>
    <div className="pixel-canvas">
      {cells.map((_, i) => <span key={i} className="pixel-block" style={{ left: `${24 + (i % 4) * 13 + (pseudoRandom(i + 8) - .5) * 3}%`, top: `${10 + Math.floor(i / 4) * 13 + (pseudoRandom(i + 18) - .5) * 3}%`, background: i % 4 === 0 ? colors[1] : colors[0] }} />)}
      <span className="pixel-center" style={{ background: colors[1] }} /><span className="pixel-stem" style={{ background: leaf }} /><span className="pixel-leaf left" style={{ background: leaf }} /><span className="pixel-leaf right" style={{ background: leaf }} />
    </div>
  </div>;
}

function FlowerCard({ flower, active, onClick, palette }) {
  return (
    <button className={`flower-card ${active ? "is-selected" : ""}`} onClick={onClick}>
      <span className="flower-card-check">{active ? <Check size={12} /> : ""}</span>
      <span className="flower-card-art"><FlowerIllustration flower={flower.id} palette={palette} scale={flower.kind === "pixel" ? 0.9 : 0.82} /></span>
      <span className="flower-card-name">{flower.label}</span>
    </button>
  );
}

function PatternBackground({ wrap }) {
  const pattern = wrap.pattern;
  return (
    <div className={`pattern-bg pattern-${pattern || "plain"}`} style={{ "--paper": wrap.bg }}>
      {pattern === "newspaper" && (
        <div className="newspaper-text">
          <span>love letter</span>
          <span>for you</span>
          <span>flowers &amp; feelings</span>
          <span>made with care</span>
        </div>
      )}
    </div>
  );
}

function WrapSwatch({ wrap, active, onClick }) {
  return (
    <button className={`wrap-card ${active ? "is-selected" : ""}`} onClick={onClick}>
      <span className="wrap-preview">
        <PatternBackground wrap={wrap} />
      </span>
      <span>{wrap.label}</span>
    </button>
  );
}

function RibbonBow({ color }) {
  return (
    <div className="ribbon-bow" style={{ "--ribbon": color }}>
      <span className="bow-loop bow-left" />
      <span className="bow-loop bow-right" />
      <span className="bow-knot" />
      <span className="bow-tail tail-left" />
      <span className="bow-tail tail-right" />
    </div>
  );
}

function getStemPosition(i, n, style) {
  const spread = 150;

  if (style === "wild") {
    const r1 = pseudoRandom(i * 3.1 + 2);
    const r2 = pseudoRandom(i * 7.7 + 1);
    return {
      offset: (r1 - 0.5) * spread * 1.25,
      lift: 55 + r2 * 100,
      rotate: (r1 - 0.5) * 34,
    };
  }

  if (style === "cascade") {
    const main = Math.max(Math.ceil(n * 0.6), 1);
    if (i < main) {
      const offset = main > 1 ? (i / (main - 1) - 0.5) * spread * 0.78 : 0;
      return { offset, lift: 100 - Math.abs(offset) * 0.25, rotate: offset * 0.08 };
    }
    const j = i - main;
    return {
      offset: (j - 1) * 34,
      lift: 84 - j * 35,
      rotate: (j - 1) * 8,
    };
  }

  if (style === "formal") {
    const cols = Math.min(n, 5);
    const row = Math.floor(i / cols);
    const col = i % cols;
    const count = Math.min(cols, n - row * cols);
    const offset = count > 1 ? (col / (count - 1) - 0.5) * spread : 0;
    return { offset, lift: 70 + row * 34, rotate: 0 };
  }

  const offset = n > 1 ? (i / (n - 1) - 0.5) * spread : 0;
  return {
    offset,
    lift: 78 - Math.abs(offset) * 0.23,
    rotate: offset * 0.1,
  };
}

function BouquetPreview({ selected, ribbon, wrap, size, arrangement, palette }) {
  const wrapObj = WRAPS.find((w) => w.id === wrap) || WRAPS[0];
  const ribbonObj = RIBBONS.find((r) => r.id === ribbon) || RIBBONS[0];

  const stems = useMemo(() => {
    const output = [];
    selected.forEach((id, flowerIndex) => {
      const flower = FLOWERS.find((f) => f.id === id);
      if (!flower) return;

      if (flower.kind === "pixel") {
        output.push({ type: id, color: flower.color, index: output.length });
        return;
      }

      const count = size === "large" ? 3 : size === "medium" ? 2 : 1;
      for (let i = 0; i < count; i++) {
        output.push({ type: id, color: flower.color, index: output.length, flowerIndex });
      }
    });
    return output;
  }, [selected, size]);

  return (
    <div className={`bouquet-stage bouquet-${size}`}>
      <div className="stage-glow" />
      <div className="floating-petals">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${8 + pseudoRandom(i + 31) * 84}%`,
              top: `${10 + pseudoRandom(i + 42) * 68}%`,
              animationDelay: `${pseudoRandom(i + 2) * 4}s`,
              transform: `rotate(${pseudoRandom(i + 8) * 140}deg)`,
            }}
          />
        ))}
      </div>

      <div className="bouquet-paper">
        <PatternBackground wrap={wrapObj} />
        <div className="paper-fold fold-left" />
        <div className="paper-fold fold-right" />
        <div className="paper-edge" />
      </div>

      <div className="bouquet-stems">
        {stems.length === 0 && (
          <div className="empty-bouquet">
            <Flower2 size={24} />
            <span>choose a few flowers<br />and let them gather here</span>
          </div>
        )}

        {stems.map((stem, i) => {
          const pos = getStemPosition(i, stems.length, arrangement);
          return (
            <div
              key={`${stem.type}-${i}`}
              className="bouquet-flower"
              style={{
                left: `calc(50% + ${pos.offset}px)`,
                bottom: `${pos.lift}px`,
                transform: `translateX(-50%) rotate(${pos.rotate}deg)`,
                animationDelay: `${i * 80}ms`,
                zIndex: 30 + i,
              }}
            >
              <FlowerIllustration flower={stem.type} palette={palette} scale={stem.type.startsWith("pixel") ? 0.95 : 1.18} />
            </div>
          );
        })}
      </div>

      <div className="bouquet-ribbon-wrap">
        <RibbonBow color={ribbonObj.hex} />
      </div>

      <div className="bouquet-tag">
        <span>for you</span>
        <HeartDoodle style="tiny" size={12} color="#B65E76" />
      </div>
    </div>
  );
}

function SectionTitle({ number, children, subtitle }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{number} · little ritual</span>
        <h2>{children}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <span className="title-flower">✿</span>
    </div>
  );
}

function FairyLights() {
  return (
    <div className="fairy-lights" aria-hidden="true">
      <div className="fairy-wire" />
      {Array.from({ length: 17 }).map((_, i) => (
        <span
          key={i}
          className="fairy-bulb"
          style={{
            left: `${3 + i * 5.9}%`,
            top: `${22 + Math.sin(i * 0.72) * 3.5}%`,
            animationDelay: `${(i % 6) * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingDecorations() {
  return (
    <div className="floating-decorations" aria-hidden="true">
      {FLOATERS.map((item, i) => (
        <span
          key={i}
          className={`floater floater-${item.type}`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.type === "heart" ? (
            <HeartDoodle
              style={HEART_STYLES[item.style]}
              size={12 + item.style * 2}
              color={["#D47D91", "#A98AC0", "#E1A15D", "#9A9E83"][i % 4]}
            />
          ) : item.type === "spark" ? "✦" : "⌁"}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(["daisy", "rose", "pixel-daisy"]);
  const [ribbon, setRibbon] = useState("blush");
  const [wrap, setWrap] = useState("tiny-floral");
  const [size, setSize] = useState("medium");
  const [arrangement, setArrangement] = useState("round");
  const [note, setNote] = useState("");
  const [assembled, setAssembled] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [heartStyle, setHeartStyle] = useState("classic");
  const [flowerPalette, setFlowerPalette] = useState("garden");

  const addNoteAccessory = (accessory) => {
    setNote((current) => {
      const addition = `${current ? " " : ""}${accessory}`;
      return (current + addition).slice(0, 200);
    });
  };

  const toggleFlower = (id) => {
    setAssembled(false);
    setSelected((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  };

  const reset = () => {
    setSelected(["daisy", "rose", "pixel-daisy"]);
    setRibbon("blush");
    setWrap("tiny-floral");
    setSize("medium");
    setArrangement("round");
    setNote("");
    setAssembled(false);
    setShareUrl("");
  };

  const wrapItUp = () => {
    setAssembled(true);
    const payload = { selected, ribbon, wrap, size, arrangement, note };
    const token = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).slice(0, 24);
    setShareUrl(`https://jhilmiil.app/b/${token}`);
    setCopied(false);
  };

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    "a bouquet for you, from jhilmiil"
  )}&body=${encodeURIComponent(
    (note ? `${note}\n\n` : "") + `open your bouquet here: ${shareUrl}`
  )}`;

  const qrSrc = shareUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}`
    : "";

  return (
    <main className="site-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display:ital@0;1&family=Patrick+Hand&display=swap');

        :root {
          --cream: #FFF8F0;
          --paper: #F7E8DD;
          --blush: #EFC9CC;
          --rose: #C9798D;
          --rose-dark: #8E5366;
          --plum: #5D4A5E;
          --sage: #A9B99A;
          --sage-dark: #687C62;
          --lavender: #CBB9D9;
          --blue: #B9D2DF;
          --butter: #F0D88B;
          --ink: #574A50;
          --muted: #927E82;
          --line: rgba(117, 89, 95, .18);
          --shadow: 0 18px 50px rgba(107, 74, 80, .10);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: var(--cream);
          color: var(--ink);
          font-family: "DM Sans", system-ui, sans-serif;
        }
        button, textarea { font: inherit; }
        button { cursor: pointer; }
        button:focus-visible, textarea:focus-visible {
          outline: 2px solid var(--rose);
          outline-offset: 3px;
        }

        .site-shell {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 12% 18%, rgba(239,201,204,.42), transparent 24rem),
            radial-gradient(circle at 90% 35%, rgba(203,185,217,.25), transparent 25rem),
            linear-gradient(180deg, #FFF9F2 0%, #FFF5EE 55%, #FDF2EA 100%);
        }

        .hero {
          position: relative;
          min-height: 650px;
          padding: 24px clamp(20px, 5vw, 72px) 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          background:
            radial-gradient(circle at 50% 58%, rgba(255,226,168,.98) 0 4.5rem, rgba(255,186,128,.42) 4.6rem 10rem, transparent 10.1rem),
            radial-gradient(ellipse at 50% 100%, #66714f 0 18%, #4f5d47 19% 30%, transparent 31%),
            linear-gradient(180deg, #e99a9b 0%, #f5b08d 34%, #ffd09a 57%, #d88d83 75%, #59664d 100%);
        }

        .hero:before {
          content: "♡  ♥  ♡  ♥  ♡";
          position: absolute;
          left: 0; right: 0; bottom: 27%;
          color: rgba(255,244,238,.72);
          font-size: clamp(24px, 4vw, 48px);
          letter-spacing: clamp(12px, 3vw, 38px);
          text-shadow: 0 3px 10px rgba(108,61,66,.18);
          pointer-events: none;
          z-index: 1;
        }
        .hero:after {
          content: "✿   ♡   ❀   ♥   ✿   ♡   ❀";
          position: absolute;
          left: 0; right: 0; bottom: 4%;
          color: rgba(244,231,195,.88);
          font-size: clamp(18px, 2.5vw, 30px);
          letter-spacing: clamp(8px, 2vw, 24px);
          text-shadow: 0 2px 5px rgba(43,54,38,.35);
          pointer-events: none;
          z-index: 1;
        }

        .hero-nav {
          position: absolute;
          top: 22px;
          left: clamp(20px, 5vw, 72px);
          right: clamp(20px, 5vw, 72px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 5;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 9px;
          color: var(--rose-dark);
        }
        .brand-mark {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(142,83,102,.25);
          border-radius: 50%;
          background: rgba(255,255,255,.45);
          font-size: 18px;
        }
        .brand-name {
          font-family: "DM Serif Display", serif;
          font-size: 23px;
          letter-spacing: .01em;
        }
        .brand-sub {
          display: block;
          font-size: 8px;
          letter-spacing: .22em;
          text-transform: uppercase;
          opacity: .65;
          margin-top: -2px;
        }
        .nav-note {
          font-family: "Patrick Hand", cursive;
          color: var(--rose-dark);
          font-size: 18px;
          transform: rotate(-3deg);
        }

        .hero-copy { position: relative; z-index: 3; max-width: 760px; margin-top: 45px; }
        .hero-kicker {
          font-size: 11px;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: var(--rose-dark);
          margin-bottom: 14px;
        }
        .hero h1 {
          margin: 0;
          font-family: "DM Serif Display", serif;
          font-size: clamp(56px, 10vw, 112px);
          line-height: .88;
          font-weight: 400;
          color: var(--plum);
          letter-spacing: -.04em;
        }
        .hero h1 em {
          color: var(--rose);
          font-weight: 400;
        }
        .hero-copy p {
          max-width: 520px;
          margin: 24px auto 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.75;
        }
        .hero-button {
          margin-top: 28px;
          border: 1px solid var(--rose-dark);
          background: var(--rose-dark);
          color: #FFF8F0;
          border-radius: 999px;
          padding: 12px 20px;
          display: inline-flex;
          gap: 8px;
          align-items: center;
          box-shadow: 0 10px 25px rgba(142,83,102,.15);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .hero-button:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(142,83,102,.2); }


        .hero-awaits {
          margin-top: 13px;
          color: var(--rose-dark);
          font-family: "Patrick Hand", cursive;
          font-size: clamp(19px, 2.7vw, 27px);
          transform: rotate(-2deg);
          text-shadow: 0 2px 8px rgba(255,255,255,.32);
        }

        .fairy-lights {
          position: absolute;
          left: 5%;
          right: 5%;
          top: 12%;
          height: 70px;
          z-index: 2;
          pointer-events: none;
          filter: drop-shadow(0 5px 12px rgba(255,214,142,.22));
        }

        .fairy-wire {
          position: absolute;
          left: 0;
          right: 0;
          top: 27px;
          height: 3px;
          border-radius: 50%;
          background: rgba(82,64,61,.48);
          transform: rotate(-1.2deg);
        }

        .fairy-bulb {
          position: absolute;
          width: 9px;
          height: 14px;
          border-radius: 55% 55% 50% 50%;
          background: #FFF0A8;
          box-shadow: 0 0 7px rgba(255,235,153,.95), 0 0 18px rgba(255,211,122,.62), inset 1px 1px 2px rgba(255,255,255,.85);
          animation: fairyGlow 1.9s ease-in-out infinite;
        }

        .fairy-bulb:before {
          content: "";
          position: absolute;
          width: 5px;
          height: 4px;
          left: 2px;
          top: -3px;
          border-radius: 2px 2px 1px 1px;
          background: #4F4B46;
        }

        @keyframes fairyGlow {
          0%, 100% { opacity: .72; transform: scale(.9); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        .floating-decorations { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
        .floater {
          position: absolute;
          opacity: .7;
          animation: drift 5s ease-in-out infinite;
        }
        .floater-petal { font-size: 28px; color: #C9959D; transform: rotate(28deg); }
        .floater-spark { color: #B79C72; font-size: 20px; }
        @keyframes drift {
          0%, 100% { translate: 0 0; rotate: 0deg; }
          50% { translate: 8px -14px; rotate: 8deg; }
        }

        .builder {
          width: min(1180px, calc(100% - 32px));
          margin: -35px auto 0;
          position: relative;
          z-index: 8;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, .95fr);
          gap: 22px;
          align-items: start;
        }

        .panel {
          background: rgba(255,250,246,.82);
          border: 1px solid rgba(117,89,95,.13);
          box-shadow: var(--shadow);
          backdrop-filter: blur(14px);
          border-radius: 28px;
        }
        .controls { padding: clamp(20px, 3vw, 32px); }
        .preview-panel { padding: 14px; position: sticky; top: 18px; }

        .section { padding: 0 0 25px; margin-bottom: 25px; border-bottom: 1px dashed rgba(117,89,95,.18); }
        .section:last-child { border-bottom: 0; margin-bottom: 0; padding-bottom: 0; }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 16px;
        }
        .section-title h2 {
          margin: 2px 0 4px;
          font-family: "DM Serif Display", serif;
          font-size: 27px;
          line-height: 1;
          font-weight: 400;
          color: var(--plum);
        }
        .section-title p { margin: 0; color: var(--muted); font-size: 12px; }
        .eyebrow {
          color: var(--rose);
          font-size: 9px;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .title-flower { color: var(--rose); font-size: 21px; opacity: .7; }

        .flower-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 9px;
        }
        .flower-card {
          position: relative;
          min-width: 0;
          min-height: 122px;
          border: 1px solid rgba(117,89,95,.13);
          border-radius: 18px;
          background: #FFF9F4;
          padding: 8px 5px 9px;
          color: var(--ink);
          transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
        }
        .flower-card:hover { transform: translateY(-3px); box-shadow: 0 10px 22px rgba(117,89,95,.09); }
        .flower-card.is-selected {
          border-color: rgba(201,121,141,.75);
          box-shadow: inset 0 0 0 2px rgba(201,121,141,.12), 0 9px 22px rgba(201,121,141,.10);
          background: #FFF6F2;
        }
        .flower-card-check {
          position: absolute;
          right: 7px;
          top: 7px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: white;
          background: var(--rose);
          font-size: 10px;
          opacity: 0;
        }
        .flower-card.is-selected .flower-card-check { opacity: 1; }
        .flower-card-art {
          height: 82px;
          display: grid;
          place-items: center;
          overflow: visible;
        }
        .flower-card-name {
          display: block;
          font-size: 10px;
          letter-spacing: .01em;
          color: #7A6870;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }


        .palette-picker { margin: -4px 0 18px; padding: 14px; border: 1px solid rgba(120,95,100,.13); border-radius: 18px; background: rgba(255,252,247,.72); }
        .palette-heading { display:flex; justify-content:space-between; gap:12px; align-items:baseline; margin-bottom:10px; }
        .palette-heading strong { font-family: Georgia,serif; font-size:14px; text-transform:lowercase; }
        .palette-heading span { font-size:10px; color:#8d7d80; }
        .palette-options { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
        .palette-option { border:1px solid rgba(110,85,90,.13); background:#fffdfa; border-radius:13px; padding:9px; display:flex; align-items:center; gap:8px; text-align:left; cursor:pointer; transition:.2s ease; }
        .palette-option:hover { transform:translateY(-1px); border-color:rgba(130,90,100,.3); }
        .palette-option.is-selected { border-color:#9c6875; box-shadow:0 0 0 2px rgba(156,104,117,.11); background:#fff8f4; }
        .palette-dots { display:grid; grid-template-columns:repeat(2,12px); gap:3px; flex:none; }
        .palette-dots i { width:12px; height:12px; border-radius:50%; display:block; box-shadow:inset 0 0 0 1px rgba(60,40,40,.08); }
        .palette-option b { display:block; font-size:10px; line-height:1.2; }
        .palette-option small { display:block; font-size:8px; color:#9b898c; margin-top:2px; }
        .flower-art { isolation:isolate; }
        .flower-head {
          filter: saturate(1.08) drop-shadow(0 3px 3px rgba(78,55,60,.10));
        }

        .flower-art .stem::after {
          content: "";
          position: absolute;
          left: 1px;
          top: 2px;
          width: 1px;
          height: 88%;
          border-radius: 999px;
          background: rgba(255,255,255,.28);
        }
        .flower-art .petal { border:1px solid rgba(105,65,70,.07); box-shadow: inset -2px -4px 5px rgba(70,45,50,.11), inset 2px 2px 4px rgba(255,255,255,.28); }
        .flower-art .flower-core { box-shadow: inset 0 1px 2px rgba(255,255,255,.35), 0 2px 4px rgba(65,45,45,.18); }
        .flower-inner i { box-shadow: inset -1px -2px 2px rgba(75,45,50,.08); }
        @media (max-width: 700px) { .palette-options { grid-template-columns:1fr; } .palette-heading { flex-direction:column; gap:3px; } }
        .flower-art {
          position: relative;
          width: 102px;
          height: 104px;
          transform-origin: center bottom;
          filter: drop-shadow(0 7px 5px rgba(79,64,67,.10));
        }
        .flower-head {
          position: absolute;
          left: 50%;
          top: 12px;
          width: 68px;
          height: 68px;
          transform: translateX(-50%);
        }
        .petal {
          position: absolute;
          width: 19px;
          height: 32px;
          left: 50%;
          top: 50%;
          transform-origin: 50% 88%;
          transform:
            translate(-50%, -88%)
            rotate(calc(var(--i) * 1turn / var(--n)))
            rotate(var(--wobble))
            translateY(-18px);
          border-radius: 70% 55% 72% 45%;
          background:
            radial-gradient(circle at 38% 28%, rgba(255,255,255,.82), transparent 22%),
            linear-gradient(135deg, rgba(255,255,255,.18), var(--flower) 62%, var(--accent));
          box-shadow:
            inset -3px -5px 5px rgba(85,55,62,.14),
            inset 2px 2px 4px rgba(255,255,255,.22),
            0 1px 2px rgba(80,52,58,.08);
        }

        .flower-art .petal::after {
          content: "";
          position: absolute;
          left: 24%;
          top: 13%;
          width: 28%;
          height: 38%;
          border-radius: 70% 40% 65% 35%;
          background: rgba(255,255,255,.22);
          filter: blur(.5px);
          transform: rotate(-18deg);
        }
        .flower-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 19px;
          height: 19px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(circle at 35% 30%, #FFF3C8 0 10%, transparent 11%),
            radial-gradient(circle, var(--accent) 20%, #7D5540 75%);
          box-shadow: 0 1px 2px rgba(73,47,50,.22);
        }
        .flower-inner {
          position: absolute;
          inset: 14px;
          pointer-events: none;
        }
        .flower-inner i {
          position: absolute;
          width: 10px;
          height: 16px;
          border-radius: 60% 40% 65% 45%;
          background: color-mix(in srgb, var(--flower) 70%, white);
          left: 50%;
          top: 50%;
          transform-origin: 50% 85%;
          transform: translate(-50%, -85%) rotate(calc(var(--i) * 51deg)) translateY(-8px);
        }
        .flower-inner i:nth-child(1) { --i: 1; }
        .flower-inner i:nth-child(2) { --i: 2; }
        .flower-inner i:nth-child(3) { --i: 3; }
        .flower-inner i:nth-child(4) { --i: 4; }
        .flower-inner i:nth-child(5) { --i: 5; }
        .flower-inner i:nth-child(6) { --i: 6; }
        .flower-inner i:nth-child(7) { --i: 7; }

        .stem {
          position: absolute;
          width: 5px;
          height: 52px;
          left: 50%;
          top: 59px;
          transform: translateX(-50%) rotate(1deg);
          transform-origin: top center;
          border-radius: 99px;
          background: linear-gradient(90deg, #66805D, #A2B18C 52%, #4E694C);
        }
        .leaf {
          position: absolute;
          width: 25px;
          height: 12px;
          top: 69px;
          background: linear-gradient(135deg, #9CAF82, #587454);
          border-radius: 100% 0 100% 0;
          box-shadow: inset -2px -1px 2px rgba(43,67,42,.18);
        }
        .leaf-a { left: 12px; transform: rotate(-28deg); }
        .leaf-b { right: 12px; transform: scaleX(-1) rotate(-22deg); }

        .rose-art .petal, .peony-art .petal {
          border-radius: 55% 72% 48% 72%;
          width: 20px;
          height: 20px;
          transform: translate(-50%, -50%) rotate(calc(var(--i) * 1turn / var(--n))) translateY(-16px);
        }
        .rose-art .flower-core, .peony-art .flower-core { background: var(--accent); }
        .sunflower-art .petal {
          width: 11px;
          height: 30px;
          border-radius: 80% 80% 30% 30%;
          transform: translate(-50%, -85%) rotate(calc(var(--i) * 1turn / var(--n))) translateY(-19px);
        }
        .hydrangea-art .petal {
          width: 19px;
          height: 19px;
          border-radius: 48% 52% 48% 52%;
          transform: translate(-50%, -50%) rotate(calc(var(--i) * 1turn / var(--n))) translateY(-18px);
        }
        .tulip-art .petal {
          width: 25px;
          height: 34px;
          border-radius: 65% 65% 42% 42%;
          transform: translate(-50%, -85%) rotate(calc(var(--i) * 1turn / var(--n))) translateY(-14px);
        }
        .lily-art .petal {
          width: 14px;
          height: 34px;
          border-radius: 70% 70% 35% 35%;
          transform: translate(-50%, -85%) rotate(calc(var(--i) * 1turn / var(--n))) translateY(-18px);
        }
        .forget-art .flower-core { width: 9px; height: 9px; background: #E8D3A7; }
        .gerbera-art .petal { width: 10px; height: 25px; }
        .calla-art { width: 72px; }
        .calla-bloom {
          position: absolute;
          left: 50%;
          top: 13px;
          width: 46px;
          height: 61px;
          transform: translateX(-50%) rotate(-8deg);
          border-radius: 55% 55% 55% 18%;
          background: linear-gradient(130deg, #FFFDF1, #EEE4C2);
          box-shadow: inset -4px -4px 5px rgba(118,94,50,.12);
        }
        .calla-bloom:after {
          content: "";
          position: absolute;
          width: 9px;
          height: 37px;
          right: 9px;
          top: 14px;
          border-radius: 999px;
          background: #C7A867;
          transform: rotate(-8deg);
        }
        .calla-leaf { position: absolute; width: 28px; height: 54px; top: 40px; background: linear-gradient(135deg,#9FB48D,#567054); border-radius: 100% 0 100% 0; }
        .calla-leaf.leaf-a { left: 5px; transform: rotate(-25deg); }
        .calla-leaf.leaf-b { right: 4px; transform: scaleX(-1) rotate(-20deg); }

        .lavender-art .lavender-stem { position:absolute; width:4px; height:72px; left:45%; top:13px; background:#69825B; border-radius:99px; transform:rotate(-6deg); }
        .lavender-bud { position:absolute; width:14px; height:8px; border-radius:8px 8px 3px 8px; background:linear-gradient(90deg,#A88ACD,#765B9A); }
        .lavender-art .leaf-a { top:62px; left:17px; }
        .lavender-art .leaf-b { top:52px; right:10px; }

        .baby-art .baby-stem { position:absolute; width:3px; height:70px; left:49%; top:12px; background:#81936F; }
        .baby-flower { position:absolute; font-size:14px; color:#F8F4E9; text-shadow:0 1px 1px #BEB8A9; }

        .pixel-flower { width:72px; height:76px; image-rendering: pixelated; }
        .pixel-canvas { position:relative; width:72px; height:76px; }
        .pixel-block { position:absolute; width:10px; height:10px; box-shadow: 3px 0 0 rgba(255,255,255,.25); }
        .pixel-center { position:absolute; width:10px; height:10px; left:31px; top:27px; }
        .pixel-stem { position:absolute; width:6px; height:36px; left:34px; top:36px; }
        .pixel-leaf { position:absolute; width:14px; height:8px; top:54px; }
        .pixel-leaf.left { left:22px; transform:skewX(-35deg); }
        .pixel-leaf.right { left:39px; transform:skewX(35deg); }

        .pixel-section {
          margin-top: 13px;
          padding: 13px;
          border-radius: 20px;
          background: #F6E9E6;
          border: 1px dashed rgba(117,89,95,.18);
        }
        .pixel-title {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:10px;
        }
        .pixel-title strong { font-family:"DM Serif Display",serif; font-weight:400; font-size:18px; color:var(--plum); }
        .pixel-title span { font-size:10px; color:var(--muted); }
        .pixel-row { display:grid; grid-template-columns:repeat(6,1fr); gap:6px; }
        .pixel-choice {
          border:1px solid transparent;
          border-radius:13px;
          background:#FFF9F4;
          padding:4px;
          color:var(--muted);
          font-size:8px;
        }
        .pixel-choice.active { border-color:var(--rose); background:#FFF3F0; }
        .pixel-choice .pixel-flower { width:45px; height:48px; margin:auto; transform:scale(.68); transform-origin:center; }
        .pixel-choice .pixel-canvas { transform:scale(.72); transform-origin:top left; }

        .option-row { display:flex; flex-wrap:wrap; gap:7px; }
        .pill {
          border:1px solid rgba(117,89,95,.18);
          background:#FFF9F4;
          color:var(--muted);
          border-radius:999px;
          padding:8px 11px;
          font-size:11px;
          transition:.2s ease;
        }
        .pill:hover { transform:translateY(-1px); border-color:var(--rose); }
        .pill.active { background:var(--rose-dark); color:#FFF8F0; border-color:var(--rose-dark); }

        .ribbon-grid { display:flex; gap:11px; flex-wrap:wrap; }
        .ribbon-choice { background:none; border:0; color:var(--muted); font-size:9px; display:flex; flex-direction:column; align-items:center; gap:5px; }
        .ribbon-dot { width:32px; height:32px; border-radius:50%; border:2px solid transparent; box-shadow:0 2px 7px rgba(70,50,50,.1); }
        .ribbon-choice.active .ribbon-dot { border-color:var(--plum); box-shadow:0 0 0 3px rgba(201,121,141,.14); }

        .wrap-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; }
        .wrap-card {
          border:1px solid rgba(117,89,95,.14);
          background:#FFF9F4;
          border-radius:15px;
          padding:5px;
          color:var(--muted);
          font-size:9px;
          transition:.2s ease;
        }
        .wrap-card:hover { transform:translateY(-2px); }
        .wrap-card.is-selected { border-color:var(--rose); box-shadow:0 0 0 2px rgba(201,121,141,.1); }
        .wrap-preview { display:block; height:50px; overflow:hidden; border-radius:10px; margin-bottom:5px; }
        .pattern-bg { width:100%; height:100%; background-color:var(--paper); position:relative; overflow:hidden; }
        .pattern-hearts {
          background-color:var(--paper);
          background-image: radial-gradient(circle at 20% 25%, #B9677C 0 3px, transparent 4px), radial-gradient(circle at 24% 21%, #B9677C 0 3px, transparent 4px);
          background-size:26px 26px;
        }
        .pattern-hearts:after { content:"♡  ♥  ♡  ♥"; position:absolute; inset:0; font-size:16px; letter-spacing:8px; line-height:28px; color:#B9677C; opacity:.55; }
        .pattern-flowers:after { content:"✿  ✿  ❀  ✿"; position:absolute; inset:-4px; color:#C9798D; font-size:14px; line-height:25px; letter-spacing:7px; opacity:.6; transform:rotate(-5deg); }
        .pattern-leaves:after { content:"⌁  ❧  ⌁  ❧"; position:absolute; inset:0; color:#718467; font-size:19px; line-height:27px; letter-spacing:7px; opacity:.55; transform:rotate(-8deg); }
        .pattern-bows:after { content:"୨୧   ୨୧   ୨୧"; position:absolute; inset:0; color:#876A9D; font-size:14px; line-height:25px; opacity:.62; }
        .pattern-gingham {
          background-image:
            linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px),
            linear-gradient(rgba(170,90,110,.12) 50%, transparent 50%),
            linear-gradient(90deg, rgba(170,90,110,.12) 50%, transparent 50%);
          background-size:12px 12px;
        }
        .pattern-daisy:after { content:"✿   ❀   ✿"; position:absolute; inset:0; color:#5B86A4; font-size:15px; line-height:28px; letter-spacing:6px; opacity:.7; }
        .pattern-cherry:after { content:"● ●   ● ●   ● ●"; position:absolute; inset:0; color:#B44B55; font-size:13px; line-height:26px; letter-spacing:5px; opacity:.7; }
        .pattern-petals:after { content:"❁   ˚   ❀   ˚"; position:absolute; inset:0; color:#9C6685; font-size:14px; line-height:25px; letter-spacing:6px; opacity:.62; }
        .pattern-newspaper { background:#EEE7D8; }
        .newspaper-text { position:absolute; inset:0; display:grid; grid-template-columns:1fr 1fr; gap:3px; padding:5px; color:#766B64; opacity:.55; font-family:Georgia,serif; font-size:8px; }
        .newspaper-text span:nth-child(1) { font-size:11px; transform:rotate(-5deg); }
        .pattern-grid { background-image:linear-gradient(rgba(155,98,79,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(155,98,79,.22) 1px, transparent 1px); background-size:12px 12px; }
        .pattern-butterfly:after { content:"ʚɞ   ʚɞ   ʚɞ"; position:absolute; inset:0; color:#896E9E; font-size:15px; line-height:26px; letter-spacing:4px; opacity:.6; }
        .pattern-speckles { background-image:radial-gradient(rgba(95,72,55,.25) 1px, transparent 1.5px); background-size:9px 9px; }
        .pattern-plain { background:var(--paper); }

        .heart-style-row { display:flex; gap:7px; flex-wrap:wrap; }
        .heart-choice {
          width:40px;
          height:40px;
          border-radius:50%;
          border:1px solid rgba(117,89,95,.15);
          background:#FFF9F4;
          display:grid;
          place-items:center;
        }
        .heart-choice.active { border-color:var(--rose); background:#FBEAEC; }

        .note-box {
          background:#F7EAD2;
          border:1px solid #E5D2AC;
          border-radius:18px;
          padding:13px 15px;
          box-shadow:inset 0 1px rgba(255,255,255,.65);
        }
        .note-box textarea {
          width:100%;
          min-height:94px;
          resize:vertical;
          border:0;
          outline:0;
          background:transparent;
          color:var(--plum);
          font-family:"Patrick Hand",cursive;
          font-size:21px;
          line-height:1.35;
        }
        .note-box textarea::placeholder { color:#A49382; }


        .note-accessories {
          margin-top: 11px;
          padding: 11px 12px 12px;
          border-radius: 16px;
          background: rgba(255,249,244,.82);
          border: 1px dashed rgba(117,89,95,.18);
        }
        .note-accessories-heading {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 9px;
        }
        .note-accessories-heading span {
          font-family: "DM Serif Display", serif;
          font-size: 16px;
          color: var(--plum);
        }
        .note-accessories-heading small { font-size: 8px; color: var(--muted); }
        .accessory-row { display: flex; flex-wrap: wrap; gap: 5px; }
        .accessory-choice {
          width: 35px;
          height: 35px;
          padding: 0;
          display: grid;
          place-items: center;
          border: 1px solid rgba(117,89,95,.13);
          border-radius: 11px;
          background: #FFFDF9;
          font-size: 18px;
          line-height: 1;
          transition: transform .18s ease, background .18s ease, border-color .18s ease;
        }
        .accessory-choice:hover {
          transform: translateY(-2px) rotate(-2deg);
          background: #FFF5F0;
          border-color: rgba(201,121,141,.55);
        }

        .wrap-button {
          width:100%;
          border:0;
          border-radius:999px;
          background:var(--rose-dark);
          color:#FFF8F0;
          padding:13px 18px;
          display:flex;
          justify-content:center;
          align-items:center;
          gap:8px;
          box-shadow:0 12px 25px rgba(142,83,102,.16);
          transition:.25s ease;
        }
        .wrap-button:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 16px 30px rgba(142,83,102,.2); }
        .wrap-button:disabled { opacity:.4; cursor:not-allowed; }

        .preview-heading {
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:10px 10px 0;
        }
        .preview-heading h2 { margin:0; font-family:"DM Serif Display",serif; font-size:29px; font-weight:400; color:var(--plum); }
        .preview-heading p { margin:2px 0 0; color:var(--muted); font-size:10px; }
        .reset-button {
          border:1px solid var(--line);
          background:#FFF9F4;
          color:var(--muted);
          border-radius:50%;
          width:36px;
          height:36px;
          display:grid;
          place-items:center;
        }

        .bouquet-stage {
          position:relative;
          min-height:540px;
          margin-top:8px;
          overflow:hidden;
          border-radius:23px;
          background:
            radial-gradient(circle at 50% 36%, rgba(255,255,255,.88), transparent 13rem),
            linear-gradient(180deg,#F7E2DD,#F4E8DE);
        }
        .stage-glow {
          position:absolute;
          width:280px;
          height:280px;
          left:50%;
          top:28%;
          transform:translate(-50%,-50%);
          border-radius:50%;
          background:rgba(255,255,255,.45);
          filter:blur(12px);
          animation: glow 5s ease-in-out infinite;
        }
        @keyframes glow { 0%,100% { opacity:.5; transform:translate(-50%,-50%) scale(1); } 50% { opacity:.8; transform:translate(-50%,-50%) scale(1.05); } }

        .floating-petals { position:absolute; inset:0; pointer-events:none; }
        .floating-petals span {
          position:absolute;
          width:9px;
          height:15px;
          border-radius:80% 20% 70% 40%;
          background:#D998A7;
          opacity:.35;
          animation: petalFloat 6s ease-in-out infinite;
        }
        @keyframes petalFloat {
          0%,100% { translate:0 0; opacity:.15; }
          50% { translate:15px -24px; opacity:.45; }
        }

        .bouquet-paper {
          position:absolute;
          left:50%;
          bottom:30px;
          width:184px;
          height:178px;
          transform:translateX(-50%);
          clip-path:polygon(7% 3%, 93% 3%, 77% 100%, 23% 100%);
          filter:drop-shadow(0 13px 13px rgba(79,61,64,.16));
          overflow:hidden;
          z-index:20;
        }
        .bouquet-paper .pattern-bg { position:absolute; inset:0; }
        .paper-fold {
          position:absolute;
          top:0;
          bottom:0;
          width:38%;
          background:rgba(255,255,255,.17);
          z-index:2;
        }
        .fold-left { left:-11%; transform:skewX(13deg); }
        .fold-right { right:-11%; transform:skewX(-13deg); }
        .paper-edge {
          position:absolute;
          left:10%;
          right:10%;
          bottom:0;
          height:4px;
          background:rgba(116,84,78,.13);
          border-radius:50%;
        }

        .bouquet-stems {
          position:absolute;
          inset:0;
          z-index:30;
        }
        .bouquet-flower {
          position:absolute;
          opacity:0;
          animation:bloomIn .55s cubic-bezier(.2,.8,.2,1) forwards;
          transform-origin:bottom center;
        }
        @keyframes bloomIn {
          from { opacity:0; translate:0 16px; scale:.72; }
          to { opacity:1; translate:0 0; scale:1; }
        }

        .bouquet-ribbon-wrap {
          position:absolute;
          left:50%;
          bottom:98px;
          transform:translateX(-50%);
          z-index:60;
        }
        .ribbon-bow { position:relative; width:110px; height:72px; }
        .bow-loop {
          position:absolute;
          top:13px;
          width:45px;
          height:35px;
          background:var(--ribbon);
          border:1px solid rgba(77,52,56,.12);
          box-shadow:inset 0 -5px 8px rgba(70,40,45,.12), 0 3px 5px rgba(70,40,45,.12);
        }
        .bow-left { left:6px; border-radius:80% 15% 75% 25%; transform:rotate(17deg); }
        .bow-right { right:6px; border-radius:15% 80% 25% 75%; transform:rotate(-17deg); }
        .bow-knot { position:absolute; left:42px; top:22px; width:27px; height:27px; border-radius:50%; background:var(--ribbon); box-shadow:inset 0 -4px 6px rgba(70,40,45,.13); z-index:3; }
        .bow-tail { position:absolute; top:37px; width:29px; height:34px; background:var(--ribbon); clip-path:polygon(0 0,100% 0,78% 100%,48% 78%,15% 100%); }
        .tail-left { left:20px; transform:rotate(12deg); }
        .tail-right { right:20px; transform:rotate(-12deg); }

        .bouquet-tag {
          position:absolute;
          right:18%;
          bottom:155px;
          z-index:70;
          background:#FFF8E9;
          color:var(--rose-dark);
          padding:8px 11px;
          display:flex;
          align-items:center;
          gap:5px;
          font-family:"Patrick Hand",cursive;
          font-size:16px;
          transform:rotate(7deg);
          box-shadow:0 6px 12px rgba(70,50,50,.1);
        }
        .bouquet-tag:before { content:""; position:absolute; width:7px; height:7px; border-radius:50%; background:#C2A48D; left:50%; top:-4px; transform:translateX(-50%); }

        .empty-bouquet {
          position:absolute;
          left:50%;
          bottom:190px;
          transform:translateX(-50%);
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:7px;
          color:#A18D8D;
          text-align:center;
          font-size:12px;
        }

        .preview-controls {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-top:10px;
        }
        .mini-control {
          padding:11px 13px;
          border-radius:17px;
          background:#FFF9F4;
          border:1px solid var(--line);
        }
        .mini-control strong { display:block; font-size:9px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); margin-bottom:8px; }
        .mini-options { display:flex; gap:5px; flex-wrap:wrap; }
        .mini-pill { border:1px solid var(--line); background:transparent; color:var(--muted); border-radius:999px; padding:6px 8px; font-size:9px; }
        .mini-pill.active { background:#F1D8DC; color:var(--rose-dark); border-color:#D69BA9; }

        .share-panel {
          margin-top:12px;
          padding:17px;
          border-radius:20px;
          background:#FFF9F4;
          border:1px solid var(--line);
          animation:shareIn .4s ease both;
        }
        @keyframes shareIn { from { opacity:0; translate:0 8px; } to { opacity:1; translate:0 0; } }
        .share-title { display:flex; gap:7px; align-items:center; font-family:"DM Serif Display",serif; color:var(--plum); font-size:19px; }
        .share-link {
          margin-top:10px;
          display:flex;
          gap:7px;
          align-items:center;
          padding:9px 10px;
          border-radius:999px;
          background:#F9EEE8;
          color:var(--muted);
          font-size:10px;
        }
        .share-link span { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1; }
        .copy-button { border:0; background:none; color:var(--rose-dark); font-size:10px; display:flex; gap:4px; align-items:center; }
        .share-bottom { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:12px; }
        .email-button { display:inline-flex; align-items:center; gap:6px; border:1px solid var(--line); border-radius:999px; padding:8px 11px; color:var(--plum); text-decoration:none; font-size:10px; }
        .qr-box { display:flex; align-items:center; gap:8px; color:var(--muted); font-size:9px; }
        .qr-box img { width:58px; height:58px; border-radius:8px; border:1px solid #E5D2AC; }

        .footer {
          text-align:center;
          padding:50px 20px 35px;
          color:var(--muted);
          font-size:10px;
          letter-spacing:.04em;
        }
        .footer-line { width:90px; height:1px; background:var(--line); margin:0 auto 13px; }
        .footer-script { font-family:"Patrick Hand",cursive; font-size:18px; color:var(--rose-dark); }

        @media (max-width: 980px) {
          .builder { grid-template-columns:1fr; }
          .preview-panel { position:relative; top:auto; }
        }
        @media (max-width: 640px) {
          .hero { min-height:580px; }
          .hero-nav .nav-note { display:none; }
          .builder { width:min(100% - 18px, 600px); margin-top:-25px; }
          .flower-grid { grid-template-columns:repeat(3,1fr); }
          .pixel-row { grid-template-columns:repeat(3,1fr); }
          .wrap-grid { grid-template-columns:repeat(3,1fr); }
          .preview-panel { padding:9px; }
          .bouquet-stage { min-height:490px; }
          .bouquet-paper { width:160px; height:170px; }
          .bouquet-flower { transform-origin:bottom center; }
          .bouquet-tag { right:9%; }
          .preview-controls { grid-template-columns:1fr; }
          .fairy-lights { left:2%; right:2%; top:10%; }
          .hero-awaits { font-size:19px; }
          .note-accessories-heading { flex-direction:column; gap:3px; }
          .accessory-choice { width:32px; height:32px; font-size:16px; }
        }
        @media (max-width: 430px) {
          .flower-grid { grid-template-columns:repeat(2,1fr); }
          .wrap-grid { grid-template-columns:repeat(3,1fr); }
          .hero h1 { font-size:55px; }
          .hero-copy p { font-size:13px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration:.001ms !important;
            animation-iteration-count:1 !important;
            scroll-behavior:auto !important;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-nav">
          <div className="brand">
            <span className="brand-mark">✿</span>
            <div>
              <div className="brand-name">jhilmiil</div>
              <span className="brand-sub">virtual flower house</span>
            </div>
          </div>
          <div className="nav-note">a little garden made for you ♡</div>
        </div>

        <FairyLights />
        <FloatingDecorations />

        <div className="hero-copy">
          <div className="hero-kicker">a little garden for someone you love</div>
          <h1>
            lets make<br />
            <em>a bouquet</em>
          </h1>
          <p>
            Pick flowers that feel like them, mix a few pixel blooms into the real ones,
            wrap everything in something beautiful, and send a little piece of your garden.
          </p>
          <div className="hero-awaits">your beautiful bouquet awaits you</div>
          <button className="hero-button" onClick={() => document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })}>
            <Sparkles size={15} /> start arranging
          </button>
        </div>
      </section>

      <div id="builder" className="builder">
        <section className="panel controls">
          <div className="section">
            <SectionTitle number="01" subtitle="mix soft, wild & pixel blooms">
              choose your flowers
            </SectionTitle>

            <div className="palette-picker">
              <div className="palette-heading"><strong>flower colour mood</strong><span>choose the palette for your garden</span></div>
              <div className="palette-options">
                {Object.entries(FLOWER_PALETTES).map(([id, option]) => (
                  <button key={id} className={`palette-option ${flowerPalette === id ? "is-selected" : ""}`} onClick={() => setFlowerPalette(id)}>
                    <span className="palette-dots"><i style={{ background: option.colors.rose[0] }} /><i style={{ background: option.colors.sunflower[0] }} /><i style={{ background: option.colors.lavender[0] }} /><i style={{ background: option.colors.tulip[0] }} /></span>
                    <span><b>{option.label}</b><small>{option.description}</small></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flower-grid">
              {FLOWERS.filter((f) => f.kind === "real").map((flower) => (
                <FlowerCard
                  key={flower.id}
                  flower={flower}
                  active={selected.includes(flower.id)}
                  onClick={() => toggleFlower(flower.id)}
                />
              ))}
            </div>

            <div className="pixel-section">
              <div className="pixel-title">
                <strong>pixel blooms</strong>
                <span>cute &amp; nostalgic</span>
              </div>
              <div className="pixel-row">
                {FLOWERS.filter((f) => f.kind === "pixel").map((flower) => (
                  <button
                    key={flower.id}
                    className={`pixel-choice ${selected.includes(flower.id) ? "active" : ""}`}
                    onClick={() => toggleFlower(flower.id)}
                  >
                    <PixelFlower type={flower.id} />
                    <span>{flower.label.replace("pixel ", "")}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="section">
            <SectionTitle number="02" subtitle="the shape changes the feeling">
              how it's gathered
            </SectionTitle>
            <div className="option-row">
              {ARRANGEMENTS.map((item) => (
                <button
                  key={item.id}
                  className={`pill ${arrangement === item.id ? "active" : ""}`}
                  onClick={() => { setArrangement(item.id); setAssembled(false); }}
                >
                  {item.emoji} {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <SectionTitle number="03" subtitle="tiny, just-right or overflowing">
              bouquet size
            </SectionTitle>
            <div className="option-row">
              {SIZES.map((item) => (
                <button
                  key={item}
                  className={`pill ${size === item ? "active" : ""}`}
                  onClick={() => { setSize(item); setAssembled(false); }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <SectionTitle number="04" subtitle="one final little bow">
              ribbon
            </SectionTitle>
            <div className="ribbon-grid">
              {RIBBONS.map((item) => (
                <button
                  key={item.id}
                  className={`ribbon-choice ${ribbon === item.id ? "active" : ""}`}
                  onClick={() => setRibbon(item.id)}
                >
                  <span className="ribbon-dot" style={{ background: item.hex }} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <SectionTitle number="05" subtitle="paper makes the whole thing feel like a gift">
              wrapping paper
            </SectionTitle>
            <div className="wrap-grid">
              {WRAPS.map((item) => (
                <WrapSwatch
                  key={item.id}
                  wrap={item}
                  active={wrap === item.id}
                  onClick={() => setWrap(item.id)}
                />
              ))}
            </div>
          </div>

          <div className="section">
            <SectionTitle number="06" subtitle="because one heart is never enough">
              little hearts
            </SectionTitle>
            <div className="heart-style-row">
              {HEART_STYLES.map((style) => (
                <button
                  key={style}
                  className={`heart-choice ${heartStyle === style ? "active" : ""}`}
                  onClick={() => setHeartStyle(style)}
                  aria-label={`heart style ${style}`}
                >
                  <HeartDoodle style={style} size={style === "sparkle" ? 17 : 18} />
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <SectionTitle number="07" subtitle="write something they can keep">
              a little note
            </SectionTitle>
            <div className="note-box">
              <textarea
                value={note}
                maxLength={200}
                onChange={(e) => setNote(e.target.value)}
                placeholder="write something sweet..."
              />
            </div>

            <div className="note-accessories">
              <div className="note-accessories-heading">
                <span>add a tiny extra</span>
                <small>tap anything you want in the note</small>
              </div>
              <div className="accessory-row">
                {NOTE_ACCESSORIES.map((accessory, i) => (
                  <button
                    key={`${accessory}-${i}`}
                    type="button"
                    className="accessory-choice"
                    onClick={() => addNoteAccessory(accessory)}
                    aria-label={`add ${accessory} to note`}
                  >
                    {accessory}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 7, textAlign: "right", fontSize: 9, color: "var(--muted)" }}>
              {note.length}/200
            </div>
          </div>

          <button className="wrap-button" disabled={!selected.length} onClick={wrapItUp}>
            <Sparkles size={16} /> wrap it up
          </button>
        </section>

        <section className="panel preview-panel">
          <div className="preview-heading">
            <div>
              <h2>your bouquet ♡</h2>
              <p>watch it gather itself together</p>
            </div>
            <button className="reset-button" onClick={reset} title="Reset bouquet">
              <RotateCcw size={15} />
            </button>
          </div>

          <BouquetPreview
            selected={selected}
            ribbon={ribbon}
            wrap={wrap}
            size={size}
            arrangement={arrangement}
            palette={flowerPalette}
          />

          <div className="preview-controls">
            <div className="mini-control">
              <strong>paper</strong>
              <div className="mini-options">
                <span className="mini-pill active">{WRAPS.find((x) => x.id === wrap)?.label}</span>
              </div>
            </div>
            <div className="mini-control">
              <strong>heart mood</strong>
              <div className="mini-options">
                <span className="mini-pill active">{heartStyle}</span>
              </div>
            </div>
          </div>

          {assembled && (
            <div className="share-panel">
              <div className="share-title">
                <Share2 size={17} /> send this bouquet
              </div>

              <div className="share-link">
                <Link2 size={13} />
                <span>{shareUrl}</span>
                <button className="copy-button" onClick={copyLink}>
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "copied" : "copy"}
                </button>
              </div>

              <div className="share-bottom">
                <a className="email-button" href={mailtoHref}>
                  <Mail size={13} /> email it
                </a>

                <div className="qr-box">
                  <span><QrCode size={14} /><br />scan to open</span>
                  {qrSrc && <img src={qrSrc} alt="QR code for bouquet link" />}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <footer className="footer">
        <div className="footer-line" />
        <div className="footer-script">handpicked, wrapped &amp; sent with love ♡</div>
        <div style={{ marginTop: 6 }}>jhilmiil · virtual flower house</div>
      </footer>
    </main>
  );
}

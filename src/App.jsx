import React, { useEffect, useMemo, useRef, useState } from "react";
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
  Volume2,
  VolumeX,
  ChevronDown,
} from "lucide-react";

/*
  JHILMIL — VIRTUAL FLOWER HOUSE
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
      ranunculus: ["#F7C79D","#D87B65"], dahlia: ["#D99BB8","#934F7C"], cosmos: ["#E8A6C5","#A85A8A"], poppy: ["#E87568","#9D3840"], sweetpea: ["#CDB6E6","#7D5C9D"], chrysanthemum: ["#F3D7A1","#B87C38"], "pixel-daisy": ["#FFF3C9", "#D5A83B"], "pixel-tulip": ["#F08FA3", "#B94765"], "pixel-lavender": ["#B99AD9", "#77539B"],
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
      ranunculus: ["#F5B77F","#B85D4D"], dahlia: ["#D9939E","#8D4558"], cosmos: ["#E79AAE","#934C68"], poppy: ["#F07C62","#A53B3C"], sweetpea: ["#C2A6D7","#71517E"], chrysanthemum: ["#F0C56B","#8D5A2B"], "pixel-daisy": ["#FFE8B7", "#D69432"], "pixel-tulip": ["#F18A79", "#A83F4A"], "pixel-lavender": ["#C7A0D9", "#754B87"],
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
      ranunculus: ["#D9B28E","#8C6655"], dahlia: ["#C68E9F","#784E62"], cosmos: ["#CFA1B7","#805B76"], poppy: ["#C87869","#793E42"], sweetpea: ["#B9A5C9","#665473"], chrysanthemum: ["#D6B56E","#765B35"], "pixel-daisy": ["#EDE3C7", "#B48B4B"], "pixel-tulip": ["#D39A9B", "#88535A"], "pixel-lavender": ["#B7A4C3", "#6F607D"],
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
  { id: "silk-bow", label: "silk bow", hex: "#D98FA1", style: "bow" },
  { id: "satin-wrap", label: "satin wrap", hex: "#A88ABF", style: "satin" },
  { id: "velvet-knot", label: "velvet knot", hex: "#8E5366", style: "velvet" },
  { id: "lace-tie", label: "lace tie", hex: "#E8D7C8", style: "lace" },
  { id: "rope-cord", label: "rope cord", hex: "#B79A70", style: "rope" },
  { id: "pearl-string", label: "pearl string", hex: "#F4E6D3", style: "pearl" },
  { id: "ribbon-cascade", label: "ribbon cascade", hex: "#C77E9A", style: "cascade" },
  { id: "twine-wrap", label: "twine wrap", hex: "#8D765B", style: "twine" },
];

const SAMPLE_BOUQUETS = [
  { id: "romantic", label: "Romantic Rose Garden", description: "perfect for anniversaries", flowers: ["rose", "peony", "lavender", "rose"], palette: "sunset", ribbon: "velvet-knot", wrap: "blush-hearts", size: "large", arrangement: "round" },
  { id: "sunshine", label: "Sunshine Blossom", description: "cheerful & bright", flowers: ["sunflower", "daisy", "gerbera", "pixel-sunflower"], palette: "garden", ribbon: "silk-bow", wrap: "sunny-check", size: "large", arrangement: "wild" },
  { id: "lavender", label: "Lavender Dreams", description: "elegant & calming", flowers: ["lavender", "hydrangea", "lily", "pixel-lavender"], palette: "vintage", ribbon: "satin-wrap", wrap: "lavender-check", size: "medium", arrangement: "cascade" },
  { id: "botanical", label: "Botanical Mix", description: "colourful variety", flowers: ["tulip", "forget", "hydrangea", "rose", "pixel-bouquet"], palette: "garden", ribbon: "ribbon-cascade", wrap: "sage-leaves", size: "large", arrangement: "wild" },
  { id: "pastels", label: "Garden Pastels", description: "soft & dreamy", flowers: ["daisy", "peony", "baby", "calla"], palette: "garden", ribbon: "pearl-string", wrap: "tiny-floral", size: "medium", arrangement: "formal" },
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
  { x: 14, y: 26, size: 15, delay: 0.0, color: "#FFD9D4" },
  { x: 82, y: 22, size: 12, delay: 1.6, color: "#F5B7B2" },
  { x: 23, y: 68, size: 11, delay: 2.4, color: "#B9D8EA" },
  { x: 76, y: 70, size: 16, delay: .8, color: "#E9B6C2" },
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

  const [petal, accent] = paletteData;
  const leaf = palette === "sunset" ? "#6B805B" : palette === "vintage" ? "#66745E" : "#64805A";
  const gid = `${f.id}-${palette}`.replace(/[^a-z0-9-]/gi, "");
  const common = { petal, accent, leaf };

  const PetalRing = ({ count, rx, ry, cy = 33, radius = 22, inner = false }) => (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const wobble = (pseudoRandom(i * 7 + f.id.length) - .5) * 5;
        return <ellipse key={i} cx="50" cy={cy} rx={rx} ry={ry}
          transform={`rotate(${angle + wobble} 50 ${cy}) translate(0 ${-radius})`}
          fill={inner ? `url(#${gid}-inner)` : `url(#${gid}-petal)`}
          opacity={inner ? .82 : .98} />;
      })}
    </g>
  );

  const Stem = ({ tall = false }) => (
    <g>
      <path d={tall ? "M50 52 C48 69 53 87 47 108" : "M50 52 C49 70 52 88 48 108"}
        stroke={`url(#${gid}-stem)`} strokeWidth="4.2" strokeLinecap="round" fill="none" />
      <path d="M48 80 C35 72 28 75 24 84 C35 83 42 85 48 89Z" fill={leaf} opacity=".96" />
      <path d="M50 90 C61 80 69 82 75 90 C65 89 58 93 51 98Z" fill={leaf} opacity=".9" />
      <path d="M31 81 C36 79 42 81 47 86" stroke="rgba(255,255,255,.18)" strokeWidth="1" fill="none" />
    </g>
  );

  let bloom;
  if (f.id === "rose" || f.id === "peony") {
    const outer = f.id === "rose" ? 11 : 14;
    bloom = <g>
      <PetalRing count={outer} rx={12} ry={18} cy={42} radius={14} />
      <PetalRing count={outer - 3} rx={11} ry={15} cy={42} radius={8} inner />
      <g transform="translate(50 42)">
        {Array.from({ length: f.id === "rose" ? 8 : 10 }).map((_, i) => (
          <path key={i} d="M0 -4 C7 -14 15 -8 10 0 C7 7 -4 9 -8 3 C-11 -2 -7 -8 0 -4Z"
            transform={`rotate(${i * (360 / (f.id === "rose" ? 8 : 10))}) scale(${1 - i * .025})`}
            fill={`url(#${gid}-inner)`} opacity={.95 - i * .035} />
        ))}
        <circle r="4.5" fill={accent} opacity=".95" />
      </g>
    </g>;
  } else if (f.id === "tulip") {
    bloom = <path d="M22 44 C24 28 28 18 38 25 C44 9 50 13 53 28 C58 12 69 18 76 30 C78 42 69 55 51 58 C34 57 24 52 22 44Z"
      fill={`url(#${gid}-petal)`} stroke={accent} strokeOpacity=".22" strokeWidth="1.2" />;
  } else if (f.id === "lily") {
    bloom = <g>
      <PetalRing count={6} rx={8} ry={24} cy={40} radius={17} />
      <PetalRing count={6} rx={5.5} ry={18} cy={40} radius={11} inner />
      {Array.from({ length: 6 }).map((_, i) => <path key={i} d="M50 39 Q50 27 50 21" stroke="#C7A36B" strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${i * 60} 50 40)`} />)}
      <circle cx="50" cy="40" r="4" fill={accent} />
    </g>;
  } else if (f.id === "ranunculus" || f.id === "dahlia") {
    bloom = <g>
      {Array.from({ length: 5 }).map((_, ring) => <g key={ring}>
        {Array.from({ length: ring === 0 ? 8 : 11 }).map((_, i) => <path key={i} d="M50 42 C40 35 40 25 49 20 C57 24 59 34 50 42Z" fill={`url(#${gid}-petal)`} opacity={.98 - ring*.08} transform={`rotate(${i*(360/(ring===0?8:11))+ring*13} 50 42) scale(${1-ring*.11})`} />)}
      </g>)}
      <circle cx="50" cy="42" r="7" fill={accent} />
      {Array.from({length:14}).map((_,i)=><circle key={i} cx={50+Math.cos(i*2.4)*5} cy={42+Math.sin(i*2.4)*5} r=".9" fill="#F9E7A8" />)}
    </g>;
  } else if (f.id === "cosmos" || f.id === "sweetpea") {
    bloom = <g>
      <PetalRing count={8} rx={7} ry={19} cy={39} radius={18} />
      <PetalRing count={5} rx={5} ry={12} cy={39} radius={8} inner />
      <circle cx="50" cy="39" r="4.5" fill={accent} />
    </g>;
  } else if (f.id === "poppy") {
    bloom = <g>
      <path d="M50 42 C31 37 28 20 40 19 C47 19 50 28 50 31 C50 24 57 16 64 19 C74 24 68 39 50 42Z" fill={`url(#${gid}-petal)`} />
      <path d="M50 42 C34 48 26 38 31 31 C36 24 45 30 50 34 C55 27 66 25 70 32 C74 40 63 48 50 42Z" fill={`url(#${gid}-inner)`} opacity=".82" />
      <circle cx="50" cy="40" r="6" fill={accent} />
      {Array.from({length:8}).map((_,i)=><circle key={i} cx={50+Math.cos(i*Math.PI/4)*5} cy={40+Math.sin(i*Math.PI/4)*5} r="1" fill="#EBCF82"/>)}
    </g>;
  } else if (f.id === "chrysanthemum") {
    bloom = <g>
      {Array.from({length:28}).map((_,i)=><path key={i} d="M50 41 C45 30 47 22 50 17 C53 24 55 31 50 41Z" fill={`url(#${gid}-petal)`} transform={`rotate(${i*360/28} 50 41)`}/>)}
      <circle cx="50" cy="41" r="7" fill={accent}/>
    </g>;
  } else if (f.id === "sunflower") {
    bloom = <g>
      <PetalRing count={18} rx={5.2} ry={18} cy={39} radius={18} />
      <circle cx="50" cy="39" r="16" fill={accent} />
      {Array.from({ length: 28 }).map((_, i) => {
        const a = i * 137.5;
        const r = 11 * Math.sqrt((i + 1) / 28);
        return <circle key={i} cx={50 + Math.cos(a * Math.PI / 180) * r} cy={39 + Math.sin(a * Math.PI / 180) * r} r="1.05" fill="#6D452D" opacity=".72" />;
      })}
    </g>;
  } else if (f.id === "hydrangea") {
    bloom = <g>
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 34 + pseudoRandom(i * 3) * 32, y = 25 + pseudoRandom(i * 9) * 28;
        return <g key={i} transform={`translate(${x} ${y}) rotate(${pseudoRandom(i + 5) * 30})`}>
          <circle cx="-4" cy="0" r="4.2" fill={petal} opacity=".95" /><circle cx="4" cy="0" r="4.2" fill={petal} opacity=".95" />
          <circle cx="0" cy="-4" r="4.2" fill={petal} opacity=".9" /><circle cx="0" cy="4" r="4.2" fill={accent} opacity=".8" /><circle r="1.8" fill="#F8DFA1" />
        </g>;
      })}
    </g>;
  } else if (f.id === "forget") {
    bloom = <g>
      {Array.from({ length: 5 }).map((_, i) => <ellipse key={i} cx="50" cy="34" rx="7" ry="13" transform={`rotate(${i * 72} 50 34) translate(0 -8)`} fill={`url(#${gid}-petal)`} />)}
      <circle cx="50" cy="34" r="4" fill="#F3DFA6" />
      <circle cx="50" cy="34" r="2" fill="#E4B85D" />
    </g>;
  } else if (f.id === "gerbera" || f.id === "daisy") {
    bloom = <g>
      <PetalRing count={f.id === "gerbera" ? 20 : 16} rx={f.id === "gerbera" ? 4.3 : 6.5} ry={f.id === "gerbera" ? 19 : 17} cy={39} radius={18} />
      {f.id === "gerbera" && <PetalRing count={12} rx={3.5} ry={13} cy={39} radius={10} inner />}
      <circle cx="50" cy="39" r={f.id === "gerbera" ? 10 : 9} fill={accent} />
      {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={50 + Math.cos(i * 30 * Math.PI / 180) * 6} cy={39 + Math.sin(i * 30 * Math.PI / 180) * 6} r="1.1" fill="#6D4A35" opacity=".65" />)}
    </g>;
  } else if (f.id === "calla") {
    bloom = <g>
      <path d="M55 58 C31 55 28 34 41 22 C51 12 68 19 69 33 C70 46 62 56 55 58Z" fill={`url(#${gid}-petal)`} />
      <path d="M57 56 C67 46 68 31 59 24 C67 30 73 40 67 51 C64 56 61 58 57 56Z" fill={accent} opacity=".3" />
      <rect x="55" y="27" width="5" height="28" rx="3" fill={accent} transform="rotate(8 55 27)" />
    </g>;
  } else if (f.id === "lavender") {
    bloom = <g>
      <path d="M50 55 C43 45 44 27 50 14" stroke={leaf} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {Array.from({ length: 9 }).map((_, i) => <g key={i} transform={`translate(${50 + (i % 2 ? -5 : 4)} ${17 + i * 4}) rotate(${i % 2 ? -24 : 24})`}><ellipse rx="7" ry="3.4" fill={`url(#${gid}-petal)`} /></g>)}
    </g>;
  } else if (f.id === "baby") {
    bloom = <g>
      <path d="M50 55 C43 45 36 31 27 23 M47 48 C57 40 65 28 72 20 M48 54 C47 41 51 29 56 18" stroke={leaf} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {Array.from({ length: 12 }).map((_, i) => <g key={i} transform={`translate(${24 + pseudoRandom(i*5)*50} ${17 + pseudoRandom(i*8)*34})`}><circle r="4" fill={petal} opacity=".95"/><circle r="1.2" fill="#E6D9C4"/></g>)}
    </g>;
  } else {
    bloom = <g><PetalRing count={8} rx={8} ry={21} cy={40} radius={17} /><circle cx="50" cy="40" r="8" fill={accent} /></g>;
  }

  return (
    <div className={`flower-art natural-flower ${className}`} style={{ transform: `scale(${scale})` }}>
      <svg viewBox="0 0 100 112" role="img" aria-label={f.label} className="natural-flower-svg">
        <defs>
          <linearGradient id={`${gid}-petal`} x1="20" y1="15" x2="80" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".82" />
            <stop offset=".22" stopColor={petal} />
            <stop offset=".72" stopColor={petal} />
            <stop offset="1" stopColor={accent} />
          </linearGradient>
          <linearGradient id={`${gid}-inner`} x1="30" y1="20" x2="70" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".52" />
            <stop offset=".35" stopColor={petal} />
            <stop offset="1" stopColor={accent} />
          </linearGradient>
          <linearGradient id={`${gid}-stem`} x1="0" x2="1"><stop stopColor="#496448"/><stop offset=".5" stopColor="#8CA77B"/><stop offset="1" stopColor="#3E5A40"/></linearGradient>
          <filter id={`${gid}-shadow`} x="-40%" y="-40%" width="180%" height="190%"><feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#2E2027" floodOpacity=".22"/></filter>
        </defs>
        <g filter={`url(#${gid}-shadow)`}>
          {bloom}
          <Stem tall={f.id === "lavender" || f.id === "baby"} />
        </g>
        <path d="M42 78 C34 69 27 70 20 76 C28 77 36 82 42 88" fill={leaf} opacity=".92" />
        <path d="M55 91 C63 82 70 82 78 88 C69 89 61 95 55 99" fill={leaf} opacity=".84" />
      </svg>
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

function RibbonBow({ color, style = "bow" }) {
  if (style === "satin") return <div className="ribbon-bow ribbon-satin" style={{ "--ribbon": color }}><span className="satin-band" /><span className="satin-knot" /></div>;
  if (style === "velvet") return <div className="ribbon-bow ribbon-velvet" style={{ "--ribbon": color }}><span className="velvet-knot" /><span className="velvet-tail left" /><span className="velvet-tail right" /></div>;
  if (style === "lace") return <div className="ribbon-bow ribbon-lace" style={{ "--ribbon": color }}><span className="lace-loop left" /><span className="lace-loop right" /><span className="lace-knot" /></div>;
  if (style === "rope" || style === "twine") return <div className={`ribbon-bow ribbon-rope ${style}`} style={{ "--ribbon": color }}><span className="rope-line one" /><span className="rope-line two" /><span className="rope-knot" /></div>;
  if (style === "pearl") return <div className="ribbon-bow ribbon-pearl" style={{ "--ribbon": color }}><span className="pearl-strand one" /><span className="pearl-strand two" /></div>;
  if (style === "cascade") return <div className="ribbon-bow ribbon-cascade" style={{ "--ribbon": color }}><span className="cascade-loop left" /><span className="cascade-loop right" /><span className="cascade-tail a" /><span className="cascade-tail b" /><span className="cascade-tail c" /></div>;
  return (
    <div className="ribbon-bow ribbon-silk" style={{ "--ribbon": color }}>
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

function BouquetPreview({ selected, ribbon, wrap, size, arrangement, palette, previewTheme }) {
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
    <div className={`bouquet-stage bouquet-${size} ${previewTheme || "theme-rose"}`}>
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
        <RibbonBow color={ribbonObj.hex} style={ribbonObj.style} />
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
  const cords = [
    { side: "left", top: "11%", width: "34%", flip: false, bend: 25, count: 14 },
    { side: "right", top: "13%", width: "34%", flip: true, bend: 25, count: 14 },
  ];
  return (
    <div className="fairy-lights" aria-hidden="true">
      {cords.map((cord, cordIndex) => (
        <svg key={cord.side} className={`fairy-cord-svg fairy-cord-${cord.side}`} viewBox="0 0 100 100" preserveAspectRatio="none" style={{ top: cord.top, width: cord.width }}>
          <path className="fairy-wire-path" d={`M 3 12 Q 50 ${12 + cord.bend} 97 12`} />
          {Array.from({ length: cord.count }).map((_, i) => {
            const x = 5 + (i * 90) / (cord.count - 1);
            const t = x / 100;
            const y = 12 + cord.bend * 4 * t * (1 - t);
            const drop = 8 + ((i * 5 + cordIndex * 4) % 8);
            return (
              <g key={i} className="fairy-light-unit" style={{ animationDelay: `${((i * .23) + cordIndex * .57) % 3.8}s` }}>
                <line x1={x} x2={x} y1={y} y2={y + drop} className="fairy-drop" />
                <circle cx={x} cy={y + drop + 3} r="5.5" className="fairy-halo" />
                <circle cx={x} cy={y + drop + 3} r="2.15" className="fairy-bulb" />
                <circle cx={x - .55} cy={y + drop + 2.4} r=".55" fill="#fff" opacity=".85" />
              </g>
            );
          })}
        </svg>
      ))}
    </div>
  );
}
function FloatingDecorations() {
  return (
    <div className="floating-decorations" aria-hidden="true">
      {FLOATERS.map((item, i) => (
        <span key={i} className="floater floater-heart" style={{ left: `${item.x}%`, top: `${item.y}%`, animationDelay: `${item.delay}s` }}>
          <HeartDoodle style={i % 5 === 3 ? "outlined" : i % 5 === 4 ? "sparkle" : "tiny"} size={item.size} color={item.color} />
        </span>
      ))}
    </div>
  );
}

function AmbientMusic({ enabled, onToggle }) {
  const engineRef = useRef(null);
  const chimeTimerRef = useRef(null);

  const stopEngine = () => {
    const engine = engineRef.current;
    if (!engine) return;
    if (chimeTimerRef.current) window.clearInterval(chimeTimerRef.current);
    chimeTimerRef.current = null;
    try { engine.master.gain.cancelScheduledValues(engine.ctx.currentTime); } catch {}
    try { engine.master.gain.setTargetAtTime(0.0001, engine.ctx.currentTime, .35); } catch {}
    window.setTimeout(() => {
      try { engine.sources.forEach((s) => s.stop?.()); } catch {}
      try { engine.ctx.close?.(); } catch {}
      if (engineRef.current === engine) engineRef.current = null;
    }, 1200);
  };

  const startEngine = async () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") await ctx.resume();
    const master = ctx.createGain();
    master.gain.setValueAtTime(.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(.038, ctx.currentTime + 1.4);
    master.connect(ctx.destination);

    const sources = [];
    const droneFreqs = [174.61, 261.63, 329.63];
    droneFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      gain.gain.value = [0.22, 0.07, 0.045][i];
      osc.connect(gain).connect(master);
      osc.start();
      sources.push(osc);
    });

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * .35;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 650;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = .028;
    noise.connect(filter).connect(noiseGain).connect(master);
    noise.start();
    sources.push(noise);

    const playChime = () => {
      if (!engineRef.current) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = [523.25, 659.25, 783.99, 987.77][Math.floor(Math.random() * 4)];
      g.gain.setValueAtTime(.0001, now);
      g.gain.exponentialRampToValueAtTime(.018, now + .02);
      g.gain.exponentialRampToValueAtTime(.0001, now + 2.8);
      osc.connect(g).connect(master);
      osc.start(now);
      osc.stop(now + 3);
    };

    engineRef.current = { ctx, master, sources };
    playChime();
    chimeTimerRef.current = window.setInterval(playChime, 4200);
    return true;
  };

  const toggle = async () => {
    if (enabled) {
      stopEngine();
      onToggle(false);
    } else {
      const started = await startEngine();
      if (started) onToggle(true);
    }
  };

  useEffect(() => () => stopEngine(), []);

  return (
    <button className={`music-toggle ${enabled ? "is-on" : ""}`} onClick={toggle} aria-label={enabled ? "Turn ambient garden sounds off" : "Turn ambient garden sounds on"}>
      {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
      <span>{enabled ? "garden sounds on" : "garden sounds"}</span>
    </button>
  );
}

const PREMIUM_FLOWER_LIBRARY = [
  { id: "ranunculus", label: "ranunculus", kind: "real", color: "#F7C79D", accent: "#D87B65" },
  { id: "dahlia", label: "dahlia", kind: "real", color: "#D99BB8", accent: "#934F7C" },
  { id: "cosmos", label: "cosmos", kind: "real", color: "#E8A6C5", accent: "#A85A8A" },
  { id: "poppy", label: "poppy", kind: "real", color: "#E87568", accent: "#9D3840" },
  { id: "sweetpea", label: "sweet pea", kind: "real", color: "#CDB6E6", accent: "#7D5C9D" },
  { id: "chrysanthemum", label: "chrysanthemum", kind: "real", color: "#F3D7A1", accent: "#B87C38" },
];

const THEMED_COLLECTIONS = [
  { id: "romantic", label: "romantic garden", description: "roses, peonies & ranunculus", flowers: ["rose","peony","ranunculus"], theme: "theme-rose" },
  { id: "sunshine", label: "sunshine picnic", description: "poppies, daisies & cosmos", flowers: ["sunflower","daisy","poppy","cosmos"], theme: "theme-sunshine" },
  { id: "moonlit", label: "moonlit garden", description: "lavender, sweet peas & blue blooms", flowers: ["lavender","sweetpea","forget"], theme: "theme-moonlit" },
  { id: "wildflower", label: "wildflower walk", description: "a loose meadow gathering", flowers: ["cosmos","dahlia","daisy","baby"], theme: "theme-meadow" },
  { id: "retro", label: "retro flower shop", description: "bold colour & vintage charm", flowers: ["poppy","dahlia","gerbera"], theme: "theme-retro" },
];

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
  const [musicOn, setMusicOn] = useState(false);
  const [previewTheme, setPreviewTheme] = useState("theme-rose");

  const addNoteAccessory = (accessory) => {
    setNote((current) => {
      const addition = `${current ? " " : ""}${accessory}`;
      return (current + addition).slice(0, 200);
    });
  };

  const applySample = (sample) => {
    setSelected(sample.flowers);
    setFlowerPalette(sample.palette);
    setRibbon(sample.ribbon);
    setWrap(sample.wrap);
    setSize(sample.size);
    setArrangement(sample.arrangement);
    setAssembled(false);
    document.getElementById("builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    setPreviewTheme("theme-rose");
  };

  const wrapItUp = () => {
    setAssembled(true);
    const payload = { selected, ribbon, wrap, size, arrangement, note, flowerPalette };
    const token = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).slice(0, 24);
    setShareUrl(`https://jhilmil.app/b/${token}`);
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
    "a bouquet for you, from jhilmil"
  )}&body=${encodeURIComponent(
    (note ? `${note}\n\n` : "") + `open your bouquet here: ${shareUrl}`
  )}`;

  const qrSrc = shareUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}`
    : "";

  return (
    <main className="site-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Patrick+Hand&family=Poppins:wght@400;500;600;700&display=swap');

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
          font-family: "Poppins", system-ui, sans-serif;
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
          position:relative; min-height:760px; padding:24px clamp(20px,5vw,72px) 90px; display:flex; align-items:center; justify-content:flex-start; overflow:hidden; border-bottom:1px solid rgba(255,225,207,.16); text-align:left;
          background:linear-gradient(180deg,#24152F 0%,#392044 22%,#713A52 43%,#C65E61 61%,#F19A69 76%,#F6C18B 88%,#5C684D 100%);
          isolation:isolate;
        }
        .hero-garden-scene { position:absolute; inset:0; z-index:1; pointer-events:none; overflow:hidden; }
        .hero-sun { position:absolute; width:clamp(130px,18vw,230px); aspect-ratio:1; right:14%; top:25%; border-radius:50%; background:radial-gradient(circle,#FFF5C7 0 32%,#FFD990 47%,rgba(255,173,105,.42) 64%,transparent 72%); filter:blur(.2px); box-shadow:0 0 70px rgba(255,192,118,.45); }
        .hero-hill { position:absolute; left:-5%; width:110%; border-radius:50% 50% 0 0; }
        .hero-hill-back { height:34%; bottom:12%; background:#6B6B54; clip-path:polygon(0 72%,8% 57%,17% 67%,29% 45%,42% 63%,54% 50%,68% 65%,82% 42%,100% 58%,100% 100%,0 100%); opacity:.72; }
        .hero-hill-mid { height:28%; bottom:5%; background:#4C5948; clip-path:polygon(0 63%,12% 45%,25% 59%,37% 36%,50% 55%,64% 41%,78% 58%,90% 39%,100% 53%,100% 100%,0 100%); }
        .hero-hill-front { height:23%; bottom:-3%; background:linear-gradient(180deg,#3C493B,#29372F); clip-path:polygon(0 30%,10% 20%,22% 34%,34% 16%,48% 31%,61% 14%,75% 29%,88% 12%,100% 24%,100% 100%,0 100%); }
        .hero-grass { position:absolute; bottom:4%; width:90px; height:130px; border-left:2px solid rgba(31,57,39,.75); border-radius:50%; transform-origin:bottom; opacity:.72; }
        .grass-a { left:7%; transform:rotate(-16deg); } .grass-b { right:8%; transform:rotate(18deg); } .grass-c { left:46%; bottom:2%; transform:rotate(8deg) scale(.8); }
        .hero-garden-flower { position:absolute; bottom:7%; color:#F7C5A8; font-size:42px; text-shadow:0 4px 10px rgba(29,31,27,.28); animation:gardenSway 5s ease-in-out infinite; }
        .flower-a { left:8%; } .flower-b { right:13%; font-size:34px; animation-delay:-1.7s; } .flower-c { left:43%; bottom:3%; font-size:28px; animation-delay:-3s; }
        @keyframes gardenSway { 0%,100% { transform:rotate(-3deg) translateY(0); } 50% { transform:rotate(4deg) translateY(-5px); } }

        .hero:before {
          content: "♡     ✦     ♡";
          position: absolute;
          left: 0; right: 0; bottom: 27%;
          color: rgba(255,244,238,.72);
          font-size: clamp(24px, 4vw, 48px);
          letter-spacing: clamp(12px, 3vw, 38px);
          text-shadow: 0 3px 10px rgba(108,61,66,.18); opacity:.55;
          pointer-events: none;
          z-index: 1;
        }
        .hero:after {
          content: "✿          ❀";
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
          font-family: "Cormorant Garamond", serif;
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

        .hero-copy { position:relative; z-index:6; width:min(610px,62vw); margin:60px 0 0 clamp(12px,8vw,110px); }
        .hero-kicker {
          font-size: 11px;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: #FFE6D2;
          margin-bottom: 14px;
        }
        .hero h1 {
          margin: 0;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(56px, 10vw, 112px);
          line-height: .88;
          font-weight: 400;
          color: #FFF1E8;
          text-shadow: 0 5px 20px rgba(27,12,32,.35);
          letter-spacing: -.04em;
        }
        .hero h1 em {
          color: #FFD0B2;
          font-weight: 600;
          text-shadow: 0 3px 12px rgba(39,14,28,.3);
        }
        .hero-copy p {
          max-width: 520px;
          margin: 24px 0 0;
          color: #FFE7D9;
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
          color: #FFD8C4;
          font-family: "Patrick Hand", cursive;
          font-size: clamp(19px, 2.7vw, 27px);
          transform: rotate(-2deg);
          text-shadow: 0 2px 8px rgba(255,255,255,.32);
        }

        .fairy-lights { position:absolute; inset:0; z-index:2; pointer-events:none; overflow:hidden; }
        .fairy-cord-svg { position:absolute; height:125px; overflow:visible; }
        .fairy-cord-left { left:1%; }
        .fairy-cord-right { right:1%; transform:scaleX(-1); transform-origin:center; }
        .fairy-wire-path { fill:none; stroke:rgba(24,19,29,.78); stroke-width:1.1; vector-effect:non-scaling-stroke; filter:drop-shadow(0 1px 1px rgba(0,0,0,.18)); }
        .fairy-drop { stroke:#30252D; stroke-width:1; vector-effect:non-scaling-stroke; }
        .fairy-light-unit { transform-box:fill-box; transform-origin:center; animation:fairyUnit 2.8s ease-in-out infinite; }
        .fairy-halo { fill:#FFE6A0; opacity:.42; filter:blur(4px); }
        .fairy-bulb { fill:#FFF0AE; stroke:#FFF9D7; stroke-width:.65; filter:drop-shadow(0 0 3px #FFF1A8) drop-shadow(0 0 8px rgba(255,190,89,.95)); }
        @keyframes fairyUnit { 0%,100% { opacity:.55; } 34% { opacity:.82; } 52% { opacity:1; } 68% { opacity:.7; } }

        .floating-decorations { position:absolute; inset:0; pointer-events:none; z-index:3; }
        .floater { position:absolute; opacity:.8; animation:heartDrift 6.5s ease-in-out infinite; filter:drop-shadow(0 3px 7px rgba(38,17,37,.2)); }
        .floater-heart { transform-origin:center; }
        @keyframes heartDrift { 0% { translate:0 8px; rotate:-5deg; opacity:.35; } 25% { translate:-8px -6px; rotate:3deg; opacity:.7; } 50% { translate:10px -18px; rotate:8deg; opacity:.95; } 75% { translate:-5px -28px; rotate:-3deg; opacity:.72; } 100% { translate:4px -42px; rotate:5deg; opacity:0; } }

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
          font-family: "Cormorant Garamond", serif;
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

        .preview-design-board { margin:14px 10px 0; padding:16px; border-radius:24px; background:linear-gradient(135deg,rgba(255,250,246,.95),rgba(248,232,239,.88)); border:1px solid rgba(117,89,95,.12); box-shadow:0 12px 30px rgba(91,61,75,.08); }
        .design-board-heading strong { display:block; font-family:"Cormorant Garamond",serif; font-size:21px; color:var(--plum); }
        .design-board-heading span { display:block; margin-top:2px; color:var(--muted); font-size:9px; }
        .theme-chip-row { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-top:12px; }
        .theme-chip { border:1px solid rgba(117,89,95,.12); border-radius:15px; padding:10px; text-align:left; background:#fffaf6; transition:.2s ease; }
        .theme-chip:hover { transform:translateY(-2px) rotate(-.5deg); }
        .theme-chip.active { border-color:var(--rose); box-shadow:0 0 0 2px rgba(201,121,141,.11); background:#fff1f0; }
        .theme-chip b { display:block; font-family:"Cormorant Garamond",serif; font-size:15px; }
        .theme-chip small { display:block; margin-top:2px; color:var(--muted); font-size:8px; line-height:1.35; }
        .wrap-playground { margin-top:14px; padding:14px; border-radius:22px; background:linear-gradient(135deg,#fffaf5,#f4e8f1); border:1px dashed rgba(117,89,95,.16); }
        .wrap-playground-title strong { display:block; font-family:"Cormorant Garamond",serif; font-size:19px; color:var(--plum); }
        .wrap-playground-title span { display:block; color:var(--muted); font-size:8px; margin-top:2px; }
        .funky-wrap-row { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-top:10px; }
        .funky-wrap { border:1px solid transparent; background:rgba(255,255,255,.7); border-radius:14px; padding:5px; color:var(--muted); transition:.2s ease; }
        .funky-wrap:hover { transform:translateY(-2px); }
        .funky-wrap.active { border-color:var(--rose); box-shadow:0 0 0 2px rgba(201,121,141,.09); }
        .funky-paper { display:block; height:58px; border-radius:10px; overflow:hidden; box-shadow:inset 0 0 0 1px rgba(70,40,50,.06); }
        .funky-wrap small { display:block; font-size:7px; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .bouquet-stage.theme-rose { background:radial-gradient(circle at 50% 32%,#fff9ed 0 10%,transparent 28%),linear-gradient(160deg,#e9bfd0,#f5d7cf 55%,#c9d7bb); }
        .bouquet-stage.theme-sunshine { background:radial-gradient(circle at 75% 25%,#ffe7a1 0 9%,transparent 24%),linear-gradient(160deg,#f8d38c,#f5b58b 48%,#d8dfb2); }
        .bouquet-stage.theme-moonlit { background:radial-gradient(circle at 70% 18%,#fff2bf 0 2px,transparent 3px),radial-gradient(circle at 20% 28%,#fff2bf 0 1px,transparent 2px),linear-gradient(160deg,#302247,#5c476f 55%,#9a9b9b); background-size:80px 80px,110px 110px,auto; }
        .bouquet-stage.theme-meadow { background:radial-gradient(circle at 15% 22%,rgba(255,255,255,.65) 0 2px,transparent 3px),linear-gradient(160deg,#dcebd3,#f4e3bf 55%,#a8c49b); }
        .bouquet-stage.theme-retro { background:repeating-linear-gradient(0deg,rgba(70,30,60,.04) 0 1px,transparent 1px 5px),linear-gradient(160deg,#e6a8bc,#f2d06d 55%,#9ab6c9); }
        @media (max-width:700px) { .theme-chip-row{grid-template-columns:1fr;} .funky-wrap-row{grid-template-columns:repeat(3,1fr);} }

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
        .pixel-title strong { font-family:"Cormorant Garamond",serif; font-weight:400; font-size:18px; color:var(--plum); }
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
          font-family: "Cormorant Garamond", serif;
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
        .preview-heading h2 { margin:0; font-family:"Cormorant Garamond",serif; font-size:29px; font-weight:400; color:var(--plum); }
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
          width:160px;
          height:155px;
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
        .share-title { display:flex; gap:7px; align-items:center; font-family:"Cormorant Garamond",serif; color:var(--plum); font-size:19px; }
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

        .hero-nav-actions { display:flex; align-items:center; gap:8px; }
        .music-toggle { border:1px solid rgba(255,239,226,.35); background:rgba(36,22,45,.35); color:#FFF0E5; border-radius:999px; padding:8px 12px; display:flex; align-items:center; gap:6px; font-size:9px; letter-spacing:.04em; backdrop-filter:blur(8px); box-shadow:0 6px 20px rgba(24,10,29,.18); transition:.25s ease; }
        .music-toggle:hover, .music-toggle.is-on { transform:translateY(-2px); background:rgba(255,221,187,.16); border-color:rgba(255,239,226,.65); }
        .retro-scanlines { position:absolute; inset:0; z-index:4; pointer-events:none; opacity:.11; background:repeating-linear-gradient(180deg, rgba(255,255,255,.18) 0, rgba(255,255,255,.18) 1px, transparent 1px, transparent 5px); mix-blend-mode:screen; }
        .hero-divider { position:absolute; bottom:16%; left:clamp(12px,8vw,110px); transform:none; z-index:3; display:flex; align-items:center; gap:10px; color:#FFD6B4; opacity:.8; }
        .hero-divider i { display:block; width:62px; height:1px; background:linear-gradient(90deg,transparent,#FFD6B4,transparent); }
        .scroll-indicator { position:absolute; bottom:18px; left:50%; transform:translateX(-50%); z-index:5; display:flex; flex-direction:column; align-items:center; gap:2px; color:#FFE4D3; font-size:8px; letter-spacing:.16em; text-transform:uppercase; animation:scrollPulse 2.2s ease-in-out infinite; }
        @keyframes scrollPulse { 0%,100% { opacity:.5; translate:0 0; } 50% { opacity:1; translate:0 5px; } }

        .sample-bouquets { margin:-3px 0 18px; padding:14px; border:1px solid rgba(119,87,103,.14); border-radius:20px; background:linear-gradient(135deg,rgba(255,245,240,.9),rgba(244,233,246,.72)); box-shadow:inset 0 1px rgba(255,255,255,.75); }
        .sample-heading { display:flex; justify-content:space-between; align-items:baseline; gap:10px; margin-bottom:10px; }
        .sample-heading strong { font-family:"Cormorant Garamond",serif; font-size:18px; color:var(--plum); }
        .sample-heading span { font-size:8px; color:var(--muted); }
        .sample-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:7px; }
        .sample-card { min-width:0; padding:7px 5px 8px; border:1px solid rgba(117,89,95,.12); border-radius:15px; background:#FFF9F5; color:var(--ink); text-align:left; transition:.25s ease; box-shadow:0 3px 12px rgba(80,54,60,.05); }
        .sample-card:hover { transform:translateY(-3px); border-color:rgba(201,121,141,.5); box-shadow:0 10px 20px rgba(117,89,95,.1); }
        .sample-mini-bouquet { height:72px; display:flex; align-items:flex-end; justify-content:center; gap:0; overflow:hidden; position:relative; }
        .sample-mini-bouquet .flower-art { margin:0 -11px; transform-origin:center bottom; }
        .sample-mini-bouquet .pixel-flower { margin:0 -10px; }
        .sample-card-copy b { display:block; font-size:9px; line-height:1.15; }
        .sample-card-copy small { display:block; margin-top:3px; color:var(--muted); font-size:7px; line-height:1.2; }

        .ribbon-choice { position:relative; }
        .ribbon-dot { position:relative; overflow:hidden; }
        .ribbon-choice:nth-child(2) .ribbon-dot { background:linear-gradient(135deg,#C7A9D7,#85669C)!important; }
        .ribbon-choice:nth-child(3) .ribbon-dot { background:linear-gradient(135deg,#9E6277,#633C4E)!important; }
        .ribbon-choice:nth-child(4) .ribbon-dot { background:repeating-linear-gradient(45deg,#EADACD 0 3px,#FFF8F0 3px 6px)!important; }
        .ribbon-choice:nth-child(5) .ribbon-dot { background:repeating-linear-gradient(45deg,#B59A72 0 2px,#8F7658 2px 4px)!important; }
        .ribbon-choice:nth-child(6) .ribbon-dot { background:radial-gradient(circle,#fff 0 28%,#E4D0B9 30% 55%,transparent 57%); }
        .ribbon-choice:nth-child(7) .ribbon-dot { background:linear-gradient(180deg,#D99AB1,#A85F7D)!important; }
        .ribbon-choice:nth-child(8) .ribbon-dot { background:repeating-linear-gradient(135deg,#A88A67 0 2px,#7E654B 2px 4px)!important; }
        .ribbon-satin .satin-band { position:absolute; left:16px; top:25px; width:78px; height:14px; border-radius:999px; background:linear-gradient(180deg,rgba(255,255,255,.4),var(--ribbon),rgba(72,43,60,.18)); box-shadow:0 7px 12px rgba(63,40,48,.16); transform:rotate(-5deg); }
        .ribbon-satin .satin-knot { position:absolute; left:48px; top:20px; width:20px; height:22px; border-radius:50%; background:var(--ribbon); box-shadow:inset 0 3px 4px rgba(255,255,255,.3); }
        .ribbon-velvet .velvet-knot { position:absolute; left:43px; top:22px; width:28px; height:28px; border-radius:45% 55% 50% 50%; background:var(--ribbon); box-shadow:inset 0 -5px 7px rgba(38,20,30,.2),0 5px 8px rgba(48,25,35,.16); }
        .velvet-tail { position:absolute; top:38px; width:30px; height:31px; background:linear-gradient(135deg,var(--ribbon),rgba(255,255,255,.1)); clip-path:polygon(0 0,100% 0,74% 100%,45% 74%,16% 100%); }
        .velvet-tail.left { left:18px; transform:rotate(10deg); } .velvet-tail.right { right:18px; transform:rotate(-10deg); }
        .ribbon-lace .lace-loop { position:absolute; top:15px; width:43px; height:35px; border:3px dotted var(--ribbon); border-radius:50%; } .lace-loop.left { left:6px; transform:rotate(14deg); } .lace-loop.right { right:6px; transform:rotate(-14deg); } .lace-knot { position:absolute; left:45px; top:26px; width:22px; height:18px; border-radius:50%; background:var(--ribbon); }
        .ribbon-rope .rope-line { position:absolute; left:18px; width:74px; height:7px; border-radius:999px; background:repeating-linear-gradient(45deg,var(--ribbon) 0 3px,#6F5A43 3px 5px); box-shadow:0 3px 5px rgba(60,43,33,.15); } .rope-line.one { top:24px; transform:rotate(12deg); } .rope-line.two { top:38px; transform:rotate(-12deg); } .rope-knot { position:absolute; left:45px; top:24px; width:22px; height:22px; border:5px solid var(--ribbon); border-radius:50%; }
        .ribbon-pearl .pearl-strand { position:absolute; left:13px; width:84px; height:12px; border-radius:999px; background:radial-gradient(circle,#FFF 0 35%,#D9C6AD 38% 48%,transparent 50%) 0 0/14px 14px; } .pearl-strand.one { top:26px; transform:rotate(7deg); } .pearl-strand.two { top:39px; transform:rotate(-7deg); }
        .ribbon-cascade .cascade-loop { position:absolute; top:14px; width:42px; height:34px; border:7px solid var(--ribbon); border-radius:55% 45% 60% 40%; } .cascade-loop.left { left:7px; transform:rotate(16deg); } .cascade-loop.right { right:7px; transform:rotate(-16deg); } .cascade-tail { position:absolute; top:35px; width:18px; height:52px; background:linear-gradient(180deg,var(--ribbon),rgba(255,255,255,.2)); border-radius:5px 5px 12px 12px; transform-origin:top; } .cascade-tail.a { left:30px; transform:rotate(9deg); } .cascade-tail.b { left:48px; transform:rotate(-2deg); } .cascade-tail.c { right:28px; transform:rotate(-11deg); }

        .bouquet-stage { background:linear-gradient(180deg,#2E1D38 0%,#58324B 26%,#D16D69 52%,#F1B27E 75%,#F6D6AD 100%); box-shadow:inset 0 0 0 1px rgba(255,255,255,.08), inset 0 -70px 100px rgba(38,45,33,.22); }
        .bouquet-stage:before { content:""; position:absolute; inset:0; background:repeating-linear-gradient(180deg,rgba(255,255,255,.035) 0 1px,transparent 1px 5px); opacity:.5; pointer-events:none; z-index:1; }
        .bouquet-stage .stage-glow { background:rgba(255,215,151,.42); }
        .bouquet-paper { width:158px; height:166px; bottom:25px; }
        .bouquet-flower .flower-art { filter:drop-shadow(0 10px 9px rgba(37,23,30,.22)); }
        .bouquet-flower .flower-art:after { content:""; position:absolute; left:25%; top:3%; width:50%; height:32%; border-radius:50%; background:radial-gradient(circle,rgba(255,255,255,.48),transparent 65%); filter:blur(5px); pointer-events:none; mix-blend-mode:screen; }
        .flower-head { filter:saturate(1.12) drop-shadow(0 5px 4px rgba(45,25,33,.16)); }
        .flower-art .leaf { filter:drop-shadow(0 2px 2px rgba(34,55,31,.18)); }

        @media (max-width: 980px) {
          .builder { grid-template-columns:1fr; }
          .preview-panel { position:relative; top:auto; }
        }
        @media (max-width: 760px) {
          .hero { min-height:720px; justify-content:center; text-align:center; }
          .hero-copy { width:min(92vw,620px); margin:70px auto 0; }
          .hero-copy p { margin-left:auto; margin-right:auto; }
          .hero-divider { left:50%; transform:translateX(-50%); }
          .hero-sun { right:50%; transform:translateX(50%); top:24%; width:150px; opacity:.82; }
          .hero-hill-back { bottom:12%; }
        }
        @media (max-width: 640px) {
          .hero { min-height:650px; }
          .sample-grid { grid-template-columns:repeat(2,1fr); }
          .sample-card:last-child { grid-column:span 2; }
          .music-toggle span { display:none; }
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
          .sample-grid { grid-template-columns:1fr 1fr; }
          .sample-card:last-child { grid-column:auto; }
          .fairy-cord-svg { height:88px; }
          .fairy-cord-left { left:-2%; width:42%; }
          .fairy-cord-right { right:-2%; width:42%; }
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
              <div className="brand-name">jhilmil</div>
              <span className="brand-sub">virtual flower house</span>
            </div>
          </div>
          <div className="hero-nav-actions">
            <AmbientMusic enabled={musicOn} onToggle={setMusicOn} />
          </div>
        </div>

        <div className="hero-garden-scene" aria-hidden="true">
          <div className="hero-sun" />
          <div className="hero-hill hero-hill-back" />
          <div className="hero-hill hero-hill-mid" />
          <div className="hero-hill hero-hill-front" />
          <div className="hero-grass grass-a" /><div className="hero-grass grass-b" /><div className="hero-grass grass-c" />
          <div className="hero-garden-flower flower-a">✿</div><div className="hero-garden-flower flower-b">❀</div><div className="hero-garden-flower flower-c">✿</div>
        </div>
        <FairyLights />
        <FloatingDecorations />
        <div className="retro-scanlines" aria-hidden="true" />
        <div className="hero-divider" aria-hidden="true"><span>✦</span><i /><span>♡</span><i /><span>✦</span></div>

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
        <div className="scroll-indicator" aria-hidden="true"><span>scroll to bloom</span><ChevronDown size={16} /></div>
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

            <div className="sample-bouquets">
              <div className="sample-heading"><strong>premium sample bouquets</strong><span>start with a little magic</span></div>
              <div className="sample-grid">
                {SAMPLE_BOUQUETS.map((sample) => (
                  <button key={sample.id} className="sample-card" type="button" onClick={() => applySample(sample)}>
                    <span className="sample-mini-bouquet">{sample.flowers.slice(0, 4).map((f, i) => <FlowerIllustration key={`${f}-${i}`} flower={f} palette={sample.palette} scale={f.startsWith("pixel") ? .42 : .48} />)}</span>
                    <span className="sample-card-copy"><b>{sample.label}</b><small>{sample.description}</small></span>
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
            <SectionTitle number="04" subtitle="silk, velvet, lace & garden ties">
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
            <div className="wrap-playground">
              <div className="wrap-playground-title"><strong>funky floral papers</strong><span>patterns for the mood, not just the bouquet</span></div>
              <div className="funky-wrap-row">
                {WRAPS.slice(0, 12).map((item, i) => (
                  <button key={`funky-${item.id}`} className={`funky-wrap ${wrap === item.id ? "active" : ""}`} onClick={() => { setWrap(item.id); setAssembled(false); }}>
                    <span className={`funky-paper funky-${item.pattern || "plain"}`} style={{"--paper": item.bg}}><PatternBackground wrap={item}/></span>
                    <small>{item.label}</small>
                  </button>
                ))}
              </div>
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
            previewTheme={previewTheme}
          />

          <div className="preview-design-board">
            <div className="design-board-heading">
              <div><strong>make the whole scene yours</strong><span>choose a floral world for the preview</span></div>
            </div>
            <div className="theme-chip-row">
              {THEMED_COLLECTIONS.map((theme) => (
                <button key={theme.id} className={`theme-chip ${previewTheme === theme.theme ? "active" : ""}`} onClick={() => { setPreviewTheme(theme.theme); setSelected(theme.flowers); setAssembled(false); }}>
                  <b>{theme.label}</b><small>{theme.description}</small>
                </button>
              ))}
            </div>
          </div>

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
        <div style={{ marginTop: 6 }}>jhilmil · virtual flower house</div>
      </footer>
    </main>
  );
}

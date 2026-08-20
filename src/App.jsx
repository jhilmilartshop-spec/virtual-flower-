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
  Wand2,
  Leaf,
  Gift,
} from "lucide-react";

/* =========================================================
   JHILMIIL — VIRTUAL FLOWER HOUSE
   Warm / pastel / romantic stationery-inspired redesign
========================================================= */

const FLOWER_TYPES = [
  {
    id: "daisy",
    label: "daisies",
    petals: 14,
    petalShape: "daisy",
    colors: ["#FFF9E6", "#FFFDF3"],
    centerColor: "#E9B949",
    accent: "#F2C94C",
    emoji: "🌼",
  },
  {
    id: "lily",
    label: "lilies",
    petals: 6,
    petalShape: "lily",
    colors: ["#F49BA7", "#F8C1C9", "#FFE0E4"],
    centerColor: "#D97887",
    accent: "#E99AA5",
    emoji: "🌷",
  },
  {
    id: "mum",
    label: "chrysanthemums",
    petals: 20,
    petalShape: "mum",
    colors: ["#F7D477", "#F2BE4B", "#E9A93A"],
    centerColor: "#B87927",
    accent: "#E8B75A",
    emoji: "🌼",
  },
  {
    id: "orchid",
    label: "orchids",
    petals: 5,
    petalShape: "orchid",
    colors: ["#CDB4DB", "#DEC9E9", "#F0DDF5"],
    centerColor: "#A67BB5",
    accent: "#B992C4",
    emoji: "🪻",
  },
  {
    id: "wild",
    label: "wildflowers",
    petals: 7,
    petalShape: "wild",
    colors: ["#A9D8D0", "#C5E8E2", "#E1F4EF"],
    centerColor: "#6EA99F",
    accent: "#89BDB5",
    emoji: "✿",
  },
  {
    id: "tulip",
    label: "tulips",
    petals: 6,
    petalShape: "tulip",
    colors: ["#F3A7C1", "#F8C5D6", "#FBDCE7"],
    centerColor: "#D87899",
    accent: "#E9A0BB",
    emoji: "🌷",
  },
  {
    id: "rose",
    label: "roses",
    petals: 12,
    petalShape: "rose",
    colors: ["#D98591", "#C96F7D", "#B75B6B"],
    centerColor: "#914955",
    accent: "#C87582",
    emoji: "🌹",
  },
  {
    id: "peony",
    label: "peonies",
    petals: 16,
    petalShape: "peony",
    colors: ["#F6B7C8", "#F8CBD7", "#FCE1E8"],
    centerColor: "#E38CA7",
    accent: "#EAA5B9",
    emoji: "🌸",
  },
  {
    id: "ranunculus",
    label: "ranunculus",
    petals: 14,
    petalShape: "ranunculus",
    colors: ["#E9B4D8", "#F0C8E4", "#F6DCEB"],
    centerColor: "#C783AF",
    accent: "#D69BC3",
    emoji: "✿",
  },
  {
    id: "sunflower",
    label: "sunflowers",
    petals: 18,
    petalShape: "sunflower",
    colors: ["#F7D66B", "#F3C84F", "#EAB33D"],
    centerColor: "#76543A",
    accent: "#E5B849",
    emoji: "🌻",
  },
  {
    id: "babysbreath",
    label: "baby's breath",
    spray: true,
    colors: ["#FFFDF7"],
    centerColor: "#EDE6DC",
    accent: "#D9D0C5",
    emoji: "·",
  },
];

const ARRANGEMENTS = [
  { id: "round", label: "hand-tied round", icon: "◯" },
  { id: "cascade", label: "cascading", icon: "⌁" },
  { id: "wild", label: "wild gather", icon: "✽" },
  { id: "formal", label: "tiered formal", icon: "≋" },
];

const RIBBONS = [
  { id: "rose", label: "dusty rose", hex: "#C9828D" },
  { id: "lilac", label: "soft lilac", hex: "#A995BC" },
  { id: "butter", label: "butter", hex: "#D9AF55" },
  { id: "cream", label: "cream", hex: "#F4E6D0" },
  { id: "peach", label: "peach", hex: "#E6A58F" },
];

const WRAPS = [
  {
    id: "blush",
    label: "rose garden",
    base: "#F3C7C8",
    pattern: "flowers",
    preview: "🌸",
  },
  {
    id: "gingham",
    label: "strawberry gingham",
    base: "#F5D5D0",
    pattern: "gingham",
    preview: "⌗",
  },
  {
    id: "bows",
    label: "little bows",
    base: "#E7D9EA",
    pattern: "bows",
    preview: "🎀",
  },
  {
    id: "sage",
    label: "garden vines",
    base: "#CBD8BE",
    pattern: "vines",
    preview: "❧",
  },
  {
    id: "butter",
    label: "sunny hearts",
    base: "#F4DE9D",
    pattern: "hearts",
    preview: "♡",
  },
  {
    id: "lavender",
    label: "tiny stars",
    base: "#D9CDE5",
    pattern: "stars",
    preview: "✦",
  },
  {
    id: "peach",
    label: "peach petals",
    base: "#F1C3AE",
    pattern: "petals",
    preview: "✿",
  },
  {
    id: "cream",
    label: "quiet paper",
    base: "#F7EBDD",
    pattern: "dots",
    preview: "·",
  },
];

/* =========================================================
   DECORATIVE HEARTS
========================================================= */

const HEART_STYLES = [
  { char: "♡", className: "heart-outline" },
  { char: "♥", className: "heart-solid" },
  { char: "ෆ", className: "heart-soft" },
  { char: "♡", className: "heart-sketch" },
  { char: "♥︎", className: "heart-tiny" },
];

function FloatingHeart({ index }) {
  const style = {
    left: `${6 + ((index * 17.3) % 88)}%`,
    top: `${8 + ((index * 23.7) % 76)}%`,
    animationDelay: `${(index * 0.73) % 5}s`,
    animationDuration: `${5 + (index % 4)}s`,
    fontSize: `${12 + (index % 4) * 6}px`,
  };

  const heart = HEART_STYLES[index % HEART_STYLES.length];

  return (
    <span
      className={`floating-heart ${heart.className}`}
      style={style}
      aria-hidden="true"
    >
      {heart.char}
    </span>
  );
}

function Sparkle({ style }) {
  return (
    <span className="sparkle" style={style}>
      ✦
    </span>
  );
}

/* =========================================================
   FLOWERS
========================================================= */

function Petal({
  shape,
  color,
  rotate,
  dist,
  scale = 1,
  opacity = 0.95,
}) {
  const shapes = {
    daisy: {
      w: 10,
      h: 17,
      r: "60% 60% 45% 45%",
    },
    lily: {
      w: 12,
      h: 20,
      r: "65% 65% 45% 45%",
    },
    mum: {
      w: 6,
      h: 15,
      r: "70% 70% 40% 40%",
    },
    orchid: {
      w: 13,
      h: 17,
      r: "65% 35% 65% 45%",
    },
    wild: {
      w: 8,
      h: 12,
      r: "50% 50% 50% 50%",
    },
    tulip: {
      w: 14,
      h: 18,
      r: "50% 50% 70% 70%",
    },
    rose: {
      w: 11,
      h: 14,
      r: "45% 70% 45% 70%",
    },
    peony: {
      w: 11,
      h: 14,
      r: "55% 55% 65% 50%",
    },
    ranunculus: {
      w: 9,
      h: 11,
      r: "50% 50% 50% 50%",
    },
    sunflower: {
      w: 7,
      h: 22,
      r: "50% 50% 15% 15%",
    },
  };

  const s = shapes[shape] || shapes.daisy;

  return (
    <div
      className="petal"
      style={{
        position: "absolute",
        width: s.w * scale,
        height: s.h * scale,
        background: color,
        borderRadius: s.r,
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) rotate(${rotate}deg) translateY(-${dist}px)`,
        opacity,
      }}
    />
  );
}

function Flower({
  type,
  size = 1,
  seedColor,
  style,
  animDelay = 0,
  sway = false,
}) {
  const def =
    FLOWER_TYPES.find((flower) => flower.id === type) || FLOWER_TYPES[0];

  const color = seedColor || def.colors[0];
  const layers = def.layers || (type === "rose" || type === "peony" ? 3 : 1);

  return (
    <div
      className={sway ? "flower sway" : "flower"}
      style={{
        width: 58 * size,
        height: 58 * size,
        animationDelay: `${animDelay}s`,
        ...style,
      }}
    >
      {def.spray ? (
        <>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30;
            const distance = (12 + (i % 4) * 7) * size;
            const x =
              Math.cos((angle * Math.PI) / 180) * distance;
            const y =
              Math.sin((angle * Math.PI) / 180) * distance;

            return (
              <div
                key={i}
                className="breath-dot"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              />
            );
          })}
        </>
      ) : (
        <>
          {Array.from({ length: layers }).map((_, layer) =>
            Array.from({ length: def.petals }).map((_, i) => {
              const layerColor =
                def.colors[Math.min(layer, def.colors.length - 1)];

              return (
                <Petal
                  key={`${layer}-${i}`}
                  shape={def.petalShape}
                  color={layerColor}
                  rotate={
                    (360 / def.petals) * i +
                    layer * (180 / def.petals)
                  }
                  dist={9 * size * (1 - layer * 0.19)}
                  scale={(1 - layer * 0.14) * size}
                  opacity={0.94 - layer * 0.13}
                />
              );
            })
          )}

          <div
            className="flower-center"
            style={{
              background: def.centerColor,
              width: 11 * size,
              height: 11 * size,
            }}
          />
        </>
      )}
    </div>
  );
}

/* =========================================================
   WRAPPING PAPER
========================================================= */

function PatternBackground({ wrap, className = "" }) {
  const paper = WRAPS.find((item) => item.id === wrap) || WRAPS[0];

  return (
    <div
      className={`pattern-background pattern-${paper.pattern} ${className}`}
      style={{
        "--paper": paper.base,
      }}
    >
      {paper.pattern === "flowers" &&
        Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="pattern-flower">
            {i % 3 === 0 ? "✿" : i % 3 === 1 ? "·" : "❀"}
          </span>
        ))}

      {paper.pattern === "bows" &&
        Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="pattern-bow">
            ♡
          </span>
        ))}

      {paper.pattern === "hearts" &&
        Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="pattern-heart">
            {i % 2 ? "♡" : "♥"}
          </span>
        ))}

      {paper.pattern === "stars" &&
        Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="pattern-star">
            {i % 3 ? "✦" : "·"}
          </span>
        ))}

      {paper.pattern === "vines" &&
        Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="pattern-vine">
            ❧
          </span>
        ))}

      {paper.pattern === "petals" &&
        Array.from({ length: 22 }).map((_, i) => (
          <span key={i} className="pattern-petal">
            {i % 2 ? "✿" : "·"}
          </span>
        ))}

      {paper.pattern === "dots" &&
        Array.from({ length: 35 }).map((_, i) => (
          <span key={i} className="pattern-dot" />
        ))}

      {paper.pattern === "gingham" && (
        <div className="gingham-grid" />
      )}
    </div>
  );
}

/* =========================================================
   BOUQUET POSITIONING
========================================================= */

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function getStemPosition(i, n, style) {
  const spread = 165;

  if (style === "wild") {
    const r1 = pseudoRandom(i * 3.1);
    const r2 = pseudoRandom(i * 7.7 + 1);

    return {
      offset: (r1 - 0.5) * spread * 1.25,
      lift: 38 + r2 * 85,
      rotate: (r1 - 0.5) * 42,
    };
  }

  if (style === "cascade") {
    const mainCount = Math.max(Math.ceil(n * 0.6), 1);

    if (i < mainCount) {
      const offset =
        mainCount > 1
          ? (i / (mainCount - 1) - 0.5) * spread * 0.8
          : 0;

      return {
        offset,
        lift: 105 - Math.abs(offset) * 0.3,
        rotate: offset * 0.1,
      };
    }

    const j = i - mainCount;
    const trailCount = Math.max(n - mainCount, 1);
    const offset =
      (j / Math.max(trailCount - 1, 1) - 0.5) * 44;

    return {
      offset,
      lift: 95 - (j + 1) * 32,
      rotate: offset * 0.3,
    };
  }

  if (style === "formal") {
    const cols = Math.min(n, 5) || 1;
    const row = Math.floor(i / cols);
    const rowStart = row * cols;
    const rowCount = Math.min(cols, n - rowStart);
    const col = i - rowStart;

    const offset =
      rowCount > 1
        ? (col / (rowCount - 1) - 0.5) * spread
        : 0;

    return {
      offset,
      lift: 58 + row * 33,
      rotate: 0,
    };
  }

  const offset =
    n > 1 ? (i / (n - 1) - 0.5) * spread : 0;

  return {
    offset,
    lift: 67 - Math.abs(offset) * 0.35,
    rotate: offset * 0.12,
  };
}

/* =========================================================
   BOUQUET PREVIEW
========================================================= */

function BouquetPreview({
  selected,
  ribbon,
  wrap,
  size,
  arrangement,
}) {
  const ribbonHex =
    RIBBONS.find((r) => r.id === ribbon)?.hex || "#C9828D";

  const stems = useMemo(() => {
    const result = [];
    let idx = 0;

    selected.forEach((flowerId) => {
      const def = FLOWER_TYPES.find((f) => f.id === flowerId);

      if (!def) return;

      const count =
        size === "large" ? 6 : size === "medium" ? 4 : 3;

      for (let i = 0; i < count; i++) {
        result.push({
          type: flowerId,
          color: def.colors[i % def.colors.length],
          idx: idx++,
        });
      }
    });

    return result;
  }, [selected, size]);

  return (
    <div className="bouquet-stage">
      <div className="preview-sparkles">
        <Sparkle
          style={{
            left: "16%",
            top: "19%",
            animationDelay: "0s",
          }}
        />
        <Sparkle
          style={{
            right: "17%",
            top: "26%",
            animationDelay: "1.3s",
          }}
        />
        <Sparkle
          style={{
            left: "28%",
            bottom: "24%",
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="bouquet-paper">
        <PatternBackground wrap={wrap} />

        <div className="paper-fold paper-fold-left" />
        <div className="paper-fold paper-fold-right" />

        <div
          className="paper-ribbon"
          style={{
            background: ribbonHex,
          }}
        />

        <div
          className="ribbon-knot"
          style={{
            background: ribbonHex,
          }}
        />

        <div
          className="ribbon-tail ribbon-tail-left"
          style={{ background: ribbonHex }}
        />

        <div
          className="ribbon-tail ribbon-tail-right"
          style={{ background: ribbonHex }}
        />
      </div>

      <div className="bouquet-flowers">
        {stems.length === 0 && (
          <div className="empty-bouquet">
            <Flower2 size={25} />
            <span>choose a few flowers<br />to begin</span>
          </div>
        )}

        {stems.map((stem, i) => {
          const { offset, lift, rotate } =
            getStemPosition(i, stems.length, arrangement);

          return (
            <div
              key={`${stem.type}-${i}`}
              className="bouquet-flower"
              style={{
                left: `calc(50% + ${offset}px)`,
                bottom: `${lift}px`,
                transform: `translateX(-50%) rotate(${rotate}deg)`,
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <div className="stem-line" />
              <Flower
                type={stem.type}
                seedColor={stem.color}
                size={0.82}
                sway
                animDelay={i * 0.2}
              />
            </div>
          );
        })}
      </div>

      <div className="bouquet-shadow" />
    </div>
  );
}

/* =========================================================
   GARDEN HERO
========================================================= */

function GardenHero() {
  const hearts = Array.from({ length: 22 });
  const flowers = [
    ["daisy", 0.7, 8, 24],
    ["peony", 0.72, 19, 32],
    ["wild", 0.62, 29, 20],
    ["tulip", 0.7, 71, 24],
    ["orchid", 0.74, 82, 31],
    ["sunflower", 0.65, 91, 21],
    ["rose", 0.67, 39, 29],
    ["lily", 0.7, 61, 27],
  ];

  return (
    <section className="hero">
      <div className="hero-paper-texture" />

      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <div className="hero-moon">
        <div className="moon-glow" />
      </div>

      {hearts.map((_, i) => (
        <FloatingHeart key={i} index={i} />
      ))}

      <Sparkle
        style={{
          left: "20%",
          top: "27%",
          fontSize: "18px",
        }}
      />
      <Sparkle
        style={{
          right: "24%",
          top: "18%",
          fontSize: "13px",
        }}
      />
      <Sparkle
        style={{
          left: "73%",
          top: "45%",
          fontSize: "11px",
        }}
      />

      <div className="hero-grass hero-grass-back" />
      <div className="hero-grass hero-grass-front" />

      <div className="hero-botanical">
        <svg
          viewBox="0 0 500 220"
          preserveAspectRatio="xMidYMax meet"
        >
          <path
            d="M40 220 C60 70 170 20 250 55 C330 20 440 70 460 220"
            fill="none"
            stroke="#718D67"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M85 180 C120 110 145 82 185 64"
            fill="none"
            stroke="#8FA27C"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M415 180 C380 110 355 82 315 64"
            fill="none"
            stroke="#8FA27C"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {Array.from({ length: 13 }).map((_, i) => {
            const x = 62 + i * 31;
            const y =
              174 -
              Math.sin((i / 12) * Math.PI) * 115;

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={i % 2 ? "#D9A8C8" : "#F4D48A"}
                />
                <circle
                  cx={x + 2}
                  cy={y - 2}
                  r="3"
                  fill="#FFF7E8"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {flowers.map(([type, size, left, bottom], i) => (
        <Flower
          key={`${type}-${i}`}
          type={type}
          size={size}
          sway
          animDelay={i * 0.22}
          style={{
            position: "absolute",
            left: `${left}%`,
            bottom: `${bottom}%`,
          }}
        />
      ))}

      <div className="hero-brand">
        <div className="brand-name">jhilmiil</div>
        <div className="brand-subtitle">
          virtual flower house
        </div>
      </div>

      <div className="hero-copy">
        <div className="eyebrow">
          <span>✦</span>
          a little garden on the internet
          <span>✦</span>
        </div>

        <h1>
          grow me
          <br />
          <em>a bouquet</em>
        </h1>

        <p>
          daisies everywhere, lilies at dusk,
          <br className="mobile-hide" />
          an orchid arch against the last light.
          <br />
          pick your blooms and wrap something
          <br className="mobile-hide" />
          someone will keep.
        </p>

        <a href="#assembling" className="hero-button">
          <span>enter the garden</span>
          <span className="hero-button-heart">♡</span>
        </a>
      </div>

      <div className="scroll-note">
        <span>scroll slowly</span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}

/* =========================================================
   UI COMPONENTS
========================================================= */

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      {eyebrow && (
        <div className="section-eyebrow">
          <span>✦</span>
          {eyebrow}
          <span>✦</span>
        </div>
      )}

      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </div>
  );
}

function FlowerChoice({ flower, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flower-choice ${active ? "selected" : ""}`}
      aria-pressed={active}
    >
      <div className="flower-choice-art">
        <Flower type={flower.id} size={0.6} />
        {active && (
          <span className="choice-check">
            <Check size={12} />
          </span>
        )}
      </div>

      <span>{flower.label}</span>
    </button>
  );
}

function Toggle({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`soft-toggle ${active ? "active" : ""}`}
    >
      {children}
    </button>
  );
}

function SwatchButton({
  item,
  active,
  onClick,
  type = "ribbon",
}) {
  return (
    <button
      onClick={onClick}
      className={`swatch-button ${active ? "active" : ""}`}
      title={item.label}
      aria-label={item.label}
    >
      <span
        className={`swatch ${type === "wrap" ? "pattern-swatch" : ""}`}
        style={
          type === "wrap"
            ? { "--paper": item.base }
            : { background: item.hex }
        }
      >
        {type === "wrap" && (
          <PatternBackground wrap={item.id} />
        )}

        {active && (
          <span className="swatch-check">
            <Check size={13} />
          </span>
        )}
      </span>

      <span className="swatch-label">{item.label}</span>
    </button>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [selected, setSelected] = useState([
    "daisy",
    "orchid",
    "peony",
  ]);

  const [ribbon, setRibbon] = useState("rose");
  const [wrap, setWrap] = useState("blush");
  const [size, setSize] = useState("medium");
  const [arrangement, setArrangement] = useState("round");
  const [note, setNote] = useState("");
  const [assembled, setAssembled] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleFlower = (id) => {
    setAssembled(false);

    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((flower) => flower !== id)
        : [...prev, id]
    );
  };

  const wrapItUp = () => {
    if (!selected.length) return;

    setAssembled(true);

    const payload = {
      selected,
      ribbon,
      wrap,
      size,
      arrangement,
      note,
    };

    const token = btoa(
      unescape(encodeURIComponent(JSON.stringify(payload)))
    ).slice(0, 24);

    setShareUrl(`https://jhilmiil.app/b/${token}`);
    setCopied(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    "a bouquet for you, from jhilmiil"
  )}&body=${encodeURIComponent(
    (note ? `${note}\n\n` : "") +
      `open your bouquet here: ${shareUrl}`
  )}`;

  const qrSrc = shareUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
        shareUrl
      )}`
    : "";

  return (
    <div className="site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=Italiana&display=swap');

        :root {
          --cream: #FFF8EC;
          --cream-2: #FFF1DF;
          --paper: #F7EBDD;
          --brown: #765B52;
          --brown-dark: #513C50;
          --rose: #D98591;
          --rose-light: #F3C7C8;
          --peach: #E6A58F;
          --lilac: #CBB7D9;
          --sage: #B8C8A8;
          --butter: #F4DE9D;
          --white: #FFFDF8;
          --shadow: rgba(83, 60, 64, 0.13);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--cream);
          color: var(--brown-dark);
          font-family: "DM Sans", sans-serif;
        }

        button,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .site {
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 10% 20%, rgba(243,199,200,.25), transparent 22%),
            radial-gradient(circle at 90% 55%, rgba(203,183,217,.2), transparent 25%),
            var(--cream);
        }

        /* ---------------- HERO ---------------- */

        .hero {
          position: relative;
          min-height: 760px;
          height: 93vh;
          overflow: hidden;
          border-radius: 0 0 55px 55px;
          isolation: isolate;
          background:
            linear-gradient(
              180deg,
              #77627C 0%,
              #B88B9A 31%,
              #E7B39F 58%,
              #F5D8A5 78%,
              #D3D9B7 100%
            );
        }

        .hero-paper-texture {
          position: absolute;
          inset: 0;
          opacity: .22;
          background-image:
            radial-gradient(rgba(255,255,255,.8) .7px, transparent .7px);
          background-size: 8px 8px;
          mix-blend-mode: soft-light;
          pointer-events: none;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          opacity: .55;
          animation: orbFloat 8s ease-in-out infinite;
        }

        .hero-orb-one {
          width: 180px;
          height: 180px;
          background: rgba(255,225,191,.23);
          left: -50px;
          top: 18%;
        }

        .hero-orb-two {
          width: 230px;
          height: 230px;
          background: rgba(238,205,232,.18);
          right: -90px;
          top: 35%;
          animation-delay: -3s;
        }

        .hero-moon {
          position: absolute;
          left: 50%;
          top: 36%;
          width: 145px;
          height: 145px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 38% 34%,
              #FFF9E6 0%,
              #F8E6BE 42%,
              #EFCD94 65%,
              transparent 68%
            );
          animation: moonBreath 6s ease-in-out infinite;
        }

        .moon-glow {
          position: absolute;
          inset: -45px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255,235,188,.27),
            transparent 67%
          );
          z-index: -1;
        }

        .hero-brand {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: #FFF8ED;
          z-index: 10;
        }

        .brand-name {
          font-family: "Italiana", serif;
          font-size: 31px;
          letter-spacing: .12em;
        }

        .brand-subtitle {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: .32em;
          opacity: .76;
          margin-top: 2px;
        }

        .hero-copy {
          position: absolute;
          z-index: 9;
          left: 50%;
          top: 51%;
          width: min(650px, 92vw);
          transform: translate(-50%, -50%);
          text-align: center;
          color: #FFF9EF;
        }

        .eyebrow,
        .section-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: .22em;
          font-size: 9px;
          font-weight: 600;
          opacity: .82;
        }

        .eyebrow span,
        .section-eyebrow span {
          font-size: 10px;
        }

        .hero h1 {
          margin: 17px 0 15px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(60px, 9vw, 105px);
          line-height: .78;
          font-weight: 500;
          letter-spacing: -.04em;
          text-shadow: 0 5px 25px rgba(75,45,56,.12);
        }

        .hero h1 em {
          font-style: italic;
          font-weight: 400;
        }

        .hero-copy p {
          margin: 0 auto;
          max-width: 500px;
          font-family: "Cormorant Garamond", serif;
          font-size: 18px;
          line-height: 1.42;
          opacity: .9;
        }

        .hero-button {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          margin-top: 28px;
          padding: 13px 20px 13px 23px;
          color: var(--brown-dark);
          background: rgba(255,249,239,.93);
          border: 1px solid rgba(255,255,255,.7);
          border-radius: 999px;
          text-decoration: none;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .14em;
          box-shadow: 0 12px 35px rgba(91,61,70,.12);
          transition:
            transform .3s ease,
            box-shadow .3s ease;
        }

        .hero-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 45px rgba(91,61,70,.2);
        }

        .hero-button-heart {
          font-size: 18px;
          line-height: 1;
          transition: transform .3s ease;
        }

        .hero-button:hover .hero-button-heart {
          transform: scale(1.25) rotate(-8deg);
        }

        .scroll-note {
          position: absolute;
          z-index: 10;
          left: 50%;
          bottom: 23px;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,249,239,.72);
          font-size: 8px;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .scroll-line {
          width: 38px;
          height: 1px;
          background: rgba(255,249,239,.5);
        }

        /* ---------------- HEARTS ---------------- */

        .floating-heart {
          position: absolute;
          z-index: 5;
          color: rgba(255,246,231,.7);
          pointer-events: none;
          user-select: none;
          animation: floatHeart 6s ease-in-out infinite;
        }

        .heart-outline {
          text-shadow: 0 1px 0 rgba(255,255,255,.25);
        }

        .heart-solid {
          color: rgba(245,180,186,.7);
        }

        .heart-soft {
          font-family: serif;
          color: rgba(255,236,222,.72);
        }

        .heart-sketch {
          color: rgba(255,249,232,.55);
          transform: rotate(-12deg);
        }

        .heart-tiny {
          color: rgba(214,164,184,.65);
        }

        .sparkle {
          position: absolute;
          z-index: 7;
          color: rgba(255,248,225,.9);
          animation: sparkle 3.2s ease-in-out infinite;
          pointer-events: none;
        }

        /* ---------------- HERO GARDEN ---------------- */

        .hero-grass {
          position: absolute;
          z-index: 2;
          left: -8%;
          width: 116%;
          border-radius: 50% 50% 0 0;
        }

        .hero-grass-back {
          bottom: -3%;
          height: 29%;
          background: #849875;
          transform: rotate(-2deg);
        }

        .hero-grass-front {
          bottom: -9%;
          height: 23%;
          background: #657D5C;
          transform: rotate(2deg);
        }

        .hero-botanical {
          position: absolute;
          z-index: 3;
          left: 50%;
          bottom: 0;
          width: min(570px, 90vw);
          height: 280px;
          transform: translateX(-50%);
          opacity: .94;
        }

        .flower {
          position: relative;
          display: block;
          flex-shrink: 0;
          transform-origin: center bottom;
        }

        .flower.sway {
          animation: flowerSway 5.5s ease-in-out infinite;
        }

        .petal {
          box-shadow:
            inset -2px -2px 3px rgba(105,65,65,.08),
            inset 2px 1px 2px rgba(255,255,255,.28);
          filter: saturate(.94);
          transform-origin: 50% 100%;
        }

        .flower-center {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow:
            inset -2px -2px 3px rgba(90,50,50,.18),
            0 1px 3px rgba(90,50,50,.1);
        }

        .breath-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #FFFDF8;
          box-shadow: 0 0 3px rgba(255,255,255,.8);
        }

        /* ---------------- ASSEMBLING ---------------- */

        .assembling {
          position: relative;
          padding: 100px 24px 120px;
        }

        .assembling::before {
          content: "";
          position: absolute;
          top: -35px;
          left: 0;
          right: 0;
          height: 70px;
          background: var(--cream);
          border-radius: 50% 50% 0 0;
        }

        .section-heading {
          position: relative;
          max-width: 760px;
          margin: 0 auto 62px;
          text-align: center;
        }

        .section-eyebrow {
          color: var(--rose);
          opacity: 1;
        }

        .section-heading h2 {
          margin: 13px 0 10px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(40px, 5vw, 61px);
          font-weight: 500;
          line-height: .95;
          color: var(--brown-dark);
          letter-spacing: -.025em;
        }

        .section-heading p {
          max-width: 470px;
          margin: auto;
          color: #927D77;
          font-family: "Cormorant Garamond", serif;
          font-size: 18px;
          line-height: 1.45;
        }

        .builder {
          max-width: 1150px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(390px, .92fr);
          gap: 70px;
          align-items: start;
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 42px;
        }

        .control-group {
          position: relative;
        }

        .control-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
          color: var(--brown-dark);
          font-family: "Cormorant Garamond", serif;
          font-size: 22px;
        }

        .control-label small {
          color: #B3948A;
          font-family: "DM Sans", sans-serif;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .16em;
        }

        /* flower cards */

        .flower-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 9px;
        }

        .flower-choice {
          position: relative;
          min-height: 112px;
          padding: 10px 5px 8px;
          border: 1px solid rgba(166,133,126,.16);
          background: rgba(255,253,248,.52);
          border-radius: 18px;
          color: var(--brown);
          transition:
            transform .25s ease,
            background .25s ease,
            border-color .25s ease,
            box-shadow .25s ease;
        }

        .flower-choice:hover {
          transform: translateY(-4px);
          background: #FFFDF8;
          border-color: rgba(201,130,141,.35);
          box-shadow: 0 10px 25px var(--shadow);
        }

        .flower-choice.selected {
          background: #FFFDF8;
          border-color: rgba(201,130,141,.62);
          box-shadow:
            0 9px 25px rgba(201,130,141,.12),
            inset 0 0 0 1px rgba(201,130,141,.08);
        }

        .flower-choice-art {
          position: relative;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .flower-choice > span:last-child {
          display: block;
          font-size: 9px;
          line-height: 1.15;
        }

        .choice-check {
          position: absolute;
          top: 0;
          right: 2px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: white;
          background: var(--rose);
        }

        /* toggles */

        .toggle-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .soft-toggle {
          padding: 10px 14px;
          border: 1px solid #E3D2CA;
          border-radius: 999px;
          background: rgba(255,253,248,.55);
          color: var(--brown);
          font-size: 10px;
          transition: all .25s ease;
        }

        .soft-toggle:hover {
          border-color: var(--rose);
          transform: translateY(-2px);
        }

        .soft-toggle.active {
          color: #FFFDF8;
          background: var(--brown-dark);
          border-color: var(--brown-dark);
          box-shadow: 0 7px 16px rgba(81,60,80,.15);
        }

        /* swatches */

        .swatch-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .swatch-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--brown);
        }

        .swatch {
          position: relative;
          width: 54px;
          height: 54px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 3px solid transparent;
          box-shadow: 0 4px 12px rgba(88,60,60,.09);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .swatch-button:hover .swatch {
          transform: translateY(-3px) rotate(2deg);
          box-shadow: 0 9px 18px rgba(88,60,60,.13);
        }

        .swatch-button.active .swatch {
          border-color: var(--brown-dark);
          box-shadow: 0 0 0 4px rgba(201,130,141,.15);
        }

        .swatch-label {
          max-width: 65px;
          font-size: 8px;
          line-height: 1.15;
          text-align: center;
        }

        .swatch-check {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: rgba(81,60,80,.24);
        }

        /* note */

        .note-paper {
          position: relative;
          padding: 18px;
          background:
            linear-gradient(
              rgba(255,255,255,.22) 1px,
              transparent 1px
            ),
            #F5E4D0;
          background-size: 100% 27px;
          border: 1px solid #E5CDB9;
          border-radius: 18px;
          box-shadow: 0 9px 25px rgba(110,75,65,.05);
        }

        .note-paper::before {
          content: "♡";
          position: absolute;
          top: 10px;
          right: 15px;
          color: rgba(201,130,141,.45);
          font-size: 18px;
        }

        .note-paper textarea {
          width: 100%;
          min-height: 110px;
          resize: vertical;
          border: 0;
          outline: none;
          background: transparent;
          color: var(--brown-dark);
          font-family: "Cormorant Garamond", serif;
          font-size: 19px;
          line-height: 1.4;
        }

        .note-paper textarea::placeholder {
          color: #AA9084;
        }

        /* wrap button */

        .wrap-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-width: 190px;
          padding: 14px 21px;
          overflow: hidden;
          border: 0;
          border-radius: 999px;
          color: #FFFDF8;
          background: var(--brown-dark);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .16em;
          box-shadow: 0 13px 30px rgba(81,60,80,.18);
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .wrap-button::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 140px;
          top: -30px;
          left: -60px;
          background: rgba(255,255,255,.22);
          transform: rotate(20deg);
          transition: left .55s ease;
        }

        .wrap-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 17px 35px rgba(81,60,80,.24);
        }

        .wrap-button:hover::after {
          left: 220px;
        }

        /* ---------------- PREVIEW ---------------- */

        .preview-column {
          position: sticky;
          top: 24px;
        }

        .preview-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 7px 12px;
          color: #A08077;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .18em;
        }

        .preview-label span:last-child {
          color: var(--rose);
        }

        .preview-card {
          position: relative;
          min-height: 540px;
          overflow: hidden;
          border-radius: 30px;
          background:
            radial-gradient(
              circle at 50% 25%,
              rgba(255,255,255,.9),
              transparent 40%
            ),
            #F4E1D5;
          border: 1px solid rgba(166,133,126,.17);
          box-shadow:
            0 25px 60px rgba(91,66,66,.1),
            0 4px 12px rgba(91,66,66,.05);
        }

        .preview-card::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: .15;
          background-image: radial-gradient(#9A786F .6px, transparent .6px);
          background-size: 7px 7px;
          pointer-events: none;
        }

        .bouquet-stage {
          position: relative;
          height: 540px;
          overflow: hidden;
        }

        .preview-sparkles .sparkle {
          color: rgba(198,151,139,.75);
        }

        .bouquet-paper {
          position: absolute;
          z-index: 2;
          left: 50%;
          bottom: 38px;
          width: 245px;
          height: 260px;
          transform: translateX(-50%);
          clip-path: polygon(7% 0, 93% 0, 75% 100%, 25% 100%);
          overflow: hidden;
          filter: drop-shadow(0 13px 12px rgba(81,60,80,.15));
        }

        .pattern-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background-color: var(--paper);
        }

        .pattern-flower,
        .pattern-bow,
        .pattern-heart,
        .pattern-star,
        .pattern-vine,
        .pattern-petal {
          position: absolute;
          color: rgba(100,70,70,.2);
          font-family: "Cormorant Garamond", serif;
          user-select: none;
        }

        .pattern-flower:nth-child(3n) {
          color: rgba(255,255,255,.55);
        }

        .pattern-flower:nth-child(odd) {
          font-size: 14px;
        }

        .pattern-flower:nth-child(even) {
          font-size: 9px;
        }

        .pattern-bow {
          font-size: 21px;
          color: rgba(122,89,107,.24);
        }

        .pattern-heart {
          font-size: 17px;
          color: rgba(164,92,108,.22);
        }

        .pattern-star {
          font-size: 15px;
          color: rgba(110,84,112,.22);
        }

        .pattern-vine {
          font-size: 30px;
          color: rgba(81,111,75,.25);
        }

        .pattern-petal {
          font-size: 19px;
          color: rgba(137,91,83,.2);
        }

        .pattern-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(100,70,70,.15);
        }

        .gingham-grid {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(210,110,110,.13) 50%,
              transparent 50%
            ),
            linear-gradient(
              rgba(210,110,110,.13) 50%,
              transparent 50%
            );
          background-size: 22px 22px;
        }

        .pattern-background > :nth-child(2) {
          left: 13%;
          top: 13%;
        }

        .pattern-background > :nth-child(3) {
          left: 67%;
          top: 8%;
        }

        .pattern-background > :nth-child(4) {
          left: 35%;
          top: 28%;
        }

        .pattern-background > :nth-child(5) {
          left: 79%;
          top: 41%;
        }

        .pattern-background > :nth-child(6) {
          left: 12%;
          top: 53%;
        }

        .pattern-background > :nth-child(7) {
          left: 51%;
          top: 67%;
        }

        .pattern-background > :nth-child(8) {
          left: 76%;
          top: 80%;
        }

        .paper-fold {
          position: absolute;
          z-index: 4;
          bottom: 0;
          width: 0;
          height: 0;
          border-style: solid;
          opacity: .18;
        }

        .paper-fold-left {
          left: 0;
          border-width: 0 0 100px 75px;
          border-color: transparent transparent #80625B transparent;
        }

        .paper-fold-right {
          right: 0;
          border-width: 0 75px 100px 0;
          border-color: transparent #80625B transparent transparent;
        }

        .paper-ribbon {
          position: absolute;
          z-index: 5;
          left: 0;
          right: 0;
          top: 63%;
          height: 18px;
          box-shadow:
            inset 0 2px rgba(255,255,255,.23),
            inset 0 -2px rgba(90,50,50,.08);
        }

        .ribbon-knot {
          position: absolute;
          z-index: 6;
          left: 50%;
          top: calc(63% - 7px);
          width: 22px;
          height: 28px;
          transform: translateX(-50%) rotate(12deg);
          border-radius: 45% 45% 45% 20%;
          box-shadow: 0 3px 5px rgba(80,50,50,.12);
        }

        .ribbon-tail {
          position: absolute;
          z-index: 5;
          top: calc(63% + 12px);
          width: 34px;
          height: 70px;
          clip-path: polygon(0 0,100% 0,78% 100%,50% 84%,22% 100%);
          opacity: .92;
        }

        .ribbon-tail-left {
          left: calc(50% - 37px);
          transform: rotate(12deg);
        }

        .ribbon-tail-right {
          left: calc(50% + 5px);
          transform: rotate(-12deg);
        }

        .bouquet-flowers {
          position: absolute;
          z-index: 3;
          inset: 0;
        }

        .bouquet-flower {
          position: absolute;
          opacity: 0;
          animation: bouquetIn .7s cubic-bezier(.2,.8,.2,1) forwards;
          transform-origin: bottom center;
        }

        .stem-line {
          position: absolute;
          z-index: -1;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 175px;
          background: #728765;
          transform-origin: top center;
          opacity: .75;
        }

        .empty-bouquet {
          position: absolute;
          left: 50%;
          top: 46%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
          color: #AD9188;
          text-align: center;
          font-family: "Cormorant Garamond", serif;
          font-size: 18px;
          line-height: 1.05;
        }

        .bouquet-shadow {
          position: absolute;
          z-index: 1;
          left: 50%;
          bottom: 25px;
          width: 245px;
          height: 26px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(80,60,60,.13);
          filter: blur(10px);
        }

        /* ---------------- SHARE CARD ---------------- */

        .share-card {
          margin-top: 18px;
          padding: 23px;
          background: rgba(255,253,248,.86);
          border: 1px solid #E6D5CB;
          border-radius: 22px;
          box-shadow: 0 13px 35px rgba(91,66,66,.07);
          animation: cardAppear .5s ease both;
        }

        .share-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          color: var(--brown-dark);
          font-family: "Cormorant Garamond", serif;
          font-size: 22px;
        }

        .share-url {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          padding: 10px 13px;
          border-radius: 999px;
          background: #F9F0E7;
          color: var(--brown);
        }

        .share-url span {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: monospace;
          font-size: 9px;
        }

        .copy-button {
          border: 0;
          background: transparent;
          color: var(--rose);
          text-decoration: underline;
          font-size: 9px;
        }

        .share-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .email-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 14px;
          border: 1px solid #DCC6BD;
          border-radius: 999px;
          color: var(--brown-dark);
          background: transparent;
          text-decoration: none;
          font-size: 9px;
        }

        .qr {
          width: 72px;
          height: 72px;
          margin-left: auto;
          padding: 4px;
          border: 1px solid #E4D2C8;
          border-radius: 9px;
          background: white;
        }

        .share-note {
          margin-top: 14px;
          color: #AA9187;
          font-size: 8px;
          line-height: 1.5;
        }

        /* ---------------- FOOTER ---------------- */

        footer {
          padding: 0 24px 45px;
          text-align: center;
          color: #A38B82;
          font-size: 9px;
          letter-spacing: .04em;
        }

        .footer-line {
          width: 90px;
          height: 1px;
          margin: 0 auto 17px;
          background: #DCCAC0;
        }

        .footer-inner {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        /* ---------------- PATTERN SWATCH POSITIONS ---------------- */

        .pattern-swatch .pattern-background {
          transform: scale(1.3);
        }

        /* ---------------- ANIMATIONS ---------------- */

        @keyframes floatHeart {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-5deg);
            opacity: .25;
          }

          30% {
            opacity: .72;
          }

          50% {
            transform: translate3d(10px, -22px, 0) rotate(8deg);
          }

          75% {
            opacity: .55;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: .2;
            transform: scale(.75) rotate(0deg);
          }

          50% {
            opacity: 1;
            transform: scale(1.15) rotate(18deg);
          }
        }

        @keyframes flowerSway {
          0%, 100% {
            transform: rotate(-2deg);
          }

          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes moonBreath {
          0%, 100% {
            transform: translate(-50%, -50%) scale(.98);
          }

          50% {
            transform: translate(-50%, -50%) scale(1.04);
          }
        }

        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(25px, -18px);
          }
        }

        @keyframes bouquetIn {
          from {
            opacity: 0;
            transform:
              translateX(-50%)
              translateY(25px)
              scale(.72)
              rotate(-5deg);
          }

          to {
            opacity: 1;
            transform:
              translateX(-50%)
              translateY(0)
              scale(1)
              rotate(0deg);
          }
        }

        @keyframes cardAppear {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ---------------- RESPONSIVE ---------------- */

        @media (max-width: 900px) {
          .builder {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .preview-column {
            position: relative;
            top: auto;
          }

          .flower-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        @media (max-width: 650px) {
          .hero {
            min-height: 720px;
            height: 92vh;
            border-radius: 0 0 35px 35px;
          }

          .hero-copy {
            top: 48%;
          }

          .hero h1 {
            font-size: clamp(55px, 16vw, 78px);
          }

          .hero-copy p {
            font-size: 16px;
          }

          .mobile-hide {
            display: none;
          }

          .hero-botanical {
            width: 630px;
            bottom: -10px;
          }

          .hero .flower:nth-last-of-type(n+5) {
            display: none;
          }

          .assembling {
            padding: 80px 15px 90px;
          }

          .section-heading {
            margin-bottom: 40px;
          }

          .section-heading h2 {
            font-size: 44px;
          }

          .flower-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 7px;
          }

          .flower-choice {
            min-height: 105px;
          }

          .preview-card,
          .bouquet-stage {
            min-height: 500px;
            height: 500px;
          }

          .bouquet-paper {
            width: 220px;
            height: 245px;
          }

          .bouquet-shadow {
            width: 220px;
          }

          .qr {
            margin-left: 0;
          }

          .scroll-note {
            display: none;
          }
        }

        @media (max-width: 400px) {
          .flower-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .flower-choice > span:last-child {
            font-size: 8px;
          }

          .hero h1 {
            font-size: 55px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <GardenHero />

      <main
        className="assembling"
        id="assembling"
      >
        <SectionHeading
          eyebrow="the assembling table"
          title="pick your blooms"
          description="choose a few flowers, gather them your way, then wrap them in a little piece of paper someone will want to keep."
        />

        <div className="builder">
          <div className="controls">
            {/* FLOWERS */}
            <section className="control-group">
              <h3 className="control-label">
                <Flower2 size={17} />
                flowers
                <small>choose as many as you like</small>
              </h3>

              <div className="flower-grid">
                {FLOWER_TYPES.map((flower) => (
                  <FlowerChoice
                    key={flower.id}
                    flower={flower}
                    active={selected.includes(flower.id)}
                    onClick={() => toggleFlower(flower.id)}
                  />
                ))}
              </div>
            </section>

            {/* ARRANGEMENT */}
            <section className="control-group">
              <h3 className="control-label">
                <Leaf size={17} />
                how it's gathered
              </h3>

              <div className="toggle-row">
                {ARRANGEMENTS.map((arrangementOption) => (
                  <Toggle
                    key={arrangementOption.id}
                    active={
                      arrangement === arrangementOption.id
                    }
                    onClick={() => {
                      setArrangement(arrangementOption.id);
                      setAssembled(false);
                    }}
                  >
                    {arrangementOption.icon}{" "}
                    {arrangementOption.label}
                  </Toggle>
                ))}
              </div>
            </section>

            {/* SIZE */}
            <section className="control-group">
              <h3 className="control-label">
                <Gift size={17} />
                bouquet size
              </h3>

              <div className="toggle-row">
                {["small", "medium", "large"].map(
                  (bouquetSize) => (
                    <Toggle
                      key={bouquetSize}
                      active={size === bouquetSize}
                      onClick={() => {
                        setSize(bouquetSize);
                        setAssembled(false);
                      }}
                    >
                      {bouquetSize}
                    </Toggle>
                  )
                )}
              </div>
            </section>

            {/* RIBBON */}
            <section className="control-group">
              <h3 className="control-label">
                ribbon
                <small>tie it softly</small>
              </h3>

              <div className="swatch-row">
                {RIBBONS.map((item) => (
                  <SwatchButton
                    key={item.id}
                    item={item}
                    active={ribbon === item.id}
                    onClick={() => setRibbon(item.id)}
                  />
                ))}
              </div>
            </section>

            {/* WRAPPING PAPER */}
            <section className="control-group">
              <h3 className="control-label">
                wrapping paper
                <small>pick a pattern</small>
              </h3>

              <div className="swatch-row">
                {WRAPS.map((item) => (
                  <SwatchButton
                    key={item.id}
                    item={item}
                    type="wrap"
                    active={wrap === item.id}
                    onClick={() => setWrap(item.id)}
                  />
                ))}
              </div>
            </section>

            {/* NOTE */}
            <section className="control-group">
              <h3 className="control-label">
                a little note
                <small>optional, but sweet</small>
              </h3>

              <div className="note-paper">
                <textarea
                  value={note}
                  onChange={(event) =>
                    setNote(event.target.value)
                  }
                  placeholder="write something warm, lowercase and unhurried..."
                  rows={4}
                />
              </div>
            </section>

            <button
              onClick={wrapItUp}
              disabled={selected.length === 0}
              className="wrap-button"
            >
              <Wand2 size={16} />
              wrap it up
              <Heart size={13} fill="currentColor" />
            </button>
          </div>

          {/* PREVIEW */}
          <div className="preview-column">
            <div className="preview-label">
              <span>your little bouquet</span>
              <span>
                {selected.length} bloom
                {selected.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="preview-card">
              <BouquetPreview
                selected={selected}
                ribbon={ribbon}
                wrap={wrap}
                size={size}
                arrangement={arrangement}
              />
            </div>

            {assembled && (
              <div className="share-card">
                <div className="share-title">
                  <Share2 size={17} />
                  send this bouquet
                </div>

                <div className="share-url">
                  <Link2
                    size={14}
                    color="#A995BC"
                    style={{ flexShrink: 0 }}
                  />

                  <span>{shareUrl}</span>

                  <button
                    onClick={copyLink}
                    className="copy-button"
                  >
                    {copied ? "copied ♡" : "copy"}
                  </button>
                </div>

                <div className="share-actions">
                  <a
                    href={mailtoHref}
                    className="email-button"
                  >
                    <Mail size={14} />
                    email it
                  </a>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      color: "#A38B82",
                      fontSize: 8,
                    }}
                  >
                    <QrCode size={13} />
                    scan to open
                  </span>

                  {qrSrc && (
                    <img
                      src={qrSrc}
                      alt="QR code for bouquet link"
                      className="qr"
                    />
                  )}
                </div>

                <p className="share-note">
                  this link is a preview — once the site is
                  deployed with a database, it can open a real
                  page showing this exact bouquet and note.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-line" />

        <div className="footer-inner">
          <Flower2 size={12} />
          <span>
            jhilmiil · handpicked, wrapped with care
          </span>
          <span>♡</span>
        </div>
      </footer>
    </div>
  );
      }

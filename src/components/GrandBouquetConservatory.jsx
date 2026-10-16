import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Droplets,
  Wind,
  Lightbulb,
  Heart,
  Flower2,
  Award,
  ChevronRight,
  ChevronLeft,
  Eye,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NINETEEN_BLOOMS } from '../data/relationshipData';
import { conservatoryAudio } from '../utils/audioSynth';

export default function GrandBouquetConservatory() {
  const [selectedBloom, setSelectedBloom] = useState(NINETEEN_BLOOMS[18]); // Default to Month XIX (19th Monthsary!)
  const [discoveredIds, setDiscoveredIds] = useState([19]);
  const [showHotspotMarkers, setShowHotspotMarkers] = useState(true);
  const [fairyLightsOn, setFairyLightsOn] = useState(true);
  const [dewCount, setDewCount] = useState(0);
  const [isMisting, setIsMisting] = useState(false);
  const [isBreezing, setIsBreezing] = useState(false);
  const [auraPreset, setAuraPreset] = useState('conservatory'); // conservatory, bridal, lavender, crimson
  const [ribbonCharm, setRibbonCharm] = useState('Ross Ann “Chimp” Mora • 23');
  const [floatingToast, setFloatingToast] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const dropletsRef = useRef([]);
  const ripplesRef = useRef([]);

  const auraPresets = {
    conservatory: {
      name: 'Sunlit Orangerie (Original)',
      filter: 'brightness(1.03) contrast(1.03) saturate(1.06)',
      glow: 'rgba(196, 81, 97, 0.28)',
      accent: '#C45161'
    },
    bridal: {
      name: 'Garden Wedding Golden Hour',
      filter: 'brightness(1.07) contrast(1.02) sepia(0.12) saturate(1.1)',
      glow: 'rgba(184, 137, 70, 0.35)',
      accent: '#B88946'
    },
    lavender: {
      name: 'Chimp’s Lavender & Lilac',
      filter: 'brightness(1.04) contrast(1.04) hue-rotate(-12deg) saturate(1.12)',
      glow: 'rgba(155, 107, 182, 0.32)',
      accent: '#8B5CF6'
    },
    crimson: {
      name: 'Velvet Rose Romance',
      filter: 'brightness(1.01) contrast(1.08) saturate(1.22)',
      glow: 'rgba(158, 51, 66, 0.38)',
      accent: '#9E3342'
    }
  };

  const ribbonCharms = [
    'Ross Ann “Chimp” Mora • 23',
    'Future Mrs. Salva • Garden Bride 💍',
    'Graduating Soon! (Manifesting 🎓)',
    'Mahal na Mahal Ka ni Kuya ❤️'
  ];

  // Interactive Canvas Overlay for Fairy Lights, Morning Dew Droplets & Click Ripples
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const updateSize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || 540;
      canvas.height = canvas.parentElement.clientHeight || 660;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // 32 Golden Fairy Lights nestled in the bouquet foliage & blooms
    const lights = NINETEEN_BLOOMS.map((b, i) => ({
      x: b.x / 100,
      y: b.y / 100,
      phase: i * 0.7,
      speed: 0.03 + (i % 4) * 0.008,
      r: 3.5 + (i % 3)
    }));

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Twinkling Golden Fairy Lights
      if (fairyLightsOn) {
        lights.forEach((l) => {
          l.phase += l.speed;
          const alpha = Math.sin(l.phase) * 0.4 + 0.55;
          const lx = l.x * w;
          const ly = l.y * h;

          const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, l.r * 5);
          grad.addColorStop(0, `rgba(255, 248, 220, ${alpha})`);
          grad.addColorStop(0.45, `rgba(220, 168, 94, ${alpha * 0.5})`);
          grad.addColorStop(1, 'rgba(220, 168, 94, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(lx, ly, l.r * 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FFFDF9';
          ctx.beginPath();
          ctx.arc(lx, ly, l.r * 0.55, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 2. Morning Dew Droplets
      for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
        const d = dropletsRef.current[i];
        d.y += d.vy;
        d.x += d.vx;
        d.life -= 0.005;

        if (d.life <= 0 || d.y > h) {
          dropletsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = d.life;
        const dropGrad = ctx.createRadialGradient(
          d.x - d.r * 0.3,
          d.y - d.r * 0.3,
          0.5,
          d.x,
          d.y,
          d.r
        );
        dropGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        dropGrad.addColorStop(0.6, 'rgba(215, 240, 255, 0.65)');
        dropGrad.addColorStop(1, 'rgba(180, 220, 245, 0.15)');

        ctx.fillStyle = dropGrad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Click Petal Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rp = ripplesRef.current[i];
        rp.r += 1.8;
        rp.alpha -= 0.022;
        if (rp.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.strokeStyle = `rgba(255, 240, 230, ${rp.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
    };
  }, [fairyLightsOn]);

  const handleSelectBloom = (bloom, e) => {
    if (e) e.stopPropagation();
    setSelectedBloom(bloom);
    conservatoryAudio.playBloomHarp(bloom.id);

    if (!discoveredIds.includes(bloom.id)) {
      const updated = [...discoveredIds, bloom.id];
      setDiscoveredIds(updated);
      if (updated.length === NINETEEN_BLOOMS.length) {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#C45161', '#B88946', '#E8B4B8', '#FAF6F0']
        });
        triggerToast('✨ All 19 Monthsary Blooms Discovered! Happy 19th Monthsary Labidabs!');
      }
    }

    if (canvasRef.current) {
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      ripplesRef.current.push({
        x: (bloom.x / 100) * w,
        y: (bloom.y / 100) * h,
        r: 6,
        alpha: 0.95
      });
    }
  };

  const triggerToast = (msg) => {
    setFloatingToast(msg);
    setTimeout(() => {
      setFloatingToast((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const handleMistBouquet = () => {
    setDewCount((prev) => prev + 1);
    setIsMisting(true);
    conservatoryAudio.playMistSpray();
    triggerToast('💧 Fresh Morning Dew misted across all 19 Conservatory Blooms!');

    if (canvasRef.current) {
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      for (let i = 0; i < 36; i++) {
        dropletsRef.current.push({
          x: w * 0.18 + Math.random() * w * 0.64,
          y: h * 0.15 + Math.random() * h * 0.48,
          r: Math.random() * 4.5 + 2,
          vx: (Math.random() - 0.5) * 0.25,
          vy: Math.random() * 0.35 + 0.12,
          life: 1.0
        });
      }
    }

    setTimeout(() => setIsMisting(false), 900);
  };

  const handleGardenBreeze = () => {
    setIsBreezing(true);
    conservatoryAudio.playBloomHarp(9);
    triggerToast('🍃 A warm October garden breeze sways your bouquet...');
    confetti({
      particleCount: 35,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#E8B4B8', '#C45161', '#F5E1CE']
    });
    setTimeout(() => setIsBreezing(false), 1200);
  };

  const handleNextUnopenedBloom = () => {
    const remaining = NINETEEN_BLOOMS.filter((b) => !discoveredIds.includes(b.id));
    if (remaining.length > 0) {
      handleSelectBloom(remaining[0]);
    } else {
      const nextIdx = selectedBloom.id % NINETEEN_BLOOMS.length;
      handleSelectBloom(NINETEEN_BLOOMS[nextIdx]);
    }
  };

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / rect.width) * 7;
    const rotateX = ((rect.height / 2 - y) / rect.height) * 7;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentAura = auraPresets[auraPreset];

  return (
    <section
      id="grand-bouquet"
      style={{
        maxWidth: '1220px',
        margin: '0 auto',
        padding: 'clamp(3rem, 6vw, 5.5rem) clamp(1rem, 4vw, 2.5rem)',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Editorial Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-gold)',
            color: 'var(--gold-primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}
        >
          <Flower2 size={14} />
          <span>Your Virtual Monthsary Present • 19 Interactive Blooms</span>
        </div>

        <h2
          className="serif-display"
          style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}
        >
          La Grande Composition Florale{' '}
          <span className="serif-italic" style={{ color: 'var(--rose-deep)' }}>
            for My Chimp
          </span>
        </h2>

        <p
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)'
          }}
        >
          Hand-tied with <strong>19 heritage blooms</strong>—David Austin Juliet roses, Sarah Bernhardt
          peonies, crimson English roses, white bridal ranunculus, French lavender, and lily of the
          valley.{' '}
          <strong style={{ color: 'var(--rose-deep)' }}>
            Tap any of the 19 numbered blooms on the bouquet
          </strong>{' '}
          to read a milestone from each of our 19 months together!
        </p>
      </div>

      {/* Main Two-Column Conservatory Showcase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3.25rem)',
          alignItems: 'start'
        }}
      >
        {/* LEFT COLUMN: Massive Interactive Arch Bouquet Stage */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Outer Botanical Arch Frame */}
          <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              width: '100%',
              maxWidth: '540px',
              padding: '12px',
              borderRadius: '270px 270px 28px 28px',
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border-gold)',
              boxShadow: `0 30px 70px rgba(22, 42, 34, 0.16), 0 0 50px ${currentAura.glow}`,
              transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                isBreezing ? 'rotate(1.2deg) scale(1.015)' : ''
              }`,
              transition: 'transform 0.25s ease-out, box-shadow 0.4s ease',
              position: 'relative'
            }}
          >
            {/* Inner Arch Image + Interactive Hotspots */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: '258px 258px 20px 20px',
                overflow: 'hidden',
                border: '1px solid var(--border-hairline)',
                background: '#162A22'
              }}
            >
              {/* The Monumental Conservatory Bouquet Artwork */}
              <img
                src="/photos/october_grand_bouquet.jpg"
                alt="Massive Grand Bouquet of 19 Blooms for Ross Ann Mora"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: currentAura.filter,
                  transform: isMisting
                    ? 'scale(1.03)'
                    : isBreezing
                    ? 'scale(1.04) translateX(4px)'
                    : 'scale(1)',
                  transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease'
                }}
              />

              {/* Interactive Canvas for Fairy Lights & Morning Dew Droplets */}
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 4
                }}
              />

              {/* 19 Interactive Bloom Pins Mapped Across the Bouquet */}
              {showHotspotMarkers &&
                NINETEEN_BLOOMS.map((bloom) => {
                  const isSelected = selectedBloom?.id === bloom.id;
                  const isDiscovered = discoveredIds.includes(bloom.id);

                  return (
                    <button
                      key={bloom.id}
                      onClick={(e) => handleSelectBloom(bloom, e)}
                      title={`${bloom.monthLabel}: ${bloom.flowerName}`}
                      style={{
                        position: 'absolute',
                        left: `${bloom.x}%`,
                        top: `${bloom.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: isSelected ? '34px' : '26px',
                        height: isSelected ? '34px' : '26px',
                        borderRadius: '50%',
                        background: isSelected
                          ? 'var(--rose-deep)'
                          : isDiscovered
                          ? 'rgba(22, 42, 34, 0.86)'
                          : 'rgba(250, 246, 240, 0.92)',
                        color: isSelected || isDiscovered ? '#FAF6F0' : '#1E1B18',
                        border: isSelected
                          ? '2.5px solid #FFF8DC'
                          : isDiscovered
                          ? '1.5px solid var(--gold-light)'
                          : '1.5px solid var(--rose-deep)',
                        fontFamily: 'var(--font-serif)',
                        fontSize: isSelected ? '0.82rem' : '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isSelected
                          ? '0 0 0 6px rgba(196, 81, 97, 0.35), 0 6px 16px rgba(0,0,0,0.45)'
                          : '0 4px 12px rgba(0,0,0,0.35)',
                        zIndex: isSelected ? 15 : 10,
                        transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      {bloom.id}
                    </button>
                  );
                })}

              {/* Floating Action Toast Inside Bouquet */}
              {floatingToast && (
                <div
                  style={{
                    position: 'absolute',
                    top: '22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(22, 42, 34, 0.92)',
                    color: '#FAF6F0',
                    border: '1px solid var(--gold-light)',
                    borderRadius: '9999px',
                    padding: '8px 18px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    zIndex: 25,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.35)'
                  }}
                >
                  {floatingToast}
                </div>
              )}

              {/* Bottom Ribbon Wax-Seal Florist Dispatch Tag Overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(250, 246, 240, 0.93)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(184, 137, 70, 0.55)',
                  borderRadius: '16px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  zIndex: 12,
                  color: '#1E1B18'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#9E3342',
                      color: '#FAF6F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      border: '1.5px solid #DFC293',
                      flexShrink: 0
                    }}
                  >
                    M&amp;R
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#8A7F77',
                        fontWeight: 700
                      }}
                    >
                      Silk Ribbon Tag • Dispatched by Kuya Marc (26)
                    </div>
                    <div
                      className="serif-display"
                      style={{ fontSize: '1.02rem', fontWeight: 700, color: '#1E1B18' }}
                    >
                      {ribbonCharm}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowHotspotMarkers(!showHotspotMarkers)}
                  style={{
                    background: showHotspotMarkers ? '#162A22' : 'transparent',
                    color: showHotspotMarkers ? '#FAF6F0' : '#162A22',
                    border: '1px solid #162A22',
                    borderRadius: '9999px',
                    padding: '5px 11px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0
                  }}
                >
                  <Eye size={12} />
                  <span>{showHotspotMarkers ? 'Hide Pins' : 'Show 19 Pins'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Interactive Bouquet Care & Atmosphere Bar Below Arch */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              marginTop: '1.25rem'
            }}
          >
            <button onClick={handleMistBouquet} className="btn-editorial-primary">
              <Droplets size={16} />
              <span>Mist Morning Dew ({dewCount})</span>
            </button>

            <button onClick={handleGardenBreeze} className="btn-editorial-outline">
              <Wind size={15} color="var(--rose-primary)" />
              <span>Send Garden Breeze</span>
            </button>

            <button
              onClick={() => {
                setFairyLightsOn(!fairyLightsOn);
                conservatoryAudio.playBloomHarp(3);
              }}
              className="btn-editorial-outline"
              style={{
                borderColor: fairyLightsOn ? 'var(--gold-primary)' : 'var(--border-hairline)'
              }}
            >
              <Lightbulb size={15} color={fairyLightsOn ? 'var(--gold-primary)' : 'var(--text-muted)'} />
              <span>{fairyLightsOn ? 'Fairy Lights: ON' : 'Fairy Lights: OFF'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Bloom Herbarium Specimen Card + Customizer Studio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Progress Bar of 19 Discovered Blooms */}
          <div
            className="conservatory-card"
            style={{
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--gold-primary)" />
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  19 Blooms for 19 Months Explorer
                </span>
              </div>
              <span
                className="mono-num"
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--rose-deep)',
                  background: 'var(--rose-pale)',
                  padding: '3px 10px',
                  borderRadius: '9999px'
                }}
              >
                {discoveredIds.length} / 19 Blooms Inspected
              </span>
            </div>

            {/* Progress Track */}
            <div
              style={{
                width: '100%',
                height: '7px',
                background: 'var(--bg-secondary)',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${(discoveredIds.length / 19) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--rose-deep), var(--gold-primary))',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>

            {/* 19 Mini Numbered Pills for Instant Navigation */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginTop: '4px'
              }}
            >
              {NINETEEN_BLOOMS.map((b) => {
                const isCurr = selectedBloom.id === b.id;
                const isDone = discoveredIds.includes(b.id);
                return (
                  <button
                    key={b.id}
                    onClick={() => handleSelectBloom(b)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: isCurr
                        ? '2px solid var(--rose-deep)'
                        : isDone
                        ? '1px solid var(--gold-primary)'
                        : '1px solid var(--border-hairline)',
                      background: isCurr
                        ? 'var(--rose-deep)'
                        : isDone
                        ? 'var(--bg-secondary)'
                        : 'transparent',
                      color: isCurr ? '#FAF6F0' : 'var(--text-primary)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {b.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Bloom Botanical Specimen Card */}
          {selectedBloom && (
            <div
              className="conservatory-card"
              style={{
                padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                border: '1.5px solid var(--border-gold)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  marginBottom: '0.75rem'
                }}
              >
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--rose-deep)',
                    background: 'var(--rose-pale)',
                    padding: '4px 12px',
                    borderRadius: '9999px'
                  }}
                >
                  {selectedBloom.monthLabel}
                </span>

                <span
                  className="serif-italic"
                  style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}
                >
                  {selectedBloom.latinName}
                </span>
              </div>

              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--gold-primary)',
                  marginBottom: '4px'
                }}
              >
                Bloom #{selectedBloom.id} • {selectedBloom.flowerName}
              </div>

              <h3
                className="serif-display"
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                  color: 'var(--text-primary)',
                  marginBottom: '0.9rem'
                }}
              >
                “{selectedBloom.title}”
              </h3>

              <p
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '1.5rem',
                  paddingLeft: '14px',
                  borderLeft: '2px solid var(--rose-primary)'
                }}
              >
                {selectedBloom.note}
              </p>

              {/* Prev / Next Bloom Controls */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-hairline)'
                }}
              >
                <button
                  onClick={() => {
                    const prevIdx =
                      (selectedBloom.id - 2 + NINETEEN_BLOOMS.length) % NINETEEN_BLOOMS.length;
                    handleSelectBloom(NINETEEN_BLOOMS[prevIdx]);
                  }}
                  className="btn-editorial-outline"
                  style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                >
                  <ChevronLeft size={15} />
                  <span>Previous Bloom</span>
                </button>

                <button
                  onClick={handleNextUnopenedBloom}
                  className="btn-editorial-primary"
                  style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                >
                  <span>
                    {discoveredIds.length < 19 ? 'Pluck Next Unopened Bloom' : 'Next Month Bloom'}
                  </span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* Bouquet Couture Lighting & Ribbon Customizer */}
          <div className="conservatory-card" style={{ padding: '1.5rem' }}>
            <div
              style={{
                fontSize: '0.76rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                marginBottom: '0.9rem'
              }}
            >
              Couture Florist Studio • Customize Your Bouquet Aura &amp; Ribbon Tag
            </div>

            {/* 4 Floral Aura Lighting Presets */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
                gap: '8px',
                marginBottom: '1.15rem'
              }}
            >
              {Object.entries(auraPresets).map(([key, cfg]) => {
                const active = auraPreset === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setAuraPreset(key);
                      conservatoryAudio.playBloomHarp(2);
                    }}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '12px',
                      border: active
                        ? '1.5px solid var(--rose-deep)'
                        : '1px solid var(--border-hairline)',
                      background: active ? 'var(--rose-pale)' : 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'left'
                    }}
                  >
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: cfg.accent,
                        flexShrink: 0
                      }}
                    />
                    <span style={{ flex: 1 }}>{cfg.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Silk Ribbon Calligraphic Tag Selector */}
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginBottom: '6px',
                fontWeight: 600
              }}
            >
              Inscribed Silk Ribbon Tag:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ribbonCharms.map((charm) => {
                const isSelected = ribbonCharm === charm;
                return (
                  <button
                    key={charm}
                    onClick={() => {
                      setRibbonCharm(charm);
                      conservatoryAudio.playBloomHarp(4);
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '9999px',
                      border: isSelected
                        ? '1px solid var(--gold-primary)'
                        : '1px solid var(--border-hairline)',
                      background: isSelected ? 'var(--gold-glow)' : 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: '0.76rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {charm}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

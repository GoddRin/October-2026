import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  GraduationCap,
  Flower2,
  Music,
  CheckCircle2,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { conservatoryAudio } from '../utils/audioSynth';

export default function GardenWeddingDreamer() {
  // 1. "Engrande Pero Sakto sa Budget" Garden Wedding Customizer
  const [engrandeLevel, setEngrandeLevel] = useState(2); // 1, 2, 3
  const [archStyle, setArchStyle] = useState('Glass Conservatory Orangerie');
  const [musicVibe, setMusicVibe] = useState('Acoustic Violin & Cello Quartet');
  const [receptionTreat, setReceptionTreat] = useState(
    '5-Star Grazing Table + Midnight Chicken McDo & Wings Station'
  );

  // 2. Graduation 2026 Manifestation Lantern
  const [manifestCount, setManifestCount] = useState(19);
  const [manifestLit, setManifestLit] = useState(true);

  // 3. Virtual Kiss & Tight Huggggg Transmitter
  const [hugCount, setHugCount] = useState(19);
  const [isHugging, setIsHugging] = useState(false);
  const [hugToast, setHugToast] = useState(null);

  const engrandeDescriptions = {
    1: {
      badge: 'Level I • Cozy & Intimate Garden Vow',
      title: 'Warm, Intimate & Super Safe ang Ipon ni Kuya!',
      desc: 'Surrounding us with our closest family, fairy lights, and pure love—simple, heartfelt, and zero budget stress!'
    },
    2: {
      badge: 'Level II • The Kuya Marc Golden Sweet Spot!',
      title: '“Engrande Pero Not So Much Engrande (Sakto sa Budget!)”',
      desc: 'Lush garden roses, a breathtaking floral arch, your dream bridal gown, and our whole family celebrating how much I treasure you—without wiping out our honeymoon savings HAHAHAHA jk!'
    },
    3: {
      badge: 'Level III • Full Royal Bridger-Garden Extravaganza!',
      title: '“Mauubos Agad Budget Nyan HAHAHAHA jk — Pero Kakayanin for Labidabs!”',
      desc: '10,000 roses, fireworks over the conservatory, and whatever my Chimp’s heart desires—because Kuya Marc will work hard and save up for his future Mrs. Salva!'
    }
  };

  const handleLightManifestation = () => {
    setManifestCount((prev) => prev + 1);
    setManifestLit(true);
    conservatoryAudio.playWaxSealOpen();
    confetti({
      particleCount: 55,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#B88946', '#DFC293', '#C45161', '#FAF6F0']
    });
  };

  const handleTriggerKissAndHug = () => {
    setHugCount((prev) => prev + 1);
    setIsHugging(true);
    conservatoryAudio.playVirtualHug();

    const messages = [
      '💋 Mwaaaah! Virtual Kisss & Tightest Bear Huggggg delivered from Kuya Marc!',
      '🤗 *Squeezes my Chimp super tight* — Mahal na mahal na mahal na mahal ka ni Kuya!',
      '💖 Virtual Kisses landing on your cheeks! Happy 19th Monthsary my labidabs <3!',
      '🌸 Wrapping my future graduate & future Garden Bride in the warmest hug!'
    ];
    setHugToast(messages[hugCount % messages.length]);

    confetti({
      particleCount: 70,
      spread: 95,
      origin: { y: 0.65 },
      colors: ['#C45161', '#9E3342', '#E8B4B8', '#B88946']
    });

    setTimeout(() => setIsHugging(false), 1200);
  };

  const currentEngrande = engrandeDescriptions[engrandeLevel];

  return (
    <section
      id="garden-vow"
      style={{
        maxWidth: '1220px',
        margin: '0 auto',
        padding: 'clamp(3rem, 6vw, 5.5rem) clamp(1rem, 4vw, 2.5rem)',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Section Header */}
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
          <Sparkles size={14} />
          <span>Our Future Chapters • Graduation &amp; Garden Wedding Vow</span>
        </div>

        <h2
          className="serif-display"
          style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}
        >
          Manifesting Graduation &amp;{' '}
          <span className="serif-italic" style={{ color: 'var(--rose-deep)' }}>
            Our Future Garden Wedding
          </span>
        </h2>

        <p
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.06rem)'
          }}
        >
          Inspired by every promise in Kuya’s 19th Monthsary letter—celebrating your upcoming
          graduation, planning our future <em>“Engrande pero sakto sa budget”</em> Garden Wedding,
          and sending you endless virtual kisses and tight hugs.
        </p>
      </div>

      {/* Main Grid: Garden Wedding Customizer + Graduation & Virtual Hug Transmitter */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'stretch'
        }}
      >
        {/* LEFT CARD: Interactive "Engrande Pero Sakto sa Budget" Garden Wedding Vision Board */}
        <div
          className="conservatory-card"
          style={{
            padding: 'clamp(1.75rem, 4vw, 2.5rem)',
            borderRadius: '24px',
            border: '1.5px solid var(--border-gold)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--rose-deep)',
                fontWeight: 700,
                marginBottom: '8px'
              }}
            >
              <Flower2 size={14} />
              <span>Salva – Mora Future Garden Wedding Blueprint</span>
            </div>

            <h3
              className="serif-display"
              style={{ fontSize: '1.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
            >
              “Magpapakasal Pa Tayo Kapag Nakaipon Na Ako, Okay?”
            </h3>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem'
              }}
            >
              Use Kuya’s official <strong>Engrande-O-Meter</strong> below to co-design our dream
              Garden Wedding where you feel like the most treasured loved one with our family!
            </p>

            {/* The Hilarious & Romantic "Engrande-O-Meter" Slider */}
            <div
              style={{
                padding: '1.25rem',
                borderRadius: '18px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-gold)',
                marginBottom: '1.25rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: 'var(--gold-primary)'
                }}
              >
                <span>THE ENGRANDE-O-METER™</span>
                <span>{currentEngrande.badge}</span>
              </div>

              <input
                type="range"
                min={1}
                max={3}
                step={1}
                value={engrandeLevel}
                onChange={(e) => {
                  setEngrandeLevel(Number(e.target.value));
                  conservatoryAudio.playBloomHarp(Number(e.target.value) * 2);
                }}
                style={{
                  width: '100%',
                  accentColor: 'var(--rose-deep)',
                  cursor: 'pointer',
                  marginBottom: '10px'
                }}
              />

              <div
                className="serif-display"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--rose-deep)',
                  marginBottom: '4px'
                }}
              >
                {currentEngrande.title}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {currentEngrande.desc}
              </p>
            </div>

            {/* Wedding Detail Selectors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    marginBottom: '6px'
                  }}
                >
                  1. Choose Our Ceremony Setting:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[
                    'Glass Conservatory Orangerie',
                    'Sunlit Botanical Rose Arch',
                    'Twilight Fairy-Lit Secret Garden'
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setArchStyle(opt);
                        conservatoryAudio.playBloomHarp(3);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '9999px',
                        border:
                          archStyle === opt
                            ? '1.5px solid var(--rose-deep)'
                            : '1px solid var(--border-hairline)',
                        background: archStyle === opt ? 'var(--rose-pale)' : 'transparent',
                        color: 'var(--text-primary)',
                        fontSize: '0.76rem',
                        fontWeight: archStyle === opt ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    marginBottom: '6px'
                  }}
                >
                  2. Reception Midnight Treat Station:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[
                    '5-Star Grazing Table + Midnight Chicken McDo & Wings Station',
                    ' Botanical Champagne & Gelato Cart',
                    'Unli-Wings (With Plastic Gloves!) & McFloat Bar'
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setReceptionTreat(opt);
                        conservatoryAudio.playBloomHarp(6);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '9999px',
                        border:
                          receptionTreat === opt
                            ? '1.5px solid var(--gold-primary)'
                            : '1px solid var(--border-hairline)',
                        background: receptionTreat === opt ? 'var(--gold-glow)' : 'transparent',
                        color: 'var(--text-primary)',
                        fontSize: '0.76rem',
                        fontWeight: receptionTreat === opt ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Vow Ticket */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '12px 16px',
              borderRadius: '14px',
              background: 'var(--rose-pale)',
              border: '1px dashed var(--rose-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
              <strong>Reserved for:</strong> Groom Marc Harrold &amp; Bride Ross Ann Mora
            </div>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--rose-deep)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CheckCircle2 size={14} />
              <span>Promise Sealed</span>
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Graduation 2026 Manifestation + Virtual Kiss & Tight Huggggg Dispenser */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Card 1: Graduation Manifestation Shrine */}
          <div
            className="conservatory-card"
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              borderRadius: '24px',
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
                marginBottom: '0.75rem'
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--gold-primary)'
                }}
              >
                <GraduationCap size={16} />
                <span>October Manifestation Lantern</span>
              </span>

              <span
                className="mono-num"
                style={{
                  fontSize: '0.76rem',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  background: 'var(--gold-glow)',
                  color: 'var(--gold-primary)',
                  fontWeight: 700
                }}
              >
                ✨ {manifestCount}x Manifested
              </span>
            </div>

            <h3
              className="serif-display"
              style={{ fontSize: '1.7rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
            >
              “Octoberr Naa, Lapit Na Ikaw Grumaduate (Manifesting!)”
            </h3>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '1.25rem'
              }}
            >
              Kuya sees every sleepless night, every requirement, and every ounce of effort you pour
              into your dreams at 23. Light the conservatory manifestation candle below—your toga and
              diploma are already waiting for you, My Labidabsss!
            </p>

            <button
              type="button"
              onClick={handleLightManifestation}
              className="btn-editorial-outline"
              style={{
                borderColor: 'var(--gold-primary)',
                background: manifestLit ? 'var(--gold-glow)' : 'transparent',
                fontWeight: 700
              }}
            >
              <Sparkles size={16} color="var(--gold-primary)" />
              <span>Claim &amp; Multiply Graduation Blessings ({manifestCount})</span>
            </button>
          </div>

          {/* Card 2: Virtual Kisss & Virtual Tight Huggggg Transmitter */}
          <div
            className="conservatory-card"
            style={{
              padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              borderRadius: '24px',
              border: '1.5px solid var(--rose-primary)',
              background:
                'linear-gradient(145deg, var(--bg-card-solid) 0%, var(--rose-pale) 100%)',
              transform: isHugging ? 'scale(0.985)' : 'scale(1)',
              transition: 'transform 0.25s ease'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
              }}
            >
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--rose-deep)'
                }}
              >
                Direct From Kuya Marc’s Arms
              </span>
              <span
                className="mono-num"
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: 'var(--rose-deep)'
                }}
              >
                {hugCount} Kisses &amp; Hugs Sent
              </span>
            </div>

            <h3
              className="serif-display"
              style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
            >
              “Sending My Virtual Kisss and Virtual Tight Huggggg!”
            </h3>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '1.25rem'
              }}
            >
              Whenever you miss Kuya or need lambing, press the button below to feel a warm
              heartbeat pulse and receive an instant shower of virtual kisses and a super tight hug!
            </p>

            <button
              type="button"
              onClick={handleTriggerKissAndHug}
              className={`btn-editorial-primary ${isHugging ? 'animate-heartbeat' : ''}`}
              style={{ width: '100%', justifyContent: 'center', padding: '14px 24px' }}
            >
              <Heart size={18} fill="#FAF6F0" />
              <span>Receive Kuya’s Virtual Kisss &amp; Tight Huggggg ({hugCount})</span>
            </button>

            {hugToast && (
              <div
                className="script-note"
                style={{
                  marginTop: '12px',
                  fontSize: '1.3rem',
                  color: 'var(--rose-deep)',
                  textAlign: 'center'
                }}
              >
                {hugToast}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

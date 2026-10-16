import React, { useState, useEffect } from 'react';
import { Flower2, Mail, Heart, Sparkles, Calendar, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { conservatoryAudio } from '../utils/audioSynth';

export default function HeroSection() {
  // Anniversary Start: March 22, 2025 00:00:00
  const originTimestamp = new Date('2025-03-22T00:00:00').getTime();

  const [elapsed, setElapsed] = useState({
    days: 579,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateClock = () => {
      const diff = Math.max(0, Date.now() - originTimestamp);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setElapsed({ days, hours, minutes, seconds });
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [originTimestamp]);

  const pad = (n) => String(n).padStart(2, '0');

  const handleShowerPetals = () => {
    conservatoryAudio.playBloomHarp(6);
    confetti({
      particleCount: 70,
      spread: 95,
      origin: { y: 0.45 },
      colors: ['#C45161', '#E8B4B8', '#B88946', '#FAF6F0']
    });
  };

  return (
    <section
      id="hero"
      style={{
        maxWidth: '1220px',
        margin: '0 auto',
        padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 4vw, 2.5rem) 2rem',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        className="conservatory-card"
        style={{
          padding: 'clamp(2.25rem, 5vw, 4.25rem) clamp(1.5rem, 4vw, 3.5rem)',
          borderRadius: '32px',
          border: '1.5px solid var(--border-gold)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* Top Archival Flourish */}
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'var(--rose-pale)',
            border: '1px solid var(--rose-blush)',
            color: 'var(--rose-deep)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem'
          }}
        >
          <Sparkles size={13} />
          <span>Chapter XIX • October 22, 2026 • Happy 19th Monthsary My Labidabs</span>
        </div>

        <h1
          className="serif-display"
          style={{
            fontSize: 'clamp(2.6rem, 6vw, 4.65rem)',
            color: 'var(--text-primary)',
            maxWidth: '920px',
            margin: '0 auto 1rem'
          }}
        >
          A Private Garden Conservatory for{' '}
          <span className="serif-italic" style={{ color: 'var(--rose-deep)' }}>
            Ross Ann “Chimp” Mora
          </span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.18rem)',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto 2rem',
            lineHeight: 1.75
          }}
        >
          Welcome inside, <strong style={{ color: 'var(--text-primary)' }}>My Labidabsss</strong>.
          From the day we became official on{' '}
          <strong style={{ color: 'var(--rose-deep)' }}>March 22, 2025</strong> to your upcoming
          graduation that we are proudly manifesting this season, and all the way to our future{' '}
          <span className="serif-italic" style={{ fontSize: '1.2em', color: 'var(--gold-primary)' }}>
            Garden Wedding
          </span>
          —you are my most treasured loved one.
        </p>

        {/* Couple & Milestone Ribbon */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '14px',
            maxWidth: '900px',
            margin: '0 auto 2.25rem'
          }}
        >
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '18px',
              padding: '16px'
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                fontWeight: 700,
                marginBottom: '4px'
              }}
            >
              The Muse &amp; Future Graduate
            </div>
            <div
              className="serif-display"
              style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}
            >
              Ross Ann Mora • 23
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--rose-deep)', fontWeight: 600 }}>
              “Chimp • My Labidabsss”
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1.5px solid var(--border-gold)',
              borderRadius: '18px',
              padding: '16px'
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--gold-primary)',
                fontWeight: 700,
                marginBottom: '4px'
              }}
            >
              Growing Since March 22, 2025
            </div>
            <div
              className="mono-num"
              style={{ fontSize: '1.28rem', fontWeight: 700, color: 'var(--rose-deep)' }}
            >
              19 Months • {elapsed.days} Days
            </div>
            <div className="mono-num" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              + {pad(elapsed.hours)}h : {pad(elapsed.minutes)}m : {pad(elapsed.seconds)}s of Love
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '18px',
              padding: '16px'
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                fontWeight: 700,
                marginBottom: '4px'
              }}
            >
              Devoted Boyfriend &amp; Curated By
            </div>
            <div
              className="serif-display"
              style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}
            >
              Marc Harrold Salva • 26
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
              “Yours Truly, Kuya”
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          <a
            href="#grand-bouquet"
            className="btn-editorial-primary"
            style={{ textDecoration: 'none' }}
          >
            <Flower2 size={17} />
            <span>Receive Your 19-Bloom Grand Bouquet</span>
          </a>

          <a
            href="#kuya-letter"
            className="btn-editorial-outline"
            style={{ textDecoration: 'none' }}
          >
            <Mail size={16} color="var(--rose-deep)" />
            <span>Open Kuya’s Sealed Letter</span>
          </a>

          <button onClick={handleShowerPetals} className="btn-editorial-outline">
            <Heart size={15} color="var(--rose-primary)" fill="var(--rose-primary)" />
            <span>Shower Garden Petals</span>
          </button>
        </div>
      </div>
    </section>
  );
}

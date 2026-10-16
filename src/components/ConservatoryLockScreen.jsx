import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Sparkles,
  Heart,
  Clock,
  Key,
  Eye,
  Calendar,
  Volume2,
  VolumeX,
  Flower2,
  Sun,
  Moon,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUPLE_INFO } from '../data/relationshipData';
import { conservatoryAudio } from '../utils/audioSynth';

export default function ConservatoryLockScreen({
  onUnlock,
  onTogglePreview,
  theme,
  onToggleTheme,
  musicPlaying,
  onToggleMusic
}) {
  // Exact Target: October 22, 2026 at 00:00:00 (12:00 AM Midnight)
  const targetTimestamp = new Date('2026-10-22T00:00:00').getTime();
  // Anniversary Origin: March 22, 2025 at 00:00:00
  const originTimestamp = new Date('2025-03-22T00:00:00').getTime();

  const [simulatedNow, setSimulatedNow] = useState(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [togetherTime, setTogetherTime] = useState({
    totalDays: 573,
    months: 18,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [warmthCount, setWarmthCount] = useState(0);
  const [whisperText, setWhisperText] = useState(
    'Tap "Send Warmth to the Garden" while waiting for October 22 at 12:00 AM Midnight...'
  );
  const [activeKeyhole, setActiveKeyhole] = useState(null);
  const [showKuyaModal, setShowKuyaModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const kuyaWhispers = [
    '🌹 "My Labidabsss, octoberr naa, lapit na ikaw grumaduate (Manifesting!)..."',
    '💍 "Magpapakasal pa tayo kapag nakaipon na ako, okay? Gusto ko Garden Wedding..."',
    '💐 "19 Grand Conservatory Blooms are being misted inside for our 19th Monthsary!"',
    '🥰 "Palagi mong tatandaan, Mahal na mahal na mahal na mahal ka ni Kuya!"',
    '🤗 "Sending my Virtual kisss and virtual tight huggggg across the conservatory gate!"',
    '🍗 "From plastic-glove wings dates to our future Garden Wedding—ikaw lang, Ross Ann."'
  ];

  const keyholeTeasers = [
    {
      id: 'bouquet',
      roman: 'I',
      title: 'The 19-Bloom Imperial Bouquet',
      subtitle: 'Botanical Centerpiece',
      teaser:
        'Inside the conservatory stands a massive, hand-tied bouquet of David Austin Juliet roses, Sarah Bernhardt peonies, lavender, and lily of the valley—with 19 interactive blooms for each of our 19 months since March 22, 2025.'
    },
    {
      id: 'letter',
      roman: 'II',
      title: 'Kuya’s Wax-Sealed Garden Letter',
      subtitle: 'Personal Correspondence',
      teaser:
        'A cotton-linen envelope sealed with a golden "M & R • XIX" wax stamp holding Kuya Marc’s personal message for his future graduate and future bride—plus a stationery desk where you can write back.'
    },
    {
      id: 'memories',
      roman: 'III',
      title: 'Pressed-Flower Archival Plates',
      subtitle: 'Three Curated Photographs',
      teaser:
        'Our favorite candid moments preserved in botanical herbarium frames—from eating wings with plastic gloves in your lavender top to your cutest McDo pout and scrunched-nose laugh.'
    },
    {
      id: 'wedding',
      roman: 'IV',
      title: 'Our Future Garden Wedding Studio',
      subtitle: '“Engrande Pero Sakto sa Budget!”',
      teaser:
        'An interactive Garden Wedding vision board & Graduation 2026 Manifestation lantern—complete with Kuya’s Virtual Kiss & Tight Huggggg transmitter!'
    }
  ];

  useEffect(() => {
    const tick = () => {
      const now = simulatedNow !== null ? simulatedNow : Date.now();
      const diff = targetTimestamp - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        conservatoryAudio.playConservatoryUnlock();
        confetti({
          particleCount: 110,
          spread: 100,
          origin: { y: 0.55 },
          colors: ['#C45161', '#B88946', '#E8B4B8', '#FAF6F0']
        });
        onUnlock();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });

      // Calculate time together since March 22, 2025
      const elapsed = Math.max(0, now - originTimestamp);
      const totalDays = Math.floor(elapsed / (1000 * 60 * 60 * 24));
      const tHours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
      const tMinutes = Math.floor((elapsed / (1000 * 60)) % 60);
      const tSeconds = Math.floor((elapsed / 1000) % 60);
      setTogetherTime({
        totalDays,
        months: 19,
        hours: tHours,
        minutes: tMinutes,
        seconds: tSeconds
      });

      if (simulatedNow !== null) {
        setSimulatedNow((prev) => prev + 1000);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [simulatedNow, targetTimestamp, originTimestamp, onUnlock]);

  const handleSendWarmth = () => {
    const next = warmthCount + 1;
    setWarmthCount(next);
    setWhisperText(kuyaWhispers[next % kuyaWhispers.length]);
    conservatoryAudio.playBloomHarp(next);
    confetti({
      particleCount: 22,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#C45161', '#E8B4B8', '#B88946']
    });
  };

  const handleSimulateFiveSeconds = () => {
    setShowKuyaModal(false);
    setSimulatedNow(targetTimestamp - 5000);
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    const clean = passcodeInput.trim().toLowerCase();
    if (
      clean === '032225' ||
      clean === '102226' ||
      clean === 'chimp' ||
      clean === 'labidabs' ||
      clean === 'kuya'
    ) {
      setPasscodeError(false);
      setShowKuyaModal(false);
      onTogglePreview(true);
    } else {
      setPasscodeError(true);
    }
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 10,
        padding: 'clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 4vw, 2.5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Top Conservatory Archival Header Bar */}
      <header
        style={{
          width: '100%',
          maxWidth: '1080px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-hairline)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--rose-deep)',
              color: '#FAF6F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 12px rgba(158, 51, 66, 0.25)'
            }}
          >
            XIX
          </div>
          <div>
            <div
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--gold-primary)',
                fontWeight: 700
              }}
            >
              L’Orangerie de Ross Ann • Sealed Conservatory
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Marc Harrold Salva (26) &amp; Ross Ann “Chimp” Mora (23)
            </div>
          </div>
        </div>

        {/* Atmosphere & Audio Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onToggleMusic}
            className="btn-editorial-outline"
            style={{ padding: '7px 14px', fontSize: '0.78rem' }}
            title="Toggle Romantic Conservatory Music"
          >
            {musicPlaying ? <Volume2 size={15} color="var(--rose-deep)" /> : <VolumeX size={15} />}
            <span>{musicPlaying ? 'Melody Playing' : 'Play Melody'}</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="btn-editorial-outline"
            style={{ padding: '7px 14px', fontSize: '0.78rem' }}
            title="Switch between Sunlit Conservatory and Moonlit Garden"
          >
            {theme === 'sunlit' ? <Moon size={15} /> : <Sun size={15} color="var(--gold-primary)" />}
            <span>{theme === 'sunlit' ? 'Moonlit Garden' : 'Sunlit Orangerie'}</span>
          </button>

          <button
            onClick={() => setShowKuyaModal(true)}
            className="btn-editorial-outline"
            style={{
              padding: '7px 14px',
              fontSize: '0.78rem',
              borderColor: 'var(--border-gold)',
              color: 'var(--gold-primary)'
            }}
          >
            <Key size={14} />
            <span>Kuya’s Key</span>
          </button>
        </div>
      </header>

      {/* Centerpiece Wrought-Iron Conservatory Arch Gate */}
      <main
        style={{
          width: '100%',
          maxWidth: '900px',
          margin: '2rem auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Botanical Arch Gate Container */}
        <div
          className="conservatory-card"
          style={{
            width: '100%',
            borderRadius: '260px 260px 28px 28px',
            padding: 'clamp(2rem, 5vw, 3.75rem) clamp(1.25rem, 4vw, 3rem)',
            border: '1.5px solid var(--border-gold)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative Wrought-Iron Arch SVG Tracery at Top */}
          <svg
            viewBox="0 0 600 110"
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              margin: '0 auto 0.75rem',
              display: 'block',
              opacity: 0.75
            }}
          >
            <path
              d="M 40 100 Q 300 -20 560 100"
              fill="none"
              stroke="var(--gold-primary)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 90 100 Q 300 5 510 100"
              fill="none"
              stroke="var(--gold-primary)"
              strokeWidth="1"
            />
            <circle cx="300" cy="48" r="18" fill="none" stroke="var(--rose-primary)" strokeWidth="1.5" />
            <circle cx="300" cy="48" r="4" fill="var(--gold-primary)" />
            <path
              d="M 240 60 C 260 40, 280 45, 282 48 M 360 60 C 340 40, 320 45, 318 48"
              fill="none"
              stroke="var(--sage-light)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Wax-Sealed Conservatory Lock Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '9999px',
              background: 'var(--rose-pale)',
              border: '1px solid var(--rose-blush)',
              color: 'var(--rose-deep)',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.1rem'
            }}
          >
            <Lock size={13} />
            <span>Time-Locked Until October 22, 2026 • 12:00 AM Midnight</span>
          </div>

          <h1
            className="serif-display"
            style={{
              fontSize: 'clamp(2.2rem, 5.2vw, 3.8rem)',
              color: 'var(--text-primary)',
              marginBottom: '0.6rem'
            }}
          >
            For My Dearest{' '}
            <span className="serif-italic" style={{ color: 'var(--rose-deep)' }}>
              Ross Ann Mora
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.12rem)',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              margin: '0 auto 2rem'
            }}
          >
            My Chimp, My Labidabsss—Kuya Marc prepared a private botanical conservatory, a massive
            19-bloom luxury bouquet, and a sealed garden vow for our{' '}
            <strong style={{ color: 'var(--text-primary)' }}>19th Monthsary</strong>. The conservatory
            gates will automatically swing open when the clock strikes{' '}
            <strong style={{ color: 'var(--rose-deep)' }}>12:00 Midnight on October 22, 2026</strong>.
          </p>

          {simulatedNow !== null && (
            <div
              style={{
                marginBottom: '1.25rem',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: 'rgba(184, 137, 70, 0.18)',
                border: '1px solid var(--gold-primary)',
                color: 'var(--gold-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                fontWeight: 700
              }}
            >
              <Sparkles size={15} />
              <span>Midnight Ceremony Simulation Active — Gate Opening in {countdown.seconds}s!</span>
            </div>
          )}

          {/* Grand Tabular Countdown Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(68px, 125px))',
              gap: 'clamp(8px, 2vw, 16px)',
              justifyContent: 'center',
              margin: '0 auto 2rem'
            }}
          >
            {[
              { label: 'Days', value: pad(countdown.days) },
              { label: 'Hours', value: pad(countdown.hours) },
              { label: 'Minutes', value: pad(countdown.minutes) },
              { label: 'Seconds', value: pad(countdown.seconds) }
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '18px',
                  padding: 'clamp(14px, 2.5vw, 22px) 10px',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                <div
                  className="mono-num"
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.65rem)',
                    fontWeight: 600,
                    color: 'var(--rose-deep)',
                    lineHeight: 1.1
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--text-muted)',
                    marginTop: '6px',
                    fontWeight: 600
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Relationship Duration Ribbon Since March 22, 2025 */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '10px 20px',
              borderRadius: '14px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-hairline)',
              marginBottom: '1.75rem',
              fontSize: '0.84rem',
              color: 'var(--text-secondary)'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <Calendar size={14} color="var(--gold-primary)" />
              <span>Together Since March 22, 2025:</span>
            </span>
            <span className="mono-num" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {togetherTime.totalDays} Days • {pad(togetherTime.hours)}h : {pad(togetherTime.minutes)}m :{' '}
              {pad(togetherTime.seconds)}s
            </span>
            <span
              style={{
                padding: '2px 10px',
                borderRadius: '9999px',
                background: 'var(--rose-deep)',
                color: '#FAF6F0',
                fontSize: '0.72rem',
                fontWeight: 700
              }}
            >
              Road to 19 Months &amp; Forever
            </span>
          </div>

          {/* Interactive "Send Warmth Through the Conservatory Gate" */}
          <div style={{ marginTop: '0.25rem' }}>
            <button onClick={handleSendWarmth} className="btn-editorial-primary">
              <Heart size={16} fill="#FAF6F0" />
              <span>Send Warmth &amp; Kiss Through the Gate ({warmthCount})</span>
            </button>

            <div
              className="script-note"
              style={{
                marginTop: '14px',
                fontSize: '1.25rem',
                color: 'var(--rose-deep)',
                minHeight: '2rem',
                padding: '0 10px'
              }}
            >
              {whisperText}
            </div>
          </div>
        </div>

        {/* 4 Botanical Keyhole Envelopes (Sneak Peeks of What's Inside) */}
        <div style={{ width: '100%', marginTop: '2.25rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
              fontWeight: 700
            }}
          >
            Peek Through the Conservatory Keyholes • 4 Surprises Waiting Inside
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px'
            }}
          >
            {keyholeTeasers.map((item) => {
              const isOpen = activeKeyhole === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveKeyhole(isOpen ? null : item.id);
                    conservatoryAudio.playBloomHarp(item.roman.length);
                  }}
                  className="conservatory-card"
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: isOpen
                      ? '1.5px solid var(--rose-primary)'
                      : '1px solid var(--border-hairline)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--gold-primary)',
                        letterSpacing: '0.08em'
                      }}
                    >
                      KEYHOLE {item.roman}
                    </span>
                    <Flower2 size={15} color="var(--rose-primary)" />
                  </div>
                  <div
                    className="serif-display"
                    style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '2px' }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {item.subtitle}
                  </div>
                  {isOpen ? (
                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        paddingTop: '8px',
                        borderTop: '1px dashed var(--border-hairline)'
                      }}
                    >
                      {item.teaser}
                    </p>
                  ) : (
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--rose-deep)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={13} />
                      <span>Tap to peek inside</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <footer
        style={{
          width: '100%',
          maxWidth: '1080px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-hairline)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}
      >
        <span>Handcrafted by Kuya Marc Harrold Salva (26) for Ross Ann “Chimp” Mora (23)</span>
        <span>Origin: March 22, 2025 • Unlocking: October 22, 2026, 12:00 AM</span>
      </footer>

      {/* Kuya's Key (Boyfriend Preview & Midnight Ceremony Simulator Modal) */}
      {showKuyaModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(13, 23, 19, 0.72)',
            backdropFilter: 'blur(8px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setShowKuyaModal(false)}
        >
          <div
            className="conservatory-card"
            style={{
              maxWidth: '460px',
              width: '100%',
              padding: '2rem',
              background: 'var(--bg-card-solid)',
              border: '1.5px solid var(--border-gold)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '0.75rem',
                color: 'var(--gold-primary)'
              }}
            >
              <Key size={20} />
              <h3 className="serif-display" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                Kuya Marc’s Conservatory Master Key
              </h3>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              For Ross Ann, this conservatory remains locked until{' '}
              <strong>October 22, 2026 at 12:00 AM Midnight</strong>. As the creator, Kuya Marc can
              inspect the full experience right now or test the 5-second midnight gate-opening ceremony:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.25rem' }}>
              <button
                onClick={() => {
                  setShowKuyaModal(false);
                  conservatoryAudio.playConservatoryUnlock();
                  onTogglePreview(true);
                }}
                className="btn-editorial-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Unlock size={16} />
                <span>Unlock Immediately (Kuya Marc Preview Mode)</span>
              </button>

              <button
                onClick={handleSimulateFiveSeconds}
                className="btn-editorial-outline"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Clock size={16} color="var(--gold-primary)" />
                <span>Simulate 5 Seconds Before 12:00 AM Midnight</span>
              </button>
            </div>

            <form
              onSubmit={handlePasscodeSubmit}
              style={{
                borderTop: '1px solid var(--border-hairline)',
                paddingTop: '1rem'
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '0.76rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  marginBottom: '6px'
                }}
              >
                Or Unlock via Anniversary Date Code (032225 or chimp):
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter 032225 or chimp..."
                  style={{
                    flex: 1,
                    padding: '9px 14px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-gold)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn-editorial-outline" style={{ padding: '8px 16px' }}>
                  Open
                </button>
              </div>
              {passcodeError && (
                <div style={{ color: 'var(--rose-deep)', fontSize: '0.78rem', marginTop: '6px' }}>
                  Hint: Try our anniversary date (032225) or "chimp"!
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

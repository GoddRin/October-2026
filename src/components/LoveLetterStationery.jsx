import React, { useState, useEffect } from 'react';
import {
  Mail,
  Sparkles,
  Heart,
  PenTool,
  Copy,
  Check,
  Download,
  Lock,
  Unlock,
  Send,
  BookmarkCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KUYA_EXACT_LETTER } from '../data/relationshipData';
import { conservatoryAudio } from '../utils/audioSynth';

export default function LoveLetterStationery() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [inkHighlight, setInkHighlight] = useState(true);

  // Interactive Letter / Message Field for Ross Ann to write her reply or keepsake note
  const [chimpLetterTitle, setChimpLetterTitle] = useState('Dearest Kuya Marc,');
  const [chimpLetterBody, setChimpLetterBody] = useState(() => {
    return (
      localStorage.getItem('october2026_chimp_letter_draft') ||
      ''
    );
  });
  const [selectedWaxStamp, setSelectedWaxStamp] = useState('Garden Wedding Vow 💍');
  const [savedReplies, setSavedReplies] = useState(() => {
    try {
      const raw = localStorage.getItem('october2026_chimp_saved_letters');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [copiedReply, setCopiedReply] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('october2026_chimp_letter_draft', chimpLetterBody);
    } catch {
      // Ignore storage error
    }
  }, [chimpLetterBody]);

  const handleOpenWaxSeal = () => {
    setIsEnvelopeOpened(true);
    conservatoryAudio.playWaxSealOpen();
    confetti({
      particleCount: 75,
      spread: 85,
      origin: { y: 0.55 },
      colors: ['#9E3342', '#B88946', '#E8B4B8', '#FAF6F0']
    });
  };

  const quickPrompts = [
    {
      label: '💍 Yes to Our Garden Wedding!',
      text: 'Oo naman Kuya, magpapakasal tayo! Kahit simple or engrande na Garden Wedding, basta ikaw ang groom ko, masayang-masaya na ako. Happy 19th Monthsary! Mahal na mahal din kita!'
    },
    {
      label: '🎓 Manifesting Graduation!',
      text: 'Thank you so much sa laging pag-cheer at pag-appreciate sa akin Kuya! Konting kembot na lang gagraduate na ako (Manifesting!). Para sa future nating dalawa ito!'
    },
    {
      label: '🤗 Sending Kiss & Tight Hug Back!',
      text: 'Happy 19th Monthsary my Kuya! Ramdam na ramdam ko rin lahat ng effort at pagmamahal mo. Sending back 1,000x virtual kisss and super tight huggggg! I love you so much!'
    }
  ];

  const waxStamps = [
    'Garden Wedding Vow 💍',
    'Graduating Soon 🎓',
    'Forever Your Labidabs ❤️',
    'Sealed with a Kiss 💋'
  ];

  const handleSaveReplyToVault = (e) => {
    e.preventDefault();
    if (!chimpLetterBody.trim()) return;

    const newEntry = {
      id: Date.now(),
      salutation: chimpLetterTitle,
      body: chimpLetterBody.trim(),
      stamp: selectedWaxStamp,
      date: new Date().toLocaleString('en-PH', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
    };

    const updated = [newEntry, ...savedReplies];
    setSavedReplies(updated);
    try {
      localStorage.setItem('october2026_chimp_saved_letters', JSON.stringify(updated));
    } catch {
      // Ignore
    }

    conservatoryAudio.playWaxSealOpen();
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#C45161', '#B88946', '#E8B4B8']
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopyForKuya = () => {
    const fullText = `${chimpLetterTitle}\n\n${
      chimpLetterBody || '(Write your message here...)'
    }\n\n— Ross Ann "Chimp" Mora (${selectedWaxStamp} • 19th Monthsary)`;
    navigator.clipboard?.writeText(fullText);
    setCopiedReply(true);
    conservatoryAudio.playBloomHarp(8);
    setTimeout(() => setCopiedReply(false), 2500);
  };

  const handleDownloadLetter = () => {
    const content = `============================================================
L'ORANGERIE DE ROSS ANN • CHAPTER XIX (19TH MONTHSARY)
October 22, 2026 • Marc Harrold Salva (26) & Ross Ann Mora (23)
============================================================

--- KUYA MARC'S LETTER TO ROSS ANN ---
${KUYA_EXACT_LETTER.salutation}

${KUYA_EXACT_LETTER.paragraphs.join('\n\n')}

${KUYA_EXACT_LETTER.signOff}
${KUYA_EXACT_LETTER.signature} (${KUYA_EXACT_LETTER.fullName})

------------------------------------------------------------

--- ROSS ANN'S LETTER / NOTE TO KUYA MARC ---
Seal Stamp: ${selectedWaxStamp}
${chimpLetterTitle}

${chimpLetterBody || '(Sealed with love on our 19th Monthsary!)'}

With all my love,
Ross Ann "Chimp" Mora
============================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Our-19th-Monthsary-Letters-Oct-22-2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="kuya-letter"
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
          <Mail size={14} />
          <span>The Conservatory Stationery Desk • Personal Correspondence</span>
        </div>

        <h2
          className="serif-display"
          style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}
        >
          A Sealed Letter from{' '}
          <span className="serif-italic" style={{ color: 'var(--rose-deep)' }}>
            Kuya Marc
          </span>{' '}
          &amp; Your Stationery Desk
        </h2>

        <p
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.06rem)'
          }}
        >
          Break the golden crimson wax seal to read Kuya’s personal 19th Monthsary letter for you,
          then use your own botanical stationery desk beside it to pen a note or seal your reply.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'start'
        }}
      >
        {/* LEFT COLUMN: Kuya Marc's Wax-Sealed Letter */}
        <div>
          {!isEnvelopeOpened ? (
            /* Tactile Unopened Cotton-Linen Envelope with 3D Wax Seal */
            <div
              onClick={handleOpenWaxSeal}
              className="conservatory-card"
              style={{
                padding: 'clamp(2.5rem, 6vw, 4.25rem) clamp(1.5rem, 4vw, 3rem)',
                borderRadius: '24px',
                border: '1.5px solid var(--border-gold)',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                background:
                  'linear-gradient(155deg, var(--bg-card-solid) 0%, var(--bg-secondary) 100%)'
              }}
            >
              {/* Envelope Flap Diagonal Lines */}
              <svg
                viewBox="0 0 500 160"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: 'auto',
                  opacity: 0.35,
                  pointerEvents: 'none'
                }}
              >
                <path
                  d="M 0 0 L 250 140 L 500 0"
                  fill="none"
                  stroke="var(--gold-primary)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 20 0 L 250 128 L 480 0"
                  fill="none"
                  stroke="var(--rose-primary)"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                />
              </svg>

              <div
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                  fontWeight: 700
                }}
              >
                Hand-Delivered to Ross Ann “Chimp” Mora (23)
              </div>

              <h3
                className="serif-display"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem'
                }}
              >
                “For My Most Treasured Loved One”
              </h3>

              {/* Interactive 3D Crimson & Gold Wax Seal Stamp */}
              <div
                className="animate-float"
                style={{
                  width: '112px',
                  height: '112px',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  background: 'radial-gradient(circle at 35% 30%, #C45161, #8B2232 70%, #5E1420 100%)',
                  border: '3px solid #DFC293',
                  boxShadow:
                    '0 14px 30px rgba(139, 34, 50, 0.45), inset 0 2px 8px rgba(255,255,255,0.3), inset 0 -4px 10px rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF8E7'
                }}
              >
                <div
                  style={{
                    width: '86px',
                    height: '86px',
                    borderRadius: '50%',
                    border: '1.5px dashed rgba(255, 248, 231, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span
                    className="serif-display"
                    style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.06em' }}
                  >
                    M &amp; R
                  </span>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      marginTop: '2px'
                    }}
                  >
                    MONTH XIX
                  </span>
                </div>
              </div>

              <div
                className="script-note"
                style={{ fontSize: '1.35rem', color: 'var(--rose-deep)', marginBottom: '1.25rem' }}
              >
                Tap the Wax Seal to Break &amp; Unfold Kuya’s Letter
              </div>

              <button type="button" className="btn-editorial-primary">
                <Unlock size={16} />
                <span>Break Wax Seal &amp; Read Letter</span>
              </button>
            </div>
          ) : (
            /* Unfolded Archival Cotton Paper Letter with Kuya's Exact Message */
            <div
              className="conservatory-card"
              style={{
                padding: 'clamp(1.75rem, 4.5vw, 3rem)',
                borderRadius: '24px',
                border: '1.5px solid var(--border-gold)',
                background: 'var(--bg-card-solid)',
                position: 'relative',
                boxShadow: 'var(--shadow-elevated)'
              }}
            >
              {/* Top Letterhead Stamp */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  paddingBottom: '1rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid var(--border-hairline)'
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      color: 'var(--gold-primary)',
                      fontWeight: 700
                    }}
                  >
                    {KUYA_EXACT_LETTER.dateStamp}
                  </div>
                  <div
                    className="serif-display"
                    style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}
                  >
                    {KUYA_EXACT_LETTER.salutation}
                  </div>
                </div>

                <button
                  onClick={() => setInkHighlight(!inkHighlight)}
                  className="btn-editorial-outline"
                  style={{ padding: '5px 12px', fontSize: '0.74rem' }}
                >
                  <Sparkles size={13} color="var(--gold-primary)" />
                  <span>{inkHighlight ? 'Highlights On' : 'Plain Ink'}</span>
                </button>
              </div>

              {/* Exact Word-for-Word Letter Paragraphs */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.35rem',
                  fontSize: 'clamp(1.02rem, 1.9vw, 1.12rem)',
                  lineHeight: 1.88,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                <p>
                  <strong style={{ color: 'var(--rose-deep)' }}>My Labidabsss,</strong> octoberr
                  naa, lapit na ikaw grumaduate{' '}
                  <span
                    style={{
                      background: inkHighlight ? 'var(--rose-pale)' : 'transparent',
                      color: inkHighlight ? 'var(--rose-deep)' : 'inherit',
                      padding: inkHighlight ? '2px 7px' : 0,
                      borderRadius: '6px',
                      fontWeight: 600
                    }}
                  >
                    (Manifesting!)
                  </span>
                  . habang ginagawa ko itong message ko for you, i feel so happy na tumagal tayo ng
                  ganito. habang patagal nang patagal, mas na-aappreciate kita. nakikita&apos;t
                  nararamdaman ko mga bagay na ginagawa mo para sa akin, sa ating dalawa.{' '}
                  <span
                    style={{
                      borderBottom: inkHighlight ? '2px solid var(--gold-primary)' : 'none',
                      fontWeight: 600
                    }}
                  >
                    Palagi kong itretreasure ang meron tayo.
                  </span>
                </p>

                <p>
                  <span
                    style={{
                      background: inkHighlight ? 'var(--gold-glow)' : 'transparent',
                      padding: inkHighlight ? '2px 8px' : 0,
                      borderRadius: '6px',
                      fontWeight: 700
                    }}
                  >
                    Magpapakasal pa tayo kapag nakaipon na ako, okay? Gusto ko Garden Wedding,
                  </span>{' '}
                  basta engrande but not so much engrande kasi mauubos agad budget nyan HAHAHAHA jk
                  basta gusto ko ma-feel mong{' '}
                  <strong style={{ color: 'var(--rose-deep)' }}>
                    you are my most treasured loved one with my family.
                  </strong>{' '}
                  Palagi mong tatandaan, Mahal na mahal na mahal na mahal ka niya kuya. Happy 19th
                  monthsary my labidabs &lt;3! sending my{' '}
                  <span
                    style={{
                      color: 'var(--rose-deep)',
                      fontWeight: 700
                    }}
                  >
                    Virtual kisss and virtual tight huggggg. i love you!
                  </span>
                </p>
              </div>

              {/* Signature Block */}
              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px dashed var(--border-hairline)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                <div>
                  <div
                    className="serif-italic"
                    style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}
                  >
                    {KUYA_EXACT_LETTER.signOff}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-signature)',
                      fontSize: '2.35rem',
                      color: 'var(--rose-deep)',
                      lineHeight: 1.15,
                      marginTop: '4px'
                    }}
                  >
                    {KUYA_EXACT_LETTER.signature}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {KUYA_EXACT_LETTER.fullName} • 26
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      conservatoryAudio.playVirtualHug();
                      confetti({
                        particleCount: 65,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#C45161', '#E8B4B8', '#B88946']
                      });
                    }}
                    className="btn-editorial-primary"
                    style={{ padding: '9px 16px', fontSize: '0.8rem' }}
                  >
                    <Heart size={15} fill="#FAF6F0" />
                    <span>Receive Virtual Kiss &amp; Tight Huggggg</span>
                  </button>

                  <button
                    onClick={() => setIsEnvelopeOpened(false)}
                    className="btn-editorial-outline"
                    style={{ padding: '8px 14px', fontSize: '0.78rem' }}
                  >
                    <Lock size={13} />
                    <span>Fold Back</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Ross Ann's Interactive Stationery Desk (Message / Letter Field for Her) */}
        <div
          className="conservatory-card"
          style={{
            padding: 'clamp(1.75rem, 4vw, 2.5rem)',
            borderRadius: '24px',
            border: '1px solid var(--border-gold)'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PenTool size={16} color="var(--rose-deep)" />
              <span
                style={{
                  fontSize: '0.76rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--gold-primary)',
                  fontWeight: 700
                }}
              >
                Ross Ann’s Botanical Letter Desk
              </span>
            </div>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Auto-saved in your browser
            </span>
          </div>

          <h3
            className="serif-display"
            style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}
          >
            Write a Letter or Reply to Kuya Marc
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Pen your thoughts, your answer to Kuya’s Garden Wedding dream, or your 19th Monthsary
            note below. You can seal it into this keepsake vault, copy it to send to Kuya, or
            download both of our letters together!
          </p>

          {/* Quick Inspiration Prompts for Chimp */}
          <div style={{ marginBottom: '1rem' }}>
            <div
              style={{
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                marginBottom: '6px',
                fontWeight: 600
              }}
            >
              Quick Reply Starters (Tap to insert):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {quickPrompts.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setChimpLetterBody((prev) => (prev ? `${prev}\n\n${p.text}` : p.text));
                    conservatoryAudio.playBloomHarp(4);
                  }}
                  style={{
                    padding: '5px 11px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-hairline)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSaveReplyToVault}>
            {/* Salutation Input */}
            <div style={{ marginBottom: '10px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  marginBottom: '4px',
                  fontWeight: 700
                }}
              >
                Letter Salutation
              </label>
              <input
                type="text"
                value={chimpLetterTitle}
                onChange={(e) => setChimpLetterTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-hairline)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
            </div>

            {/* Main Letter Textarea */}
            <div style={{ marginBottom: '12px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  marginBottom: '4px',
                  fontWeight: 700
                }}
              >
                Your Message / Letter for Kuya Marc
              </label>
              <textarea
                rows={5}
                value={chimpLetterBody}
                onChange={(e) => setChimpLetterBody(e.target.value)}
                placeholder="Write your sweet reply to Kuya Marc here... (e.g., Oo naman Kuya, Garden Wedding tayo! Happy 19th Monthsary!)"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-gold)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
            </div>

            {/* Choose Wax Seal Stamp */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                  fontWeight: 700
                }}
              >
                Choose Your Wax Seal Stamp:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {waxStamps.map((stamp) => {
                  const active = selectedWaxStamp === stamp;
                  return (
                    <button
                      key={stamp}
                      type="button"
                      onClick={() => setSelectedWaxStamp(stamp)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '9999px',
                        border: active
                          ? '1.5px solid var(--rose-deep)'
                          : '1px solid var(--border-hairline)',
                        background: active ? 'var(--rose-pale)' : 'transparent',
                        color: 'var(--text-primary)',
                        fontSize: '0.75rem',
                        fontWeight: active ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {stamp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button type="submit" className="btn-editorial-primary">
                <Send size={15} />
                <span>Seal &amp; Save to Our Keepsake Vault</span>
              </button>

              <button
                type="button"
                onClick={handleCopyForKuya}
                className="btn-editorial-outline"
              >
                {copiedReply ? <Check size={15} color="var(--rose-deep)" /> : <Copy size={15} />}
                <span>{copiedReply ? 'Copied to Send to Kuya!' : 'Copy Reply for Kuya'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadLetter}
                className="btn-editorial-outline"
                title="Download both Kuya's letter and your reply as a keepsake file"
              >
                <Download size={15} />
                <span>Download Letters</span>
              </button>
            </div>

            {saveSuccess && (
              <div
                style={{
                  marginTop: '10px',
                  fontSize: '0.82rem',
                  color: 'var(--rose-deep)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <BookmarkCheck size={16} />
                <span>Your letter has been wax-sealed and saved in your keepsake vault below!</span>
              </div>
            )}
          </form>

          {/* Saved Sealed Letters List */}
          {savedReplies.length > 0 && (
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-hairline)'
              }}
            >
              <div
                style={{
                  fontSize: '0.74rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--gold-primary)',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}
              >
                Sealed Notes in Your Conservatory Vault ({savedReplies.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {savedReplies.slice(0, 3).map((entry) => (
                  <div
                    key={entry.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-hairline)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.73rem',
                        color: 'var(--text-muted)',
                        marginBottom: '4px'
                      }}
                    >
                      <span style={{ fontWeight: 700, color: 'var(--rose-deep)' }}>
                        {entry.stamp}
                      </span>
                      <span>{entry.date}</span>
                    </div>
                    <div
                      className="serif-display"
                      style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2px' }}
                    >
                      {entry.salutation}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {entry.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

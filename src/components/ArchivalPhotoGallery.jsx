import React, { useState } from 'react';
import { Camera, RotateCw, Heart, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARCHIVAL_PHOTOS } from '../data/relationshipData';
import { conservatoryAudio } from '../utils/audioSynth';

export default function ArchivalPhotoGallery() {
  const [flippedPlates, setFlippedPlates] = useState({});
  const [useAltPhoto, setUseAltPhoto] = useState(false);
  const [lovedPlates, setLovedPlates] = useState({});

  const toggleFlip = (id) => {
    setFlippedPlates((prev) => ({ ...prev, [id]: !prev[id] }));
    conservatoryAudio.playBloomHarp(5);
  };

  const handleLovePlate = (id, e) => {
    e.stopPropagation();
    setLovedPlates((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    conservatoryAudio.playBloomHarp(7);
    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#C45161', '#E8B4B8', '#B88946']
    });
  };

  return (
    <section
      id="photo-plates"
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
          <Camera size={14} />
          <span>Botanical Herbarium Exhibition • Three Treasured Plates</span>
        </div>

        <h2
          className="serif-display"
          style={{
            fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}
        >
          Moments I Will{' '}
          <span className="serif-italic" style={{ color: 'var(--rose-deep)' }}>
            Always Treasure
          </span>
        </h2>

        <p
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.06rem)'
          }}
        >
          “Habang patagal nang patagal, mas na-aappreciate kita... Palagi kong itretreasure ang
          meron tayo.” Tap <strong>“Read Kuya’s Back Note”</strong> on any frame to flip the
          archival plate!
        </p>
      </div>

      {/* 3 Curated Herbarium Photo Plates Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.25rem)'
        }}
      >
        {ARCHIVAL_PHOTOS.map((plate, idx) => {
          const isFlipped = !!flippedPlates[plate.id];
          const displaySrc =
            plate.alternateImage && useAltPhoto ? plate.alternateImage : plate.primaryImage;

          return (
            <div
              key={plate.id}
              className="conservatory-card"
              style={{
                padding: '1.25rem',
                borderRadius: '24px',
                border: '1.5px solid var(--border-gold)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transform: idx === 1 ? 'translateY(-4px)' : 'none'
              }}
            >
              {/* Top Specimen Header */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-primary)'
                  }}
                >
                  <span>{plate.specimenNumber}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{plate.dateTag}</span>
                </div>

                {/* Archival Frame Container */}
                <div
                  onClick={() => toggleFlip(plate.id)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4 / 4.2',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-hairline)',
                    background: 'var(--bg-secondary)',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                  }}
                >
                  {!isFlipped ? (
                    <>
                      <img
                        src={displaySrc}
                        alt={plate.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.5s ease'
                        }}
                      />

                      {/* Location Pill */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          background: 'rgba(22, 42, 34, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: '#FAF6F0',
                          borderRadius: '9999px',
                          padding: '5px 12px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <MapPin size={12} color="#DFC293" />
                        <span>{plate.locationTag}</span>
                      </div>
                    </>
                  ) : (
                    /* Back of Archival Photo Plate (Kuya's Handwritten Secret Note) */
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        padding: '2rem 1.5rem',
                        background:
                          'linear-gradient(145deg, var(--bg-card-solid), var(--bg-secondary))',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                      }}
                    >
                      <Sparkles
                        size={24}
                        color="var(--gold-primary)"
                        style={{ marginBottom: '12px' }}
                      />
                      <div
                        style={{
                          fontSize: '0.72rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.16em',
                          color: 'var(--gold-primary)',
                          fontWeight: 700,
                          marginBottom: '10px'
                        }}
                      >
                        Back of Archival Photograph
                      </div>
                      <p
                        className="script-note"
                        style={{
                          fontSize: '1.45rem',
                          color: 'var(--rose-deep)',
                          lineHeight: 1.45,
                          marginBottom: '1rem'
                        }}
                      >
                        “{plate.secretBackNote}”
                      </p>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          fontWeight: 600
                        }}
                      >
                        — Forever Yours, Kuya Marc
                      </div>
                    </div>
                  )}
                </div>

                {/* Optional Expression Switcher for Plate III (McDo Smile vs Sweet Head Tilt) */}
                {plate.alternateImage && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setUseAltPhoto(!useAltPhoto);
                        conservatoryAudio.playBloomHarp(3);
                      }}
                      className="btn-editorial-outline"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '6px 12px',
                        fontSize: '0.75rem'
                      }}
                    >
                      <Sparkles size={13} color="var(--gold-primary)" />
                      <span>{plate.alternateLabel}</span>
                    </button>
                  </div>
                )}

                <h3
                  className="serif-display"
                  style={{
                    fontSize: '1.45rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  {plate.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem'
                  }}
                >
                  {plate.caption}
                </p>
              </div>

              {/* Bottom Plate Actions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.9rem',
                  borderTop: '1px solid var(--border-hairline)'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFlip(plate.id)}
                  className="btn-editorial-outline"
                  style={{ padding: '6px 13px', fontSize: '0.76rem' }}
                >
                  <RotateCw size={13} />
                  <span>{isFlipped ? 'View Photo Front' : 'Read Kuya’s Back Note'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleLovePlate(plate.id, e)}
                  style={{
                    background: 'var(--rose-pale)',
                    color: 'var(--rose-deep)',
                    border: '1px solid var(--rose-blush)',
                    borderRadius: '9999px',
                    padding: '6px 13px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Heart size={13} fill="var(--rose-deep)" />
                  <span>Treasure ({19 + (lovedPlates[plate.id] || 0)})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

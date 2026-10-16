import React from 'react';
import { Heart, Flower2, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: '3rem',
        borderTop: '1px solid var(--border-hairline)',
        background: 'var(--bg-secondary)',
        padding: '3rem clamp(1rem, 4vw, 2.5rem)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem'
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--rose-deep)',
            color: '#FAF6F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '1.05rem',
            border: '1.5px solid var(--gold-light)'
          }}
        >
          XIX
        </div>

        <h4
          className="serif-display"
          style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}
        >
          Happy 19th Monthsary, My Dearest Ross Ann “Chimp” Mora
        </h4>

        <p
          style={{
            maxWidth: '580px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65
          }}
        >
          “Palagi mong tatandaan, Mahal na mahal na mahal na mahal ka niya kuya. Happy 19th
          monthsary my labidabs &lt;3! sending my Virtual kisss and virtual tight huggggg. i love
          you!”
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginTop: '0.5rem'
          }}
        >
          <span>Marc Harrold Salva (26) &amp; Ross Ann Mora (23)</span>
          <span>•</span>
          <span>Official Since March 22, 2025</span>
          <span>•</span>
          <span>19th Monthsary: October 22, 2026</span>
        </div>

        <a
          href="#hero"
          className="btn-editorial-outline"
          style={{ marginTop: '0.75rem', textDecoration: 'none', fontSize: '0.78rem' }}
        >
          <ArrowUp size={14} />
          <span>Return to Conservatory Entrance</span>
        </a>
      </div>
    </footer>
  );
}

import React from 'react';
import {
  Flower2,
  Mail,
  Camera,
  Sparkles,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Heart
} from 'lucide-react';

export default function Navbar({
  theme,
  onToggleTheme,
  musicPlaying,
  onToggleMusic,
  petalsActive,
  onTogglePetals
}) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-hairline)',
        padding: '0.75rem clamp(1rem, 4vw, 2.5rem)',
        transition: 'background-color 0.4s ease'
      }}
    >
      <div
        style={{
          maxWidth: '1220px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}
      >
        {/* Brand Emblem */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)'
          }}
        >
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
              fontSize: '0.92rem',
              border: '1.5px solid var(--gold-light)'
            }}
          >
            XIX
          </div>
          <div>
            <div
              className="serif-display"
              style={{ fontSize: '1.18rem', fontWeight: 700, lineHeight: 1.05 }}
            >
              L’Orangerie de Ross Ann
            </div>
            <div
              style={{
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--gold-primary)',
                fontWeight: 700
              }}
            >
              19th Monthsary • Oct 22, 2026
            </div>
          </div>
        </a>

        {/* Navigation Links */}
        <div
          className="hide-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '22px',
            fontSize: '0.84rem',
            fontWeight: 600
          }}
        >
          {[
            { href: '#grand-bouquet', label: '19-Bloom Bouquet', icon: <Flower2 size={14} /> },
            { href: '#kuya-letter', label: 'Kuya’s Letter & Desk', icon: <Mail size={14} /> },
            { href: '#photo-plates', label: 'Our 3 Plates', icon: <Camera size={14} /> },
            { href: '#garden-vow', label: 'Garden Wedding & Hugs', icon: <Heart size={14} /> }
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
            >
              <span style={{ color: 'var(--rose-primary)', display: 'flex' }}>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onToggleMusic}
            className="btn-editorial-outline"
            style={{ padding: '7px 13px', fontSize: '0.78rem' }}
            title="Toggle Conservatory Melody"
          >
            {musicPlaying ? (
              <Volume2 size={15} color="var(--rose-deep)" />
            ) : (
              <VolumeX size={15} color="var(--text-muted)" />
            )}
            <span>{musicPlaying ? 'Music On' : 'Play Song'}</span>
          </button>

          <button
            onClick={onTogglePetals}
            className="btn-editorial-outline"
            style={{ padding: '7px 12px', fontSize: '0.78rem' }}
            title="Toggle Floating Botanical Petals"
          >
            <Sparkles
              size={14}
              color={petalsActive ? 'var(--gold-primary)' : 'var(--text-muted)'}
            />
            <span className="hide-mobile">{petalsActive ? 'Petals On' : 'Petals Off'}</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="btn-editorial-outline"
            style={{ padding: '7px 13px', fontSize: '0.78rem' }}
            title="Switch between Sunlit Orangerie and Moonlit Garden"
          >
            {theme === 'sunlit' ? (
              <Moon size={14} />
            ) : (
              <Sun size={14} color="var(--gold-primary)" />
            )}
            <span>{theme === 'sunlit' ? 'Evening' : 'Sunlit'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

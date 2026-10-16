import React, { useState, useEffect, useRef } from 'react';
import BotanicalAtmosphereCanvas from './components/BotanicalAtmosphereCanvas';
import ConservatoryLockScreen from './components/ConservatoryLockScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GrandBouquetConservatory from './components/GrandBouquetConservatory';
import LoveLetterStationery from './components/LoveLetterStationery';
import ArchivalPhotoGallery from './components/ArchivalPhotoGallery';
import GardenWeddingDreamer from './components/GardenWeddingDreamer';
import Footer from './components/Footer';
import { Eye, Lock } from 'lucide-react';

export default function App() {
  // Exact 19th Monthsary Unlock Timestamp: October 22, 2026 at 00:00:00 (12:00 AM Midnight)
  const targetTimestamp = new Date('2026-10-22T00:00:00').getTime();

  const [isUnlocked, setIsUnlocked] = useState(() => Date.now() >= targetTimestamp);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [theme, setTheme] = useState('sunlit'); // 'sunlit' | 'moonlit'
  const [petalsActive, setPetalsActive] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);
  const manualPauseRef = useRef(false);

  // Sync theme attribute on root document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Automatically check if real time reaches October 22, 2026 00:00:00
  useEffect(() => {
    const checkUnlock = () => {
      if (Date.now() >= targetTimestamp) {
        setIsUnlocked(true);
      }
    };
    checkUnlock();
    const id = setInterval(checkUnlock, 1000);
    return () => clearInterval(id);
  }, [targetTimestamp]);

  // Background Conservatory Music Setup
  useEffect(() => {
    const audio = new Audio('/audio/darling_u.mp3');
    audio.loop = true;
    audio.volume = 0.75;
    audioRef.current = audio;

    audio
      .play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicPlaying(false));

    const startOnFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused && !manualPauseRef.current) {
        audioRef.current
          .play()
          .then(() => setMusicPlaying(true))
          .catch(() => {});
      }
      window.removeEventListener('click', startOnFirstGesture);
    };

    window.addEventListener('click', startOnFirstGesture);

    return () => {
      window.removeEventListener('click', startOnFirstGesture);
      audio.pause();
    };
  }, []);

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      manualPauseRef.current = false;
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => {});
    } else {
      manualPauseRef.current = true;
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'sunlit' ? 'moonlit' : 'sunlit'));
  };

  const handleTogglePreview = (val) => {
    setIsPreviewMode(val);
    setIsUnlocked(val);
  };

  const handleRelock = () => {
    setIsPreviewMode(false);
    setIsUnlocked(Date.now() >= targetTimestamp);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Subtle Organic Paper Linen Grain */}
      <div className="paper-grain-overlay" />

      {/* Floating Botanical Petals & Golden Light Motes */}
      <BotanicalAtmosphereCanvas theme={theme} active={petalsActive} />

      {!isUnlocked ? (
        /* TIME-LOCKED CONSERVATORY GATE (Until October 22, 2026 • 12:00 AM Midnight) */
        <ConservatoryLockScreen
          onUnlock={() => setIsUnlocked(true)}
          onTogglePreview={handleTogglePreview}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          musicPlaying={musicPlaying}
          onToggleMusic={handleToggleMusic}
        />
      ) : (
        /* UNLOCKED 19TH MONTHSARY BOTANICAL CONSERVATORY */
        <>
          {isPreviewMode && (
            <div
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 150,
                background: 'rgba(22, 42, 34, 0.94)',
                color: '#FAF6F0',
                border: '1.5px solid #DFC293',
                borderRadius: '9999px',
                padding: '7px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: '#DFC293'
                }}
              >
                <Eye size={14} />
                <span>Kuya Preview Mode</span>
              </div>
              <button
                onClick={handleRelock}
                style={{
                  background: '#9E3342',
                  color: '#FAF6F0',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '4px 11px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Lock size={11} />
                <span>Lock Gate</span>
              </button>
            </div>
          )}

          <Navbar
            theme={theme}
            onToggleTheme={handleToggleTheme}
            musicPlaying={musicPlaying}
            onToggleMusic={handleToggleMusic}
            petalsActive={petalsActive}
            onTogglePetals={() => setPetalsActive(!petalsActive)}
          />

          <main>
            <HeroSection />
            <GrandBouquetConservatory />
            <LoveLetterStationery />
            <ArchivalPhotoGallery />
            <GardenWeddingDreamer />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

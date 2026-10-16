import React, { useEffect, useRef } from 'react';

export default function BotanicalAtmosphereCanvas({ theme = 'sunlit', active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating botanical petals
    const petalColorsSunlit = ['#E8B4B8', '#F3D1D4', '#C45161', '#F5E1CE', '#D8B4E2'];
    const petalColorsMoonlit = ['#C45161', '#E58391', '#DCA85E', '#B794F4'];

    const petals = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 5,
      speedY: Math.random() * 0.55 + 0.25,
      speedX: (Math.random() - 0.5) * 0.45,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      colorIndex: Math.floor(Math.random() * 5),
      opacity: Math.random() * 0.45 + 0.25
    }));

    // Golden sunlight dust motes / evening fireflies
    const motes = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.3 + 0.08),
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.015
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isMoonlit = theme === 'moonlit';
      const palette = isMoonlit ? petalColorsMoonlit : petalColorsSunlit;

      // Draw golden motes / fireflies
      motes.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.phase += m.pulseSpeed;

        if (m.y < -10) m.y = height + 10;
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const alpha = (Math.sin(m.phase) * 0.5 + 0.5) * (isMoonlit ? 0.75 : 0.45);
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4);
        if (isMoonlit) {
          grad.addColorStop(0, `rgba(243, 212, 160, ${alpha})`);
          grad.addColorStop(0.5, `rgba(220, 168, 94, ${alpha * 0.4})`);
          grad.addColorStop(1, 'rgba(220, 168, 94, 0)');
        } else {
          grad.addColorStop(0, `rgba(184, 137, 70, ${alpha})`);
          grad.addColorStop(1, 'rgba(184, 137, 70, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw organic rose & peony petals
      petals.forEach((p) => {
        p.swayPhase += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayPhase) * 0.35;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        ctx.fillStyle = palette[p.colorIndex % palette.length];
        ctx.beginPath();
        // Soft heart-notched rose petal shape
        ctx.moveTo(0, -p.size * 0.6);
        ctx.bezierCurveTo(
          p.size * 0.8, -p.size * 0.9,
          p.size * 1.1, p.size * 0.3,
          0, p.size
        );
        ctx.bezierCurveTo(
          -p.size * 1.1, p.size * 0.3,
          -p.size * 0.8, -p.size * 0.9,
          0, -p.size * 0.6
        );
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5
      }}
    />
  );
}

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  depth: number; // 3D depth layer for parallax shift: 0.18 (distant space) to 1.25 (foreground)
  hasSpike?: boolean;
}

interface InfallingParticle {
  angle: number;
  distance: number;
  speed: number;
  radialSpeed: number;
  size: number;
  alpha: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

interface BlackHoleHeroProps {
  className?: string;
  children?: React.ReactNode;
}

export const BlackHoleHero: React.FC<BlackHoleHeroProps> = ({ className = '', children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Color palettes for stars in the night sky
    const starColors = [
      '#ffffff', // Diamond White
      '#e0f2fe', // Ice Blue
      '#bae6fd', // Stellar Cyan
      '#67e8f9', // Bright Cyan
      '#a7f3d0', // Pale Emerald
      '#fef08a', // Pale Gold
      '#e9d5ff', // Cosmic Violet
    ];

    // Generate static/twinkling stars across the night sky with 3D Depth stratification
    const starsCount = Math.min(Math.floor((width * height) / 3400), 280);
    const stars: Star[] = Array.from({ length: Math.max(starsCount, 160) }, (_, i) => {
      const depthRoll = Math.random();
      let depth: number;
      let size: number;
      let baseAlpha: number;

      if (depthRoll < 0.5) {
        // Distant deep-field stars (subtle parallax shift)
        depth = 0.18 + Math.random() * 0.22;
        size = 0.5 + Math.random() * 0.8;
        baseAlpha = 0.25 + Math.random() * 0.4;
      } else if (depthRoll < 0.85) {
        // Midground celestial stars (moderate parallax shift)
        depth = 0.48 + Math.random() * 0.32;
        size = 0.9 + Math.random() * 1.0;
        baseAlpha = 0.4 + Math.random() * 0.45;
      } else {
        // Bright foreground stars (most prominent 3D parallax shift)
        depth = 0.9 + Math.random() * 0.35;
        size = 1.8 + Math.random() * 1.3;
        baseAlpha = 0.6 + Math.random() * 0.4;
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: 1.0 + Math.random() * 3.5,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        depth,
        hasSpike: size > 2.0 && i % 3 === 0,
      };
    });

    // Infalling matter particles spiraling into the black hole accretion disk
    const particlesCount = 95;
    const plasmaPalette = [
      '#ffffff',
      '#fff8e1',
      '#ffecb3',
      '#ffe082',
      '#ffd54f',
      '#ffca28',
      '#ffb300',
      '#ffa000',
      '#ff8f00',
      '#ff6f00',
      '#f57c00',
      '#e65100',
      '#d84315',
    ];
    const infallingParticles: InfallingParticle[] = Array.from({ length: particlesCount }, () => {
      return {
        angle: Math.random() * Math.PI * 2,
        distance: 160 + Math.random() * 320,
        speed: 0.016 + Math.random() * 0.028,
        radialSpeed: 0.4 + Math.random() * 0.7,
        size: 0.8 + Math.random() * 2.0,
        alpha: 0.25 + Math.random() * 0.75,
        color: plasmaPalette[Math.floor(Math.random() * plasmaPalette.length)],
      };
    });

    // Shooting star manager
    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 85,
      speed: 13,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      alpha: 0,
      active: false,
    };

    let lastShootingStarTime = performance.now();
    let nextShootingStarDelay = 4000 + Math.random() * 5000;

    // Interactive 3D Parallax Mouse Physics Tracking (Smooth lerp interpolation)
    const parallaxMouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      ease: 0.055,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate normalized offset from container center (-1 to +1)
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      parallaxMouse.targetX = Math.max(-1.2, Math.min(1.2, normX));
      parallaxMouse.targetY = Math.max(-1.2, Math.min(1.2, normY));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
        parallaxMouse.targetX = Math.max(-1.2, Math.min(1.2, normX));
        parallaxMouse.targetY = Math.max(-1.2, Math.min(1.2, normY));
      }
    };

    const handleMouseLeave = () => {
      // Smoothly drift back to neutral equilibrium when mouse leaves
      parallaxMouse.targetX = 0;
      parallaxMouse.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Center coordinates for black hole (centered in the logo region)
    let time = 0;

    const render = (now: number) => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Interpolate 3D parallax coordinates with smooth inertia
      parallaxMouse.currentX += (parallaxMouse.targetX - parallaxMouse.currentX) * parallaxMouse.ease;
      parallaxMouse.currentY += (parallaxMouse.targetY - parallaxMouse.currentY) * parallaxMouse.ease;

      const centerX = width / 2;
      const blackHoleCenterY = Math.min(height * 0.34, 230);

      // 1. Draw Deep Cosmic Void Gradient Background (Night Sky)
      const spaceGlow = ctx.createRadialGradient(
        centerX,
        blackHoleCenterY,
        50,
        centerX,
        blackHoleCenterY,
        Math.max(width, height) * 0.85
      );
      spaceGlow.addColorStop(0, 'rgba(28, 14, 2, 0.95)');
      spaceGlow.addColorStop(0.25, 'rgba(12, 6, 4, 0.98)');
      spaceGlow.addColorStop(0.55, 'rgba(3, 4, 10, 1)');
      spaceGlow.addColorStop(1, 'rgba(1, 2, 5, 1)');

      ctx.fillStyle = spaceGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Distant Cosmic Nebula Dust Clouds with subtle 3D parallax shift
      const nebulaParallaxX = -parallaxMouse.currentX * 12;
      const nebulaParallaxY = -parallaxMouse.currentY * 8;

      const nebulaGrad1 = ctx.createRadialGradient(
        centerX - 200 + nebulaParallaxX,
        blackHoleCenterY - 70 + nebulaParallaxY,
        25,
        centerX - 200 + nebulaParallaxX,
        blackHoleCenterY - 70 + nebulaParallaxY,
        340
      );
      nebulaGrad1.addColorStop(0, 'rgba(255, 160, 20, 0.09)');
      nebulaGrad1.addColorStop(0.5, 'rgba(230, 81, 0, 0.04)');
      nebulaGrad1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGrad1;
      ctx.fillRect(0, 0, width, height);

      const nebulaGrad2 = ctx.createRadialGradient(
        centerX + 220 + nebulaParallaxX,
        blackHoleCenterY + 90 + nebulaParallaxY,
        35,
        centerX + 220 + nebulaParallaxX,
        blackHoleCenterY + 90 + nebulaParallaxY,
        380
      );
      nebulaGrad2.addColorStop(0, 'rgba(255, 193, 7, 0.07)');
      nebulaGrad2.addColorStop(0.6, 'rgba(180, 83, 9, 0.03)');
      nebulaGrad2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGrad2;
      ctx.fillRect(0, 0, width, height);

      // 3. Render Twinkling Stars with 3D Depth Parallax & Gravitational Lensing
      const maxParallaxShift = 34; // Maximum pixel displacement for foreground stars

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // 3D Parallax offset based on mouse position and star depth layer:
        // Foreground stars (high depth) move more; background stars move minutely
        const parallaxOffsetX = -parallaxMouse.currentX * maxParallaxShift * star.depth;
        const parallaxOffsetY = -parallaxMouse.currentY * (maxParallaxShift * 0.72) * star.depth;

        let baseStarX = star.x + parallaxOffsetX;
        let baseStarY = star.y + parallaxOffsetY;

        // Seamless wrap-around for stars moving past canvas bounds
        if (baseStarX < -30) baseStarX += width + 60;
        if (baseStarX > width + 30) baseStarX -= width + 60;
        if (baseStarY < -30) baseStarY += height + 60;
        if (baseStarY > height + 30) baseStarY -= height + 60;

        // Gravitational lensing: Stars close to the black hole are curved outward/tangentially
        const dx = baseStarX - centerX;
        const dy = baseStarY - blackHoleCenterY;
        const distToCenter = Math.sqrt(dx * dx + dy * dy);

        // Calculate smooth twinkle alpha
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        star.alpha = star.baseAlpha + twinkle * 0.45;
        const alpha = Math.max(0.08, Math.min(1, star.alpha));

        // If star is behind the event horizon core, light cannot escape
        const eventHorizonRadius = Math.min(width * 0.28, 175);
        let renderX = baseStarX;
        let renderY = baseStarY;

        if (distToCenter < eventHorizonRadius) {
          // Inside event horizon: starlight swallowed
          continue;
        } else if (distToCenter < eventHorizonRadius * 2.5) {
          // Gravitational lensing warp deflection around the black hole horizon
          const deflection = (1 - (distToCenter - eventHorizonRadius) / (eventHorizonRadius * 1.5)) * 18;
          const angle = Math.atan2(dy, dx);
          renderX = baseStarX + Math.cos(angle) * deflection;
          renderY = baseStarY + Math.sin(angle) * deflection;
        }

        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Starlight glow halo for larger foreground stars
        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, star.size * 2.6, 0, Math.PI * 2);
          ctx.globalAlpha = alpha * 0.35;
          ctx.fillStyle = star.color;
          ctx.fill();
        }

        // 4-point diffraction cross spikes for brightest stars
        if (star.hasSpike && alpha > 0.6) {
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha * 0.55;
          ctx.lineWidth = 0.6;
          const spikeLen = star.size * 4;

          ctx.beginPath();
          ctx.moveTo(renderX - spikeLen, renderY);
          ctx.lineTo(renderX + spikeLen, renderY);
          ctx.moveTo(renderX, renderY - spikeLen);
          ctx.lineTo(renderX, renderY + spikeLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 4. Shooting Star Animation
      if (!shootingStar.active && now - lastShootingStarTime > nextShootingStarDelay) {
        shootingStar.active = true;
        shootingStar.x = Math.random() * (width * 0.7);
        shootingStar.y = Math.random() * (height * 0.4);
        shootingStar.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
        shootingStar.length = 70 + Math.random() * 50;
        shootingStar.speed = 10 + Math.random() * 8;
        shootingStar.alpha = 1;
        lastShootingStarTime = now;
        nextShootingStarDelay = 5000 + Math.random() * 7000;
      }

      if (shootingStar.active) {
        ctx.save();
        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const starGrad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
        starGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        starGrad.addColorStop(0.7, 'rgba(255, 180, 50, 0.45)');
        starGrad.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.alpha})`);

        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.stroke();

        // Head glow
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = shootingStar.alpha;
        ctx.beginPath();
        ctx.arc(shootingStar.x, shootingStar.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.022;

        if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar.active = false;
        }
        ctx.restore();
      }

      // 5. Infalling Accretion Matter Particles Spiraling Around Logo with subtle 3D depth shift
      ctx.save();
      const horizonRadius = Math.min(width * 0.26, 170);
      const particleParallaxX = -parallaxMouse.currentX * 8;
      const particleParallaxY = -parallaxMouse.currentY * 5;

      for (let i = 0; i < infallingParticles.length; i++) {
        const p = infallingParticles[i];

        // Keplerian orbit: particles move faster as they get closer
        const angularVelocity = p.speed * (240 / Math.max(p.distance, 100));
        p.angle += angularVelocity;
        p.distance -= p.radialSpeed;

        // Reset if reached event horizon
        if (p.distance < horizonRadius * 0.9) {
          p.distance = horizonRadius * 2.4 + Math.random() * 150;
          p.angle = Math.random() * Math.PI * 2;
        }

        // Elliptical perspective projection (tilted accretion disk) + 3D mouse parallax
        const tilt = 0.38; // Elliptical foreshortening
        const px = centerX + Math.cos(p.angle) * p.distance + particleParallaxX;
        const py = blackHoleCenterY + Math.sin(p.angle) * p.distance * tilt + particleParallaxY;

        // Relativistic beaming: particles moving toward observer (left side, cos < 0) are brighter
        const dopplerFactor = 0.6 + (Math.cos(p.angle + Math.PI / 2) > 0 ? 0.75 : -0.2);
        const particleAlpha = Math.max(0.12, Math.min(1, p.alpha * dopplerFactor));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = particleAlpha;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Trailing motion streak
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = particleAlpha * 0.5;
        ctx.lineWidth = p.size * 0.85;
        const prevAngle = p.angle - angularVelocity * 2.5;
        const prevX = centerX + Math.cos(prevAngle) * (p.distance + 1.5) + particleParallaxX;
        const prevY = blackHoleCenterY + Math.sin(prevAngle) * (p.distance + 1.5) * tilt + particleParallaxY;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
      ctx.restore();

      // 6. Gravitational Lensing Halo Rings around Event Horizon (Warm incandescent golden-amber)
      ctx.save();
      const pulse = Math.sin(time * 2) * 0.08 + 1;
      const photonRingGrad = ctx.createRadialGradient(
        centerX + particleParallaxX * 0.4,
        blackHoleCenterY + particleParallaxY * 0.4,
        horizonRadius * 0.92,
        centerX + particleParallaxX * 0.4,
        blackHoleCenterY + particleParallaxY * 0.4,
        horizonRadius * 1.45 * pulse
      );
      photonRingGrad.addColorStop(0, 'rgba(0, 0, 0, 0.98)');
      photonRingGrad.addColorStop(0.12, 'rgba(255, 255, 255, 0.95)');
      photonRingGrad.addColorStop(0.25, 'rgba(255, 215, 64, 0.6)');
      photonRingGrad.addColorStop(0.5, 'rgba(255, 140, 20, 0.3)');
      photonRingGrad.addColorStop(0.78, 'rgba(216, 67, 21, 0.1)');
      photonRingGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = photonRingGrad;
      ctx.beginPath();
      ctx.arc(centerX + particleParallaxX * 0.4, blackHoleCenterY + particleParallaxY * 0.4, horizonRadius * 1.6 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#020409] select-none ${className}`}
    >
      {/* 1. Canvas Layer: Night Sky, Blinking Stars, Shooting Stars & Infalling Matter */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 2. Deep Space Cosmic Nebulae Glow Behind Content (Warm Golden-Amber Accretion Glow) */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
        style={{
          background:
            'radial-gradient(ellipse at 50% 32%, rgba(255, 170, 40, 0.22) 0%, rgba(234, 88, 12, 0.1) 40%, transparent 75%)',
        }}
      />

      {/* 3. Foreground Content with Children (Hero Text, Actions, etc.) */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

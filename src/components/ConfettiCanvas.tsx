/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface ConfettiCanvasHandle {
  burst: (x?: number, y?: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'circle' | 'heart' | 'star' | 'petal';
  angle: number;
  spin: number;
  opacity: number;
  maxLife: number;
  life: number;
}

export const ConfettiCanvas = forwardRef<ConfettiCanvasHandle, {}>((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const startLoopRef = useRef<(() => void) | null>(null);

  const colors = [
    '#ffb3c1', // Pastel Pink
    '#ff85a1', // Pink
    '#a2d2ff', // Soft Blue
    '#bde0fe', // Light Blue
    '#caffbf', // Mint
    '#ffeb3b', // Sparkle Yellow
    '#ffd6ff', // Light Purple
    '#ffc6ff', // Bright Lilac
  ];

  const shapes: Array<'circle' | 'heart' | 'star' | 'petal'> = [
    'circle',
    'heart',
    'star',
    'petal',
  ];

  // Particle creator
  const createParticle = (x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3, // slightly upward biased
      size: 8 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      angle: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.2,
      opacity: 1,
      maxLife: 80 + Math.random() * 40,
      life: 0,
    };
  };

  const burst = (x?: number, y?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = x !== undefined ? x : canvas.width / 2;
    const startY = y !== undefined ? y : canvas.height / 3;

    // Generate 60 cute particles
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(createParticle(startX, startY));
    }

    // Start rendering loop if not already animating
    if (!isAnimatingRef.current && startLoopRef.current) {
      isAnimatingRef.current = true;
      startLoopRef.current();
    }
  };

  // Expose function to outer window
  useImperativeHandle(ref, () => ({
    burst,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Game loop
    const update = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const particles = particlesRef.current;
      
      if (particles.length === 0) {
        // Clear canvas one last time and stop
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isAnimatingRef.current = false;
        animationFrameRef.current = null;
        return;
      }

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        
        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.vx *= 0.98; // Drag
        p.angle += p.spin;
        p.opacity = Math.max(0, 1 - p.life / p.maxLife);

        if (p.life >= p.maxLife || p.y > canvas.height + 20) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'heart') {
          ctx.beginPath();
          const r = p.size / 2;
          ctx.moveTo(0, r / 4);
          ctx.bezierCurveTo(r / 2, -r / 2, r * 1.5, -r / 3, 0, r);
          ctx.bezierCurveTo(-r * 1.5, -r / 3, -r / 2, -r / 2, 0, r / 4);
          ctx.fill();
        } else if (p.shape === 'star') {
          ctx.beginPath();
          const spikes = 5;
          const outerRadius = p.size / 2;
          const innerRadius = p.size / 4;
          let rot = (Math.PI / 2) * 3;
          let cx = 0;
          let cy = 0;
          const step = Math.PI / spikes;

          ctx.moveTo(0, -outerRadius);
          for (let k = 0; k < spikes; k++) {
            cx = Math.cos(rot) * outerRadius;
            cy = Math.sin(rot) * outerRadius;
            ctx.lineTo(cx, cy);
            rot += step;

            cx = Math.cos(rot) * innerRadius;
            cy = Math.sin(rot) * innerRadius;
            ctx.lineTo(cx, cy);
            rot += step;
          }
          ctx.lineTo(0, -outerRadius);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'petal') {
          // Elongated cute leaf/petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size / 2, p.size / 3, 0, 0, Math.PI * 2);
          ctx.fill();
          // Cute center dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    startLoopRef.current = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(update);
    };

    // If particles are pre-seeded somehow, start animating immediately
    if (particlesRef.current.length > 0) {
      isAnimatingRef.current = true;
      startLoopRef.current();
    }

    // Bind clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      startLoopRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      id="confetti-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
});

ConfettiCanvas.displayName = 'ConfettiCanvas';

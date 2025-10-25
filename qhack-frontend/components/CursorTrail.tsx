'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = Date.now();
    const trailLength = 8;

    const updateTrail = () => {
      const currentTime = Date.now();
      if (currentTime - lastTime > 50) {
        // Throttle to every 50ms
        setTrail((prevTrail) => {
          const newTrail = [
            { x: mousePosition.x, y: mousePosition.y, id: Date.now() },
            ...prevTrail.slice(0, trailLength - 1),
          ];
          return newTrail;
        });
        lastTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 0.6 - index * 0.08, scale: 1 - index * 0.1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: 16 - index * 1.5,
              height: 16 - index * 1.5,
              transform: 'translate(-50%, -50%)',
              background:
                index % 3 === 0
                  ? 'radial-gradient(circle, rgba(0, 240, 255, 0.8) 0%, transparent 70%)'
                  : index % 3 === 1
                  ? 'radial-gradient(circle, rgba(176, 0, 255, 0.8) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(255, 0, 255, 0.8) 0%, transparent 70%)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

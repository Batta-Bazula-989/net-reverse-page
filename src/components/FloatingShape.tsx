import { useEffect, useRef } from 'react';

interface FloatingShapeProps {
  type?: 'sphere' | 'ring' | 'blob';
  color?: 'green' | 'blue';
  size?: number;
  speed?: number;
}

export const FloatingShape = ({ 
  type = 'sphere', 
  color = 'green',
  size = 200,
  speed = 3
}: FloatingShapeProps) => {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shape = shapeRef.current;
    if (!shape) return;

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01 / speed;
      const x = Math.sin(time) * 20;
      const y = Math.cos(time * 0.8) * 20;
      const rotation = time * 10;

      shape.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [speed]);

  const colorClass = color === 'green' 
    ? 'from-green-accent/20 to-green-accent/10' 
    : 'from-blue-accent/20 to-blue-accent/10';

  return (
    <div
      ref={shapeRef}
      className={`absolute pointer-events-none`}
      style={{ width: size, height: size }}
    >
      {type === 'sphere' && (
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${colorClass} blur-2xl`} />
      )}
      {type === 'ring' && (
        <div className={`w-full h-full rounded-full border-8 border-${color}-accent/20 blur-xl`} />
      )}
      {type === 'blob' && (
        <div 
          className={`w-full h-full bg-gradient-to-br ${colorClass} blur-2xl`}
          style={{ borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%' }}
        />
      )}
    </div>
  );
};

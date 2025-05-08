
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

interface ParticleBackgroundProps {
  colors: string[];
  primaryColor: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ colors, primaryColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize canvas size
    setCanvasSize();
    
    // Update canvas size on window resize
    window.addEventListener("resize", setCanvasSize);

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        // Use either a color from the provided array or the primary color
        const color = colors.length > 0 ? colors[Math.floor(Math.random() * colors.length)] : primaryColor;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 2,
          color,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
        });
      }

      particlesRef.current = particles;
    };

    createParticles();

    // Animation function
    const animate = () => {
      // Clear canvas with a fully transparent background for cleaner trails
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off walls
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.speedY *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + "80"; // Add transparency
        ctx.fill();
      });

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [colors, primaryColor]);

  // Re-create particles when colors change
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        // Use either a color from the provided array or the primary color
        const color = colors.length > 0 ? colors[Math.floor(Math.random() * colors.length)] : primaryColor;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 2,
          color,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
        });
      }

      particlesRef.current = particles;
    }
  }, [colors, primaryColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ 
        pointerEvents: "none", 
        position: "fixed", 
        zIndex: -1 
      }}
    />
  );
};

export default ParticleBackground;

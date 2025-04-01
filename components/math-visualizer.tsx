"use client";
import { useEffect, useRef, useState } from "react";

export default function Spirograph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [R, setR] = useState(240); // Outer radius
  const [r, setr] = useState(100); // Inner radius (1:2 ratio)
  const [d, setd] = useState(80); // Pen offset
  const [opacity, setOpacity] = useState(70); // More visible lines
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    let time = 0;
    let animationId: number;
    const speed = 0.01;
    const trailLength = 2000;
    const trail: { x: number; y: number }[] = [];

    const getColor = (alpha: number) => {
      const adjustedAlpha = Math.min(1, alpha * 1.5) * (opacity / 100);
      return `rgba(255, 255, 255, ${adjustedAlpha})`;
    };

    const drawTrail = (trail: { x: number; y: number }[]) => {
      ctx.beginPath();
      for (let i = 0; i < trail.length - 1; i++) {
        const pt = trail[i];
        const next = trail[i + 1];
        ctx.strokeStyle = getColor(i / trailLength);
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(next.x, next.y);
      }
      ctx.stroke();
    };

    const drawPoint = (x: number, y: number, radius = 6) => {
      ctx.beginPath();
      ctx.fillStyle = getColor(1);
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      time += speed * (1000 / 60) * 0.5;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const theta = time % (Math.PI * 20);
      const x =
        centerX +
        (R - r) * Math.cos(theta) +
        d * Math.cos(((R - r) * theta) / r);
      const y =
        centerY +
        (R - r) * Math.sin(theta) -
        d * Math.sin(((R - r) * theta) / r);

      trail.push({ x, y });
      if (trail.length > trailLength) trail.shift();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 0;
      ctx.shadowColor = `rgba(255,255,255,${opacity / 200})`;

      drawTrail(trail);
      drawPoint(x, y);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, [R, r, d, opacity]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        menuOpen &&
        !target.closest(".menu-panel") &&
        !target.closest(".toggle-button")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 10 && value <= 300) {
      setR(value);
    }
  };

  const handleLittleRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 5 && value <= 150) {
      setr(value);
    }
  };

  const handleDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 5 && value <= 500) {
      setd(value);
    }
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setOpacity(value);
    }
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full bg-black z-0"
      />

      <button
        onClick={toggleMenu}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black/80 p-2 rounded-r-lg h-14 w-10 flex items-center justify-center hover:bg-black/90 transition-colors duration-200 toggle-button"
        style={{ left: menuOpen ? "272px" : "0" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${
            menuOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`fixed md:top-1/3 top-1/2 left-0 z-10 p-4 bg-black/80 text-white rounded-r-xl space-y-4 w-64 md:w-72 transition-transform duration-200 ease-in-out menu-panel ${
          menuOpen ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <div className="text-center mb-2 font-semibold">
          Spirograph Controls
        </div>

        <div className="bg-black/40 p-3 rounded-lg">
          <label className="block text-sm mb-1 font-medium">
            R (Outer Radius): 10-300
          </label>
          <input
            type="number"
            min="10"
            max="300"
            value={R}
            onChange={handleRChange}
            className="w-full bg-gray-800 rounded p-2 text-white"
          />
        </div>

        <div className="bg-black/40 p-3 rounded-lg">
          <label className="block text-sm mb-1 font-medium">
            r (Inner Radius): 5-150
          </label>
          <input
            type="number"
            min="5"
            max="150"
            value={r}
            onChange={handleLittleRChange}
            className="w-full bg-gray-800 rounded p-2 text-white"
          />
        </div>

        <div className="bg-black/40 p-3 rounded-lg">
          <label className="block text-sm mb-1 font-medium">
            d (Pen Offset): 5-500
          </label>
          <input
            type="number"
            min="5"
            max="500"
            value={d}
            onChange={handleDChange}
            className="w-full bg-gray-800 rounded p-2 text-white"
          />
        </div>

        <div className="bg-black/40 p-3 rounded-lg">
          <label className="block text-sm mb-1 font-medium">
            Opacity: 1-100%
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={opacity}
            onChange={handleOpacityChange}
            className="w-full bg-gray-800 rounded p-2 text-white"
          />
        </div>

        <div className="text-xs text-gray-400 text-center mt-2">
          Enter values to create beautiful patterns
        </div>
      </div>
    </div>
  );
}

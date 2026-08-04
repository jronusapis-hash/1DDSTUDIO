"use client";

import React, { useEffect, useRef } from "react";

export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationId = 0;
    const particles = Array.from({ length: 140 }, (_, index) => {
      const phi = Math.acos(1 - (2 * (index + 0.5)) / 140);
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      return { x: Math.cos(theta) * Math.sin(phi), y: Math.cos(phi), z: Math.sin(theta) * Math.sin(phi) };
    });

    const resize = () => {
      const size = Math.max(240, canvas.clientWidth);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * ratio;
      canvas.height = size * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const size = canvas.clientWidth;
      const center = size / 2;
      const radius = size * 0.38;
      context.clearRect(0, 0, size, size);
      const rotation = frame * 0.003;

      particles
        .map((point) => {
          const x = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
          const z = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
          return { x, y: point.y, z };
        })
        .sort((a, b) => a.z - b.z)
        .forEach((point) => {
          const depth = (point.z + 1) / 2;
          const dot = 1.1 + depth * 2.4;
          context.beginPath();
          context.arc(center + point.x * radius, center + point.y * radius, dot, 0, Math.PI * 2);
          context.fillStyle = `rgba(244, 210, 122, ${0.18 + depth * 0.72})`;
          context.fill();
        });

      frame += 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="size-full" aria-hidden="true" />;
}

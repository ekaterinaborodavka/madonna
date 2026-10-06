import React, { useEffect, useRef } from "react";

interface MarqueeCanvasProps {
  text?: string;
  repeat?: number;
}

const Marquee: React.FC<MarqueeCanvasProps> = ({
  text = "MADONNA ",
  repeat = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 55;
    const speed = 50;
    const height = fontSize * 1.2;
    const repeatedText = Array.from({ length: repeat })
      .map(() => text)
      .join('');
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let textWidth = 0;
    let previousTimestamp: number | null = null;

    const resize = () => {
      width = canvas.parentElement?.clientWidth || 800;
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.font = `${fontSize}px Roboto, sans-serif`;
      textWidth = ctx.measureText(repeatedText).width;
      offsetRef.current %= textWidth || 1;
    };

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "black";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      let x = -offsetRef.current;

      while (textWidth > 0 && x < width) {
        ctx.strokeText(repeatedText, x, fontSize);
        ctx.fillText(repeatedText, x, fontSize);
        x += textWidth;
      }

      const elapsed = previousTimestamp === null ? 0 : timestamp - previousTimestamp;
      previousTimestamp = timestamp;
      offsetRef.current = (offsetRef.current + (speed * Math.min(elapsed, 100)) / 1000) % (textWidth || 1);

      requestRef.current = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "black";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      let x = 0;

      while (textWidth > 0 && x < width) {
        ctx.strokeText(repeatedText, x, fontSize);
        ctx.fillText(repeatedText, x, fontSize);
        x += textWidth;
      }
    };

    const render = () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
      previousTimestamp = null;
      resize();
      if (reducedMotion.matches) {
        drawStatic();
      } else {
        requestRef.current = requestAnimationFrame(draw);
      }
    };

    const observer = new ResizeObserver(render);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    reducedMotion.addEventListener("change", render);
    render();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", render);
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, [text, repeat]);

  return <canvas ref={canvasRef} style={{ display: "block", background: "#000", width: "100%" }} />;
};

export default Marquee;

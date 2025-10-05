import React, { useRef, useEffect } from 'react';

interface MarqueeCanvasProps {
  text?: string;
  repeat?: number;
}

const Marquee: React.FC<MarqueeCanvasProps> = ({
  text = 'MADONNA ',
  repeat = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 55;
    const speed = 50;

    const width = canvas.parentElement?.clientWidth || 800;
    const height = fontSize * 1.2;

    canvas.width = width;
    canvas.height = height;

    const repeatedText = Array.from({ length: repeat })
      .map(() => text)
      .join('');
 
    ctx.font = `${fontSize}px 'Roboto', sans-serif`;
    ctx.lineWidth = 2;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'black';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      const textWidth = ctx.measureText(repeatedText).width;
      let x = -offsetRef.current;

      while (x < width) {
        ctx.strokeText(repeatedText, x, fontSize);
        ctx.fillText(repeatedText, x, fontSize);
        x += textWidth;
      }

      offsetRef.current += speed / 60;
      if (offsetRef.current > textWidth) offsetRef.current = 0;

      requestRef.current = requestAnimationFrame(draw);
    };

    requestRef.current = requestAnimationFrame(draw);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [text, repeat]);

  return <canvas ref={canvasRef} style={{ display: 'block', background: '#000', width: '100%' }} />;
};

export default Marquee;

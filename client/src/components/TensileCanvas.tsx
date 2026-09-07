import { useEffect, useRef } from "react";

interface Vertex {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  vx: number;
  vy: number;
}

export function TensileCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const COLS = 14;
    const ROWS = 10;
    const verts: Vertex[][] = [];

    // Init grid
    for (let r = 0; r < ROWS; r++) {
      verts[r] = [];
      for (let c = 0; c < COLS; c++) {
        const x = (c / (COLS - 1)) * W;
        const y = (r / (ROWS - 1)) * H;
        // Tensile sag curve
        const sag = Math.sin((c / (COLS - 1)) * Math.PI) * 60 + Math.sin((r / (ROWS - 1)) * Math.PI) * 40;
        const z = sag;
        verts[r][c] = { x, y: y - sag * 0.35, z, ox: x, oy: y - sag * 0.35, oz: z, vx: 0, vy: 0 };
      }
    }

    let t = 0;
    let mouseX = W / 2;
    let mouseY = H / 2;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMove);

    const project = (v: Vertex) => {
      const fov = 500;
      const z = v.z + 300;
      const scale = fov / z;
      return { sx: v.x * scale + W * (1 - scale) / 2, sy: v.y * scale + H * (1 - scale) / 2 };
    };

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      // Animate verts with wave
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const v = verts[r][c];
          const wave = Math.sin(t + c * 0.5 + r * 0.3) * 8 + Math.cos(t * 0.7 + r * 0.4) * 6;
          // Mouse influence
          const dx = mouseX - v.ox;
          const dy = mouseY - v.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 220) * 28;
          v.y = v.oy + wave - influence;
          v.z = v.oz + wave * 0.6;
        }
      }

      // Draw horizontal cables
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const p0 = project(verts[r][c]);
          const p1 = project(verts[r][c + 1]);
          const alpha = r === 0 || r === ROWS - 1 ? 0.55 : 0.18 + (r / ROWS) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p0.sx, p0.sy);
          ctx.lineTo(p1.sx, p1.sy);
          ctx.strokeStyle = `rgba(45,106,104,${alpha})`;
          ctx.lineWidth = r === 0 || r === ROWS - 1 ? 1.8 : 0.9;
          ctx.stroke();
        }
      }

      // Draw vertical cables
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 1; r++) {
          const p0 = project(verts[r][c]);
          const p1 = project(verts[r + 1][c]);
          const alpha = c === 0 || c === COLS - 1 ? 0.55 : 0.12 + (c / COLS) * 0.1;
          ctx.beginPath();
          ctx.moveTo(p0.sx, p0.sy);
          ctx.lineTo(p1.sx, p1.sy);
          ctx.strokeStyle = `rgba(45,106,104,${alpha})`;
          ctx.lineWidth = c === 0 || c === COLS - 1 ? 1.8 : 0.8;
          ctx.stroke();
        }
      }

      // Draw nodes at corners and intersections
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (r % 2 === 0 && c % 2 === 0) {
            const p = project(verts[r][c]);
            const isAnchor = (r === 0 || r === ROWS - 1) && (c === 0 || c === COLS - 1 || c === Math.floor(COLS / 2));
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, isAnchor ? 4 : 2.5, 0, Math.PI * 2);
            ctx.fillStyle = isAnchor ? "rgba(45,106,104,0.9)" : "rgba(45,106,104,0.35)";
            ctx.fill();
            if (isAnchor) {
              ctx.beginPath();
              ctx.arc(p.sx, p.sy, 7, 0, Math.PI * 2);
              ctx.strokeStyle = "rgba(45,106,104,0.3)";
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="tensile-canvas"
      aria-hidden="true"
    />
  );
}

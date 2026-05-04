import { useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";

const TUNNEL_SIZE = 1000;
const TUNNEL_DEPTH = 4000;
const RIPPLE_RADIUS = 130;
const TILT_DEG = 4;
const TILT_DAMP = 0.06;
const REMEASURE_EVERY = 4;

export function DSSBackground({ className }) {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const tunnelRef = useRef(null);
  const cellsRef = useRef([]);

  const wallBaseStyle = {
    backgroundImage: `linear-gradient(to right, ${theme.grid} 2px, transparent 2px), linear-gradient(to bottom, ${theme.grid} 2px, transparent 2px)`,
    backgroundSize: "100px 100px",
    backgroundColor: "rgba(255, 255, 255, 0.01)",
  };

  const measureCells = () => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll(".dss-cell");
    const arr = cellsRef.current;
    if (arr.length !== nodes.length) {
      cellsRef.current = Array.from(nodes).map((el) => {
        const r = el.getBoundingClientRect();
        return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });
      return;
    }
    for (let i = 0; i < nodes.length; i++) {
      const r = nodes[i].getBoundingClientRect();
      arr[i].cx = r.left + r.width / 2;
      arr[i].cy = r.top + r.height / 2;
    }
  };

  useLayoutEffect(() => {
    measureCells();
    window.addEventListener("resize", measureCells);
    return () => window.removeEventListener("resize", measureCells);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let raf;
    let frame = 0;
    let mx = -9999;
    let my = -9999;
    let targetRX = 0;
    let targetRY = 0;
    let curRX = 0;
    let curRY = 0;
    const active = new Set();
    const primary = theme.accent;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetRY = nx * TILT_DEG * 2;
      targetRX = -ny * TILT_DEG * 2;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      frame++;

      curRX += (targetRX - curRX) * TILT_DAMP;
      curRY += (targetRY - curRY) * TILT_DAMP;
      if (tunnelRef.current) {
        tunnelRef.current.style.transform = `rotateX(${curRX.toFixed(2)}deg) rotateY(${curRY.toFixed(2)}deg)`;
      }

      if (frame % REMEASURE_EVERY === 0) measureCells();

      const next = new Set();
      const cells = cellsRef.current;
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const dx = c.cx - mx;
        const dy = c.cy - my;
        const d = Math.hypot(dx, dy);
        if (d < RIPPLE_RADIUS) {
          next.add(i);
          const intensity = 1 - d / RIPPLE_RADIUS;
          const alpha = Math.round(intensity * 180)
            .toString(16)
            .padStart(2, "0");
          c.el.style.backgroundColor = `${primary}${alpha}`;
          c.el.style.boxShadow = `0 0 ${20 * intensity}px ${primary}`;
        }
      }
      for (const i of active) {
        if (!next.has(i)) {
          const c = cells[i];
          c.el.style.backgroundColor = "";
          c.el.style.boxShadow = "";
        }
      }
      active.clear();
      next.forEach((i) => active.add(i));
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [theme.accent]);

  const renderCells = (width, height) => {
    const cols = width / 100;
    const rows = height / 100;
    return (
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          transformStyle: "preserve-3d",
        }}
      >
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div
            key={i}
            className="dss-cell transition-colors duration-150 ease-out"
          />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-0 overflow-hidden bg-black",
        className
      )}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "600px" }}
      >
        <div
          ref={tunnelRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              ...wallBaseStyle,
              width: TUNNEL_SIZE,
              height: TUNNEL_DEPTH,
              transform: `translate(-50%, -50%) rotateX(-90deg) translateZ(${TUNNEL_SIZE / 2}px)`,
            }}
          >
            {renderCells(TUNNEL_SIZE, TUNNEL_DEPTH)}
          </div>
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              ...wallBaseStyle,
              width: TUNNEL_SIZE,
              height: TUNNEL_DEPTH,
              transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${TUNNEL_SIZE / 2}px)`,
            }}
          >
            {renderCells(TUNNEL_SIZE, TUNNEL_DEPTH)}
          </div>
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              ...wallBaseStyle,
              width: TUNNEL_DEPTH,
              height: TUNNEL_SIZE,
              transform: `translate(-50%, -50%) rotateY(-90deg) translateZ(${TUNNEL_SIZE / 2}px)`,
            }}
          >
            {renderCells(TUNNEL_DEPTH, TUNNEL_SIZE)}
          </div>
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              ...wallBaseStyle,
              width: TUNNEL_DEPTH,
              height: TUNNEL_SIZE,
              transform: `translate(-50%, -50%) rotateY(90deg) translateZ(${TUNNEL_SIZE / 2}px)`,
            }}
          >
            {renderCells(TUNNEL_DEPTH, TUNNEL_SIZE)}
          </div>
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              ...wallBaseStyle,
              width: TUNNEL_SIZE,
              height: TUNNEL_SIZE,
              transform: `translate(-50%, -50%) translateZ(-${TUNNEL_DEPTH / 2}px)`,
            }}
          >
            {renderCells(TUNNEL_SIZE, TUNNEL_SIZE)}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />
    </div>
  );
}

import React, { useRef, useEffect, useState } from 'react';
import { RotateCw, Eye, Box, Sun, Moon, Maximize2, RefreshCw } from 'lucide-react';

export default function Landmark3DViewer({ attraction, country }) {
  const canvasRef = useRef(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingMode, setLightingMode] = useState('dusk'); // 'day' | 'dusk' | 'night'
  const [rotation, setRotation] = useState({ x: 0.35, y: 0.5 });
  const [zoom, setZoom] = useState(1);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Landmark geometry shape resolution based on name/category
  const shapeType = (() => {
    const text = `${attraction?.name || ''} ${attraction?.category || ''}`.toLowerCase();
    if (text.includes('fuji') || text.includes('mountain') || text.includes('peak') || text.includes('volcano')) return 'mountain';
    if (text.includes('taj') || text.includes('palace') || text.includes('dome') || text.includes('basilica')) return 'dome_palace';
    if (text.includes('tower') || text.includes('eiffel') || text.includes('spire') || text.includes('minaret')) return 'tower';
    if (text.includes('colosseum') || text.includes('amphitheater') || text.includes('arena') || text.includes('stadium')) return 'amphitheater';
    if (text.includes('temple') || text.includes('pagoda') || text.includes('shrine') || text.includes('torii')) return 'pagoda';
    return 'monument';
  })();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let angle = rotation.y;

    const render = () => {
      if (autoRotate) {
        angle += 0.008;
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background ambient gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width / 2);
      if (lightingMode === 'day') {
        bgGrad.addColorStop(0, '#1e293b');
        bgGrad.addColorStop(1, '#020617');
      } else if (lightingMode === 'dusk') {
        bgGrad.addColorStop(0, '#2e1065');
        bgGrad.addColorStop(0.5, '#1e1b4b');
        bgGrad.addColorStop(1, '#030712');
      } else {
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(1, '#020617');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 3D coordinate transformation helper
      const cx = width / 2;
      const cy = height / 2 + 30;
      const scale = 110 * zoom;

      const project = (x, y, z) => {
        // Rotate around Y
        const cosY = Math.cos(angle);
        const sinY = Math.sin(angle);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate around X
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.y * 0.1 + 0.35);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const distance = 4;
        const fov = distance / (distance + z2 * 0.4);
        return {
          px: cx + x1 * scale * fov,
          py: cy - y2 * scale * fov,
          depth: z2
        };
      };

      // Draw Base Pedestal Grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;
      const gridSize = 4;
      for (let i = -gridSize; i <= gridSize; i++) {
        const p1 = project(i * 0.35, -0.6, -gridSize * 0.35);
        const p2 = project(i * 0.35, -0.6, gridSize * 0.35);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        const p3 = project(-gridSize * 0.35, -0.6, i * 0.35);
        const p4 = project(gridSize * 0.35, -0.6, i * 0.35);
        ctx.beginPath();
        ctx.moveTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // Procedural 3D Vertices & Faces by Landmark Shape
      const drawShape = () => {
        if (shapeType === 'mountain') {
          // Conical Stratovolcano with Snow Cap (Mount Fuji)
          const steps = 18;
          const layers = [
            { y: -0.6, r: 1.5, color: '#334155' },
            { y: -0.1, r: 1.0, color: '#475569' },
            { y: 0.4, r: 0.6, color: '#94a3b8' },
            { y: 0.8, r: 0.35, color: '#e2e8f0' }, // Snow Cap
            { y: 0.95, r: 0.22, color: '#ffffff' }  // Summit Crater
          ];

          for (let l = 0; l < layers.length - 1; l++) {
            const curr = layers[l];
            const next = layers[l + 1];
            for (let i = 0; i < steps; i++) {
              const theta1 = (i / steps) * Math.PI * 2;
              const theta2 = ((i + 1) / steps) * Math.PI * 2;

              const v1 = project(Math.cos(theta1) * curr.r, curr.y, Math.sin(theta1) * curr.r);
              const v2 = project(Math.cos(theta2) * curr.r, curr.y, Math.sin(theta2) * curr.r);
              const v3 = project(Math.cos(theta2) * next.r, next.y, Math.sin(theta2) * next.r);
              const v4 = project(Math.cos(theta1) * next.r, next.y, Math.sin(theta1) * next.r);

              ctx.beginPath();
              ctx.moveTo(v1.px, v1.py);
              ctx.lineTo(v2.px, v2.py);
              ctx.lineTo(v3.px, v3.py);
              ctx.lineTo(v4.px, v4.py);
              ctx.closePath();

              if (isWireframe) {
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 1;
                ctx.stroke();
              } else {
                ctx.fillStyle = curr.color;
                ctx.fill();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.stroke();
              }
            }
          }
        } else if (shapeType === 'dome_palace') {
          // Palace Base + Central Bulbous Dome + 4 Corner Minarets (Taj Mahal Style)
          // 1. Central Cube Base
          const h = 0.5;
          const w = 0.7;
          // Draw Dome
          const domeSteps = 16;
          for (let lat = 0; lat < 6; lat++) {
            const phi1 = (lat / 6) * (Math.PI / 2);
            const phi2 = ((lat + 1) / 6) * (Math.PI / 2);
            for (let lon = 0; lon < domeSteps; lon++) {
              const th1 = (lon / domeSteps) * Math.PI * 2;
              const th2 = ((lon + 1) / domeSteps) * Math.PI * 2;
              const r1 = Math.cos(phi1) * 0.45;
              const r2 = Math.cos(phi2) * 0.45;
              const y1 = h + Math.sin(phi1) * 0.55;
              const y2 = h + Math.sin(phi2) * 0.55;

              const p1 = project(Math.cos(th1) * r1, y1, Math.sin(th1) * r1);
              const p2 = project(Math.cos(th2) * r1, y1, Math.sin(th2) * r1);
              const p3 = project(Math.cos(th2) * r2, y2, Math.sin(th2) * r2);
              const p4 = project(Math.cos(th1) * r2, y2, Math.sin(th1) * r2);

              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.lineTo(p3.px, p3.py);
              ctx.lineTo(p4.px, p4.py);
              ctx.closePath();
              ctx.fillStyle = isWireframe ? 'transparent' : '#f8fafc';
              if (!isWireframe) ctx.fill();
              ctx.strokeStyle = isWireframe ? '#38bdf8' : 'rgba(99, 102, 241, 0.4)';
              ctx.stroke();
            }
          }
        } else {
          // Tower / Pagoda Spire
          const levels = 5;
          for (let lvl = 0; lvl < levels; lvl++) {
            const baseW = 1.0 - lvl * 0.16;
            const yBase = -0.6 + lvl * 0.32;
            const topW = baseW * 0.75;
            const yTop = yBase + 0.28;

            const corners = [
              [-baseW, baseW], [baseW, baseW], [baseW, -baseW], [-baseW, -baseW]
            ];
            const topCorners = [
              [-topW, topW], [topW, topW], [topW, -topW], [-topW, -topW]
            ];

            for (let c = 0; c < 4; c++) {
              const cNext = (c + 1) % 4;
              const p1 = project(corners[c][0], yBase, corners[c][1]);
              const p2 = project(corners[cNext][0], yBase, corners[cNext][1]);
              const p3 = project(topCorners[cNext][0], yTop, topCorners[cNext][1]);
              const p4 = project(topCorners[c][0], yTop, topCorners[c][1]);

              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.lineTo(p3.px, p3.py);
              ctx.lineTo(p4.px, p4.py);
              ctx.closePath();

              ctx.fillStyle = isWireframe ? 'transparent' : (lvl % 2 === 0 ? '#3b82f6' : '#6366f1');
              if (!isWireframe) ctx.fill();
              ctx.strokeStyle = isWireframe ? '#38bdf8' : 'rgba(255, 255, 255, 0.25)';
              ctx.stroke();
            }
          }
        }
      };

      drawShape();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rotation, isWireframe, autoRotate, lightingMode, zoom, shapeType]);

  // Mouse drag handler for manual 3D rotation
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    setRotation(prev => ({
      x: Math.max(-0.8, Math.min(1.2, prev.x + dy * 0.01)),
      y: prev.y + dx * 0.01
    }));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleResetCamera = () => {
    setRotation({ x: 0.35, y: 0.5 });
    setZoom(1);
    setAutoRotate(true);
  };

  return (
    <div className="landmark-3d-inspector-wrapper animate-fade-in" id="landmark-3d-model-inspector">
      {/* 3D Inspector Top Control Bar */}
      <div className="inspector-controls-bar">
        <div className="inspector-badge">
          <Box size={14} className="text-cyan" />
          <span>Interactive 3D Architectural Model</span>
        </div>

        <div className="inspector-btn-cluster">
          <button
            type="button"
            className={`ctrl-icon-btn ${isWireframe ? 'active' : ''}`}
            onClick={() => setIsWireframe(!isWireframe)}
            title="Toggle Wireframe Blueprint"
            id="btn-3d-wireframe"
          >
            <span>{isWireframe ? 'Shaded' : 'Wireframe'}</span>
          </button>

          <button
            type="button"
            className={`ctrl-icon-btn ${autoRotate ? 'active' : ''}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto Orbit"
            id="btn-3d-autorotate"
          >
            <RotateCw size={13} className={autoRotate ? 'spin-anim' : ''} />
            <span>Orbit</span>
          </button>

          <button
            type="button"
            className="ctrl-icon-btn"
            onClick={() => setLightingMode(prev => prev === 'day' ? 'dusk' : prev === 'dusk' ? 'night' : 'day')}
            title="Toggle Day/Dusk/Night Lighting"
            id="btn-3d-lighting"
          >
            {lightingMode === 'day' ? <Sun size={13} className="text-gold" /> : <Moon size={13} className="text-purple" />}
            <span>{lightingMode.toUpperCase()}</span>
          </button>

          <button
            type="button"
            className="ctrl-icon-btn"
            onClick={handleResetCamera}
            title="Reset Camera View"
            id="btn-3d-reset"
          >
            <RefreshCw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div 
        className="canvas-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas 
          ref={canvasRef} 
          width={720} 
          height={380} 
          className="webgl-3d-canvas"
        />

        {/* Drag to inspect hint */}
        <div className="canvas-interactive-overlay">
          <span>Click & Drag to Rotate in 3D • Scroll to Zoom</span>
        </div>
      </div>

      {/* Model Specifications Footer Bar */}
      <div className="model-specs-footer">
        <div className="model-spec-item">
          <span className="ms-label">Archetype:</span>
          <span className="ms-val">{shapeType.toUpperCase().replace('_', ' ')}</span>
        </div>
        <div className="model-spec-item">
          <span className="ms-label">Render Engine:</span>
          <span className="ms-val">TerraVoyage WebGL Canvas 3D</span>
        </div>
        <div className="model-spec-item">
          <span className="ms-label">Coordinate Frame:</span>
          <span className="ms-val">Cartesian XYZ Isometric</span>
        </div>
      </div>

      <style>{`
        .landmark-3d-inspector-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.3);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        }
        .inspector-controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: rgba(30, 41, 59, 0.6);
          border-bottom: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .inspector-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.80rem;
          font-weight: 700;
          color: #ffffff;
        }
        .inspector-btn-cluster {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .ctrl-icon-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .ctrl-icon-btn:hover {
          color: var(--text-primary);
          border-color: #38bdf8;
        }
        .ctrl-icon-btn.active {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38bdf8;
          color: #38bdf8;
        }
        .spin-anim {
          animation: spin 4s linear infinite;
        }
        .canvas-container {
          position: relative;
          width: 100%;
          height: 380px;
          cursor: grab;
          overflow: hidden;
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .canvas-container:active {
          cursor: grabbing;
        }
        .webgl-3d-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        .canvas-interactive-overlay {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(6px);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          font-size: 0.70rem;
          font-weight: 600;
          pointer-events: none;
        }
        .model-specs-footer {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0.6rem 1rem;
          background: rgba(30, 41, 59, 0.4);
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .model-spec-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
        }
        .ms-label {
          color: var(--text-muted);
        }
        .ms-val {
          color: #38bdf8;
          font-weight: 700;
          font-family: var(--font-mono);
        }
      `}</style>
    </div>
  );
}

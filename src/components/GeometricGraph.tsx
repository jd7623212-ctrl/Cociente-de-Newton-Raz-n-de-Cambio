import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Compass, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { PRESET_FUNCTIONS, calculateSlopeComparison } from '../utils/math.ts';

interface GeometricGraphProps {
  onStepFocus?: (stepNumber: number) => void;
}

export function GeometricGraph({ onStepFocus }: GeometricGraphProps) {
  const [selectedFuncId, setSelectedFuncId] = useState<string>('quadratic');
  const [xVal, setXVal] = useState<number>(1.5);
  const [hVal, setHVal] = useState<number>(1.8);
  const [showTangent, setShowTangent] = useState<boolean>(true);
  const [showDeltas, setShowDeltas] = useState<boolean>(true);
  const [isSimulatingLimit, setIsSimulatingLimit] = useState<boolean>(false);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  const animRef = useRef<number | null>(null);

  const activeFunc =
    PRESET_FUNCTIONS.find((f) => f.id === selectedFuncId) || PRESET_FUNCTIONS[0];

  const {
    fx,
    fxh,
    deltaY,
    deltaX,
    slopeSecant,
    slopeTangent,
    error,
  } = calculateSlopeComparison(activeFunc.fn, activeFunc.derivative, xVal, hVal);

  // SVG coordinate transformation system
  // Graph viewBox: 0 0 700 460
  // World bounds: x from -1 to 5, y from -1 to 10
  const width = 700;
  const height = 460;
  const padding = { top: 35, right: 35, bottom: 45, left: 55 };

  let xMin = -1;
  let xMax = 5;
  let yMin = -1;
  let yMax = 10;

  if (activeFunc.id === 'cubic') {
    xMin = -2.5;
    xMax = 3.5;
    yMin = -3;
    yMax = 7;
  } else if (activeFunc.id === 'sin') {
    xMin = -0.5;
    xMax = 6.5;
    yMin = -0.5;
    yMax = 5.5;
  } else if (activeFunc.id === 'sqrt') {
    xMin = -0.5;
    xMax = 6.5;
    yMin = -0.5;
    yMax = 6.5;
  }

  const toSvgX = (x: number) =>
    padding.left + ((x - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);

  const toSvgY = (y: number) =>
    height - padding.bottom - ((y - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);

  // Generate curve path
  const samples = 120;
  const step = (xMax - xMin) / samples;
  const points: [number, number][] = [];
  for (let i = 0; i <= samples; i++) {
    const curX = xMin + i * step;
    try {
      const curY = activeFunc.fn(curX);
      if (!isNaN(curY) && isFinite(curY) && curY >= yMin - 5 && curY <= yMax + 5) {
        points.push([toSvgX(curX), toSvgY(curY)]);
      }
    } catch {
      // Ignore singularity
    }
  }

  const curveD =
    points.length > 0
      ? `M ${points[0][0]} ${points[0][1]} ` +
        points.slice(1).map((p) => `L ${p[0]} ${p[1]}`).join(' ')
      : '';

  // Point P(x, f(x)) and Point Q(x+h, f(x+h))
  const px = toSvgX(xVal);
  const py = toSvgY(fx);
  const qx = toSvgX(xVal + hVal);
  const qy = toSvgY(fxh);

  // Extend secant line across graph
  const secantX1 = xMin - 1;
  const secantY1 = fx + slopeSecant * (secantX1 - xVal);
  const secantX2 = xMax + 1;
  const secantY2 = fx + slopeSecant * (secantX2 - xVal);

  const secantSvgP1 = { x: toSvgX(secantX1), y: toSvgY(secantY1) };
  const secantSvgP2 = { x: toSvgX(secantX2), y: toSvgY(secantY2) };

  // Extend tangent line across graph
  const tanX1 = xMin - 1;
  const tanY1 = fx + slopeTangent * (tanX1 - xVal);
  const tanX2 = xMax + 1;
  const tanY2 = fx + slopeTangent * (tanX2 - xVal);

  const tanSvgP1 = { x: toSvgX(tanX1), y: toSvgY(tanY1) };
  const tanSvgP2 = { x: toSvgX(tanX2), y: toSvgY(tanY2) };

  // Smooth animation for simulating limit h -> 0
  const startLimitSimulation = () => {
    if (isSimulatingLimit) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      setIsSimulatingLimit(false);
      return;
    }

    setIsSimulatingLimit(true);
    let currentH = hVal > 0.4 ? hVal : 2.0;
    setHVal(currentH);

    const animate = () => {
      currentH *= 0.96;
      if (currentH < 0.04) {
        currentH = 0.02;
        setHVal(currentH);
        setIsSimulatingLimit(false);
        setActiveStepTab(3);
        if (onStepFocus) onStepFocus(3);
      } else {
        setHVal(currentH);
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  const resetSimulation = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setIsSimulatingLimit(false);
    setHVal(activeFunc.defaultH);
    setXVal(activeFunc.defaultX);
    setActiveStepTab(1);
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Sync tabs with hVal changes
  useEffect(() => {
    if (hVal < 0.15) {
      setActiveStepTab(3);
    } else if (hVal < 0.9) {
      setActiveStepTab(2);
    } else {
      setActiveStepTab(1);
    }
  }, [hVal]);

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-2xl p-4 sm:p-6 backdrop-blur-md">
      {/* Header & Function Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Compass className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Simulador Interactivo: De la Secante a la Tangente
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mueve el deslizador <span className="font-mono text-cyan-300 font-bold">h</span> o presiona el botón de animación para ver a la secante convertirse en la tangente.
          </p>
        </div>

        {/* Function selection pill */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 px-2 font-medium">Función:</span>
          {PRESET_FUNCTIONS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setSelectedFuncId(f.id);
                setXVal(f.defaultX);
                setHVal(f.defaultH);
              }}
              className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all ${
                selectedFuncId === f.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {f.displayFormula}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph & Controls Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-5">
        {/* SVG Canvas (Left 8 cols) */}
        <div className="xl:col-span-8 flex flex-col items-center">
          <div className="relative w-full aspect-[700/460] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
            {/* SVG Visualizer */}
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-full select-none"
              role="img"
              aria-label="Gráfica interactiva de la secante a la tangente"
            >
              <defs>
                {/* Glow filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                {/* Arrow markers */}
                <marker
                  id="arrow-axis"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
                {/* Triangle fill pattern */}
                <linearGradient id="deltaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {Array.from({ length: Math.ceil(xMax - xMin) + 1 }).map((_, i) => {
                const xGrid = Math.floor(xMin) + i;
                if (xGrid < xMin || xGrid > xMax) return null;
                const sx = toSvgX(xGrid);
                return (
                  <g key={`xgrid-${xGrid}`}>
                    <line
                      x1={sx}
                      y1={padding.top}
                      x2={sx}
                      y2={height - padding.bottom}
                      stroke="#1e293b"
                      strokeDasharray="2 3"
                    />
                    <text
                      x={sx}
                      y={height - padding.bottom + 18}
                      fill="#64748b"
                      fontSize="11"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {xGrid}
                    </text>
                  </g>
                );
              })}

              {Array.from({ length: Math.ceil(yMax - yMin) + 1 }).map((_, i) => {
                const yGrid = Math.floor(yMin) + i * 2;
                if (yGrid < yMin || yGrid > yMax) return null;
                const sy = toSvgY(yGrid);
                return (
                  <g key={`ygrid-${yGrid}`}>
                    <line
                      x1={padding.left}
                      y1={sy}
                      x2={width - padding.right}
                      y2={sy}
                      stroke="#1e293b"
                      strokeDasharray="2 3"
                    />
                    <text
                      x={padding.left - 12}
                      y={sy + 4}
                      fill="#64748b"
                      fontSize="11"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {yGrid}
                    </text>
                  </g>
                );
              })}

              {/* Main Axes */}
              <line
                x1={toSvgX(xMin)}
                y1={toSvgY(0)}
                x2={toSvgX(xMax)}
                y2={toSvgY(0)}
                stroke="#475569"
                strokeWidth="1.5"
                markerEnd="url(#arrow-axis)"
              />
              <line
                x1={toSvgX(0)}
                y1={toSvgY(yMin)}
                x2={toSvgX(0)}
                y2={toSvgY(yMax)}
                stroke="#475569"
                strokeWidth="1.5"
                markerEnd="url(#arrow-axis)"
              />
              <text x={toSvgX(xMax) - 10} y={toSvgY(0) - 8} fill="#94a3b8" fontSize="12" fontWeight="bold">
                X
              </text>
              <text x={toSvgX(0) + 10} y={toSvgY(yMax) + 12} fill="#94a3b8" fontSize="12" fontWeight="bold">
                Y
              </text>

              {/* Difference Triangle (Δx = h, Δy = f(x+h) - f(x)) */}
              {showDeltas && Math.abs(hVal) > 0.05 && (
                <g>
                  {/* Triangle polygon */}
                  <polygon
                    points={`${px},${py} ${qx},${py} ${qx},${qy}`}
                    fill="url(#deltaGrad)"
                    stroke="#0284c7"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />

                  {/* Horizontal deltaX (h) bracket / line */}
                  <line
                    x1={px}
                    y1={py}
                    x2={qx}
                    y2={py}
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  <text
                    x={(px + qx) / 2}
                    y={py + 16}
                    fill="#38bdf8"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    h = {hVal.toFixed(2)}
                  </text>

                  {/* Vertical deltaY bracket / line */}
                  <line
                    x1={qx}
                    y1={py}
                    x2={qx}
                    y2={qy}
                    stroke="#a855f7"
                    strokeWidth="2.5"
                  />
                  <text
                    x={qx + 10}
                    y={(py + qy) / 2}
                    fill="#c084fc"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="start"
                    className="font-mono"
                  >
                    Δy = {deltaY.toFixed(2)}
                  </text>
                </g>
              )}

              {/* Function Curve */}
              <path
                d={curveD}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Tangent Line (Green / Emerald) */}
              {showTangent && (
                <line
                  x1={tanSvgP1.x}
                  y1={tanSvgP1.y}
                  x2={tanSvgP2.x}
                  y2={tanSvgP2.y}
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  opacity="0.85"
                />
              )}

              {/* Secant Line (Cyan / Blue) */}
              <line
                x1={secantSvgP1.x}
                y1={secantSvgP1.y}
                x2={secantSvgP2.x}
                y2={secantSvgP2.y}
                stroke="#38bdf8"
                strokeWidth={hVal < 0.15 ? '3' : '2.5'}
                filter="url(#glow)"
              />

              {/* Vertical guideline for x */}
              <line
                x1={px}
                y1={py}
                x2={px}
                y2={toSvgY(0)}
                stroke="#f59e0b"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.7"
              />
              {/* Vertical guideline for x + h */}
              <line
                x1={qx}
                y1={qy}
                x2={qx}
                y2={toSvgY(0)}
                stroke="#10b981"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.7"
              />

              {/* Point P(x, f(x)) */}
              <g className="cursor-pointer">
                <circle cx={px} cy={py} r="8" fill="#f59e0b" filter="url(#glow)" />
                <circle cx={px} cy={py} r="4" fill="#ffffff" />
                <rect
                  x={px - 50}
                  y={py - 30}
                  width="100"
                  height="22"
                  rx="6"
                  fill="#0f172a"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  opacity="0.9"
                />
                <text
                  x={px}
                  y={py - 16}
                  fill="#fcd34d"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  P({xVal.toFixed(1)}, {fx.toFixed(1)})
                </text>
              </g>

              {/* Point Q(x+h, f(x+h)) */}
              {Math.abs(hVal) > 0.05 && (
                <g className="cursor-pointer">
                  <circle cx={qx} cy={qy} r="8" fill="#38bdf8" filter="url(#glow)" />
                  <circle cx={qx} cy={qy} r="4" fill="#ffffff" />
                  <rect
                    x={qx - 55}
                    y={qy - 30}
                    width="110"
                    height="22"
                    rx="6"
                    fill="#0f172a"
                    stroke="#38bdf8"
                    strokeWidth="1"
                    opacity="0.9"
                  />
                  <text
                    x={qx}
                    y={qy - 16}
                    fill="#7dd3fc"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Q({(xVal + hVal).toFixed(1)}, {fxh.toFixed(1)})
                  </text>
                </g>
              )}
            </svg>

            {/* In-canvas Legend Pill */}
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs">
              <span className="flex items-center gap-1.5 text-indigo-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                {activeFunc.latex}
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" />
                Recta Secante
              </span>
              {showTangent && (
                <>
                  <span className="text-slate-600">|</span>
                  <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
                    <span className="w-2.5 h-0.5 border-t-2 border-dashed border-emerald-400 inline-block" />
                    Recta Tangente f&apos;(x)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Interactive Play & Control Bar */}
          <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={startLimitSimulation}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSimulatingLimit
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                }`}
              >
                {isSimulatingLimit ? (
                  <>
                    <Pause className="w-4 h-4" /> Pausar Simulación
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Simular Límite (h → 0)
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetSimulation}
                title="Reiniciar valores"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                aria-label="Reiniciar simulación"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTangent}
                  onChange={(e) => setShowTangent(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Mostrar Tangente</span>
              </label>

              <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDeltas}
                  onChange={(e) => setShowDeltas(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Triángulo Δx, Δy</span>
              </label>
            </div>
          </div>
        </div>

        {/* Sliders and Real-Time Math HUD (Right 4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Sliders Card */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Controles en Tiempo Real
            </h4>

            {/* Slider h */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-cyan-300 flex items-center gap-1">
                  <span>Incremento</span>
                  <span className="font-mono font-bold text-sm">h = {hVal.toFixed(2)}</span>
                </span>
                <span className="text-slate-500 text-[11px]">
                  {hVal < 0.1 ? '⚡ Casi cero (h → 0)' : 'Puntos separados'}
                </span>
              </div>
              <input
                type="range"
                min="0.02"
                max="2.5"
                step="0.02"
                value={hVal}
                onChange={(e) => {
                  if (isSimulatingLimit && animRef.current) {
                    cancelAnimationFrame(animRef.current);
                    setIsSimulatingLimit(false);
                  }
                  setHVal(parseFloat(e.target.value));
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>0.02 (Tangente)</span>
                <span>2.50 (Secante lejana)</span>
              </div>
            </div>

            {/* Slider x */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-amber-300 flex items-center gap-1">
                  <span>Punto Inicial</span>
                  <span className="font-mono font-bold text-sm">x = {xVal.toFixed(2)}</span>
                </span>
              </div>
              <input
                type="range"
                min={activeFunc.id === 'cubic' ? -1.5 : activeFunc.id === 'sqrt' ? 0.2 : 0}
                max={activeFunc.id === 'cubic' ? 2.2 : activeFunc.id === 'sin' ? 5 : 3.5}
                step="0.1"
                value={xVal}
                onChange={(e) => setXVal(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Comparison Box */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Comparación de Pendientes</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </h4>

            {/* Secant Slope */}
            <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-cyan-300 font-medium">Pendiente Secante (Promedio)</span>
                <span className="text-base font-mono font-bold text-cyan-200">
                  {slopeSecant.toFixed(3)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                m_sec = Δy / h = {deltaY.toFixed(2)} / {deltaX.toFixed(2)}
              </p>
            </div>

            {/* Tangent Slope */}
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-emerald-300 font-medium">Pendiente Tangente (Instantánea)</span>
                <span className="text-base font-mono font-bold text-emerald-200">
                  {slopeTangent.toFixed(3)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                f&apos;({xVal.toFixed(1)}) = {activeFunc.derivativeFormula}
              </p>
            </div>

            {/* Difference / Convergence */}
            <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-800/40">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-indigo-300 font-medium">Diferencia |Secante − Tangente|</span>
                <span className="text-sm font-mono font-bold text-indigo-200">
                  {error.toFixed(4)}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-150"
                  style={{
                    width: `${Math.max(0, Math.min(100, 100 - error * 40))}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Convergencia al límite:</span>
                <span className="text-emerald-400 font-semibold font-mono">
                  {Math.max(0, Math.min(100, 100 - error * 40)).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          {/* 3 Step Interactive Explanation Cards (From User Script) */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Guía de los 3 Pasos Geométricos
            </h4>

            {/* Step 1 */}
            <button
              type="button"
              onClick={() => {
                setHVal(1.8);
                setActiveStepTab(1);
              }}
              className={`text-left p-2.5 rounded-lg transition-all border ${
                activeStepTab === 1
                  ? 'bg-blue-900/40 border-blue-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400">Paso 1: La Secante</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 font-mono">
                  Razón Promedio
                </span>
              </div>
              <p className="text-[11px] mt-1 leading-snug">
                Dos puntos separados por una distancia <strong className="text-cyan-300">h</strong>. La recta secante corta la curva y su pendiente es el promedio.
              </p>
            </button>

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => {
                setHVal(0.5);
                setActiveStepTab(2);
              }}
              className={`text-left p-2.5 rounded-lg transition-all border ${
                activeStepTab === 2
                  ? 'bg-purple-900/40 border-purple-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400">Paso 2: El Truco de Newton</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono">
                  El Límite (h → 0)
                </span>
              </div>
              <p className="text-[11px] mt-1 leading-snug">
                Acercamos el punto Q hacia P. El valor de <strong className="text-purple-300">h</strong> se va haciendo cada vez más pequeño.
              </p>
            </button>

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => {
                setHVal(0.04);
                setActiveStepTab(3);
              }}
              className={`text-left p-2.5 rounded-lg transition-all border ${
                activeStepTab === 3
                  ? 'bg-emerald-900/40 border-emerald-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">Paso 3: La Tangente</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">
                  ¡La Derivada!
                </span>
              </div>
              <p className="text-[11px] mt-1 leading-snug">
                Cuando h roza cero, la secante se convierte en tangente en un solo punto exacto. Esa pendiente es la razón instantánea <strong className="text-emerald-300">f&apos;(x)</strong>.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

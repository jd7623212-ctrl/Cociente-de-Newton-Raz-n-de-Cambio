import React, { useState } from 'react';
import { Sigma, ChevronDown, ChevronUp, Sparkles, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

export function FormalMathConceptCard() {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div className="w-full max-w-4xl mt-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-indigo-500/40 shadow-xl overflow-hidden backdrop-blur-md">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 sm:p-5 bg-indigo-950/40 hover:bg-indigo-950/60 flex items-center justify-between text-left transition-colors border-b border-indigo-800/40"
      >
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Sigma className="w-5 h-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Definición Matemática Formal y Rigurosa
              </h3>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                Rigor Académico
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Formulación analítica exacta, condiciones de existencia y notaciones para responder con autoridad.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-indigo-300">
          <span className="hidden sm:inline font-medium">
            {expanded ? 'Plegar definición' : 'Ver rigor formal'}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
          {/* Definition 1: Difference Quotient */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                DEFINICIÓN 1
              </span>
              <h4 className="text-sm font-bold text-white">
                El Cociente de Diferencias (Cociente de Newton)
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sea <span className="font-mono text-cyan-300">f: I ⊆ ℝ → ℝ</span> una función real definida en un intervalo abierto <span className="font-mono text-cyan-300">I</span>. Para un punto dado <span className="font-mono text-amber-300 font-bold">x ∈ I</span> y un incremento no nulo <span className="font-mono text-cyan-300 font-bold">h ≠ 0</span> tal que <span className="font-mono text-slate-200">(x + h) ∈ I</span>, el <strong>cociente de Newton</strong> se define formalmente como:
            </p>

            <div className="my-3 p-3 rounded-xl bg-slate-900 border border-slate-700/60 text-center font-mono text-base sm:text-lg text-indigo-200">
              <span className="text-slate-400 mr-2">Q(h) =</span>
              <span className="fraction align-middle">
                <span className="numerator font-semibold">f(x + h) − f(x)</span>
                <span className="denominator font-bold text-cyan-300">h</span>
              </span>
              <span className="text-slate-400 mx-3">=</span>
              <span className="fraction align-middle text-emerald-300 font-bold">
                <span className="numerator">Δy</span>
                <span className="denominator">Δx</span>
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Representa la razón de cambio promedio en el intervalo cerrado <span className="font-mono">[x, x + h]</span> (o <span className="font-mono">[x + h, x]</span> si h &lt; 0) y coincide exactamente con la pendiente <span className="font-mono text-cyan-300">m_sec</span> de la recta secante.
            </p>
          </div>

          {/* Definition 2: The Derivative */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                DEFINICIÓN 2
              </span>
              <h4 className="text-sm font-bold text-white">
                La Derivada como Límite del Cociente de Newton
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              La <strong>derivada</strong> de la función <span className="font-mono text-cyan-300">f</span> en el punto <span className="font-mono text-amber-300 font-bold">x</span> es el valor del límite del cociente de Newton cuando el incremento <span className="font-mono text-cyan-300">h</span> tiende a cero:
            </p>

            <div className="my-3 p-3 rounded-xl bg-slate-900 border border-slate-700/60 text-center font-mono text-lg sm:text-xl text-emerald-300 font-bold">
              f&apos;(x) ={' '}
              <span className="text-slate-300 text-sm mr-1">lim (h → 0)</span>
              <span className="fraction align-middle text-indigo-200 text-base sm:text-lg">
                <span className="numerator">f(x + h) − f(x)</span>
                <span className="denominator text-cyan-300">h</span>
              </span>
            </div>

            {/* Condition of existence */}
            <div className="mt-3 p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-indigo-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Condición Fundamental de Existencia (Límites Laterales):</span>
              </div>
              <p>
                Para que la función sea diferenciable en <span className="font-mono text-amber-300">x</span>, el límite lateral por la derecha (<span className="font-mono">h → 0⁺</span>) y por la izquierda (<span className="font-mono">h → 0⁻</span>) deben ser idénticos y finitos:
              </p>
              <div className="font-mono text-center text-xs py-1 text-slate-200">
                lim (h → 0⁺) Q(h) = lim (h → 0⁻) Q(h) = L ∈ ℝ
              </div>
            </div>
          </div>

          {/* Historical Notations Grid */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Notaciones Matemáticas Oficiales en la Historia</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Lagrange (1797)
                </span>
                <span className="text-base font-mono font-bold text-emerald-300 block my-1">
                  f&apos;(x), y&apos;
                </span>
                <p className="text-[11px] text-slate-400 leading-tight">
                  La notación prima más cómoda para funciones de una sola variable.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Leibniz (1675)
                </span>
                <span className="text-base font-mono font-bold text-cyan-300 block my-1">
                  dy / dx
                </span>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Recuerda el cociente de diferenciales: cambio infinitesimal en y sobre x.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Newton (1665)
                </span>
                <span className="text-base font-mono font-bold text-amber-300 block my-1">
                  ẋ (x con punto)
                </span>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Fluxiones: velocidad de cambio continuo respecto al tiempo t.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Euler / Cauchy
                </span>
                <span className="text-base font-mono font-bold text-purple-300 block my-1">
                  D f(x), D_x y
                </span>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Notación de operador diferencial que trata a la derivada como transformación lineal.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Calculator,
  CheckCircle2,
  Sparkles,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getQuadraticProofSteps } from '../utils/math.ts';

export function AlgebraicWhiteboard() {
  const steps = getQuadraticProofSteps();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);
  const [testNumberX, setTestNumberX] = useState<number>(3);

  const currentStep = steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx === steps.length - 1) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Demonstration table with h values for testNumberX
  const hApproximations = [1.0, 0.5, 0.1, 0.01, 0.001].map((h) => {
    const fx = testNumberX * testNumberX;
    const fxh = (testNumberX + h) * (testNumberX + h);
    const quotient = (fxh - fx) / h;
    return { h, quotient };
  });
  const exactDerivative = 2 * testNumberX;

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-2xl p-4 sm:p-6 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Demostración Práctica Paso a Paso: f(x) = x²
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Resolución algebraica en vivo ideal para explicar y proyectar en el tablero de clase.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAllSteps(!showAllSteps)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              showAllSteps
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{showAllSteps ? 'Modo Guiado Paso a Paso' : 'Ver Todo el Tablero'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {!showAllSteps ? (
        /* Single Step Interactive View */
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Whiteboard Card (Left 8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-700 shadow-inner min-h-[380px] relative overflow-hidden">
            {/* Step Counter Pill */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                PASO {currentStep.stepNumber} DE {steps.length}
              </span>
              <span className="text-xs text-slate-400 font-mono">f(x) = x²</span>
            </div>

            {/* Current Step Title & Visual Formula */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.stepNumber}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center my-4 text-center"
              >
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  {currentStep.title}
                </h4>

                {/* Chalkboard Rendered Equation */}
                <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border-2 border-indigo-500/40 shadow-xl max-w-xl w-full flex items-center justify-center">
                  {renderStepVisualFormula(currentStep.stepNumber)}
                </div>

                {/* Step Explanation */}
                <p className="text-sm sm:text-base text-slate-200 mt-6 max-w-xl leading-relaxed">
                  {currentStep.explanation}
                </p>

                {currentStep.tipOrNote && (
                  <div className="mt-4 px-4 py-2 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300 max-w-lg">
                    💡 <strong>Tip para el tablero:</strong> {currentStep.tipOrNote}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 mt-4">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {steps.map((s, idx) => (
                  <button
                    key={s.stepNumber}
                    type="button"
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentStepIndex
                        ? 'w-7 bg-emerald-400'
                        : idx < currentStepIndex
                        ? 'w-2.5 bg-indigo-500'
                        : 'w-2.5 bg-slate-700'
                    }`}
                    aria-label={`Ir al paso ${s.stepNumber}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentStepIndex === steps.length - 1}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition-all"
              >
                {currentStepIndex === steps.length - 1 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Demostrado
                  </>
                ) : (
                  <>
                    Siguiente <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Mini Interactive Tester & Steps Overview */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Live Numeric Tester Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Prueba Numérica en Vivo
                </h4>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                Evalúa la fórmula final <span className="font-mono text-emerald-300 font-bold">f&apos;(x) = 2x</span> con cualquier número:
              </p>

              <div className="flex items-center gap-2 mb-3">
                <label htmlFor="test-x-input" className="text-xs text-slate-400">
                  Elige x:
                </label>
                <div className="flex items-center gap-1.5">
                  {[-2, 1, 3, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setTestNumberX(val)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-mono font-bold ${
                        testNumberX === val
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                  <input
                    id="test-x-input"
                    type="number"
                    value={testNumberX}
                    onChange={(e) => setTestNumberX(Number(e.target.value) || 0)}
                    className="w-14 px-2 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white text-center font-mono"
                  />
                </div>
              </div>

              {/* Result banner */}
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-center mb-3">
                <span className="text-xs text-emerald-400 font-medium">Pendiente Instantánea exacta:</span>
                <div className="text-xl font-bold font-mono text-white mt-0.5">
                  f&apos;({testNumberX}) = 2({testNumberX}) ={' '}
                  <span className="text-emerald-300">{exactDerivative}</span>
                </div>
              </div>

              {/* Table of h approaching 0 */}
              <div className="text-[11px] text-slate-400">
                <span className="font-medium text-slate-300">Aproximación con el cociente:</span>
                <div className="mt-1.5 space-y-1 font-mono">
                  {hApproximations.map((item) => (
                    <div
                      key={item.h}
                      className="flex justify-between items-center px-2 py-1 rounded bg-slate-900 border border-slate-800/60"
                    >
                      <span className="text-cyan-300">h = {item.h}</span>
                      <span className="text-slate-200">
                        Cociente = {item.quotient.toFixed(3)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step List Quick Navigation */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Índice de Pasos
              </h4>
              <div className="space-y-1.5">
                {steps.map((s, idx) => (
                  <button
                    key={s.stepNumber}
                    type="button"
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      idx === currentStepIndex
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span>
                      {s.stepNumber}. {s.title}
                    </span>
                    {idx === currentStepIndex && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Board Mode (All Steps simultaneously) */
        <div className="mt-5 space-y-3">
          {steps.map((s) => (
            <div
              key={s.stepNumber}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/80 shrink-0">
                  #{s.stepNumber}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">{s.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">{s.explanation}</p>
                  {s.tipOrNote && (
                    <span className="inline-block mt-1 text-[11px] text-indigo-300 font-mono">
                      💡 {s.tipOrNote}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60 shrink-0 text-center min-w-[200px]">
                {renderStepVisualFormula(s.stepNumber)}
              </div>
            </div>
          ))}

          {/* Conclusion Banner */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50 flex items-center gap-3">
            <Award className="w-6 h-6 text-emerald-400 shrink-0" />
            <p className="text-xs sm:text-sm text-emerald-200 leading-snug">
              <strong>Conclusión del ejercicio:</strong> &ldquo;La razón de cambio instantánea de la función x² en cualquier punto x es exactamente 2x. Por ejemplo, en x = 3 la pendiente es 6; en x = -1 es -2.&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to visually render each algebraic equation cleanly
function renderStepVisualFormula(stepNumber: number) {
  switch (stepNumber) {
    case 1:
      return (
        <div className="font-mono text-xl sm:text-2xl text-indigo-200 flex items-center justify-center">
          <span className="fraction text-center">
            <span className="numerator">f(x + h) − f(x)</span>
            <span className="denominator text-cyan-300">h</span>
          </span>
        </div>
      );
    case 2:
      return (
        <div className="font-mono text-xl sm:text-2xl text-indigo-200 flex items-center justify-center">
          <span className="fraction text-center">
            <span className="numerator">
              <span className="text-emerald-300">(x + h)²</span> −{' '}
              <span className="text-blue-300">x²</span>
            </span>
            <span className="denominator text-cyan-300">h</span>
          </span>
        </div>
      );
    case 3:
      return (
        <div className="font-mono text-xl sm:text-2xl text-indigo-200 flex items-center justify-center">
          <span className="fraction text-center">
            <span className="numerator">
              <span className="text-blue-300">x²</span> +{' '}
              <span className="text-amber-300 font-bold">2xh</span> +{' '}
              <span className="text-cyan-300">h²</span> −{' '}
              <span className="text-rose-300">x²</span>
            </span>
            <span className="denominator text-cyan-300">h</span>
          </span>
        </div>
      );
    case 4:
      return (
        <div className="font-mono text-xl sm:text-2xl text-indigo-200 flex items-center justify-center">
          <span className="fraction text-center">
            <span className="numerator">
              <span className="text-amber-300 font-bold">2xh</span> +{' '}
              <span className="text-cyan-300">h²</span>
            </span>
            <span className="denominator text-cyan-300">h</span>
          </span>
          <span className="text-xs text-rose-400 ml-3 italic">
            (x² − x² = 0)
          </span>
        </div>
      );
    case 5:
      return (
        <div className="font-mono text-xl sm:text-2xl text-indigo-200 flex items-center justify-center">
          <span className="fraction text-center">
            <span className="numerator">
              <span className="text-cyan-400 font-bold underline">h</span>(
              <span className="text-amber-300">2x</span> +{' '}
              <span className="text-cyan-300">h</span>)
            </span>
            <span className="denominator text-cyan-400 font-bold underline">h</span>
          </span>
        </div>
      );
    case 6:
      return (
        <div className="font-mono text-2xl sm:text-3xl text-emerald-300 flex items-center justify-center gap-2">
          <span>2x + h</span>
          <span className="text-xs text-slate-400 font-sans ml-2">
            (Cancelando h/h = 1)
          </span>
        </div>
      );
    case 7:
      return (
        <div className="font-mono text-xl sm:text-2xl text-emerald-300 flex items-center justify-center gap-2">
          <span className="text-slate-400 text-sm">lim (h→0)</span>
          <span>(2x + h) =</span>
          <span className="text-2xl sm:text-3xl font-bold text-white bg-emerald-600/30 px-3 py-1 rounded-lg border border-emerald-400">
            2x
          </span>
        </div>
      );
    default:
      return null;
  }
}

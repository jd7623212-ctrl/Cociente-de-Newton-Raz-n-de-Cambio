import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, HelpCircle } from 'lucide-react';

interface MathFormulaProps {
  interactive?: boolean;
}

type FormulaPart = 'all' | 'x' | 'h' | 'fx' | 'fxh' | 'numerator' | 'denominator';

export function MathFormula({ interactive = true }: MathFormulaProps) {
  const [activePart, setActivePart] = useState<FormulaPart>('all');

  const explanations: Record<
    FormulaPart,
    { title: string; color: string; desc: string; mathEquiv: string; icon: string }
  > = {
    all: {
      title: 'Cociente de Newton / Razón de Cambio',
      color: 'border-indigo-500/50 text-indigo-300 bg-indigo-950/30',
      desc: 'Mide la tasa de cambio promedio de la función f entre el punto x y el punto x + h. Representa exactamente la pendiente m = Δy / Δx de la recta secante.',
      mathEquiv: 'm = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}',
      icon: '📐',
    },
    x: {
      title: 'Variable x (Punto de Partida)',
      color: 'border-amber-500/50 text-amber-300 bg-amber-950/30',
      desc: 'Es el valor inicial o punto de referencia en el eje horizontal (abscisas) donde queremos estudiar el comportamiento o cambio de la curva.',
      mathEquiv: 'x \\in \\text{Dominio}',
      icon: '📍',
    },
    h: {
      title: 'Incremento h (o Δx)',
      color: 'border-cyan-500/50 text-cyan-300 bg-cyan-950/30',
      desc: 'Es un pequeño avance o paso horizontal añadido a x. Cuando aplicamos el cálculo diferencial, hacemos que h se acerque a cero (h → 0).',
      mathEquiv: 'h = \\Delta x = x_2 - x_1',
      icon: '⏩',
    },
    fx: {
      title: 'Altura Inicial f(x)',
      color: 'border-blue-500/50 text-blue-300 bg-blue-950/30',
      desc: 'Es la coordenada y (altura) de la función en el punto original x. Es el punto P(x, f(x)).',
      mathEquiv: 'y_1 = f(x)',
      icon: '🔹',
    },
    fxh: {
      title: 'Altura Final f(x + h)',
      color: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/30',
      desc: 'Es la nueva altura que alcanza la curva tras haber avanzado la distancia h en el eje horizontal. Es el punto Q(x+h, f(x+h)).',
      mathEquiv: 'y_2 = f(x + h)',
      icon: '🔺',
    },
    numerator: {
      title: 'Numerador: f(x + h) - f(x) (Cambio en y, Δy)',
      color: 'border-purple-500/50 text-purple-300 bg-purple-950/30',
      desc: 'Representa la variación vertical neta entre los dos puntos: cuánto subió o bajó la gráfica.',
      mathEquiv: '\\Delta y = f(x+h) - f(x)',
      icon: '↕️',
    },
    denominator: {
      title: 'Denominador: h (Cambio en x, Δx)',
      color: 'border-teal-500/50 text-teal-300 bg-teal-950/30',
      desc: 'Representa la distancia horizontal entre los dos puntos. Si h fuera 0 directamente, tendríamos una división indeterminada 0/0.',
      mathEquiv: '\\Delta x = h',
      icon: '↔️',
    },
  };

  const current = explanations[activePart];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Formula Display Board */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md max-w-2xl w-full text-center">
        <div className="absolute top-3 right-4 flex items-center gap-1.5 text-xs text-slate-400">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span>Toca cualquier término para explorarlo</span>
        </div>

        <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-4 flex items-center justify-center gap-2">
          <span>Fórmula del Cociente de Diferencias</span>
        </div>

        {/* Big Interactive Math Fraction */}
        <div className="flex items-center justify-center gap-3 select-none py-4">
          <span className="text-3xl sm:text-4xl font-light text-slate-400 math-font">
            m =
          </span>

          <div
            className={`inline-flex flex-col items-center p-2 rounded-xl transition-all ${
              activePart === 'all' ? 'bg-indigo-950/40 ring-2 ring-indigo-500/50' : ''
            }`}
            onClick={() => interactive && setActivePart('all')}
          >
            {/* Numerator */}
            <div
              className={`pb-2.5 px-3 flex items-center gap-1.5 cursor-pointer rounded-lg transition-all ${
                activePart === 'numerator'
                  ? 'bg-purple-900/50 ring-2 ring-purple-400'
                  : 'hover:bg-slate-800/60'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                interactive && setActivePart('numerator');
              }}
              title="Click para ver Cambio en Y"
            >
              {/* f(x+h) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePart('fxh');
                }}
                className={`text-2xl sm:text-3xl font-medium tracking-tight px-1.5 py-0.5 rounded transition-all ${
                  activePart === 'fxh'
                    ? 'text-emerald-300 bg-emerald-950/80 ring-2 ring-emerald-400'
                    : 'text-slate-100 hover:text-emerald-300'
                }`}
              >
                <span className="math-font">f</span>(
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePart('x');
                  }}
                  className={`math-font font-bold ${
                    activePart === 'x' ? 'text-amber-300 underline' : 'hover:text-amber-300'
                  }`}
                >
                  x
                </span>
                <span className="text-slate-400 mx-0.5">+</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePart('h');
                  }}
                  className={`math-font font-bold ${
                    activePart === 'h' ? 'text-cyan-300 underline' : 'hover:text-cyan-300'
                  }`}
                >
                  h
                </span>
                )
              </button>

              <span className="text-2xl sm:text-3xl text-purple-400 font-bold px-1">−</span>

              {/* f(x) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePart('fx');
                }}
                className={`text-2xl sm:text-3xl font-medium tracking-tight px-1.5 py-0.5 rounded transition-all ${
                  activePart === 'fx'
                    ? 'text-blue-300 bg-blue-950/80 ring-2 ring-blue-400'
                    : 'text-slate-100 hover:text-blue-300'
                }`}
              >
                <span className="math-font">f</span>(
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePart('x');
                  }}
                  className={`math-font font-bold ${
                    activePart === 'x' ? 'text-amber-300 underline' : 'hover:text-amber-300'
                  }`}
                >
                  x
                </span>
                )
              </button>
            </div>

            {/* Fraction Line */}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent my-1" />

            {/* Denominator */}
            <div
              className={`pt-1 px-4 cursor-pointer rounded-lg transition-all ${
                activePart === 'denominator' || activePart === 'h'
                  ? 'bg-cyan-950/80 ring-2 ring-cyan-400'
                  : 'hover:bg-slate-800/60'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                interactive && setActivePart('h');
              }}
              title="Click para ver Cambio en X"
            >
              <span className="text-2xl sm:text-3xl font-bold text-cyan-300 math-font">
                h
              </span>
            </div>
          </div>

          <div className="flex flex-col text-left pl-3 border-l border-slate-700/80 text-sm">
            <span className="text-slate-400 text-xs uppercase font-medium">Equivalente a:</span>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-base text-indigo-300 font-semibold">
              <span className="fraction text-center">
                <span className="numerator">Δy</span>
                <span className="denominator">Δx</span>
              </span>
              <span className="text-slate-400 text-xs font-normal">
                =
                <span className="fraction text-center text-xs ml-1">
                  <span className="numerator">Cambio en y</span>
                  <span className="denominator">Cambio en x</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Clickable Selector Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setActivePart('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activePart === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Fórmula completa
          </button>
          <button
            type="button"
            onClick={() => setActivePart('x')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activePart === 'x'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Punto x
          </button>
          <button
            type="button"
            onClick={() => setActivePart('h')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activePart === 'h'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Incremento h
          </button>
          <button
            type="button"
            onClick={() => setActivePart('numerator')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activePart === 'numerator'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Numerador Δy
          </button>
          <button
            type="button"
            onClick={() => setActivePart('fxh')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activePart === 'fxh'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Altura f(x+h)
          </button>
        </div>
      </div>

      {/* Explanatory Callout Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePart}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={`mt-4 p-4 rounded-xl border max-w-2xl w-full ${current.color}`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl select-none">{current.icon}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm sm:text-base text-white">
                  {current.title}
                </h4>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300">
                  {activePart.toUpperCase()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                {current.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

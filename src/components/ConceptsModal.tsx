import { useState } from 'react';
import {
  X,
  BookOpen,
  Search,
  Sparkles,
  Zap,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';
import { CORE_CONCEPTS, ConceptDefinition } from '../types.ts';

interface ConceptsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory?: string;
}

export function ConceptsModal({
  isOpen,
  onClose,
  selectedCategory = 'all',
}: ConceptsModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const filteredConcepts = CORE_CONCEPTS.filter((c) => {
    const matchesCategory =
      activeCategory === 'all' || c.category === activeCategory;
    const matchesSearch =
      c.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-600/30 text-cyan-400 border border-cyan-500/30">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Conceptos Clave Explicados (Directo y Sustancioso)</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Lo más importante
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Cada concepto fundamental explicado de forma clara, breve y sustanciosa para la clase.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-3 sm:p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Todos ({CORE_CONCEPTS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('fundamento')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'fundamento'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Fundamentos
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('geometria')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'geometria'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Geometría
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('algebra')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'algebra'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Álgebra &amp; Trucos
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('avanzado')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === 'avanzado'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/30'
                  : 'text-amber-400 hover:text-amber-200 hover:bg-slate-800 border border-amber-500/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Avanzados (TFC)</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar concepto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Featured Advanced Section: Teorema Fundamental del Cálculo */}
          {(activeCategory === 'all' || activeCategory === 'avanzado') && searchQuery === '' && (
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-rose-950/30 border border-amber-500/40 shadow-xl relative overflow-hidden mb-2">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-inner">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        Concepto Matemático Avanzado
                      </span>
                      <span className="text-xs text-slate-400">Pilar del Cálculo</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                      El Teorema Fundamental del Cálculo (TFC) y su Conexión con la Derivada
                    </h4>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Históricamente, el cálculo parecía estar dividido en dos problemas completamente separados:
                el <strong>problema de la tangente</strong> (velocidades y razones de cambio instantáneas, resuelto por Newton con el cociente de diferencias) y el <strong>problema del área</strong> (acumulación y sumas de Riemann). El Teorema Fundamental del Cálculo es la joya matemática que demuestra que <strong>ambos problemas son exactamente operaciones inversas</strong>, tal como la suma deshace a la resta.
              </p>

              {/* 3 Columns Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
                {/* Parte 1 */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-cyan-400 font-semibold block mb-1">
                      Parte 1: Derivada de la Acumulación
                    </span>
                    <h5 className="text-sm font-bold text-white mb-1.5">
                      La Derivada "Cancela" a la Integral
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Si defines una función de área acumulada <span className="text-cyan-300 font-mono">F(x) = ∫<sub>a</sub><sup>x</sup> f(t) dt</span>, su tasa instantánea de crecimiento en cada instante es simplemente la altura de la curva:
                    </p>
                  </div>
                  <div className="mt-3 p-2 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-xs text-cyan-300 font-bold">
                    d/dx [ ∫<sub>a</sub><sup>x</sup> f(t) dt ] = f(x)
                  </div>
                </div>

                {/* Parte 2 */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-purple-400 font-semibold block mb-1">
                      Parte 2: Regla de Barrow
                    </span>
                    <h5 className="text-sm font-bold text-white mb-1.5">
                      Integrar mediante Antiderivadas
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Para calcular el área total bajo la curva entre <span className="font-mono">a</span> y <span className="font-mono">b</span>, ya no necesitas sumar infinitos rectángulos: basta con restar una antiderivada en los extremos:
                    </p>
                  </div>
                  <div className="mt-3 p-2 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-xs text-purple-300 font-bold">
                    ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) - F(a)
                  </div>
                </div>

                {/* El Puente de Newton */}
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-amber-400 font-semibold block mb-1">
                      El Puente con el Cociente de Newton
                    </span>
                    <h5 className="text-sm font-bold text-amber-200 mb-1.5">
                      ¿Cómo se demuestra?
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      El área de una pequeña franja de ancho <span className="font-mono">h</span> es <span className="font-mono">F(x+h) - F(x)</span>. Al aplicar el Cociente de Newton:
                    </p>
                  </div>
                  <div className="mt-3 p-2 rounded-lg bg-slate-900/90 border border-amber-600/40 text-center font-mono text-xs text-amber-300 font-bold">
                    lim<sub>h→0</sub> [F(x+h) - F(x)] / h = f(x)
                  </div>
                </div>
              </div>

              {/* Substantive Summary note */}
              <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">En una frase para la exposición:</strong> &ldquo;El Cociente de Newton no solo sirve para calcular pendientes y velocidades; es el eslabón fundamental que demuestra que derivar e integrar son dos caras de la misma moneda en todo el universo del Cálculo.&rdquo;
                </div>
              </div>
            </div>
          )}

          {/* Concepts List */}
          {filteredConcepts.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3 flex-1">
                <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                  {item.icon}
                </span>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {item.term}
                    </h4>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {item.category}
                    </span>
                  </div>

                  {/* Sustancioso summary */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {item.shortSummary}
                  </p>

                  {/* Key Takeaway */}
                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200">
                    <Lightbulb className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Lo que no puedes olvidar:</strong> {item.keyTakeaway}
                    </div>
                  </div>
                </div>
              </div>

              {/* Math snippet if present */}
              {item.mathFormula && (
                <div className="md:w-56 shrink-0 p-3 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col justify-center">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold mb-1">
                    Expresión
                  </span>
                  <div className="font-mono text-sm text-indigo-300 font-bold">
                    {item.mathFormula}
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredConcepts.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No se encontraron conceptos con ese término de búsqueda.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            💡 <strong>Consejo para el grupo:</strong> Usen estas explicaciones directas para responder con soltura las preguntas del profesor.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

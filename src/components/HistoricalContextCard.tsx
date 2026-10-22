import { useState } from 'react';
import { History, Award, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

export function HistoricalContextCard() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="w-full max-w-2xl mt-4 rounded-xl bg-slate-950/80 border border-slate-800 p-4 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <History className="w-4 h-4" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Contexto Histórico: Isaac Newton (Siglo XVII)
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 shrink-0">
                Para impresionar al profesor
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Durante la Gran Peste de Londres en 1665, la Universidad de Cambridge cerró y Newton se refugió en su granja de Woolsthorpe. Allí desarrolló su método de las fluxiones para calcular el cambio continuo y las órbitas planetarias.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
          aria-label={expanded ? 'Colapsar detalles históricos' : 'Expandir detalles históricos'}
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-2.5 animate-fadeIn">
          <div className="flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>El problema que la geometría griega no podía resolver:</strong> Los matemáticos antiguos podían calcular la velocidad promedio de un viaje, pero no sabían cómo medir la velocidad en un único instante sin caer en la paradoja de &ldquo;0 dividido entre 0&rdquo;.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
            <p>
              <strong>De las &ldquo;Fluxiones&rdquo; a la Notación Moderna:</strong> Newton llamaba al cambio continuo <em>fluxión</em> (velocidad de cambio) y a la cantidad que cambiaba <em>fluente</em>. Más tarde, Leibniz introdujo la notación diferencial dy/dx que hoy complementa al cociente de Newton.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-800/40 text-[11px] text-indigo-200">
            💬 <strong>Frase para decir en la exposición:</strong> &ldquo;Profesor, este cociente no nació como un ejercicio abstracto, sino como la llave matemática con la que Newton dedujo las leyes de la gravitación universal y el movimiento de los cuerpos.&rdquo;
          </div>
        </div>
      )}
    </div>
  );
}

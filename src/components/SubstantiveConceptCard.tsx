import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

interface SubstantiveConceptItem {
  term: string;
  shortExplanation: string;
  whyItMatters: string;
  badge?: string;
}

interface SubstantiveConceptCardProps {
  title: string;
  subtitle?: string;
  items: SubstantiveConceptItem[];
  defaultOpen?: boolean;
}

export function SubstantiveConceptCard({
  title,
  subtitle,
  items,
  defaultOpen = true,
}: SubstantiveConceptCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <div className="w-full mt-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md backdrop-blur-md overflow-hidden transition-all">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-slate-950/60 hover:bg-slate-950/90 flex items-center justify-between text-left transition-colors border-b border-slate-800/60"
      >
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <BookOpen className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {title}
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Explicación Sustanciosa
              </span>
            </div>
            {subtitle && (
              <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="hidden sm:inline">
            {isOpen ? 'Ocultar resumen' : 'Ver explicaciones'}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded items */}
      {isOpen && (
        <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-fadeIn">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-cyan-300 font-sans">
                    {item.term}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {item.shortExplanation}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-900 flex items-start gap-1.5 text-[11px] text-indigo-300">
                <span className="font-bold text-indigo-400 shrink-0">✦ Clave:</span>
                <span className="italic">{item.whyItMatters}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

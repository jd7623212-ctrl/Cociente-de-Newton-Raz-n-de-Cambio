import { useState, useEffect } from 'react';
import {
  Maximize,
  Minimize,
  Mic,
  Sparkles,
  Layers,
  FileText,
  BookOpen,
  Users,
  Bot,
} from 'lucide-react';

interface NavbarProps {
  currentSlide: number;
  onSelectSlide: (slideIdx: number) => void;
  viewMode: 'slides' | 'full';
  onToggleViewMode: () => void;
  onOpenSpeakerNotes: () => void;
  onOpenQuiz: () => void;
  onOpenConcepts: () => void;
  onOpenTeamManager: () => void;
  onOpenAITutor: () => void;
  membersNames?: string;
}

export function Navbar({
  currentSlide,
  onSelectSlide,
  viewMode,
  onToggleViewMode,
  onOpenSpeakerNotes,
  onOpenQuiz,
  onOpenConcepts,
  onOpenTeamManager,
  onOpenAITutor,
  membersNames,
}: NavbarProps) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const slideNames = [
    '1. Portada',
    '2. ¿Qué es?',
    '3. Gráfica (Secante/Tangente)',
    '4. Demostración (x²)',
    '5. Aplicaciones',
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-indigo-600/30">
            <span className="math-font italic font-bold">N</span>
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
              <span>Cociente de Newton</span>
              <span className="hidden md:inline-block text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Razón de Cambio
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs md:max-w-md">
              {membersNames || 'Manuela • Liceth • Miguel • Juan Camilo • Juan David'}
            </div>
          </div>
        </div>

        {/* Slide Indicator Buttons (Slide Mode) */}
        {viewMode === 'slides' && (
          <nav aria-label="Navegación de diapositivas" className="hidden xl:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {slideNames.map((name, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSlide(idx)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {name}
              </button>
            ))}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Concept Guide Button */}
          <button
            type="button"
            onClick={onOpenConcepts}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-800/60 text-cyan-200 text-xs font-semibold transition-all"
            title="Ver explicaciones sustanciosas de cada concepto"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Conceptos Clave</span>
          </button>

          {/* Team Manager Button */}
          <button
            type="button"
            onClick={onOpenTeamManager}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold transition-all"
            title="Elegir quién expone qué diapositiva"
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden lg:inline">Elegir Expositor</span>
          </button>

          {/* Speaker Notes */}
          <button
            type="button"
            onClick={onOpenSpeakerNotes}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            title="Abrir guion y qué decir de cada integrante"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Guion</span>
          </button>

          {/* Quiz Button */}
          <button
            type="button"
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
            title="Dinámica de 15 preguntas para la clase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quiz</span>
          </button>

          {/* AI Tutor Button */}
          <button
            type="button"
            onClick={onOpenAITutor}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all"
            title="Tutor IA Google Gemini: Pregúntale dudas, pide ejemplos y practica para la clase"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tutor IA</span>
          </button>

          {/* Mode Switcher */}
          <button
            type="button"
            onClick={onToggleViewMode}
            title={viewMode === 'slides' ? 'Ver todo como documento continuo' : 'Modo Diapositivas para Proyector'}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-all flex items-center gap-1.5"
          >
            {viewMode === 'slides' ? (
              <>
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden xl:inline">Doc</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden xl:inline">Diapos</span>
              </>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa para proyector'}
            aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

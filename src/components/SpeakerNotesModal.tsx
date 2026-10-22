import { useState } from 'react';
import {
  X,
  Mic,
  Users,
  Lightbulb,
  BookOpen,
  Volume2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Edit3,
} from 'lucide-react';
import { SLIDE_SCRIPTS, TeamMember } from '../types.ts';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  members: TeamMember[];
  onOpenTeamManager: () => void;
}

export function SpeakerNotesModal({
  isOpen,
  onClose,
  currentSlideIndex,
  onSelectSlide,
  members,
  onOpenTeamManager,
}: SpeakerNotesModalProps) {
  const [activeSlide, setActiveSlide] = useState<number>(currentSlideIndex);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');

  if (!isOpen) return null;

  const script = SLIDE_SCRIPTS[activeSlide] || SLIDE_SCRIPTS[0];

  const fontSizeClass =
    fontSize === 'normal'
      ? 'text-base leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : 'text-xl sm:text-2xl leading-relaxed';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <Mic className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Guion del Grupo &amp; Teleprónter de Exposición</span>
              </h3>
              <p className="text-xs text-slate-400">
                Texto exacto para decir en clase, tips y asignación por integrante.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Adjusters */}
            <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs rounded font-medium ${
                  fontSize === 'normal' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-xs rounded font-medium ${
                  fontSize === 'large' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                Grande
              </button>
              <button
                type="button"
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 text-xs rounded font-medium ${
                  fontSize === 'xlarge' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                Teleprónter XL
              </button>
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
        </div>

        {/* Slide Tab Selector Bar */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-950/60 border-b border-slate-800 overflow-x-auto">
          {SLIDE_SCRIPTS.map((s, idx) => (
            <button
              key={s.slideNumber}
              type="button"
              onClick={() => {
                setActiveSlide(idx);
                onSelectSlide(idx);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeSlide === idx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Diapositiva {s.slideNumber}: {s.slideTitle.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Active Speaker Spotlight Badge */}
          {(() => {
            const currentSpeakers = members.filter(
              (m) => m.assignedSlideNumber === script.slideNumber
            );
            return (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="flex h-3 w-3 absolute -top-1 -right-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
                      <Mic className="w-5 h-5 animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                        🎙️ En el Escenario (Le toca exponer ahora):
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2 mt-0.5">
                      {currentSpeakers.length > 0 ? (
                        currentSpeakers.map((spk) => (
                          <span
                            key={spk.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-900/60 text-emerald-200 border border-emerald-500/50 shadow-sm"
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            {spk.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-300">
                          {script.speakers.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 self-start sm:self-auto">
                  Diapositiva {script.slideNumber} de {SLIDE_SCRIPTS.length}
                </span>
              </div>
            );
          })()}

          {/* Main Speech Card ("Qué decir") */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border-2 border-indigo-500/50 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-3">
              <Volume2 className="w-4 h-4" />
              <span>Qué decir en voz alta (Guion oficial para esta diapositiva):</span>
            </div>

            <div
              className={`text-slate-100 font-sans font-normal selection:bg-indigo-500 selection:text-white ${fontSizeClass}`}
            >
              &ldquo;{script.speechText}&rdquo;
            </div>
          </div>

          {/* Key points to remember */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Puntos Clave a Destacar</span>
              </h4>
              <ul className="space-y-1.5">
                {script.keyPoints.map((pt, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Para impresionar al profesor</span>
              </h4>
              <ul className="space-y-1.5">
                {script.teacherImpressionTips.map((tip, i) => (
                  <li key={i} className="text-xs sm:text-sm text-amber-200/90 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">★</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Group member roster reminder with ILLUMINATION OF ACTIVE SPEAKER */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-2">
                <span>Integrantes del Grupo (Iluminado quien expone ahora):</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenTeamManager();
                }}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Cambiar asignación</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {members.map((m) => {
                const isCurrentSpeaker = m.assignedSlideNumber === script.slideNumber;
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all ${
                      isCurrentSpeaker
                        ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                        : 'bg-slate-900 border-slate-800/80 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="relative shrink-0 mt-0.5">
                      <div
                        className={`w-7 h-7 rounded-full bg-gradient-to-tr ${m.avatarColor} text-white flex items-center justify-center text-xs font-bold ${
                          isCurrentSpeaker ? 'ring-2 ring-white shadow-md' : ''
                        }`}
                      >
                        {m.avatarInitial || m.name.charAt(0).toUpperCase()}
                      </div>
                      {isCurrentSpeaker && (
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
                      )}
                    </div>
                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`font-bold block truncate text-xs ${
                            isCurrentSpeaker ? 'text-emerald-200' : 'text-slate-200'
                          }`}
                        >
                          {m.name}
                        </span>
                        {isCurrentSpeaker && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-mono shrink-0 animate-pulse">
                            ¡SU TURNO!
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-300 block truncate mt-0.5">
                        {m.assignedTopic}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (activeSlide > 0) {
                const prev = activeSlide - 1;
                setActiveSlide(prev);
                onSelectSlide(prev);
              }
            }}
            disabled={activeSlide === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300"
          >
            <ChevronLeft className="w-4 h-4" /> Diapositiva anterior
          </button>

          <span className="text-xs text-slate-400">
            Usa el botón Cerrar o pulsa ESC para volver a la presentación
          </span>

          <button
            type="button"
            onClick={() => {
              if (activeSlide < SLIDE_SCRIPTS.length - 1) {
                const next = activeSlide + 1;
                setActiveSlide(next);
                onSelectSlide(next);
              }
            }}
            disabled={activeSlide === SLIDE_SCRIPTS.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white"
          >
            Siguiente diapositiva <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

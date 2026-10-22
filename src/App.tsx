import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
  Compass,
  FileCheck,
  Globe2,
  Mic,
  Award,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Edit3,
} from 'lucide-react';
import { TeamMember, DEFAULT_TEAM_MEMBERS, SLIDE_SCRIPTS } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { MathFormula } from './components/MathFormula.tsx';
import { GeometricGraph } from './components/GeometricGraph.tsx';
import { AlgebraicWhiteboard } from './components/AlgebraicWhiteboard.tsx';
import { RealWorldSimulators } from './components/RealWorldSimulators.tsx';
import { HistoricalContextCard } from './components/HistoricalContextCard.tsx';
import { FormalMathConceptCard } from './components/FormalMathConceptCard.tsx';
import { SpeakerNotesModal } from './components/SpeakerNotesModal.tsx';
import { QuizModal } from './components/QuizModal.tsx';
import { ConceptsModal } from './components/ConceptsModal.tsx';
import { TeamManagerModal } from './components/TeamManagerModal.tsx';
import { SubstantiveConceptCard } from './components/SubstantiveConceptCard.tsx';
import { AITutorModal } from './components/AITutorModal.tsx';

const STORAGE_KEY = 'newton_presentation_team_v1';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slides' | 'full'>('slides');
  const [isSpeakerNotesOpen, setIsSpeakerNotesOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isConceptsOpen, setIsConceptsOpen] = useState<boolean>(false);
  const [isTeamManagerOpen, setIsTeamManagerOpen] = useState<boolean>(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);

  // Persistent customizable team members
  const [members, setMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_TEAM_MEMBERS;
  });

  const handleSaveMembers = (updated: TeamMember[]) => {
    setMembers(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleResetMembers = () => {
    setMembers(DEFAULT_TEAM_MEMBERS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const totalSlides = 5;

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  // Scroll to top when changing slides
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentSlide]);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'Escape') {
        setIsSpeakerNotesOpen(false);
        setIsQuizOpen(false);
        setIsConceptsOpen(false);
        setIsTeamManagerOpen(false);
        setIsAITutorOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  const membersNamesString = members.map((m) => m.name).join(' • ');

  // Find who is assigned to the current slide
  const currentSlideSpeakers = members.filter(
    (m) => m.assignedSlideNumber === currentSlide + 1
  );

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentSlide={currentSlide}
        onSelectSlide={(idx) => setCurrentSlide(idx)}
        viewMode={viewMode}
        onToggleViewMode={() =>
          setViewMode((prev) => (prev === 'slides' ? 'full' : 'slides'))
        }
        onOpenSpeakerNotes={() => setIsSpeakerNotesOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenConcepts={() => setIsConceptsOpen(true)}
        onOpenTeamManager={() => setIsTeamManagerOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        membersNames={membersNamesString}
      />

      {/* Main Presentation Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        {viewMode === 'slides' ? (
          /* ============================================================ */
          /* SLIDES MODE (Presentation / Projector view)                  */
          /* ============================================================ */
          <div className="flex-1 flex flex-col justify-between">
            {/* Slide 1: Portada y Presentación */}
            {currentSlide === 0 && (
              <section className="flex-1 flex flex-col items-center justify-center py-6 sm:py-10 animate-fadeIn">
                <div className="max-w-4xl w-full text-center flex flex-col items-center">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-xs sm:text-sm font-semibold text-indigo-300 mb-6 shadow-inner">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Cálculo Diferencial • Exposición Grupal Interactiva</span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                    Cociente de Newton{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                      / Razón de Cambio
                    </span>
                  </h1>

                  <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-light mb-8 leading-relaxed">
                    De la velocidad promedio al cambio instantáneo: la fórmula fundamental que dio nacimiento al Cálculo Diferencial.
                  </p>

                  {/* Integrated Speaker Script Card ("Qué decir") */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/40 shadow-xl max-w-2xl w-full text-left mb-8 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5" /> Qué decir al comenzar (Guion Oficial):
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {currentSlideSpeakers.length > 0
                          ? `Asignado a: ${currentSlideSpeakers.map((s) => s.name).join(', ')}`
                          : 'Orador: Manuela'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                      &ldquo;Buenos días profesor y compañeros. Nuestro grupo está conformado por{' '}
                      <strong className="text-white not-italic">{membersNamesString}</strong>. Hoy les vamos a explicar un concepto fundamental del cálculo: El Cociente de Newton y su relación con la Razón de Cambio.&rdquo;
                    </p>
                  </div>

                  {/* Team Members Grid with CUSTOMIZATION TRIGGER */}
                  <div className="w-full max-w-4xl mb-8 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <Users className="w-4 h-4 text-indigo-400" />
                          <span>Integrantes del Grupo y Temas a Exponer</span>
                        </h3>
                        <p className="text-xs text-slate-400">
                          Puedes personalizar quién expone cada tema según lo acordado por el equipo.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsTeamManagerOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all self-start sm:self-center"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Elegir qué expone cada uno</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {members.map((m) => {
                        const isSpeakingNow = m.assignedSlideNumber === 1;
                        return (
                          <div
                            key={m.id}
                            className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                              isSpeakingNow
                                ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-400/60 shadow-xl shadow-emerald-500/20 scale-[1.02]'
                                : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            <div className="relative shrink-0 mt-0.5">
                              <div
                                className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${m.avatarColor} text-white font-bold text-sm flex items-center justify-center shadow-md ${
                                  isSpeakingNow ? 'ring-2 ring-white shadow-emerald-400/50' : ''
                                }`}
                              >
                                {m.avatarInitial || m.name.charAt(0).toUpperCase()}
                              </div>
                              {isSpeakingNow && (
                                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
                              )}
                            </div>
                            <div className="overflow-hidden flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span
                                  className={`text-sm font-bold block truncate ${
                                    isSpeakingNow ? 'text-emerald-200' : 'text-white'
                                  }`}
                                >
                                  {m.name}
                                </span>
                                {isSpeakingNow && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-mono shrink-0 animate-pulse">
                                    🎙️ EXPONE AHORA
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-medium text-emerald-400 block truncate">
                                {m.role}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                                {m.assignedTopic}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Substantive Concepts Card for Slide 1 */}
                  <SubstantiveConceptCard
                    title="Conceptos Fundamentales de la Exposición"
                    subtitle="Resumen sustancioso para tener muy claro antes de empezar"
                    items={[
                      {
                        term: '¿Qué es el Cambio Continuo?',
                        shortExplanation:
                          'En la naturaleza las cosas no cambian a saltos, sino de forma suave y continua (la velocidad de un auto, el agua llenando un tanque, el crecimiento de una planta).',
                        whyItMatters: 'El álgebra ordinaria solo medía rectas fijas; Newton creó el cálculo para medir curvas en movimiento.',
                        badge: 'Origen',
                      },
                      {
                        term: 'Razón Promedio vs Instantánea',
                        shortExplanation:
                          'El promedio divide el total del cambio entre el total del tiempo transcurrido. Lo instantáneo te dice qué pasa exactamente en esta milésima de segundo.',
                        whyItMatters: 'El cociente de Newton calcula el promedio; su límite calcula lo instantáneo.',
                        badge: 'Diferencia Vital',
                      },
                      {
                        term: 'La Llave: El Límite h → 0',
                        shortExplanation:
                          'No podemos dividir por cero, pero podemos acercarnos a cero tanto como queramos. Ese truco matemático formaliza la derivada.',
                        whyItMatters: 'Elimina la paradoja de 0/0 sin romper las leyes matemáticas.',
                        badge: 'El Límite',
                      },
                    ]}
                  />

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                    <button
                      type="button"
                      onClick={goToNextSlide}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all"
                    >
                      <span>Iniciar Exposición (Diapositiva 2)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsConceptsOpen(true)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-200 text-sm font-semibold transition-all"
                    >
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>Ver Diccionario de Conceptos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsSpeakerNotesOpen(true)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-medium transition-all"
                    >
                      <Mic className="w-4 h-4 text-indigo-400" />
                      <span>Ver Guion Oficial</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Slide 2: ¿Qué es el Cociente de Newton? */}
            {currentSlide === 1 && (
              <section className="flex-1 flex flex-col items-center py-4 sm:py-6 animate-fadeIn">
                <div className="max-w-4xl w-full flex flex-col items-center">
                  {/* Active Speaker Spotlight Bar */}
                  {currentSlideSpeakers.length > 0 && (
                    <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/20 text-xs text-emerald-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold">🎙️ Le toca exponer a:</span>
                      <span className="font-extrabold text-white">
                        {currentSlideSpeakers.map((s) => s.name).join(' & ')}
                      </span>
                    </div>
                  )}

                  {/* Slide Header */}
                  <div className="text-center mb-6">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
                      DIAPOSITIVA 2 DE 5
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                      ¿Qué es el Cociente de Newton?
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
                      También conocido como <strong>cociente de diferencias</strong>. Mide la razón de cambio promedio en un intervalo.
                    </p>
                  </div>

                  {/* Interactive Formula Breakdown Component */}
                  <MathFormula interactive={true} />

                  {/* Rigorous Formal Mathematical Concept Card */}
                  <FormalMathConceptCard />

                  {/* Substantive Concept Card for Slide 2 */}
                  <SubstantiveConceptCard
                    title="Explicación Sustanciosa de los Términos de la Fórmula"
                    subtitle="Lo que cada expositor debe tener clarísimo al señalar el tablero"
                    items={[
                      {
                        term: 'Punto de Partida (x)',
                        shortExplanation:
                          'Es la posición horizontal inicial donde queremos analizar qué le pasa a la función.',
                        whyItMatters: 'Determina en qué punto exacto de la curva estamos parados.',
                        badge: 'Horizontal',
                      },
                      {
                        term: 'Incremento (h o Δx)',
                        shortExplanation:
                          'Es un pequeño paso o avance horizontal hacia adelante. Si x vale 2 y h vale 1, avanzamos hasta 3.',
                        whyItMatters: 'Si h es grande tenemos un intervalo amplio; si h tiende a 0 tenemos un punto.',
                        badge: 'Avance',
                      },
                      {
                        term: 'Alturas f(x) y f(x+h)',
                        shortExplanation:
                          'Son los valores verticales (en el eje y). f(x) es la altura donde empezamos y f(x+h) es la altura donde llegamos tras dar el paso h.',
                        whyItMatters: 'La resta f(x+h) - f(x) es cuánto subió o bajó la función (Δy).',
                        badge: 'Vertical',
                      },
                      {
                        term: '¿Por qué es la Pendiente?',
                        shortExplanation:
                          'Desde el colegio sabemos que la pendiente es m = (y2 - y1) / (x2 - x1). El cociente de Newton es exactamente eso: Δy / Δx.',
                        whyItMatters: 'Conecta las rectas del bachillerato con las curvas del cálculo universitario.',
                        badge: 'Geometría',
                      },
                      {
                        term: '¿Por qué no poner h = 0 ya?',
                        shortExplanation:
                          'Si ponemos h = 0 al inicio, tendríamos (f(x) - f(x)) / 0 = 0/0, lo cual es indeterminado.',
                        whyItMatters: 'El álgebra nos permite transformar la expresión para eliminar h del denominador.',
                        badge: 'Alerta 0/0',
                      },
                      {
                        term: 'Razón Promedio',
                        shortExplanation:
                          'Nos da el promedio de velocidad o costo en ese intervalo, ignorando las subidas y bajadas intermedias.',
                        whyItMatters: 'Es el primer paso antes de calcular la velocidad instantánea.',
                        badge: 'Promedio',
                      },
                    ]}
                  />

                  {/* Historical Context Card */}
                  <HistoricalContextCard />

                  {/* Speaker Script Callout */}
                  <div className="w-full max-w-2xl mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <Mic className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300">
                      <strong className="text-purple-300">
                        {currentSlideSpeakers.length > 0
                          ? `Guion para ${currentSlideSpeakers.map((s) => s.name).join(' & ')}:`
                          : 'Guion para Liceth & Manuela:'}
                      </strong>{' '}
                      &ldquo;{SLIDE_SCRIPTS[1].speechText}&rdquo;
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Slide 3: Interpretación Geométrica: De la Secante a la Tangente */}
            {currentSlide === 2 && (
              <section className="flex-1 flex flex-col items-center py-4 animate-fadeIn">
                <div className="w-full max-w-6xl">
                  {/* Active Speaker Spotlight Bar */}
                  {currentSlideSpeakers.length > 0 && (
                    <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/20 text-xs text-emerald-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold">🎙️ Le toca exponer a:</span>
                      <span className="font-extrabold text-white">
                        {currentSlideSpeakers.map((s) => s.name).join(' & ')}
                      </span>
                    </div>
                  )}

                  {/* Slide Header */}
                  <div className="text-center mb-4">
                    <span className="text-xs font-mono font-bold text-indigo-400 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800">
                      DIAPOSITIVA 3 DE 5
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                      Interpretación Geométrica: De la Secante a la Tangente
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl mx-auto">
                      Observa cómo la recta secante se endereza hasta convertirse exactamente en la recta tangente cuando{' '}
                      <span className="font-mono text-cyan-300 font-bold">h → 0</span>.
                    </p>
                  </div>

                  {/* Geometric Interactive SVG Visualizer */}
                  <GeometricGraph />

                  {/* Substantive Concepts Card for Slide 3 */}
                  <SubstantiveConceptCard
                    title="Explicación Sustanciosa: Los 3 Pasos Geométricos"
                    subtitle="Cómo explicar con naturalidad el paso de la secante a la tangente frente al profesor"
                    items={[
                      {
                        term: 'Paso 1: La Recta Secante (Corta en 2 Puntos)',
                        shortExplanation:
                          'Tomamos el punto fijo P(x, f(x)) y el punto secundario Q(x+h, f(x+h)). La línea que pasa por ambos es la secante.',
                        whyItMatters: 'Su inclinación (pendiente) es la razón de cambio promedio en ese tramo.',
                        badge: 'Paso 1',
                      },
                      {
                        term: 'Paso 2: El Límite (h → 0)',
                        shortExplanation:
                          'Empezamos a encoger h. Al hacerlo, el punto Q se desliza por la curva acercándose cada vez más a P.',
                        whyItMatters: 'La recta secante empieza a girar acompañando la forma local de la curva.',
                        badge: 'Paso 2',
                      },
                      {
                        term: 'Paso 3: La Recta Tangente (Toca en 1 Punto)',
                        shortExplanation:
                          'En el límite, los dos puntos prácticamente se fusionan. La secante se convierte en la tangente, que roza la curva en P.',
                        whyItMatters: 'Su pendiente es la derivada f\'(x): la velocidad en ese microsegundo exacto.',
                        badge: 'Paso 3',
                      },
                    ]}
                  />

                  {/* Speaker Script Callout */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <Mic className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300">
                      <strong className="text-blue-300">
                        {currentSlideSpeakers.length > 0
                          ? `Guion para ${currentSlideSpeakers.map((s) => s.name).join(' & ')}:`
                          : 'Guion para Miguel:'}
                      </strong>{' '}
                      &ldquo;{SLIDE_SCRIPTS[2].speechText}&rdquo;
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Slide 4: Demostración Práctica Paso a Paso */}
            {currentSlide === 3 && (
              <section className="flex-1 flex flex-col items-center py-4 animate-fadeIn">
                <div className="w-full max-w-6xl">
                  {/* Active Speaker Spotlight Bar */}
                  {currentSlideSpeakers.length > 0 && (
                    <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/20 text-xs text-emerald-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold">🎙️ Le toca exponer a:</span>
                      <span className="font-extrabold text-white">
                        {currentSlideSpeakers.map((s) => s.name).join(' & ')}
                      </span>
                    </div>
                  )}

                  {/* Slide Header */}
                  <div className="text-center mb-4">
                    <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800">
                      DIAPOSITIVA 4 DE 5 • EL TABLERO EN VIVO
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                      Demostración Práctica Paso a Paso: f(x) = x²
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl mx-auto">
                      Resolución algebraica completa demostrando que la derivada instantánea es exactamente{' '}
                      <span className="font-mono text-emerald-300 font-bold">f&apos;(x) = 2x</span>.
                    </p>
                  </div>

                  {/* Whiteboard Component */}
                  <AlgebraicWhiteboard />

                  {/* Substantive Concepts Card for Slide 4 */}
                  <SubstantiveConceptCard
                    title="Explicación Sustanciosa de la Demostración Algebraica"
                    subtitle="Por qué cada paso algebraico es necesario y qué responde a las preguntas del profesor"
                    items={[
                      {
                        term: '1. ¿Por qué (x + h)²?',
                        shortExplanation:
                          'Porque la regla de la función f(x) = x² dice: "eleva al cuadrado todo lo que entre en el paréntesis". Al entrar (x+h), lo elevamos al cuadrado.',
                        whyItMatters: 'No confundir con x² + h²; hay un término intermedio 2xh.',
                        badge: 'Sustitución',
                      },
                      {
                        term: '2. ¿Por qué se cancela x² - x²?',
                        shortExplanation:
                          'Al expandir el binomio queda x² + 2xh + h² - x². Los x² tienen signos opuestos (+ y -), por lo que se anulan limpiamente.',
                        whyItMatters: 'Nos deshacemos de la variable cuadrática original en el numerador.',
                        badge: 'Cancelación',
                      },
                      {
                        term: '3. El Paso Mágico: Factorizar h',
                        shortExplanation:
                          'Quedaba 2xh + h². Como ambos términos tienen la letra h, la sacamos factor común: h(2x + h).',
                        whyItMatters: 'Esto permite cancelar la h del denominador (h/h = 1) y destruir la indeterminación 0/0.',
                        badge: 'Factorización',
                      },
                      {
                        term: '4. Aplicar el Límite (h → 0)',
                        shortExplanation:
                          'Una vez que cancelamos el denominador, nos queda 2x + h. Como h tiende a cero, 2x + 0 = 2x.',
                        whyItMatters: 'Conclusión: La razón instantánea de cambio de x² siempre es 2x.',
                        badge: 'Resultado Final',
                      },
                    ]}
                  />

                  {/* Speaker Script Callout */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <Mic className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300">
                      <strong className="text-emerald-300">
                        {currentSlideSpeakers.length > 0
                          ? `Guion para ${currentSlideSpeakers.map((s) => s.name).join(' & ')}:`
                          : 'Guion para Juan Camilo:'}
                      </strong>{' '}
                      &ldquo;{SLIDE_SCRIPTS[3].speechText}&rdquo;
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Slide 5: Aplicaciones en el Mundo Real */}
            {currentSlide === 4 && (
              <section className="flex-1 flex flex-col items-center py-4 animate-fadeIn">
                <div className="w-full max-w-6xl">
                  {/* Active Speaker Spotlight Bar */}
                  {currentSlideSpeakers.length > 0 && (
                    <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/20 text-xs text-emerald-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold">🎙️ Le toca exponer a:</span>
                      <span className="font-extrabold text-white">
                        {currentSlideSpeakers.map((s) => s.name).join(' & ')}
                      </span>
                    </div>
                  )}

                  {/* Slide Header */}
                  <div className="text-center mb-4">
                    <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-950 border border-amber-800">
                      DIAPOSITIVA 5 DE 5
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                      Aplicaciones en el Mundo Real
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl mx-auto">
                      Física y cinemática (velocímetro), Economía (costo marginal) y Biología (tasa celular).
                    </p>
                  </div>

                  {/* Real World Simulators */}
                  <RealWorldSimulators />

                  {/* Substantive Concepts Card for Slide 5 */}
                  <SubstantiveConceptCard
                    title="Explicación Sustanciosa de las 3 Aplicaciones Cotidianas"
                    subtitle="Cómo responder si el profesor pregunta: ¿Para qué sirve esto en la vida real?"
                    items={[
                      {
                        term: '🚗 En Física: El Velocímetro del Auto',
                        shortExplanation:
                          'El odómetro total dividido entre las horas de viaje te da la velocidad promedio. Pero el velocímetro en el tablero mide la derivada: la velocidad en ese segundo exacto.',
                        whyItMatters: 'Si chocas a 100 km/h, la física del impacto responde a la velocidad instantánea, no al promedio de tu viaje.',
                        badge: 'Cinemática',
                      },
                      {
                        term: '💰 En Economía: El Costo Marginal',
                        shortExplanation:
                          'Las fábricas necesitan saber cuánto cuesta producir UNA unidad más (la camiseta 101). La derivada de la función de costo da esa cifra exacta.',
                        whyItMatters: 'Permite a las empresas fijar precios y saber cuándo deja de ser rentable fabricar más.',
                        badge: 'Economía',
                      },
                      {
                        term: '📈 En Biología: Crecimiento Celular',
                        shortExplanation:
                          'Las bacterias no se multiplican a ritmo constante. La derivada de la población permite saber a qué ritmo se expande una infección en este mismo minuto.',
                        whyItMatters: 'Vital para determinar la dosis y momento óptimo para aplicar antibióticos.',
                        badge: 'Medicina',
                      },
                    ]}
                  />

                  {/* Speaker Script Callout */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <Mic className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300">
                      <strong className="text-amber-300">
                        {currentSlideSpeakers.length > 0
                          ? `Guion para ${currentSlideSpeakers.map((s) => s.name).join(' & ')}:`
                          : 'Guion para Juan David:'}
                      </strong>{' '}
                      &ldquo;{SLIDE_SCRIPTS[4].speechText}&rdquo;
                    </div>
                  </div>

                  {/* Final Wrap-up & Quiz trigger banner */}
                  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-600/30">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <span>¿Terminaron la explicación? ¡Hora de la dinámica con la clase!</span>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-purple-900 text-purple-200 border border-purple-500">
                            15 Preguntas
                          </span>
                        </h4>
                        <p className="text-xs text-slate-300">
                          Abre el Gran Quiz Interactivo de 15 preguntas tipo test para evaluar y divertir a toda la clase.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsQuizOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-purple-600/30 transition-all shrink-0"
                    >
                      Lanzar Quiz (15 Preguntas)
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Bottom Slide Navigation Bar */}
            <footer className="pt-6 pb-2 border-t border-slate-800 flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={goToPrevSlide}
                disabled={currentSlide === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 text-slate-300 transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Diapositiva anterior
              </button>

              {/* Slide Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === idx
                        ? 'w-8 bg-indigo-500 shadow-md shadow-indigo-500/50'
                        : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Ir a la diapositiva ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNextSlide}
                disabled={currentSlide === totalSlides - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white shadow-md shadow-indigo-600/20 transition-all"
              >
                Siguiente diapositiva <ChevronRight className="w-4 h-4" />
              </button>
            </footer>
          </div>
        ) : (
          /* ============================================================ */
          /* FULL DOCUMENT MODE (Continuous scroll interactive textbook)  */
          /* ============================================================ */
          <div className="space-y-12 py-4">
            {/* Header Hero */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 text-center relative overflow-hidden">
              <span className="text-xs font-mono font-bold text-indigo-400 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 inline-block mb-3">
                GUÍA COMPLETA Y DOCUMENTO DE ESTUDIO
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white">
                Cociente de Newton y Razón de Cambio
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-2">
                Trabajo presentado por {membersNamesString}.
              </p>
            </div>

            {/* Section 1: Concept & Formula */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-800">
                  SECCIÓN 1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  ¿Qué es el Cociente de Newton?
                </h2>
              </div>
              <MathFormula interactive={true} />
              <FormalMathConceptCard />
              <HistoricalContextCard />
            </section>

            {/* Section 2: Geometric Interpretation */}
            <section className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                  SECCIÓN 2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Interpretación Geométrica: De la Secante a la Tangente
                </h2>
              </div>
              <GeometricGraph />
            </section>

            {/* Section 3: Step by Step Proof */}
            <section className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                  SECCIÓN 3
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Demostración Práctica en el Tablero: f(x) = x²
                </h2>
              </div>
              <AlgebraicWhiteboard />
            </section>

            {/* Section 4: Real World Applications */}
            <section className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-950 text-amber-300 font-bold border border-amber-800">
                  SECCIÓN 4
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Aplicaciones en el Mundo Real
                </h2>
              </div>
              <RealWorldSimulators />
            </section>
          </div>
        )}
      </main>

      {/* Speaker Notes / Teleprompter Modal */}
      <SpeakerNotesModal
        isOpen={isSpeakerNotesOpen}
        onClose={() => setIsSpeakerNotesOpen(false)}
        currentSlideIndex={currentSlide}
        onSelectSlide={(idx) => setCurrentSlide(idx)}
        members={members}
        onOpenTeamManager={() => setIsTeamManagerOpen(true)}
      />

      {/* Team Customizer Modal */}
      <TeamManagerModal
        isOpen={isTeamManagerOpen}
        onClose={() => setIsTeamManagerOpen(false)}
        members={members}
        onSaveMembers={handleSaveMembers}
        onResetDefault={handleResetMembers}
      />

      {/* Core Concepts Glossary Modal */}
      <ConceptsModal
        isOpen={isConceptsOpen}
        onClose={() => setIsConceptsOpen(false)}
      />

      {/* Interactive Classroom Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* Google Cloud & Gemini AI Math Tutor Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
      />
    </div>
  );
}

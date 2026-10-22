import { useState } from 'react';
import {
  X,
  Award,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../types.ts';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(optIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Reto para la Clase: ¿Cuánto aprendiste?
              </h3>
              <p className="text-xs text-slate-400">
                Pon a prueba a tus compañeros durante la exposición.
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

        {/* Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {!isFinished ? (
            <div>
              {/* Question progress */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="font-mono font-bold text-purple-400">
                  PREGUNTA {currentIdx + 1} DE {QUIZ_QUESTIONS.length}
                </span>
                <span className="font-mono bg-purple-950/60 border border-purple-800/40 px-2.5 py-0.5 rounded-full text-purple-300">
                  Aciertos: {score} / {QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mb-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full transition-all duration-300"
                  style={{
                    width: `${((currentIdx + (isAnswerSubmitted ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* 15 Question Mini Tracker Pills */}
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap mb-5 pb-2 border-b border-slate-800/60">
                {QUIZ_QUESTIONS.map((_, i) => {
                  let pillStyle = 'bg-slate-800/60 text-slate-400 border-slate-700/50';
                  if (i === currentIdx) {
                    pillStyle = 'bg-purple-600 text-white font-bold ring-2 ring-purple-400 scale-105 shadow-md shadow-purple-600/30';
                  } else if (i < currentIdx) {
                    pillStyle = 'bg-slate-700/80 text-emerald-300 border-emerald-500/30';
                  }
                  return (
                    <span
                      key={i}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[10px] sm:text-xs flex items-center justify-center border font-mono transition-all ${pillStyle}`}
                      title={`Pregunta ${i + 1}`}
                    >
                      {i + 1}
                    </span>
                  );
                })}
              </div>

              {/* Question statement */}
              <h4 className="text-base sm:text-lg font-bold text-white mb-5 leading-snug">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  let optStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/80';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      optStyle = 'bg-slate-950/50 border-slate-800/50 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-indigo-950/80 border-indigo-500 text-white font-semibold ring-1 ring-indigo-500';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation box on submit */}
              {isAnswerSubmitted && (
                <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 animate-fadeIn">
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/30 mb-4">
                <Award className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-bold text-white mb-2">¡Desafío de 15 Preguntas Completado!</h4>
              <p className="text-sm text-slate-300 max-w-md mb-6">
                Puntuación final obtenida:{' '}
                <strong className="text-emerald-400 font-mono text-2xl">
                  {score} / {QUIZ_QUESTIONS.length}
                </strong>{' '}
                aciertos ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%).
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 max-w-md text-left mb-6 leading-relaxed">
                {score >= 13 && '🌟 ¡Excelente puntuación! (Sobresaliente). Han dominado por completo el Cociente de Newton, el paso al límite de la secante a la tangente, la derivabilidad, el cálculo de f(x)=x² y las aplicaciones multidisciplinarias.'}
                {score >= 10 && score < 13 && '👏 ¡Muy buen trabajo! (Notable). Tienen una comprensión sólida de la razón de cambio promedio vs. instantánea y la fundamentación del cálculo diferencial.'}
                {score >= 6 && score < 10 && '📖 ¡Buen esfuerzo! (Aprobado). Dominan las nociones básicas, pero es recomendable repasar los pasos algebraicos de simplificación de (x+h) y las aplicaciones de costo marginal y cinemática.'}
                {score < 6 && '📚 ¡A repasar con el equipo! Se recomienda volver a ver las diapositivas interactivas, probar el deslizador de h en el simulador gráfico y rehacer la demostración en el tablero.'}
              </div>

              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Reiniciar Quiz
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isFinished && (
          <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {selectedAnswer === null ? 'Selecciona una opción' : 'Opción elegida'}
            </span>

            {!isAnswerSubmitted ? (
              <button
                type="button"
                disabled={selectedAnswer === null}
                onClick={handleSubmitAnswer}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-all shadow-md shadow-purple-600/30"
              >
                Comprobar respuesta
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Siguiente pregunta' : 'Ver resultados'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

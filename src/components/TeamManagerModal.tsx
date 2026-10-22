import { useState } from 'react';
import {
  X,
  Users,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  Sparkles,
  Edit3,
  Award,
} from 'lucide-react';
import { TeamMember, DEFAULT_TEAM_MEMBERS } from '../types.ts';

interface TeamManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
  onSaveMembers: (updated: TeamMember[]) => void;
  onResetDefault: () => void;
}

const PRESET_TOPICS = [
  {
    slideNumber: 1,
    label: 'Diapositiva 1: Portada y Apertura',
    role: 'Apertura y Contexto',
  },
  {
    slideNumber: 2,
    label: 'Diapositiva 2: ¿Qué es el Cociente de Newton?',
    role: 'Concepto y Fórmula',
  },
  {
    slideNumber: 3,
    label: 'Diapositiva 3: Interpretación Geométrica (Secante a Tangente)',
    role: 'Interpretación Geométrica',
  },
  {
    slideNumber: 4,
    label: 'Diapositiva 4: Demostración en el Tablero (f(x) = x²)',
    role: 'Demostración Práctica',
  },
  {
    slideNumber: 5,
    label: 'Diapositiva 5: Aplicaciones Reales (Física, Economía, Biología)',
    role: 'Aplicaciones y Conclusiones',
  },
  {
    slideNumber: 5,
    label: 'Dinámica de Clase: Quiz y Ronda de Preguntas',
    role: 'Moderador del Quiz',
  },
];

const AVATAR_COLORS = [
  'from-pink-500 to-rose-600',
  'from-purple-500 to-indigo-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-fuchsia-600',
];

export function TeamManagerModal({
  isOpen,
  onClose,
  members,
  onSaveMembers,
  onResetDefault,
}: TeamManagerModalProps) {
  const [localMembers, setLocalMembers] = useState<TeamMember[]>(members);
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpdateMember = (id: string, updates: Partial<TeamMember>) => {
    setLocalMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const handleAddMember = () => {
    const newId = `member-${Date.now()}`;
    const newMember: TeamMember = {
      id: newId,
      name: 'Nuevo Integrante',
      role: 'Expositor',
      assignedTopic: 'Diapositiva 1: Portada y Apertura',
      assignedSlideNumber: 1,
      customNotes: 'Preparar la introducción y conceptos clave.',
      avatarColor: AVATAR_COLORS[localMembers.length % AVATAR_COLORS.length],
      avatarInitial: 'N',
    };
    setLocalMembers((prev) => [...prev, newMember]);
    setActiveEditingId(newId);
  };

  const handleRemoveMember = (id: string) => {
    if (localMembers.length <= 1) return;
    setLocalMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSaveAndClose = () => {
    onSaveMembers(localMembers);
    onClose();
  };

  const handleReset = () => {
    if (
      window.confirm(
        '¿Deseas restaurar la lista original de integrantes (Manuela, Liceth, Miguel, Juan Camilo, Juan David)?'
      )
    ) {
      onResetDefault();
      setLocalMembers(DEFAULT_TEAM_MEMBERS);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Personalizar Integrantes y Asignación de Temas</span>
              </h3>
              <p className="text-xs text-slate-400">
                Elige libremente qué diapositiva o tema desea exponer cada uno.
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

        {/* Members List Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {localMembers.length} Integrantes configurados
            </span>
            <button
              type="button"
              onClick={handleAddMember}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar Integrante
            </button>
          </div>

          <div className="space-y-3">
            {localMembers.map((member, idx) => (
              <div
                key={member.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col gap-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Name and Avatar */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${member.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0`}
                    >
                      {member.avatarInitial || member.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const newName = e.target.value;
                            handleUpdateMember(member.id, {
                              name: newName,
                              avatarInitial: newName.charAt(0).toUpperCase(),
                            });
                          }}
                          placeholder="Nombre del integrante"
                          className="font-bold text-sm sm:text-base text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700 focus:border-indigo-500 outline-none"
                        />
                        <span className="text-xs text-slate-500">#{idx + 1}</span>
                      </div>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) =>
                          handleUpdateMember(member.id, { role: e.target.value })
                        }
                        placeholder="Rol en la presentación"
                        className="text-xs text-indigo-300 bg-transparent mt-1 border-b border-transparent hover:border-slate-700 focus:border-indigo-400 outline-none w-48"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {localMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 transition-colors"
                        title="Eliminar integrante"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Topic Selector */}
                <div className="pt-2 border-t border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">
                      ¿Qué parte va a exponer?
                    </label>
                    <select
                      value={member.assignedTopic}
                      onChange={(e) => {
                        const val = e.target.value;
                        const matchedPreset = PRESET_TOPICS.find((p) => p.label === val);
                        handleUpdateMember(member.id, {
                          assignedTopic: val,
                          assignedSlideNumber: matchedPreset ? matchedPreset.slideNumber : 1,
                          role: matchedPreset ? matchedPreset.role : member.role,
                        });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none focus:border-indigo-500"
                    >
                      {PRESET_TOPICS.map((p) => (
                        <option key={p.label} value={p.label}>
                          {p.label}
                        </option>
                      ))}
                      <option value="Personalizado: Tema libre">Personalizado: Tema libre</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">
                      Apunte o recordatorio personal para el día:
                    </label>
                    <input
                      type="text"
                      value={member.customNotes || ''}
                      onChange={(e) =>
                        handleUpdateMember(member.id, { customNotes: e.target.value })
                      }
                      placeholder="Ej. Recordar modular la voz, mirar al profe..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restaurar grupo original
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveAndClose}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Check className="w-4 h-4" /> Guardar Asignación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

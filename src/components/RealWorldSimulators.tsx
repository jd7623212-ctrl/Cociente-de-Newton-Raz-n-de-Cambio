import { useState } from 'react';
import {
  Car,
  TrendingUp,
  DollarSign,
  Activity,
  Gauge,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  calculateCarKinematics,
  calculateMarginalCost,
  calculateBacteriaGrowth,
} from '../utils/math.ts';

type AppTab = 'physics' | 'economics' | 'biology';

export function RealWorldSimulators() {
  const [activeTab, setActiveTab] = useState<AppTab>('physics');

  // Physics state
  const [timeT, setTimeT] = useState<number>(3.0);
  const [deltaT, setDeltaT] = useState<number>(1.5);

  // Economics state
  const [unitsX, setUnitsX] = useState<number>(80);
  const [deltaH, setDeltaH] = useState<number>(5);

  // Biology state
  const [bioT, setBioT] = useState<number>(4.0);
  const [bioH, setBioH] = useState<number>(1.0);

  // Calculations
  const carData = calculateCarKinematics(timeT, deltaT);
  const econData = calculateMarginalCost(unitsX, deltaH);
  const bioData = calculateBacteriaGrowth(bioT, bioH);

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-2xl p-4 sm:p-6 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Aplicaciones en el Mundo Real
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Demuestra cómo el cociente de Newton y la derivada no son solo teoría, sino herramientas que usamos a diario.
          </p>
        </div>

        {/* 3 Domain Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('physics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'physics'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Física (Velocidad)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('economics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'economics'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Economía (Costo Marginal)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('biology')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'biology'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Biología (Bacterias)</span>
          </button>
        </div>
      </div>

      {/* Simulator 1: PHYSICS & CINEMÁTICA */}
      {activeTab === 'physics' && (
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Visual Road Simulation */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-blue-400 font-semibold">
                  Carretera: s(t) = 5t² metros
                </span>
                <span className="font-mono">
                  t = {timeT.toFixed(1)}s | Δt = {deltaT.toFixed(2)}s
                </span>
              </div>

              {/* Road track */}
              <div className="relative w-full h-24 bg-slate-900 rounded-xl border border-slate-800 my-4 flex items-center px-4 overflow-hidden">
                {/* Road dashed center line */}
                <div className="absolute inset-x-0 h-1 border-t-2 border-dashed border-slate-700 top-1/2 -translate-y-1/2" />

                {/* Car Sprite on Road */}
                <div
                  className="absolute transition-all duration-150 flex flex-col items-center"
                  style={{
                    left: `${Math.min(88, Math.max(5, (timeT / 6.0) * 85))}%`,
                  }}
                >
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/50">
                    <Car className="w-6 h-6 transform scale-x-[-1]" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold mt-1 bg-black/60 px-1 rounded">
                    s = {carData.sStart.toFixed(0)}m
                  </span>
                </div>

                {/* Interval Destination marker Q */}
                <div
                  className="absolute opacity-60 border-l-2 border-dashed border-cyan-400 h-full flex flex-col justify-end pb-1 pl-1"
                  style={{
                    left: `${Math.min(94, Math.max(8, ((timeT + deltaT) / 6.0) * 85))}%`,
                  }}
                >
                  <span className="text-[9px] font-mono text-cyan-400">
                    t+Δt ({carData.sEnd.toFixed(0)}m)
                  </span>
                </div>
              </div>

              {/* Explanation Quote from User Script */}
              <blockquote className="p-3 rounded-xl bg-blue-950/40 border-l-4 border-blue-500 text-xs sm:text-sm text-slate-300 italic">
                &ldquo;Si viajas en auto, el <strong>cociente de Newton</strong> te permite calcular la <strong>velocidad promedio</strong> de un viaje (distancia total entre tiempo total). Pero el <strong>límite</strong> de ese cociente cuando Δt tiende a 0 es exactamente lo que marca la aguja del <strong>velocímetro</strong> en un segundo exacto (velocidad instantánea).&rdquo;
              </blockquote>
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Segundo en el tiempo (t):</span>
                  <span className="font-mono font-bold text-amber-300">{timeT.toFixed(1)} s</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.1"
                  value={timeT}
                  onChange={(e) => setTimeT(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Intervalo de tiempo (Δt o h):</span>
                  <span className="font-mono font-bold text-cyan-300">{deltaT.toFixed(2)} s</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="3.0"
                  step="0.05"
                  value={deltaT}
                  onChange={(e) => setDeltaT(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0.05s (Instantáneo)</span>
                  <span>3.00s (Largo plazo)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Speedometer & Comparative Metrics (Right 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Speedometer Gauge Card */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col items-center text-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-slate-400 mb-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span>Velocímetro en Vivo (Derivada)</span>
              </div>

              {/* Dial visual */}
              <div className="relative w-40 h-24 my-2 flex items-end justify-center overflow-hidden">
                {/* Semicircle track */}
                <div className="absolute inset-0 rounded-t-full border-[10px] border-slate-800 border-b-0" />
                {/* Active speed color */}
                <div className="text-center z-10 pb-1">
                  <div className="text-3xl font-extrabold font-mono text-emerald-400">
                    {carData.instantVelocityKmh.toFixed(0)}
                  </div>
                  <span className="text-[11px] uppercase font-mono text-slate-400 tracking-wider">
                    km/h
                  </span>
                </div>
              </div>

              <span className="text-xs text-emerald-300 font-mono mt-1 font-semibold">
                v_inst = s&apos;(t) = 10({timeT.toFixed(1)}) = {carData.instantVelocityMs.toFixed(1)} m/s
              </span>
            </div>

            {/* Comparison Cards */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40">
                <span className="text-[11px] text-cyan-300 font-medium block">
                  Velocidad Promedio (Cociente de Newton)
                </span>
                <div className="text-lg font-bold font-mono text-cyan-200 mt-0.5">
                  {carData.avgVelocityKmh.toFixed(1)} km/h{' '}
                  <span className="text-xs text-slate-400">({carData.avgVelocityMs.toFixed(1)} m/s)</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  v_prom = Δs / Δt = {carData.deltaDistance.toFixed(1)}m / {deltaT.toFixed(2)}s
                </span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                <span className="text-[11px] text-emerald-300 font-medium block">
                  Velocidad Instantánea (Límite cuando Δt → 0)
                </span>
                <div className="text-lg font-bold font-mono text-emerald-200 mt-0.5">
                  {carData.instantVelocityKmh.toFixed(1)} km/h{' '}
                  <span className="text-xs text-slate-400">({carData.instantVelocityMs.toFixed(1)} m/s)</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  lim(Δt→0) [s(t+Δt) - s(t)] / Δt
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulator 2: ECONOMICS & MARGINAL COST */}
      {activeTab === 'economics' && (
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-amber-400 font-semibold">
                  Función de Costo: C(x) = 500 + 20x + 0.1x² USD
                </span>
                <span className="font-mono">
                  x = {unitsX} unidades
                </span>
              </div>

              {/* Visual Factory / Production Bar */}
              <div className="my-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                  <span>Volumen de producción actual: <strong>{unitsX} artículos</strong></span>
                  <span className="text-amber-400 font-mono font-bold">
                    Costo Total: ${econData.costX.toFixed(2)} USD
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full transition-all duration-200"
                    style={{ width: `${(unitsX / 200) * 100}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
                  <span>Incremento proyectado: <strong>+{deltaH} unidades extra</strong></span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-emerald-400 font-mono">
                    Nuevo Costo: ${econData.costXPlusH.toFixed(2)} USD
                  </span>
                </div>
              </div>

              <blockquote className="p-3 rounded-xl bg-amber-950/40 border-l-4 border-amber-500 text-xs sm:text-sm text-slate-300 italic">
                &ldquo;Las empresas lo usan para calcular cuánto aumenta el <strong>costo total de producción</strong> al fabricar una unidad adicional de un producto (<strong>Costo Marginal</strong>). Esto decide el precio óptimo de venta y la rentabilidad del negocio.&rdquo;
              </blockquote>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Unidades Fabricadas (x):</span>
                  <span className="font-mono font-bold text-amber-300">{unitsX}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="180"
                  step="5"
                  value={unitsX}
                  onChange={(e) => setUnitsX(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Lote adicional (h):</span>
                  <span className="font-mono font-bold text-cyan-300">{deltaH} unidades</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={deltaH}
                  onChange={(e) => setDeltaH(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>h = 1 (Exactamente 1 unidad más)</span>
                  <span>h = 25 (Lote grande)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Economics Metrics (Right 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
              <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/40">
                <span className="text-xs text-amber-300 font-medium block">
                  Costo Marginal Exacto C&apos;(x)
                </span>
                <div className="text-2xl font-bold font-mono text-amber-200 mt-1">
                  ${econData.exactMarginalCost.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-slate-400">USD/unidad</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono block mt-1">
                  C&apos;({unitsX}) = 20 + 0.2({unitsX})
                </span>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40">
                <span className="text-xs text-cyan-300 font-medium block">
                  Costo Promedio del Lote (Cociente)
                </span>
                <div className="text-2xl font-bold font-mono text-cyan-200 mt-1">
                  ${econData.avgMarginalCost.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-slate-400">USD/unidad</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono block mt-1">
                  ΔC / h = ${econData.deltaCost.toFixed(1)} / {deltaH}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                💡 Al hacer <span className="font-mono text-cyan-300 font-bold">h = 1</span> o tender a 0, el costo promedio por unidad del lote se convierte en el <strong>Costo Marginal exacto</strong> de la siguiente unidad fabricada.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simulator 3: BIOLOGY & BACTERIA GROWTH */}
      {activeTab === 'biology' && (
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-emerald-400 font-semibold">
                  Población: P(t) = 100(1 + 0.5t + 0.08t²) bacterias
                </span>
                <span className="font-mono">
                  t = {bioT.toFixed(1)} horas
                </span>
              </div>

              {/* Petri Dish Graphic */}
              <div className="relative w-full h-44 bg-slate-900 rounded-xl border border-slate-800 my-2 flex items-center justify-center overflow-hidden">
                {/* Petri dish circle */}
                <div className="w-36 h-36 rounded-full border-4 border-slate-700 bg-slate-950 flex items-center justify-center relative shadow-inner">
                  {/* Scatter bacteria dots based on population size */}
                  {Array.from({ length: Math.min(60, Math.floor(bioData.popT / 12)) }).map(
                    (_, i) => {
                      const angle = (i * 137.5 * Math.PI) / 180;
                      const radius = Math.min(55, Math.sqrt(i) * 7.5);
                      const bx = 65 + radius * Math.cos(angle);
                      const by = 65 + radius * Math.sin(angle);
                      return (
                        <div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500"
                          style={{ left: `${bx}px`, top: `${by}px` }}
                        />
                      );
                    }
                  )}
                </div>

                <div className="absolute bottom-2 right-3 text-right">
                  <span className="text-xs text-slate-400">Total en la muestra:</span>
                  <div className="text-lg font-mono font-bold text-emerald-300">
                    {bioData.popT.toFixed(0)} bacterias
                  </div>
                </div>
              </div>

              <blockquote className="p-3 rounded-xl bg-emerald-950/40 border-l-4 border-emerald-500 text-xs sm:text-sm text-slate-300 italic">
                &ldquo;En Biología, permite medir la <strong>tasa de crecimiento de una población bacteriana</strong> de manera precisa en un momento determinado, para evaluar la efectividad de antibióticos o nutrientes.&rdquo;
              </blockquote>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Tiempo de Cultivo (t):</span>
                  <span className="font-mono font-bold text-emerald-300">{bioT.toFixed(1)} h</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8.0"
                  step="0.5"
                  value={bioT}
                  onChange={(e) => setBioT(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Ventana de tiempo (h):</span>
                  <span className="font-mono font-bold text-cyan-300">{bioH.toFixed(1)} h</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={bioH}
                  onChange={(e) => setBioH(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0.1 h (Tasa instantánea)</span>
                  <span>3.0 h (Promedio)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biology Metrics (Right 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                <span className="text-xs text-emerald-300 font-medium block">
                  Tasa de Crecimiento Instantánea P&apos;(t)
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-200 mt-1">
                  +{bioData.exactGrowthRate.toFixed(1)}{' '}
                  <span className="text-xs font-normal text-slate-400">bacterias/hora</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono block mt-1">
                  P&apos;({bioT}) = 100(0.5 + 0.16·{bioT})
                </span>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40">
                <span className="text-xs text-cyan-300 font-medium block">
                  Tasa Promedio en el Intervalo (Cociente)
                </span>
                <div className="text-2xl font-bold font-mono text-cyan-200 mt-1">
                  +{bioData.avgGrowthRate.toFixed(1)}{' '}
                  <span className="text-xs font-normal text-slate-400">bacterias/hora</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono block mt-1">
                  ΔP / h = {bioData.deltaPop.toFixed(0)} / {bioH}h
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                🔬 El cociente nos dice cuántas bacterias aumentaron en promedio entre la hora {bioT} y la hora {(bioT + bioH).toFixed(1)}. La derivada nos da el ritmo celular en este mismo instante.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

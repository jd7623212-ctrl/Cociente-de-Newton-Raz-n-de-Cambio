/**
 * Core mathematical engine for Newton's Quotient and Rate of Change
 */

export interface MathFunctionDef {
  id: string;
  name: string;
  latex: string;
  displayFormula: string;
  fn: (x: number) => number;
  derivative: (x: number) => number;
  derivativeFormula: string;
  domain: [number, number];
  defaultX: number;
  defaultH: number;
  description: string;
}

export const PRESET_FUNCTIONS: MathFunctionDef[] = [
  {
    id: 'quadratic',
    name: 'Parábola Básica',
    latex: 'f(x) = x^2',
    displayFormula: 'f(x) = x²',
    fn: (x: number) => x * x,
    derivative: (x: number) => 2 * x,
    derivativeFormula: "f'(x) = 2x",
    domain: [-4, 4],
    defaultX: 1.5,
    defaultH: 1.2,
    description: 'La función del ejemplo principal del guion. Demuestra cómo el límite de (2x + h) cuando h tiende a 0 es exactamente 2x.',
  },
  {
    id: 'cubic',
    name: 'Curva Cúbica',
    latex: 'f(x) = 0.2x^3 - x + 1',
    displayFormula: 'f(x) = 0.2x³ - x + 1',
    fn: (x: number) => 0.2 * Math.pow(x, 3) - x + 1,
    derivative: (x: number) => 0.6 * Math.pow(x, 2) - 1,
    derivativeFormula: "f'(x) = 0.6x² - 1",
    domain: [-3.5, 3.5],
    defaultX: 1.0,
    defaultH: 1.0,
    description: 'Tiene crestas y valles. Muestra cómo la pendiente cambia de positiva a negativa y cómo la recta secante se acomoda a la curvatura.',
  },
  {
    id: 'sqrt',
    name: 'Raíz Cuadrada',
    latex: 'f(x) = 2\\sqrt{x}',
    displayFormula: 'f(x) = 2√x',
    fn: (x: number) => (x >= 0 ? 2 * Math.sqrt(x) : 0),
    derivative: (x: number) => (x > 0 ? 1 / Math.sqrt(x) : 0),
    derivativeFormula: "f'(x) = 1 / √x",
    domain: [0, 6],
    defaultX: 2.0,
    defaultH: 1.0,
    description: 'Muestra una tasa de cambio decreciente: la curva crece rápido al inicio y se aplana conforme x avanza.',
  },
  {
    id: 'sin',
    name: 'Onda Senoidal',
    latex: 'f(x) = 2\\sin(x) + 2',
    displayFormula: 'f(x) = 2·sen(x) + 2',
    fn: (x: number) => 2 * Math.sin(x) + 2,
    derivative: (x: number) => 2 * Math.cos(x),
    derivativeFormula: "f'(x) = 2·cos(x)",
    domain: [-3.14, 6.28],
    defaultX: 0.5,
    defaultH: 1.2,
    description: 'Fenómenos periódicos y oscilaciones. La derivada oscila en fase con el coseno.',
  },
];

/**
 * Calculates Newton's difference quotient: (f(x + h) - f(x)) / h
 */
export function calculateNewtonQuotient(
  fn: (x: number) => number,
  x: number,
  h: number
): {
  fx: number;
  fxh: number;
  deltaY: number;
  deltaX: number;
  slopeSecant: number;
} {
  const safeH = Math.abs(h) < 1e-9 ? (h < 0 ? -1e-9 : 1e-9) : h;
  const fx = fn(x);
  const fxh = fn(x + safeH);
  const deltaY = fxh - fx;
  const slopeSecant = deltaY / safeH;

  return {
    fx,
    fxh,
    deltaY,
    deltaX: safeH,
    slopeSecant,
  };
}

/**
 * Computes difference error between secant slope and exact tangent slope
 */
export function calculateSlopeComparison(
  fn: (x: number) => number,
  derivativeFn: (x: number) => number,
  x: number,
  h: number
) {
  const quotient = calculateNewtonQuotient(fn, x, h);
  const slopeTangent = derivativeFn(x);
  const error = Math.abs(quotient.slopeSecant - slopeTangent);

  return {
    ...quotient,
    slopeTangent,
    error,
  };
}

/**
 * Step by step data for f(x) = x^2 algebraic expansion
 */
export interface AlgebraicStep {
  stepNumber: number;
  title: string;
  formula: string;
  explanation: string;
  tipOrNote?: string;
  mathHighlight?: string;
}

export function getQuadraticProofSteps(evaluatedX?: number): AlgebraicStep[] {
  const steps: AlgebraicStep[] = [
    {
      stepNumber: 1,
      title: 'Fórmula General del Cociente',
      formula: '\\frac{f(x + h) - f(x)}{h}',
      explanation:
        'Partimos de la definición universal de la razón de cambio promedio (la pendiente m = Δy / Δx).',
      tipOrNote: 'Representa la pendiente de la recta secante entre dos puntos cualquiera de la curva.',
      mathHighlight: 'Δy = f(x+h) - f(x),  Δx = h',
    },
    {
      stepNumber: 2,
      title: 'Evaluar la Función f(x) = x²',
      formula: '\\frac{(x + h)^2 - x^2}{h}',
      explanation:
        'Sustituimos la regla de correspondencia de nuestra función cuadrática: f(x) = x² y f(x+h) = (x+h)²',
      tipOrNote: 'Ojo común: No confundir (x + h)² con x² + h².',
      mathHighlight: 'f(x+h) = (x+h)²',
    },
    {
      stepNumber: 3,
      title: 'Desarrollar el Binomio al Cuadrado',
      formula: '\\frac{x^2 + 2xh + h^2 - x^2}{h}',
      explanation:
        'Aplicamos el producto notable: (x + h)² = x² + 2xh + h² en el numerador.',
      tipOrNote: 'El primer término al cuadrado, más el doble producto, más el segundo al cuadrado.',
      mathHighlight: '(x + h)² = x² + 2xh + h²',
    },
    {
      stepNumber: 4,
      title: 'Cancelar Términos Opuestos',
      formula: '\\frac{2xh + h^2}{h}',
      explanation:
        'Observa que en el numerador tenemos +x² y -x², los cuales se restan dando exactamente 0.',
      tipOrNote: 'x² - x² = 0. Nos libramos del término cuadrático independiente.',
      mathHighlight: 'x² - x² = 0',
    },
    {
      stepNumber: 5,
      title: 'Factorizar h en el Numerador',
      formula: '\\frac{h(2x + h)}{h}',
      explanation:
        'Como ambos términos remanentes tienen h como factor común (2xh y h²), sacamos h fuera del paréntesis.',
      tipOrNote: '¡Este es el paso clave para eliminar la indeterminación 0/0!',
      mathHighlight: '2xh + h² = h(2x + h)',
    },
    {
      stepNumber: 6,
      title: 'Simplificar h (Cancelar en Numerador y Denominador)',
      formula: '2x + h',
      explanation:
        'Como h todavía no es 0 (solo se acerca a él), podemos dividir h / h = 1 legítimamente.',
      tipOrNote: '¡Adiós denominador! Ya no hay peligro de división por cero.',
      mathHighlight: 'h / h = 1',
    },
    {
      stepNumber: 7,
      title: 'Aplicar el Límite cuando h → 0',
      formula: '\\lim_{h \\to 0} (2x + h) = 2x',
      explanation:
        'Hacemos que h se vuelva infinitesimalmente pequeño (h = 0 en el límite). El término h desaparece.',
      tipOrNote: 'Conclusión: La razón de cambio instantánea de x² es exactamente 2x.',
      mathHighlight: "f'(x) = 2x",
    },
  ];

  return steps;
}

/**
 * Kinematics application helper:
 * Position s(t) = 5t² (meters)
 * Velocity v(t) = s'(t) = 10t (m/s) -> in km/h: 10t * 3.6 = 36t km/h
 */
export function calculateCarKinematics(t: number, deltaT: number) {
  const s = (time: number) => 5 * time * time;
  const sStart = s(t);
  const sEnd = s(t + deltaT);
  const deltaDistance = sEnd - sStart;
  const avgVelocityMs = deltaT > 0 ? deltaDistance / deltaT : 0;
  const instantVelocityMs = 10 * t;

  return {
    t,
    deltaT,
    sStart,
    sEnd,
    deltaDistance,
    avgVelocityMs,
    avgVelocityKmh: avgVelocityMs * 3.6,
    instantVelocityMs,
    instantVelocityKmh: instantVelocityMs * 3.6,
  };
}

/**
 * Economics application helper:
 * Cost function C(x) = 500 + 20x + 0.1x² (USD)
 * Marginal Cost C'(x) = 20 + 0.2x
 */
export function calculateMarginalCost(x: number, h: number) {
  const costFn = (units: number) => 500 + 20 * units + 0.1 * units * units;
  const costX = costFn(x);
  const costXPlusH = costFn(x + h);
  const deltaCost = costXPlusH - costX;
  const avgMarginalCost = h > 0 ? deltaCost / h : 0;
  const exactMarginalCost = 20 + 0.2 * x;

  return {
    x,
    h,
    costX,
    costXPlusH,
    deltaCost,
    avgMarginalCost,
    exactMarginalCost,
  };
}

/**
 * Biology application helper:
 * Bacteria Population P(t) = 100 * (1 + 0.5t + 0.08t²)
 * Rate P'(t) = 100 * (0.5 + 0.16t)
 */
export function calculateBacteriaGrowth(t: number, h: number) {
  const popFn = (hours: number) => 100 * (1 + 0.5 * hours + 0.08 * hours * hours);
  const popT = popFn(t);
  const popTPlusH = popFn(t + h);
  const deltaPop = popTPlusH - popT;
  const avgGrowthRate = h > 0 ? deltaPop / h : 0;
  const exactGrowthRate = 100 * (0.5 + 0.16 * t);

  return {
    t,
    h,
    popT,
    popTPlusH,
    deltaPop,
    avgGrowthRate,
    exactGrowthRate,
  };
}

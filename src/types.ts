export interface TeamMember {
  id: string;
  name: string;
  role: string;
  assignedTopic: string;
  assignedSlideNumber: number;
  customNotes?: string;
  avatarColor: string;
  avatarInitial: string;
}

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Manuela',
    role: 'Apertura y Contexto',
    assignedTopic: 'Diapositiva 1: Portada y Apertura',
    assignedSlideNumber: 1,
    customNotes:
      'Dar la bienvenida al profesor y al aula con tono seguro y presentar formalmente al grupo.',
    avatarColor: 'from-pink-500 to-rose-600',
    avatarInitial: 'M',
  },
  {
    id: 'member-2',
    name: 'Liceth',
    role: 'Concepto y Fórmula',
    assignedTopic: 'Diapositiva 2: ¿Qué es el Cociente de Newton?',
    assignedSlideNumber: 2,
    customNotes:
      'Explicar qué significa cada letra: x (inicio), h (avance) y cómo se parece a m=(y2-y1)/(x2-x1).',
    avatarColor: 'from-purple-500 to-indigo-600',
    avatarInitial: 'L',
  },
  {
    id: 'member-3',
    name: 'Miguel',
    role: 'Interpretación Geométrica',
    assignedTopic: 'Diapositiva 3: Interpretación Geométrica (Secante a Tangente)',
    assignedSlideNumber: 3,
    customNotes:
      'Usar el simulador interactivo para mostrar cómo al mover el deslizador h a cero la recta secante se vuelve tangente.',
    avatarColor: 'from-blue-500 to-cyan-600',
    avatarInitial: 'M',
  },
  {
    id: 'member-4',
    name: 'Juan Camilo',
    role: 'Demostración Práctica',
    assignedTopic: 'Diapositiva 4: Demostración en el Tablero (f(x) = x²)',
    assignedSlideNumber: 4,
    customNotes:
      'Guiar los 7 pasos algebraicos en la pizarra y destacar por qué factorizamos h para evitar el 0/0.',
    avatarColor: 'from-emerald-500 to-teal-600',
    avatarInitial: 'JC',
  },
  {
    id: 'member-5',
    name: 'Juan David',
    role: 'Aplicaciones y Conclusiones',
    assignedTopic: 'Diapositiva 5: Aplicaciones Reales (Física, Economía, Biología)',
    assignedSlideNumber: 5,
    customNotes:
      'Conectar la matemática con el mundo real: velocidad media vs velocímetro y abrir el quiz final.',
    avatarColor: 'from-amber-500 to-orange-600',
    avatarInitial: 'JD',
  },
];

// Backwards compatibility alias
export const TEAM_MEMBERS = DEFAULT_TEAM_MEMBERS;

export interface ConceptDefinition {
  id: string;
  term: string;
  shortSummary: string; // Brief, substantive summary (1-2 sentences)
  keyTakeaway: string;  // The essential takeaway
  mathFormula?: string;
  category: 'fundamento' | 'geometria' | 'algebra' | 'aplicacion' | 'avanzado';
  icon: string;
}

export const CORE_CONCEPTS: ConceptDefinition[] = [
  {
    id: 'razon-de-cambio',
    term: 'Razón de Cambio',
    shortSummary:
      'Mide la rapidez o ritmo con la que cambia una cantidad cuando otra cambia. Responde a la pregunta: ¿cuánto cambia "y" por cada unidad que avanza "x"?',
    keyTakeaway:
      'Es el ritmo de un fenómeno: rapidez de un auto, subida de la temperatura o costo de producción.',
    mathFormula: 'Δy / Δx = (Cambio en y) / (Cambio en x)',
    category: 'fundamento',
    icon: '⚡',
  },
  {
    id: 'cociente-newton',
    term: 'Cociente de Newton',
    shortSummary:
      'Es la fórmula matemática universal que calcula la razón de cambio promedio entre un punto x y un punto x + h.',
    keyTakeaway:
      'No es más que la pendiente de la recta secante: altura final menos altura inicial sobre distancia horizontal recorrida.',
    mathFormula: '[f(x + h) - f(x)] / h',
    category: 'fundamento',
    icon: '📐',
  },
  {
    id: 'incremento-h',
    term: 'Incremento h (o Δx)',
    shortSummary:
      'Es la pequeña distancia horizontal o paso que sumamos al punto de partida x. Marca la separación entre los dos puntos evaluados.',
    keyTakeaway:
      'Cuando h es grande medimos un promedio a largo plazo; cuando h tiende a 0 medimos lo que pasa en ese instante exacto.',
    mathFormula: 'h = x2 - x1 = Δx',
    category: 'algebra',
    icon: '⏩',
  },
  {
    id: 'recta-secante',
    term: 'Recta Secante',
    shortSummary:
      'Línea recta que corta o atraviesa la gráfica de la función en dos puntos distintos.',
    keyTakeaway:
      'Su pendiente representa la razón de cambio promedio (ej. velocidad promedio de un viaje completo de 2 horas).',
    mathFormula: 'm_sec = [f(x+h) - f(x)] / h',
    category: 'geometria',
    icon: '📏',
  },
  {
    id: 'el-limite',
    term: 'El Límite cuando h → 0',
    shortSummary:
      'El procedimiento matemático que analiza qué valor toma el cociente cuando h se vuelve infinitamente cercano a 0 sin ser exactamente cero.',
    keyTakeaway:
      'Es el puente mágico inventado por Newton para pasar de una aproximación promedio a una exactitud instantánea.',
    mathFormula: 'lim (h → 0) [f(x+h) - f(x)] / h',
    category: 'fundamento',
    icon: '🎯',
  },
  {
    id: 'recta-tangente',
    term: 'Recta Tangente',
    shortSummary:
      'Línea recta que toca a la curva en un único punto sin atravesarla en esa vecindad.',
    keyTakeaway:
      'Es el destino final de la recta secante cuando h llega a cero. Su pendiente es la derivada exacta.',
    mathFormula: 'y - f(x) = f\'(x)·(X - x)',
    category: 'geometria',
    icon: '✨',
  },
  {
    id: 'razon-instantanea-derivada',
    term: 'Razón Instantánea (La Derivada)',
    shortSummary:
      'Es el valor del límite del cociente de Newton. Mide la tasa de cambio en un único instante puntual (tiempo t exacto o punto x exacto).',
    keyTakeaway:
      'Es lo que marca el velocímetro en este mismo segundo exacto, no el promedio del viaje.',
    mathFormula: 'f\'(x) = dy / dx',
    category: 'fundamento',
    icon: '🚀',
  },
  {
    id: 'indeterminacion-cero',
    term: 'Indeterminación 0/0 (Por qué factorizamos)',
    shortSummary:
      'Si sustituyéramos h = 0 directamente al inicio, obtendríamos (f(x) - f(x)) / 0 = 0/0, lo cual no tiene significado aritmético.',
    keyTakeaway:
      'Por eso desarrollamos el álgebra: cancelamos términos opuestos y simplificamos h/h=1 antes de hacer h=0.',
    mathFormula: '0 / 0  → ¡Factorizar y simplificar!',
    category: 'algebra',
    icon: '🛡️',
  },
  {
    id: 'tfc-parte-1',
    term: 'Teorema Fundamental del Cálculo (Parte 1)',
    shortSummary:
      'Establece que si definimos F(x) como el área acumulada bajo f(t) desde a hasta x, la derivada de esa acumulación F\'(x) es exactamente la función original f(x).',
    keyTakeaway:
      'Derivar deshace la integración: la velocidad a la que crece el área acumulada en x es exactamente la altura de la curva en ese punto.',
    mathFormula: 'd/dx [ ∫_a^x f(t) dt ] = f(x)',
    category: 'avanzado',
    icon: '🏛️',
  },
  {
    id: 'tfc-parte-2',
    term: 'Teorema Fundamental del Cálculo (Parte 2: Barrow)',
    shortSummary:
      'Permite calcular integrales definidas evaluando la diferencia de cualquier antiderivada F en los extremos del intervalo: F(b) - F(a).',
    keyTakeaway:
      'Conecta el problema geométrico de calcular áreas curvas con la búsqueda de funciones cuya derivada conocemos.',
    mathFormula: '∫_a^b f(x) dx = F(b) - F(a), donde F\'(x) = f(x)',
    category: 'avanzado',
    icon: '⚖️',
  },
  {
    id: 'conexion-newton-tfc',
    term: 'Conexión: Cociente de Newton y el TFC',
    shortSummary:
      'Para demostrar el TFC se usa el cociente de Newton: [F(x+h) - F(x)]/h representa el área de una franja delgada de ancho h dividida entre su base h, dando la altura promedio. Cuando h → 0, ¡esa altura promedio se convierte en la altura exacta f(x)!',
    keyTakeaway:
      'El Cociente de Newton es el corazón matemático que demuestra formalmente por qué la derivada es el inverso de la integral.',
    mathFormula: 'lim (h → 0) [F(x+h) - F(x)] / h = f(x)',
    category: 'avanzado',
    icon: '🔗',
  },
  {
    id: 'diferenciabilidad-continuidad',
    term: 'Diferenciabilidad y Continuidad',
    shortSummary:
      'Toda función derivable en un punto x₀ es obligatoriamente continua allí. El recíproco no siempre se cumple: existen funciones continuas que no tienen derivada en puntos con esquinas o picos.',
    keyTakeaway:
      'Para que el cociente de Newton tenga límite finito, la gráfica no puede tener saltos, asíntotas ni cambios bruscos de dirección en ese punto.',
    mathFormula: 'f derivable en x₀ ⟹ f continua en x₀',
    category: 'avanzado',
    icon: '🛡️',
  },
];

export interface SlideScript {
  slideNumber: number;
  slideTitle: string;
  speakers: string[];
  speechText: string;
  keyPoints: string[];
  teacherImpressionTips: string[];
}

export const SLIDE_SCRIPTS: SlideScript[] = [
  {
    slideNumber: 1,
    slideTitle: 'Portada y Presentación',
    speakers: ['Manuela', 'Grupo'],
    speechText:
      'Buenos días profesor y compañeros. Nuestro grupo está conformado por Manuela, Liceth, Miguel, Juan Camilo y Juan David. Hoy les vamos a explicar un concepto fundamental del cálculo: El Cociente de Newton y su relación con la Razón de Cambio.',
    keyPoints: [
      'Saludar con seguridad y modular la voz.',
      'Presentar a todos los compañeros del equipo.',
      'Declarar claramente el tema central: Cociente de Newton y Razón de Cambio.',
    ],
    teacherImpressionTips: [
      'Mencionar que este concepto conecta el álgebra de bachillerato (pendiente de rectas) con la cúspide del cálculo diferencial.',
    ],
  },
  {
    slideNumber: 2,
    slideTitle: '¿Qué es el Cociente de Newton?',
    speakers: ['Liceth', 'Manuela'],
    speechText:
      'El cociente de Newton, también conocido como cociente de diferencias, es la fórmula matemática que mide cuánto cambia una función (y) en promedio por cada unidad que avanza la variable independiente (x). Históricamente, Isaac Newton lo formuló en el siglo XVII para explicar el cambio continuo, marcando el nacimiento del Cálculo Diferencial. Como pueden ver, no es más que la clásica fórmula de la pendiente: cambio en y dividido entre cambio en x.',
    keyPoints: [
      'Explicar el desglose: x es el punto de partida, h es el incremento horizontal.',
      'f(x) y f(x+h) son las alturas o valores dependientes.',
      'Mostrar que (f(x+h) - f(x)) / h equivale a Δy / Δx (la pendiente).',
    ],
    teacherImpressionTips: [
      'Dato histórico: Newton se retiró a Woolsthorpe Manor durante la Gran Peste de 1665 y allí ideó el método de fluxiones.',
      'Aclarar que en otras bibliografías se usa Δx en lugar de h.',
    ],
  },
  {
    slideNumber: 3,
    slideTitle: 'Interpretación Geométrica: De la Secante a la Tangente',
    speakers: ['Miguel'],
    speechText:
      'Geométricamente, si tomamos dos puntos sobre la curva y los unimos con una línea recta, tenemos una recta secante. La pendiente de esa secante es la razón de cambio promedio. Pero aquí viene el truco genial de Newton: si hacemos que h se acerque a cero (h → 0), el segundo punto viaja sobre la curva hacia el primero. La secante gira y se convierte exactamente en la recta tangente. Esa pendiente instantánea es la derivada f\'(x).',
    keyPoints: [
      'Paso 1: La recta secante corta la curva en dos puntos (promedio).',
      'Paso 2: El límite cuando h se hace microscópico (h → 0).',
      'Paso 3: La recta tangente toca la curva en un solo punto exacto (instantáneo = derivada).',
    ],
    teacherImpressionTips: [
      'Mostrar en el simulador en vivo cómo al mover el deslizador h a cero, el error se reduce a 0 y la pendiente secante iguala a f\'(x).',
    ],
  },
  {
    slideNumber: 4,
    slideTitle: 'Demostración Práctica Paso a Paso (El Tablero)',
    speakers: ['Juan Camilo'],
    speechText:
      'Vamos a demostrarlo en vivo con la función más elegante: f(x) = x². Escribimos la fórmula del cociente, sustituimos f(x+h) = (x+h)², expandimos el binomio en x² + 2xh + h², cancelamos los x² opuestos, factorizamos la h del numerador para poder eliminar la indeterminación, y al aplicar el límite cuando h tiende a 0, nos queda simplemente 2x. ¡Así de directo!',
    keyPoints: [
      'Desarrollo algebraico sin saltarse pasos.',
      'Explicar por qué se factoriza h (evitar división por cero 0/0).',
      'Concluir con firmeza: f\'(x) = 2x para cualquier punto x.',
    ],
    teacherImpressionTips: [
      'Demostrar con un ejemplo numérico: Si x = 3, la pendiente de la recta tangente en esa parábola es exactamente 2(3) = 6.',
    ],
  },
  {
    slideNumber: 5,
    slideTitle: 'Aplicaciones en el Mundo Real',
    speakers: ['Juan David'],
    speechText:
      'Esto no se queda solo en el papel, lo usamos todos los días. En Física, la razón de cambio promedio es la velocidad media de un viaje, pero el límite cuando el tiempo tiende a cero es lo que marca la aguja del velocímetro en este preciso segundo. En Economía, es el Costo Marginal: cuánto cuesta producir una unidad más. Y en Biología, permite calcular la velocidad exacta con la que se multiplica una bacteria en un instante dado.',
    keyPoints: [
      'Física: Velocidad media vs Velocímetro instantáneo (ds/dt).',
      'Economía: Costo total vs Costo Marginal de la unidad adicional.',
      'Biología: Tasa de crecimiento poblacional instantáneo.',
    ],
    teacherImpressionTips: [
      'Cerrar la exposición agradeciendo al profesor y al auditorio, abriendo ronda de preguntas.',
    ],
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Qué representa geométricamente el Cociente de Newton ANTES de aplicar el límite?',
    options: [
      'La pendiente de la recta secante (razón de cambio promedio)',
      'La recta tangente en un único punto',
      'El área bajo la curva de la función',
      'El valor máximo absoluto de la gráfica',
    ],
    correctIndex: 0,
    explanation:
      '¡Exacto! El cociente [f(x+h) - f(x)] / h mide la pendiente de la recta secante que une los dos puntos (x, f(x)) y (x+h, f(x+h)).',
  },
  {
    id: 2,
    question: '¿Qué sucede con la recta secante cuando hacemos que h tienda a cero (h → 0)?',
    options: [
      'Desaparece por una división entre cero insalvable',
      'Se convierte en una recta horizontal siempre de pendiente cero',
      'Gira y se convierte en la recta tangente en el punto x',
      'Se vuelve una asíntota vertical',
    ],
    correctIndex: 2,
    explanation:
      '¡Correcto! Al acercar el segundo punto al primero, la recta secante rota hasta posarse como la recta tangente, cuya pendiente es la derivada f\'(x).',
  },
  {
    id: 3,
    question: 'Si aplicamos el cociente de Newton a f(x) = x², ¿cuál es el resultado de lim(h→0) (2x + h)?',
    options: ['2', '2x', 'x²', '0'],
    correctIndex: 1,
    explanation:
      '¡Correcto! Al sustituir h = 0 en (2x + h), obtenemos 2x. Por eso la derivada de x² es 2x.',
  },
  {
    id: 4,
    question: 'En un auto en movimiento, ¿qué instrumento del tablero mide la razón de cambio INSTANTÁNEA de la posición?',
    options: [
      'El odómetro total de kilómetros recorridos',
      'El indicador del nivel de combustible',
      'El velocímetro en ese segundo exacto',
      'El termómetro del motor',
    ],
    correctIndex: 2,
    explanation:
      '¡Brillante! El velocímetro indica el límite de Δs/Δt cuando Δt tiende a 0: la velocidad instantánea.',
  },
  {
    id: 5,
    question: '¿Por qué no podemos simplemente sustituir h = 0 en [f(x+h) - f(x)] / h al principio?',
    options: [
      'Porque produce la indeterminación 0/0',
      'Porque Newton lo prohibió por ley física',
      'Porque la función siempre se vuelve negativa',
      'Porque daría infinito obligatoriamente',
    ],
    correctIndex: 0,
    explanation:
      '¡Exacto! Si h = 0, tendríamos [f(x) - f(x)] / 0 = 0/0, lo cual es una indeterminación matemática que requiere simplificación algebraica.',
  },
  {
    id: 6,
    question: 'En la función f(x) = x², ¿cuál es la pendiente de la recta tangente en el punto exacto x = 3?',
    options: ['3', '6', '9', '2'],
    correctIndex: 1,
    explanation:
      '¡Muy bien! Como la derivada es f\'(x) = 2x, al evaluar en x = 3 obtenemos f\'(3) = 2(3) = 6.',
  },
  {
    id: 7,
    question: 'En el cociente de Newton, ¿qué representa la expresión del numerador: f(x + h) - f(x)?',
    options: [
      'El cambio vertical neto de la función (Δy)',
      'La distancia horizontal recorrida (Δx)',
      'El área del triángulo de incrementos',
      'El tiempo transcurrido',
    ],
    correctIndex: 0,
    explanation:
      '¡Correcto! f(x+h) - f(x) es la variación en las alturas de la función (el cambio en el eje dependiente y, o Δy).',
  },
  {
    id: 8,
    question: 'En Economía y Administración de Empresas, ¿qué nombre recibe la derivada de la función de costo total C(x)?',
    options: [
      'Costo Marginal',
      'Utilidad Neta Bruta',
      'Punto de Equilibrio Contable',
      'Interés Compuesto',
    ],
    correctIndex: 0,
    explanation:
      '¡Así es! El Costo Marginal C\'(x) mide la razón instantánea con la que aumenta el costo total al fabricar una unidad adicional.',
  },
  {
    id: 9,
    question: 'Si un vehículo viaja 180 km en 3 horas a diferentes velocidades, ¿qué representa el cálculo 180 km / 3 h = 60 km/h?',
    options: [
      'La velocidad instantánea constante en todo momento',
      'La velocidad promedio del viaje completo',
      'La aceleración instantánea del motor',
      'La velocidad máxima alcanzada en carretera',
    ],
    correctIndex: 1,
    explanation:
      '¡Exacto! Es la velocidad promedio (razón de cambio promedio). El conductor pudo ir a 100 km/h o detenerse en semáforos durante el trayecto.',
  },
  {
    id: 10,
    question: '¿Quiénes fueron los dos genios matemáticos que desarrollaron el cálculo diferencial de forma independiente en el siglo XVII?',
    options: [
      'Isaac Newton y Gottfried Wilhelm Leibniz',
      'René Descartes y Pitágoras',
      'Albert Einstein y Galileo Galilei',
      'Arquímedes y Euclides',
    ],
    correctIndex: 0,
    explanation:
      '¡Correcto! Newton con su método de las "fluxiones" y Leibniz con la notación diferencial que usamos hoy (dy/dx).',
  },
  {
    id: 11,
    question: '¿Cuál es la relación geométrica entre la recta secante y la curva?',
    options: [
      'Corta a la curva en al menos dos puntos diferentes',
      'Toca a la curva en un solo punto sin atravesarla',
      'Nunca toca la curva',
      'Siempre es perpendicular al eje horizontal',
    ],
    correctIndex: 0,
    explanation:
      '¡Correcto! Por definición geométrica, la secante atraviesa la gráfica en dos puntos: (x, f(x)) y (x+h, f(x+h)).',
  },
  {
    id: 12,
    question: 'Si la posición de un móvil está dada por s(t) = 5t², ¿cuál es su función de velocidad instantánea v(t) = s\'(t)?',
    options: ['5t', '10t', '10t²', '2.5t'],
    correctIndex: 1,
    explanation:
      '¡Brillante! Como la derivada de t² es 2t, entonces s\'(t) = 5 · (2t) = 10t.',
  },
  {
    id: 13,
    question: '¿Qué paso algebraico específico permite cancelar la indeterminación en f(x) = x² antes de evaluar h → 0?',
    options: [
      'Factorizar la h como factor común en el numerador: h(2x + h)',
      'Multiplicar por cero el numerador y denominador',
      'Elevar al cuadrado el denominador',
      'Reemplazar la x por un número negativo',
    ],
    correctIndex: 0,
    explanation:
      '¡Exacto! Al factorizar h(2x + h) en el numerador, se cancela con la h del denominador (h/h = 1), dejando 2x + h sin riesgo de división por cero.',
  },
  {
    id: 14,
    question: 'En un cultivo biológico de bacterias, ¿qué información aporta la derivada P\'(t)?',
    options: [
      'El número total de bacterias que han existido en la historia',
      'El ritmo o velocidad exacta de multiplicación celular en el instante t',
      'El peso exacto de la placa de Petri',
      'La temperatura ambiente del laboratorio',
    ],
    correctIndex: 1,
    explanation:
      '¡Muy bien! P\'(t) indica la tasa instantánea con la que nacen o mueren bacterias en cada hora o minuto específico.',
  },
  {
    id: 15,
    question: 'Para que la derivada f\'(x) exista formalmente en un punto, ¿qué condición sobre los límites laterales debe cumplirse?',
    options: [
      'El límite cuando h → 0 por la derecha debe ser igual al límite por la izquierda',
      'El límite por la derecha debe ser mayor que el límite por la izquierda',
      'La función debe tener un pico o esquina punteaguda',
      'La función debe ser constante igual a cero',
    ],
    correctIndex: 0,
    explanation:
      '¡Excelente rigor matemático! La derivada existe solo si ambos límites laterales coinciden y son finitos; por eso las curvas suaves tienen derivada pero las esquinas en punta no.',
  },
];

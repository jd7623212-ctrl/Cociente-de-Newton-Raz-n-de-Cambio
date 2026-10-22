import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getLocalTutorResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('teorema fundamental') || q.includes('tfc') || q.includes('integral')) {
    return `### El Teorema Fundamental del Cálculo y el Cociente de Newton 🏛️

El Teorema Fundamental del Cálculo (TFC) demuestra que **la derivación y la integración son operaciones inversas**:
1. **Parte 1 (La Derivada de la Acumulación):** Si defines el área acumulada como $F(x) = \\int_a^x f(t) dt$, su razón instantánea de cambio es exactamente la función original:
   $$\\frac{d}{dx}\\left[\\int_a^x f(t) dt\\right] = f(x)$$
2. **Parte 2 (Regla de Barrow):** Para calcular el área bajo la curva, basta con evaluar una antiderivada:
   $$\\int_a^b f(x) dx = F(b) - F(a)$$

**La Conexión con Newton:** Para demostrar el TFC se utiliza exactamente el Cociente de Newton:
$$\\lim_{h \\to 0} \\frac{F(x+h) - F(x)}{h} = f(x)$$
La franja de ancho $h$ tiene área $F(x+h) - F(x)$. Al dividirla entre su base $h$, obtienes su altura promedio; al hacer $h \\to 0$, ¡esa altura promedio se convierte en la altura exacta de la curva $f(x)$!`;
  }

  if (q.includes('factorizar') || q.includes('factoriza') || q.includes('0/0') || q.includes('indetermina')) {
    return `### ¿Por qué factorizamos la $h$? 🛡️

Si sustituyeras $h = 0$ desde el principio en la fórmula de Newton:
$$\\frac{f(x+0) - f(x)}{0} = \\frac{f(x) - f(x)}{0} = \\frac{0}{0}$$
Obtienes una **indeterminación matemática** (división entre cero), la cual no tiene sentido aritmético.

**El rescate algebraico:**
1. Al expandir $(x+h)^2 = x^2 + 2xh + h^2$, los términos $x^2 - x^2$ se anulan.
2. Queda $2xh + h^2$. Ambos términos contienen $h$.
3. Factorizamos: $h(2x + h)$.
4. Cancelamos $\\frac{h}{h} = 1$ (lo cual es legal porque $h$ se acerca a cero pero *no es exactamente cero* durante el paso).
5. Nos queda $2x + h$. ¡Ahora sí es seguro sustituir $h=0$ para obtener la derivada final $2x$!`;
  }

  if (q.includes('auto') || q.includes('velocidad') || q.includes('velocímetro') || q.includes('carro')) {
    return `### Velocidad Promedio vs. Velocidad Instantánea 🚗

- **Velocidad Promedio (La Recta Secante):** Si viajas de Medellín a Bogotá (400 km) en 8 horas, tu velocidad promedio fue:
  $$\\frac{\\Delta s}{\\Delta t} = \\frac{400 \\text{ km}}{8 \\text{ h}} = 50 \\text{ km/h}$$
  Esto no significa que siempre fuiste a 50 km/h: pudiste parar a almorzar a 0 km/h o adelantar a 100 km/h.
- **Velocidad Instantánea (La Recta Tangente / Derivada):** Es el límite cuando el intervalo de tiempo tiende a cero ($\\Delta t \\to 0$):
  $$v(t) = s'(t) = \\lim_{\\Delta t \\to 0} \\frac{s(t+\\Delta t) - s(t)}{\\Delta t}$$
  ¡Es exactamente lo que marca la aguja del velocímetro en este segundo preciso!`;
  }

  if (q.includes('x^3') || q.includes('x3') || q.includes('cubica') || q.includes('cúbica')) {
    return `### Derivada de $f(x) = x^3$ mediante el Cociente de Newton 📐

1. Planteamos el cociente:
   $$\\frac{(x+h)^3 - x^3}{h}$$
2. Desarrollamos el binomio al cubo: $(x+h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$.
   $$\\frac{x^3 + 3x^2h + 3xh^2 + h^3 - x^3}{h}$$
3. Cancelamos $x^3 - x^3$:
   $$\\frac{3x^2h + 3xh^2 + h^3}{h}$$
4. Factorizamos $h$:
   $$\\frac{h(3x^2 + 3xh + h^2)}{h} = 3x^2 + 3xh + h^2$$
5. Aplicamos el límite cuando $h \\to 0$:
   $$\\lim_{h \\to 0} (3x^2 + 3xh + h^2) = 3x^2$$
¡La derivada de $x^3$ es $3x^2$!`;
  }

  if (q.includes('costo marginal') || q.includes('economía') || q.includes('empresa')) {
    return `### El Costo Marginal en Economía 💰

En una fábrica con función de costo total $C(x)$ para producir $x$ artículos:
- El **Costo Promedio de incremento** es $\\frac{C(x+\\Delta x) - C(x)}{\\Delta x}$.
- El **Costo Marginal** es la derivada instantánea:
  $$C'(x) = \\lim_{h \\to 0} \\frac{C(x+h) - C(x)}{h}$$
Representa el costo aproximado de fabricar **una unidad adicional**. Si el costo marginal es menor que el precio de venta en el mercado, ¡la empresa sabe que le conviene seguir produciendo!`;
  }

  return `### Tutoría sobre el Cociente de Newton y Razón de Cambio 💡

El **Cociente de Newton** es la base angular de todo el Cálculo Diferencial:
$$\\text{Razón de cambio promedio} = \\frac{f(x+h) - f(x)}{h}$$

Al acercar $h$ a cero ($\\lim_{h \\to 0}$), esa razón de cambio promedio se convierte en la **razón de cambio instantánea** (la derivada $f'(x)$), pasando geométricamente de una **recta secante** a una **recta tangente**.

**Preguntas frecuentes que puedes hacerme:**
- *¿Por qué factorizamos la $h$ para evitar la división por cero?*
- *¿Cómo se conecta el cociente de Newton con el Teorema Fundamental del Cálculo?*
- *¿Cómo calculo la derivada de $x^3$ paso a paso con el cociente?*
- *¿Cuál es la diferencia entre velocidad promedio y lo que marca el velocímetro?*
- *¿Qué consejos me das para lucirme en la exposición ante el profesor?*`;
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(path.join(distPath, 'index.html'));
  
  // Production mode if explicitly set, running in Cloud Run (K_SERVICE), or running start script with dist present
  const isExplicitDev = process.env.NODE_ENV === 'development' && !process.env.K_SERVICE && process.env.npm_lifecycle_event !== 'start';
  const isProd = process.env.NODE_ENV === 'production' || Boolean(process.env.K_SERVICE) || (hasDist && !isExplicitDev);

  console.log(`[App] Initializing server in ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} mode (port ${port})`);

  app.use(express.json());

  // Health check endpoints for Cloud Run / GCP probes
  app.get(['/healthz', '/api/health'], (_req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'Cociente de Newton - Interactive Guide',
      environment: isProd ? 'production' : 'development',
      time: new Date().toISOString(),
    });
  });

  // AI Tutor endpoint powered by Google Gemini API
  app.post('/api/tutor', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Mensaje requerido' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Instant high-quality pedagogical fallback when API key is pending
        return res.json({
          reply: getLocalTutorResponse(message),
          source: 'local-tutor',
        });
      }

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 3500)
      );

      const aiPromise = (async () => {
        const ai = new GoogleGenAI({ apiKey });
        return await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction:
              'Eres un Tutor IA pedagógico, motivador y riguroso de Cálculo Diferencial. Tu especialidad es el Cociente de Newton, la Razón de Cambio (promedio e instantánea), el paso de la Secante a la Tangente, la demostración de f(x)=x^2 en el tablero, las aplicaciones en Física, Economía y Biología, y el Teorema Fundamental del Cálculo (TFC). Responde en español, con explicaciones sustanciosas pero claras, usando analogías cotidianas y notación matemática limpia con formato Markdown. Si el usuario te pide ayuda para su exposición grupal (con Manuela, Liceth, Miguel, Juan Camilo o Juan David), dale consejos exactos de qué decir y cómo impresionar a su profesor.',
          },
        });
      })();

      const response = await Promise.race([aiPromise, timeoutPromise]);
      const reply = response?.text || getLocalTutorResponse(message);
      return res.json({
        reply,
        source: 'google-gemini',
      });
    } catch {
      // Immediate pedagogical fallback so user never encounters hangs or errors
      return res.json({
        reply: getLocalTutorResponse(req.body?.message || ''),
        source: 'local-fallback',
      });
    }
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`[App] Server listening on http://0.0.0.0:${port}`);
  });

  server.on('error', (err) => {
    console.error('[App] Critical Server Listen Error:', err);
  });

  process.on('SIGTERM', () => {
    console.log('[App] Received SIGTERM, shutting down gracefully...');
    server.close(() => {
      console.log('[App] Closed all connections.');
      process.exit(0);
    });
  });
}

startServer();

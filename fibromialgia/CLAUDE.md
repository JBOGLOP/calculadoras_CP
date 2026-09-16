# CLAUDE.md — Módulo de fibromialgia

Instrucciones permanentes para cualquier sesión de Claude que trabaje sobre `fibromialgia/index.html`.

## Contexto

- **Autor y docente:** Dr. Jorge Bogoya, médico especialista en dolor y cuidados paliativos. Docente de la Maestría en Cuidados Paliativos de la Universidad Antonio Nariño (UAN); trabaja en el Hospital Regional de Moniquirá.
- **Público:** estudiantes de la maestría con perfiles diversos (medicina, enfermería, terapia física, psicología) y clínicos en la práctica.
- **Propósito:** herramienta docente y clínica. Aplica los criterios ACR 2016 de fibromialgia (Wolfe et al.), los contrasta con la regla simplificada de la Figura 1 de Williams y Clauw (NEJM 2026) y organiza el resto del artículo en herramientas interactivas.
- **Idioma:** toda la interfaz, el contenido y la comunicación van en **español**.
- **Origen:** migrado desde `G:\Mi unidad\2. Moniquirá\Educacion_continuada\Fibromialgia\fibromialgia-criterios.html` el 16 de septiembre de 2026. La lógica diagnóstica se conservó sin cambios.

## Reglas no negociables

1. **La fuente de verdad del diagnóstico es Wolfe 2016**, no la Figura 1 del NEJM. Nunca reemplace la lógica de Wolfe por «FS > 13».
2. **La lógica diagnóstica exacta** (verificada contra el texto completo de Wolfe 2016, Tablas 3 y 4):
   - `criterioA = (WPI ≥ 7 && SSS ≥ 5) || (WPI 4–6 && SSS ≥ 9)`
   - `dolorGeneralizado = regiones positivas ≥ 4 de 5`. Una región es positiva solo si tiene al menos un sitio marcado que **no sea mandíbula, tórax ni abdomen**.
   - `duración ≥ 3 meses`
   - `Wolfe = criterioA && dolorGeneralizado && duración`
   - `NEJM (solo con fines de contraste) = dolorGeneralizado && FS > 13`
   - Un diagnóstico de fibromialgia es válido aunque existan otros diagnósticos.
3. **Escalas:**
   - **WPI (0–19)**, con 19 sitios en 5 regiones:
     - R1 superior izquierda: mandíbula, cintura escapular, brazo, antebrazo
     - R2 superior derecha: mandíbula, cintura escapular, brazo, antebrazo
     - R3 inferior izquierda: cadera (glúteo, trocánter), muslo, pierna
     - R4 inferior derecha: cadera (glúteo, trocánter), muslo, pierna
     - R5 axial: cuello, espalda alta, espalda baja, tórax, abdomen
   - **SSS (0–12):** fatiga, sueño no reparador y síntomas cognitivos de 0 a 3 cada uno. Cefalea, dolor o cólicos en abdomen inferior y depresión en los últimos 6 meses suman 1 punto cada uno.
   - **FS = WPI + SSS (0–31).** Es imposible cumplir los criterios con FS < 12, y el 92–96 % de quienes tienen FS ≥ 12 los cumplen. En un paciente con diagnóstico previo, un puntaje posterior < 12 puede usarse como medida de mejoría o del estado actual (Wolfe 2016).
4. **Verificación de citas:** toda cifra, umbral o cita debe rastrearse a su fuente primaria. No invente dosis, puntos de corte, diferencias mínimas clínicamente importantes ni referencias. Si algo no se puede verificar, márquelo como «por verificar».
5. **Advertencia clínica visible:** la herramienta apoya, pero no sustituye, el juicio clínico.
6. **Los datos de ejemplo se rotulan como ilustrativos.** Los puntajes del «Caso de la viñeta» se supusieron a partir del texto; el artículo no los reporta.
7. **Las Tablas 1 y 2 se transcriben tal como se publicaron**, incluidos sus errores. No corrija valores ni rótulos en el arreglo `EV`: la auditoría automática los detecta y los explica. Corregirlos en silencio destruiría el ejercicio de lectura crítica.
8. **Inferencias propias van rotuladas.** Todo lo que no esté en el artículo ni en Wolfe 2016 lleva la marca `inferencia docente`, `adaptación local` o `hipótesis`.
9. **Disponibilidad en Colombia:** solo con consulta al CUM vigente del INVIMA (datos.gov.co, conjunto `i7cb-raxc`) y con la fecha de consulta visible. Un registro vigente no garantiza comercialización.
10. **No se publican el PDF ni el PPTX del NEJM.** El repositorio es público y el artículo tiene derechos de autor; se cita con su DOI.

## Estructura de `index.html`

| Sección (`id`) | Contenido |
|---|---|
| `#contraste` | Tarjetas «Regla de la severidad (NEJM)» vs. «Criterios ACR 2016 (Wolfe)» |
| `#calculadora` | Herramienta 1: WPI (19 sitios), SSS, duración, panel de resultado y casos preestablecidos |
| `#mapa` | Cuadrícula WPI × SSS con la concordancia de ambas reglas |
| `#seguimiento` | Herramienta 2: FS basal vs. actual, sin umbral de cambio inventado |
| `#contexto` | Herramienta 3: condiciones de dolor crónico superpuestas y extensión del estudio / remisión |
| `#evidencia` | Herramienta 4: explorador filtrable de las 54 estimaciones de las Tablas 1 y 2, con auditoría automática |
| `#manejo` | Principios, terapia combinada, qué no usar y secuencia del caso adaptada a Colombia |
| `#tips`, `#critica`, `#seminario`, `#fuentes` | Contenido docente |

**Funciones JS clave** (todo dentro de una IIFE, JavaScript vanilla):

- `state()`, `wolfeA(w,s)`, `render()`, `drawMap()`, `load(k)`: calculadora diagnóstica.
- `renderSeguimiento()`: compara la FS basal con la actual.
- `renderCOPC()`, `renderWorkup()`: contexto clínico.
- `EV`: arreglo de las 54 estimaciones `[intervención, tipo, desenlace, rótulo, DME, límite 1, límite 2, tamaño publicado, ref, §]`. Los límites se guardan **en el orden publicado**.
- `auditar(r)`: detecta rótulos que contradicen los umbrales de la tabla, intervalos invertidos, intervalos asimétricos (> 0,05), intervalos que tocan 0 pese a «P < 0,05» y avisa la polaridad de la CVRS.
- `registrar()`: envía a Supabase, vía `../assets/js/tracker.js`, un evento `calculo_realizado` con puntajes y veredictos, sin identificadores, 4 s después del último cambio y sin repetir estados.

## Convenciones técnicas

- **Formato:** un solo HTML con CSS y JS en línea. Carga Google Fonts (Newsreader, IBM Plex Sans, IBM Plex Mono) con respaldo del sistema y el `tracker.js` compartido del repositorio.
- **Temas:** colores como tokens en `:root`; modo oscuro en `@media (prefers-color-scheme: dark)` y en `:root[data-theme="dark"]`. Use siempre tokens.
- **Diseño adaptable:** en pantallas < 820 px la calculadora pasa a una columna. El mapa y el explorador se desplazan horizontalmente dentro de su contenedor; la página no debe desbordar.
- **Accesibilidad:** foco visible, `aria-live` en los paneles de resultado, `aria-pressed` en los casos y un `id` estable en cada control.

## Pruebas mínimas tras cualquier cambio

**Calculadora diagnóstica:**

| Caso | WPI | SSS | FS | Regiones | Duración | Wolfe | NEJM |
|---|---|---|---|---|---|---|---|
| viñeta | 8 | 6 | 14 | 5 | sí | ✓ | ✓ |
| A | 7 | 5 | 12 | 5 | sí | ✓ | ✗ |
| B | 6 | 8 | 14 | 5 | no | ✗ | ✓ |
| C | 8 | 8 | 16 | 2 | sí | ✗ | ✗ |

En el mapa, con WPI ≥ 4, debe haber **4** celdas «solo Wolfe» y **41** «solo NEJM».

**Explorador de evidencia:**

- `EV` tiene **54** filas (Tabla 1: 34; Tabla 2: 20), con DME, límites y rótulos idénticos al PDF y en el mismo orden.
- `auditar` produce **exactamente 7** hallazgos:
  - TAMAÑO: TCC/dolor, mindfulness/fatiga, mindfulness/depresión, duloxetina/fatiga
  - IC INV: electroacupuntura/sueño
  - IC ASIM: qigong/fatiga
  - P: estiramiento/depresión
- Aviso de polaridad (no es error) en las CVRS negativas sin §: electroacupuntura, yoga, amitriptilina, duloxetina y pregabalina.
- Con desenlace «Dolor» hay 12 filas y la primera por magnitud es fortalecimiento muscular (−1,39).

## Pendientes

- Calculadora de PROMIS-29+2 con conversión a puntaje T: requiere las tablas oficiales de HealthMeasures; no inventarlas.
- COPC-S: requiere el instrumento original (Schrepf et al., *J Pain* 2024;25:265-72). La lista actual es didáctica.
- Cotejar los conflictos de interés en NEJM.org.
- Validar la terminología en español de los ítems SSS contra una versión validada en Colombia o España.

## Fuentes primarias

- Williams DA, Clauw DJ. Fibromyalgia. *N Engl J Med* 2026;395:267-77. doi:10.1056/NEJMcp2411656
- Wolfe F, Clauw DJ, Fitzcharles MA, et al. 2016 Revisions to the 2010/2011 fibromyalgia diagnostic criteria. *Semin Arthritis Rheum* 2016;46:319-29.
  - https://www.sciencedirect.com/science/article/abs/pii/S0049017216302086
  - https://www.fai2r.org/wp-content/uploads/2018/11/Anx_tuto_fibromyalgie_FAI2R-wolfe2016.pdf
- INVIMA. Código Único de Medicamentos vigentes. https://www.datos.gov.co (conjunto `i7cb-raxc`), consultado el 16 de septiembre de 2026.

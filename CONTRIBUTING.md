# Plataforma de Clases Interactivas — Guía de Desarrollo

> **Autor:** Jorge Bogo · Universidad Antonio Nariño / Universidad Santo Tomás
> **Fecha:** Abril 2026
> **Repositorio:** [github.com/JBOGLOP](https://github.com/JBOGLOP)

---

## Descripción del proyecto

Plataforma educativa basada en archivos HTML estáticos publicados en **GitHub Pages** para impartir clases interactivas con contenido, casos clínicos y evaluaciones automatizadas. Diseñada para asignaturas de:

- **Cuidados Paliativos** — Diplomado "El Misterio del Dolor y la Muerte"
- **Morfología / Anatomía** — Facultad de Enfermería, UAN
- **Investigación en Cuidados Paliativos** — Maestría, UAN

Cada módulo es un único archivo `.html` autocontenido que incluye contenido teórico, evaluaciones parciales, caso clínico interactivo y evaluación final con temporizador.

---

## Arquitectura

```
┌──────────────────────────────────────────────────┐
│               ARCHIVO HTML ÚNICO                  │
│                                                   │
│  ┌─────────────┐  ┌──────────┐  ┌─────────────┐ │
│  │  Contenido   │  │   Caso   │  │ Evaluación  │ │
│  │  colapsable  │  │ clínico  │  │   final     │ │
│  │  + quiz      │  │ decisión │  │ + timer     │ │
│  │  parciales   │  │ múltiple │  │ + lock hora │ │
│  └─────────────┘  └──────────┘  └──────┬──────┘ │
│                                         │        │
│  ┌──────────────────────────────────────┴──────┐ │
│  │         ENVÍO DE RESULTADOS                  │ │
│  │  📊 Google Sheets (automático)               │ │
│  │  📧 Correo electrónico (mailto)              │ │
│  │  📋 Copiar al portapapeles                   │ │
│  │  💬 WhatsApp                                 │ │
│  └──────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────┘
                     │ fetch POST
                     ▼
          ┌─────────────────────┐
          │  Google Apps Script  │
          │  (receptor de datos) │
          └──────────┬──────────┘
                     │ appendRow
                     ▼
          ┌─────────────────────┐
          │   Google Sheets     │
          │ (base de datos)     │
          └─────────────────────┘
```

---

## Tecnologías utilizadas

| Componente | Tecnología | Propósito |
|---|---|---|
| Estructura | HTML5 | Contenido y formularios |
| Estilos | CSS3 (variables, grid, responsive) | Diseño visual profesional |
| Lógica | JavaScript vanilla | Interactividad, timer, scoring |
| Tipografía | Google Fonts (Crimson Pro + Source Sans 3) | Estética académica |
| Hosting | GitHub Pages | Publicación gratuita |
| Base de datos | Google Sheets + Apps Script | Recepción automática de resultados |

---

## Estructura de cada módulo HTML

### 1. Panel del docente (oculto por defecto)

Configuración de sesión que solo el docente puede ver:

- **Hora de desbloqueo** de la evaluación final
- **Duración** del examen en minutos
- **Contraseña** del docente
- **Exportar resultados** en JSON

**Acceso secreto al panel:**

| Método | Cómo |
|---|---|
| Por URL | Agregar `?docente=true` al final de la URL |
| Por teclado | Presionar `Ctrl + Shift + D` |

Ambos piden la contraseña configurada (por defecto: `docente2026`).

**Para cambiar la contraseña**, buscar en el JavaScript:

```javascript
teacherPass: 'docente2026',
```

### 2. Registro del estudiante

Formulario obligatorio que captura:

- Nombres y Apellidos
- Código estudiantil o Cédula (CC)
- Correo electrónico

Estos datos se incluyen en todos los envíos de resultados.

### 3. Contenido con secciones colapsables

Cada sección tiene:

- Título y tiempo estimado
- Contenido teórico (texto, tablas, cajas de destacado)
- Quiz de verificación al final (evaluación parcial)

**Tipos de cajas de destacado disponibles:**

```html
<div class="highlight-box info">📌 Concepto clave...</div>
<div class="highlight-box warning">⚠️ Importante...</div>
<div class="highlight-box success">💡 Regla práctica...</div>
```

### 4. Caso clínico interactivo

- Narrativa por etapas (progresiva)
- Decisiones con retroalimentación inmediata
- Clasificación: `best` (óptima), `suboptimal`, `wrong` (inadecuada)
- Resumen con puntaje al final

### 5. Evaluación final

- Bloqueo por hora (configurable por el docente)
- Desbloqueo manual con contraseña
- Temporizador regresivo
- Envío automático al finalizar
- Corrección inmediata con retroalimentación

---

## Cómo crear un módulo nuevo

### Paso 1: Copiar la plantilla

Copiar `plataforma_clase_interactiva.html` y renombrarlo según el módulo:

```
modulo_morfologia_osteologia.html
modulo_paliativos_sintomas.html
modulo_paliativos_duelo.html
```

### Paso 2: Modificar el contenido

Buscar y editar estas 5 zonas del HTML:

#### A) Título y metadatos (línea ~677)

```html
<h1>NOMBRE DE TU MÓDULO AQUÍ</h1>
<div>Módulo X · Nombre del programa</div>
```

#### B) Secciones de contenido

Cada sección sigue este patrón repetible:

```html
<div class="section-card" id="sectionN">
  <div class="section-header" onclick="toggleSection('sectionN')">
    <div class="section-icon" id="icon-sectionN">N</div>
    <div class="section-title-area">
      <div class="section-title">Título de la sección</div>
      <div class="section-subtitle">Descripción — XX min</div>
    </div>
    <div class="section-chevron" id="chevron-sectionN">▼</div>
  </div>
  <div class="section-body" id="body-sectionN">
    <div class="content-block">
      <!-- TU CONTENIDO AQUÍ: h3, h4, p, ul, tablas, highlight-box -->
    </div>

    <!-- QUIZ PARCIAL -->
    <div class="quiz-container">
      <!-- Preguntas aquí -->
    </div>
  </div>
</div>
```

#### C) Preguntas de quiz parcial

```html
<div class="question-block" id="qN">
  <div class="question-text">N. Tu pregunta aquí</div>
  <label class="option-label" onclick="answerQuiz('qN', this, false)">
    <input type="radio" name="qN"> a) Opción incorrecta
  </label>
  <label class="option-label" onclick="answerQuiz('qN', this, true)">
    <input type="radio" name="qN"> b) Opción correcta
  </label>
  <!-- más opciones -->
  <div class="feedback-text correct" id="qN-correct">✓ Retroalimentación positiva</div>
  <div class="feedback-text incorrect" id="qN-incorrect">✗ Retroalimentación correctiva</div>
</div>
```

> **Clave:** El parámetro `true` en el `onclick` marca la respuesta correcta.

#### D) Caso clínico

Cada etapa del caso tiene: narrativa + botones de decisión + resultado.

```html
<div class="case-narrative">
  <strong>Presentación:</strong><br>
  Descripción del paciente...
</div>
<div class="case-decision">
  <h4>¿Cuál es su decisión?</h4>
  <button class="decision-btn" onclick="caseDecide(1, this, 'best')">
    A) Mejor opción
  </button>
  <button class="decision-btn" onclick="caseDecide(1, this, 'suboptimal')">
    B) Opción subóptima
  </button>
  <button class="decision-btn" onclick="caseDecide(1, this, 'wrong')">
    C) Opción inadecuada
  </button>
</div>
```

Y en el JavaScript, agregar los mensajes de retroalimentación en `caseMessages`.

#### E) Evaluación final

Misma estructura que los quiz parciales pero con IDs `eq1`, `eq2`, etc. Las respuestas correctas se definen en:

```javascript
examCorrectAnswers: { eq1: 'b', eq2: 'b', eq3: 'b', eq4: 'b', eq5: 'c' },
```

### Paso 3: Actualizar el JavaScript

Al agregar o quitar preguntas, actualizar:

```javascript
quizTotal: 5,  // ← total de preguntas parciales
```

Y la función `checkSectionCompletion()` para que sepa cuáles preguntas pertenecen a cada sección.

---

## Publicación en GitHub Pages

### Configuración inicial (una sola vez)

1. Crear cuenta en [github.com](https://github.com)
2. Crear repositorio nuevo → **Public** → Activar README
3. Ir a **Settings → Pages**
4. Source: **Deploy from a branch**
5. Branch: **main** / carpeta: **/ (root)**
6. **Save**

### Subir archivos

1. En el repositorio, clic en **Add file → Upload files**
2. Arrastrar el archivo `.html`
3. Clic en **Commit changes**

### URLs resultantes

```
https://USUARIO.github.io/REPOSITORIO/nombre_archivo.html
```

**Tip:** Si el archivo se llama `index.html`, la URL se simplifica a:

```
https://USUARIO.github.io/REPOSITORIO/
```

### Actualizar un archivo existente

1. Clic en el nombre del archivo en el repositorio
2. Clic en el ícono de lápiz (✏️ editar) o subir nuevo archivo con el mismo nombre
3. Commit changes

---

## Integración con Google Sheets

### Configuración del receptor de datos

#### 1. Crear Google Sheet

Crear hoja de cálculo con estos encabezados en fila 1:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Fecha | Nombres | Apellidos | ID/CC | Correo | Quiz Correctas | Quiz Total | Caso Clínico | Examen Correctas | Examen Total | Puntaje Global |

#### 2. Crear Apps Script

En la hoja: **Extensiones → Apps Script**

Pegar este código:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date().toLocaleString('es-CO'),
      data.nombres,
      data.apellidos,
      data.id,
      data.correo,
      data.quizCorrectas,
      data.quizTotal,
      data.casoClinico,
      data.examenCorrectas,
      data.examenTotal,
      data.puntajeGlobal
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

#### 3. Implementar

1. **Implementar → Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo**
4. Acceso: **Cualquier persona**
5. **Implementar** → Copiar la URL generada

#### 4. Conectar con el HTML

En el JavaScript del HTML, actualizar:

```javascript
googleSheetsURL: 'https://script.google.com/macros/s/TU_ID_AQUI/exec',
```

### Crear una hoja separada por módulo

Para cada módulo/asignatura, se recomienda:

1. Crear una Google Sheet nueva
2. Crear un Apps Script nuevo (repitiendo el paso 2)
3. Obtener una URL nueva
4. Ponerla en el HTML del módulo correspondiente

---

## Configuración por asignatura

### Correo del docente

```javascript
teacherEmail: 'jwbogoyal@gmail.com',
```

### Contraseña del panel docente

```javascript
teacherPass: 'docente2026',
```

### Hora de desbloqueo de evaluación

Configurable desde el panel docente o directamente en:

```javascript
unlockTime: '10:00',
```

### Duración del examen

```javascript
examDuration: 15,  // minutos
```

---

## Módulos planificados

| Asignatura | Módulo | Estado |
|---|---|---|
| Cuidados Paliativos | Manejo del Dolor | ✅ Prototipo completo |
| Cuidados Paliativos | Manejo de Síntomas | 🔲 Pendiente |
| Cuidados Paliativos | Duelo y Espiritualidad | 🔲 Pendiente |
| Morfología | Osteología craneal y facial | 🔲 Pendiente |
| Morfología | Músculos faciales | 🔲 Pendiente |
| Investigación | Revisiones sistemáticas | 🔲 Pendiente |

---

## Herramientas complementarias

| Herramienta | Archivo | Descripción |
|---|---|---|
| Calculadora de opioides | `Calculadora_Opioides_Equianalgesia_v2_1.html` | 13 opioides, MEDD, tabla Ripamonti |
| Atlas óseos interactivos | (por crear) | Huesos craneales/faciales con énfasis optometría |
| Atlas muscular | (por crear) | Músculos faciales interactivos |

---

## Seguridad y consideraciones

- La contraseña del docente es una **barrera práctica**, no seguridad criptográfica (el código fuente es visible)
- Los datos de los estudiantes se envían a Google Sheets que solo el docente puede ver
- El archivo HTML no almacena datos — cada sesión empieza desde cero
- Para evaluaciones de alto impacto, considerar usar plataformas LMS formales
- La funcionalidad de bloqueo por hora depende del reloj local del dispositivo del estudiante

---

## Referencia rápida de estilos CSS disponibles

```css
/* Cajas de contenido */
.highlight-box.info      /* Azul — conceptos clave */
.highlight-box.warning   /* Amarillo — advertencias */
.highlight-box.success   /* Verde — tips prácticos */

/* Tablas */
.data-table              /* Tabla con encabezado coloreado */

/* Botones */
.btn.btn-primary         /* Acción principal (café) */
.btn.btn-secondary       /* Acción secundaria (gris) */
.btn.btn-success         /* Éxito (verde) */
```

---

## Licencia

GNU-GPL v3 — Libre para uso educativo y modificación.

---

*Documentación generada el 13 de abril de 2026 · Conversación de trabajo con Claude (Anthropic)*

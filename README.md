# Herramientas Educativas en Cuidados Paliativos 🩺

Colección de recursos web gratuitos para estudiantes y profesionales de la salud, desarrollados para el contexto colombiano.

**Autor:** Dr. Jorge Bogoya López · Docente Maestría en Investigación en Cuidados Paliativos · Universidad Antonio Nariño 🇨🇴

### 👉 [**Abrir el portal**](https://jboglop.github.io/calculadoras_CP/)

Todo funciona en el navegador, sin instalación ni registro.

---

## 📁 Estructura del repositorio

```
calculadoras_CP/
├── index.html              Portada: buscador + tarjetas (se arma desde datos/catalogo.json)
├── datos/
│   ├── catalogo.json       Fuente única de verdad de los recursos publicados
│   └── supabase.sql        Esquema de estadísticas (tabla eventos + RLS + vistas)
├── assets/js/tracker.js    Cliente de Supabase compartido por todas las herramientas
├── calculadoras/           Calculadoras clínicas
├── clases/                 Clases interactivas con evaluación
├── revision-temas/         Síntesis de evidencia
├── herramientas/           Apoyo metodológico para la Maestría
├── panel/                  Estadísticas de uso (requiere sesión del docente)
└── CONTRIBUTING.md         Guía para crear un módulo nuevo
```

Las rutas antiguas (`Calculadora_Opioides.html`, `Revision_temas/…`, `analizador_tesis/…`) siguen
funcionando: quedaron como redirecciones automáticas a la nueva ubicación.

---

## 🌐 Recursos publicados

### 💊 Calculadoras clínicas

| Herramienta | Contenido |
|---|---|
| [Equianalgesia opioide](./calculadoras/opioides.html) `v5.2` | 11 opioides, DEMO, morfina 3% en gotas, rotación a metadona (Ripamonti, Ayonrinde) |
| [Escalas pronósticas y de valoración](./calculadoras/escalas-clinicas.html) | PPS, PPI, PaP, NECPAL, PROFUND, Karnofsky, Barthel, ESAS, Zarit |
| [Escalas por tipo de ACV](./calculadoras/neuropaliativos-escalas-acv.html) | Pronóstico neuropaliativo según subtipo de ataque cerebrovascular |

### 🎓 Clases interactivas

| Clase | Contenido |
|---|---|
| [Manejo del dolor](./clases/dolor-manejo.html) | Contenido colapsable, quizzes, caso clínico por decisiones, examen con temporizador |
| [Factores pronósticos y final de vida](./clases/pronosticos-final-vida.html) | Calculadoras integradas y trayectorias de Lynn & Adamson |

### 📚 Revisión de temas

| Recurso | Contenido |
|---|---|
| [Fibromialgia: dolor nociplástico](./revision-temas/fibromialgia.html) | Revisión académica 2020–2026 |
| [Movilización con hueso frágil](./revision-temas/movilizacion-fractura-patologica.html) | Evidencia sobre riesgo de fractura patológica |
| [Neuropaliativos en ACV agudo](./revision-temas/neuropaliativos-acv.html) | Evidencia 2014–2025 en 10 secciones + marco normativo colombiano |

### 🔬 Herramientas de investigación

| Herramienta | Contenido |
|---|---|
| [Analizador crítico de artículos](./herramientas/analizador-articulos/) | Lectura crítica paso a paso |
| [Evaluador de trabajos de grado](./herramientas/analizador-tesis/) | Rúbrica interactiva para tesis de la Maestría |

---

## 📊 Estadísticas de uso

Las herramientas registran eventos anónimos (aperturas, quizzes completados, resultados de
evaluación) en **Supabase**. El panel del docente vive en [`/panel/`](./panel/) y **exige iniciar
sesión**: la clave pública incrustada en el HTML solo puede *escribir*, nunca leer.

Para ponerlo en marcha:

1. Ejecutar [`datos/supabase.sql`](./datos/supabase.sql) en el *SQL Editor* del proyecto de Supabase.
2. Copiar la clave **anon / publishable** (Settings → API Keys).
3. Pegarla en `assets/js/tracker.js` y en `panel/index.html`, donde dice `PEGAR_AQUI_LA_CLAVE_ANON`.
4. En Authentication → URL Configuration, agregar `https://jboglop.github.io/calculadoras_CP/panel/`
   como *Redirect URL*.

Para instrumentar una herramienta basta con una línea, más las llamadas que interesen:

```html
<script src="../assets/js/tracker.js" data-curso="opioides"></script>
<script>
  CP.identificar({ nombre: 'Ana Pérez', correo: 'ana@uan.edu.co' });   // si hay registro
  CP.evento('quiz_completado', { puntaje: 8, total: 10 });
</script>
```

Si Supabase no responde, la herramienta sigue funcionando: los fallos son silenciosos.

---

## ⚠️ Advertencias clínicas importantes

> **Estas herramientas son EDUCATIVAS.** No reemplazan el juicio clínico ni las guías institucionales.

- Las escalas pronósticas son **orientativas**, no son sentencias.
- Toda rotación opioide requiere **reducción del 25–50 %** por tolerancia cruzada incompleta.
- La **rotación a metadona** siempre requiere supervisión de un especialista.
- La respuesta a opioides varía según genética, función renal/hepática e interacciones.
- Regla de oro: *«titular según respuesta, no según tabla»*.

Todos los recursos se alinean con la **Ley 1733 de 2014** (derecho a cuidados paliativos en Colombia).

---

## 📚 Fuentes principales

- **EAPC 2012** — European Association for Palliative Care
- **WHO 2018** — Cancer Pain Guidelines
- **CDC 2022** — Clinical Practice Guideline for Prescribing Opioids
- **ANZCA 2025** — Opioid Dose Equivalence Calculation Table
- **AHA/ASA 2014 y 2025** — Guías de cuidados paliativos en ACV (Holloway et al.)
- **Busse et al. 2017** — CMAJ Opioid Therapy Guideline
- **SECPAL** — Guía de Práctica Clínica sobre Cuidados Paliativos
- Escalas validadas: Morita (PPI), Pirovano (PaP), Anderson (PPS), Gómez-Batiste (NECPAL), Bernabeu-Wittel (PROFUND)

---

## 🤝 Contribuciones y contacto

**Dr. Jorge Bogoya López**
Hospital Regional de Moniquirá E.S.E. · Boyacá, Colombia

¿Vas a crear un módulo nuevo? Empieza por [CONTRIBUTING.md](./CONTRIBUTING.md).
Para reportar errores clínicos o sugerencias, abre un [**Issue**](https://github.com/JBOGLOP/calculadoras_CP/issues).

---

## 📄 Licencia

Distribuido bajo **licencia MIT** — uso libre con reconocimiento del autor.

---

<div align="center">

*«La medicina nos enseña a medir. Los cuidados paliativos nos enseñan a acompañar lo que no se puede medir.»*

**Dr. Jorge Bogoya · 2026 🇨🇴**

</div>

# Herramientas Educativas en Cuidados Paliativos 🩺

> Recursos interactivos de código abierto para la formación en Cuidados Paliativos y Atención Primaria en el contexto colombiano.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Status](https://img.shields.io/badge/status-educativo-blue)]()
[![Programa](https://img.shields.io/badge/Maestr%C3%ADa-Cuidados%20Paliativos-teal)]()

---

## 📖 Descripción

Este repositorio reúne dos herramientas web interactivas desarrolladas como material docente para la **Maestría en Cuidados Paliativos de la Universidad Antonio Nariño (Colombia)**. Están diseñadas como recursos de apoyo académico y clínico para estudiantes, profesionales de atención primaria y especialistas en cuidados paliativos.

Ambas son aplicaciones **estáticas de un solo archivo HTML** (sin dependencias de servidor), listas para abrirse localmente, desplegarse en GitHub Pages o integrarse en aulas virtuales.

---

## 🧰 Herramientas incluidas

### 1️⃣ Clase 2 — Factores pronósticos y cuidado al final de la vida

Clase interactiva sincrónica que aborda los temas 1.3 y 1.4 del programa curricular, con calculadoras pronósticas integradas en tiempo real.

**Contenido académico:**
- Marco teórico sobre factores pronósticos en cuidados paliativos (colapsable).
- **Calculadoras interactivas en tiempo real** — núcleo de la herramienta:
  - Palliative Performance Scale (PPS)
  - Palliative Prognostic Index (PPI)
  - Palliative Prognostic Score (PaP)
  - NECPAL CCOMS-ICO
  - La Pregunta Sorpresa
- Escalas de valoración funcional y sintomática (Karnofsky, Barthel, ESAS, Zarit).
- Índice pronóstico PROFUND para pacientes pluripatológicos (PAI Junta de Andalucía).
- Modelo de trayectorias de Lynn & Adamson.
- Criterios clínicos de fase terminal.
- Reflexión sobre la dimensión humana del pronóstico.

**Archivo:** `Clase2_Interactiva_Salud_CP.html`

---

### 2️⃣ Calculadora de Equianalgesia Opioide (DEMO)

Calculadora de Dosis Equivalente de Morfina Oral (DEMO) para rotación de opioides, con factores de conversión actualizados según guías internacionales (ANZCA 2025, CDC 2022, EAPC 2012, Busse CMAJ 2017, Nielsen 2016).

**Características:**
- Conversión entre **11 opioides** (débiles y fuertes): codeína, tramadol, morfina, oxicodona, hidromorfona, fentanilo (TD/IV), buprenorfina (TD 72–96h · 7 días · SL), tapentadol, metadona.
- Vías: oral, IV, SC, transdérmica, sublingual.
- **Soporte para morfina solución oral 3%** (presentación colombiana): cálculo en gotas (1 gota ≈ 1,25 mg).
- Tablas de rotación a metadona (métodos de Ripamonti y Ayonrinde).
- Sección dedicada a la farmacología no lineal de la buprenorfina.
- Alertas inteligentes contextuales (dosis altas, exceso de dosis máxima, rotaciones complejas).
- Indicadores GRADE de calidad de evidencia en cada conversión.

**Archivo:** `Calculadora_Equianalgesia_Opioide.html`

---

## 🖼️ Capturas y demostración

> _Las capturas se añadirán en el directorio `/screenshots` en próximas versiones._

```
📁 screenshots/
   ├── clase2_hero.png              # Vista inicial de la clase
   ├── clase2_calculadoras.png      # Calculadoras pronósticas en uso
   ├── demo_calculadora.png         # Calculadora DEMO con conversiones
   └── demo_buprenorfina.png        # Sección farmacológica de buprenorfina
```

**Demo en vivo (GitHub Pages):**

```
https://<tu-usuario>.github.io/<nombre-del-repo>/Clase2_Interactiva_Salud_CP.html
https://<tu-usuario>.github.io/<nombre-del-repo>/Calculadora_Equianalgesia_Opioide.html
```

### 🚀 Uso rápido

No requiere instalación, servidor ni dependencias:

```bash
# Clonar el repositorio
git clone https://github.com/<tu-usuario>/<nombre-del-repo>.git
cd <nombre-del-repo>

# Abrir cualquiera de las herramientas directamente en el navegador
open Clase2_Interactiva_Salud_CP.html
open Calculadora_Equianalgesia_Opioide.html
```

Alternativamente, se pueden subir a un LMS (Moodle, Canvas, Google Classroom) como recurso HTML embebido.

---

## ⚠️ Advertencias clínicas destacadas

> **🚨 HERRAMIENTAS EXCLUSIVAMENTE EDUCATIVAS.**
> Estos recursos son materiales de apoyo académico y **NO reemplazan el juicio clínico**, las guías institucionales ni la valoración especializada.

### Sobre las calculadoras pronósticas
- Las escalas pronósticas son **orientativas**: cada puntaje representa un momento en la trayectoria clínica, no una sentencia. La literatura documenta que los profesionales tienden a **sobreestimar la supervivencia** (Glare et al., 2003; White et al., 2016).
- Los resultados deben interpretarse en el contexto clínico integral, considerando trayectoria evolutiva, preferencias del paciente y contexto familiar.
- No deben utilizarse como único criterio para la toma de decisiones de limitación del esfuerzo terapéutico.

### Sobre la calculadora de equianalgesia opioide
- Las dosis equianalgésicas son **aproximaciones clínicas**. La respuesta individual varía por farmacogenómica (CYP2D6, CYP3A4), función renal/hepática, interacciones y tolerancia cruzada incompleta.
- **Toda rotación opioide requiere reducción del 25–50 %** de la dosis calculada por tolerancia cruzada incompleta.
- **La rotación a metadona SIEMPRE requiere supervisión de un especialista** en cuidados paliativos o manejo del dolor (vida media impredecible, riesgo de QTc, acumulación tisular).
- La buprenorfina presenta **conversión no lineal a dosis altas** (≥8 mg/día SL); el factor lineal solo es válido en rango analgésico bajo.
- **Regla de oro:** *«titular según respuesta, no según tabla»*.

### Marco regulatorio colombiano
Ambas herramientas se alinean con la **Ley 1733 de 2014 (Ley Consuelo Devis Saavedra)**, que reconoce el derecho a la atención en cuidados paliativos en Colombia.

---

## 🛠️ Stack tecnológico

| Componente | Tecnología |
|------------|------------|
| Frontend | HTML5 + CSS3 + JavaScript vanilla (ES6+) |
| Visualización | Chart.js 4.4.1 (CDN) en la clase interactiva |
| Tipografía | Google Fonts — Source Serif 4, Outfit, IBM Plex Mono, DM Sans, DM Serif Display |
| Dependencias de servidor | **Ninguna** — aplicaciones 100% estáticas |
| Compatibilidad | Navegadores modernos (Chrome, Firefox, Safari, Edge 2020+) |
| Responsive | Sí (móvil, tablet, escritorio) |

---

## 📁 Estructura del repositorio

```
/
├── Clase2_Interactiva_Salud_CP.html          # Clase interactiva con calculadoras pronósticas
├── Calculadora_Equianalgesia_Opioide.html    # Calculadora DEMO de opioides
├── screenshots/                               # Capturas (próximamente)
├── LICENSE                                    # Licencia MIT
└── README.md
```

---

## 🤝 Contribución y contacto académico

### ¿Cómo contribuir?

Las contribuciones, correcciones de contenido clínico y mejoras técnicas son bienvenidas. El proceso sugerido:

1. Abre un **Issue** describiendo la corrección o mejora propuesta (preferible para cambios de contenido clínico, con referencia bibliográfica).
2. Para cambios menores (tipografía, estilos, accesibilidad), abre directamente un **Pull Request** con una descripción clara.
3. Para contenido médico, incluye siempre la fuente primaria (guía clínica, artículo indexado) que respalda el cambio.

### Reportar errores clínicos

Si detectas un error en un factor de conversión, un punto de corte de escala, o la interpretación de un índice pronóstico, **abre un Issue con la etiqueta `clinical-accuracy`** e incluye la referencia corregida. Este tipo de reportes tiene prioridad.

### Contacto académico

- **Autor principal:** Jorge Bogoya 
- **Institución:** Maestría en Cuidados Paliativos — Universidad Antonio Nariño (Colombia)
- **Contexto institucional:** Hospital Regional de Moniquirá E.S.E. · Provincia de Ricaurte, Boyacá


Para colaboraciones docentes, propuestas de traducción o adaptaciones a otros contextos regionales, por favor abre un Issue con la etiqueta `collaboration`.

---

## 📚 Referencias bibliográficas

### Pronóstico y escalas en cuidados paliativos

1. Anderson F, Downing GM, Hill J, et al. Palliative Performance Scale (PPS): a new tool. *J Palliat Care.* 1996;12(1):5–11.
2. Morita T, Tsunoda J, Inoue S, Chihara S. The Palliative Prognostic Index: a scoring system for survival prediction of terminally ill cancer patients. *Support Care Cancer.* 1999;7(3):128–133.
3. Pirovano M, Maltoni M, Nanni O, et al. A new Palliative Prognostic Score: a first step for the staging of terminally ill cancer patients. *J Pain Symptom Manage.* 1999;17(4):231–239.
4. Gómez-Batiste X, Martínez-Muñoz M, Blay C, et al. Identifying patients with chronic conditions in need of palliative care in the general population: development of the NECPAL tool. *BMJ Support Palliat Care.* 2013;3(3):300–308.
5. Downar J, Goldman R, Pinto R, Englesakis M, Adhikari NKJ. The "surprise question" for predicting death in seriously ill patients: a systematic review and meta-analysis. *CMAJ.* 2017;189(13):E484–E493.
6. Murray SA, Kendall M, Boyd K, Sheikh A. Illness trajectories and palliative care. *BMJ.* 2005;330(7498):1007–1011.
7. Glare P, Virik K, Jones M, et al. A systematic review of physicians' survival predictions in terminally ill cancer patients. *BMJ.* 2003;327(7408):195–198.
8. White N, Reid F, Harris A, Harries P, Stone P. A systematic review of predictions of survival in palliative care: how accurate are clinicians and who are the experts? *PLoS One.* 2016;11(8):e0161407.
9. Bernabeu-Wittel M, Ollero-Baturone M, Ruiz-Cantero A, et al. Pronóstico de pacientes pluripatológicos: índice PROFUND. *Med Clin (Barc).* 2011;137(6):246–253.

### Equianalgesia y rotación de opioides

10. Caraceni A, Hanks G, Kaasa S, et al. Use of opioid analgesics in the treatment of cancer pain: evidence-based recommendations from the EAPC. *Lancet Oncol.* 2012;13(2):e58–e68.
11. Mercadante S, Caraceni A. Conversion ratios for opioid switching in the treatment of cancer pain: a systematic review. *Palliat Med.* 2011;25(5):504–515.
12. Ripamonti CI, Santini D, Maranzano E, et al. Management of cancer pain: ESMO Clinical Practice Guidelines. *Ann Oncol.* 2012;23(Suppl 7):vii139–vii154.
13. World Health Organization. *WHO Guidelines for the Pharmacological and Radiotherapeutic Management of Cancer Pain in Adults and Adolescents.* Geneva: WHO; 2018.
14. Dowell D, Ragan KR, Jones CM, Baldwin GT, Chou R. CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022. *MMWR Recomm Rep.* 2022;71(No. RR-3):1–95.
15. Busse JW, Craigie S, Juurlink DN, et al. Guideline for opioid therapy and chronic noncancer pain. *CMAJ.* 2017;189(18):E659–E666.
16. Nielsen S, Degenhardt L, Hoban B, Gisev N. A synthesis of oral morphine equivalents (OME) for opioid utilisation studies. *Pharmacoepidemiol Drug Saf.* 2016;25(6):733–737.
17. Australian and New Zealand College of Anaesthetists (ANZCA), Faculty of Pain Medicine. *Opioid Dose Equivalence Calculation Table.* PS01(PM) Appendix; 2025 update.
18. Reddy A, Tayjasanant S, Seevaratnam J, et al. The conversion ratio from intravenous hydromorphone to oral opioids in cancer patients. *J Pain Symptom Manage.* 2017;54(3):280–288.
19. Dahan A, Yassen A, Romberg R, et al. Buprenorphine induces ceiling in respiratory depression but not in analgesia. *Br J Anaesth.* 2006;96(5):627–632.
20. McPherson ML. *Demystifying Opioid Conversion Calculations: A Guide for Effective Dosing.* 2nd ed. Bethesda, MD: ASHP; 2014.

### Marco regulatorio colombiano

21. Ministerio de Salud y Protección Social de Colombia. **Ley 1733 de 2014 — Ley Consuelo Devis Saavedra.** Derecho a los Cuidados Paliativos. *Diario Oficial.* 2014.
22. Sociedad Española de Cuidados Paliativos (SECPAL). *Guía de Práctica Clínica sobre Cuidados Paliativos.* Ministerio de Sanidad; 2008, actualización 2014.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** — consulta el archivo [LICENSE](./LICENSE) para más detalles.

```
MIT License — © 2026 Jorge Bogoya 
Se permite el uso, copia, modificación, fusión, publicación, distribución,
sublicencia y/o venta de copias del software, sujeto a las condiciones
establecidas en la licencia.
```

**Nota sobre el contenido clínico:** aunque el código está bajo licencia MIT, el contenido clínico, las interpretaciones de escalas y los criterios de rotación opioide derivan de guías internacionales y literatura indexada cuya cita apropiada es responsabilidad del usuario. Se recomienda referenciar tanto este repositorio como las fuentes primarias al reutilizar el material en contextos académicos o clínicos.

---

## 🙏 Agradecimientos

- **Universidad Antonio Nariño** — por el marco formativo de la Maestría en Cuidados Paliativos.
- **Hospital Regional de Moniquirá E.S.E.** — por el contexto clínico de implementación.
- **Comunidad internacional de cuidados paliativos** — EAPC, SECPAL, ANZCA, por el cuerpo de evidencia que hace posibles estas herramientas.
- **Pacientes, familias y cuidadores** — quienes son la razón última de toda investigación y herramienta en este campo.

---

<div align="center">

*«La medicina nos enseña a medir. Los cuidados paliativos nos enseñan a acompañar lo que no se puede medir.»*

**Maestría en Cuidados Paliativos · Universidad Antonio Nariño · Colombia 🇨🇴**

</div>

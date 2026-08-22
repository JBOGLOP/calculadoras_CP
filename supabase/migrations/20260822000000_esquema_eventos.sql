-- Esquema de estadísticas · calculadoras_CP
-- Proyecto: bnbzupyymrznuamrttcd
--
-- Migración inicial. Ya está aplicada en el proyecto remoto.
-- Es idempotente a propósito: volver a ejecutarla no rompe nada.
--   npx supabase db push        aplica lo que falte
--   npx supabase migration list compara local contra remoto

create table if not exists public.eventos (
  id            bigint generated always as identity primary key,
  creado_en     timestamptz not null default now(),
  curso         text not null,          -- 'opioides', 'dolor-manejo', 'fibromialgia'...
  modulo        text,                   -- sección dentro del recurso
  evento        text not null,          -- 'apertura', 'quiz_completado', 'examen_final'
  sesion_id     uuid,                   -- agrupa los eventos de una misma pestaña
  estudiante_id text,
  nombre        text,
  correo        text,
  puntaje       numeric,
  total         numeric,
  datos         jsonb not null default '{}'::jsonb
);

create index if not exists eventos_curso_fecha_idx on public.eventos (curso, creado_en desc);
create index if not exists eventos_sesion_idx      on public.eventos (sesion_id);

alter table public.eventos enable row level security;

-- El estudiante (clave anónima, visible en el HTML) SOLO puede escribir.
drop policy if exists "anon inserta eventos" on public.eventos;
create policy "anon inserta eventos" on public.eventos
  for insert to anon with check (true);

-- Leer requiere iniciar sesión: solo el docente ve los datos.
drop policy if exists "autenticado lee eventos" on public.eventos;
create policy "autenticado lee eventos" on public.eventos
  for select to authenticated using (true);

-- ── Vistas para el panel ────────────────────────────────────────────────
create or replace view public.resumen_por_curso as
select curso,
       count(*)                                          as eventos,
       count(distinct sesion_id)                         as sesiones,
       count(*) filter (where evento = 'apertura')       as aperturas,
       round(avg(puntaje / nullif(total,0)) * 100, 1)    as promedio_pct,
       max(creado_en)                                    as ultimo_uso
from public.eventos
group by curso
order by sesiones desc;

create or replace view public.resultados_estudiantes as
select creado_en, curso, nombre, correo, estudiante_id,
       puntaje, total,
       round(puntaje / nullif(total,0) * 100, 1) as porcentaje
from public.eventos
where evento in ('quiz_completado','examen_final','resultado_final')
order by creado_en desc;

-- ── Seguridad de las vistas ─────────────────────────────────────────────
-- Por defecto una vista se ejecuta con los permisos de su creador y se salta
-- el RLS de la tabla base. Con security_invoker la vista respeta el RLS,
-- de modo que la clave anónima tampoco puede leer a través de ella.
alter view public.resumen_por_curso       set (security_invoker = on);
alter view public.resultados_estudiantes  set (security_invoker = on);

revoke all on public.resumen_por_curso      from anon;
revoke all on public.resultados_estudiantes from anon;

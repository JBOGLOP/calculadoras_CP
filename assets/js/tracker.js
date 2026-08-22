/*!
 * tracker.js — registro de uso y resultados en Supabase
 * Repositorio: github.com/JBOGLOP/calculadoras_CP
 *
 * Uso mínimo en cualquier herramienta:
 *   <script src="../assets/js/tracker.js" data-curso="opioides"></script>
 *   ... y luego, donde haga falta:
 *   CP.evento('calculo_realizado', { datos: { opioideOrigen: 'tramadol' } });
 *
 * Reglas de oro:
 *  - Aquí SOLO va la clave anónima (publishable). NUNCA la service_role.
 *  - La tabla tiene RLS: anon puede INSERTAR pero no LEER. Ver datos/supabase.sql.
 *  - Todo fallo es silencioso: si Supabase no responde, la herramienta sigue funcionando.
 */
(function (global) {
  'use strict';

  var CONFIG = {
    url: 'https://bnbzupyymrznuamrttcd.supabase.co',
    // TODO: pegar la clave anon/publishable desde Supabase → Settings → API Keys
    anonKey: 'PEGAR_AQUI_LA_CLAVE_ANON',
    tabla: 'eventos',
    activo: true
  };

  var script = document.currentScript;
  var curso = (script && script.dataset.curso) ||
              document.body?.dataset.curso ||
              location.pathname.split('/').pop().replace('.html', '') || 'desconocido';

  // Un id de sesión por pestaña: permite unir los eventos de un mismo estudiante
  // sin pedirle nada ni instalar cookies de seguimiento.
  var sesionId = sessionStorage.getItem('cp_sesion');
  if (!sesionId) {
    sesionId = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random());
    sessionStorage.setItem('cp_sesion', sesionId);
  }

  // Identidad del estudiante, si la herramienta la capta (formulario de registro).
  var identidad = {};
  function identificar(datos) {
    identidad = Object.assign(identidad, datos || {});
    try { sessionStorage.setItem('cp_identidad', JSON.stringify(identidad)); } catch (e) {}
  }
  try { identidad = JSON.parse(sessionStorage.getItem('cp_identidad') || '{}'); } catch (e) {}

  function evento(nombre, extra) {
    if (!CONFIG.activo || CONFIG.anonKey.startsWith('PEGAR_AQUI')) return Promise.resolve(false);

    var cuerpo = Object.assign({
      curso: curso,
      modulo: (extra && extra.modulo) || null,
      evento: nombre,
      sesion_id: sesionId,
      estudiante_id: identidad.id || null,
      nombre: identidad.nombre || null,
      correo: identidad.correo || null,
      puntaje: (extra && extra.puntaje) ?? null,
      total: (extra && extra.total) ?? null,
      datos: (extra && extra.datos) || {}
    });

    return fetch(CONFIG.url + '/rest/v1/' + CONFIG.tabla, {
      method: 'POST',
      headers: {
        'apikey': CONFIG.anonKey,
        'Authorization': 'Bearer ' + CONFIG.anonKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'   // no intenta leer de vuelta: RLS lo bloquearía
      },
      body: JSON.stringify(cuerpo),
      keepalive: true                // sobrevive al cierre de la pestaña
    })
      .then(function (r) { return r.ok; })
      .catch(function () { return false; });  // fallo silencioso: nunca romper la clase
  }

  // Visita automática al abrir la herramienta.
  evento('apertura', { datos: { referrer: document.referrer || null } });

  global.CP = { evento: evento, identificar: identificar, sesionId: sesionId, curso: curso };
})(window);

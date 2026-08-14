/* Script compartido de las páginas de servicio.
   OJO: es un script clásico, NO un módulo. No debe usar "import": las páginas de
   pages/ se sirven como archivos estáticos (GitHub Pages no pasa por Vite) y un
   especificador bare no se puede resolver en el navegador. Por eso Lucide se carga
   desde su build UMD por CDN y aquí solo se llama a createIcons(). */
(function () {
  'use strict';

  // 1. Iconos
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 2. Tema claro/oscuro
  var raiz = document.documentElement;
  var boton = document.getElementById('botonTema');
  var etiqueta = document.getElementById('etiquetaTema');
  var CLAVE = 'theme-preference'; // misma clave que menu.html, así la elección se comparte

  function preferenciaGuardada() {
    try {
      return localStorage.getItem(CLAVE);
    } catch (e) {
      return null;
    }
  }

  function preferenciaDelSistema() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function aplicar(tema) {
    var oscuro = tema === 'dark';
    raiz.setAttribute('data-theme', oscuro ? 'dark' : 'light');
    if (!boton) return;
    boton.setAttribute('aria-pressed', oscuro ? 'true' : 'false');
    boton.dataset.activeTheme = oscuro ? 'dark' : 'light';
    if (etiqueta) etiqueta.textContent = oscuro ? 'Modo claro' : 'Modo nocturno';
  }

  // Un solo criterio: lo guardado manda sobre el sistema. Sin ajuste por hora,
  // para no pisar la elección del usuario en cada recarga.
  aplicar(preferenciaGuardada() || preferenciaDelSistema());

  if (boton) {
    boton.addEventListener('click', function () {
      var siguiente = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      aplicar(siguiente);
      try {
        localStorage.setItem(CLAVE, siguiente);
      } catch (e) {
        /* almacenamiento no disponible: el tema solo dura esta visita */
      }
    });
  }

  // Si el sistema cambia y el usuario no ha elegido nada, se sigue al sistema.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (preferenciaGuardada()) return;
      aplicar(e.matches ? 'dark' : 'light');
    });
  }
})();

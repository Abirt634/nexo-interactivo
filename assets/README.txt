Carpeta de recursos estáticos (imágenes, íconos, etc.) — actualmente vacía.

<!--
  Orden de carga importante:
  1) script.js     -> datos (MODULES), estado global y funciones comunes
  2) login.js       -> pantalla de inicio de sesión
  3) dashboard.js    -> topbar + panel de control principal
  4) modules.js      -> vista de módulo (videos, actividades, reporte de módulo)
  5) activities.js   -> expedientes / actividades Genially / JClic
  6) report.js       -> reporte general
  Al final se llama a render() para arrancar la aplicación.
-->
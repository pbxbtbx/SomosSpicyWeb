# SPICY · Web oficial

Sitio estático, editable y sin compilación. Abre `index.html` para verlo o sirve esta carpeta con un servidor local. Las fuentes decorativas se cargan desde Google Fonts; si no hay conexión se usan fuentes de respaldo. No hay analítica ni cookies propias. Los reproductores externos solo se cargan si añades sus enlaces.

## Archivos

- `index.html`: textos principales, secciones, contacto y metadatos.
- `style.css`: colores, tipografías, diseño y adaptación a móvil.
- `script.js`: bloque CONFIG e interacciones.
- `assets/logo-spicy.jpg`: logo original conservado, sin recortes del archivo.

## Editar

1. Cambia la frase de inicio y biografía directamente en `index.html`. La presentación actual es texto provisional; no atribuye historia, género o logros a la banda.
2. En `style.css`, modifica `--red`, `--black`, `--white` y las familias tipográficas de `:root`. Para alojar las fuentes localmente, descarga sus archivos y licencias, guárdalos en assets y sustituye el import por reglas @font-face.
3. Guarda fotos y audios en `assets/` con nombres sencillos, sin espacios. Usa imágenes optimizadas y previews de audio ligeros que tengáis derecho a compartir.
4. Edita CONFIG al principio de `script.js`. Hay un ejemplo de cada tipo de elemento en el comentario inicial. Separa objetos con comas y conserva las comillas. Las listas vacías muestran los estados de Próximamente.
5. Para cambiar la foto de grupo, sustituye el bloque `.photo-space` de `index.html` por una imagen con su texto alternativo. La ilustración del vinilo es decorativa, no una portada real; el panel de merch tampoco representa un producto disponible.

### Ejemplo de miembro

```js
miembros: [
  { nombre: 'Nombre real', instrumento: 'Instrumento', bio: 'Biografía real', foto: 'assets/integrante.jpg', redes: [] }
],
```

### Slider automático de integrantes

Con dos o más objetos en `CONFIG.miembros`, se muestra un integrante cada 5 segundos, con foto, nombre, instrumento, biografía y redes. Hay botones anterior/siguiente, contador y pausa/reanudación. Se pausa al pasar el puntero, al usar el teclado dentro del carrusel y al ocultar la pestaña. Si el visitante prefiere movimiento reducido, empieza pausado. Con un solo integrante se muestra una tarjeta estática; sin integrantes se conserva Próximamente. Cambia el intervalo en `initMemberSlider($('#integrantes'), 5000)` (milisegundos; por defecto 5000).

### Música y multimedia

Cada canción admite portada, audio, descripción y una lista de enlaces a plataformas. `embed` acepta enlaces oficiales de inserción de Spotify, YouTube, YouTube con privacidad mejorada o Vimeo; no la URL normal de visualización. Los reproductores tienen controles y no se reproducen solos. Para vídeos locales usa MP4; si hay voz o letra, añade pistas de subtítulos mediante `<track>` en el reproductor correspondiente antes de publicarlos. Añade a `galeria` elementos de tipo `imagen`, `video` o `embed`. Las imágenes se amplían en un diálogo que se cierra con el botón o Escape.

### Conciertos

Usa fechas `AAAA-MM-DD`. Se ordenan automáticamente: hoy y fechas posteriores aparecen como próximos; las anteriores, en el histórico. Estados admitidos: `Entradas disponibles`, `Agotado`, `Entrada libre`. Un concierto agotado no muestra botón de compra. Puedes dejar entradas y cartel vacíos; no se crean enlaces falsos. El enlace de una entrada libre se etiqueta como información.

### Merch, redes y dossier

Para productos sin tienda, el botón abre una consulta por correo. Precio y tallas son opcionales. En `redes`, añade únicamente cuentas oficiales completas con `https://`; aparecen también en el pie. Deja `dossier` vacío hasta disponer del PDF definitivo y luego indica su ruta.

### Contacto

El correo es `somosspicy@gmail.com`. Los botones abren el gestor de correo del visitante. No hay formulario ni servidor. Copiar correo funciona en HTTPS o localhost; si el navegador lo impide, se muestra un mensaje con una alternativa. Si cambias el correo, sustituye todas sus apariciones en HTML y JS.

## Publicar en GitHub Pages

1. Crea un repositorio en tu cuenta de GitHub.
2. Sube **el contenido de esta carpeta**, de forma que `index.html`, `style.css`, `script.js` y `assets/` queden en la raíz de la rama `main`. No subas el ZIP como único archivo.
3. Abre Settings → Pages. En Build and deployment selecciona Deploy from a branch, rama `main`, carpeta `/ (root)` y guarda.
4. Espera a que GitHub termine el despliegue y abre la dirección que muestra Pages. Las rutas relativas permiten alojarlo en `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.
5. En `index.html`, añade etiquetas `og:url` y `og:image` con las URL públicas absolutas de la web y `assets/logo-spicy.jpg`. Para una vista previa social más cuidada, sustituye esta última por una imagen propia de 1200 × 630.
6. Para actualizar, edita los archivos y confirma los cambios en `main`; Pages publicará la nueva versión automáticamente. Si no aparece, revisa Actions y recarga sin caché.

Los archivos están disponibles en el repositorio pbxbtbx/SomosSpicyWeb. La publicación se gestiona desde Settings → Pages.

## Contenido pendiente

Biografía y frase definitivas, foto de grupo, nombres e instrumentos, fotos individuales, canciones y portadas, previews, enlaces oficiales, fechas confirmadas, catálogo de merch, galería y dossier. No hay fechas, precios, cuentas o integrantes inventados.

## Accesibilidad y mantenimiento

La navegación, presentación, contacto y estados vacíos siguen disponibles sin JavaScript. Los listados configurados requieren JavaScript; si quieres que esos datos se lean también sin él, añade su versión HTML. Revisa los textos alternativos, subtítulos y contraste al cambiar recursos o colores. No añadas credenciales ni información privada: todo archivo publicado será accesible.

## Spotify, Patreon y novedades

Instagram ya enlaza a `https://www.instagram.com/_losspicy/`. Añade las URL oficiales en `CONFIG.spotify` y `CONFIG.patreon`: los estados pendientes se convierten en enlaces automáticamente.

El formulario está visible pero desactivado hasta configurar un servicio real. GitHub Pages no almacena ni envía suscripciones. En `CONFIG.newsletter`, indica el endpoint HTTPS POST proporcionado por el servicio, el nombre exacto del campo de correo, los campos ocultos públicos que exija y la URL de vuestra política de privacidad. No pongas claves API en la web. Si el proveedor requiere JavaScript propio, una API o CAPTCHA, habrá que adaptar la integración siguiendo sus instrucciones.

Una vez conectado, el formulario valida el correo y requiere consentimiento antes de enviar al proveedor. El proveedor debe confirmar el alta; la web no muestra un éxito ficticio. Configura también la baja y, preferiblemente, confirmación por correo en el proveedor. Comprueba el recorrido completo con una dirección de prueba antes de abrir las suscripciones.

Las guindillas son elementos decorativos sin interacción y se ocultan a lectores de pantalla. Las frases se editan directamente en index.html.

## Versión WordPress

Tema instalable en wordpress/spicy. Consulta wordpress/INSTALACION.md. La versión de la raíz sigue funcionando en GitHub Pages. La fuente secundaria ahora es Arial/Helvetica, con Shrikhand solo en títulos.

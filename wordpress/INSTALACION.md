# SPICY para WordPress

Instala `spicy-wordpress.zip` desde **Apariencia → Temas → Añadir tema → Subir tema**, o copia la carpeta `spicy` a `wp-content/themes/` y activa **SPICY**. Necesitas una instalación que permita subir temas personalizados. No pegues los PHP en un bloque HTML.

La portada de la banda se muestra con `front-page.php`. Las páginas normales (incluida la política de privacidad) usan `index.php` y muestran el contenido del editor. Puedes crear una página Inicio y seleccionarla en Ajustes → Lectura como portada estática. Si ya tienes otro tema, guarda una copia antes de sustituirlo; esta entrega es un tema completo, no un complemento de Elementor.

## Editar desde el panel

- **Integrantes → Añadir**: título = nombre; contenido = biografía; extracto = instrumento; imagen destacada = foto; atributo Orden = posición. Publica al menos dos para activar el slider automático. Los integrantes también se muestran sin JavaScript.
- **Apariencia → Personalizar → SPICY · Redes y novedades**: Instagram, Spotify, Patreon, biografía y conexión del formulario de novedades.
- **Páginas**: crea la política de privacidad real y copia su URL en los ajustes del tema.

El formulario permanece cerrado hasta configurar un endpoint HTTPS real y la política de privacidad. No se guardan suscriptores en WordPress. Si tu proveedor necesita campos ocultos adicionales, intégralos mediante el filtro `spicy_site_config` en un tema hijo o complemento propio. No añadas claves privadas en JavaScript.

El resto del contenido sigue editable en las plantillas PHP y en CONFIG de `script.js` (canciones, conciertos, merch y galería). No todas las secciones son bloques del editor. Las modificaciones de código se deben mantener en un tema hijo para no perderlas al actualizar. El filtro `spicy_site_config` permite suministrar los listados desde un complemento sin editar el tema.

## Organización

- `header.php` y `footer.php`: marco de la web y ganchos de WordPress.
- `front-page.php`: portada de SPICY.
- `index.php`: páginas y entradas normales.
- `style.css`: estilos y cabecera del tema.
- `script.js`: interacciones y configuración de los listados.
- `functions.php`: carga de recursos, ajustes e integrantes.
- `assets/`: logo y recursos locales.

Los recursos usan rutas del tema y funcionan aunque WordPress esté instalado en una subcarpeta. La tipografía secundaria es Arial/Helvetica; Shrikhand se reserva para los títulos. Solo la fuente de títulos se carga de Google Fonts.

## Comprobación al instalar

Revisa portada y móvil, añade dos integrantes de prueba, comprueba navegación, abre una página de privacidad, configura redes y verifica el alta completa con tu proveedor antes de abrir el formulario. Prueba sin iniciar sesión para comprobar las cachés del sitio.

El paquete se ha comprobado estructuralmente y el JavaScript pasa la comprobación de sintaxis. No se ha ejecutado en una instalación WordPress ni validado con un intérprete PHP en este entorno.

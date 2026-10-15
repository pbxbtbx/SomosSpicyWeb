/* EDITA LOS DATOS AQUÍ. Deja vacías las listas sin contenido confirmado.
   Las rutas de recursos son relativas: assets/foto.jpg, assets/cancion.mp3.
   Ejemplos (copia dentro de la lista correspondiente y sustituye los datos):
   canciones: { titulo: 'Título real', tipo: 'Single', descripcion: 'Descripción', portada: 'assets/portada.jpg', audio: 'assets/preview.mp3', enlaces: [{ nombre: 'Spotify', url: 'https://...' }], embed: '' }
   conciertos: { fecha: '2027-05-23', ciudad: 'Ciudad', sala: 'Sala', estado: 'Entradas disponibles', entradas: 'https://...', cartel: 'assets/cartel.jpg' }
   miembros: { nombre: 'Nombre', instrumento: 'Instrumento', bio: 'Biografía', foto: 'assets/integrante.jpg', redes: [{ nombre: 'Instagram', url: 'https://...' }] }
   productos: { nombre: 'Producto', descripcion: 'Descripción', tallas: 'S, M, L', precio: 'Precio real', imagen: 'assets/producto.jpg', tienda: '' }
   galeria: { tipo: 'imagen', src: 'assets/foto.jpg', descripcion: 'Descripción de la foto' }
   galeria: { tipo: 'video', src: 'assets/video.mp4', descripcion: 'Descripción del vídeo' }
   También se admite tipo: 'embed' con un enlace oficial de inserción de YouTube/Vimeo.
   redes: { nombre: 'Instagram', url: 'URL real' }
*/
const CONFIG = {
  canciones: [], conciertos: [], miembros: [], productos: [], galeria: [],
  redes: [{ nombre: 'Instagram · @_losspicy', url: 'https://www.instagram.com/_losspicy/' }],
  spotify: '', // URL pública del perfil oficial
  patreon: '', // URL pública de vuestra página de Patreon
  newsletter: {
    action: '', // Endpoint HTTPS POST facilitado por el proveedor de email marketing
    campoCorreo: 'EMAIL', // Nombre del campo que espera el proveedor (EMAIL, email...)
    privacidad: '', // URL de la política real antes de admitir suscripciones
    camposOcultos: {} // Solo identificadores públicos que requiera el proveedor; nunca claves privadas
  },
  dossier: '' // Por ejemplo: assets/dossier-spicy.pdf
};

const $ = (selector) => document.querySelector(selector);
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function safeUrl(value, external = false) {
  if (typeof value !== 'string' || !value.trim()) return '';
  try { const url = new URL(value, document.baseURI);
    if (!['http:', 'https:'].includes(url.protocol) && !(location.protocol === 'file:' && url.protocol === 'file:' && !external)) return '';
    if (external && !/^https?:\/\//i.test(value)) return '';
    return url.href;
  } catch { return ''; }
}
function link(label, url, className = 'text-link', external = false) {
  const href = safeUrl(url, external); if (!href) return null;
  const a = element('a', label, className); a.href = href;
  if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  return a;
}
function links(items) {
  const box = element('div', '', 'social-list');
  for (const item of items || []) { const a = link(item.nombre + ' ↗', item.url, '', true); if (a) box.append(a); }
  return box;
}
function picture(src, alt) {
  const url = safeUrl(src); if (!url) return null;
  const img = element('img'); img.src = url; img.alt = alt; img.loading = 'lazy';
  img.addEventListener('error', () => { img.replaceWith(element('p', 'Imagen pendiente de actualizar', 'placeholder-note')); }, { once: true });
  return img;
}
function embed(src, title) {
  const value = safeUrl(src, true); if (!value) return null;
  const u = new URL(value);
  const allowed = (['www.youtube.com', 'www.youtube-nocookie.com'].includes(u.hostname) && u.pathname.startsWith('/embed/')) || (u.hostname === 'player.vimeo.com' && u.pathname.startsWith('/video/')) || (u.hostname === 'open.spotify.com' && u.pathname.startsWith('/embed/'));
  if (!allowed) return null;
  const frame = element('iframe'); frame.src = u.href; frame.title = title; frame.loading = 'lazy'; frame.allow = 'encrypted-media; fullscreen; picture-in-picture'; frame.referrerPolicy = 'strict-origin-when-cross-origin'; frame.allowFullscreen = true; return frame;
}
if (CONFIG.canciones.length) {
  const box = $('#canciones'); box.replaceChildren();
  for (const song of CONFIG.canciones) {
    const article = element('article', '', 'release');
    const cover = picture(song.portada, 'Portada de ' + song.titulo);
    if (cover) article.append(cover);
    else { const art = element('div', '', 'record-art'); const record = element('div', '', 'vinyl'); record.append(element('span', 'SPICY')); art.append(record); article.append(art); }
    const info = element('div', '', 'release-info'); info.append(element('span', song.tipo || 'MÚSICA', 'tag'), element('h3', song.titulo), element('p', song.descripcion));
    const audioUrl = safeUrl(song.audio);
    if (audioUrl) { const audio = element('audio'); audio.controls = true; audio.preload = 'none'; audio.src = audioUrl; audio.setAttribute('aria-label', 'Preview de ' + song.titulo); audio.addEventListener('error', () => audio.replaceWith(element('p', 'Preview pendiente de actualizar.'))); audio.addEventListener('play', () => document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); })); info.append(audio); }
    else info.append(element('p', 'Preview próximamente.'));
    const player = embed(song.embed, 'Escucha ' + song.titulo); if (player) info.append(player);
    info.append(links(song.enlaces)); article.append(info); box.append(article);
  }
}
// Fechas sin hora: comparación local para evitar cambios de día por zona horaria.
function validDate(date) { if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return false; const d = new Date(date + 'T12:00:00'); return !isNaN(d) && d.getFullYear() === Number(date.slice(0,4)) && d.getMonth()+1 === Number(date.slice(5,7)) && d.getDate() === Number(date.slice(8,10)); }
const now = new Date(); const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
const dates = CONFIG.conciertos.filter(gig => validDate(gig.fecha)).sort((a,b) => a.fecha.localeCompare(b.fecha));
function gigRow(gig, past) {
  const row = element('article', '', 'gig-row'); const time = element('time', new Date(gig.fecha+'T12:00:00').toLocaleDateString('es-ES',{day:'numeric',month:'short',year:'numeric'})); time.dateTime = gig.fecha; row.append(time);
  const info = element('div'); info.append(element('h3', gig.ciudad), element('p', gig.sala), element('p', past ? 'Concierto pasado' : gig.estado || 'Próximamente')); row.append(info);
  const poster = picture(gig.cartel, 'Cartel del concierto en ' + gig.ciudad); if (poster) row.append(poster);
  if (!past && gig.estado !== 'Agotado') { const a = link(gig.estado === 'Entrada libre' ? 'Más información ↗' : 'Entradas ↗', gig.entradas, 'button dark', true); if(a) row.append(a); } return row;
}
const upcoming = dates.filter(gig => gig.fecha >= today); const past = dates.filter(gig => gig.fecha < today);
if (upcoming.length) $('#proximos').replaceChildren(...upcoming.map(gig => gigRow(gig,false)));
if (past.length) $('#pasados').append(element('h3','Así sonaron las últimas citas'), ...past.reverse().map(gig => gigRow(gig,true)));
if (CONFIG.miembros.length) $('#integrantes').replaceChildren(...CONFIG.miembros.map(member => { const card = element('article','','member'); const img = picture(member.foto,member.nombre + ', ' + member.instrumento); if(img) card.append(img); card.append(element('h3',member.nombre),element('p',member.instrumento,'tag'),element('p',member.bio),links(member.redes)); return card; }));

// Carrusel: un integrante por diapositiva. Sin datos, conserva Próximamente.
function initMemberSlider(container, interval = 5000) {
  const slides = Array.from(container.children);
  if (slides.length < 2 || !slides.every(slide => slide.classList.contains('member'))) return;
  container.classList.add('member-slider');
  container.setAttribute('role', 'region');
  container.setAttribute('aria-roledescription', 'carrusel');
  container.setAttribute('aria-label', 'Integrantes de SPICY');
  const controls = element('div', '', 'member-controls');
  const previous = element('button', '←', 'member-arrow');
  const next = element('button', '→', 'member-arrow');
  previous.setAttribute('aria-label', 'Integrante anterior');
  next.setAttribute('aria-label', 'Siguiente integrante');
  const toggle = element('button', 'Pausar', 'member-toggle');
  const count = element('span', '', 'member-count');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer = null, paused = reduced.matches, hovering = false;
  function show(value) {
    index = (value + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== index;
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'diapositiva');
      slide.setAttribute('aria-label', (i + 1) + ' de ' + slides.length);
    });
    count.textContent = (index + 1) + ' / ' + slides.length;
  }
  function schedule() {
    clearInterval(timer); timer = null;
    toggle.textContent = paused ? 'Reanudar' : 'Pausar';
    toggle.setAttribute('aria-label', paused ? 'Reanudar slider automático' : 'Pausar slider automático');
    if (!paused && !hovering && !document.hidden && !container.contains(document.activeElement)) {
      timer = setInterval(() => show(index + 1), interval);
    }
  }
  previous.addEventListener('click', () => { show(index - 1); schedule(); });
  next.addEventListener('click', () => { show(index + 1); schedule(); });
  toggle.addEventListener('click', () => { paused = !paused; schedule(); });
  container.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  container.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  container.addEventListener('focusin', schedule);
  container.addEventListener('focusout', () => { queueMicrotask(schedule); });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => { paused = reduced.matches; schedule(); });
  controls.append(previous, count, next, toggle);
  container.append(controls);
  show(0); schedule();
}
initMemberSlider($('#integrantes'));

if (CONFIG.productos.length) $('#productos').replaceChildren(...CONFIG.productos.map(product => { const card = element('article','','product'); const img = picture(product.imagen,product.nombre); if(img) card.append(img); card.append(element('h3',product.nombre),element('p',product.descripcion)); if(product.tallas) card.append(element('p','Tallas: '+product.tallas)); if(product.precio) card.append(element('p',product.precio)); const shop = link('Ver en la tienda ↗',product.tienda,'button dark',true); if(shop) card.append(shop); else { const a=element('a','Consultar por correo ↗','button dark'); a.href='mailto:somosspicy@gmail.com?subject='+encodeURIComponent('Merch SPICY: '+product.nombre); card.append(a); } return card; }));
const media = CONFIG.galeria.map(item => {
  if(item.tipo === 'embed') return embed(item.src,item.descripcion);
  const src = safeUrl(item.src); if(!src) return null;
  const card = element('div');
  if(item.tipo === 'video') { const video = element('video'); video.src=src; video.controls=true; video.preload='none'; video.style.width='100%'; video.setAttribute('aria-label',item.descripcion); card.append(video); }
  else { const img=picture(item.src,item.descripcion); const button=element('button','','gallery-item'); button.setAttribute('aria-label','Ampliar: '+item.descripcion); button.append(img); button.addEventListener('click',()=>{ const dialog=$('#lightbox'); dialog.querySelector('img').src=src; dialog.querySelector('img').alt=item.descripcion; dialog.showModal(); }); card.append(button); }
  card.append(element('p',item.descripcion)); return card;
}).filter(Boolean);
if(media.length) $('#multimedia').replaceChildren(...media);
const social=links(CONFIG.redes); if(social.childElementCount) { $('#social-links').replaceChildren(social); $('#footer-social').append(links(CONFIG.redes)); }
const dossier=link('Descarga el dossier de prensa ↓',CONFIG.dossier,'button light'); if(dossier) { dossier.style.marginTop='25px'; $('#dossier').append(dossier); }
$('#year').textContent=now.getFullYear();
const menu=$('#menu'); const nav=$('#navegacion'); menu.hidden=false; nav.classList.add('mobile-collapsed');
function closeMenu(){ nav.classList.add('mobile-collapsed'); menu.setAttribute('aria-expanded','false'); menu.textContent='Menú +'; }
menu.addEventListener('click',()=>{ const open=menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('mobile-collapsed',!open); menu.setAttribute('aria-expanded',String(open)); menu.textContent=open?'Cerrar −':'Menú +'; });
nav.addEventListener('click',event=>{ if(event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown',event=>{ if(event.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){ closeMenu(); menu.focus(); } });
$('#copiar').hidden=false; $('#copiar').addEventListener('click',async()=>{ try{ await navigator.clipboard.writeText('somosspicy@gmail.com'); $('#copy-status').textContent='¡Correo copiado!'; }catch{ $('#copy-status').textContent='No se pudo copiar. Selecciona el correo o pulsa el enlace para escribirnos.'; } });
$('#cerrar-imagen').addEventListener('click',()=>$('#lightbox').close());
$('#lightbox').addEventListener('click',event=>{ if(event.target===$('#lightbox')) $('#lightbox').close(); });

/* Plataformas y suscripciones: no se inventan perfiles ni se guardan correos localmente. */
for (const [selector, url, label] of [
  ['#spotify-perfil', CONFIG.spotify, 'Escucha a SPICY en Spotify ↗'],
  ['#patreon-perfil', CONFIG.patreon, 'Visita nuestro Patreon ↗']
]) {
  const destination = link(label, url, 'button dark', true);
  if (destination) $(selector).querySelector('.platform-pending').replaceWith(destination);
}
const newsletter = CONFIG.newsletter;
const subscriptionForm = $('#newsletter-form');
const endpoint = safeUrl(newsletter.action, true);
const privacyUrl = safeUrl(newsletter.privacidad);
if (endpoint && new URL(endpoint).protocol === 'https:' && privacyUrl) {
  subscriptionForm.action = endpoint;
  $('#newsletter-email').name = newsletter.campoCorreo || 'EMAIL';
  const privacy = $('#newsletter-privacy');
  privacy.href = privacyUrl; privacy.target = '_blank'; privacy.rel = 'noopener noreferrer';
  privacy.hidden = false; $('#newsletter-privacy-pending').hidden = true;
  for (const [name, value] of Object.entries(newsletter.camposOcultos || {})) {
    const input = element('input'); input.type = 'hidden'; input.name = name; input.value = String(value); subscriptionForm.append(input);
  }
  subscriptionForm.querySelectorAll('input, button').forEach(control => { control.disabled = false; });
  $('#newsletter-status').textContent = 'El alta se tramita con nuestro proveedor de correo. Podrás darte de baja desde cada envío.';
  subscriptionForm.addEventListener('submit', () => {
    // Envío POST normal al proveedor: su página debe confirmar el alta (y el doble opt-in si se configura).
    $('#newsletter-status').textContent = 'Abriendo el servicio de suscripción para completar el alta…';
  });
} else {
  subscriptionForm.addEventListener('submit', event => {
    event.preventDefault();
    $('#newsletter-status').textContent = 'Las suscripciones todavía no están abiertas.';
  });
}

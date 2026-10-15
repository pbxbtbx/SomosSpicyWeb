<?php if (!defined('ABSPATH')) { exit; } ?>

<footer><a class="brand brand-with-logo" href="<?php echo esc_url(home_url('/#inicio')); ?>" aria-label="SPICY, volver al inicio"><span class="logo-variation logo-footer" aria-hidden="true"><img src="<?php echo esc_url(get_template_directory_uri() . '/assets/logo-spicy.jpg'); ?>" alt="" width="575" height="576" loading="lazy"></span><span class="brand-name">SPICY✳</span></a><p>Genuinamente SPICY.</p><nav aria-label="Pie de página"><a href="<?php echo esc_url(home_url('/#musica')); ?>">Música</a><a href="<?php echo esc_url(home_url('/#conciertos')); ?>">Conciertos</a><a href="mailto:somosspicy@gmail.com">Contacto</a></nav><div id="footer-social"></div><small>© <span id="year"><?php echo esc_html(wp_date('Y')); ?></span> SPICY</small></footer>
<dialog id="lightbox" aria-label="Imagen ampliada"><button id="cerrar-imagen" aria-label="Cerrar imagen">Cerrar ×</button><img alt=""></dialog>
<?php wp_footer(); ?>
</body></html>

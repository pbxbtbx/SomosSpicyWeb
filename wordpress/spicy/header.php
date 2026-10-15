<?php if (!defined('ABSPATH')) { exit; } ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="El universo de SPICY: música, conciertos, integrantes y contacto para contratación.">
  <meta property="og:title" content="SPICY · Dale un poco de picante"><meta property="og:description" content="Música, directo y mucho picante. Entra en el universo SPICY."><meta property="og:type" content="website">
  <!-- Al publicar, añade og:url y og:image con la URL absoluta de la web y del logo. -->
  <meta name="theme-color" content="#ff4036">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip" href="#contenido">Saltar al contenido</a>
<header class="header"><a href="<?php echo esc_url(home_url('/#inicio')); ?>" class="brand brand-with-logo" aria-label="SPICY, inicio"><span class="logo-variation logo-mini" aria-hidden="true"><img src="<?php echo esc_url(get_template_directory_uri() . '/assets/logo-spicy.jpg'); ?>" alt="" width="575" height="576" loading="lazy"></span><span class="brand-name">SPICY</span></a><button id="menu" class="menu" aria-expanded="false" aria-controls="navegacion" hidden>Menú +</button><nav id="navegacion" aria-label="Principal"><a href="<?php echo esc_url(home_url('/#nosotros')); ?>">La banda</a><a href="<?php echo esc_url(home_url('/#musica')); ?>">Música</a><a href="<?php echo esc_url(home_url('/#conciertos')); ?>">Conciertos</a><a href="<?php echo esc_url(home_url('/#merch')); ?>">Merch</a><a href="<?php echo esc_url(home_url('/#contacto')); ?>" class="nav-contact">Hablemos ↗</a></nav></header>

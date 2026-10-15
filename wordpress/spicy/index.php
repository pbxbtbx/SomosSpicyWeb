<?php
if (!defined('ABSPATH')) { exit; }
get_header(); ?>
<main id="contenido" class="section wp-content">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<article <?php post_class(); ?>><h1><?php the_title(); ?></h1><?php the_content(); ?></article>
<?php endwhile; the_posts_pagination(); else : ?>
<h1>No hay contenido todavía.</h1><a href="<?php echo esc_url(home_url('/')); ?>">Volver a SPICY</a>
<?php endif; ?>
</main>
<?php get_footer(); ?>

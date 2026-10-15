<?php
/** Configuración del tema SPICY. */
if (!defined('ABSPATH')) { exit; }
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
});
add_action('init', function () {
    register_post_type('spicy_member', array(
        'labels' => array('name' => 'Integrantes', 'singular_name' => 'Integrante', 'add_new_item' => 'Añadir integrante'),
        'public' => false, 'show_ui' => true, 'show_in_rest' => true,
        'menu_icon' => 'dashicons-groups',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'),
    ));
});
add_action('customize_register', function ($customizer) {
    $customizer->add_section('spicy_options', array('title' => 'SPICY · Redes y novedades', 'priority' => 30));
    $fields = array(
        'instagram' => array('Instagram', 'https://www.instagram.com/_losspicy/', 'esc_url_raw', 'url'),
        'spotify' => array('Perfil de Spotify', '', 'esc_url_raw', 'url'),
        'patreon' => array('Página de Patreon', '', 'esc_url_raw', 'url'),
        'newsletter_action' => array('Formulario: endpoint HTTPS del proveedor', '', 'esc_url_raw', 'url'),
        'newsletter_field' => array('Formulario: nombre del campo de correo', 'EMAIL', 'sanitize_text_field', 'text'),
        'newsletter_privacy' => array('URL de la política de privacidad', '', 'esc_url_raw', 'url'),
        'bio' => array('Biografía de la banda', 'Aquí compartiremos de dónde venimos, qué nos inspira y la música que queremos llevar al escenario.', 'sanitize_textarea_field', 'textarea'),
    );
    foreach ($fields as $key => $field) {
        $customizer->add_setting('spicy_' . $key, array('default' => $field[1], 'sanitize_callback' => $field[2]));
        $customizer->add_control('spicy_' . $key, array('label' => $field[0], 'section' => 'spicy_options', 'type' => $field[3]));
    }
});
add_action('wp_enqueue_scripts', function () {
    $base = trailingslashit(get_template_directory_uri());
    wp_enqueue_style('spicy-display', 'https://fonts.googleapis.com/css2?family=Shrikhand&display=swap', array(), null);
    wp_enqueue_style('spicy', get_stylesheet_uri(), array('spicy-display'), filemtime(get_stylesheet_directory() . '/style.css'));
    if (!is_front_page()) { return; }
    wp_enqueue_script('spicy', $base . 'script.js', array(), filemtime(get_template_directory() . '/script.js'), true);
    $members = array();
    foreach (get_posts(array('post_type' => 'spicy_member', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => array('menu_order' => 'ASC', 'title' => 'ASC'))) as $member) {
        $members[] = array('nombre' => $member->post_title, 'instrumento' => wp_strip_all_tags($member->post_excerpt), 'bio' => wp_strip_all_tags($member->post_content), 'foto' => get_the_post_thumbnail_url($member->ID, 'large') ?: '', 'redes' => array());
    }
    $instagram = get_theme_mod('spicy_instagram', 'https://www.instagram.com/_losspicy/');
    $config = array(
        'miembros' => $members,
        'redes' => $instagram ? array(array('nombre' => 'Instagram · SPICY', 'url' => esc_url_raw($instagram))) : array(),
        'spotify' => get_theme_mod('spicy_spotify', ''),
        'patreon' => get_theme_mod('spicy_patreon', ''),
        'newsletter' => array('action' => get_theme_mod('spicy_newsletter_action', ''), 'campoCorreo' => get_theme_mod('spicy_newsletter_field', 'EMAIL'), 'privacidad' => get_theme_mod('spicy_newsletter_privacy', ''), 'camposOcultos' => array()),
    );
    $config = apply_filters('spicy_site_config', $config);
    wp_add_inline_script('spicy', 'window.SPICY_ASSET_BASE = ' . wp_json_encode($base, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) . '; window.SPICY_CONFIG = ' . wp_json_encode($config, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) . ';', 'before');
});

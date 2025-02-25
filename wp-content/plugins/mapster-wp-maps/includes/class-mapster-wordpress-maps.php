<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://mapster.me
 * @since      1.0.0
 *
 * @package    Mapster_Wordpress_Maps
 * @subpackage Mapster_Wordpress_Maps/includes
 */
/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Mapster_Wordpress_Maps
 * @subpackage Mapster_Wordpress_Maps/includes
 * @author     Mapster Technology Inc <hello@mapster.me>
 */
class Mapster_Wordpress_Maps {
    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      Mapster_Wordpress_Maps_Loader    $loader    Maintains and registers all hooks for the plugin.
     */
    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $plugin_name    The string used to uniquely identify this plugin.
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $version    The current version of the plugin.
     */
    protected $version;

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function __construct() {
        if ( defined( 'MAPSTER_WORDPRESS_MAPS_VERSION' ) ) {
            $this->version = MAPSTER_WORDPRESS_MAPS_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'mapster-wordpress-maps';
        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - Mapster_Wordpress_Maps_Loader. Orchestrates the hooks of the plugin.
     * - Mapster_Wordpress_Maps_i18n. Defines internationalization functionality.
     * - Mapster_Wordpress_Maps_Admin. Defines all hooks for the admin area.
     * - Mapster_Wordpress_Maps_Public. Defines all hooks for the public side of the site.
     *
     * Create an instance of the loader which will be used to register the hooks
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function load_dependencies() {
        /**
         * The class responsible for orchestrating the actions and filters of the
         * core plugin.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-mapster-wordpress-maps-loader.php';
        /**
         * The class responsible for defining internationalization functionality
         * of the plugin.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-mapster-wordpress-maps-i18n.php';
        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-mapster-wordpress-maps-admin.php';
        /**
         * Custom REST routes for getting data to the React app
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/api/class-mapster-wordpress-maps-api.php';
        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-mapster-wordpress-maps-public.php';
        $this->loader = new Mapster_Wordpress_Maps_Loader();
    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the Mapster_Wordpress_Maps_i18n class in order to set the domain and to register the hook
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function set_locale() {
        $plugin_i18n = new Mapster_Wordpress_Maps_i18n();
        $this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_admin_hooks() {
        $plugin_admin = new Mapster_Wordpress_Maps_Admin($this->get_plugin_name(), $this->get_version());
        $this->loader->add_action( 'plugins_loaded', $plugin_admin, 'mapster_load_acf' );
        $this->loader->add_action( 'init', $plugin_admin, 'add_mapster_wp_maps_default_options' );
        $this->loader->add_action( 'init', $plugin_admin, 'create_mapster_wp_maps_post_types' );
        $this->loader->add_action( 'init', $plugin_admin, 'mapster_add_default_popups' );
        $this->loader->add_action( 'init', $plugin_admin, 'load_mapster_map_block' );
        $this->loader->add_action( 'add_meta_boxes', $plugin_admin, 'add_mapster_wp_map_metabox' );
        $this->loader->add_filter( 'manage_mapster-wp-map_posts_columns', $plugin_admin, 'set_custom_mapster_map_column' );
        $this->loader->add_action(
            'manage_mapster-wp-map_posts_custom_column',
            $plugin_admin,
            'custom_mapster_map_shortcode_column',
            10,
            2
        );
        $this->loader->add_filter( 'manage_mapster-wp-location_posts_columns', $plugin_admin, 'set_custom_mapster_map_features_column' );
        $this->loader->add_filter( 'manage_mapster-wp-line_posts_columns', $plugin_admin, 'set_custom_mapster_map_features_column' );
        $this->loader->add_filter( 'manage_mapster-wp-polygon_posts_columns', $plugin_admin, 'set_custom_mapster_map_features_column' );
        $this->loader->add_action(
            'manage_mapster-wp-location_posts_custom_column',
            $plugin_admin,
            'custom_mapster_map_features_shortcode_column',
            10,
            2
        );
        $this->loader->add_action(
            'manage_mapster-wp-line_posts_custom_column',
            $plugin_admin,
            'custom_mapster_map_features_shortcode_column',
            10,
            2
        );
        $this->loader->add_action(
            'manage_mapster-wp-polygon_posts_custom_column',
            $plugin_admin,
            'custom_mapster_map_features_shortcode_column',
            10,
            2
        );
        $this->loader->add_filter(
            'use_block_editor_for_post_type',
            $plugin_admin,
            'mapster_maps_disable_gutenberg',
            10,
            2
        );
        $this->loader->add_filter(
            'post_row_actions',
            $plugin_admin,
            'mapster_wp_maps_row_action_menu',
            10,
            2
        );
        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
        $this->loader->add_action( 'admin_menu', $plugin_admin, 'mapster_wp_maps_settings_menu' );
        $this->loader->add_action( 'admin_init', $plugin_admin, 'mapster_wp_maps_settings_form_init' );
        $custom_endpoints = new Mapster_Wordpress_Maps_Admin_API($this->get_plugin_name(), $this->get_version());
        $this->loader->add_action( 'rest_api_init', $custom_endpoints, 'mapster_wp_maps_get_single_feature' );
        $this->loader->add_action( 'rest_api_init', $custom_endpoints, 'mapster_wp_maps_get_all_features' );
        $this->loader->add_action( 'rest_api_init', $custom_endpoints, 'mapster_wp_maps_get_map' );
        $this->loader->add_action( 'rest_api_init', $custom_endpoints, 'mapster_wp_maps_get_category_features' );
        $this->loader->add_action( 'rest_api_init', $custom_endpoints, 'mapster_wp_maps_duplicate_post' );
        $this->loader->add_action( 'rest_api_init', $custom_endpoints, 'mapster_wp_maps_import_gl_js_features' );
        $this->loader->add_action( 'rest_api_init', $custom_endpoints, 'mapster_wp_maps_set_tutorial_option' );
        if ( !mwm_fs()->can_use_premium_code() ) {
            $this->loader->add_action( 'rest_api_init', $custom_endpoints, 'mapster_wp_maps_import_geojson_features' );
        }
        $this->loader->add_action( 'in_admin_header', $plugin_admin, 'mapster_wp_maps_custom_header' );
        $this->loader->add_action( 'admin_notices', $plugin_admin, 'mapster_wp_maps_admin_notice' );
        $this->loader->add_filter(
            'acf/input/meta_box_priority',
            $plugin_admin,
            'mapster_set_position_infobox',
            10,
            2
        );
    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_public_hooks() {
        $plugin_public = new Mapster_Wordpress_Maps_Public($this->get_plugin_name(), $this->get_version());
        $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
        $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
        $this->loader->add_action( 'init', $plugin_public, 'mapster_wordpress_maps_register_shortcodes' );
        $this->loader->add_filter( 'the_content', $plugin_public, 'mapster_wordpress_maps_output_shortcode' );
    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public function run() {
        $this->loader->run();
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @since     1.0.0
     * @return    string    The name of the plugin.
     */
    public function get_plugin_name() {
        return $this->plugin_name;
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @since     1.0.0
     * @return    Mapster_Wordpress_Maps_Loader    Orchestrates the hooks of the plugin.
     */
    public function get_loader() {
        return $this->loader;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @since     1.0.0
     * @return    string    The version number of the plugin.
     */
    public function get_version() {
        return $this->version;
    }

}

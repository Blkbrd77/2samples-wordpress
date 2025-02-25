<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://mapster.me
 * @since      1.0.0
 *
 * @package    Mapster_Wordpress_Maps
 * @subpackage Mapster_Wordpress_Maps/admin
 */
/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Mapster_Wordpress_Maps
 * @subpackage Mapster_Wordpress_Maps/admin
 * @author     Mapster Technology Inc <hello@mapster.me>
 */
class Mapster_Wordpress_Maps_Admin {
    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of this plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct( $plugin_name, $version ) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    /**
     * ACF loading and integration
     *
     * @since    1.0.0
     */
    public function mapster_load_acf() {
        if ( !class_exists( 'ACF' ) ) {
            include_once plugin_dir_path( __FILE__ ) . '../includes/acf/acf.php';
            add_filter( 'acf/settings/url', 'my_acf_settings_url' );
            function my_acf_settings_url(  $url  ) {
                return plugin_dir_url( __FILE__ ) . '../includes/acf/';
            }

            if ( !MAPSTER_LOCAL_TESTING ) {
                add_filter( 'acf/settings/show_admin', 'my_acf_settings_show_admin' );
                function my_acf_settings_show_admin(  $show_admin  ) {
                    if ( is_plugin_active( 'advanced-custom-fields/acf.php' ) || is_plugin_active( 'advanced-custom-fields-pro/acf.php' ) ) {
                        return true;
                    } else {
                        return false;
                    }
                }

            }
        }
        include_once plugin_dir_path( __FILE__ ) . '../includes/acf-mapster-map/acf-mapster-map.php';
        if ( !class_exists( 'acf_plugin_photo_gallery' ) ) {
            if ( !is_plugin_active( 'navz-photo-gallery/navz-photo-gallery.php' ) ) {
                include_once plugin_dir_path( __FILE__ ) . '../includes/acf-photo-gallery-field/navz-photo-gallery.php';
            }
        }
        if ( !MAPSTER_LOCAL_TESTING ) {
            include_once plugin_dir_path( __FILE__ ) . '../admin/includes/acf-map-fields.php';
        }
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {
        wp_enqueue_style( 'wp-pointer' );
        $current_screen = get_current_screen();
        if ( $current_screen->id == "mapster-wp-map_page_wordpress-maps-settings" ) {
            wp_enqueue_style(
                'mapster_map_settings',
                plugin_dir_url( __FILE__ ) . "css/mapster-wordpress-settings.css",
                array(),
                $this->version
            );
        }
        if ( $current_screen->id === "mapster-wp-popup" ) {
            wp_enqueue_style(
                $this->plugin_name . '-popup',
                plugin_dir_url( __FILE__ ) . "css/dist/mwp-popup.css",
                array(),
                $this->version
            );
        }
        wp_enqueue_style(
            "mapster_general_admin",
            plugin_dir_url( __FILE__ ) . 'css/mapster-general-admin.css',
            array(),
            $this->version,
            'all'
        );
    }

    /**
     * Get the right delimiter for all permalink types
     *
     * @since    1.0.0
     */
    function mapster_get_rest_url_delimiter() {
        $qd = '?';
        $rest_url = get_rest_url();
        if ( str_contains( $rest_url, '?' ) ) {
            $qd = '&';
        }
        return $qd;
    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts( $hook_suffix ) {
        wp_enqueue_script( 'wp-pointer' );
        $adminInjection = array(
            'tutorial'  => get_option( 'mapster_tutorial' ),
            'nonce'     => wp_create_nonce( 'wp_rest' ),
            'rest_url'  => get_rest_url(),
            'directory' => plugin_dir_url( __FILE__ ),
            'qd'        => $this->mapster_get_rest_url_delimiter(),
        );
        wp_register_script(
            'mapster_map_tutorial',
            plugin_dir_url( __FILE__ ) . "js/mapster-wordpress-maps-tutorial.js",
            array('quicktags', 'wp-pointer'),
            $this->version,
            true
        );
        wp_localize_script( 'mapster_map_tutorial', 'mapster_tutorial', $adminInjection );
        wp_enqueue_script( 'mapster_map_tutorial' );
        $current_screen = get_current_screen();
        $i18n = new Mapster_Wordpress_Maps_i18n();
        if ( $current_screen->id == "mapster-wp-map" ) {
            $settings_page_id = get_option( 'mapster_settings_page' );
            $access_token = get_field( 'default_access_token', $settings_page_id );
            $default_latitude = get_field( 'pro_default_map_view_default_latitude', $settings_page_id );
            $default_longitude = get_field( 'pro_default_map_view_default_longitude', $settings_page_id );
            $default_zoom = get_field( 'pro_default_map_view_default_zoom', $settings_page_id );
            $injectedParams = array(
                'strings'              => $i18n->get_mapster_strings()['admin_js'],
                'public'               => false,
                'activated'            => ( mwm_fs()->can_use_premium_code() ? '1' : '0' ),
                'rest_url'             => get_rest_url(),
                'qd'                   => $this->mapster_get_rest_url_delimiter(),
                'directory'            => plugin_dir_url( __FILE__ ),
                'mapbox_access_token'  => $access_token,
                'mapster_default_lat'  => $default_latitude,
                'mapster_default_lng'  => $default_longitude,
                'mapster_default_zoom' => $default_zoom,
                'ip'                   => $_SERVER['REMOTE_ADDR'],
            );
            // register & include JS
            global $post;
            $map_type = get_field( 'map_type', $post->ID );
            $map_provider = ( $map_type && $map_type['map_provider'] ? $map_type['map_provider'] : "maplibre" );
            $model_3d_library = get_field( 'load_3d_model_libraries', $post->ID );
            $elevation_chart_enabled = get_field( 'elevation_line_chart_enable_elevation_chart', $post->ID );
            $store_locator_enabled = false;
            if ( get_field( 'list', $post->ID ) && isset( get_field( 'list', $post->ID )['store_locator_options'] ) ) {
                if ( is_array( get_field( 'list', $post->ID ) ) && !empty( get_field( 'list', $post->ID )['store_locator_options']['enable'] ) ) {
                    $store_locator_enabled = get_field( 'list', $atts['id'] )['store_locator_options']['enable'];
                }
            }
            $last_dependency = 'jquery';
            if ( MAPSTER_LOCAL_TESTING ) {
                $this->mapster_wordpress_maps_script_loading_dev(
                    $last_dependency,
                    $map_provider,
                    $settings_page_id,
                    $model_3d_library,
                    $elevation_chart_enabled,
                    $store_locator_enabled,
                    $injectedParams,
                    $adminInjection
                );
            } else {
                $scripts_to_load = "";
                if ( $map_provider === 'maplibre' || $map_provider === 'custom-image' ) {
                    $scripts_to_load = "maplibre-geocoding-mwp";
                }
                if ( $map_provider === 'mapbox' ) {
                    $scripts_to_load = "mapbox-geocoding-mwp";
                }
                if ( $map_provider === 'google-maps' ) {
                    $google_api_key = get_field( 'google_maps_api_key', $settings_page_id );
                    wp_enqueue_script(
                        'mapster_map_' . $map_provider,
                        "https://maps.googleapis.com/maps/api/js?key=" . $google_api_key . "&libraries=places",
                        array($last_dependency),
                        $this->version
                    );
                    $last_dependency = 'mapster_map_' . $map_provider;
                    $scripts_to_load = "google-mwp";
                }
                if ( $store_locator_enabled ) {
                    wp_enqueue_style( 'mapster_map_store_locator' );
                }
                wp_register_script(
                    'mapster_map_admin_js',
                    plugin_dir_url( __FILE__ ) . "js/dist/mwp-admin.js",
                    array('jquery'),
                    $this->version,
                    true
                );
                wp_localize_script( 'mapster_map_admin_js', 'mapster_admin', $adminInjection );
                wp_enqueue_script( 'mapster_map_admin_js' );
                wp_register_script(
                    $this->plugin_name,
                    plugin_dir_url( __FILE__ ) . '../admin/js/dist/compiled/' . $scripts_to_load . '.js',
                    array($last_dependency),
                    $this->version,
                    true
                );
                wp_localize_script( $this->plugin_name, 'mapster_params', $injectedParams );
                wp_enqueue_script( $this->plugin_name );
                wp_register_style(
                    $this->plugin_name,
                    plugin_dir_url( __FILE__ ) . '../public/css/dist/' . $scripts_to_load . '.css',
                    array(),
                    $this->version,
                    'all'
                );
                wp_enqueue_style( $this->plugin_name );
            }
        }
        if ( $current_screen->id == "mapster-wp-map_page_wordpress-maps-settings" ) {
            $settings_page_id = get_option( 'mapster_settings_page' );
            if ( MAPSTER_LOCAL_TESTING ) {
                wp_register_script(
                    'turf',
                    plugin_dir_url( __FILE__ ) . '../admin/js/vendor/turf.js',
                    array('jquery'),
                    $this->version,
                    false
                );
                wp_register_script(
                    'csvtojson',
                    plugin_dir_url( __FILE__ ) . '../admin/js/vendor/csvtojson.min.js',
                    array('turf'),
                    $this->version,
                    false
                );
                wp_register_script(
                    'togeojson',
                    plugin_dir_url( __FILE__ ) . '../admin/js/vendor/togeojson.js',
                    array('csvtojson'),
                    $this->version,
                    false
                );
                wp_register_script(
                    'proj4',
                    plugin_dir_url( __FILE__ ) . '../admin/js/vendor/proj4.js',
                    array('togeojson'),
                    $this->version,
                    false
                );
                wp_register_script(
                    'shp',
                    plugin_dir_url( __FILE__ ) . '../admin/js/vendor/shp.js',
                    array('proj4'),
                    $this->version,
                    false
                );
                wp_register_script(
                    'mapster_map_settings_js',
                    plugin_dir_url( __FILE__ ) . '../admin/js/mapster-wordpress-maps-settings.js',
                    array('shp'),
                    $this->version,
                    false
                );
            } else {
                wp_register_script(
                    'mapster_map_settings_js',
                    plugin_dir_url( __FILE__ ) . '../admin/js/dist/mwp-settings.js',
                    array('jquery'),
                    $this->version,
                    false
                );
            }
            wp_localize_script( 'mapster_map_settings_js', 'mapster_settings', array(
                'strings'             => $i18n->get_mapster_strings()['settings_js'],
                'mapbox_username'     => get_field( 'mapbox_username', $settings_page_id ),
                'mapbox_secret_token' => get_field( 'mapbox_secret_token', $settings_page_id ),
                'rest_url'            => get_rest_url(),
                'qd'                  => $this->mapster_get_rest_url_delimiter(),
                'tutorial'            => get_option( 'mapster_tutorial' ),
                'nonce'               => wp_create_nonce( 'wp_rest' ),
            ) );
            wp_enqueue_script( 'mapster_map_settings_js' );
        }
        if ( $current_screen->id == "mapster-wp-popup" ) {
            wp_enqueue_script(
                $this->plugin_name . '-popup',
                plugin_dir_url( __FILE__ ) . '/js/dist/mwp-popup.js',
                array('acf-input'),
                $this->version
            );
        }
        if ( $current_screen->id == "edit-mapster-wp-user-sub" || $current_screen->id == "edit-mapster-wp-popup" || $current_screen->id == "edit-mapster-wp-map" || $current_screen->id == "edit-mapster-wp-location" || $current_screen->id == "edit-mapster-wp-line" || $current_screen->id == "edit-mapster-wp-polygon" ) {
            wp_register_script(
                $this->plugin_name . '-general',
                plugin_dir_url( __FILE__ ) . '/js/mapster-wordpress-maps-general.js',
                array('quicktags'),
                $this->version,
                true
            );
            wp_localize_script( $this->plugin_name . '-general', 'mapster_general', array(
                'rest_url' => get_rest_url(),
                'qd'       => $this->mapster_get_rest_url_delimiter(),
                'nonce'    => wp_create_nonce( 'wp_rest' ),
            ) );
            wp_enqueue_script( $this->plugin_name . '-general' );
        }
    }

    /**
     * Strictly for faster testing during development
     *
     * @since    1.0.0
     */
    public function mapster_wordpress_maps_script_loading_dev(
        $last_dependency,
        $map_provider,
        $settings_page_id,
        $model_3d_library,
        $elevation_chart_enabled,
        $store_locator_enabled,
        $injectedParams,
        $adminInjection
    ) {
        wp_register_style(
            'mapster_map_mapbox_css',
            plugin_dir_url( __FILE__ ) . "../admin/css/vendor/mapbox-gl-3.6.0.css",
            array(),
            $this->version
        );
        wp_register_style(
            'mapster_map_maplibre_css',
            plugin_dir_url( __FILE__ ) . "../admin/css/vendor/maplibre-1.15.2.css",
            array(),
            $this->version
        );
        wp_register_style(
            'mapster_map_directions_css',
            plugin_dir_url( __FILE__ ) . "../admin/css/vendor/directions.css",
            array(),
            $this->version
        );
        wp_register_style(
            'mapster_map_geocoder_css',
            plugin_dir_url( __FILE__ ) . "../admin/css/vendor/mapbox-gl-geocoder-4.7.2.css",
            array(),
            $this->version
        );
        // wp_register_style('mapster_map_searchbox_css', plugin_dir_url( __FILE__ ) . "../admin/css/vendor/mapbox-gl-searchbox-beta.css", array(), $this->version);
        wp_register_style(
            $this->plugin_name,
            plugin_dir_url( __FILE__ ) . '../admin/css/mapster-wordpress-maps.css',
            array(),
            $this->version,
            'all'
        );
        wp_register_style(
            'mapster_map_public_css',
            plugin_dir_url( __FILE__ ) . 'css/mapster-wordpress-maps-public.css',
            array(),
            $this->version,
            'all'
        );
        wp_register_style(
            'mapster_map_threebox_css',
            plugin_dir_url( __FILE__ ) . "../admin/css/vendor/threebox.css",
            array(),
            $this->version
        );
        if ( $map_provider === 'maplibre' || $map_provider === 'custom-image' ) {
            wp_enqueue_script(
                'mapster_map_' . $map_provider,
                plugin_dir_url( __FILE__ ) . "../admin/js/vendor/maplibre-1.15.2.js",
                array($last_dependency),
                $this->version
            );
            wp_enqueue_style( "mapster_map_maplibre_css" );
            $last_dependency = 'mapster_map_' . $map_provider;
        }
        if ( $map_provider === 'mapbox' ) {
            wp_enqueue_script(
                'mapster_map_' . $map_provider,
                plugin_dir_url( __FILE__ ) . "../admin/js/vendor/mapbox-gl-3.6.0.js",
                array($last_dependency),
                $this->version
            );
            wp_enqueue_style( "mapster_map_" . $map_provider . "_css" );
            $last_dependency = 'mapster_map_' . $map_provider;
        }
        if ( $map_provider === 'google-maps' ) {
            $google_api_key = get_field( 'google_maps_api_key', $settings_page_id );
            wp_enqueue_script(
                'mapster_map_' . $map_provider,
                "https://maps.googleapis.com/maps/api/js?key=" . $google_api_key . "&libraries=places",
                array($last_dependency),
                $this->version
            );
            wp_enqueue_style( "mapster_map_" . $map_provider . "_css" );
            $last_dependency = 'mapster_map_' . $map_provider;
        }
        wp_enqueue_script(
            'mapster_map_sortable_js',
            plugin_dir_url( __FILE__ ) . "../admin/js/vendor/sortable.min.js",
            array($last_dependency),
            $this->version
        );
        $last_dependency = 'mapster_map_sortable_js';
        wp_enqueue_script(
            'mapster_map_popper_js',
            plugin_dir_url( __FILE__ ) . "../admin/js/vendor/popper.min.js",
            array($last_dependency),
            $this->version
        );
        $last_dependency = 'mapster_map_popper_js';
        wp_enqueue_script(
            'mapster_map_tippy_js',
            plugin_dir_url( __FILE__ ) . "../admin/js/vendor/tippy-bundle.umd.min.js",
            array($last_dependency),
            $this->version
        );
        $last_dependency = 'mapster_map_tippy_js';
        wp_register_script(
            'mapster_map_admin_js',
            plugin_dir_url( __FILE__ ) . "../admin/js/mapster-wordpress-maps-admin.js",
            array($last_dependency),
            $this->version,
            true
        );
        wp_localize_script( 'mapster_map_admin_js', 'mapster_admin', $adminInjection );
        wp_enqueue_script( 'mapster_map_admin_js' );
        $last_dependency = 'mapster_map_admin_js';
        wp_enqueue_script(
            'mapster_map_turf',
            plugin_dir_url( __FILE__ ) . "../admin/js/vendor/custom-turf.js",
            array($last_dependency),
            $this->version
        );
        $last_dependency = 'mapster_map_turf';
        wp_enqueue_style( "mapster_map_directions_css" );
        wp_enqueue_script(
            'mapster_map_directions_js',
            plugin_dir_url( __FILE__ ) . "../admin/js/vendor/mapbox-gl-directions-4.1.0.js",
            array($last_dependency),
            $this->version
        );
        $last_dependency = 'mapster_map_directions_js';
        // wp_enqueue_style( "mapster_map_searchbox_css" );
        // wp_enqueue_script('mapster_map_searchbox_js', plugin_dir_url( __FILE__ ) . "../admin/js/vendor/mapbox-gl-searchbox-beta.js", array($last_dependency), $this->version);
        // $last_dependency = 'mapster_map_searchbox_js';
        wp_enqueue_style( "mapster_map_geocoder_css" );
        wp_enqueue_script(
            'mapster_map_geocoder_js',
            plugin_dir_url( __FILE__ ) . "../admin/js/vendor/mapbox-gl-geocoder-4.7.2.js",
            array($last_dependency),
            $this->version
        );
        $last_dependency = 'mapster_map_geocoder_js';
        if ( $model_3d_library ) {
            wp_enqueue_style( "mapster_map_threebox_css" );
            wp_enqueue_script(
                'mapster_map_threebox_js',
                plugin_dir_url( __FILE__ ) . "../admin/js/vendor/threebox.min.js",
                array($last_dependency),
                $this->version
            );
            $last_dependency = 'mapster_map_threebox_js';
        }
        if ( $elevation_chart_enabled ) {
            wp_enqueue_script(
                'mapster_map_chart_js',
                plugin_dir_url( __FILE__ ) . "../admin/js/vendor/chart.min.js",
                array($last_dependency),
                $this->version
            );
            $last_dependency = 'mapster_map_chart_js';
        }
        if ( $store_locator_enabled ) {
            wp_enqueue_style( 'mapster_map_store_locator' );
        }
        wp_enqueue_script(
            $this->plugin_name . "-ElevationControl",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/ElevationControl.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-ElevationControl";
        wp_enqueue_script(
            $this->plugin_name . "-StyleControl",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/StyleControl.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-StyleControl";
        wp_enqueue_script(
            $this->plugin_name . "-LayerControl",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/LayerControl.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-LayerControl";
        wp_enqueue_script(
            $this->plugin_name . "-ControlMenu",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/ControlMenu.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-ControlMenu";
        wp_enqueue_script(
            $this->plugin_name . "-CustomHTMLControl",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/CustomHTMLControl.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-CustomHTMLControl";
        wp_enqueue_script(
            $this->plugin_name . "-DownloadControl",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/DownloadControl.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-DownloadControl";
        // wp_enqueue_script($this->plugin_name . "-MapsterSearchBoxControl", plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/MapsterSearchBoxControl.js', array($last_dependency), $this->version);
        // $last_dependency = $this->plugin_name . "-MapsterSearchBoxControl";
        wp_enqueue_script(
            $this->plugin_name . "-CategoryControl",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/CategoryControl.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-CategoryControl";
        wp_enqueue_script(
            $this->plugin_name . "-ListControl",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/ListControl.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-ListControl";
        wp_enqueue_script(
            $this->plugin_name . "-PitchToggle",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/PitchToggle.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-PitchToggle";
        wp_enqueue_script(
            $this->plugin_name . "-PrintControl",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/controls/PrintControl.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-PrintControl";
        wp_enqueue_script(
            $this->plugin_name . "-constants",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/MapsterConstants.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-constants";
        wp_enqueue_script(
            $this->plugin_name . "-helpers",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/MapsterHelpers.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-helpers";
        wp_enqueue_script(
            $this->plugin_name . "-core",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/MapsterCore.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-core";
        wp_enqueue_script(
            $this->plugin_name . "-container",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/MapsterContainer.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-container";
        wp_enqueue_script(
            $this->plugin_name . "-map",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/MapsterMap.js',
            array($last_dependency),
            $this->version
        );
        $last_dependency = $this->plugin_name . "-map";
        wp_register_script(
            $this->plugin_name . "-main-js",
            plugin_dir_url( __FILE__ ) . '../admin/js/dev/MapsterLoader.js',
            array($last_dependency),
            $this->version,
            true
        );
        if ( $map_provider == 'google-maps' ) {
            wp_enqueue_script(
                $this->plugin_name . "-google-label",
                plugin_dir_url( __FILE__ ) . '../admin/js/vendor/google-maps-label.js',
                array($last_dependency),
                $this->version
            );
            $last_dependency = $this->plugin_name . "-google-label";
            wp_enqueue_script(
                $this->plugin_name . "-google-clustering",
                plugin_dir_url( __FILE__ ) . '../admin/js/vendor/google-maps-clustering.js',
                array($last_dependency),
                $this->version
            );
            $last_dependency = $this->plugin_name . "-google-clustering";
            wp_enqueue_script(
                $this->plugin_name . "-google-category-control",
                plugin_dir_url( __FILE__ ) . '../admin/js/dev/google/CategoryControlGoogle.js',
                array($last_dependency),
                $this->version
            );
            $last_dependency = $this->plugin_name . "-google-category-control";
            wp_enqueue_script(
                $this->plugin_name . "-google-list-control",
                plugin_dir_url( __FILE__ ) . '../admin/js/dev/google/ListControlGoogle.js',
                array($last_dependency),
                $this->version
            );
            $last_dependency = $this->plugin_name . "-google-list-control";
            wp_enqueue_script(
                $this->plugin_name . "-core-google",
                plugin_dir_url( __FILE__ ) . '../admin/js/dev/google/MapsterCoreGoogle.js',
                array($last_dependency),
                $this->version
            );
            $last_dependency = $this->plugin_name . "-core-google";
            wp_enqueue_script(
                $this->plugin_name . "-helpers-google",
                plugin_dir_url( __FILE__ ) . '../admin/js/dev/google/MapsterHelpersGoogle.js',
                array($last_dependency),
                $this->version
            );
            $last_dependency = $this->plugin_name . "-helpers-google";
            wp_enqueue_script(
                $this->plugin_name . "-map-google",
                plugin_dir_url( __FILE__ ) . '../admin/js/dev/google/MapsterMapGoogle.js',
                array($last_dependency),
                $this->version
            );
            $last_dependency = $this->plugin_name . "-map-google";
        }
        wp_enqueue_style( $this->plugin_name );
        wp_localize_script( $this->plugin_name . "-main-js", 'mapster_params', $injectedParams );
        wp_enqueue_script( $this->plugin_name . "-main-js" );
        if ( $map_provider == 'google-maps' ) {
            wp_enqueue_script( $this->plugin_name . "-google" );
        }
        wp_enqueue_script( $this->plugin_name );
    }

    /**
     * Create Mapster Wordpress Maps post type
     *
     * @since    1.0.0
     */
    public function create_mapster_wp_maps_post_types() {
        $i18n = new Mapster_Wordpress_Maps_i18n();
        $settings_page_id = get_option( 'mapster_settings_page' );
        if ( $settings_page_id ) {
            $public_pages = get_field( 'public_pages', $settings_page_id );
            $permalinks = get_field( 'permalinks', $settings_page_id );
        }
        register_post_type( 'mapster-wp-map', array(
            'labels'              => array(
                'name'               => $i18n->get_mapster_strings()['admin']['Maps'],
                'menu_name'          => $i18n->get_mapster_strings()['admin']['Maps'],
                'singular_name'      => $i18n->get_mapster_strings()['admin']['Map'],
                'add_new'            => $i18n->get_mapster_strings()['admin']['Add New'],
                'add_new_item'       => $i18n->get_mapster_strings()['admin']['Add New Map'],
                'edit'               => $i18n->get_mapster_strings()['admin']['Edit'],
                'edit_item'          => $i18n->get_mapster_strings()['admin']['Edit Map'],
                'new_item'           => $i18n->get_mapster_strings()['admin']['New Map'],
                'view'               => $i18n->get_mapster_strings()['admin']['View'],
                'view_item'          => $i18n->get_mapster_strings()['admin']['View Map'],
                'search_items'       => $i18n->get_mapster_strings()['admin']['Search Map'],
                'not_found'          => $i18n->get_mapster_strings()['admin']['No Map found'],
                'not_found_in_trash' => $i18n->get_mapster_strings()['admin']['No Map found in Trash'],
                'parent'             => $i18n->get_mapster_strings()['admin']['Parent Map'],
            ),
            'menu_icon'           => "dashicons-location-alt",
            'public'              => true,
            "publicly_queryable"  => ( $public_pages['maps'] ? true : false ),
            'exclude_from_search' => false,
            'show_in_rest'        => true,
            'menu_position'       => 15,
            'rewrite'             => ( isset( $permalinks['maps'] ) ? array(
                'slug' => $permalinks['maps'],
            ) : array() ),
            'supports'            => array(
                'title',
                'thumbnail',
                'editor',
                'excerpt',
                'custom-fields'
            ),
            'taxonomies'          => array('wp-map-category'),
            'has_archive'         => true,
        ) );
        register_taxonomy( 'wp-map-category', 'mapster-wp-map', array(
            'hierarchical'      => true,
            'show_in_rest'      => true,
            'label'             => $i18n->get_mapster_strings()['admin']['Map Categories'],
            'query_var'         => true,
            'show_admin_column' => true,
        ) );
        register_post_type( 'mapster-wp-location', array(
            'labels'              => array(
                'name'               => $i18n->get_mapster_strings()['admin']['Locations'],
                'menu_name'          => $i18n->get_mapster_strings()['admin']['Locations'],
                'singular_name'      => $i18n->get_mapster_strings()['admin']['Location'],
                'add_new'            => $i18n->get_mapster_strings()['admin']['Add New'],
                'add_new_item'       => $i18n->get_mapster_strings()['admin']['Add New Location'],
                'edit'               => $i18n->get_mapster_strings()['admin']['Edit'],
                'edit_item'          => $i18n->get_mapster_strings()['admin']['Edit Location'],
                'new_item'           => $i18n->get_mapster_strings()['admin']['New Location'],
                'view'               => $i18n->get_mapster_strings()['admin']['View'],
                'view_item'          => $i18n->get_mapster_strings()['admin']['View Location'],
                'search_items'       => $i18n->get_mapster_strings()['admin']['Search Location'],
                'not_found'          => $i18n->get_mapster_strings()['admin']['No Location found'],
                'not_found_in_trash' => $i18n->get_mapster_strings()['admin']['No Location found in Trash'],
                'parent'             => $i18n->get_mapster_strings()['admin']['Parent Location'],
            ),
            'public'              => true,
            "publicly_queryable"  => ( $public_pages['locations'] ? true : false ),
            'exclude_from_search' => false,
            'show_in_rest'        => true,
            'menu_position'       => 15,
            'supports'            => array(
                'title',
                'editor',
                'excerpt',
                'custom-fields'
            ),
            'taxonomies'          => array('wp-map-category'),
            'rewrite'             => ( isset( $permalinks['locations'] ) ? array(
                'slug' => $permalinks['locations'],
            ) : array() ),
            'has_archive'         => true,
            'show_in_menu'        => 'edit.php?post_type=mapster-wp-map',
        ) );
        register_post_type( 'mapster-wp-line', array(
            'labels'              => array(
                'name'               => $i18n->get_mapster_strings()['admin']['Lines'],
                'menu_name'          => $i18n->get_mapster_strings()['admin']['Lines'],
                'singular_name'      => $i18n->get_mapster_strings()['admin']['Line'],
                'add_new'            => $i18n->get_mapster_strings()['admin']['Add New'],
                'add_new_item'       => $i18n->get_mapster_strings()['admin']['Add New Line'],
                'edit'               => $i18n->get_mapster_strings()['admin']['Edit'],
                'edit_item'          => $i18n->get_mapster_strings()['admin']['Edit Line'],
                'new_item'           => $i18n->get_mapster_strings()['admin']['New Line'],
                'view'               => $i18n->get_mapster_strings()['admin']['View'],
                'view_item'          => $i18n->get_mapster_strings()['admin']['View Line'],
                'search_items'       => $i18n->get_mapster_strings()['admin']['Search Line'],
                'not_found'          => $i18n->get_mapster_strings()['admin']['No Line found'],
                'not_found_in_trash' => $i18n->get_mapster_strings()['admin']['No Line found in Trash'],
                'parent'             => $i18n->get_mapster_strings()['admin']['Parent Line'],
            ),
            'public'              => true,
            "publicly_queryable"  => ( $public_pages['lines'] ? true : false ),
            'exclude_from_search' => false,
            'show_in_rest'        => true,
            'menu_position'       => 15,
            'supports'            => array(
                'title',
                'editor',
                'excerpt',
                'custom-fields'
            ),
            'taxonomies'          => array('wp-map-category'),
            'rewrite'             => ( isset( $permalinks['lines'] ) ? array(
                'slug' => $permalinks['lines'],
            ) : array() ),
            'has_archive'         => true,
            'show_in_menu'        => 'edit.php?post_type=mapster-wp-map',
        ) );
        register_post_type( 'mapster-wp-polygon', array(
            'labels'              => array(
                'name'               => $i18n->get_mapster_strings()['admin']['Polygons'],
                'menu_name'          => $i18n->get_mapster_strings()['admin']['Polygons'],
                'singular_name'      => $i18n->get_mapster_strings()['admin']['Polygon'],
                'add_new'            => $i18n->get_mapster_strings()['admin']['Add New'],
                'add_new_item'       => $i18n->get_mapster_strings()['admin']['Add New Polygon'],
                'edit'               => $i18n->get_mapster_strings()['admin']['Edit'],
                'edit_item'          => $i18n->get_mapster_strings()['admin']['Edit Polygon'],
                'new_item'           => $i18n->get_mapster_strings()['admin']['New Polygon'],
                'view'               => $i18n->get_mapster_strings()['admin']['View'],
                'view_item'          => $i18n->get_mapster_strings()['admin']['View Polygon'],
                'search_items'       => $i18n->get_mapster_strings()['admin']['Search Polygon'],
                'not_found'          => $i18n->get_mapster_strings()['admin']['No Polygon found'],
                'not_found_in_trash' => $i18n->get_mapster_strings()['admin']['No Polygon found in Trash'],
                'parent'             => $i18n->get_mapster_strings()['admin']['Parent Polygon'],
            ),
            'public'              => true,
            "publicly_queryable"  => ( $public_pages['polygons'] ? true : false ),
            'exclude_from_search' => false,
            'show_in_rest'        => true,
            'menu_position'       => 15,
            'supports'            => array(
                'title',
                'editor',
                'excerpt',
                'custom-fields'
            ),
            'taxonomies'          => array('wp-map-category'),
            'rewrite'             => ( isset( $permalinks['polygons'] ) ? array(
                'slug' => $permalinks['polygons'],
            ) : array() ),
            'has_archive'         => true,
            'show_in_menu'        => 'edit.php?post_type=mapster-wp-map',
        ) );
        register_post_type( 'mapster-wp-popup', array(
            'labels'              => array(
                'name'               => $i18n->get_mapster_strings()['admin']['Popup Templates'],
                'menu_name'          => $i18n->get_mapster_strings()['admin']['Popup Templates'],
                'singular_name'      => $i18n->get_mapster_strings()['admin']['Popup Template'],
                'add_new'            => $i18n->get_mapster_strings()['admin']['Add New'],
                'add_new_item'       => $i18n->get_mapster_strings()['admin']['Add New Popup Template'],
                'edit'               => $i18n->get_mapster_strings()['admin']['Edit'],
                'edit_item'          => $i18n->get_mapster_strings()['admin']['Edit Popup Template'],
                'new_item'           => $i18n->get_mapster_strings()['admin']['New Popup Template'],
                'view'               => $i18n->get_mapster_strings()['admin']['View'],
                'view_item'          => $i18n->get_mapster_strings()['admin']['View Popup Template'],
                'search_items'       => $i18n->get_mapster_strings()['admin']['Search Popup Template'],
                'not_found'          => $i18n->get_mapster_strings()['admin']['No Popup Template found'],
                'not_found_in_trash' => $i18n->get_mapster_strings()['admin']['No Popup Template found in Trash'],
                'parent'             => $i18n->get_mapster_strings()['admin']['Parent Popup Template'],
            ),
            'public'              => true,
            "publicly_queryable"  => false,
            'exclude_from_search' => false,
            'show_in_rest'        => true,
            'menu_position'       => 15,
            'supports'            => array('title', 'custom-fields'),
            'taxonomies'          => array(''),
            'has_archive'         => true,
            'show_in_menu'        => 'edit.php?post_type=mapster-wp-map',
        ) );
        register_post_type( 'mapster-wp-settings', array(
            'labels'              => array(
                'name'               => $i18n->get_mapster_strings()['admin']['Mapster Settings'],
                'menu_name'          => $i18n->get_mapster_strings()['admin']['Mapster Settings'],
                'singular_name'      => $i18n->get_mapster_strings()['admin']['Mapster Settings'],
                'add_new'            => $i18n->get_mapster_strings()['admin']['Add New'],
                'add_new_item'       => $i18n->get_mapster_strings()['admin']['Add New Mapster Settings'],
                'edit'               => $i18n->get_mapster_strings()['admin']['Edit'],
                'edit_item'          => $i18n->get_mapster_strings()['admin']['Edit Mapster Settings'],
                'new_item'           => $i18n->get_mapster_strings()['admin']['New Mapster Settings'],
                'view'               => $i18n->get_mapster_strings()['admin']['View'],
                'view_item'          => $i18n->get_mapster_strings()['admin']['View Mapster Settings'],
                'search_items'       => $i18n->get_mapster_strings()['admin']['Search Mapster Settings'],
                'not_found'          => $i18n->get_mapster_strings()['admin']['No Mapster Settings found'],
                'not_found_in_trash' => $i18n->get_mapster_strings()['admin']['No Mapster Settings found in Trash'],
                'parent'             => $i18n->get_mapster_strings()['admin']['Parent Mapster Settings'],
            ),
            'public'              => true,
            "publicly_queryable"  => false,
            'exclude_from_search' => true,
            'show_in_rest'        => false,
            'supports'            => array('custom-fields'),
            'taxonomies'          => array(''),
            'has_archive'         => false,
            'show_in_menu'        => false,
        ) );
        $settings_page_id = get_option( 'mapster_settings_page' );
        if ( $settings_page_id ) {
            $user_submission = get_field( 'pro_mwm_user_submission', $settings_page_id );
            if ( $user_submission ) {
            }
        }
        $set = get_option( 'post_type_rules_flushed_mapster_wp_maps' );
        if ( $set !== true ) {
            flush_rewrite_rules( false );
            update_option( 'post_type_rules_flushed_mapster_wp_maps', true );
        }
    }

    /**
     * Disable gutenberg for custom post types
     *
     * @since    1.0.0
     */
    function mapster_maps_disable_gutenberg( $current_status, $post_type ) {
        $mapster_post_types = array(
            'mapster-wp-map',
            'mapster-wp-line',
            'mapster-wp-polygon',
            'mapster-wp-location'
        );
        $settings_page_id = get_option( 'mapster_settings_page' );
        $gutenberg_on = get_field( 'gutenberg_editor', $settings_page_id );
        if ( !$gutenberg_on && in_array( $post_type, $mapster_post_types ) ) {
            $current_status = false;
        }
        return $current_status;
    }

    /**
     * Add shortcode column to Mapster Map, Locations, Lines, Polygons type
     *
     * @since    1.0.0
     */
    function set_custom_mapster_map_column( $columns ) {
        $i18n = new Mapster_Wordpress_Maps_i18n();
        unset($columns['date']);
        $columns['shortcode'] = $i18n->get_mapster_strings()['admin']['Shortcode'];
        $columns['date'] = $i18n->get_mapster_strings()['admin']['Date'];
        return $columns;
    }

    /**
     * Add shortcode output to Mapster map column
     *
     * @since    1.0.0
     */
    function custom_mapster_map_shortcode_column( $column, $post_id ) {
        switch ( $column ) {
            case 'shortcode':
                echo '[mapster_wp_map id="' . $post_id . '"]';
                break;
        }
    }

    /**
     * Add shortcode column to Locations, Lines, Polygons type
     *
     * @since    1.0.0
     */
    function set_custom_mapster_map_features_column( $columns ) {
        $i18n = new Mapster_Wordpress_Maps_i18n();
        unset($columns['date']);
        $columns['shortcode'] = $i18n->get_mapster_strings()['admin']['Shortcode'] . ' <span class="dashicons dashicons-editor-help mapster-shortcode-help"></span><div id="mapster-shortcode-help-text">This shortcode will only show if you have selected a template map or a default template map for this feature.</div>';
        $columns['date'] = $i18n->get_mapster_strings()['admin']['Date'];
        return $columns;
    }

    /**
     * Add shortcode output to Mapster features column
     *
     * @since    1.0.0
     */
    function custom_mapster_map_features_shortcode_column( $column, $post_id ) {
        $output_shortcode = "";
        $settings_page_id = get_option( 'mapster_settings_page' );
        $base_map = false;
        $post_template = get_field( 'field_6264930aed194', $post_id, true );
        if ( $post_template ) {
            $base_map = $post_template;
        }
        if ( $base_map ) {
            $output_shortcode = '[mapster_wp_map id="' . $base_map . '" single_feature_id="' . $post_id . '"]';
        }
        switch ( $column ) {
            case 'shortcode':
                echo $output_shortcode;
                break;
        }
    }

    /**
     * Add Mapster Map Metabox for main map editing
     *
     * @since    1.0.0
     */
    public function add_mapster_wp_map_metabox() {
        $i18n = new Mapster_Wordpress_Maps_i18n();
        add_meta_box(
            'mapster-wp-maps-preview',
            $i18n->get_mapster_strings()['admin']['Map Preview'],
            'my_meta_box_callback',
            'mapster-wp-map',
            'normal',
            'core',
            array(
                '__block_editor_compatible_meta_box' => true,
            )
        );
        function my_meta_box_callback() {
            echo '<div id="mapster-wp-maps-map" style="width: 100%; height: 400px;"></div>';
        }

    }

    /**
     * Register default options
     *
     * @since    1.0.0
     */
    function mapster_set_position_infobox( $priority, $field_group ) {
        if ( 'Mapster Help' === $field_group['title'] ) {
            $priority = 'high';
        }
        return $priority;
    }

    /**
     * Register default options
     *
     * @since    1.0.0
     */
    public function add_mapster_wp_maps_default_options() {
        // Create default option
        if ( !get_option( 'mapster_settings_page' ) ) {
            $settings_page_id = wp_insert_post( array(
                'post_type' => "mapster-wp-settings",
            ) );
            update_field( 'public_pages', array(
                'maps'      => true,
                'locations' => true,
                'lines'     => true,
                'polygons'  => true,
            ), $settings_page_id );
            update_field( 'pro_mwm_hover_effects', true, $settings_page_id );
            update_option( 'mapster_settings_page', $settings_page_id );
        }
    }

    /**
     * Add default popup types
     *
     * @since    1.0.0
     */
    function mapster_add_default_popups() {
        $default_popup = get_option( 'mapster_default_popup' );
        if ( !$default_popup || !get_post( $default_popup ) ) {
            $simple_mapbox = wp_insert_post( array(
                'post_title'  => "Default",
                'post_type'   => "mapster-wp-popup",
                'post_status' => "publish",
            ) );
            mapster_setDefaults( acf_get_fields( 'group_6169ff23a6e6d' ), $simple_mapbox );
            update_field( 'enable_header', false, $simple_mapbox );
            update_field( 'enable_image', false, $simple_mapbox );
            update_field( 'enable_footer', false, $simple_mapbox );
            update_field( 'close_button', true, $simple_mapbox );
            update_option( 'mapster_default_popup', $simple_mapbox );
        }
        $default_image = get_option( 'mapster_default_image_text' );
        if ( !$default_image || !get_post( $default_image ) ) {
            $default_image_post = wp_insert_post( array(
                'post_title'  => "Default Thumbnail",
                'post_type'   => "mapster-wp-popup",
                'post_status' => "publish",
            ) );
            mapster_setDefaults( acf_get_fields( 'group_6169ff23a6e6d' ), $default_image_post );
            update_field( 'enable_header', false, $default_image_post );
            update_field( 'image_height', 100, $default_image_post );
            update_field( 'max_width', 150, $default_image_post );
            update_field( 'enable_footer', false, $default_image_post );
            update_option( 'mapster_default_image_text', $default_image_post );
        }
        $default_header = get_option( 'mapster_default_header' );
        if ( !$default_header || !get_post( $default_header ) ) {
            $default_header_post = wp_insert_post( array(
                'post_title'  => "Default Header",
                'post_type'   => "mapster-wp-popup",
                'post_status' => "publish",
            ) );
            mapster_setDefaults( acf_get_fields( 'group_6169ff23a6e6d' ), $default_header_post );
            update_field( 'enable_image', false, $default_header_post );
            update_field( 'enable_body', false, $default_header_post );
            update_field( 'enable_footer', false, $default_header_post );
            update_option( 'mapster_default_header', $default_header_post );
        }
    }

    /**
     * Add row action link
     *
     * @since    1.0.0
     */
    public function mapster_wp_maps_row_action_menu( $actions, $post ) {
        $i18n = new Mapster_Wordpress_Maps_i18n();
        if ( $post->post_type == 'mapster-wp-popup' || $post->post_type == 'mapster-wp-polygon' || $post->post_type == 'mapster-wp-location' || $post->post_type == 'mapster-wp-line' || $post->post_type == 'mapster-wp-map' ) {
            $actions['mapster-wp-maps-duplicate'] = '<a id="mapster-' . $post->ID . '" class="mapster-duplicate" href="#">' . $i18n->get_mapster_strings()['admin']['Duplicate'] . '</a>';
        }
        return $actions;
    }

    /**
     * Create backend menu
     *
     * @since    1.0.0
     */
    public function mapster_wp_maps_settings_menu() {
        $i18n = new Mapster_Wordpress_Maps_i18n();
        add_submenu_page(
            'edit.php?post_type=mapster-wp-map',
            $i18n->get_mapster_strings()['admin']['Categories'],
            $i18n->get_mapster_strings()['admin']['Categories'],
            'manage_options',
            'edit-tags.php?taxonomy=wp-map-category&post_type=mapster-wp-map'
        );
        add_submenu_page(
            'edit.php?post_type=mapster-wp-map',
            $i18n->get_mapster_strings()['admin']['Settings'],
            $i18n->get_mapster_strings()['admin']['Settings'],
            'manage_options',
            'wordpress-maps-settings',
            function () {
                include 'partials/mapster-wordpress-maps-settings-page.php';
            }
        );
    }

    /**
     * Create custom select block for Gutenberg
     *
     * @since    1.0.0
     */
    public function load_mapster_map_block() {
        wp_register_script(
            'mapster-select-map-block',
            plugin_dir_url( __FILE__ ) . 'js/blocks/mapster-select-map-block.js',
            array('wp-blocks', 'wp-editor'),
            true
        );
        register_block_type( 'mapster/mapster-select-map-block', [
            'editor_script'   => 'mapster-select-map-block',
            'render_callback' => 'render_mapster_select_map_block',
        ] );
        function render_mapster_select_map_block(  $attr, $content  ) {
            if ( !isset( $attr["map_id"] ) ) {
                return "<p>Please select a map in the Wordpress editor.</p>";
            } else {
                $output_shortcode = do_shortcode( '[mapster_wp_map id="' . $attr["map_id"] . '"]' );
                return $output_shortcode;
            }
        }

        // wp_register_script(
        // 	'mapster-create-map-block',
        // 	plugin_dir_url(__FILE__) . 'js/blocks/mapster-create-map-block.js',
        // 	array('wp-blocks','wp-editor'),
        // 	true
        // );
        // register_block_type('mapster/mapster-create-map-block', [
        // 	'editor_script' => 'mapster-create-map-block',
        // 	'render_callback' => 'render_mapster_create_map_block'
        // ]);
        // function render_mapster_select_map_block($attr, $content) {
        // 	if(!isset($attr["map_id"])) {
        // 		return "<p>Please select a map in the Wordpress editor.</p>";
        // 	} else {
        // 		$output_shortcode = do_shortcode( '[mapster_wp_map id="' . $attr["map_id"] . '"]' );
        // 		return $output_shortcode;
        // 	}
        // }
    }

    /**
     * Set ACF Form Head before headers in admin screen
     *
     * @since    1.0.0
     */
    public function mapster_wp_maps_settings_form_init() {
        $current_get_vars = $_GET;
        if ( isset( $current_get_vars['post_type'] ) && isset( $current_get_vars['page'] ) && $current_get_vars['post_type'] == 'mapster-wp-map' && $current_get_vars['page'] == 'wordpress-maps-settings' ) {
            acf_form_head();
        }
    }

    /**
     * Welcome message
     *
     * @since    1.0.0
     */
    function mapster_wp_maps_admin_notice() {
        if ( !get_option( 'mapster_welcome_message' ) ) {
            update_option( 'mapster_welcome_message', true );
            ?>
		    <div class="notice notice-success is-dismissible">
		      <img style="width: 50px;margin-top:10px;float:left;margin-right: 10px;" src="<?php 
            echo plugin_dir_url( __FILE__ );
            ?>/images/logo-Mapster.png" />
					<h2>Thanks for installing Mapster Wordpress Maps!</h2>
					<p>We have MapLibre (no API key), Mapbox, and Google Maps available. Head to "Maps" on the left to check it out and get started.</p>
					<p><a href="https://wpmaps.mapster.me/documentation" target="_blank">Plugin Documentation</a></p>
		    </div>
	    <?php 
        }
    }

    /**
     * Custom header a la ACF
     *
     * @since    1.0.0
     */
    function mapster_wp_maps_custom_header() {
        $i18n = new Mapster_Wordpress_Maps_i18n();
        $current_screen = get_current_screen();
        if ( strpos( $current_screen->id, "mapster" ) !== false || strpos( $current_screen->post_type, "mapster" ) !== false ) {
            ?>
				<div class="mapster-admin-toolbar">
					<h2><i class="acf-tab-icon dashicons dashicons-location-alt"></i> <?php 
            echo $i18n->get_mapster_strings()['admin']['Top Menu Header'];
            ?></h2>
					<a class="acf-tab <?php 
            echo ( $current_screen->id == 'edit-mapster-wp-map' || $current_screen->id === 'mapster-wp-map' ? "is-active" : "" );
            ?>" href="edit.php?post_type=mapster-wp-map"><?php 
            echo $i18n->get_mapster_strings()['admin']['Maps'];
            ?></a>
					<a class="acf-tab <?php 
            echo ( $current_screen->post_type == 'mapster-wp-location' ? "is-active" : "" );
            ?>" href="edit.php?post_type=mapster-wp-location"><?php 
            echo $i18n->get_mapster_strings()['admin']['Locations'];
            ?></a>
					<a class="acf-tab <?php 
            echo ( $current_screen->post_type == 'mapster-wp-line' ? "is-active" : "" );
            ?>" href="edit.php?post_type=mapster-wp-line"><?php 
            echo $i18n->get_mapster_strings()['admin']['Lines'];
            ?></a>
					<a class="acf-tab <?php 
            echo ( $current_screen->post_type == 'mapster-wp-polygon' ? "is-active" : "" );
            ?>" href="edit.php?post_type=mapster-wp-polygon"><?php 
            echo $i18n->get_mapster_strings()['admin']['Polygons'];
            ?></a>
					<a class="acf-tab <?php 
            echo ( $current_screen->post_type == 'mapster-wp-popup' ? "is-active" : "" );
            ?>" href="edit.php?post_type=mapster-wp-popup"><?php 
            echo $i18n->get_mapster_strings()['admin']['Popup Templates'];
            ?></a>
					<?php 
            if ( mwm_fs()->can_use_premium_code() ) {
                $settings_page_id = get_option( 'mapster_settings_page' );
                if ( $settings_page_id ) {
                    $user_submission = get_field( 'pro_mwm_user_submission', $settings_page_id );
                    if ( $user_submission ) {
                        ?>
									<a class="acf-tab <?php 
                        echo ( $current_screen->post_type == 'mapster-wp-user-sub' ? "is-active" : "" );
                        ?>" href="edit.php?post_type=mapster-wp-user-sub"><?php 
                        echo $i18n->get_mapster_strings()['admin']['User Submission'];
                        ?></a>
								<?php 
                    }
                }
            }
            ?>
					<?php 
            if ( mwm_fs()->can_use_premium_code() ) {
                ?>
							<a class="acf-tab <?php 
                echo ( $current_screen->id == 'mapster-wp-map_page_wordpress-maps-mass-edit' ? "is-active" : "" );
                ?>" href="edit.php?post_type=mapster-wp-map&page=wordpress-maps-mass-edit"><?php 
                echo $i18n->get_mapster_strings()['admin']['Mass Edit'];
                ?></a>
					<?php 
            }
            ?>
					<a class="acf-tab <?php 
            echo ( $current_screen->id == 'edit-wp-map-category' ? "is-active" : "" );
            ?>" href="edit-tags.php?taxonomy=wp-map-category&post_type=mapster-wp-map"><?php 
            echo $i18n->get_mapster_strings()['admin']['Categories'];
            ?></a>
					<a class="acf-tab <?php 
            echo ( $current_screen->id == 'mapster-wp-map_page_wordpress-maps-settings' || $current_screen->id == 'mapster-wp-map_page_wordpress-maps-settings-pricing' || $current_screen->id == 'mapster-wp-map_page_wordpress-maps-settings-account' ? "is-active" : "" );
            ?>" href="edit.php?post_type=mapster-wp-map&page=wordpress-maps-settings"><?php 
            echo $i18n->get_mapster_strings()['admin']['Settings'];
            ?></a>
					<?php 
            if ( !mwm_fs()->can_use_premium_code() ) {
                ?>
						<a target="_blank" href="https://wpmaps.mapster.me/pro" class="btn-upgrade">
							<i style="margin-top: 5px;" class="dashicons dashicons-star-filled"></i>
							<p><?php 
                echo $i18n->get_mapster_strings()['admin']['Download Pro'];
                ?></p>
						</a>
					<?php 
            }
            ?>
				</div>
			<?php 
        }
    }

}

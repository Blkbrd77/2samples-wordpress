<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://mapster.me
 * @since      1.0.0
 *
 * @package    Mapster_Wordpress_Maps
 * @subpackage Mapster_Wordpress_Maps/public
 */
/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Mapster_Wordpress_Maps
 * @subpackage Mapster_Wordpress_Maps/public
 * @author     Mapster Technology Inc <hello@mapster.me>
 */
class Mapster_Wordpress_Maps_Public {
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
     * Modal created or not
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $modal_created;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of the plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct( $plugin_name, $version ) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->modal_created = false;
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {
        wp_enqueue_style( 'dashicons' );
    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts() {
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
     * Register shortcode
     *
     * @since    1.0.0
     */
    public function mapster_wordpress_maps_register_shortcodes() {
        add_shortcode( 'mapster_wp_map', array($this, 'mapster_wordpress_maps_shortcode_display') );
    }

    /**
     * Add shortcode to Map type content
     *
     * @since    1.0.0
     */
    public function mapster_wordpress_maps_output_shortcode( $content ) {
        if ( is_singular( 'mapster-wp-map' ) ) {
            $output_shortcode = do_shortcode( '[mapster_wp_map id="' . get_the_ID() . '"]' );
            $output_shortcode .= $content;
            return $output_shortcode;
        } else {
            if ( is_singular( 'mapster-wp-location' ) || is_singular( 'mapster-wp-line' ) || is_singular( 'mapster-wp-polygon' ) ) {
                $show_in_post = get_field( 'field_626492dbed193', get_the_ID(), true );
                if ( $show_in_post ) {
                    $settings_page_id = get_option( 'mapster_settings_page' );
                    $base_map = false;
                    $post_template = get_field( 'field_6264930aed194', get_the_ID(), true );
                    if ( $post_template ) {
                        $base_map = $post_template;
                    }
                    if ( $base_map ) {
                        $output_shortcode = do_shortcode( '[mapster_wp_map id="' . $base_map . '" single_feature_id="' . get_the_ID() . '"]' );
                        $output_shortcode .= $content;
                        return $output_shortcode;
                    } else {
                        return $content;
                    }
                } else {
                    return $content;
                }
            } else {
                return $content;
            }
        }
    }

    /**
     * Map shortcode logic
     *
     * @since    1.0.0
     */
    public function mapster_wordpress_maps_shortcode_display( $atts ) {
        // Handle script loading
        $settings_page_id = get_option( 'mapster_settings_page' );
        $access_token = get_field( 'default_access_token', $settings_page_id );
        $user_submission_template = false;
        $settings_page_id = get_option( 'mapster_settings_page' );
        $default_latitude = get_field( 'pro_default_map_view_default_latitude', $settings_page_id );
        $default_longitude = get_field( 'pro_default_map_view_default_longitude', $settings_page_id );
        $default_zoom = get_field( 'pro_default_map_view_default_zoom', $settings_page_id );
        if ( $settings_page_id ) {
            $user_submission = get_field( 'pro_mwm_user_submission', $settings_page_id );
            if ( $user_submission ) {
                $query = new WP_Query(array(
                    'posts_per_page' => 1,
                    'post_type'      => 'page',
                    'meta_key'       => '_wp_page_template',
                    'meta_value'     => 'mapster-submission-template.php',
                ));
                if ( $query->have_posts() ) {
                    $query->the_post();
                    $user_submission_template = get_permalink( get_the_ID() );
                }
                wp_reset_postdata();
            }
        }
        $i8ln = new Mapster_Wordpress_Maps_i18n();
        $injectedParams = array(
            'strings'                   => $i8ln->get_mapster_strings()['admin_js'],
            'public'                    => true,
            'activated'                 => ( mwm_fs()->can_use_premium_code() ? '1' : '0' ),
            'rest_url'                  => get_rest_url(),
            'qd'                        => $this->mapster_get_rest_url_delimiter(),
            'directory'                 => plugin_dir_url( __FILE__ ),
            'mapbox_access_token'       => $access_token,
            'user_submission_permalink' => $user_submission_template,
            'mapster_default_lat'       => $default_latitude,
            'mapster_default_lng'       => $default_longitude,
            'mapster_default_zoom'      => $default_zoom,
            'ip'                        => $_SERVER['REMOTE_ADDR'],
        );
        $map_provider = get_field( 'map_type', $atts['id'] )['map_provider'];
        $model_3d_library = get_field( 'load_3d_model_libraries', $atts['id'] );
        $elevation_chart_enabled = get_field( 'elevation_line_chart_enable_elevation_chart', $atts['id'] );
        // Check for required dependencies
        $directions_enabled = ( get_field( 'directions_control', $atts['id'] ) ? get_field( 'directions_control', $atts['id'] )['enable'] : false );
        $store_locator_enabled = false;
        if ( get_field( 'list', $atts['id'] ) && isset( get_field( 'list', $atts['id'] )['store_locator_options'] ) ) {
            if ( is_array( get_field( 'list', $atts['id'] ) ) && !empty( get_field( 'list', $atts['id'] )['store_locator_options']['enable'] ) ) {
                $store_locator_enabled = get_field( 'list', $atts['id'] )['store_locator_options']['enable'];
            }
        }
        $geocoder_enabled = false;
        $compare_enabled = ( get_field( 'map_compare_enable_map_slider', $atts['id'] ) ? get_field( 'map_compare_enable_map_slider', $atts['id'] ) : false );
        if ( get_field( 'geocoder_control', $atts['id'] )['enable'] == true ) {
            $geocoder_enabled = true;
        }
        if ( get_field( 'filter', $atts['id'] )['custom_search_filter']['enable'] == true ) {
            $geocoder_enabled = true;
        }
        if ( get_field( 'filter', $atts['id'] )['filter_dropdown']['enable'] == true ) {
            $geocoder_enabled = true;
        }
        if ( get_field( 'submission_enable_submission', $atts['id'] ) == true ) {
            $geocoder_enabled = true;
        }
        // $searchbox_enabled = false;
        // if(get_field('searchbox_control', $atts['id']) && get_field('searchbox_control', $atts['id'])['enable'] == true) {
        // 	$searchbox_enabled = true;
        // }
        $last_dependency = 'jquery';
        if ( MAPSTER_LOCAL_TESTING ) {
            $this->mapster_wordpress_maps_script_loading_dev(
                $last_dependency,
                $map_provider,
                $settings_page_id,
                $directions_enabled,
                $geocoder_enabled,
                $compare_enabled,
                $model_3d_library,
                $elevation_chart_enabled,
                $store_locator_enabled,
                $injectedParams,
                $atts
            );
        } else {
            $scripts_to_load = "";
            if ( $map_provider === 'maplibre' || $map_provider === 'custom-image' ) {
                $scripts_to_load = "maplibre-mwp";
            }
            if ( $map_provider === 'mapbox' ) {
                $scripts_to_load = "mapbox-mwp";
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
            if ( $directions_enabled || $geocoder_enabled ) {
                if ( $map_provider === 'maplibre' || $map_provider === 'custom-image' ) {
                    $scripts_to_load = "maplibre-geocoding-mwp";
                }
                if ( $map_provider === 'mapbox' ) {
                    $scripts_to_load = "mapbox-geocoding-mwp";
                }
            }
            if ( $model_3d_library ) {
                if ( $map_provider === 'maplibre' || $map_provider === 'custom-image' ) {
                    $scripts_to_load = "maplibre-threebox-mwp";
                }
                if ( $map_provider === 'mapbox' ) {
                    $scripts_to_load = "mapbox-threebox-mwp";
                }
            }
            if ( $elevation_chart_enabled ) {
                $scripts_to_load = "mapbox-chart-mwp";
            }
            if ( $store_locator_enabled ) {
                wp_enqueue_style( 'mapster_map_store_locator' );
            }
            // DO NOT UNCOMMENT
            // if($encoding_enabled) {
            // wp_enqueue_script('mapster_map_polyline_encoding', plugin_dir_url( __FILE__ ) . "../admin/js/vendor/geojson-polyline.min.js", array($last_dependency), $this->version);
            // $last_dependency = 'mapster_map_polyline_encoding';
            // }
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
        $single_feature_id = "";
        if ( isset( $atts["single_feature_id"] ) ) {
            $single_feature_id = $atts["single_feature_id"];
        }
        $feature_ids = "";
        if ( isset( $atts["feature_ids"] ) ) {
            $feature_ids = $atts["feature_ids"];
        }
        $map_div_height = get_field( 'layout_height', $atts['id'] ) . get_field( 'layout_height_units', $atts['id'] );
        $map_div_width = get_field( 'layout_width', $atts['id'] ) . get_field( 'layout_width_units', $atts['id'] );
        $map_container_html = "<div class='mapster-wp-maps-container'>";
        $compare_map_html = "";
        if ( $compare_enabled ) {
            $compare_map_id = get_field( 'map_compare_compared_map', $atts['id'] );
            $compare_map_html = "\n\t\t\t\t<div class='mapster-wp-maps'\n\t\t\t\t\tid='mapster-wp-maps-" . esc_attr( $compare_map_id ) . "'\n\t\t\t\t\tdata-id='" . esc_attr( $compare_map_id ) . "'>\n\t\t\t\t</div>\n\t\t\t";
            $map_container_html = "<div class='mapster-wp-maps-container' style='height: " . esc_attr( $map_div_height ) . ";width: " . esc_attr( $map_div_width ) . "; position:relative;'>";
        }
        $loader = get_field( 'loading_loading_graphic', $atts['id'] );
        $custom_loader = get_field( 'loading_custom_loader', $atts['id'] );
        $loader_background = get_field( 'loading_background_color', $atts['id'] );
        $loader_color = get_field( 'loading_loader_color', $atts['id'] );
        if ( $loader == 'custom' ) {
            $loader = "<img src='" . $custom_loader . "' />";
        } else {
            if ( $loader ) {
                $loader = str_replace( 'svg ', 'svg stroke="' . $loader_color . '" fill="' . $loader_color . '"', $loader );
            } else {
                $loader_background = "rgba(255, 255, 255, 0)";
                $loader = "<svg width='38' height='38' viewBox='0 0 38 38' xmlns='https://www.w3.org/2000/svg' stroke='#333'> <g fill='none' fill-rule='evenodd'> <g transform='translate(1 1)' stroke-width='2'> <circle stroke-opacity='.5' cx='18' cy='18' r='18'/> <path d='M36 18c0-9.94-8.06-18-18-18'> <animateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='1s' repeatCount='indefinite'/> </path> </g> </g> </svg>";
            }
        }
        return "\n\t\t\t\t" . $map_container_html . "\n\t\t\t\t<div class='mapster-wp-maps-loader-container' style='height: " . esc_attr( $map_div_height ) . ";width: " . esc_attr( $map_div_width ) . ";'>\n\t\t\t\t\t<div class='mapster-map-loader-initial' style='background-color: " . $loader_background . "'>\n\t\t\t\t\t\t" . $loader . "\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class='mapster-wp-maps'\n\t\t\t\t\tid='mapster-wp-maps-" . esc_attr( $atts['id'] ) . "'\n\t\t\t\t\tdata-id='" . esc_attr( $atts['id'] ) . "'\n\t\t\t\t\tdata-latitude='" . esc_attr( ( isset( $atts['latitude'] ) ? $atts['latitude'] : "null" ) ) . "'\n\t\t\t\t\tdata-longitude='" . esc_attr( ( isset( $atts['longitude'] ) ? $atts['longitude'] : "null" ) ) . "'\n\t\t\t\t\tdata-zoom='" . esc_attr( ( isset( $atts['zoom'] ) ? $atts['zoom'] : "null" ) ) . "'\n\t\t\t\t\tdata-single_feature_id='" . esc_attr( $single_feature_id ) . "'\n\t\t\t\t\tdata-feature_ids='" . esc_attr( $feature_ids ) . "'>\n\t\t\t\t</div>\n\t\t\t\t" . $compare_map_html . "\n\t\t\t</div>\n\t\t";
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
        $directions_enabled,
        $geocoder_enabled,
        $compare_enabled,
        $model_3d_library,
        $elevation_chart_enabled,
        $store_locator_enabled,
        $injectedParams,
        $atts
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
            'mapster_map_maplibre_compare_css',
            plugin_dir_url( __FILE__ ) . "../admin/css/vendor/maplibre-gl-compare.css",
            array(),
            $this->version
        );
        wp_register_style(
            'mapster_map_directions_css',
            plugin_dir_url( __FILE__ ) . "../admin/css/vendor/directions.css",
            array(),
            $this->version
        );
        // wp_register_style('mapster_map_searchbox_css', plugin_dir_url( __FILE__ ) . "../admin/css/vendor/mapbox-gl-searchbox-beta.css", array(), $this->version);
        wp_register_style(
            'mapster_map_geocoder_css',
            plugin_dir_url( __FILE__ ) . "../admin/css/vendor/mapbox-gl-geocoder-4.7.2.css",
            array(),
            $this->version
        );
        wp_register_style(
            'mapster_map_mapbox_compare_css',
            plugin_dir_url( __FILE__ ) . "../admin/css/vendor/mapbox-gl-compare.css",
            array(),
            $this->version
        );
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
            'mapster_map_turf',
            plugin_dir_url( __FILE__ ) . "../admin/js/vendor/custom-turf.js",
            array($last_dependency),
            $this->version
        );
        $last_dependency = 'mapster_map_turf';
        if ( $directions_enabled ) {
            wp_enqueue_style( "mapster_map_directions_css" );
            wp_enqueue_script(
                'mapster_map_directions_js',
                plugin_dir_url( __FILE__ ) . "../admin/js/vendor/mapbox-gl-directions-4.1.0.js",
                array($last_dependency),
                $this->version
            );
            $last_dependency = 'mapster_map_directions_js';
        }
        if ( $geocoder_enabled ) {
            wp_enqueue_style( "mapster_map_geocoder_css" );
            wp_enqueue_script(
                'mapster_map_geocoder_js',
                plugin_dir_url( __FILE__ ) . "../admin/js/vendor/mapbox-gl-geocoder-4.7.2.js",
                array($last_dependency),
                $this->version
            );
            $last_dependency = 'mapster_map_geocoder_js';
        }
        // if($searchbox_enabled) {
        // 	wp_enqueue_style( "mapster_map_searchbox_css" );
        // 	wp_enqueue_script('mapster_map_searchbox_js', plugin_dir_url( __FILE__ ) . "../admin/js/vendor/mapbox-gl-searchbox-beta.js", array($last_dependency), $this->version);
        // 	$last_dependency = 'mapster_map_searchbox_js';
        // }
        if ( $compare_enabled ) {
            wp_enqueue_style( "mapster_map_" . $map_provider . "_compare_css" );
            wp_enqueue_script(
                'mapster_map_compare_js',
                plugin_dir_url( __FILE__ ) . "../admin/js/vendor/" . $map_provider . "-gl-compare.js",
                array($last_dependency),
                $this->version
            );
            $last_dependency = 'mapster_map_compare_js';
        }
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
                'mapster_map_chartjs',
                plugin_dir_url( __FILE__ ) . "../admin/js/vendor/chart.min.js",
                array($last_dependency),
                $this->version
            );
            $last_dependency = 'mapster_map_chartjs';
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
        wp_enqueue_style( "mapster_map_public_css" );
        wp_localize_script( $this->plugin_name . "-main-js", 'mapster_params', $injectedParams );
        wp_enqueue_script( $this->plugin_name . "-main-js" );
        if ( $map_provider == 'google-maps' ) {
            wp_enqueue_script( $this->plugin_name . "-google" );
        }
        wp_enqueue_script( $this->plugin_name );
    }

}

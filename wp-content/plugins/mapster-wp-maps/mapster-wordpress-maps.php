<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://mapster.me
 * @since             1.10.0
 * @package           Mapster_Wordpress_Maps
 *
 * @wordpress-plugin
 * Plugin Name:       Mapster WP Maps
 * Plugin URI:        https://wpmaps.mapster.me/
 * Description:       Mapster WP Maps is the smoothest, easiest way to make maps for your site. No API keys required.
 * Version:           1.10.0
 * Author:            Mapster Technology Inc
 * Author URI:        https://mapster.me
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       mapster-wp-maps
 * Domain Path:       /languages
 *
 */
// If this file is called directly, abort.
if ( !defined( 'WPINC' ) ) {
    die;
}
/*
JS BUILD COMMANDS
start branches for each version, then merge with bug fixes when time to release new one -- easier to fix bugs on-the-spot as I feature develop
update the ACF includes php file
node script-gen.js
****COMMIT FIRST**** git archive --format=zip --output mapster-wp-maps.zip main
Merging back into main with each pushed version
For version numbers, update in this file at top and in definition; update in README.txt
*/
/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'MAPSTER_WORDPRESS_MAPS_VERSION', '1.10.0' );
define( 'MAPSTER_LOCAL_TESTING', ( get_bloginfo( 'name' ) == "Mapster Wordpress Maps Development" ? true : false ) );
/**
 * Freemius loading and integration
 */
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
if ( function_exists( 'mwm_fs' ) ) {
    mwm_fs()->set_basename( false, __FILE__ );
} else {
    if ( !function_exists( 'mwm_fs' ) ) {
        // Create a helper function for easy SDK access.
        function mwm_fs() {
            global $mwm_fs;
            if ( !isset( $mwm_fs ) ) {
                // Include Freemius SDK.
                require_once dirname( __FILE__ ) . '/freemius/start.php';
                $mwm_fs = fs_dynamic_init( array(
                    'id'             => '10260',
                    'slug'           => 'mapster-wp-maps',
                    'type'           => 'plugin',
                    'public_key'     => 'pk_91077b881f40e3e18dd3c28db6e1d',
                    'is_premium'     => false,
                    'premium_suffix' => 'Pro',
                    'has_addons'     => false,
                    'has_paid_plans' => true,
                    'menu'           => array(
                        'slug'    => 'wordpress-maps-settings',
                        'contact' => false,
                        'support' => false,
                        'parent'  => array(
                            'slug' => 'edit.php?post_type=mapster-wp-map',
                        ),
                    ),
                    'is_live'        => true,
                ) );
            }
            return $mwm_fs;
        }

        // Init Freemius.
        mwm_fs();
        // Signal that SDK was initiated.
        do_action( 'mwm_fs_loaded' );
        function mapster_custom_is_submenu_visible(  $is_visible, $menu_id  ) {
            return false;
        }

        mwm_fs()->add_filter(
            'is_submenu_visible',
            'mapster_custom_is_submenu_visible',
            10,
            2
        );
    }
    if ( !class_exists( 'acf_code_field' ) ) {
        include_once plugin_dir_path( __FILE__ ) . 'includes/acf-code-field/acf-code-field.php';
    }
    /**
     * The code that runs during plugin activation.
     * This action is documented in includes/class-mapster-wordpress-maps-activator.php
     */
    function activate_mapster_wordpress_maps() {
        require_once plugin_dir_path( __FILE__ ) . 'includes/class-mapster-wordpress-maps-activator.php';
        Mapster_Wordpress_Maps_Activator::activate();
    }

    /**
     * The code that runs during plugin deactivation.
     * This action is documented in includes/class-mapster-wordpress-maps-deactivator.php
     */
    function deactivate_mapster_wordpress_maps() {
        require_once plugin_dir_path( __FILE__ ) . 'includes/class-mapster-wordpress-maps-deactivator.php';
        Mapster_Wordpress_Maps_Deactivator::deactivate();
    }

    register_activation_hook( __FILE__, 'activate_mapster_wordpress_maps' );
    register_deactivation_hook( __FILE__, 'deactivate_mapster_wordpress_maps' );
    /**
     * The core plugin class that is used to define internationalization,
     * admin-specific hooks, and public-facing site hooks.
     */
    require plugin_dir_path( __FILE__ ) . 'includes/class-mapster-wordpress-maps.php';
    /**
     * Begins execution of the plugin.
     *
     * Since everything within the plugin is registered via hooks,
     * then kicking off the plugin from this point in the file does
     * not affect the page life cycle.
     *
     * @since    1.0.0
     */
    function run_mapster_wordpress_maps() {
        $plugin = new Mapster_Wordpress_Maps();
        $plugin->run();
    }

    run_mapster_wordpress_maps();
}
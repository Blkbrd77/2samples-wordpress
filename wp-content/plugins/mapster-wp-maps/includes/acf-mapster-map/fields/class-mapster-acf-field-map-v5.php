<?php

// exit if accessed directly
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
// check if class already exists
if ( !class_exists( 'mapster_acf_field_map' ) ) {
    class mapster_acf_field_map extends acf_field {
        public $settings;

        /*
         *  __construct
         *
         *  This function will setup the field type data
         *
         *  @type	function
         *  @date	5/03/2014
         *  @since	5.0.0
         *
         *  @param	n/a
         *  @return	n/a
         */
        function __construct( $settings ) {
            /*
             *  name (string) Single word, no spaces. Underscores allowed
             */
            $this->name = 'mapster-map';
            /*
             *  label (string) Multiple words, can include spaces, visible when selecting a field type
             */
            $this->label = __( 'Mapster Map', 'mapster_acf_plugin_map' );
            /*
             *  category (string) basic | content | choice | relational | jquery | layout | CUSTOM GROUP NAME
             */
            $this->category = 'jquery';
            /*
             *  defaults (array) Array of default settings which are merged into the field object. These are used later in settings
             */
            // $this->default_value = 'default';
            $this->defaults = array(
                'default_value' => '{ "type" : "FeatureCollection", "features" : [] }',
            );
            /*
             *  l10n (array) Array of strings that are used in JavaScript. This allows JS strings to be translated in PHP and loaded via:
             *  var message = acf._e('FIELD_NAME', 'error');
             */
            // $this->l10n = array(
            // 	'error'	=> __('Error! Please enter a higher value', 'mapster_acf_plugin_map'),
            // );
            /*
             *  settings (array) Store plugin settings (url, path, version) as a reference for later use with assets
             */
            $this->settings = $settings;
            // do not delete!
            parent::__construct();
        }

        /*
         *  render_field_settings()
         *
         *  Create extra settings for your field. These are visible when editing a field
         *
         *  @type	action
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	$field (array) the $field being edited
         *  @return	n/a
         */
        function render_field_settings( $field ) {
            /*
             *  acf_render_field_setting
             *
             *  This function will create a setting for your field. Simply pass the $field parameter and an array of field settings.
             *  The array of settings does not require a `value` or `prefix`; These settings are found from the $field array.
             *
             *  More than one setting can be added by copy/paste the above code.
             *  Please note that you must also have a matching $defaults value for the field name (font_size)
             */
            acf_render_field_setting( $field, array(
                'label'         => __( 'Geography Type', 'mapster_acf_plugin_map' ),
                'instructions'  => __( 'Select the type of geography to create.', 'mapster_acf_plugin_map' ),
                'default_value' => 'point',
                'type'          => 'select',
                'name'          => 'mapster-draw-type',
                'choices'       => array(
                    'point'      => 'Point',
                    'linestring' => 'Linestring',
                    'polygon'    => 'Polygon',
                ),
                'allow_null'    => 0,
                'multiple'      => 0,
                'ui'            => 0,
                'return_format' => 'value',
                'ajax'          => 0,
                'placeholder'   => '',
            ) );
            acf_render_field_setting( $field, array(
                'label'         => __( 'Styling', 'mapster_acf_plugin_map' ),
                'instructions'  => __( 'Include styling options for the geography type. Available in <a href="https://wpmaps.mapster.me/pro">Mapster Pro</a>.', 'mapster_acf_plugin_map' ),
                'default_value' => 0,
                'ui'            => 1,
                'ui_on_text'    => 'On',
                'ui_off_text'   => 'Off',
                'type'          => 'true_false',
                'name'          => 'mapster-include-styling',
            ) );
            acf_render_field_setting( $field, array(
                'label'         => __( 'Popup Details', 'mapster_acf_plugin_map' ),
                'instructions'  => __( 'Choose whether to enter popup information. Available in <a href="https://wpmaps.mapster.me/pro">Mapster Pro</a>.', 'mapster_acf_plugin_map' ),
                'default_value' => 0,
                'ui'            => 1,
                'ui_on_text'    => 'On',
                'ui_off_text'   => 'Off',
                'type'          => 'true_false',
                'name'          => 'mapster-include-popup-details',
            ) );
        }

        /*
         *  render_field()
         *
         *  Create the HTML interface for your field
         *
         *  @param	$field (array) the $field being rendered
         *
         *  @type	action
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	$field (array) the $field being edited
         *  @return	n/a
         */
        function render_field( $field ) {
            /*
             *  Review the data of $field.
             *  This will show what data is available
             */
            // echo '<pre>';
            // 	print_r( $field );
            // echo '</pre>';
            /*
             *  Create a simple text input using the 'font_size' setting.
             */
            ?>
		<input
			type="text"
			id="mapster-map-geojson-<?php 
            echo $field['ID'];
            ?>"
			name="<?php 
            echo esc_attr( $field['name'] );
            ?>"
			value="<?php 
            echo esc_attr( $field['value'] );
            ?>"
			style="display:none;"
		/>

		<?php 
            if ( is_admin() ) {
                ?>

			<div class="mapster-map-container">
				<div>
          <div class="mapster-map-instructions"></div>
					<div
						class="mapster-map mapster-submission-map"
						id="mapster-map-<?php 
                echo $field['ID'];
                ?>"
						style="height: 400px; width: 100%;"
						data-point="<?php 
                echo ( esc_attr( $field['mapster-draw-type'] ) === 'point' ? 1 : 0 );
                ?>"
						data-linestring="<?php 
                echo ( esc_attr( $field['mapster-draw-type'] ) === 'linestring' ? 1 : 0 );
                ?>"
						data-polygon="<?php 
                echo ( esc_attr( $field['mapster-draw-type'] ) === 'polygon' ? 1 : 0 );
                ?>"
					></div>
					<div class="mapster-mini-buttons mapster-edit-full-width"><?php 
                echo __( 'Expand Map', 'mapster-wordpress-maps' );
                ?></div>
					<?php 
                if ( esc_attr( $field['mapster-draw-type'] ) == 'linestring' || esc_attr( $field['mapster-draw-type'] ) == 'polygon' ) {
                    ?>
						<div class="mapster-mini-buttons mapster-simplify-shape"><?php 
                    echo __( 'Simplify Shape', 'mapster-wordpress-maps' );
                    ?></div>
					<?php 
                }
                ?>
					<div class="mapster-mini-buttons mapster-download-geojson"><?php 
                echo __( 'Download GeoJSON', 'mapster-wordpress-maps' );
                ?></div>
					<div class="mapster-mini-buttons mapster-image-base"><?php 
                echo __( 'Use image as map base', 'mapster-wordpress-maps' );
                ?></div>
				</div>
				<div>
					<div class="mapster-map-input-container">
						<?php 
                if ( esc_attr( $field['mapster-draw-type'] ) == 'point' ) {
                    ?>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Search for address', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Enter address to place a location on the map.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div>
								<input id="mapster-map-geosearch" type="text" placeholder="<?php 
                    echo __( 'Enter address or location', 'mapster-wordpress-maps' );
                    ?>" />
								<ul id="mapster-geocoder-results"></ul>
							</div>
							<div class="button-container">
								<div id="mapster-get-results" class="button button-primary"><?php 
                    echo __( 'Search', 'mapster-wordpress-maps' );
                    ?></div>
							</div>
							<div class="mapster-map-line">
								<div><?php 
                    echo __( 'OR', 'mapster-wordpress-maps' );
                    ?></div> <hr />
							</div>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Select a point manually', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Click below and then press on the map to create a location.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div id="draw-point" class="button button-primary"><?php 
                    echo ( $field['value'] ? __( 'Replace', 'mapster-wordpress-maps' ) : __( 'Start', 'mapster-wordpress-maps' ) );
                    ?> <?php 
                    echo __( 'Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="draw-delete" class="button button-secondary"><?php 
                    echo __( 'Delete', 'mapster-wordpress-maps' );
                    ?></div>
							<div class="mapster-map-line">
								<div><?php 
                    echo __( 'OR', 'mapster-wordpress-maps' );
                    ?></div> <hr />
							</div>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Manual Entry', 'mapster-wordpress-maps' );
                    ?></label>
							</div>
							<div>
								<div class="point-inputs">
									<input id="mapster-map-point-longitude" type="text" placeholder="<?php 
                    echo __( 'Longitude', 'mapster-wordpress-maps' );
                    ?>" />
									<input id="mapster-map-point-latitude" type="text" placeholder="<?php 
                    echo __( 'Latitude', 'mapster-wordpress-maps' );
                    ?>" />
								</div>
								<div id="set-manual-point" class="button button-primary"><?php 
                    echo __( 'Set Point', 'mapster-wordpress-maps' );
                    ?></div>
							</div>
						<?php 
                }
                ?>
						<?php 
                if ( esc_attr( $field['mapster-draw-type'] ) == 'linestring' ) {
                    ?>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Search for address', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Enter address to move the map closer to your desired area.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div>
								<input id="mapster-map-geosearch" type="text" placeholder="Enter address or location" />
								<ul id="mapster-geocoder-results"></ul>
							</div>
							<div class="button-container">
								<div id="mapster-get-results" class="button button-primary"><?php 
                    echo __( 'Search', 'mapster-wordpress-maps' );
                    ?></div>
							</div>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Draw a line manually', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Click below and then click multiple times on the map to create a line. Click twice on the last point to complete the line.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div id="draw-linestring" class="button button-primary"><?php 
                    echo ( $field['value'] ? __( 'Replace', 'mapster-wordpress-maps' ) : __( 'Start', 'mapster-wordpress-maps' ) );
                    ?> <?php 
                    echo __( 'Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="edit-linestring" class="button button-secondary"><?php 
                    echo __( 'Edit Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="draw-delete" class="button button-tertiary"><?php 
                    echo __( 'Delete', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="finish-drawing">
								<div class="button button-primary"><?php 
                    echo __( 'Done Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							</div>
							<?php 
                    ?>
							<div class="mapster-map-line">
								<div><?php 
                    echo __( 'OR', 'mapster-wordpress-maps' );
                    ?></div> <hr />
							</div>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Upload a GeoJSON', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Upload a GeoJSON with a single LineString feature.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div>
								<input id="mapster-map-upload" data-type="LineString,MultiLineString" type="file" />'
							</div>
						<?php 
                }
                ?>
						<?php 
                if ( esc_attr( $field['mapster-draw-type'] ) == 'polygon' ) {
                    ?>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Search for address', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Enter address to move the map closer to your desired area.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div>
								<input id="mapster-map-geosearch" type="text" placeholder="Enter address or location" />
								<ul id="mapster-geocoder-results"></ul>
							</div>
							<div class="button-container">
								<div id="mapster-get-results" class="button button-primary"><?php 
                    echo __( 'Search', 'mapster-wordpress-maps' );
                    ?></div>
							</div>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Draw a polygon manually', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Click below and then click multiple times on the map to create a polygon. Connect to the beginning of the polygon to complete the shape.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div id="draw-polygon" class="button button-primary"><?php 
                    echo ( $field['value'] ? __( 'Replace', 'mapster-wordpress-maps' ) : __( 'Start', 'mapster-wordpress-maps' ) );
                    ?> <?php 
                    echo __( 'Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="edit-polygon" class="button button-secondary"><?php 
                    echo __( 'Edit Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="draw-delete" class="button button-tertiary"><?php 
                    echo __( 'Delete', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="finish-drawing">
								<div class="button button-primary"><?php 
                    echo __( 'Done Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							</div>
							<?php 
                    ?>
							<div class="mapster-map-line">
								<div><?php 
                    echo __( 'OR', 'mapster-wordpress-maps' );
                    ?></div> <hr />
							</div>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Upload a GeoJSON', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Upload a GeoJSON with a single Polygon feature.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div>
								<input id="mapster-map-upload" data-type="Polygon,MultiPolygon" type="file" />'
							</div>
						<?php 
                }
                ?>
					</div>
					<?php 
                ?>
			</div>
		</div>
		<?php 
            }
            ?>


		<?php 
            if ( !is_admin() ) {
                ?>

			<div class="mapster-map-container mapster-map-submission-frontend">
				<?php 
                if ( esc_attr( $field['mapster-draw-type'] ) == 'point' ) {
                    ?>
					<div class="mapster-tab-buttons">
						<div class="acf-label mapster-search-label active">
							<label><?php 
                    echo __( 'Search for address', 'mapster-wordpress-maps' );
                    ?></label>
						</div>
						<div class="acf-label mapster-manual-label">
							<label><?php 
                    echo __( 'Add a point manually', 'mapster-wordpress-maps' );
                    ?></label>
						</div>
					</div>
					<div class="mapster-search-container">
						<p class="description"><?php 
                    echo __( 'Enter address to place a location on the map.', 'mapster-wordpress-maps' );
                    ?></p>
						<?php 
                    $freeOrMapbox = "free";
                    if ( get_field( 'geocoder' ) == 'mapbox-geocoder' && get_field( 'access_token' ) !== "" ) {
                        $freeOrMapbox = 'mapbox';
                    }
                    if ( $freeOrMapbox == "free" ) {
                        ?>
								<div>
									<input id="mapster-map-geosearch" type="text" placeholder="Enter address or location" />
									<ul id="mapster-geocoder-results"></ul>
								</div>
								<div class="button-container">
									<div id="mapster-get-results" class="button button-primary"><?php 
                        echo __( 'Search', 'mapster-wordpress-maps' );
                        ?></div>
								</div>
								<?php 
                    } else {
                        if ( $freeOrMapbox == 'mapbox' ) {
                            ?>
								<div>
									<div id="mapster-geocoder-mapbox" data-access_token="<?php 
                            echo get_field( 'access_token' );
                            ?>"></div>
								</div>
								<?php 
                        }
                    }
                    ?>
					</div>
					<div class="mapster-manual-container">
						<p class="description"><?php 
                    echo __( 'Click below and then press on the map to create a location.', 'mapster-wordpress-maps' );
                    ?></p>
						<div>
							<div id="draw-point" class="button button-primary"><?php 
                    echo ( $field['value'] !== '{ "type" : "FeatureCollection", "features" : [] }' ? __( 'Replace', 'mapster-wordpress-maps' ) : __( 'Add', 'mapster-wordpress-maps' ) );
                    ?> <?php 
                    echo __( 'Point', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="draw-delete" class="button button-secondary"><?php 
                    echo __( 'Delete', 'mapster-wordpress-maps' );
                    ?> <?php 
                    echo __( 'Point', 'mapster-wordpress-maps' );
                    ?></div>
						</div>
					</div>
				<?php 
                }
                ?>
				<?php 
                if ( esc_attr( $field['mapster-draw-type'] ) == 'linestring' || esc_attr( $field['mapster-draw-type'] ) == 'polygon' ) {
                    ?>
					<div class="acf-label">
						<label><?php 
                    echo __( 'Search for address', 'mapster-wordpress-maps' );
                    ?></label>
						<p class="description"><?php 
                    echo __( 'Enter address to move the map closer to your desired area.', 'mapster-wordpress-maps' );
                    ?></p>
					</div>
					<div>
						<input id="mapster-map-geosearch" type="text" placeholder="Enter address or location" />
						<ul id="mapster-geocoder-results"></ul>
					</div>
				<?php 
                }
                ?>
				<div>
					<div
						class="mapster-map mapster-submission-map"
						id="mapster-map-<?php 
                echo $field['ID'];
                ?>"
						style="height: 400px; width: 100%;"
            data-point="<?php 
                echo ( esc_attr( $field['mapster-draw-type'] ) === 'point' ? 1 : 0 );
                ?>"
            data-linestring="<?php 
                echo ( esc_attr( $field['mapster-draw-type'] ) === 'linestring' ? 1 : 0 );
                ?>"
            data-polygon="<?php 
                echo ( esc_attr( $field['mapster-draw-type'] ) === 'polygon' ? 1 : 0 );
                ?>"
					></div>
				</div>
				<div>
					<div class="mapster-map-input-container">
						<?php 
                if ( esc_attr( $field['mapster-draw-type'] ) == 'linestring' ) {
                    ?>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Draw a line manually', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Click below and then click multiple times on the map to create a line. Click twice on the last point to complete the line.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div id="draw-linestring" class="button button-primary"><?php 
                    echo ( $field['value'] ? __( 'Replace', 'mapster-wordpress-maps' ) : __( 'Start', 'mapster-wordpress-maps' ) );
                    ?> <?php 
                    echo __( 'Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="edit-linestring" class="button button-secondary"><?php 
                    echo __( 'Edit Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="draw-delete" class="button button-tertiary"><?php 
                    echo __( 'Delete', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="finish-drawing">
								<div class="button button-primary"><?php 
                    echo __( 'Done Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							</div>
						<?php 
                }
                ?>
						<?php 
                if ( esc_attr( $field['mapster-draw-type'] ) == 'polygon' ) {
                    ?>
							<div class="acf-label">
								<label><?php 
                    echo __( 'Draw a polygon manually', 'mapster-wordpress-maps' );
                    ?></label>
								<p class="description"><?php 
                    echo __( 'Click below and then click multiple times on the map to create a polygon. Connect to the beginning of the polygon to complete the shape.', 'mapster-wordpress-maps' );
                    ?></p>
							</div>
							<div id="draw-polygon" class="button button-primary"><?php 
                    echo ( $field['value'] ? __( 'Replace', 'mapster-wordpress-maps' ) : __( 'Start', 'mapster-wordpress-maps' ) );
                    ?> <?php 
                    echo __( 'Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="edit-polygon" class="button button-secondary"><?php 
                    echo __( 'Edit Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="draw-delete" class="button button-tertiary"><?php 
                    echo __( 'Delete', 'mapster-wordpress-maps' );
                    ?></div>
							<div id="finish-drawing">
								<div class="button button-primary"><?php 
                    echo __( 'Done Drawing', 'mapster-wordpress-maps' );
                    ?></div>
							</div>
						<?php 
                }
                ?>
					</div>
				</div>
			</div>
		<?php 
            }
            ?>


    <?php 
        }

        /*
         *  input_admin_enqueue_scripts()
         *
         *  This action is called in the admin_enqueue_scripts action on the edit screen where your field is created.
         *  Use this action to add CSS + JavaScript to assist your render_field() action.
         *
         *  @type	action (admin_enqueue_scripts)
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	n/a
         *  @return	n/a
         */
        function input_admin_enqueue_scripts() {
            // vars
            $url = $this->settings['url'];
            $version = $this->settings['version'];
            $post_type = get_post_type( get_the_ID() );
            $field_groups = acf_get_field_groups( array(
                'post_type' => $post_type,
            ) );
            $has_mapster_map_field = false;
            foreach ( $field_groups as $field_group ) {
                $fields = acf_get_fields( $field_group["key"] );
                foreach ( $fields as $field ) {
                    if ( $field['type'] == 'mapster-map' ) {
                        $has_mapster_map_field = true;
                        break;
                    }
                }
            }
            if ( function_exists( 'get_current_screen' ) ) {
                $current_screen = get_current_screen();
                if ( $has_mapster_map_field ) {
                    // if( $current_screen && ($current_screen->id == "mapster-wp-location" || $current_screen->id == "mapster-wp-line" || $current_screen->id == "mapster-wp-polygon" || $current_screen->id == "mapster-wp-user-sub") ) {
                    // register & include JS
                    wp_enqueue_media();
                    $settings_page_id = get_option( 'mapster_settings_page' );
                    $access_token = get_field( 'default_access_token', $settings_page_id );
                    $editing_map_style = get_field( 'pro_editing_map_style', $settings_page_id );
                    $default_latitude = get_field( 'pro_default_map_view_default_latitude', $settings_page_id );
                    $default_longitude = get_field( 'pro_default_map_view_default_longitude', $settings_page_id );
                    $default_zoom = get_field( 'pro_default_map_view_default_zoom', $settings_page_id );
                    $params_to_include = array(
                        'access_token'         => $access_token,
                        'editing_map_style'    => $editing_map_style,
                        'mapster_default_lat'  => $default_latitude,
                        'mapster_default_lng'  => $default_longitude,
                        'mapster_default_zoom' => $default_zoom,
                    );
                    if ( MAPSTER_LOCAL_TESTING ) {
                        wp_enqueue_script(
                            'mapster_map_field_turf_js',
                            "{$url}../../admin/js/vendor/turf.js",
                            array('acf-input'),
                            $version
                        );
                        wp_enqueue_script(
                            'mapster_map_field_maplibre_js',
                            "{$url}../../admin/js/vendor/maplibre-1.15.2.js",
                            array('mapster_map_field_turf_js'),
                            $version
                        );
                        wp_enqueue_script(
                            'mapster_map_field_mapbox_draw_js',
                            "{$url}../../admin/js/vendor/mapbox-gl-draw.js",
                            array('mapster_map_field_maplibre_js'),
                            $version
                        );
                        wp_enqueue_script(
                            'mapster_map_field_geosearch_js',
                            "{$url}../../admin/js/vendor/leaflet-geosearch-3.0.5.js",
                            array('mapster_map_field_mapbox_draw_js'),
                            $version
                        );
                        wp_enqueue_script(
                            'mapster_map_field_geojsonhint_js',
                            "{$url}../../admin/js/vendor/geojsonhint.js",
                            array('mapster_map_field_geosearch_js'),
                            $version
                        );
                        wp_enqueue_script(
                            'mapster_map_field_bezier_curve',
                            "{$url}assets/js/bezier-curve.js",
                            array('mapster_map_field_geojsonhint_js'),
                            $version
                        );
                        $last_enqueue = 'mapster_map_field_bezier_curve';
                        wp_register_script(
                            'mapster_mapbox_field_js',
                            "{$url}assets/js/input.js",
                            array($last_enqueue),
                            $version
                        );
                        wp_localize_script( 'mapster_mapbox_field_js', 'mapster_editor', $params_to_include );
                        wp_enqueue_script( 'mapster_mapbox_field_js' );
                        // register & include CSS
                        wp_enqueue_style(
                            'mapster_map_field_maplibre_css',
                            "{$url}../../admin/css/vendor/maplibre-1.15.2.css",
                            array('acf-input'),
                            $version
                        );
                        wp_enqueue_style(
                            'mapster_map_field_geosearch_css',
                            "{$url}../../admin/css/vendor/leaflet-geosearch-3.0.5.css",
                            array('mapster_map_field_maplibre_css'),
                            $version
                        );
                        wp_enqueue_style(
                            'mapster_map_field_maplibre_draw_css',
                            "{$url}../../admin/css/vendor/mapbox-gl-draw.css",
                            array('mapster_map_field_geosearch_css'),
                            $version
                        );
                        wp_enqueue_style(
                            'mapster_map_field_css',
                            "{$url}assets/css/input.css",
                            array('mapster_map_field_maplibre_draw_css'),
                            $version
                        );
                    } else {
                        $script_to_load = "{$url}assets/dist/acf-mapster-map.js";
                        wp_enqueue_script(
                            'mapster_mapbox_field_js',
                            $script_to_load,
                            array('acf-input'),
                            $version
                        );
                        wp_localize_script( 'mapster_mapbox_field_js', 'mapster_editor', $params_to_include );
                        wp_enqueue_script( 'mapster_mapbox_field_js' );
                        // register & include CSS
                        wp_enqueue_style(
                            'mapster_map_field_css',
                            "{$url}assets/dist/acf-mapster-map.css",
                            array(),
                            $version
                        );
                    }
                }
            }
        }

        /*
         *  input_admin_head()
         *
         *  This action is called in the admin_head action on the edit screen where your field is created.
         *  Use this action to add CSS and JavaScript to assist your render_field() action.
         *
         *  @type	action (admin_head)
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	n/a
         *  @return	n/a
         */
        /*
        function input_admin_head() {
        
        
        }
        */
        /*
         *  input_form_data()
         *
         *  This function is called once on the 'input' page between the head and footer
         *  There are 2 situations where ACF did not load during the 'acf/input_admin_enqueue_scripts' and
         *  'acf/input_admin_head' actions because ACF did not know it was going to be used. These situations are
         *  seen on comments / user edit forms on the front end. This function will always be called, and includes
         *  $args that related to the current screen such as $args['post_id']
         *
         *  @type	function
         *  @date	6/03/2014
         *  @since	5.0.0
         *
         *  @param	$args (array)
         *  @return	n/a
         */
        /*
        function input_form_data( $args ) {
        
        
        }
        */
        /*
         *  input_admin_footer()
         *
         *  This action is called in the admin_footer action on the edit screen where your field is created.
         *  Use this action to add CSS and JavaScript to assist your render_field() action.
         *
         *  @type	action (admin_footer)
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	n/a
         *  @return	n/a
         */
        /*
        function input_admin_footer() {
        
        
        }
        */
        /*
         *  field_group_admin_enqueue_scripts()
         *
         *  This action is called in the admin_enqueue_scripts action on the edit screen where your field is edited.
         *  Use this action to add CSS + JavaScript to assist your render_field_options() action.
         *
         *  @type	action (admin_enqueue_scripts)
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	n/a
         *  @return	n/a
         */
        /*
        function field_group_admin_enqueue_scripts() {
        }
        */
        /*
         *  field_group_admin_head()
         *
         *  This action is called in the admin_head action on the edit screen where your field is edited.
         *  Use this action to add CSS and JavaScript to assist your render_field_options() action.
         *
         *  @type	action (admin_head)
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	n/a
         *  @return	n/a
         */
        /*
        function field_group_admin_head() {
        }
        */
        /*
         *  load_value()
         *
         *  This filter is applied to the $value after it is loaded from the db
         *
         *  @type	filter
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	$value (mixed) the value found in the database
         *  @param	$post_id (mixed) the $post_id from which the value was loaded
         *  @param	$field (array) the field array holding all the field options
         *  @return	$value
         */
        /*
        function load_value( $value, $post_id, $field ) {
        	return $value;
        }
        */
        /*
         *  update_value()
         *
         *  This filter is applied to the $value before it is saved in the db
         *
         *  @type	filter
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	$value (mixed) the value found in the database
         *  @param	$post_id (mixed) the $post_id from which the value was loaded
         *  @param	$field (array) the field array holding all the field options
         *  @return	$value
         */
        /*
        function update_value( $value, $post_id, $field ) {
        	return $value;
        }
        */
        /*
         *  format_value()
         *
         *  This filter is appied to the $value after it is loaded from the db and before it is returned to the template
         *
         *  @type	filter
         *  @since	3.6
         *  @date	23/01/13
         *
         *  @param	$value (mixed) the value which was loaded from the database
         *  @param	$post_id (mixed) the $post_id from which the value was loaded
         *  @param	$field (array) the field array holding all the field options
         *
         *  @return	$value (mixed) the modified value
         */
        /*
        function format_value( $value, $post_id, $field ) {
        	// bail early if no value
        		if( empty($value) ) {
        		return $value;
        	}
        
        	// apply setting
        		if( $field['font_size'] > 12 ) {
        		// format the value
        			// $value = 'something';
        	}
        
        	// return
        		return $value;
        	}
        */
        /*
         *  validate_value()
         *
         *  This filter is used to perform validation on the value prior to saving.
         *  All values are validated regardless of the field's required setting. This allows you to validate and return
         *  messages to the user if the value is not correct
         *
         *  @type	filter
         *  @date	11/02/2014
         *  @since	5.0.0
         *
         *  @param	$valid (boolean) validation status based on the value and the field's required setting
         *  @param	$value (mixed) the $_POST value
         *  @param	$field (array) the field array holding all the field options
         *  @param	$input (string) the corresponding input name for $_POST value
         *  @return	$valid
         */
        function validate_value(
            $valid,
            $value,
            $field,
            $input
        ) {
            if ( $field['required'] == 1 ) {
                if ( $value == "" || !isset( $value ) ) {
                    $valid = false;
                } else {
                    $decoded_value = json_decode( stripslashes( $value ) );
                    if ( !$decoded_value || count( $decoded_value->features ) == 0 ) {
                        $valid = false;
                    }
                }
                if ( !$valid ) {
                    $valid = __( 'A geography is required for this post.', 'mapster_acf_plugin_map' );
                }
            }
            return $valid;
        }

        /*
         *  delete_value()
         *
         *  This action is fired after a value has been deleted from the db.
         *  Please note that saving a blank value is treated as an update, not a delete
         *
         *  @type	action
         *  @date	6/03/2014
         *  @since	5.0.0
         *
         *  @param	$post_id (mixed) the $post_id from which the value was deleted
         *  @param	$key (string) the $meta_key which the value was deleted
         *  @return	n/a
         */
        /*
        function delete_value( $post_id, $key ) {
        
        
        }
        */
        /*
         *  load_field()
         *
         *  This filter is applied to the $field after it is loaded from the database
         *
         *  @type	filter
         *  @date	23/01/2013
         *  @since	3.6.0
         *
         *  @param	$field (array) the field array holding all the field options
         *  @return	$field
         */
        /*
        function load_field( $field ) {
        	return $field;
        }
        */
        /*
         *  update_field()
         *
         *  This filter is applied to the $field before it is saved to the database
         *
         *  @type	filter
         *  @date	23/01/2013
         *  @since	3.6.0
         *
         *  @param	$field (array) the field array holding all the field options
         *  @return	$field
         */
        /*
        function update_field( $field ) {
        	return $field;
        }
        */
        /*
         *  delete_field()
         *
         *  This action is fired after a field is deleted from the database
         *
         *  @type	action
         *  @date	11/02/2014
         *  @since	5.0.0
         *
         *  @param	$field (array) the field array holding all the field options
         *  @return	n/a
         */
        /*
        function delete_field( $field ) {
        
        
        }
        */
    }

    // initialize
    new mapster_acf_field_map($this->settings);
    // class_exists check
}
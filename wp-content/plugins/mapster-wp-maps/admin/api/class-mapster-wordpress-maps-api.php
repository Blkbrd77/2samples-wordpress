<?php

class Mapster_Wordpress_Maps_Admin_API {
    public function mapster_wp_maps_set_tutorial_option() {
        register_rest_route( 'mapster-wp-maps', 'set-tutorial-option', array(
            'methods'             => 'GET',
            'callback'            => 'mapster_wp_maps_set_tutorial_option_from_js',
            'permission_callback' => function () {
                return current_user_can( 'manage_options' );
            },
        ) );
        function mapster_wp_maps_set_tutorial_option_from_js(  $request  ) {
            $value = $request->get_param( 'value' );
            update_option( 'mapster_tutorial', $value );
            return array(
                "success" => true,
            );
        }

    }

    public function mapster_wp_maps_duplicate_post() {
        register_rest_route( 'mapster-wp-maps', 'duplicate', array(
            'methods'             => 'POST',
            'callback'            => 'mapster_wp_maps_duplication',
            'permission_callback' => function () {
                return current_user_can( 'manage_options' );
            },
        ) );
        function mapster_wp_maps_duplication(  $request  ) {
            $body = $request->get_body();
            $decoded_body = json_decode( $body );
            $post_id = $decoded_body->id;
            $old_post = get_post( $post_id );
            $new_post = array(
                'post_author'           => $old_post->post_author,
                'post_content'          => $old_post->post_content,
                'post_title'            => $old_post->post_title,
                'post_excerpt'          => $old_post->post_excerpt,
                'post_status'           => $old_post->post_status,
                'comment_status'        => $old_post->comment_status,
                'ping_status'           => $old_post->ping_status,
                'post_password'         => $old_post->post_password,
                'to_ping'               => $old_post->to_ping,
                'pinged'                => $old_post->pinged,
                'post_content_filtered' => $old_post->post_content_filtered,
                'post_parent'           => $old_post->post_parent,
                'menu_order'            => $old_post->menu_order,
                'post_type'             => $old_post->post_type,
                'post_mime_type'        => $old_post->post_mime_type,
            );
            $new_post_id = wp_insert_post( $new_post );
            if ( $new_post_id ) {
                $meta_data = get_post_meta( $post_id );
                if ( mapster_can_be_looped( $meta_data ) ) {
                    foreach ( $meta_data as $meta_key => $meta_value ) {
                        update_post_meta( $new_post_id, $meta_key, maybe_unserialize( $meta_value[0] ) );
                    }
                }
                mapster_update_wpml_post( $post_id, $new_post_id, $old_post->post_type );
                return $new_post_id;
            }
            return array(
                "new_post_id" => $new_post_id,
            );
        }

    }

    public function mapster_wp_maps_import_geojson_features() {
        register_rest_route( 'mapster-wp-maps', 'import-geojson', array(
            'methods'             => 'POST',
            'callback'            => 'mapster_wp_maps_import_geojson',
            'permission_callback' => function () {
                return current_user_can( 'manage_options' );
            },
        ) );
        function mapster_wp_maps_import_geojson(  $request  ) {
            $body = $request->get_body();
            $decoded_body = json_decode( $body );
            $geojson = $decoded_body->file;
            $category_id = $decoded_body->category;
            $marker_count = 0;
            $poly_count = 0;
            $line_count = 0;
            if ( mapster_can_be_looped( $geojson->features ) ) {
                foreach ( $geojson->features as $feature ) {
                    $feature_copy = clone $feature;
                    $feature_copy->properties = new stdClass();
                    $feature_geojson = array(
                        "type"     => "FeatureCollection",
                        "features" => array($feature_copy),
                    );
                    if ( $feature->geometry->type == 'Point' ) {
                        $marker_count = $marker_count + 1;
                        $new_shape = wp_insert_post( array(
                            'post_type'   => 'mapster-wp-location',
                            'post_status' => 'publish',
                            'post_title'  => ( $feature->properties->name ? $feature->properties->name : $feature->geometry->type . ' ' . $marker_count ),
                        ) );
                        if ( $category_id !== "" ) {
                            wp_set_post_terms( $new_shape, array($category_id), 'wp-map-category' );
                        }
                        mapster_setDefaults( acf_get_fields( 'group_6163732e0426e' ), $new_shape );
                        mapster_setDefaults( acf_get_fields( 'group_6163d357655f4' ), $new_shape );
                        update_field( 'location', json_encode( $feature_geojson ), $new_shape );
                    }
                    if ( $feature->geometry->type == 'Polygon' || $feature->geometry->type == 'MultiPolygon' ) {
                        $poly_count = $poly_count + 1;
                        $new_shape = wp_insert_post( array(
                            'post_type'   => 'mapster-wp-polygon',
                            'post_status' => 'publish',
                            'post_title'  => ( $feature->properties->name ? $feature->properties->name : $feature->geometry->type . ' ' . $poly_count ),
                        ) );
                        if ( $category_id !== "" ) {
                            wp_set_post_terms( $new_shape, array($category_id), 'wp-map-category' );
                        }
                        mapster_setDefaults( acf_get_fields( 'group_616379566202f' ), $new_shape );
                        mapster_setDefaults( acf_get_fields( 'group_6163d357655f4' ), $new_shape );
                        update_field( 'polygon', json_encode( $feature_geojson ), $new_shape );
                    }
                    if ( $feature->geometry->type == 'LineString' || $feature->geometry->type == 'MultiLineString' ) {
                        $line_count = $line_count + 1;
                        $new_shape = wp_insert_post( array(
                            'post_type'   => 'mapster-wp-line',
                            'post_status' => 'publish',
                            'post_title'  => ( $feature->properties->name ? $feature->properties->name : $feature->geometry->type . ' ' . $line_count ),
                        ) );
                        if ( $category_id !== "" ) {
                            wp_set_post_terms( $new_shape, array($category_id), 'wp-map-category' );
                        }
                        mapster_setDefaults( acf_get_fields( 'group_616377d62836b' ), $new_shape );
                        mapster_setDefaults( acf_get_fields( 'group_6163d357655f4' ), $new_shape );
                        update_field( 'line', json_encode( $feature_geojson ), $new_shape );
                    }
                }
            }
            ob_get_clean();
            return array(
                "count" => $marker_count + $poly_count + $line_count,
            );
        }

    }

    public function mapster_wp_maps_import_gl_js_features() {
        register_rest_route( 'mapster-wp-maps', 'import-gl-js', array(
            'methods'             => 'POST',
            'callback'            => 'mapster_wp_maps_import_gl_js',
            'permission_callback' => function () {
                return current_user_can( 'manage_options' );
            },
        ) );
        function mapster_wp_maps_import_gl_js(  $request  ) {
            $body = $request->get_body();
            $decoded_body = json_decode( $body );
            $geojson = $decoded_body->file;
            $category_id = $decoded_body->category;
            $marker_count = 0;
            $poly_count = 0;
            $line_count = 0;
            $uploaded_images = array();
            $uploaded_images_new = array();
            if ( mapster_can_be_looped( $geojson->features ) ) {
                foreach ( $geojson->features as $feature ) {
                    $feature_copy = clone $feature;
                    $feature_copy->properties = new stdClass();
                    $geojson = array(
                        "type"     => "FeatureCollection",
                        "features" => array($feature_copy),
                    );
                    if ( $feature->geometry->type == 'Point' ) {
                        $marker_count = $marker_count + 1;
                        $new_shape = wp_insert_post( array(
                            'post_type'   => 'mapster-wp-location',
                            'post_status' => 'publish',
                            'post_title'  => ( $feature->properties->name !== '' ? $feature->properties->name : $feature->properties->marker_title . ' ' . $marker_count ),
                        ) );
                        if ( $category_id !== "" ) {
                            wp_set_post_terms( $new_shape, array($category_id), 'wp-map-category' );
                        }
                        mapster_setDefaults( acf_get_fields( 'group_6163732e0426e' ), $new_shape );
                        mapster_setDefaults( acf_get_fields( 'group_6163d357655f4' ), $new_shape );
                        update_field( 'location_style', 'label', $new_shape );
                        update_field( 'icon_icon_on', true, $new_shape );
                        update_field( 'icon_icon_properties_icon-anchor', $feature->properties->marker_icon_anchor, $new_shape );
                        update_field( 'icon_icon_properties_icon-size', 30, $new_shape );
                        update_field( 'enable_popup', true, $new_shape );
                        update_field( 'popup_style', get_option( 'mapster_default_popup' ), $new_shape );
                        update_field( 'popup_body_text', $feature->properties->description, $new_shape );
                        // Upload marker image
                        require_once ABSPATH . 'wp-admin/includes/media.php';
                        require_once ABSPATH . 'wp-admin/includes/file.php';
                        require_once ABSPATH . 'wp-admin/includes/image.php';
                        $filename = explode( '-wp_mapbox_gl_js_sizing', $feature->properties->marker_icon_url )[0];
                        if ( !in_array( $filename, $uploaded_images ) ) {
                            $attachment_id = media_sideload_image(
                                $filename,
                                0,
                                null,
                                'id'
                            );
                            array_push( $uploaded_images, $filename );
                            array_push( $uploaded_images_new, $attachment_id );
                            update_field( 'icon_icon_properties_icon-image', $attachment_id, $new_shape );
                        } else {
                            $index = array_search( $filename, $uploaded_images );
                            update_field( 'icon_icon_properties_icon-image', $uploaded_images_new[$index], $new_shape );
                        }
                        update_field( 'location', json_encode( $geojson ), $new_shape );
                    }
                    if ( $feature->geometry->type == 'Polygon' || $feature->geometry->type == 'MultiPolygon' ) {
                        $poly_count = $poly_count + 1;
                        $new_shape = wp_insert_post( array(
                            'post_type'   => 'mapster-wp-polygon',
                            'post_status' => 'publish',
                            'post_title'  => ( $feature->properties->name !== '' ? $feature->properties->name : $feature->properties->marker_title . ' ' . $poly_count ),
                        ) );
                        if ( $category_id !== "" ) {
                            wp_set_post_terms( $new_shape, array($category_id), 'wp-map-category' );
                        }
                        mapster_setDefaults( acf_get_fields( 'group_616379566202f' ), $new_shape );
                        mapster_setDefaults( acf_get_fields( 'group_6163d357655f4' ), $new_shape );
                        update_field( 'color', $feature->properties->color, $new_shape );
                        update_field( 'opacity', $feature->properties->opacity * 100, $new_shape );
                        update_field( 'polygon', json_encode( $geojson ), $new_shape );
                    }
                    if ( $feature->geometry->type == 'LineString' || $feature->geometry->type == 'MultiLineString' ) {
                        $line_count = $line_count + 1;
                        $new_shape = wp_insert_post( array(
                            'post_type'   => 'mapster-wp-line',
                            'post_status' => 'publish',
                            'post_title'  => ( $feature->properties->name !== '' ? $feature->properties->name : $feature->properties->marker_title . ' ' . $line_count ),
                        ) );
                        if ( $category_id !== "" ) {
                            wp_set_post_terms( $new_shape, array($category_id), 'wp-map-category' );
                        }
                        mapster_setDefaults( acf_get_fields( 'group_616377d62836b' ), $new_shape );
                        mapster_setDefaults( acf_get_fields( 'group_6163d357655f4' ), $new_shape );
                        update_field( 'color', $feature->properties->color, $new_shape );
                        update_field( 'opacity', $feature->properties->opacity * 100, $new_shape );
                        update_field( 'line', json_encode( $geojson ), $new_shape );
                    }
                }
            }
            ob_get_clean();
            return array(
                "count" => $line_count + $poly_count + $marker_count,
            );
        }

    }

    public function mapster_wp_maps_get_category_features() {
        register_rest_route( 'mapster-wp-maps', 'category', array(
            'methods'             => 'GET',
            'callback'            => 'mapster_wp_maps_get_category',
            'permission_callback' => function () {
                return true;
                // open to public
            },
        ) );
        function mapster_wp_maps_get_category(  $params  ) {
            $response = array();
            $id = json_decode( $params['id'] );
            $args = array(
                'tax_query'      => array(array(
                    "taxonomy"         => "wp-map-category",
                    "field"            => "term_id",
                    "terms"            => $id,
                    "include_children" => false,
                )),
                'post_status'    => 'publish',
                'posts_per_page' => -1,
            );
            $the_query = new WP_Query($args);
            if ( $the_query->have_posts() ) {
                while ( $the_query->have_posts() ) {
                    $the_query->the_post();
                    $thisResponse = mapster_getOnlyValues( get_the_ID() );
                    array_push( $response, $thisResponse );
                }
            }
            ob_get_clean();
            return $response;
        }

    }

    public function mapster_wp_maps_get_all_features() {
        register_rest_route( 'mapster-wp-maps', 'features', array(
            'methods'             => 'GET',
            'callback'            => 'mapster_wp_maps_get_features',
            'permission_callback' => function () {
                return true;
                // open to public
            },
        ) );
        function mapster_wp_maps_get_features(  $params  ) {
            $response = array();
            $idsArray = json_decode( $params['ids'] );
            $catsArray = json_decode( $params['categories'] );
            if ( mapster_can_be_looped( $idsArray ) ) {
                foreach ( $idsArray as $id ) {
                    $thisResponse = mapster_getOnlyValues( $id );
                    array_push( $response, $thisResponse );
                }
            }
            // Check for category additions
            if ( mapster_can_be_looped( $catsArray ) ) {
                if ( count( $catsArray ) > 0 ) {
                    $args = array(
                        'post_type'      => array(
                            'mapster-wp-user-sub',
                            'mapster-wp-location',
                            'mapster-wp-polygon',
                            'mapster-wp-line'
                        ),
                        'tax_query'      => array(array(
                            "taxonomy"         => "wp-map-category",
                            "field"            => "term_id",
                            "terms"            => $catsArray,
                            "include_children" => false,
                        )),
                        'post_status'    => 'publish',
                        'posts_per_page' => -1,
                    );
                    $the_query = new WP_Query($args);
                    if ( $the_query->have_posts() ) {
                        while ( $the_query->have_posts() ) {
                            $the_query->the_post();
                            $thisResponse = mapster_getOnlyValues( get_the_ID() );
                            array_push( $response, $thisResponse );
                        }
                    }
                }
            }
            ob_get_clean();
            return $response;
        }

    }

    public function mapster_wp_maps_get_single_feature() {
        register_rest_route( 'mapster-wp-maps', 'feature', array(
            'methods'             => 'GET',
            'callback'            => 'mapster_wp_maps_get_feature',
            'permission_callback' => function () {
                return true;
                // open to public
            },
        ) );
        function mapster_wp_maps_get_feature(  $params  ) {
            $post_id = intval( $params['id'] );
            $thisResponse = mapster_getOnlyValues( $post_id );
            ob_get_clean();
            return $thisResponse;
        }

    }

    public function mapster_wp_maps_get_map() {
        register_rest_route( 'mapster-wp-maps', 'map', array(
            'methods'             => 'GET',
            'callback'            => 'mapster_wp_maps_get_single_map',
            'permission_callback' => function () {
                return true;
                // open to public
            },
        ) );
        function mapster_wp_maps_get_single_map(  $params  ) {
            $post_id = intval( $params['id'] );
            $ignore_cache = $params['ignore_cache'];
            $single_feature_id = ( isset( $params['single_feature_id'] ) ? intval( $params['single_feature_id'] ) : false );
            $feature_ids = ( isset( $params['feature_ids'] ) ? $params['feature_ids'] : false );
            $acf_data = get_field_objects( $post_id );
            $minimized_data = array();
            // Top level properties
            if ( mapster_can_be_looped( $acf_data ) ) {
                foreach ( $acf_data as $key => $data ) {
                    $minimized_data[$key] = $data['value'];
                }
            }
            $popup_styles = array();
            $popup_styles_added = array();
            $minimized_location_data = array();
            $minimized_line_data = array();
            $minimized_polygon_data = array();
            $categories = array();
            $progressive_map = false;
            $testdata = false;
            // Load one feature if it's specified
            if ( $single_feature_id || $feature_ids ) {
                $features_to_fetch = array();
                if ( $single_feature_id ) {
                    array_push( $features_to_fetch, $single_feature_id );
                } else {
                    $features_to_fetch = explode( ',', $feature_ids );
                }
                foreach ( $features_to_fetch as $single_feature ) {
                    $this_feature_id = intval( $single_feature );
                    $single_feature_post_type = get_post_type( $this_feature_id );
                    $dataToAdd = mapster_getOnlyValues( $single_feature );
                    if ( $dataToAdd['data']['popup_style'] ) {
                        if ( !in_array( $dataToAdd['data']['popup_style']['id'], $popup_styles_added ) ) {
                            array_push( $popup_styles, $dataToAdd['data']['popup_style'] );
                            array_push( $popup_styles_added, $dataToAdd['data']['popup_style']['id'] );
                        }
                        $dataToAdd['data']['popup_style'] = $dataToAdd['data']['popup_style']['id'];
                    }
                    if ( $single_feature_post_type === 'mapster-wp-location' || $single_feature_post_type == 'mapster-wp-user-sub' ) {
                        array_push( $minimized_location_data, $dataToAdd );
                    } else {
                        if ( $single_feature_post_type === 'mapster-wp-line' ) {
                            array_push( $minimized_line_data, $dataToAdd );
                        } else {
                            if ( $single_feature_post_type === 'mapster-wp-polygon' ) {
                                array_push( $minimized_polygon_data, $dataToAdd );
                            }
                        }
                    }
                }
            } else {
                if ( $progressive_map ) {
                    $minimized_data['all_features'] = array();
                    if ( mapster_can_be_looped( $minimized_data['locations'] ) ) {
                        foreach ( $minimized_data['locations'] as $location ) {
                            array_push( $minimized_data['all_features'], $location->ID );
                        }
                    }
                    if ( mapster_can_be_looped( $minimized_data['lines'] ) ) {
                        foreach ( $minimized_data['lines'] as $line ) {
                            array_push( $minimized_data['all_features'], $line->ID );
                        }
                    }
                    if ( mapster_can_be_looped( $minimized_data['polygons'] ) ) {
                        foreach ( $minimized_data['polygons'] as $polygon ) {
                            array_push( $minimized_data['all_features'], $polygon->ID );
                        }
                    }
                    $categories = get_field( 'add_by_category', $post_id );
                    if ( mapster_can_be_looped( $categories ) ) {
                        if ( count( $categories ) > 0 ) {
                            $args = array(
                                'post_type'      => array(
                                    'mapster-wp-user-sub',
                                    'mapster-wp-location',
                                    'mapster-wp-polygon',
                                    'mapster-wp-line'
                                ),
                                'tax_query'      => array(array(
                                    "taxonomy"         => "wp-map-category",
                                    "field"            => "term_id",
                                    "terms"            => $categories,
                                    "include_children" => false,
                                )),
                                'post_status'    => 'publish',
                                'posts_per_page' => -1,
                            );
                            $the_query = new WP_Query($args);
                            if ( $the_query->have_posts() ) {
                                while ( $the_query->have_posts() ) {
                                    $the_query->the_post();
                                    array_push( $minimized_data['all_features'], get_the_ID() );
                                }
                            }
                        }
                    }
                    if ( isset( $minimized_data['add_custom_posts'] ) && mapster_can_be_looped( $minimized_data['add_custom_posts'] ) ) {
                        foreach ( $minimized_data['add_custom_posts'] as $custom_post ) {
                            array_push( $minimized_data['all_features'], $custom_post->ID );
                        }
                    }
                } else {
                    // Normal feature additions
                    if ( mapster_can_be_looped( $minimized_data['locations'] ) ) {
                        foreach ( $minimized_data['locations'] as $location ) {
                            $dataToAdd = mapster_getOnlyValues( $location->ID );
                            if ( isset( $dataToAdd['data']['popup_style'] ) && $dataToAdd['data']['popup_style'] ) {
                                if ( !in_array( $dataToAdd['data']['popup_style']['id'], $popup_styles_added ) ) {
                                    array_push( $popup_styles, $dataToAdd['data']['popup_style'] );
                                    array_push( $popup_styles_added, $dataToAdd['data']['popup_style']['id'] );
                                }
                                $dataToAdd['data']['popup_style'] = $dataToAdd['data']['popup_style']['id'];
                            }
                            array_push( $minimized_location_data, $dataToAdd );
                        }
                    }
                    if ( mapster_can_be_looped( $minimized_data['lines'] ) ) {
                        foreach ( $minimized_data['lines'] as $line ) {
                            $dataToAdd = mapster_getOnlyValues( $line->ID );
                            if ( isset( $dataToAdd['data']['popup_style'] ) ) {
                                if ( !in_array( $dataToAdd['data']['popup_style']['id'], $popup_styles_added ) ) {
                                    array_push( $popup_styles, $dataToAdd['data']['popup_style'] );
                                    array_push( $popup_styles_added, $dataToAdd['data']['popup_style']['id'] );
                                }
                                $dataToAdd['data']['popup_style'] = $dataToAdd['data']['popup_style']['id'];
                            }
                            array_push( $minimized_line_data, $dataToAdd );
                        }
                    }
                    if ( mapster_can_be_looped( $minimized_data['polygons'] ) ) {
                        foreach ( $minimized_data['polygons'] as $polygon ) {
                            $dataToAdd = mapster_getOnlyValues( $polygon->ID );
                            if ( isset( $dataToAdd['data']['popup_style'] ) ) {
                                if ( !in_array( $dataToAdd['data']['popup_style']['id'], $popup_styles_added ) ) {
                                    array_push( $popup_styles, $dataToAdd['data']['popup_style'] );
                                    array_push( $popup_styles_added, $dataToAdd['data']['popup_style']['id'] );
                                }
                                $dataToAdd['data']['popup_style'] = $dataToAdd['data']['popup_style']['id'];
                            }
                            array_push( $minimized_polygon_data, $dataToAdd );
                        }
                    }
                    // Check for category additions
                    $categories = get_field( 'add_by_category', $post_id );
                    if ( mapster_can_be_looped( $categories ) ) {
                        if ( count( $categories ) > 0 ) {
                            $all_posts = array();
                            $post_ids_added = array();
                            if ( get_field( 'submission_administration_show_all_languages_on_one_map', $post_id, true ) && is_plugin_active( 'sitepress-multilingual-cms/sitepress.php' ) ) {
                                $current_lang = apply_filters( 'wpml_current_language', NULL );
                                $languages = apply_filters( 'wpml_active_languages', NULL, 'orderby=id&order=desc' );
                                foreach ( $languages as $language ) {
                                    do_action( 'wpml_switch_language', $language["language_code"] );
                                    $args = array(
                                        'post_type'      => array(
                                            'mapster-wp-user-sub',
                                            'mapster-wp-location',
                                            'mapster-wp-polygon',
                                            'mapster-wp-line'
                                        ),
                                        'tax_query'      => array(array(
                                            "taxonomy"         => "wp-map-category",
                                            "field"            => "term_id",
                                            "terms"            => $categories,
                                            "include_children" => false,
                                        )),
                                        'post_status'    => 'publish',
                                        'posts_per_page' => -1,
                                    );
                                    $the_query = new WP_Query($args);
                                    if ( $the_query->have_posts() ) {
                                        while ( $the_query->have_posts() ) {
                                            $the_query->the_post();
                                            if ( !in_array( get_the_ID(), $post_ids_added ) ) {
                                                array_push( $all_posts, array(
                                                    "post_type" => get_post_type(),
                                                    "post_id"   => get_the_ID(),
                                                ) );
                                                array_push( $post_ids_added, get_the_ID() );
                                            }
                                        }
                                    }
                                }
                                do_action( 'wpml_switch_language', $current_lang["language_code"] );
                            } else {
                                $args = array(
                                    'post_type'      => array(
                                        'mapster-wp-user-sub',
                                        'mapster-wp-location',
                                        'mapster-wp-polygon',
                                        'mapster-wp-line'
                                    ),
                                    'tax_query'      => array(array(
                                        "taxonomy"         => "wp-map-category",
                                        "field"            => "term_id",
                                        "terms"            => $categories,
                                        "include_children" => false,
                                    )),
                                    'post_status'    => 'publish',
                                    'posts_per_page' => -1,
                                );
                                $the_query = new WP_Query($args);
                                if ( $the_query->have_posts() ) {
                                    while ( $the_query->have_posts() ) {
                                        $the_query->the_post();
                                        array_push( $all_posts, array(
                                            "post_type" => get_post_type(),
                                            "post_id"   => get_the_ID(),
                                        ) );
                                    }
                                }
                            }
                            foreach ( $all_posts as $post ) {
                                if ( $post['post_type'] == 'mapster-wp-location' || $post['post_type'] == 'mapster-wp-user-sub' ) {
                                    $dataToAdd = mapster_getOnlyValues( $post['post_id'] );
                                    if ( isset( $dataToAdd['data']['popup_style'] ) ) {
                                        if ( !in_array( $dataToAdd['data']['popup_style']['id'], $popup_styles_added ) ) {
                                            array_push( $popup_styles, $dataToAdd['data']['popup_style'] );
                                            array_push( $popup_styles_added, $dataToAdd['data']['popup_style']['id'] );
                                        }
                                        $dataToAdd['data']['popup_style'] = $dataToAdd['data']['popup_style']['id'];
                                    }
                                    array_push( $minimized_location_data, $dataToAdd );
                                }
                                if ( $post['post_type'] == 'mapster-wp-line' ) {
                                    $dataToAdd = mapster_getOnlyValues( $post['post_id'] );
                                    if ( isset( $dataToAdd['data']['popup_style'] ) ) {
                                        if ( !in_array( $dataToAdd['data']['popup_style']['id'], $popup_styles_added ) ) {
                                            array_push( $popup_styles, $dataToAdd['data']['popup_style'] );
                                            array_push( $popup_styles_added, $dataToAdd['data']['popup_style']['id'] );
                                        }
                                        $dataToAdd['data']['popup_style'] = $dataToAdd['data']['popup_style']['id'];
                                    }
                                    array_push( $minimized_line_data, $dataToAdd );
                                }
                                if ( $post['post_type'] == 'mapster-wp-polygon' ) {
                                    $dataToAdd = mapster_getOnlyValues( $post['post_id'] );
                                    if ( isset( $dataToAdd['data']['popup_style'] ) ) {
                                        if ( !in_array( $dataToAdd['data']['popup_style']['id'], $popup_styles_added ) ) {
                                            array_push( $popup_styles, $dataToAdd['data']['popup_style'] );
                                            array_push( $popup_styles_added, $dataToAdd['data']['popup_style']['id'] );
                                        }
                                        $dataToAdd['data']['popup_style'] = $dataToAdd['data']['popup_style']['id'];
                                    }
                                    array_push( $minimized_polygon_data, $dataToAdd );
                                }
                            }
                        }
                    }
                    unset($minimized_data['locations']);
                    unset($minimized_data['lines']);
                    unset($minimized_data['polygons']);
                }
            }
            ob_get_clean();
            // return array("test" => $testdata);
            // $ch = curl_init();
            // curl_setopt($ch, CURLOPT_URL, "https://swplus.be/wp-json/mapster-wp-maps/map?id=14642");
            // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            // curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
            // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
            // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            // $response = curl_exec($ch);
            // return json_decode($response);
            $toReturn = array(
                'id'                => $post_id,
                'cats'              => $categories,
                'popup_styles'      => $popup_styles,
                'location_template' => mapster_getTemplate( 'location' ),
                'line_template'     => mapster_getTemplate( 'line' ),
                'polygon_template'  => mapster_getTemplate( 'polygon' ),
                'map'               => mapster_remakeUsingTemplate( $minimized_data, 'map' ),
                'locations'         => mapster_minimizeUsingTemplate( dynamic_popup_replace( $minimized_location_data ), 'location' ),
                'lines'             => mapster_minimizeUsingTemplate( dynamic_popup_replace( $minimized_line_data ), 'line' ),
                'polygons'          => mapster_minimizeUsingTemplate( dynamic_popup_replace( $minimized_polygon_data ), 'polygon' ),
            );
            return $toReturn;
        }

    }

}

function dynamic_popup_replace(  $data  ) {
    return $data;
}

function replace_text_with_property_or_acf(  $post_id, $properties, $text  ) {
    $new_text = $text;
    preg_match_all( '#\\{(.*?)\\}#', $new_text, $matches );
    foreach ( $matches[0] as $index => $match ) {
        if ( isset( $properties[$matches[1][$index]] ) ) {
            $new_text = str_replace( $match, $properties[$matches[1][$index]], $new_text );
        } else {
            if ( strpos( $match, "acf" ) !== false ) {
                $acf_field_id = str_replace( "acf.", "", $matches[1][$index] );
                $field_data = get_field_object( $acf_field_id, $post_id );
                if ( $field_data ) {
                    if ( isset( $field_data['choices'] ) ) {
                        if ( is_array( $field_data['value'] ) ) {
                            $arranged_values = array();
                            foreach ( $field_data['value'] as $value ) {
                                array_push( $arranged_values, $field_data['choices'][$value] );
                            }
                            $field_data = implode( ', ', $arranged_values );
                        } else {
                            $field_data = $field_data['choices'][$field_data['value']];
                        }
                    } else {
                        $field_data = $field_data['value'];
                    }
                    $new_text = str_replace( $match, $field_data, $new_text );
                } else {
                    $new_text = str_replace( $match, "", $new_text );
                }
            }
        }
    }
    return $new_text;
}

function mapster_setGroup(  $field, $sub_fields, $post_id  ) {
    $array_to_add = array();
    if ( mapster_can_be_looped( $sub_fields ) ) {
        foreach ( $sub_fields as $sub_field ) {
            if ( isset( $sub_field['default_value'] ) ) {
                $array_to_add[$sub_field['name']] = $sub_field['default_value'];
                update_field( $field['name'], $array_to_add, $post_id );
            }
            if ( $sub_field['type'] == 'group' ) {
                mapster_setGroup( $sub_field, $sub_field['sub_fields'], $post_id );
            }
        }
    }
}

function mapster_setDefaults(  $all_fields, $post_id  ) {
    $field_names = array();
    if ( mapster_can_be_looped( $all_fields ) ) {
        foreach ( $all_fields as $field ) {
            array_push( $field_names, $field );
            if ( isset( $field['default_value'] ) ) {
                update_field( $field['name'], $field['default_value'], $post_id );
            }
            if ( $field['type'] == 'group' ) {
                mapster_setGroup( $field, $field['sub_fields'], $post_id );
            }
        }
    }
    return $field_names;
}

function mapster_minimizeUsingTemplate(  $data, $type  ) {
    $toReturn = array();
    $template = mapster_getTemplate( $type );
    if ( $type == 'map' ) {
        $toReturn = mapster_replaceValueIfNotDefault( $template, $data );
    } else {
        if ( mapster_can_be_looped( $data ) ) {
            foreach ( $data as $feature ) {
                array_push( $toReturn, mapster_replaceValueIfNotDefault( $template, $feature ) );
            }
        }
    }
    return $toReturn;
}

// Using default ACF values to make the object
// Therefore not worrying about undefined values that are newly added
function mapster_remakeUsingTemplate(  $data, $type  ) {
    $toReturn = array();
    $template = mapster_getTemplate( $type );
    if ( $type == 'map' ) {
        $toReturn = mapster_replaceValueOrNot( $template, $data );
    } else {
        if ( mapster_can_be_looped( $data ) ) {
            foreach ( $data as $feature ) {
                array_push( $toReturn, mapster_replaceValueOrNot( $template, $feature ) );
            }
        }
    }
    return $toReturn;
}

function mapster_replaceValueIfNotDefault(  $template, $data  ) {
    $toReturn = array();
    if ( mapster_can_be_looped( $template ) ) {
        foreach ( $template as $key => $field ) {
            if ( !is_null( $field ) || $key == 'popup_style' || isset( $data[$key] ) && !is_null( $data[$key] ) ) {
                if ( !isset( $data[$key] ) ) {
                    // $toReturn[$key] = $field;
                } else {
                    // var_dump($field);
                    if ( mapster_can_be_looped( $field ) ) {
                        $valueToAdd = mapster_replaceValueIfNotDefault( $field, $data[$key] );
                        if ( count( $valueToAdd ) > 0 ) {
                            $toReturn[$key] = $valueToAdd;
                        }
                    } else {
                        if ( mapster_can_be_looped( $data[$key] ) ) {
                            if ( $data[$key] !== $field ) {
                                $toReturn[$key] = $data[$key];
                            }
                        } else {
                            if ( strval( $data[$key] ) !== strval( $field ) ) {
                                $toReturn[$key] = $data[$key];
                            }
                        }
                    }
                }
            }
        }
    }
    if ( mapster_can_be_looped( $data ) ) {
        $all_field_keys = mapster_getAllTemplateFields( $template );
        foreach ( $data as $key => $dataPiece ) {
            if ( !is_null( $dataPiece ) ) {
                if ( !in_array( $key, $all_field_keys ) ) {
                    $toReturn['additional_details'][$key] = $dataPiece;
                }
            }
        }
        $extra_properties = mapster_getPropertyList( $data );
        foreach ( $extra_properties as $property_name => $value ) {
            $toReturn['data']['additional_details'][$property_name] = $value;
        }
    }
    return $toReturn;
}

function mapster_getAllTemplateFields(  $template  ) {
    $toReturn = array();
    foreach ( $template as $templateKey => $field ) {
        if ( mapster_can_be_looped( $field ) ) {
            array_push( $toReturn, $templateKey );
            $toReturn = array_merge( $toReturn, mapster_getAllTemplateFields( $field ) );
        } else {
            array_push( $toReturn, $templateKey );
        }
    }
    return $toReturn;
}

function mapster_replaceValueOrNot(  $template, $data  ) {
    $toReturn = array();
    if ( mapster_can_be_looped( $template ) ) {
        foreach ( $template as $key => $field ) {
            if ( !isset( $data[$key] ) ) {
                $toReturn[$key] = $field;
            } else {
                if ( mapster_can_be_looped( $field ) ) {
                    $toReturn[$key] = mapster_replaceValueOrNot( $field, $data[$key] );
                } else {
                    $toReturn[$key] = $data[$key];
                }
            }
        }
    }
    if ( mapster_can_be_looped( $data ) ) {
        foreach ( $data as $key => $dataPiece ) {
            if ( !isset( $toReturn[$key] ) && $dataPiece !== null ) {
                $toReturn['additional_details'][$key] = $dataPiece;
            }
            if ( $key == 'allowed_area' ) {
                $toReturn[$key] = get_field( 'polygon', $dataPiece );
            }
        }
        $extra_properties = mapster_getPropertyList( $data );
        foreach ( $extra_properties as $property_name => $value ) {
            $toReturn['data']['additional_details'][$property_name] = $value;
        }
    }
    return $toReturn;
}

function mapster_getTemplate(  $type  ) {
    if ( $type == 'map' ) {
        return mapster_arrange_fields( acf_get_fields( 'group_61636c62b003e' ), false );
    } elseif ( $type == 'line' ) {
        return mapster_arrange_fields( acf_get_fields( 'group_616377d62836b' ), true );
    } elseif ( $type == 'location' ) {
        return mapster_arrange_fields( acf_get_fields( 'group_6163732e0426e' ), true );
    } elseif ( $type == 'polygon' ) {
        return mapster_arrange_fields( acf_get_fields( 'group_616379566202f' ), true );
    }
}

// Organizing responses to have minimal output
function mapster_returnPopupData(  $popup_id  ) {
    $single_popup_style_data = array();
    $popup_style_data = get_field_objects( $popup_id );
    if ( mapster_can_be_looped( $popup_style_data ) ) {
        foreach ( $popup_style_data as $key => $data ) {
            $single_popup_style_data[$key] = $data['value'];
        }
    }
    $single_popup_style_data['id'] = $popup_id;
    return $single_popup_style_data;
}

function mapster_getPropertyList(  $data  ) {
    $propertiesToReturn = array();
    return $propertiesToReturn;
}

function mapster_getTermList(  $object_id  ) {
    $terms = get_the_terms( $object_id, 'wp-map-category' );
    $termsToReturn = array();
    if ( mapster_can_be_looped( $terms ) ) {
        foreach ( $terms as $term ) {
            if ( metadata_exists( 'term', $term->term_id, 'term_order' ) ) {
                $term->term_order = get_term_meta( $term->term_id, 'term_order' );
            }
        }
        foreach ( $terms as $term ) {
            $translated_term = $term;
            if ( is_plugin_active( 'sitepress-multilingual-cms/sitepress.php' ) ) {
                $term_id = apply_filters(
                    'wpml_object_id',
                    $term->term_id,
                    "wp-map-category",
                    true
                );
                $translated_term = get_term( $term_id, 'wp-map-category' );
            }
            $thisTerm = array(
                "id"         => $translated_term->term_id,
                "name"       => $translated_term->name,
                "slug"       => $translated_term->slug,
                "term_order" => $translated_term->term_order,
                "color"      => get_field( "color", 'wp-map-category_' . $translated_term->term_id ),
                "icon"       => get_field( "icon", 'wp-map-category_' . $translated_term->term_id ),
                "parent"     => $translated_term->parent,
            );
            array_push( $termsToReturn, $thisTerm );
        }
    }
    return $termsToReturn;
}

function mapster_getOnlyValues(  $object_id  ) {
    $field_object_data = get_field_objects( $object_id );
    $single_feature_data = array(
        "id"         => $object_id,
        "slug"       => get_post_field( 'post_name', $object_id ),
        "menu_order" => get_post_field( 'menu_order', $object_id ),
        "permalink"  => get_permalink( $object_id ),
        "title"      => get_the_title( $object_id ),
        "content"    => get_the_content( null, null, $object_id ),
        "categories" => mapster_getTermList( $object_id ),
        "data"       => $field_object_data,
    );
    if ( mapster_can_be_looped( $field_object_data ) ) {
        foreach ( $field_object_data as $key => $data ) {
            $thisValue = $data['value'];
            if ( is_string( $data['value'] ) && strpos( $data['value'], "FeatureCollection" ) !== false ) {
                ini_set( 'serialize_precision', '-1' );
                $thisGeoJSON = json_decode( $data['value'] );
                $thisValue = array(
                    'type'        => $thisGeoJSON->features[0]->geometry->type,
                    'coordinates' => mapster_encode_coordinates( $thisGeoJSON->features[0]->geometry->coordinates ),
                );
            }
            $single_feature_data['data'][$key] = $thisValue;
            if ( $key == 'popup_style' ) {
                if ( isset( $single_feature_data['data'][$key] ) && $single_feature_data['data'][$key] && $single_feature_data['data'][$key]->ID ) {
                    $single_feature_data['data'][$key] = mapster_returnPopupData( $single_feature_data['data'][$key]->ID );
                }
            }
            if ( $key == 'popup' ) {
                $single_feature_data['data'][$key]['permalink'] = get_permalink( $object_id );
                if ( $single_feature_data['data'][$key]['featured_image'] ) {
                    $newImageData = array();
                    $newImageData['id'] = $single_feature_data['data'][$key]['featured_image']['id'];
                    $image_thumbnail_size = ( $single_feature_data['data']['popup_style']['image_thumbnail_size'] ? $single_feature_data['data']['popup_style']['image_thumbnail_size'] : 'medium' );
                    $newImageData['url'] = wp_get_attachment_image_url( $newImageData['id'], $image_thumbnail_size );
                    $single_feature_data['data'][$key]['featured_image'] = $newImageData;
                }
            }
            if ( $key == 'images' ) {
                foreach ( $field_object_data[$key]['value'] as $image ) {
                    $image_thumbnail_size = ( $single_feature_data['data']['popup_style']['image_thumbnail_size'] ? $single_feature_data['data']['popup_style']['image_thumbnail_size'] : 'medium' );
                    $thisAttachment = wp_get_attachment_image_src( $image['id'], $image_thumbnail_size );
                    array_push( $single_feature_data['data']['popup']['images'], $thisAttachment[0] );
                }
            }
            if ( $key === 'icon' ) {
                $newImageData = array();
                if ( $single_feature_data['data'][$key]['icon_properties']['icon-image'] ) {
                    $newImageData['id'] = $single_feature_data['data'][$key]['icon_properties']['icon-image']['id'];
                    $newImageData['url'] = $single_feature_data['data'][$key]['icon_properties']['icon-image']['url'];
                    $newImageData['height'] = $single_feature_data['data'][$key]['icon_properties']['icon-image']['height'];
                    $newImageData['width'] = $single_feature_data['data'][$key]['icon_properties']['icon-image']['width'];
                    $single_feature_data['data'][$key]['icon_properties']['icon-image'] = $newImageData;
                }
            }
        }
    }
    return $single_feature_data;
}

// Turning coordinates into encoded
function mapster_encode_coordinates(  $coordinates  ) {
    // $poly_encoder = new Polyline();
    // $coordinates_to_return = array();
    // if(is_numeric($coordinates[0])) { // It's a point, don't encode
    //   $coordinates_to_return = $coordinates;
    // } else if(is_array($coordinates[0])) { // Line, MultiLine, Poly, MultiPoly
    //   if(is_numeric($coordinates[0][0])) { // Line
    //     $coordinates_to_return = $poly_encoder->encode($coordinates);
    //   }
    //   if(is_array($coordinates[0][0])) { // Multiline, Poly, MultiPoly
    //     if(is_numeric($coordinates[0][0][0])) { // Multiline, Poly
    //       foreach($coordinates as $pointSet) {
    //         array_push($coordinates_to_return, $poly_encoder->encode($pointSet));
    //       }
    //     }
    //     if(is_array($coordinates[0][0][0])) { // MultiPoly
    //       foreach($coordinates as $polyOrHoleCollection) {
    //         $polyOrHoleHolder = array();
    //         foreach($polyOrHoleCollection as $polyOrHole) {
    //           array_push($polyOrHoleHolder, $poly_encoder->encode($polyOrHole));
    //         }
    //         array_push($coordinates_to_return, $polyOrHoleHolder);
    //       }
    //     }
    //   }
    // }
    // return $coordinates_to_return;
    return $coordinates;
}

// Organizing template fields
function mapster_arrange_fields(  $field_group, $isFeature  ) {
    $toReturn = array();
    if ( $isFeature ) {
        $toReturn['permalink'] = false;
        $toReturn['title'] = false;
        $toReturn['content'] = false;
        $toReturn['categories'] = false;
        $toReturn['slug'] = false;
        $toReturn['id'] = false;
        $toReturn['menu_order'] = false;
        $toReturn['data'] = array();
        if ( mapster_can_be_looped( $field_group ) ) {
            foreach ( $field_group as $field ) {
                if ( $field['name'] !== "" ) {
                    $toReturn['data'][$field['name']] = mapster_arrange_sub_fields( $field );
                }
            }
        }
        // Get popup stuff too
        $popup_fields = acf_get_fields( 'group_6163d357655f4' );
        if ( mapster_can_be_looped( $popup_fields ) ) {
            foreach ( $popup_fields as $field ) {
                $toReturn['data'][$field['name']] = mapster_arrange_sub_fields( $field );
            }
        }
        $toReturn['data']['popup']['permalink'] = false;
    } else {
        foreach ( $field_group as $field ) {
            if ( $field['name'] !== "" ) {
                $toReturn[$field['name']] = mapster_arrange_sub_fields( $field );
            }
        }
    }
    return $toReturn;
}

function mapster_arrange_sub_fields(  $field  ) {
    $toReturn = array();
    if ( isset( $field['sub_fields'] ) ) {
        if ( mapster_can_be_looped( $field['sub_fields'] ) ) {
            foreach ( $field['sub_fields'] as $sub_field ) {
                $value = mapster_arrange_sub_fields( $sub_field );
                $toReturn[$sub_field['name']] = $value;
            }
        }
        return $toReturn;
    } else {
        // Handler for true/false
        if ( $field['type'] == 'true_false' ) {
            return ( $field['default_value'] == 0 ? false : true );
        } else {
            if ( !isset( $field['default_value'] ) ) {
                return null;
            } else {
                return $field['default_value'];
            }
        }
    }
}

function mapster_can_be_looped(  $variable  ) {
    if ( is_array( $variable ) || is_object( $variable ) ) {
        return true;
    } else {
        return false;
    }
}

function mapster_update_wpml_post(  $duplicated_post_id, $new_post_id, $post_type  ) {
    if ( is_plugin_active( 'sitepress-multilingual-cms/sitepress.php' ) ) {
        $post_language_code = false;
        if ( $duplicated_post_id ) {
            $get_language_args = array(
                'element_id'   => $duplicated_post_id,
                'element_type' => "post_" . $post_type,
            );
            $original_post_language_info = apply_filters( 'wpml_element_language_details', null, $get_language_args );
            $post_language_code = $original_post_language_info->language_code;
        } else {
            $post_language_code = apply_filters( 'wpml_current_language', NULL );
        }
        $set_language_args = array(
            'element_id'    => $new_post_id,
            'element_type'  => "post_" . $post_type,
            'trid'          => false,
            'language_code' => $post_language_code,
        );
        do_action( 'wpml_set_element_language_details', $set_language_args );
    }
}

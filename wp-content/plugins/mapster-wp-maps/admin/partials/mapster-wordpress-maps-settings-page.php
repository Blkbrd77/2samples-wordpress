<?php

include dirname( __DIR__ ) . '/includes/mapster-wordpress-maps-settings.php';
$MWM_Admin_Settings = new Mapster_Wordpress_Maps_Admin_Settings();
$settings_page_id = get_option( 'mapster_settings_page' );
add_thickbox();
$i18n = new Mapster_Wordpress_Maps_i18n();
$translation_strings = $i18n->get_mapster_strings()['settings'];
$local_time = current_datetime();
?>
	<div class="wrap">
		<h1>
			<?php 
echo $translation_strings['Settings Header'];
?>
			<?php 
$MWM_Admin_Settings->mapster_account_buttons();
?>
		</h1>
		<p><?php 
echo $translation_strings['Settings Description'];
?></p>
		<hr />
		<div style="display: flex;">
			<div style="width: 50%;">
				<?php 
acf_form( array(
    "post_id"         => $settings_page_id,
    'submit_value'    => $translation_strings['Settings Save Button'],
    'updated_message' => $translation_strings['Settings Save Message'],
) );
?>
			</div>
			<div style="width: 50%; padding-left: 20px;">
				<?php 
$MWM_Admin_Settings->mapster_output_importer_button();
?>
				<div id="mapster-importer-modal" style="display: none;">
					<?php 
$MWM_Admin_Settings->mapster_output_importer_info();
?>
					<?php 
$MWM_Admin_Settings->mapster_output_importer_tabs();
?>
					<?php 
$MWM_Admin_Settings->mapster_output_geo_file_importer_parent();
?>
					<?php 
$MWM_Admin_Settings->mapster_output_gl_js_importer_parent();
?>
					<?php 
$MWM_Admin_Settings->mapster_output_spreadsheet_parent();
?>
					<?php 
$MWM_Admin_Settings->mapster_output_migration_parent();
?>
				</div>
				<?php 
?>
			</div>
		</div>

	</div>

	<script>
		(function( $ ) {

			const Importer = new MWM_Settings_Importer();
			Importer.init();

		})(jQuery)
	</script>

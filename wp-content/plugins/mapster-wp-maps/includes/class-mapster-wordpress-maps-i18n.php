<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://mapster.me
 * @since      1.0.0
 *
 * @package    Mapster_Wordpress_Maps
 * @subpackage Mapster_Wordpress_Maps/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Mapster_Wordpress_Maps
 * @subpackage Mapster_Wordpress_Maps/includes
 * @author     Mapster Technology Inc <hello@mapster.me>
 */
class Mapster_Wordpress_Maps_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'mapster-wordpress-maps',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}

	public function get_mapster_strings() {
		return array(
			"admin_js" => array(
				"Mapbox Token Warning" => __("You must enter an access token to use Mapbox.", "mapster-wordpress-maps"),
				"Sunday" => __("Sunday", "mapster-wordpress-maps"),
				"Monday" => __("Monday", "mapster-wordpress-maps"),
				"Tuesday" => __("Tuesday", "mapster-wordpress-maps"),
				"Wednesday" => __("Wednesday", "mapster-wordpress-maps"),
				"Thursday" => __("Thursday", "mapster-wordpress-maps"),
				"Friday" => __("Friday", "mapster-wordpress-maps"),
				"Saturday" => __("Saturday", "mapster-wordpress-maps"),
				"Today" => __("Today", "mapster-wordpress-maps"),
				"Tomorrow" => __("Tomorrow", "mapster-wordpress-maps"),
				"Closed" => __("Closed", "mapster-wordpress-maps"),
				"Open Until" => __("Open until", "mapster-wordpress-maps"),
				"Miles" => __("miles", "mapster-wordpress-maps"),
				"Kilometers" => __("km", "mapster-wordpress-maps"),
				"Back" => __("Back to results", "mapster-wordpress-maps"),
				"Directions" => __("Get Directions", "mapster-wordpress-maps"),
				"Hours" => __("Hours of Operation", "mapster-wordpress-maps")
			),
			"settings_js" => array(
				"Upgrade Message 1" => __(' You may have too large a geoJSON for this importer. Check out <a href="https://wpmaps.mapster.me/pro" target="_blank">Mapster Pro</a>.', "mapster-wordpress-maps"),
				"Error" => __('There was an error.', "mapster-wordpress-maps"),
				"Please Upload" => __("Please upload a file.", "mapster-wordpress-maps"),
				"Example Feature" => __('Example Feature', "mapster-wordpress-maps"),
				"Looks Good" => __('Everything looks good!', "mapster-wordpress-maps"),
				"Missing Properties" => __('Features are missing properties.', "mapster-wordpress-maps"),
				"Inconsistent Data" => __('Properties have inconsistent data types.', "mapster-wordpress-maps"),
				"Seem Wrong" => __('Does this number seem wrong?', "mapster-wordpress-maps"),

				"Import Details" => __("Your import will include conditional styling with conditions: ", "mapster-wordpress-maps"),
				"Upgrade Message 2" => __(' Get in touch with us for support.', "mapster-wordpress-maps"),
				"Rules Description" => __('Select which features this condition should apply to. You can have it apply to all features of this type (Point, Line, or Polygon) or select specific subgroups of features based on the feature properties. Separate conditions that are true for a feature will result in that feature being duplicated.', "mapster-wordpress-maps"),
				"Template Description" => __('Enter in a post ID from a feature that can serve as a base default for this import condition. You can find the IDs on the lists of features on the Location, Line, and Polygon pages.', "mapster-wordpress-maps"),
				"Properties Description" => __('Property input. Use this to override any other template or default presets to any values for this feature type. Direct input will override property values. Be careful to use the correct type of data for each value.', "mapster-wordpress-maps"),
				"Popup Description" => __('Popup property input. Use this to override any other template or default presets to any values for this feature type. Direct input will override property values. Be careful to use the correct type of data for each value.', "mapster-wordpress-maps"),
				"All" => __('All', "mapster-wordpress-maps"),
				"None" => __('None', "mapster-wordpress-maps"),
				"Table Field" => __('Field', "mapster-wordpress-maps"),
				"Table Value" => __('Value From Property', "mapster-wordpress-maps"),
				"Table Input" => __('Direct Input', "mapster-wordpress-maps"),
				"Enter ID" => __('Enter ID number here', "mapster-wordpress-maps"),
				"Table Input" => __('Direct Input', "mapster-wordpress-maps"),
				"Default" => __('Default:', "mapster-wordpress-maps"),
				"Condition" => __('Condition', "mapster-wordpress-maps"),
				"Button Rules" => __('Rules', "mapster-wordpress-maps"),
				"Button Template" => __('Template', "mapster-wordpress-maps"),
				"Button Properties" => __('Properties', "mapster-wordpress-maps"),
				"Button Popup" => __('Popup', "mapster-wordpress-maps")
			),

			"settings" => array(

				"Settings Header" => __("Mapster Maps Settings", "mapster-wordpress-maps"),
				"Settings Description" => __('See <a href="https://wpmaps.mapster.me/documentation" target="_blank">our website</a> for documentation and tutorials, and get in touch with us anytime.', "mapster-wordpress-maps"),
				"Settings Save Button" => __("Save Settings", "mapster-wordpress-maps"),
				"Settings Save Message" => __("Settings saved!", "mapster-wordpress-maps"),

				"Account Button" => __("Account Management", "mapster-wordpress-maps"),
				"Upgrade Button" => __("Upgrade to Pro", "mapster-wordpress-maps"),

				"Tileset Management Header" => __("Tileset Management", "mapster-wordpress-maps"),
				"Tileset Management Description" => __("Handle uploading and tiling data in Mapbox, using the latest Mapbox Tiling Service functions. Pick a category to tile, then select an existing tileset or create a new one. This uses a default tile recipe but get in touch with us if you need the ability to add a custom recipe instead. See the <a href='https://wpmaps-docs.mapster.me/' target='_blank'>docs</a> for detailed instructions.", "mapster-wordpress-maps"),
				"Tileset Management Button" => __("Update Tileset Source", "mapster-wordpress-maps"),
				"Tileset Management Category" => __("Category", "mapster-wordpress-maps"),
				"Tileset Management Details" => __("Details", "mapster-wordpress-maps"),
				"Tileset Management Tileset Source" => __("Tileset Source", "mapster-wordpress-maps"),
				"Tileset Management New Tileset Source" => __("New Tileset Source", "mapster-wordpress-maps"),
				"Tileset Management Existing Tileset Source" => __("Existing Tileset Source", "mapster-wordpress-maps"),
				"Tileset Management Special Characters" => __("The only allowed special characters are - and _.", "mapster-wordpress-maps"),
				"Tileset Management Tileset Source Name" => __("Tileset Source Name", "mapster-wordpress-maps"),
				"Tileset Management API Responses" => __("API Responses", "mapster-wordpress-maps"),

				"Import Data Header" => __("Import Data", "mapster-wordpress-maps"),
				"Import Data Description" => __("Press the button below to start uploading from an external geographic file.", "mapster-wordpress-maps"),
				"Import Data Button" => __("Data Importer", "mapster-wordpress-maps"),

				"Import Data Modal Description" => __('From here, you can import multiple ways and, if you have <a href="https://wpmaps.mapster.me/pro">Mapster Pro</a> installed, assign styling to your imported features based on their properties.', "mapster-wordpress-maps"),
				"Import Data Modal Category Description" => __('You can assign these features to a specific category (this makes it faster to import them to a map later). If you need to add a category, click Categories on the left menu.', "mapster-wordpress-maps"),
				"Import Data Modal Category None" => __('none', "mapster-wordpress-maps"),
				"Import Data Modal Imported" => __('features imported!', "mapster-wordpress-maps"),
				"Import Data Modal Button" => __('Import', "mapster-wordpress-maps"),

				"Import Data Modal Geo File Button" => __('Geo File Import', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Description" => __('Import a geoJSON, KML, GPX, or shapefile (.zip format) here. The importer will walk you through. <strong>Please note you must install the Pro plugin to reliably import more than 100 features at a time</strong>.', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Type" => __('File Type: ', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Reprojection Description" => __('<strong>It looks like your features are not using the Mercator EPSG:4326 projection.</strong> Please read the documentation at <a href="https://wpmaps.mapster.me/documentation/settings#import-geo-file">Mapster docs</a> to see how to use this reprojection tool.', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Reprojection Placeholder" => __('Proj.4 string', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Reprojection Button" => __('Try reprojecting', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Table Type" => __('Type', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Table Features" => __('Features', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Table Example" => __('Example', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Table Warnings" => __('Warnings', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Import Options" => __('Import Options', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Import Category Header" => __('Category', "mapster-wordpress-maps"),
				"Import Data Modal Geo File Import Category Description" => __('To assign imports to a category or style conditionally, please see <a href="https://wpmaps.mapster.me/pro" target="_blank">Mapster WP Maps Pro</a>.', "mapster-wordpress-maps"),

				"Migration Button" => __('Migration', "mapster-wordpress-maps"),
				"Migration Description" => __('Your best bet for migrating your Mapster WP Maps to another Wordpress installation is to follow <a href="https://wpmaps-docs.mapster.me/fundamentals/global-settings/migration" target="_blank">our guide here</a>. If you want to export and import this settings page and your preset options, you can use the exporter below as well. This settings exporter is only available in <a href="https://wpmaps.mapster.me/pro" target="_blank">Mapster WP Maps Pro</a>.', "mapster-wordpress-maps"),
				"Migration Button Export" => __('Export Mapster WP Maps Settings', "mapster-wordpress-maps"),
				"Migration Button Import" => __('Import Mapster WP Maps Settings', "mapster-wordpress-maps"),

				"Spreadsheet Button" => __('From Spreadsheet', "mapster-wordpress-maps"),
				"Spreadsheet Description" => __('Here you can import points from a Google Sheet or other online CSV format.<br /><br />See <a href="https://docs.google.com/spreadsheets/d/1RQ4PzT4g5bjmY0dwiOfJ3YUgThnM4ZJuVSU-6rWQM1Y/edit?usp=sharing" target="_blank">here</a> for an example of how the spreadsheet or CSV should be formatted. <strong>This feature is only available in Mapster Pro.</strong>', "mapster-wordpress-maps"),
				"Spreadsheet Google Sheet Instructions" => __('To get the URL from your Google Sheet, you must go to File > Share > Publish to Web. Select "Comma-separate values (CSV)" from the dropdown under "Link" (by default, this says "Web Page"). Press Publish and you will recieve a URL.<br /><br />To import a title from your spreadsheet, make sure you name that column <b>post_title</b>.', "mapster-wordpress-maps"),
				"Spreadsheet CSV" => __('Enter CSV URL', "mapster-wordpress-maps"),
				"Spreadsheet Verify" => __('Verify Spreadsheet', "mapster-wordpress-maps"),
				"Spreadsheet Import" => __('Import Spreadsheet', "mapster-wordpress-maps"),
				"Spreadsheet Import Options" => __('Spreadsheet Import Options', "mapster-wordpress-maps"),
				"Spreadsheet Import Exclude" => __("If you want to exclude any columns from being imported as custom data, enter those columns here as comma-separated values. Otherwise, all data will be included as custom fields.", "mapster-wordpress-maps"),
				"Spreadsheet Recurring Update" => __("To have this spreadsheet update associated points on a regular basis, you can enter the number of minutes you'd like to pass between each time the spreadsheet URL is fetched. Please check the Mapster documentation for more information on this: you need to have a unique_id column in your data, and you should be aware of the limitations of WP Cron systems as well.", "mapster-wordpress-maps"),

				"Import Data Modal GL JS Button" => __('WP GL JS Maps Import', "mapster-wordpress-maps"),
				"Import Data Modal GL JS Description" => __('This makes it easy (hopefully) to switch from our old Mapbox plugin to this new one. Export from your old map and import here. All your features will be added with their old styling included, then you will just need to go and create a new Map, and add your old features to it again. <a href="https://wpmaps.mapster.me/documentation" target="_blank">See our documentation for step-by-step instructions</a>.', "mapster-wordpress-maps"),

				"Import Data Modal Conditional Header" => __('Conditional Styling & Popups', "mapster-wordpress-maps"),
				"Import Data Modal Conditional Points" => __('Points', "mapster-wordpress-maps"),
				"Import Data Modal Conditional Lines" => __('Lines', "mapster-wordpress-maps"),
				"Import Data Modal Conditional Polygons" => __('Polygons', "mapster-wordpress-maps"),
				"Import Data Modal Conditional JSON" => __('JSON', "mapster-wordpress-maps"),
				"Import Data Modal Conditional Add" => __('Add Condition', "mapster-wordpress-maps"),
				"Import Data Modal Conditional JSON Description" => __("Here you can manually edit, download, or paste an import JSON you've used before.", "mapster-wordpress-maps"),
				"Import Data Modal Conditional JSON Placeholder" => __("JSON here", "mapster-wordpress-maps"),
				"Import Data Modal Conditional JSON Load" => __("Load this JSON", "mapster-wordpress-maps"),
				"Import Data Modal Conditional JSON Download" => __("Download", "mapster-wordpress-maps"),

			),
			"admin" => array(
				"Shortcode" => __("Shortcode", 'mapster-wordpress-maps'),
				"Listing Shortcode" => __("Listing Shortcode", 'mapster-wordpress-maps'),
				"Map Shortcode" => __("Map Shortcode", 'mapster-wordpress-maps'),
				"Date" => __("Date", 'mapster-wordpress-maps'),
				"Duplicate" => __("Duplicate", 'mapster-wordpress-maps'),

				"Map Preview" => __("Map Preview", 'mapster-wordpress-maps'),

				"Edit" => __("Edit", 'mapster-wordpress-maps'),
				"Add New" => __("Add New", 'mapster-wordpress-maps'),
				"View" => __("View", 'mapster-wordpress-maps'),

				"Mass Edit" => __("Mass Edit", 'mapster-wordpress-maps'),
				"Categories" => __("Categories", 'mapster-wordpress-maps'),
				"Settings" => __("Settings", 'mapster-wordpress-maps'),
				"Download Pro" => __("Download Pro", 'mapster-wordpress-maps'),
				"Map Categories" => __("Map Categories", 'mapster-wordpress-maps'),

				"Maps" => __("Maps", 'mapster-wordpress-maps'),
				"Map" => __("Map", 'mapster-wordpress-maps'),
				"Add New Map" => __("Add New Map", 'mapster-wordpress-maps'),
				"Edit Map" => __("Edit Map", 'mapster-wordpress-maps'),
				"New Map" => __("New Map", 'mapster-wordpress-maps'),
				"View Map" => __("View Map", 'mapster-wordpress-maps'),
				"Search Map" => __("Search Map", 'mapster-wordpress-maps'),
				"No Map found" => __("No Map found", 'mapster-wordpress-maps'),
				"No Map found in Trash" => __("No Map found in Trash", 'mapster-wordpress-maps'),
				"Parent Map" => __("Parent Map", 'mapster-wordpress-maps'),

				"Locations" => __("Locations", 'mapster-wordpress-maps'),
				"Location" => __("Location", 'mapster-wordpress-maps'),
				"Add New Location" => __("Add New Location", 'mapster-wordpress-maps'),
				"Edit Location" => __("Edit Location", 'mapster-wordpress-maps'),
				"New Location" => __("New Location", 'mapster-wordpress-maps'),
				"View Location" => __("View Location", 'mapster-wordpress-maps'),
				"Search Location" => __("Search Location", 'mapster-wordpress-maps'),
				"No Location found" => __("No Location found", 'mapster-wordpress-maps'),
				"No Location found in Trash" => __("No Location found in Trash", 'mapster-wordpress-maps'),
				"Parent Location" => __("Parent Location", 'mapster-wordpress-maps'),

				"Lines" => __("Lines", 'mapster-wordpress-maps'),
				"Line" => __("Line", 'mapster-wordpress-maps'),
				"Add New Line" => __("Add New Line", 'mapster-wordpress-maps'),
				"Edit Line" => __("Edit Line", 'mapster-wordpress-maps'),
				"New Line" => __("New Line", 'mapster-wordpress-maps'),
				"View Line" => __("View Line", 'mapster-wordpress-maps'),
				"Search Line" => __("Search Line", 'mapster-wordpress-maps'),
				"No Line found" => __("No Line found", 'mapster-wordpress-maps'),
				"No Line found in Trash" => __("No Line found in Trash", 'mapster-wordpress-maps'),
				"Parent Line" => __("Parent Line", 'mapster-wordpress-maps'),

				"Polygons" => __("Polygons", 'mapster-wordpress-maps'),
				"Polygon" => __("Polygon", 'mapster-wordpress-maps'),
				"Add New Polygon" => __("Add New Polygon", 'mapster-wordpress-maps'),
				"Edit Polygon" => __("Edit Polygon", 'mapster-wordpress-maps'),
				"New Polygon" => __("New Polygon", 'mapster-wordpress-maps'),
				"View Polygon" => __("View Polygon", 'mapster-wordpress-maps'),
				"Search Polygon" => __("Search Polygon", 'mapster-wordpress-maps'),
				"No Polygon found" => __("No Polygon found", 'mapster-wordpress-maps'),
				"No Polygon found in Trash" => __("No Polygon found in Trash", 'mapster-wordpress-maps'),
				"Parent Polygon" => __("Parent Polygon", 'mapster-wordpress-maps'),

				"Popup Templates" => __("Popup Templates", 'mapster-wordpress-maps'),
				"Popup Template" => __("Popup Template", 'mapster-wordpress-maps'),
				"Add New Popup Template" => __("Add New Popup Template", 'mapster-wordpress-maps'),
				"Edit Popup Template" => __("Edit Popup Template", 'mapster-wordpress-maps'),
				"New Popup Template" => __("New Popup Template", 'mapster-wordpress-maps'),
				"View Popup Template" => __("View Popup Template", 'mapster-wordpress-maps'),
				"Search Popup Template" => __("Search Popup Template", 'mapster-wordpress-maps'),
				"No Popup Template found" => __("No Popup Template found", 'mapster-wordpress-maps'),
				"No Popup Template found in Trash" => __("No Popup Template found in Trash", 'mapster-wordpress-maps'),
				"Parent Popup Template" => __("Parent Popup Template", 'mapster-wordpress-maps'),

				"Mapster Settings" => __("Mapster Settings", 'mapster-wordpress-maps'),
				"Add New Mapster Settings" => __("Add New Mapster Settings", 'mapster-wordpress-maps'),
				"Edit Mapster Settings" => __("Edit Mapster Settings", 'mapster-wordpress-maps'),
				"New Mapster Settings" => __("New Mapster Settings", 'mapster-wordpress-maps'),
				"View Mapster Settings" => __("View Mapster Settings", 'mapster-wordpress-maps'),
				"Search Mapster Settings" => __("Search Mapster Settings", 'mapster-wordpress-maps'),
				"No Mapster Settings found" => __("No Mapster Settings found", 'mapster-wordpress-maps'),
				"No Mapster Settings found in Trash" => __("No Mapster Settings found in Trash", 'mapster-wordpress-maps'),
				"Parent Mapster Settings" => __("Parent Mapster Settings", 'mapster-wordpress-maps'),

				"User Submissions" => __("User Submissions", 'mapster-wordpress-maps'),
				"User Submission" => __("User Submission", 'mapster-wordpress-maps'),
				"Add New User Submission" => __("Add New User Submission", 'mapster-wordpress-maps'),
				"Edit User Submission" => __("Edit User Submission", 'mapster-wordpress-maps'),
				"New User Submission" => __("New User Submission", 'mapster-wordpress-maps'),
				"View User Submission" => __("View User Submission", 'mapster-wordpress-maps'),
				"Search User Submission" => __("Search User Submission", 'mapster-wordpress-maps'),
				"No User Submission found" => __("No User Submission found", 'mapster-wordpress-maps'),
				"No User Submission found in Trash" => __("No User Submission found in Trash", 'mapster-wordpress-maps'),
				"Parent User Submission" => __("Parent User Submission", 'mapster-wordpress-maps'),

				"Listing Pages" => __("Listing Pages", 'mapster-wordpress-maps'),
				"Listing Page" => __("Listing Page", 'mapster-wordpress-maps'),
				"Add New Listing Page" => __("Add New Listing Page", 'mapster-wordpress-maps'),
				"Edit Listing Page" => __("Edit Listing Page", 'mapster-wordpress-maps'),
				"New Listing Page" => __("New Listing Page", 'mapster-wordpress-maps'),
				"View Listing Page" => __("View Listing Page", 'mapster-wordpress-maps'),
				"Search Listing Page" => __("Search Listing Page", 'mapster-wordpress-maps'),
				"No Listing Page found" => __("No Listing Page found", 'mapster-wordpress-maps'),
				"No Listing Page found in Trash" => __("No Listing Page found in Trash", 'mapster-wordpress-maps'),
				"Parent Listing Page" => __("Parent Listing Page", 'mapster-wordpress-maps'),

				"Top Menu Header" => __("Mapster Wordpress Maps", 'mapster-wordpress-maps'),
			),
			"mass_edit_js" => array(
				"Confirmation" => __("Are you sure you want to mass edit these features? This cannot be easily reversed!", "mapster-wordpress-maps"),
				"Edit This Data" => __("Edit This Data", "mapster-wordpress-maps"),
			),
			"mass_edit" => array(
				"Mass Edit Header" => __("Mapster Maps Mass Edit", "mapster-wordpress-maps"),
				"Mass Edit Select" => __("Select Feature Posts", "mapster-wordpress-maps"),
				"Mass Edit Search" => __("Select by category:", "mapster-wordpress-maps"),
				"Mass Edit Features" => __("and/or select individual features:", "mapster-wordpress-maps"),
				"Mass Edit Edit" => __("Editor", "mapster-wordpress-maps"),
				"Mass Edit Points" => __("Points", "mapster-wordpress-maps"),
				"Mass Edit Lines" => __("Lines", "mapster-wordpress-maps"),
				"Mass Edit Polygons" => __("Polygons", "mapster-wordpress-maps"),
				"Mass Edit Popups" => __("Popups", "mapster-wordpress-maps"),
				"Mass Edit Button" => __("Mass Edit", "mapster-wordpress-maps"),
				"Mass Edit Edited" => __("features edited!", "mapster-wordpress-maps"),
			),
			"user_submission" => array(
				"CSV Export Button" => __("CSV Export", "mapster-wordpress-maps"),
				"CSV Export Description" => __("Select the fields you would like to be included in your CSV export. If you press 'Save Export Options' below, your preferences will be saved for future use as well.", "mapster-wordpress-maps"),
				"CSV Export Select All" => __("Select All", "mapster-wordpress-maps"),
				"CSV Export Select None" => __("Select None", "mapster-wordpress-maps"),
				"CSV Export Save Options" => __("Save Export Options", "mapster-wordpress-maps"),
				"CSV Export Download" => __("Download CSV", "mapster-wordpress-maps"),
			)
		);
	}

}

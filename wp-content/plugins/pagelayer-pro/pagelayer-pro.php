<?php
/*
Plugin Name: Pagelayer Pro
Plugin URI: https://pagelayer.com/
Description: Pagelayer is a WordPress page builder plugin. Its very easy to use and very light on the browser.
Version: 1.8.2
Author: Pagelayer Team
Author URI: https://pagelayer.com/
Text Domain: pagelayer
*/

// We need the ABSPATH
if (!defined('ABSPATH')) exit;

if(!function_exists('add_action')){
	echo 'You are not allowed to access this page directly.';
	exit;
}

// If PAGELAYER_VERSION exists then the plugin is loaded already !
if(defined('PAGELAYER_VERSION')) {
	return;
}

define('PAGELAYER_PREMIUM', plugin_basename(__FILE__));
define('PAGELAYER_FILE', __FILE__);

include_once(dirname(__FILE__).'/init.php');

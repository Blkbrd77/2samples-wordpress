<?php
define( 'WP_CACHE', true );
/** Enable W3 Total Cache */
 // Added by W3 Total Cache

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'wpuser@localhost' );

/** Database password */
define( 'DB_PASSWORD', 'Syd@7781' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
//define( 'AUTH_KEY',         't5*#^v;|uzTP3BKU-R%uhh-1.U5NPU/hJy<hePg^lfSM++1 %-D*}d028y+5$}T7' );
//define( 'SECURE_AUTH_KEY',  'v4U6qcRdPmCoD oqV!5,+QSv9Tmc5Ad|zC|nJ%-pCb4ya4z-MI.j.i`j371_pE-(' );
//define( 'LOGGED_IN_KEY',    '&qk:y+o9W66+!3]3r.8a/E)I&}xti/A~<h^Ej9hZLYayoG^^l$D*:W]q4(Q5GwsB' );
//define( 'NONCE_KEY',        'x}JM}G@28%Ms6]/uzanhi^hy2lD-LG5|eh77/(wo&y8)uzp.d%sqKY)Zqy|bSk*P' );
//define( 'AUTH_SALT',        'BKwn|n_&i!cytkE%Ex)P[76@&9Su1G6_`hQqivX@J0(MCqxh)K. `T<CD4ea15OH' );
//define( 'SECURE_AUTH_SALT', 'V62,IiInf-7:LXmY4,@o@,O+jL_>`3%A#|PbzhsX/Y1+/4$5vdVK@q=*pEsXclo[' );
//define( 'LOGGED_IN_SALT',   'V^FjZ0[wSglXbM}]5`R(T[_f&E~tIk:^m-_Tt98oV`_rpo-WO;M1eEZTNtZ<ml^.' );
//define( 'NONCE_SALT',       '4{yxPhwEX>dGxo3am>[K|x|~YHd%6@)Z(%Yu1@Gdr~,b?!(FS3c0A|!2#vM,,nZ[' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpmp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

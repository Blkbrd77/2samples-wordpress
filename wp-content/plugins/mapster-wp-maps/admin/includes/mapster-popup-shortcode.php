<?php

$path = preg_replace( '/wp-content.*$/', '', __DIR__ );
include $path . 'wp-load.php';
$feature_id = $_GET["feature_id"];
$popup_id = $_GET["popup_id"];
?>
<head>
 <?php 
wp_head();
?>
 <base target="_parent">
</head>
<?php 
$body_background_color = get_field( 'body', $popup_id );
?>

 <style>

 body {
   background: <?php 
echo $body_background_color;
?> !important;
 }
 #mapster-popup-shortcode-footer div {
   display: none;
 }
 #mapster-popup-shortcode-footer p {
   display: none;
 }

 </style>

 <div id="mapster-popup-shortcode-content">
   <?php 
?>
 </div>

<div id="mapster-shortcode-footer">
<?php 
wp_footer();
?>
</div>

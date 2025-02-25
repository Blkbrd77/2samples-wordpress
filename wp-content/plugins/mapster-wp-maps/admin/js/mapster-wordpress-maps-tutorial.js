(function( $ ) {
	'use strict';

  const pointerTutorial = [{
    element : '.wp-submenu li a[href="edit.php?post_type=mapster-wp-map"]',
    header : "Create a Map",
    text : "Go to maps to create an empty map. You can set styles, zooms, controls, filters, and more here. You can publish them with shortcodes or on their own posts."
  },{
    element : '.wp-submenu li a[href="edit.php?post_type=mapster-wp-location"]',
    header : "Adding Locations",
    text : "In locations, you can create single points -- markers, icons & labels, or circles. Style them in many ways!"
  },{
    element : '.wp-submenu li a[href="edit.php?post_type=mapster-wp-line"]',
    header : "Adding Lines",
    text : "You can add lines and adjust thickness, color and more."
  },{
    element : '.wp-submenu li a[href="edit.php?post_type=mapster-wp-polygon"]',
    header : "Adding Polygons",
    text : "You can add polygons and adjust color, opacity and more. 3D polygons are also available!"
  },{
    element : '.wp-submenu li a[href="edit.php?post_type=mapster-wp-popup"]',
    header : "Creating Popup Templates",
    text : "Make popups look like anything you want by creating empty popup templates here, then attaching them to Locations, Lines, or Polygons."
  },{
    element : '.wp-submenu li a[href="edit.php?post_type=mapster-wp-map"]',
    header : "Populating Maps",
    text : "After you add locations, lines, or polygons, go to a map and to the Features tab to add them to your map."
  },{
    element : '.wp-submenu li a[href="edit.php?post_type=mapster-wp-map&page=wordpress-maps-settings"]',
    header : "Settings and Documentation",
    text : "There are more settings available in Settings, and <a href='https://wpmaps-docs.mapster.me/' target='_blank'>links to the Mapster documentation</a> there. Enjoy the plugin!"
  }]

  $( document ).ready(function() {

    let currentPointer = 0;
    let runningTutorial = true;
    if(window.mapster_tutorial.tutorial !== "1") {
      openPointer(currentPointer)
    }

    function openPointer(index) {
      if(pointerTutorial[currentPointer]) {
        const pointer = $(pointerTutorial[currentPointer].element).pointer({
          content: `<h3>${pointerTutorial[currentPointer].header}</h3><p>${pointerTutorial[currentPointer].text}</p>`,
          position: 'top',
          buttons : function(event, t) {
            const buttons = $('<div></div>');
            var buttonEnd = $('<a class="button button-secondary button-small" style="margin-right: 10px; margin-top: 2px;" href="#"></a>').text('End Tutorial');
            buttonEnd.on( 'click.pointer', function(e) {
    					e.preventDefault();
              runningTutorial = false;
              onEnd();
    					t.element.pointer('close');
    				})
            if(pointerTutorial[currentPointer+1]) {
              var buttonClose = $('<a class="button button-primary" href="#"></a>').text('Next');
              buttonClose.on( 'click.pointer', function(e) {
      					e.preventDefault();
      					t.element.pointer('close');
      				})
              buttons.append(buttonClose)
            }
            buttons.append(buttonEnd)
    				return buttons;
          },
          close: function() {
            currentPointer += 1;
            if(runningTutorial) {
              openPointer(currentPointer);
            }
          }
        }).pointer('open');
      }
    }

  });

  $(document).on('click', '#mapster-view-quick-tutorial', function() {
    fetch(window.mapster_tutorial.rest_url + `mapster-wp-maps/set-tutorial-option${window.mapster_tutorial.qd}value=0`, {
      headers : {
        'X-WP-Nonce' : window.mapster_tutorial.nonce,
        'Content-Type' : 'application/json'
      },
      method : "GET"
    }).then(resp => resp.json()).then(response => {
      window.location.reload();
    })
	})

  function onEnd() {
    fetch(window.mapster_tutorial.rest_url + `mapster-wp-maps/set-tutorial-option${window.mapster_tutorial.qd}value=1`, {
      headers : {
        'X-WP-Nonce' : window.mapster_tutorial.nonce,
        'Content-Type' : 'application/json'
      },
      method : "GET"
    }).then(resp => resp.json()).then(response => {
      window.location.reload();
    })
  }


})( jQuery );

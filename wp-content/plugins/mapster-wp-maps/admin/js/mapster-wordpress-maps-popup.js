(function( $ ) {
	'use strict';

  var popup;
  var map;

	function initializeMap() {

		map = new maplibregl.Map({
			container: 'map',
			style: {
				'version': 8,
				"glyphs": "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
				'sources': {
					'raster-tiles': {
					'type': 'raster',
					'tiles': [
							'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
						],
						'tileSize': 256,
						'attribution': '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					}
				},
				'layers': [
					{
					'id': 'simple-tiles',
					'type': 'raster',
					'source': 'raster-tiles',
					'minzoom': 0,
					'maxzoom': 22
					}
				]
			},
			center: [0, 0],
			zoom: 2
		});

    setPopup()
    setEventListeners()

		map.on('load', () => {
			map.resize();
		})
	}

  function setPopup() {
    if(popup) {
      popup.remove();
    }

    var css = getCSS();
    var html = getHTML();
    var layout = getLayout();

    var style = `
			.mapboxgl-popup .mapboxgl-popup-content, .maplibregl-popup .maplibregl-popup-content {
        padding: 0px;
        background: none;
        border: none;
        border-radius: none;
        box-shadow: none;
      }
      #mapster-popup.map-popup-background {
        background : ${css.background};
        text-align : ${css.align};
        border-radius: 3px;
        box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
      }
      #mapster-popup .map-popup-header {
        background : ${css.header};
        padding: 10px;
      }
      #mapster-popup .map-popup-header h2 {
        all : revert;
        color : ${css.header_text};
        font-weight: bold;
        margin: 0;
        padding: 0;
      }
      #mapster-popup .map-popup-image {
        background-image : url(https://via.placeholder.com/150x50);
        background-position : center center;
        background-size: cover;
        height : ${css.image_height}px;
        width: 100%;
      }
      #mapster-popup .map-popup-body {
        margin-top: -1px;
        background : ${css.body};
        padding: 10px;
        color : ${css.body_text};
      }
      #mapster-popup .map-popup-body p {
        padding: 0px;
        margin: 0px;
      }
      #mapster-popup .map-popup-footer {
        margin-top: -1px;
        background : ${css.footer};
        padding: 10px;
      }
      #mapster-popup .map-popup-footer .map-popup-footer-button {
        all : revert;
        background : ${css.button};
        border-color: ${css.button};
        color : ${css.button_text};
        padding: 5px;
        text-decoration: none;
        text-shadow: none;
      }
      #mapster-popup .map-popup-footer .map-popup-footer-button:hover {
        cursor: pointer;
        filter: brightness(1.15);
      }
			.mapboxgl-popup.mapboxgl-popup-anchor-top .mapboxgl-popup-tip, .maplibregl-popup.maplibregl-popup-anchor-top .maplibregl-popup-tip,
			.mapboxgl-popup.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip, .maplibregl-popup.maplibregl-popup-anchor-top-left .maplibregl-popup-tip,
			.mapboxgl-popup.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip, .maplibregl-popup.maplibregl-popup-anchor-top-right .maplibregl-popup-tip {
        border-bottom-color : ${css.pointer};
        display : ${layout.enable_pointer ? 'block' : 'none'};
      }
			.mapboxgl-popup.mapboxgl-popup-anchor-right .mapboxgl-popup-tip, .maplibregl-popup.maplibregl-popup-anchor-right .maplibregl-popup-tip {
				border-left-color : ${css.pointer};
        display : ${layout.enable_pointer ? 'block' : 'none'};
			}
			.mapboxgl-popup.mapboxgl-popup-anchor-left .mapboxgl-popup-tip, .maplibregl-popup.maplibregl-popup-anchor-left .maplibregl-popup-tip {
				border-right-color : ${css.pointer};
        display : ${layout.enable_pointer ? 'block' : 'none'};
			}
			.mapboxgl-popup.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip, .maplibregl-popup.maplibregl-popup-anchor-bottom .maplibregl-popup-tip,
			.mapboxgl-popup.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip, .maplibregl-popup.maplibregl-popup-anchor-bottom-left .maplibregl-popup-tip,
			.mapboxgl-popup.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip, .maplibregl-popup.maplibregl-popup-anchor-bottom-right .maplibregl-popup-tip {
        border-top-color : ${css.pointer};
        display : ${layout.enable_pointer ? 'block' : 'none'};
      }
    `;

    setCustomCSS(style);

    var defaultValues = getDefaultValues();
    var content = getContent();

    popup = new maplibregl.Popup({
      closeButton : defaultValues.close_button,
			maxWidth : defaultValues.max_width,
      closeOnClick : defaultValues.close_on_click,
      closeOnMove : defaultValues.close_on_map_move,
      focusAfterOpen : false
    })
      .setLngLat(map.getCenter())
      .setHTML(`
      	<style>${style}</style>
        ${layout.use_custom_css ? `<style>${css.css_editor}</style>` : ''}
        ${layout.use_custom_html ?
					replaceHTMLValues(html.html_editor, content) :
	        `<div id="mapster-popup" class="map-popup-background ${sanitize(layout.popup_class)}">
	          ${layout.enable_header ?
	            `<div class="map-popup-header">
	              <h2>${content.header_text_preview}</h2>
	            </div>`
	          : ''}
	          ${layout.enable_image ?
	            `<div class="map-popup-image"></div>`
	          : ''}
	          ${layout.enable_body ?
	            `<div class="map-popup-body">
	              <p>${content.content_preview}
	            </div>`
	          : ''}
	          ${layout.enable_footer ?
	            `<div class="map-popup-footer">
	              <button class="map-popup-footer-button">${content.button_text_preview}</button>
	            </div>`
	          : ''}
	        </div>`
				}
      `)
      .addTo(map);
  }

	function replaceHTMLValues(html, content) {
		let htmlToReturn;
		
		return htmlToReturn;
	}

  function getDefaultValues() {
    return {
      close_button : $('.acf-field[data-name="close_button"] :input').is(':checked'),
      close_on_click : $('.acf-field[data-name="close_on_click"] :input').is(':checked'),
      close_on_map_move : $('.acf-field[data-name="close_on_map_move"] :input').is(':checked'),
			max_width : $('.acf-field[data-name="max_width"] :input').val() + 'px'
    }
  }

  function getLayout() {
    return {
      enable_header : $('.acf-field[data-name="enable_header"] :input').is(':checked'),
      enable_image : $('.acf-field[data-name="enable_image"] :input').is(':checked'),
      enable_body : $('.acf-field[data-name="enable_body"] :input').is(':checked'),
      enable_footer : $('.acf-field[data-name="enable_footer"] :input').is(':checked'),
      enable_pointer : $('.acf-field[data-name="enable_pointer"] :input').is(':checked'),
			popup_class : $('.acf-field[data-name="popup_class"] :input').val(),
      use_custom_css : $('.acf-field[data-name="use_custom_css"] :input').is(':checked'),
      use_custom_html : $('.acf-field[data-name="use_custom_html"] :input').is(':checked'),
    }
  }

  function getHTML() {
		// {header} {image_url} {content} {button_link} {button_text}
    return {
			html_editor : $('.acf-field[data-name="html_editor"] :input').val()
		}
	}

  function getCSS() {
    return {
      background : $('.acf-field[data-name="background"] :input').val(),
      header : $('.acf-field[data-name="header"] :input').val(),
      image_height : $('.acf-field[data-name="image_height"] :input').val(),
      body : $('.acf-field[data-name="body"] :input').val(),
      footer : $('.acf-field[data-name="footer"] :input').val(),
      button : $('.acf-field[data-name="button"] :input').val(),
      pointer : $('.acf-field[data-name="pointer"] :input').val(),
      header_text : $('.acf-field[data-name="header_text"] :input').val(),
      body_text : $('.acf-field[data-name="body_text"] :input').val(),
      button_text : $('.acf-field[data-name="button_text"] :input').val(),
      align : $('.acf-field[data-name="align"] :input').val(),
      css_editor : $('.acf-field[data-name="css_editor"] :input').val(),
    }
  }

  function getContent() {
    return {
      header_text_preview : $('.acf-field[data-name="header_text_preview"] :input').val(),
      content_preview : $('.acf-field[data-name="content_preview"] :input').val(),
      button_text_preview : $('.acf-field[data-name="button_text_preview"] :input').val()
    }
  }

  function setCustomCSS(style) {
    if($('.acf-field[data-name="css_editor"] :input').val() === '') {
      $('.acf-field[data-name="css_editor"] :input').val(style);
    }
  }

  function setCustomHTML(html) {
    if($('.acf-field[data-name="css_editor"] :input').val() === '') {
      $('.acf-field[data-name="css_editor"] :input').val(style);
    }
  }

	function sanitize(string) {
	  const characterReplace = {
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;',
	      "'": '&#x27;',
	      "/": '&#x2F;',
	  };
	  const reg = /[&<>"'/]/ig;
	  return string.replace(reg, (match)=>(characterReplace[match]));
	}

  function setEventListeners() {
    var inputs = { ...getDefaultValues(), ...getCSS(), ...getLayout(), ...getContent(), ...getHTML() };
    for(var name in inputs) {
      $(document).on('change', `.acf-field[data-name="${name}"] :input`, function() {
        setPopup()
      });
    }
    $(document).on('click', '.acf-field-message .button', function() {
      setPopup();
    })
  }

  const acf = window.acf;

	if( typeof acf.add_action !== 'undefined' ) {

		acf.add_action('ready_field/name=background', initializeMap);
		acf.add_action('append_field/name=background', initializeMap);
		acf.add_action('show_field/name=background', initializeMap);

	} else {

		$(document).on('ready_field/name=background', function(e, postbox){
      initializeMap();
		});

	}

})( jQuery );

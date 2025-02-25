(function( $ ) {
	'use strict';

	// Setting from current map view
	$(document).on('click', '.mapster-set-manual-map-view', (e) => {
		e.preventDefault();
		let latitudeText = $('.acf-field[data-name="manual_latitude"]').find('label').find('i').text().replace('(currently: ', '').replace(')', '');
		let longitudeText = $('.acf-field[data-name="manual_longitude"]').find('label').find('i').text().replace('(currently: ', '').replace(')', '');
		let zoomText = $('.acf-field[data-name="manual_zoom"]').find('label').find('i').text().replace('(currently: ', '').replace(')', '');
		let pitchText = $('.acf-field[data-name="manual_pitch"]').find('label').find('i').text().replace('(currently: ', '').replace(')', '');
		let rotationText = $('.acf-field[data-name="manual_rotation"]').find('label').find('i').text().replace('(currently: ', '').replace(')', '');
		$('.acf-field[data-name="manual_latitude"] input').val(parseFloat(latitudeText).toFixed(8))
		$('.acf-field[data-name="manual_longitude"] input').val(parseFloat(longitudeText).toFixed(8))
		$('.acf-field[data-name="manual_zoom"] input').val(parseFloat(zoomText).toFixed(8))
		$('.acf-field[data-name="manual_pitch"] input').val(parseFloat(pitchText).toFixed(8))
		$('.acf-field[data-name="manual_rotation"] input').val(parseFloat(rotationText).toFixed(8))
	});

	// Managing duplicated fields (after moving around a field after creating it)
	window.addEventListener('load', function () {

		// Horizontal duplication
		if($('.acf-field[data-name="duplicate_horizontally"] input').length) {
			let originalKey = $('.acf-field[data-name="duplicate_horizontally"]').data('key');
			let newKey = $('.acf-field[data-name="duplicate_horizontally_copy"]').data('key');
			let originalField = acf.getField(originalKey);
			let newField = acf.getField(newKey);
			$('.acf-field[data-name="duplicate_horizontally_copy"] input[type="checkbox"]').prop('checked', originalField.val())
			$('.acf-field[data-name="duplicate_horizontally_copy"] input[type="checkbox"]').trigger('change')
			newField.on('change', () => {
				$('.acf-field[data-name="duplicate_horizontally"] input[type="checkbox"]').prop('checked', newField.val())
				$('.acf-field[data-name="duplicate_horizontally"] input[type="checkbox"]').trigger('change')
			})
		}
	});

	// Moving around ACF field instructions
	window.addEventListener('load', function () {
		let count = 0;
		$('#acf-group_61636c62b003e .acf-fields .acf-field:not(".acf-field-group"):not(".acf-field-accordion")').each(function() {
			$(this).find('.description').prev().append(`
				<svg id="tippy-${count}" width="25" height="25">
				  <circle cx="12.5" cy="12.5" r="10" fill="#eeeeee" />
				  <text x="50%" y="50%" text-anchor="middle" fill="#333" font-size="10px" font-family="Verdana" dy=".3em">?</text>
				?
				</svg>
			`);
			$(this).find('.description').hide();
			let descriptionHTML = $(this).find('.description').html();
			tippy(`#tippy-${count}`, {
        content: descriptionHTML,
				allowHTML: true,
				interactive: true,
				placement: 'right'
      });
			count = count + 1;
		})
		// Adding documentation link
		$('#acf-group_61636c62b003e .acf-tab-wrap.-left .acf-tab-group').append(`
			<li class="acf-tab-button"><a href="https://wpmaps-docs.mapster.me/" target="_blank">🔗 Documentation</a></li>
		`)
		$('#acf-group_61636c62b003e > .inside.acf-fields.-top').css('minHeight', $('#acf-group_61636c62b003e .acf-tab-wrap.-left .acf-tab-group').height() + 'px')
	})

	// Handling control menu selection
	window.addEventListener('load', function () {
		if($('#acf-group_61636c62b003e .mapster-controls-in-menu').length) {
			$('#acf-group_61636c62b003e .acf-field[data-name="included_controls"] .acf-input').hide();
		  
		}
	})

	// Handling control ordering
	window.addEventListener('load', function () {
		if($('#acf-group_61636c62b003e .mapster-reorder-controls').length) {
			$('#acf-group_61636c62b003e .acf-field[data-name="control_order"] .acf-input').hide();

		  
		}

		function checkControlOrderAndInsert() {
			let controlOrder = [];
			$('.mapster-draggable-controls-parent-container').each(function() {
				let thisControl = {
					slug : $(this).data('slug')
				}
				controlOrder.push(thisControl);
			})
			$('#acf-field_66cca5f0c567e').attr('value', JSON.stringify(controlOrder));
		}
	});

	// Handling category ordering
	window.addEventListener('load', function () {
		if($('#acf-group_61636c62b003e .mapster-reorder-categories').length) {
			$('#acf-group_61636c62b003e .acf-field[data-name="category_order"] .acf-input').hide();
		  
		}
	})

	// Adding style selector
	window.addEventListener('load', function () {
		if($('#mapster-style-selector').length) {
			let openStyles = [];
			$('.acf-field[data-name="map_tile_style_no_access_token"] select option').each(function() {
				openStyles.push({
					type : "no_access_token",
					value : $(this).attr('value'),
					name : $(this).text()
				})
			})
			let html = `
				<div class="mapster-accordion">
					<h2>Free Styles (no access token required)</h2>
					<div class="mapster-accordion-toggle">
						${openStyles.map(style => {
							return `<div class="mapster-style-thumb" data-slug="${style.value}" data-type="free">
								<img src="${window.mapster_admin.directory}images/styles/${style.value}.png" />
								${style.name}
							</div>`
						}).join('')}
					</div>
				</div>
			`;
			let mapboxStyles = [];
			$('.acf-field[data-name="map_tile_style_access_token"] select option').each(function() {
				if($(this).attr('value').indexOf('mapster-') === -1) {
					if(!openStyles.find(style => style.value === $(this).attr('value'))) {
						mapboxStyles.push({
							type : "access_token",
							value : $(this).attr('value'),
							name : $(this).text()
						})
					}
				}
			})
			html += `
				<div class="mapster-accordion">
					<h2>Mapbox Styles</h2>
					<p>These styles require an access token and the use of a Mapbox map.</strong></p>
					<div class="mapster-accordion-toggle">
						${mapboxStyles.map(style => {
							return `<div class="mapster-style-thumb" data-slug="${style.value}" data-type="access_token">
								<img src="${window.mapster_admin.directory}images/styles/${style.value}.png" />
								${style.name}
							</div>`
						}).join('')}
					</div>
				</div>
			`;
			let mapsterStyles = [];
			$('.acf-field[data-name="map_tile_style_access_token"] select option').each(function() {
				if($(this).attr('value').indexOf('mapster-') > -1) {
					mapsterStyles.push({
						type : "access_token",
						value : $(this).attr('value'),
						name : $(this).text()
					})
				}
			})
			html += `
				<div class="mapster-accordion">
					<h2>Mapster Pro Styles</h2>
					<p>These styles require a <a href="https://wpmaps.mapster.me/" target="_blank">Mapster Pro</a> license and a Mapbox access token.</p>
					<div class="mapster-accordion-toggle">
						${mapsterStyles.map(style => {
							return `<div class="mapster-style-thumb" data-slug="${style.value}" data-type="access_token_pro">
								<img src="${window.mapster_admin.directory}images/styles/${style.value}.png" />
								${style.name}
							</div>`
						}).join('')}
					</div>
				</div>
			`;
			$('#mapster-style-selector').html(html);

			// Set current style
			if($('#mapster-current-style').length) {
				let acfNoAccessTokenField = acf.getField("field_61636f4ed9390");
				let acfAccessTokenField = acf.getField("field_61636d141864b");
				if($('.acf-field[data-name="map_tile_style_access_token"]').hasClass("acf-hidden")) {
					let selectedOption = $('.acf-field[data-name="map_tile_style_no_access_token"] select').find(`option[value=${acfNoAccessTokenField.val()}]`);
					$('#mapster-current-style').html(selectedOption.text())
				}
				if($('.acf-field[data-name="map_tile_style_no_access_token"]').hasClass("acf-hidden")) {
					let selectedOption = $('.acf-field[data-name="map_tile_style_access_token"] select').find(`option[value=${acfAccessTokenField.val()}]`);
					$('#mapster-current-style').html(selectedOption.text())
				}
			}
		}
		$(document).on('click', ".mapster-style-thumb", function() {
			let thisSlug = $(this).data('slug');
			let thisType = $(this).data('type');
			let mapProvider = acf.getField('field_61636c71d48e1');
			let acfNoAccessTokenField = acf.getField("field_61636f4ed9390");
			let acfAccessTokenField = acf.getField("field_61636d141864b");
			if(($('.acf-field[data-name="map_tile_style_access_token"]').hasClass("acf-hidden") || mapProvider.val() !== "mapbox") && thisType.indexOf('access_token') > -1) {
				alert("You need to set your map type to Mapbox, and enter a Mapbox access token to use this style.");
			} else {
				if(thisType.indexOf('access_token') > -1) {
					acfAccessTokenField.val(thisSlug)
				} else {
					if($('.acf-field[data-name="map_tile_style_access_token"]').hasClass("acf-hidden")) {
						acfNoAccessTokenField.val(thisSlug)
					} else {
						acfAccessTokenField.val(thisSlug)
					}
				}
				$('#mapster-current-style').html($(this).text())
			}
		})
	});


	// Caching functionality interaction
	$(document).on('click', '.acf-field[data-name="generate_cache"] .acf-button-group input', function() {
		if($('#post_ID').length) {
			let post_id = $('#post_ID').val();
			if(post_id) {
		    fetch(window.mapster_admin.rest_url + `mapster-wp-maps/create-cached-file?post_id=${post_id}`, {
		      headers : {
		        'X-WP-Nonce' : window.mapster_admin.nonce,
		        'Content-Type' : 'application/json'
		      },
		      method : "GET"
		    }).then(resp => resp.json()).then(response => {
					if(response === true) {
						window.alert("Your new cache was generated!");
					} else {
						window.alert("There was an issue generating your cache. Try again or get in touch with Mapster support.");
					}
		    })
			} else {
				window.alert("Please save your post before generating a cache.");
			}
		} else {
			window.alert("Please save your post before generating a cache.");
		}
	})

})( jQuery );

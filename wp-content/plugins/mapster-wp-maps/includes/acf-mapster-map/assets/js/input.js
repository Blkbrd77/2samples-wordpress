(function($){

	// Globals
	var fieldSelector = false;
	var map = false;
	var currentMarker = false;
	var isPublic = true;

	// Extending draw
	class extendDrawBar {
	    constructor(opt) {
	      let ctrl = this;
	      ctrl.draw = opt.draw;
	      ctrl.buttons = opt.buttons || [];
	      ctrl.onAddOrig = opt.draw.onAdd;
	      ctrl.onRemoveOrig = opt.draw.onRemove;
	    }
	    onAdd(map) {
	      let ctrl = this;
	      ctrl.map = map;
	      ctrl.elContainer = ctrl.onAddOrig(map);
	      ctrl.buttons.forEach((b) => {
	        ctrl.addButton(b);
	      });
	      return ctrl.elContainer;
	    }
	    onRemove(map) {
	      let ctrl = this;
	      ctrl.buttons.forEach((b) => {
	        ctrl.removeButton(b);
	      });
	      ctrl.onRemoveOrig(map);
	    }
	    addButton(opt) {
	      let ctrl = this;
	      var elButton = document.createElement("button");
	      elButton.className = "mapbox-gl-draw_ctrl-draw-btn";
	      if (opt.classes instanceof Array) {
	        opt.classes.forEach((c) => {
	          elButton.classList.add(c);
	        });
	      }
	      elButton.setAttribute('title', opt.title);
	      elButton.addEventListener(opt.on, opt.action);
	      ctrl.elContainer.prepend(elButton);
	      opt.elButton = elButton;
	    }
	    removeButton(opt) {
	      opt.elButton.removeEventListener(opt.on, opt.action);
	      opt.elButton.remove();
	    }
	}

	function removeExtraFields() {
		if($('.mapster-extra-form-fields').length) {
			$('.mapster-extra-form-fields').find('.acf-field-mapster-map').remove();
			// Removing the hidden fields that mess up ACF saving
			$('.mapster-extra-form-fields #acf-form-data').remove();
			// Moving fields to append properly
			let parent = $('.acf-field-mapster-map').closest('.acf-postbox');
			$('.acf-field-mapster-map .mapster-extra-form-fields').appendTo(parent);
		}
	}

	function getDefaultCenter() {
		let center = [0, 0]
		
		return center;
	}

	function getDefaultZoom() {
		let zoom = 2;
		
		return zoom;
	}

	// Mapping
	function initializeMap(id) {
		let center = getDefaultCenter();
		let zoom = getDefaultZoom();
		if($('.mapster-map-submission-frontend').length) {
			center = $('.mapster-front-submission-options').data('center');
			zoom = $('.mapster-front-submission-options').data('zoom');
		}
		let mapInit = {
			container: id,
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
			center: center,
			zoom: zoom
		}
		
		let newMap = new maplibregl.Map(mapInit);
		newMap.on('load', () => {
			newMap.resize();

			generateStyle(); // For loading a base image

			if(getGeoJSON().features.length > 0) {
				var bbox = turf.bbox(getGeoJSON());
				newMap.fitBounds(bbox, { padding : 20, maxZoom : 13, duration: 0 });
			}
		});
		return newMap;
	}

	function initializeGeoJSON() {

			if(getGeographyType() === 'location') {
				showCurrentCoordinates()
			}

			getACFValues();

			map.on('load', () => {
				map.addSource('feature', {
					type : 'geojson',
					data : getGeoJSON()
				})
				addLayers()
			})
	}

	function addLayers() {
		if(getGeographyType() === 'location') {
			if(getLocationType() === 'circle') {
				map.addLayer({
					id : 'feature',
					type : 'circle',
					source : 'feature'
				});
			}
			if(getLocationType() === 'label' || getLocationType() === 'marker') {
				map.addLayer({
					id : 'feature',
					type : 'symbol',
					source : 'feature'
				});
				if(getLocationType() === 'marker') {
					manageMarker()
				}
			}
		}
		if(getGeographyType() === 'line') {
			map.addLayer({
				id : 'feature',
				type : 'line',
				source : 'feature'
			});
		}
		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill') {
			map.addLayer({
				id : 'feature',
				type : 'fill',
				source : 'feature'
			});
		}
		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill-extrusion') {
			map.addLayer({
				id : 'feature',
				type : 'fill-extrusion',
				source : 'feature'
			});
		}
		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill-image') {
			map.addLayer({
				id : 'feature',
				type : 'fill',
				source : 'feature'
			});
			setFillImage();
		}
		setPaintAndLayoutProperties()
	}

	function removeMarker() {
		if(currentMarker) {
			currentMarker.remove();
		}
	}

	function manageMarker() {
		if(getGeographyType() === 'location' && getLocationType() === 'marker') {
			removeMarker();
			if(getGeoJSON().features.length > 0) {
				var values = getACFValues()
				var options = values.marker;
				var newMarker = new maplibregl.Marker(options).setLngLat(getGeoJSON().features[0].geometry.coordinates);
				newMarker.addTo(map)
				currentMarker = newMarker
			}
		}
	}

	function setFillImage() {
		
	}

	function makePolyBoundsCoords() {
		let polygonBounds = turf.bbox(getGeoJSON());
		return [
			[polygonBounds[0], polygonBounds[3]],
			[polygonBounds[2], polygonBounds[3]],
			[polygonBounds[2], polygonBounds[1]],
			[polygonBounds[0], polygonBounds[1]]
		];
	}

	function setLocationType() {
		removeMarker()
		if(map.getLayer('feature')) {
			map.removeLayer('feature');
		}
		addLayers()
		setValueChangeListeners()
	}

	function setPolygonType() {
		if(map.getLayer('feature')) {
			map.removeLayer('feature');
		}
		addLayers()
		setValueChangeListeners()
	}

	function setPolygonTypeListener() {
		if($('.acf-field[data-name="polygon_style"]').length) {
			$(document).on('change', '.acf-field[data-name="polygon_style"] :input', function() {
				setPolygonType()
				setPaintAndLayoutProperties()
			})
		}
	}

	function setLocationTypeListener() {
		if($('.acf-field[data-name="location_style"]').length) {
			$(document).on('change', '.acf-field[data-name="location_style"] :input', function() {
				setLocationType()
				setPaintAndLayoutProperties()
			})
		}
	}

	function setManualEntryListener() {
		$(document).on('click', '#set-manual-point', function() {
			let longitude = $('#mapster-map-point-longitude').val();
			let latitude = $('#mapster-map-point-latitude').val();
			var newGeoJSON = { type : "FeatureCollection", features : [{
				type : "Feature",
				properties : {},
				geometry : {
					type : "Point",
					coordinates : [ parseFloat(longitude), parseFloat(latitude) ]
				}
			}]}
			setGeoJSON(newGeoJSON)
			map.jumpTo({ center : [ parseFloat(longitude), parseFloat(latitude) ] });
		})
	}

	function setPaintAndLayoutProperties() {
		var values = getACFValues()
		if(getGeographyType() === 'location' && getLocationType() === 'marker') {
			manageMarker();
		} else if((getGeographyType() === 'location' && getLocationType() !== 'marker' && getLocationType() !== '3d-model') || getGeographyType() === 'line' || getGeographyType() === 'polygon' ) {
			for(var field in values.paint) {
				map.setPaintProperty('feature', `${getLayerType()}${field}`, values.paint[field]);
			}
			for(var field in values.layout) {
				map.setLayoutProperty('feature', `${getLayerType()}${field}`, values.layout[field]);
			}
		} else if(getGeographyType() === 'location' && getLocationType() === '3d-model') {
			load3DModel();
		}
		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill-image') {
			setFillImage();
		}
	}

	function setValueChangeListeners() {
		var values = getACFValues()
		for(var type in values) {
			for(var field in values[type]) {
				$(document).on('change', `.acf-field[data-name="${field}"] :input`, function() {
					setPaintAndLayoutProperties()
				})
			}
		}
		if(getGeographyType() === 'line') {
			var specialEvents = ['dashed_line', 'dash_length', 'gap_length'];
			specialEvents.forEach(thisName => {
				$(document).on('change', `.acf-field[data-name="${thisName}"] :input`, function() {
					setPaintAndLayoutProperties()
				});
			});
		}
		if(getGeographyType() === 'location' && getLocationType() === 'label') {
			var specialEvents = ['label_on', 'icon_on', 'icon-image', 'icon-translate-x', 'icon-translate-y', 'text-translate-x', 'text-translate-y', 'icon-static-size'];
			specialEvents.forEach(thisName => {
				$(document).on('change', `.acf-field[data-name="${thisName}"] :input`, function() {
					setPaintAndLayoutProperties()
				});
			})
		}
		
	}

	// Drawing
	function initializeMultiDraw(multiMap) {
		
	}

	function initializeDraw() {
		var fieldOptions = getFieldOptions();
		let drawOptions = {
			displayControlsDefault : false,
			userProperties : true,
			controls : {
				point : fieldOptions.pointAllowed,
				line_string : fieldOptions.lineStringAllowed,
				polygon : fieldOptions.polygonAllowed,
				trash : true
			}
		}
		if(fieldOptions.lineStringAllowed) {
			drawOptions['modes'] = {
				...MapboxDraw.modes,
				simple_select : window.bezier.SimpleSelectModeBezierOverride,
				direct_select : window.bezier.DirectModeBezierOverride,
				draw_bezier_curve : window.bezier.DrawBezierCurve
			}
			drawOptions['styles'] = window.bezier.customStyles;
		}
		var Draw = new MapboxDraw(drawOptions);
		if(fieldOptions.lineStringAllowed) {
			const drawBezierBtn = { on: "click", action: (e) => {
				e.preventDefault();
				$('.mapster-map-instructions').html('Alt + drag to draw bezier lines.');
				$('.mapster-map-instructions').fadeIn();
				Draw.changeMode("draw_bezier_curve");
			}, classes: ["bezier-curve-icon"], title:'Bezier tool' };
			const drawBar = new extendDrawBar({
		    draw: Draw,
		    buttons: [ drawBezierBtn ]
		  });
			map.addControl(drawBar, 'top-left');
		} else {
			map.addControl(Draw);
		}

		map.on('draw.create', (e) => {
			var newGeoJSON = getGeoJSON();
			newGeoJSON.features = [e.features[0]]
			map.setLayoutProperty('feature', 'visibility', 'visible');
			$('#finish-drawing div').fadeOut();
			Draw.deleteAll();
			setGeoJSON(newGeoJSON)
		})

		map.on('draw.delete', (e) => {
			var newGeoJSON = getGeoJSON();
			newGeoJSON.features = [];
			map.setLayoutProperty('feature', 'visibility', 'visible');
			setGeoJSON(newGeoJSON)
		});

		map.on('draw.update', (e) => {
			var newGeoJSON = getGeoJSON();
			newGeoJSON.features = [e.features[0]]
			setGeoJSON(newGeoJSON)
		})

		map.on('draw.modechange', (e) => {
			$('.mapster-map-instructions').fadeOut(100, function() {
				$('.mapster-map-instructions').html('');
			});
		})

		map.on('load', () => {
			$(document).on('click', '#draw-point', () => {
				map.setLayoutProperty('feature', 'visibility', 'none');
				$('#finish-drawing div').fadeIn();
				Draw.changeMode('draw_point');
			})
			$(document).on('click', '#draw-linestring', () => {
				map.setLayoutProperty('feature', 'visibility', 'none');
				$('#finish-drawing div').fadeIn();
				Draw.changeMode('draw_line_string');
			})
			$(document).on('click', '#edit-linestring', () => {
				if(getGeoJSON().features[0]) {
					map.setLayoutProperty('feature', 'visibility', 'none');
					$('#finish-drawing div').fadeIn();
					var ids = Draw.add(getGeoJSON())
					Draw.changeMode('direct_select', { featureId : ids[0] });
				}
			})
			$(document).on('click', '#draw-polygon', () => {
				map.setLayoutProperty('feature', 'visibility', 'none');
				Draw.changeMode('draw_polygon');
			})
			$(document).on('click', '#edit-polygon', () => {
				if(getGeoJSON().features[0]) {
					map.setLayoutProperty('feature', 'visibility', 'none');
					$('#finish-drawing div').fadeIn();
					var ids = Draw.add(getGeoJSON())
					Draw.changeMode('direct_select', { featureId : ids[0] });
				}
			})
			$(document).on('click', '#finish-drawing div', () => {
				var newGeoJSON = getGeoJSON();
				var allDrawFeatures = Draw.getAll();
				var thisIndex = newGeoJSON.features.findIndex(feature => feature.id === allDrawFeatures.features[0].id);
				if(thisIndex > -1) {
					newGeoJSON.features[thisIndex] = allDrawFeatures.features[0]
				}
				map.setLayoutProperty('feature', 'visibility', 'visible');
				$('#finish-drawing div').fadeOut();
				Draw.deleteAll();
				setGeoJSON(newGeoJSON)
			})
			$(document).on('click', '#draw-delete', () => {
				Draw.deleteAll();
				map.setLayoutProperty('feature', 'visibility', 'none');
				var newGeoJSON = { type : "FeatureCollection", features : []}
				setGeoJSON(newGeoJSON)
			})
		})
	}

	function setMultiGeometryListener() {
		let multiMapInitialized = false;
		$(document).on('click', '.open-multigeom', function() {
			$('.open-multigeom-a').trigger('click');
			if(!multiMapInitialized) {
				if(getGeographyType() === 'line') {
					$('#draw-single-line').show();
				} else if (getGeographyType() === 'polygon') {
					$('#draw-single-polygon').show();
				}
				let multiMap = initializeMap(getFieldElement().attr('id')+'-multi');
				initializeMultiDraw(multiMap);
				multiMapInitialized = true;
			}
		})
	}


	function initialize_field( $field ) {

		// UI modifications
		fieldSelector = $field;

		removeExtraFields();
		map = initializeMap(getFieldElement().attr('id'));
		miniButtonFunctions();
		initializeDraw();
		initializeGeoJSON();
		setValueChangeListeners();
		setGeocoder();
		setMultiGeometryListener();

		if(getGeographyType() === 'line' || getGeographyType() === 'polygon') {
			setUploader();
		}

		if(getGeographyType() === 'location') {
			setLocationTypeListener();
			setManualEntryListener();
		}

		if(getGeographyType() === 'polygon') {
			setPolygonTypeListener();
		}

	}

	// Saving
	function setGeoJSON(geoJSON) {
		simplifyCoordinates(geoJSON);
		saveField(geoJSON);
		map.getSource('feature').setData(geoJSON);
		manageMarker()
		if(getGeographyType() === 'location') {
			showCurrentCoordinates()
			if(getLocationType() === '3d-model') {
				load3DModel();
			}
		}
		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill-image') {
			setFillImage();
		}
	}

	function simplifyCoordinates(geoJSON) {
		geoJSON.features.forEach(feature => {
			feature.geometry.coordinates = feature.geometry.coordinates.map(checkIfNumberAndRound)
		})
	}

	function checkIfNumberAndRound(input) {
		if(isNaN(input)) {
			return input.map(checkIfNumberAndRound)
		} else {
			return Math.round(input * 100000000) / 100000000
		}
	}

	function saveField(geoJSON) {
		$(`#mapster-map-geojson-${getFieldID()}`).attr('value', JSON.stringify(geoJSON));
	}

	// Helpers
	function getLocationType() {
		if($('.mapster-map-submission-frontend').length) {
			return 'marker'
		} else {
			return $('.acf-field[data-name="location_style"]').find('select').val()
		}
	}

	function getPolygonType() {
		return $('.acf-field[data-name="polygon_style"]').find('select').val()
	}

	function getACFValues() {

		if(getGeographyType() === 'location' && getLocationType() === 'circle') {
			var colorVal = $('.acf-field[data-name="circle"] .acf-field[data-name="color"]').find(':input').val()
			var opacityVal = $('.acf-field[data-name="circle"] .acf-field[data-name="opacity"]').find(':input').val()
			var radiusVal = $('.acf-field[data-name="circle"] .acf-field[data-name="radius"]').find(':input').val()
			var strokeWidthVal = $('.acf-field[data-name="circle"] .acf-field[data-name="stroke-width"]').find(':input').val()
			var strokeColorVal = $('.acf-field[data-name="circle"] .acf-field[data-name="stroke-color"]').find(':input').val()
			var strokeOpacityVal = $('.acf-field[data-name="circle"] .acf-field[data-name="stroke-opacity"]').find(':input').val()
			const circleValues = {
				paint : {
					color : colorVal !== '' ? colorVal : '#000',
					opacity : opacityVal !== '' ? parseFloat(opacityVal)/100 : 1,
					radius : radiusVal !== '' ? parseFloat(radiusVal) : 5,
					'stroke-width' : strokeWidthVal !== '' ? parseFloat(strokeWidthVal) : 0,
					'stroke-color' : strokeColorVal !== '' ? strokeColorVal : '#FFF',
					'stroke-opacity' : strokeOpacityVal !== '' ? parseFloat(strokeOpacityVal)/100 : 1
				}
			}
			return circleValues;
		}

		if(getGeographyType() === 'location' && getLocationType() === 'marker') {
			var colorVal = $('.acf-field[data-name="marker"] .acf-field[data-name="color"]').find(':input').val()
			var scaleVal = $('.acf-field[data-name="marker"] .acf-field[data-name="scale"]').find(':input').val()
			var rotationVal = $('.acf-field[data-name="marker"] .acf-field[data-name="rotation"]').find(':input').val()
			var anchorVal = $('.acf-field[data-name="marker"] .acf-field[data-name="anchor"]').find(':input').val()
			const markerValues = {
				marker : {
					color : colorVal !== '' ? colorVal : '#000',
					scale : scaleVal !== '' ? parseFloat(scaleVal)/100 : 1,
					rotation : rotationVal !== '' ? parseFloat(rotationVal) : 0,
					anchor : anchorVal !== '' ? anchorVal : 'center'
				}
			}
			return markerValues;
		}

		if(getGeographyType() === 'location' && getLocationType() === 'label') {
			var textOn = $('.acf-field[data-name="label"] .acf-field[data-name="label_on"]').find(':input').is(':checked')
			var textFieldVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-field"]').find(':input').val()
			var textFontVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-font"]').find(':input').val()
			var textSizeVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-size"]').find(':input').val()
			var textColorVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-color"]').find(':input').val()
			var textOpacityVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-opacity"]').find(':input').val()
			var textRotationVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-rotate"]').find(':input').val()
			var textTranslateXVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-translate-x"]').find(':input').val()
			var textTranslateYVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-translate-y"]').find(':input').val()
			var textHaloWidthVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-halo-width"]').find(':input').val()
			var textHaloColorVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-halo-color"]').find(':input').val()
			var textHaloBlurVal = $('.acf-field[data-name="label"] .acf-field[data-name="text-halo-blur"]').find(':input').val()

			var iconOn = $('.acf-field[data-name="icon"] .acf-field[data-name="icon_on"]').find(':input').is(':checked')
			var iconImageVal = $('.acf-field[data-name="icon"] .acf-field[data-name="icon-image"] img').attr('src');
			var iconSizeVal = $('.acf-field[data-name="icon"] .acf-field[data-name="icon-size"]').find(':input').val()
			var iconOpacityVal = $('.acf-field[data-name="icon"] .acf-field[data-name="icon-opacity"]').find(':input').val()
			var iconRotationVal = $('.acf-field[data-name="icon"] .acf-field[data-name="icon-rotate"]').find(':input').val()
			var iconTranslateXVal = $('.acf-field[data-name="icon"] .acf-field[data-name="icon-translate-x"]').find(':input').val()
			var iconTranslateYVal = $('.acf-field[data-name="icon"] .acf-field[data-name="icon-translate-y"]').find(':input').val()
			var iconAnchorVal = $('.acf-field[data-name="icon"] .acf-field[data-name="icon-anchor"]').find(':input').val()
			if(iconImageVal !== '') {
				addNewIcon(iconImageVal, () => {
					map.setLayoutProperty('feature', 'icon-image', 'icon-image-location')
				})
			}
			var iconStatic = $('.acf-field[data-name="icon"] .acf-field[data-name="icon-static-size"]').find(':input').is(':checked')
			if(iconStatic) {
				iconSizeVal = ['interpolate',
					['exponential', 2],
					['zoom'],
					1,
					iconSizeVal * Math.pow(2, 1 - 16),
					22,
					iconSizeVal * Math.pow(2, 22 - 16),
				]
			} else {
				iconSizeVal = iconSizeVal !== '' ? parseFloat(iconSizeVal)/100 : 1
			}
			const labelValues = {
				layout : {
					'text-field' : textFieldVal !== '' ? textFieldVal : "",
					'text-font' : [ textFontVal ],
					'text-rotate' : textRotationVal !== '' ? parseFloat(textRotationVal) : 0,
					'text-size' : textSizeVal !== '' ? parseFloat(textSizeVal) : 16,
					'icon-size' : iconSizeVal,
					'icon-rotate' : iconRotationVal !== '' ? parseFloat(iconRotationVal) : 0,
					'icon-anchor' : iconAnchorVal !== '' ? iconAnchorVal : 'center',
					'icon-offset' : iconTranslateXVal !== '' && iconTranslateYVal !== '' ? [parseFloat(iconTranslateXVal), parseFloat(iconTranslateYVal)] : [0, 0],
					'text-offset' : textTranslateXVal !== '' && textTranslateYVal !== '' ? [parseFloat(textTranslateXVal), parseFloat(textTranslateYVal)] : [0, 0]
				},
				paint : {
					'text-color' : textColorVal !== '' ? textColorVal : '#000000',
					'text-halo-width' : textHaloWidthVal !== '' ? parseFloat(textHaloWidthVal) : 1,
					'text-halo-color' : textHaloColorVal !== '' ? textHaloColorVal : '#FFFFFF',
					'text-halo-blur' : textHaloBlurVal !== '' ? parseFloat(textHaloBlurVal)/100 : 0.5,
					'text-opacity' : textOpacityVal !== '' ? parseFloat(textOpacityVal)/100 : 1,
					'icon-opacity' : iconOpacityVal !== '' ? parseFloat(iconOpacityVal)/100 : 1
				}
			}
			if(!textOn) {
				labelValues.layout['text-size'] = 0;
			}
			if(!iconOn) {
				labelValues.layout['icon-size'] = 0;
			}
			return labelValues;
		}

		if(getGeographyType() === 'line') {
			var colorVal = $('.acf-field[data-name="color"]').find(':input').val()
			var opacityVal = $('.acf-field[data-name="opacity"]').find(':input').val()
			var widthVal = $('.acf-field[data-name="width"]').find(':input').val()
			var hasDash = $('.acf-field[data-name="dashed_line"]').find(':input').is(':checked')
			var dashLength = $('.acf-field[data-name="dash_length"]').find(':input').val()
			var gapLength = $('.acf-field[data-name="gap_length"]').find(':input').val()
			const lineValues = {
				paint : {
					color : colorVal && colorVal!== '' ? colorVal : '#000',
					opacity : opacityVal && opacityVal !== '' ? parseFloat(opacityVal)/100 : 1,
					width : widthVal && widthVal !== '' ? parseFloat(widthVal) : 5
				}
			}
			if(hasDash) {
				lineValues.paint['dasharray'] = dashLength!=='' && gapLength!== '' ? [parseFloat(dashLength), parseFloat(gapLength)] : [1, 1];
			} else {
				lineValues.paint['dasharray'] = [1, 0]
			}
			return lineValues;
		}

		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill') {
			var colorVal = $('.acf-field[data-name="color"]').find('input').val()
			var opacityVal = $('.acf-field[data-name="opacity"]').find('input').val()
			var outlineColorVal = $('.acf-field[data-name="outline-color"]').find('input').val()
			const polygonValues = {
				paint : {
					color : colorVal && colorVal !== '' ? colorVal : '#000',
					opacity : opacityVal && opacityVal !== '' ? parseFloat(opacityVal)/100 : 1,
					'outline-color' : outlineColorVal && outlineColorVal !== '' ? outlineColorVal : 'rgba(0, 0, 0, 0)'
				}
			}
			return polygonValues;
		}

		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill-extrusion') {
			var colorVal = $('.acf-field[data-name="color"]').find('input').val()
			var opacityVal = $('.acf-field[data-name="opacity"]').find('input').val()
			var extrusionBaseVal = $('.acf-field[data-name="base"]').find('input').val()
			var extrusionHeightVal = $('.acf-field[data-name="height"]').find('input').val()
			const polygonValues = {
				paint : {
					'color' : colorVal && colorVal !== '' ? colorVal : '#000',
					'opacity' : opacityVal && opacityVal !== '' ? parseFloat(opacityVal)/100 : 1,
					'base' : extrusionBaseVal && extrusionBaseVal !== '' ? parseFloat(extrusionBaseVal) : 0,
					'height' : extrusionHeightVal && extrusionHeightVal !== '' ? parseFloat(extrusionHeightVal) : 0,
				}
			}
			return polygonValues;
		}

		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill-image') {
			const polygonValues = {
				paint : {
					'color' : '#000',
					'opacity' : 0.2,
					'outline-color' : '#000000'
				}
			}
			return polygonValues;
		}
	}

	function getLayerType() {
		if(getGeographyType() === 'location' && getLocationType() === 'circle') {
			return 'circle-';
		}
		if(getGeographyType() === 'location' && getLocationType() === 'label') {
			return '';
		}
		if(getGeographyType() === 'line') {
			return 'line-';
		}
		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill') {
			return 'fill-';
		}
		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill-extrusion') {
			return 'fill-extrusion-';
		}
		if(getGeographyType() === 'polygon' && getPolygonType() === 'fill-image') {
			return 'fill-';
		}
	}

	function addNewIcon(iconSrc, callback) {
		if(!iconSrc) {
			callback()
		}
    if(window.location.protocol === 'https:' && iconSrc.indexOf('http://') > -1) {
      iconSrc = iconSrc.replace('http', 'https');
    }
		map.loadImage(iconSrc, (err, img) => {
			if(!map.loaded()) {
				map.once('idle', () => {
					if(map.hasImage('icon-image-location')) {
						map.updateImage('icon-image-location', img);
					} else {
						map.addImage('icon-image-location', img)
					}
					callback()
				})
			} else {
				if(map.hasImage('icon-image-location')) {
					map.updateImage('icon-image-location', img);
				} else {
					map.addImage('icon-image-location', img)
				}
				callback()
			}
		})
	}

	function load3DModel() {
    

	}

	function getFieldElement() {
		return $(fieldSelector).find('.mapster-map')
	}

	function getFieldID() {
		return getFieldElement().attr('id').replace('mapster-map-', '');
	}

	function getGeographyType() {
		if($('.mapster-map-submission-frontend').length) {
			let toReturn = $(".mapster-submission-map").data('linestring') === 1 ? 'line' : '';
			toReturn = $(".mapster-submission-map").data('point') === 1 ? 'location' : toReturn;
			toReturn = $(".mapster-submission-map").data('polygon') === 1 ? 'polygon' : toReturn;
			return toReturn;
		} else {
			let mapElement = getFieldElement();
			if(mapElement.data('point') === 1) {
				return 'location';
			} else if(mapElement.data('linestring') === 1) {
				return 'line';
			} else if(mapElement.data('polygon') === 1) {
				return 'polygon';
			}
		}
	}

	function getGeoJSON() {
		var existingValue = $(`#mapster-map-geojson-${getFieldID()}`).val();
		if(existingValue && existingValue !== '') {
			var currentGeoJSON = JSON.parse(existingValue);
			return currentGeoJSON;
		}
		return { type : "FeatureCollection", features : [] };
	}

	function getFieldOptions() {
		var pointAllowed = getFieldElement().data('point') === 1 ? true : false;
		var lineStringAllowed = getFieldElement().data('linestring') === 1 ? true : false;
		var polygonAllowed = getFieldElement().data('polygon') === 1 ? true : false;
		return {
			pointAllowed, lineStringAllowed, polygonAllowed
		}
	}

	function showCurrentCoordinates() {
		if(getGeoJSON().features[0]) {
			var coordinates = getGeoJSON().features[0].geometry.coordinates;
			$('#mapster-map-point-longitude').val(coordinates[0]);
			$('#mapster-map-point-latitude').val(coordinates[1]);
		} else {
			$('#mapster-map-point-longitude').val('');
			$('#mapster-map-point-latitude').val('');
		}
	}

	// Special functions
	function setUploader() {
		$('#mapster-map-upload').change(function(e) {
			geoJSONUploaded(e);
		})
	  const geoJSONUploaded = async (e) => {
	    const fileContents = await new Response(e.target.files[0]).json()
	    importGeoJSON(fileContents)
	  }
	  const importGeoJSON = (file) => {
	    if(!file) {
	      window.alert("Please upload a file.");
	    } else {
	      const errors = geojsonhint.hint(file)
	      if(errors.length === 0) {
					var feature = file.features.find(feature => $('#mapster-map-upload').data('type').indexOf(feature.geometry.type) > -1);
					if(feature) {
	        	if(window.confirm("Are you sure you want to upload this geoJSON? It will overwrite all existing features.")) {
							if(!feature.id) {
								feature.id = parseInt(Math.random() * Math.random() * 10000000);
							}
							var newGeoJSON = { type : "FeatureCollection", features : [feature]}
							setGeoJSON(newGeoJSON)
						}
					} else {
						window.alert("Please double-check that your geoJSON has the right geometry type for this post.")
					}
	      } else {
					var feature = file.features.find(feature => $('#mapster-map-upload').data('type').indexOf(feature.geometry.type) > -1);
					if(feature) {
	        	if(window.confirm("There was an error with your upload: " + JSON.stringify(errors) + ". Are you sure you want to upload this geoJSON? It will overwrite all existing features.")) {
							if(!feature.id) {
								feature.id = parseInt(Math.random() * Math.random() * 10000000);
							}
							var newGeoJSON = { type : "FeatureCollection", features : [feature]}
							setGeoJSON(newGeoJSON)
						}
					} else {
	        	window.alert('GeoJSON error: ' + JSON.stringify(errors));
					}
	      }
	    }
	  }
	}

	function miniButtonFunctions() {
		jQuery(document).on('click', '.mapster-edit-full-width', () => {
			if(jQuery('.mapster-map-container').css('display') === 'flex') {
				jQuery('.mapster-map-container').css('display', 'block');
				jQuery('.mapster-map-container > div').css('width', '100%')
				jQuery('.mapster-map-container > div').css('marginBottom', '15px');
				jQuery('.mapster-edit-full-width').text('Collapse Map');
				map.resize();
			} else {
				jQuery('.mapster-map-container').css('display', 'flex');
				jQuery('.mapster-map-container > div').css('width', '50%')
				jQuery('.mapster-map-container > div').css('marginBottom', '0px');
				jQuery('.mapster-edit-full-width').text('Expand Map');
				map.resize();
			}
		});

		let savedGeoJSON = false;
		jQuery(document).on('click', '.mapster-simplify-shape', () => {
			if(!jQuery('.mapster-simplify-shape-slider').length) {
				jQuery('.mapster-simplify-shape').html('Cancel Simplify Shape');
				jQuery('.mapster-map-container > div:first-child').append(`
					<div class="mapster-simplify-container" style="margin-top: 30px; text-align: right;">
						<input class="mapster-simplify-shape-slider" type="range" min="1" max="100" value="1" />
					</div>
				`)
				savedGeoJSON = getGeoJSON();
			} else {
				jQuery('.mapster-simplify-shape').html('Simplify Shape');
				jQuery('.mapster-simplify-container').remove();
				setGeoJSON(savedGeoJSON)
			}
		});
		jQuery(document).on('input', '.mapster-simplify-shape-slider', function() {
			let rangeVal = jQuery(this).val();
			let simplifiedGeoJSON = turf.simplify(savedGeoJSON, { tolerance : parseInt(rangeVal) / 100 });
			setGeoJSON(simplifiedGeoJSON);
		})

		jQuery(document).on('click', '.mapster-download-geojson', () => {
	    var downloadLink = document.createElement("a");
	    var blob = new Blob(["\ufeff", JSON.stringify(getGeoJSON())]);
	    var url = URL.createObjectURL(blob);
	    downloadLink.href = url;
	    downloadLink.download = "geojson-download.json";  //Name the file here
	    document.getElementById('acf-form-data').appendChild(downloadLink);
	    downloadLink.click();
	    document.getElementById('acf-form-data').removeChild(downloadLink);
		});

		jQuery(document).on('click', '.mapster-image-base', () => {
			
		});
	}

	function generateStyle() {
		
	}

	function setGeocoder() {
		if($('#mapster-map-geosearch').length) {
			const provider = new GeoSearch.OpenStreetMapProvider();
			$(document).on('click', `#mapster-get-results`, async function() {
				var searchValue = $('#mapster-map-geosearch').val();
				if(searchValue.length > 2) {
					const results = await provider.search({ query: searchValue });
					var htmlToAppend = createStoreGeneratorGeocoderResultsHTML(results)
					$(`#mapster-geocoder-results`).empty().append(htmlToAppend)
				} else {
					$(`#mapster-geocoder-results`).empty();
				}
			})
			$(document).on('keyup', `#mapster-map-geosearch`, function() {
				var searchValue = $('#mapster-map-geosearch').val();
				if(searchValue.length <= 2) {
					$(`#mapster-geocoder-results`).empty();
				}
			});

			// Selecting geocoder results
			$(document).on('click', `#mapster-geocoder-results li`, function() {
				var theseBounds = $(this).data('bounds');
				var thisCenter = $(this).data('center');
				var newGeoJSON = { type : "FeatureCollection", features : [{
					type : "Feature",
					properties : {},
					geometry : {
						type : "Point",
						coordinates : thisCenter
					}
				}]}
				setGeoJSON(newGeoJSON)
				map.fitBounds(theseBounds.map(bound => bound.slice().reverse()), { padding: 20 });
				$(`#mapster-geocoder-results`).empty();
			});

			const createStoreGeneratorGeocoderResultsHTML = (geocoderResults) => {
				var html = '';
				geocoderResults.slice(0, 5).forEach(result => {
					html += `<li data-center="${JSON.stringify([result.x, result.y])}" data-bounds="${JSON.stringify(result.bounds)}">${result.label}</li>`
				})
				return html;
			}
		}
		if($('#mapster-geocoder-mapbox').length) {
			const access_token = $('#mapster-geocoder-mapbox').data("access_token");
			const geocoder = new MapboxGeocoder({
				accessToken: access_token,
				mapboxgl: maplibregl,
				marker : false
			});

			geocoder.on('result', (e) => {
				var newGeoJSON = { type : "FeatureCollection", features : [{
					type : "Feature",
					properties : {},
					geometry : {
						type : "Point",
						coordinates : e.result.center
					}
				}]}
				setGeoJSON(newGeoJSON)
			})

			document.getElementById('mapster-geocoder-mapbox').appendChild(geocoder.onAdd(map));
		}
	}


	if( typeof acf.add_action !== 'undefined' ) {

		acf.add_action('ready_field/type=mapster-map', initialize_field);
		acf.add_action('append_field/type=mapster-map', initialize_field);
		acf.add_action('show_field/type=mapster-map', initialize_field);

	} else {

		$(document).on('acf/setup_fields', function(e, postbox){

			// find all relevant fields
			$(postbox).find('.field[data-field_type="mapster-map"]').each(function(){
				// initialize
				initialize_field( $(this) );

			});

		});

	}

})(jQuery);

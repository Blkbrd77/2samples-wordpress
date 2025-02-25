class MWM_Settings_Importer {
  constructor() {
    this.geojsondocumentToImport = false;
    this.gljsdocumentToImport = false;
    this.importInstallationFile = false;
    this.featuresImported = 0;
    this.upgradeMessage = '';
    this.initializedInputs = [];
    this.jsonImport = {
      categories : [], point : [], line : [], polygon : []
    }
    this.postsImported = 0;
    this.fetchedFields = {};
    this.currentFile = false;
    this.currentCSVImport = []
    this.currentImportCategory = false
  }

  setUpgradeMessage(message) {
    this.upgradeMessage = window.mapster_settings.strings["Upgrade Message 1"];
  }

  async doGeoJSONImport() {
    if(this.geojsondocumentToImport) {
      try {
        const response = await this.doGeoJSONImportPost(this.geojsondocumentToImport, this.jsonImport, this.currentImportCategory, this.featuresImported);
        this.displayAfterImport(response.count);
      } catch (err) {
        jQuery('.mapster-import-error').html(window.mapster_settings.strings["Error"] + this.upgradeMessage);
      }
    } else {
      window.alert(window.mapster_settings.strings["Please Upload"]);
    }
  }

  async geoJSONUploaded(e) {
    let that = this;
    jQuery('#geojson-import-data-summary h4 span').html(e.target.files[0].type);
    if(e.target.files[0].name.indexOf('.json') > -1 || e.target.files[0].name.indexOf('.geojson') > -1) {
      const fileContents = await new Response(e.target.files[0]).json()
      that.importGeoJSON(fileContents)
    } else if(e.target.files[0].name.indexOf('.kml') > -1) {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = async () => {
        const geojson = toGeoJSON.kml(new DOMParser().parseFromString(reader.result, "text/xml"));
        const newGeoJSON = this.changeMultiGeometries(geojson);
        that.importGeoJSON(newGeoJSON)
      }
    } else if(e.target.files[0].name.indexOf('.gpx') > -1) {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = async () => {
        const geojson = toGeoJSON.gpx(new DOMParser().parseFromString(reader.result, "text/xml"));
        that.importGeoJSON(geojson)
      }
    } else {
      const reader = new FileReader();
      reader.readAsArrayBuffer(event.target.files[0]);
      reader.onload = async () => {
        const geojson = await shp(reader.result);
        that.importGeoJSON(geojson)
      }
    }
  }

  changeMultiGeometries(geojson) {
    let newGeoJSON = { type : "FeatureCollection", features : [] };
    geojson.features.forEach(feature => {
      if(feature.geometry.type === "GeometryCollection") {
        let newGeometryType = feature.geometry.geometries[0].type === "Polygon" ? "MultiPolygon" : feature.geometry.geometries[0].type === "LineString" ? "MultiLineString" : feature.geometry.geometries[0].type === "Point" ? "MultiPoint" : false;
        if(newGeometryType) {
          let newGeometry = {
            type : newGeometryType,
            coordinates : []
          }
          feature.geometry.geometries.forEach(geometry => {
            newGeometry.coordinates.push(geometry.coordinates);
          })
          let newFeature = {
            type : "Feature",
            properties : feature.properties,
            geometry : newGeometry
          }
          newGeoJSON.features.push(newFeature);
        }
      } else {
        newGeoJSON.features.push(feature);
      }
    })
    return newGeoJSON;
  }

  importGeoJSON(file) {
    if(!file) {
      window.alert(window.mapster_settings.strings["Please Upload"]);
    } else {
      this.showDataAboutImport(file)
      this.geojsondocumentToImport = file;
    }
  }

  isGoodProjection(features) {
    let isEPSG3857 = true;
    const errorFeatures = features.filter(feature => this.centerProjection(turf.center(feature).geometry.coordinates));
    if(errorFeatures.length > 0) {
      isEPSG3857 = false;
    }
    return isEPSG3857;
  }

  centerProjection(center) {
    if(center[0] < -180 || center[0] > 180 || center[1] < -90 || center[1] > 90) {
      return true;
    } else {
      return false;
    }
  }

  tryReprojection(file) {
    let newGeoJSON = JSON.parse(JSON.stringify(file));
    newGeoJSON.features.forEach(feature => {
      feature.geometry.coordinates = this.recursiveReproject(feature.geometry.coordinates);
    })
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newGeoJSON));
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "mapster-reprojection.json");
    dlAnchorElem.click();
  }

  recursiveReproject(array) {
    if(isNaN(array[0])) {
      array.forEach((item, index) => {
        array[index] = recursiveReproject(item);
      })
      return array;
    } else {
      const fromProjection = jQuery('#mapster-from-projection').val() !== '' ? jQuery('#mapster-from-projection').val() : 'EPSG:3857';
      return proj4(fromProjection, 'EPSG:4326', array)
    }
  }

  showDataAboutImport(file) {
    if(file.type) {
      jQuery('.mapster-import-options').fadeIn();
      jQuery("#geojson-import-button").fadeIn();
      jQuery('#geojson-import-data-summary').fadeIn();

      this.currentFile = file;

      this.advancedOptions();

      const types = [... new Set(file.features.map(item => item.geometry.type))];
      jQuery('#geojson-import-data-summary table tbody').html('');
      if(!this.isGoodProjection(file.features)) {
        jQuery('#mapster-projection-warning').fadeIn();
        jQuery(document).on('click', '#mapster-try-reproject', () => {
          this.tryReprojection(file);
        })
      }
      types.forEach(type => {
        const theseFeatures = file.features.filter(item => item.geometry.type === type);
        let allProperties = {};
        theseFeatures.forEach(feature => {
          for(let property in feature.properties) {
            allProperties[property] = typeof feature.properties[property];
          }
        })
        const allHaveProperties = theseFeatures.every(feature => this.hasProperties(feature, allProperties));
        const allHaveTypesRight = theseFeatures.every(feature => this.hasRightType(feature, allProperties));
        jQuery('#geojson-import-data-summary table tbody').append(`
            <tr>
              <td>${type}</td>
              <td>${theseFeatures.length}</td>
              <td><a href="#" data-index="feature-${Math.floor(Math.random()*theseFeatures.length)}" class="mapster-example-feature-${type}">${window.mapster_settings.strings["Example Feature"]}</a></td>
              <td>${allHaveProperties&&allHaveTypesRight ? `
                <span class="tooltip dashicons dashicons-yes-alt">
                  <span class="tooltiptext">${window.mapster_settings.strings["Looks Good"]}</span>
                </span>` : `
                ${!allHaveProperties ?
                  `<span class="tooltip dashicons dashicons-warning">
                    <span class="tooltiptext">${window.mapster_settings.strings["Missing Properties"]}</span>
                  </span>`
                : ''}
                ${!allHaveTypesRight ?
                  `<span class="tooltip dashicons dashicons-warning">
                    <span class="tooltiptext">${window.mapster_settings.strings["Inconsistent Data"]}</span>
                  </span>`
                : ''}
                `}
              </td>
            </tr>
        `);
        jQuery(document).on('click', `.mapster-example-feature-${type}`, function() {
          let thisIndex = jQuery(this).data('index').replace('feature-', '');
          alert(JSON.stringify(theseFeatures[thisIndex], null, 2));
        })
      })
    }
  }

  advancedOptions(file) {}

  hasProperties(feature, allProperties) {
    let hasPropertiesOfType = true;
    for(let property in allProperties) {
      if(!feature.properties[property]) {
        hasPropertiesOfType = false;
      }
    }
    return hasPropertiesOfType;
  }

  hasRightType(feature, allProperties) {
    let hasPropertiesOfType = true;
    for(let property in allProperties) {
      if(feature.properties[property] && typeof feature.properties[property] !== allProperties[property]) {
        hasPropertiesOfType = false;
      }
    }
    return hasPropertiesOfType;
  }

  doGeoJSONImportPost(geojson, import_json, import_category, features_imported) {
    jQuery('.mapster-map-loader').show();
    return fetch(window.mapster_settings.rest_url + 'mapster-wp-maps/import-geojson', {
      headers : {
        'X-WP-Nonce' : window.mapster_settings.nonce,
        'Content-Type' : 'application/json'
      },
      method : "POST",
      body : JSON.stringify({
        file : geojson,
        import_json : import_json,
        category : import_category,
        features_imported : features_imported
      })
    }).then(resp => resp.json());
  }

  displayAfterImport(count) {
    jQuery('.mapster-map-loader').hide();
    this.featuresImported = this.featuresImported + count;
    jQuery('.geojson-import-result span').html(this.featuresImported);
    jQuery('.geojson-import-result').fadeIn();
    jQuery('.geojson-import-progress').val((this.featuresImported/this.geojsondocumentToImport.features.length) * 100)
    jQuery('.mapster-import-error').html(window.mapster_settings.strings["Seem Wrong"] + this.upgradeMessage);
  }

  async glJSgeoJSONUploaded(e) {
    const fileContents = await new Response(e.target.files[0]).json()
    this.importGLJSGeoJSON(fileContents)
  }

  importGLJSGeoJSON(file) {
    if(!file) {
      window.alert(window.mapster_settings.strings["Please Upload"]);
    } else {
      this.gljsdocumentToImport = file;
    }
  }

  doGLJSImport() {
    let that = this;
    if(this.gljsdocumentToImport) {
      fetch(window.mapster_settings.rest_url + 'mapster-wp-maps/import-gl-js', {
        headers : {
          'X-WP-Nonce' : window.mapster_settings.nonce,
          'Content-Type' : 'application/json'
        },
        method : "POST",
        body : JSON.stringify({
          file : that.gljsdocumentToImport,
          category : jQuery('#gl-js-import-category').val()
        })
      }).then(resp => resp.json()).then(response => {
        jQuery('#gl-js-import-result span').html(response.count);
        jQuery('#gl-js-import-result').fadeIn();
      })
    } else {
      window.alert(window.mapster_settings.strings["Please Upload"]);
    }
  }

  createNewTileset() {}
  selectExistingTileset() {}
  updateTileset() {}

  exportMapster() {}
  uploadMapster(e) {}
  importMapster() {}

  verifyCSV() {}
  doCSVImport() {}

  init() {
    let that = this;
    that.setUpgradeMessage();
    jQuery(document).on('change', '#geojson-import-file', function(e) {
      that.geoJSONUploaded(e);
    })
    jQuery(document).on('change', '#gl-js-import-file', function(e) {
      that.glJSgeoJSONUploaded(e);
    })
    jQuery(document).on('change', '#geojson-import-category', function(e) {
      that.currentImportCategory = jQuery('#geojson-import-category').val()
    })
    jQuery(document).on('change', '#csv-import-category', function(e) {
      that.currentImportCategory = jQuery('#csv-import-category').val()
    })
    jQuery(document).on('click', '#geojson-import-button', function() {
      that.doGeoJSONImport();
    })
    jQuery(document).on('click', '#gl-js-import-button', function() {
      that.doGLJSImport();
    })

    jQuery(document).on('click', '#export-mapster-installation', function() {
      that.exportMapster();
    })
    jQuery(document).on('change', '#upload-mapster-installation', function(e) {
      that.uploadMapster(e);
    })
    jQuery(document).on('click', '#import-mapster-installation', function() {
      that.importMapster();
    })

    jQuery(document).on('click', '#existing-tileset-source', function() {
      that.selectExistingTileset();
    })
    jQuery(document).on('click', '#new-tileset-source', function() {
      that.createNewTileset();
    })
    jQuery(document).on('click', '#update-tileset-source-button', function() {
      that.updateTileset();
    })

    jQuery(document).on('click', '#mapster-csv-verify', function() {
      that.verifyCSV();
    })

    jQuery(document).on('click', '#mapster-csv-import', function() {
      that.doCSVImport();
    })

    jQuery(document).on('click', '.nav-tab', function() {
      jQuery(this).siblings().each(function() {
        jQuery(this).removeClass('nav-tab-active');
      })
      jQuery(this).addClass('nav-tab-active');
      jQuery(this).parent().siblings().each(function() {
        if(jQuery(this).hasClass('nav-box')) {
          jQuery(this).removeClass('nav-box-active');
        }
      })
      jQuery('#' + jQuery(this).attr('id') + '-options').addClass('nav-box-active');
    })
  }

}

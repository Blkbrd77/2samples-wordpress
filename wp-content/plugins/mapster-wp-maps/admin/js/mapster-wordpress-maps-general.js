(function( $ ) {
	'use strict';

  $(document).on('click', '.mapster-duplicate', function() {
    fetch(window.mapster_general.rest_url + 'mapster-wp-maps/duplicate', {
      headers : {
        'X-WP-Nonce' : window.mapster_general.nonce,
        'Content-Type' : 'application/json'
      },
      method : "POST",
      body : JSON.stringify({
        id : $(this).attr('id').replace('mapster-', '')
      })
    }).then(resp => resp.json()).then(response => {
      window.location.reload();
    })
  })

	let optionsFetched = false
	let post_data = []
	// Done on mouseover because it won't fire on click when it opens a thickbox
	$(document).on('mouseover', '#mapster-csv-export-modal-open', function() {
		if(!optionsFetched) {
	    fetch(window.mapster_general.rest_url + 'mapster-wp-maps/csv-export-options', {
	      headers : {
	        'X-WP-Nonce' : window.mapster_general.nonce,
	        'Content-Type' : 'application/json'
	      },
	      method : "GET"
	    }).then(resp => resp.json()).then(response => {
				post_data = response.post_data
				let fields = []
				response.post_data.forEach(post => {
					for(let field in post) {
						if(fields.indexOf(field) === -1) {
							fields.push(field);
						}
					}
				})
				let html = `<ul class="mapster-checkbox-ul">`;
				let number = 0;
				fields.forEach((field, index) => {
					let showField = !response.settings || response.settings.indexOf(field) > -1;
					if(index % 10 === 0 && index !== 0) {
						html += '</ul><ul class="mapster-checkbox-ul">'
					}
					html += `<li><input id="mapster-post-field-${field}" type='checkbox' ${showField ? "checked='checked'" : ""} data-field="${field}" /> ${field}</li>`;
				})
				html += '</ul>'
				$('#mapster-csv-export-modal-content').html(html)
			});
		}
		optionsFetched = true
	})

	$(document).on('click', '#mapster-csv-export-select-all', function() {
		$('.mapster-checkbox-ul input').prop('checked', true);
	});

	$(document).on('click', '#mapster-csv-export-select-none', function() {
		$('.mapster-checkbox-ul input').prop('checked', false);
	});

	$(document).on('click', '#mapster-wp-user-sub-save-options', function() {
		let checkedCheckboxes = []
		$('.mapster-checkbox-ul li input').each(function() {
			let thisField = $(this).data('field');
			if($(this).is(':checked')) {
				checkedCheckboxes.push(thisField);
			}
		})
    fetch(window.mapster_general.rest_url + 'mapster-wp-maps/csv-export-options-save', {
      headers : {
        'X-WP-Nonce' : window.mapster_general.nonce,
        'Content-Type' : 'application/json'
      },
      method : "POST",
			body : JSON.stringify({
				checkedCheckboxes : checkedCheckboxes
			})
    }).then(resp => resp.json()).then(response => {
			console.log(response)
		});
	})

  $(document).on('click', '#mapster-wp-user-sub-export', function() {
		// Looping to check checkboxes
  	let curatedPostData = []
		post_data.forEach(post => {
			let postCopy = JSON.parse(JSON.stringify(post))
			for(let field in postCopy) {
				if(!$(CSS.escape(`#mapster-post-field-${field}`)).is(":checked")) {
					delete postCopy[field];
				}
			}
			curatedPostData.push(postCopy);
		})
		// Creating CSV
		const items = curatedPostData
		const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
		const header = Object.keys(items[0])
		const csv = [
		  header.join(','), // header row first
		  ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
		].join('\r\n').replace(/\\"/g, '""')

		let blob = new Blob([csv], { type: 'text/csv' });
		var blobUrl = URL.createObjectURL(blob);
		var link = document.createElement("a"); // Or maybe get it from the current document
		link.href = blobUrl;
		link.download = "User-Submissions.csv";
		document.body.appendChild(link);
		link.click();
  })

  $(document).on('change', '.mapster-submission-value', function() {
    let thisVal = $(this).is(':checkbox') ? $(this).is(':checked') : $(this).val();
    let thisID = $(this).attr('id');
    $('#' + thisID + '-val').html(thisVal);
  });
  $(document).on('keyup', '.mapster-submission-value', function() {
    let thisVal = $(this).is(':checkbox') ? $(this).is(':checked') : $(this).val();
    let thisID = $(this).attr('id');
    $('#' + thisID + '-val').html(thisVal);
  });

	$(document).on('mouseover', '.mapster-shortcode-help', function(e) {
    var left  = e.clientX  + 10 + "px";
    var top  = e.clientY  + 10 + "px";
    var div = document.getElementById('mapster-shortcode-help-text');
    div.style.left = left;
    div.style.top = top;
    $("#mapster-shortcode-help-text").toggle();
	})
	$(document).on('mouseout', '.mapster-shortcode-help', function(e) {
		$("#mapster-shortcode-help-text").hide();
	});

})( jQuery );


  jQuery(document).ready(function($){

        // Initialize an empty map without layers (invisible map)
        var map = L.map('map-hidden', {
            center: [40.7259, -73.9805], // Map loads with this location as center
            zoom: 12,
            scrollWheelZoom: true,
            zoomControl: false,
            attributionControl: false,
        });

        //Geocoder options
        var geocoderControlOptions = {
            params: {
              countrycodes: 'US',    //Filter results based on coutry code
              tag : 'place:*'
            },
            bounds: false,          //To not send viewbox
            markers: false,         //To not add markers when we geocoder
            attribution: null,      //No need of attribution since we are not using maps
            expanded: true,         //The geocoder search box will be initialized in expanded mode
            panToPoint: false,      //Since no maps, no need to pan the map to the geocoded-selected location
            placeholder: 'Type here to find property...',   //Placeholder text for the search box div
        }

        //Initialize the geocoder 
        var geocoderControl = new L.control.geocoder('pk.YOUR_API_PK_KEY_HERE', geocoderControlOptions).addTo(map).on('select', function (e) {
            // console.log(e.feature.feature);
            storeValues(e.feature.feature.display_name, e.latlng.lat, e.latlng.lng, e.feature.feature.display_place, e.feature.feature.address.city, e.feature.feature.address.state);
        });

        //Get the "search-box" div
        var searchBoxControl = document.getElementById("search-box");
        //Get the geocoder container from the leaflet map
        var geocoderContainer = geocoderControl.getContainer();
        //Append the geocoder container to the "search-box" div
        searchBoxControl.appendChild(geocoderContainer);        

        //Store the geocoding responses in localStorage session variables
        function storeValues(display_name, lat, lng, display_place, city, state) {

            jQuery('.error-message-location').removeClass('fadeInUp');

     //        localStorage.setItem("lat_inner", lat); 
     //        localStorage.setItem("lon_inner", lng);
     //        localStorage.setItem("full_address", display_name);
     //        if (typeof city !== 'undefined') {
     //          localStorage.setItem("city", city);
     //          localStorage.removeItem("state");
     //        } else {
     //          localStorage.setItem("state", state);
     //          localStorage.removeItem("city");
     //        }

     		// console.log(localStorage.getItem("lat_inner"));
		  	// console.log(localStorage.getItem("lon_inner"));
		  	// console.log(localStorage.getItem("full_address"));
		  	// console.log(localStorage.getItem("city"));
		  	// console.log(localStorage.getItem("state"));

        }

    function onLocationFound(e) {
      localStorage.setItem("lat_inner", e.latitude); 
      localStorage.setItem("lon_inner", e.longitude);
      map.stopLocate();
      window.location = '/search-houses-map';
    }

    function onLocationError(e) {
      window.location = '/search-houses-map';
    }

    jQuery('#search-box .leaflet-locationiq-input').on("input", function(){
    	jQuery('.error-message-location').removeClass('fadeInUp');
		localStorage.removeItem("lat_inner"); 
		localStorage.removeItem("lon_inner");
		localStorage.removeItem("full_address");
		localStorage.removeItem("city");
		localStorage.removeItem("state");
    });

    // jQuery('#search-box .leaflet-locationiq-input').on('blur', function(){
    //   jQuery('.leaflet-locationiq-results').hide();
    // });


	jQuery(document).click(function(event) {
	    if ( !jQuery(event.target).hasClass('leaflet-locationiq-results') && !jQuery(event.target).hasClass('leaflet-locationiq-input')) {
	        jQuery('.leaflet-locationiq-results').hide();
	    }
	});

  jQuery('#search-box .leaflet-locationiq-input').click(function() {
    jQuery(".leaflet-locationiq-search-icon")[0].click();
  });

    jQuery( ".locationiq-home #search-submit" ).on( "click", function() {

    // 	console.log('----- ON Submit -----');
	  	// console.log(localStorage.getItem("lat_inner"));
	  	// console.log(localStorage.getItem("lon_inner"));
	  	// console.log(localStorage.getItem("full_address"));
	  	// console.log(localStorage.getItem("city"));
	  	// console.log(localStorage.getItem("state"));
	  	// console.log('----- ------ -----');

      $('#search-submit .fas').removeClass('fa-search').addClass('fa-sync-alt spinner-effect');

      if(jQuery.trim(jQuery('#search-box .leaflet-locationiq-input').val()) == '') {
        // Input is empty
        $('#search-submit .fas').removeClass('fa-sync-alt spinner-effect').addClass('fa-search');
        map.locate({setView: true, maxZoom: 16, watch: false}).on('locationfound', onLocationFound).on('locationerror', onLocationError);
      } else {
      	const input_val = jQuery('#search-box .leaflet-locationiq-input').val();
        // Input is not empty and user hasnt selected something from the dropdown
        if (localStorage.getItem("lat_inner") === null || localStorage.getItem("lon_inner") === null || localStorage.getItem("full_address") === null || localStorage.getItem("city") === null) {

          // console.log('select option');
          // jQuery(".leaflet-locationiq-search-icon")[0].click();

          const response = fetch(`https://us1.locationiq.com/v1/search.php?key=YOUR_API_PK_KEY_HERE&q=${input_val}&format=json&addressdetails=1&limit=1&countrycodes=US`)
		  .then(response => response.json())
		  .then(data => { 
		  	//console.log(data);

		  	localStorage.setItem("lat_inner", data[0].lat); 
            localStorage.setItem("lon_inner", data[0].lon);
            localStorage.setItem("full_address", data[0].display_name);

		  	if(data[0].address.hasOwnProperty('city')) {
		  		localStorage.setItem("city", data[0].address.city);
		  		//console.log('Has City: ' + data[0].address.city);

		  	} else {
		  		localStorage.setItem("state", data[0].address.state);
		  		//console.log('NO CITY but state is: ' + data[0].address.state);
		  	}

		  	// console.log('----- After Check 1 -----');
		  	// console.log(localStorage.getItem("lat_inner"));
		  	// console.log(localStorage.getItem("lon_inner"));
		  	// console.log(localStorage.getItem("full_address"));
		  	// console.log(localStorage.getItem("city"));
		  	// console.log(localStorage.getItem("state"));
		  	// console.log('----- ------ -----');
        $('#search-submit .fas').removeClass('fa-sync-alt spinner-effect').addClass('fa-search');
		  	if(localStorage.getItem("city") !== null) {
        		window.location = '/search-houses-map?' + "city=" + localStorage.getItem("city");
        	} else if(localStorage.getItem("state") !== null) {
        		window.location = '/search-houses-map?' + "state=" + localStorage.getItem("state");
        	} else {
        		window.location = '/search-houses-map';
        	}
		  	
		  })
		  .catch(err => {
		  	console.log('An error occured: ' + err);
        $('#search-submit .fas').removeClass('fa-sync-alt spinner-effect').addClass('fa-search');
		  	jQuery('.error-message-location').addClass('fadeInUp');
		  });

        }
        // User has selected something from the dropdown
        else {

     //    	console.log('----- After Check 2 -----');
		  	// console.log(localStorage.getItem("lat_inner"));
		  	// console.log(localStorage.getItem("lon_inner"));
		  	// console.log(localStorage.getItem("full_address"));
		  	// console.log(localStorage.getItem("city"));
		  	// console.log(localStorage.getItem("state"));
		  	// console.log('----- ------ -----');
          $('#search-submit .fas').removeClass('fa-sync-alt spinner-effect').addClass('fa-search');
        	if(localStorage.getItem("city") !== null) {
        		window.location = '/search-houses-map?' + "city=" + localStorage.getItem("city");
        	} else if(localStorage.getItem("state") !== null) {
        		window.location = '/search-houses-map?' + "state=" + localStorage.getItem("state");
        	} else {
        		window.location = '/search-houses-map';
        	}
        }
      }

    });

    map_init();

  });

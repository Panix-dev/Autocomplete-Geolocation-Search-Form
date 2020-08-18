# Autocomplete Geolocation Search Form 

> Sample of the code of a search form with autocomplete results of areas based on the LocationIQ library.

This is part of the code implemented to create an autocomplete search form that shows the results of US-based areas using the LocationIQ library. The user can search by state, area, neighborhood, and Postal Code. The script will display all available results based on the user's input and once the desired option has been selected, he/she will be redirected to a page with some values set to the local storage in order to filter the listings on the search results page.


## Table of Contents


> Try `clicking` on each of the `anchor links` below so you can get redirected to the appropriate section.

- [LocationIQ](#locationiq)
- [Initializing the Geocoder](#initializing-the-geocoder)
- [Search HTML Markup](#search-html-markup)
- [Contact Details](#contact-details)
- [Inspiration](#inspiration)


## LocationIQ

<img src="https://locationiq.com/static/v2/images/logo.png" title="LocationIQ" alt="LocationIQ">

Blazing fast Location APIs. Geocoding, Maps and Routing for everyone • Affordable • Scalable

- :link: [LocationIQ](https://locationiq.com/)


## Initializing the Geocoder


```javascript
//Initialize the geocoder 
var geocoderControl = new L.control.geocoder('YOUR_API_PK_KEY_HERE', geocoderControlOptions).addTo(map).on('select', function (e) {
    // console.log(e.feature.feature);
    storeValues(e.feature.feature.display_name, e.latlng.lat, e.latlng.lng, e.feature.feature.display_place, e.feature.feature.address.city, e.feature.feature.address.state);
});

//Get the "search-box" div
var searchBoxControl = document.getElementById("search-box");
//Get the geocoder container from the leaflet map
var geocoderContainer = geocoderControl.getContainer();
//Append the geocoder container to the "search-box" div
searchBoxControl.appendChild(geocoderContainer);  
```


## Search Form HTML Markup


> The library will recognize the element with id `search-box` and create the markup for the form


```html
<div id="home_page_search">

	<div class="search_container">

		<div class="error-message-location animated animatedFadeInUp">Please enter a valid US address!</div>

		<div class="locationiq-home">

			<div id="map-hidden"></div>
			<div id="search-box"></div>
			<div id="search-submit">
				<i class="fas fa-search"></i>
			</div>

		</div>

	</div>
</div> 
```


## Contact Details


> :computer: [https://pagapiou.com](https://pagapiou.com)

> :email: [hello@pagapiou.com](mailto:hello@pagapiou.com)

> :iphone: [LinkedIn](https://www.linkedin.com/in/agapiou/)

> :iphone: [Instagram](https://www.instagram.com/panos_agapiou/)

> :iphone: [Facebook](https://www.facebook.com/panagiotis.agapiou)


## Inspiration


- **[Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)**

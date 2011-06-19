  var initialLocation;
  var base_location = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
  var browserSupportFlag =  new Boolean();
  var map;

  function resetFormValues(map) {
    $('input#long').val(map.getCenter().lng());
    $('input#lat').val(map.getCenter().lat());    
  }

  function initialize() {
    var myOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);


    // Try W3C Geolocation method (Preferred)
    if(navigator.geolocation) {
      browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(initialLocation);

        var center_circle = {
               strokeColor: "#FF0000",
               strokeOpacity: 1,
               strokeWeight: 1,
               fillColor: "#FF0000",
               fillOpacity: .2,
               radius: 50,
               map: map,
               center: map.getCenter()
             };

         cityCircle = new google.maps.Circle(center_circle);
         google.maps.event.addListener(map, 'bounds_changed', function() {cityCircle.setCenter(map.getCenter());
           resetFormValues(map);
           });
         
      }, function() {
        handleNoGeolocation(browserSupportFlag);
      });
    } else if (google.gears) {
      // Try Google Gears Geolocation
      browserSupportFlag = true;
      var geo = google.gears.factory.create('beta.geolocation');
      geo.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
      }, function() {
        handleNoGeolocation(browserSupportFlag);
      });
    } else {
      // Browser doesn't support Geolocation
      browserSupportFlag = false;
      handleNoGeolocation(browserSupportFlag);
    }
 
    
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      initialLocation = base_location;
      contentString = "Error: The Geolocation service failed.";
    } else {
      initialLocation = base_location;
      contentString = "Error: Your browser doesn't support geolocation";
    }
    map.setCenter(initialLocation);
  }

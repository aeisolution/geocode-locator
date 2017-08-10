// Utility to Geocode Data for Store Locator using Google Geocoding service

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDvR47yOOfBouDg8H7jL-TTik70xtGiDFw'
});

// Geocode an address.
googleMapsClient.geocode({
  address: 'Via Papa Giovanni XXIII, 60, 17031 Albenga, SV, Italy'
}, function(err, response) {
  if (!err) {
    console.dir(response.json.results);
  }
});

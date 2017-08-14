// Utility to Geocode Data for Store Locator using Google Geocoding service
/*
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
*/

// ***************************************
// Impostazione configurazione globale
const cfg = require('./config');

let Filiali = require('./imports/filiali');
let Farmacie = require('./imports/farmacie');

// ---- DB Connection ----
let MongoClient = require('mongodb').MongoClient,
    MONGODB_URI = 'mongodb://' + cfg.db.host + ':' + cfg.db.port + '/' + cfg.db.dbname;

MongoClient.connect(MONGODB_URI, function (err, db) {
    "use strict";
    if (err) throw err;

    //let dataImport = new Filiali(db);
    let dataImport = new Farmacie(db);

    dataImport.getAll()
                 .then(function(data){
                    for(let i=0, len=data.length;i < len; i++) {
                      console.log(i + ' - item:');
                      //console.dir(data[i]);

                      dataImport.getGeocode(data[i],
                                  function(err, response){
                                    dataImport.setGeocode(data[i]._id, response,
                                      function(err, data){
                                        if(err) return console.dir(err);

                                        console.log("callback setGeocode");
                                        console.dir(data.result);
                                      });
                                  });

                   }
                 });
});

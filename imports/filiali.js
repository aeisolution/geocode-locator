const cfg = require('../config');
const ObjectID = require('mongodb').ObjectID;

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDvR47yOOfBouDg8H7jL-TTik70xtGiDFw'
});

module.exports = exports = function(db) {
  "use strict";
  let self = this;
  self.entity = db.collection('filiali');

  self.getAll = function() {
    return new Promise(function(resolve, reject){
      self.entity.find({"geometry": { "$exists": false }})
                 .toArray(function(err, data){
                   if(err)  reject(err);
                   else     resolve(data);
                 });
    });
  };

  self.setGeocode = function(id, res, cb) {
      console.log('Geocode for: ' + id);

      let result = res.pop();
      /*
      console.log('Geometry:')
      console.dir(result.geometry);
      console.log('place_id:')
      console.dir(result.place_id);
      console.log('types:')
      console.dir(result.types);
      */

      self.entity.update({"_id": id },
                        { "$set": {
                            "geometry": result.geometry,
                            "place_id": result.place_id,
                            "types": result.types
                        }},function(err, data){
                          if(err) return cb(err);
                          console.log('document updated');
                          return cb(null, data);
                        });
  };

  self.getGeocode = function(item, cb) {
    var addr = item.indirizzo + ', ' + item.cap + ' ' + item.provincia + ', Italy';
    console.log('-------------------');
    console.log(addr);

    googleMapsClient.geocode({
      address: addr
    }, function(err, response) {
      if (!err) {
        console.dir(response.json.results);
        return cb(null, response.json.results);
      }
    });
  };

};

const request = require('request');
const geoCode = (address,callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaWFubXVnZW55YSIsImEiOiJja2xrYnFwcDUwbG9kMnBvYnZnajNycDQzIn0.xlgfzlq7B1d4IQEGDtZ_ig`;
    request({url,json:true},(err,response)=>{
      if(err){ 
       callback('Please  check your connection', undefined)
      }
      else{
       callback(undefined, {
         long:response.body.features[0].center[0],
         lat:response.body.features[0].center[1]
       })      
      }
    })
 }
 
 module.exports = geoCode;
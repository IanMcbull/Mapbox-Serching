const request = require('request');
const getWeather = (lat,long,callback) =>{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly&units=metric&appid=530ba79edcfe27707be3ef88a091520d`;
    request({url,json:true},(err,data)=>{
    if(err){ 
      callback('Please check your connection',undefined)
    }else{
      callback(undefined,{
          desc: data.body.current.weather[0].description,
          timezone: data.body.timezone,
          temp:data.body.current.temp,
          humidity:data.body.current.humidity,
          lat:data.body.lat,
          long:data.body.lon
      }
      )
    }
  })
  }

  module.exports = getWeather;
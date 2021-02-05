const express = require('express');
const app = express();
const port = process.env.PORT || 4400;
const path = require('path');
const geocode = require('./utils/geocode');
const getWeather = require('./utils/getWeather');
//get the static webpage
app.use(express.static(path.join(__dirname,'public')));

app.get('/weather',(req,res)=>{
    if(!req.query.location){
       res.send({
           weather:'please provide a location'
       })
    }else{
        geocode(req.query.location,(err,data)=>{
            if(err){
              return res.send({
                 message:'Something went wrong with geocode'
               })
            }else{
              getWeather(data.lat,data.long,(err,response)=>{
                if(err){
                return res.send({
                   message:"something went wrong with get weather"
                 })
                }else{
                  console.log(response.desc)
                  console.log(req.query.location)
                  res.send({
                    Location: req.query.location,
                    forecast: `${response.desc}`,
                    timezone:`${response.timezone}`,
                    temp:`${response.temp}`,
                    humidity:`${response.humidity}`,
                    lat:`${response.lat}`,
                    long:`${response.long}`
                  });        
                }
              })
            }
          })        
    }
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})
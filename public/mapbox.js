mapboxgl.accessToken = 'pk.eyJ1IjoiaWFubXVnZW55YSIsImEiOiJja2s2bWluZWswNWYzMm9wYmNpMjNnejI1In0.yV-AIxNvNkzay7hgcYjoXw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/ianmugenya/ckki4076s0iij17nwulwibawu', // stylesheet location
center: [150.5, 60], // starting position [lng, lat]
zoom: 8 // starting zoom
});


function clearFields(){
    document.querySelector('#location').value = '';
}

document.querySelector('.form').addEventListener('submit',(e)=>{
 e.preventDefault();
let location = document.querySelector('#location').value
fetch(`/weather?location=${location}`).then(res=>{
      return res.json()
    }).then(data=>{
      const card = document.querySelector('.card');
      let card_header = document.querySelector('.card-header');
      let weather = document.querySelector('.weather');
      let timezone = document.querySelector('.timezone');
      let temp = document.querySelector('.temp');
      let humidity = document.querySelector('.humidity');
    card_header.innerHTML = data.Location;
    weather.innerHTML = `<i class="fas fa-smog fa-2x"></i>  Forecast: ${data.forecast}`;
    timezone.innerHTML = `<i class="far fa-clock fa-2x"></i> Timezone: ${data.timezone}`;
    temp.innerHTML = `<i class="fas fa-temperature-low fa-2x"></i> Temperature: ${data.temp}° C`;
    humidity.innerHTML = `<i class="fas fa-thermometer-full fa-2x"></i> Humidity: ${data.humidity}`

    card.style.visibility = 'visible';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ianmugenya/ckki4076s0iij17nwulwibawu', // stylesheet location
      center: [data.long, data.lat], // starting position [lng, lat]
      zoom: 10 // starting zoom
      });
      var marker = new mapboxgl.Marker()
     .setLngLat([data.long, data.lat])
    .addTo(map);
    document.getElementById('submit').addEventListener('click', function () {
      // Fly to a random location by offsetting the point -74.50, 40
      // by up to 5 degrees.
      map.flyTo({
      center: [
      Number(data.long) + (Math.random() - 0.5) * 10,
      Number(data.lat) + (Math.random() - 0.5) * 10
      ],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
      });
    }).catch(err=>{
      return{
        "message": "something went wrong"
      }
    })
})



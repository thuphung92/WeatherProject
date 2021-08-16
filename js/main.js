const APIKEY = '5e6d915a8be4c7b572f373743a2c4e28';
const kelvinToFarenheit = (K) => ((K-273.15)*1.8)+32;
const today = new Date().toLocaleString();

const city = document.querySelector('.loc');
const icon = document.querySelector('.icon');
const temp = document.querySelector('.temp-value p');
const desc = document.querySelector('.temp-desc p');
const date = document.querySelector('.date');
const minMax = document.querySelector('.min-max p');

const button = document.getElementById('button').addEventListener('click', (event) => getLocation (event));

function getLocation (event) {
    event.preventDefault();
    const city = document.getElementsByName('city')[0].value;
    console.log(`City Name: ${city}`);
    getWeather(city); // API call to get weather info
}


function getWeather(city) {
    const result = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`, headers={Authorization: APIKEY})
                    .then((response) => {let data = response.json(); return data})
                    .then((data) => getInfo(data))
                    .catch((error) => alert(error))
        
};


// Add info to weather list + display info
function getInfo (data){
    //get info
    const weather = {}
    weather['temp'] = Math.round(kelvinToFarenheit(data.main.temp));
    weather['tempMin'] = Math.round(kelvinToFarenheit(data.main.temp_min));
    weather['tempMax'] = Math.round(kelvinToFarenheit(data.main.temp_max));
    weather['city'] = data.name;
    weather['icon'] = data.weather[0].icon;
    weather['desc'] = data.weather[0].description

    //display info
    city.innerHTML = `${weather.city}`;
    icon.innerHTML = `<img src="icons/${weather.icon}.png">`;
    temp.innerHTML = `${weather.temp}°F`;
    desc.innerHTML = `${weather.desc}`;
    date.innerHTML = `${today}`;
    minMax.innerHTML = `H:${weather.tempMin}° <span>-</span> L:${weather.tempMax}°`;
};








const APIKEY = '5e6d915a8be4c7b572f373743a2c4e28';
const kelvinToFarenheit = (K) => ((K-273.15)*1.8)+32;

const city = document.querySelector('.loc');
const icon = document.querySelector('.icon');
const temp = document.querySelector('.temp-value p');
const desc = document.querySelector('.temp-desc p');
const minMax = document.querySelector('.min-max p');

//const input = document.querySelector('#input');
//console.log(input);

const button = document.getElementById('button').addEventListener('click',console.log('clicked')); // just for testing if the button works, replace by getLocation later

function getLocation (event) {
    let city = document.getElementsByName('city')[0].value; // need to fixed to get what typed in later
    console.log(`City Name: ${city}`);
    getWeather(city); // API call to get weather info
}


console.log(getWeather('westminster')) // assign Westminster to test if the other functions work only
const weather = {}
function getWeather(city) {
    const result = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)
                    .then((response) => {let data = response.json(); return data})
                    .then((data) => getInfo(data))
                    .then(() => display())
                    .catch((error) => {console.log(error)})
        
};

// Show error messages

function getInfo (data){
    weather['temp'] = Math.round(kelvinToFarenheit(data.main.temp));
    weather['tempMin'] = Math.round(kelvinToFarenheit(data.main.temp_min));
    weather['tempMax'] = Math.round(kelvinToFarenheit(data.main.temp_max));
    weather['city'] = data.name;
    weather['icon'] = data.weather[0].icon;
    weather['desc'] = data.weather[0].description
};

console.log(weather);

const display = () => {
    city.innerHTML = `${weather.city}`;
    icon.innerHTML = `<img src="icons/${weather.icon}.png">`;
    temp.innerHTML = `${weather.temp}°F`;
    desc.innerHTML = `${weather.desc}`;
    minMax.innerHTML = `H:${weather.tempMin}° <span>-</span> L:${weather.tempMax}°`;
};







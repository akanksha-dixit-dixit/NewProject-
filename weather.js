
document.addEventListener('DOMContentLoaded', getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function setPosition(geoData) {
    getWeatherData({ lat: geoData.coords.latitude, lng: geoData.coords.longitude });
}
const API_KEY = 'f6bd51128b5d32808225f9e63bee2135';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

// const getWeatherData = (locationData) => {
//     fetch(`${WEATHER_API_URL}?lat=${locationData.lat}&lon=${locationData.lng}&appid=${API_KEY}`)
//         .then(function (response) {
//             (response.json())
//             .then((data) => {
//                 console.log(data);
//             }).catch((error) => {
//                 console.log(error);
//             });
//         }).catch( (error) => {
//             console.log('api error ', error);
//         } );
     
// }

let city = document.querySelector('.city');
let temp = document.querySelector('.temp');
let info = document.querySelector('.info');
let humidityInfo = document.querySelector('.humidityInfo')
let visibilityInfo = document.querySelector('.visibilityInfo')
let someInfo = document.querySelector('.someInfo')


// let icon = document.querySelector('.icon');
const setData = (data) => {
    city.textContent = data.name;
    temp.textContent = Math.round(data.main.temp);
    info.textContent = data.weather[0].description;
    // icon.setAttribute('src', `${data.weather[0].icon}`)
    humidityInfo.textContent = Math.round(data.main.humidity)
    visibilityInfo.textContent = formattiming(data.sys.sunrise)
    someInfo.textContent = formattiming(data.sys.sunset)
    

}
function formattiming(time){
    let date = new Date(time * 1000)
    let hour = date.getHours()
    let minute =  date.getMinutes()
    let createdime = `${hour} : ${minute}`
    return createdime

   
}



const getWeatherData = async (locationData) => {
    try {
        let response = await fetch(`${WEATHER_API_URL}?lat=${locationData.lat}&lon=${locationData.lng}&appid=${API_KEY}&units=metric`);
        let repsonseData = await response.json();
        console.log(repsonseData);
        setData(repsonseData);
    } catch(error) {
        console.log('api error ', error);
    }
}


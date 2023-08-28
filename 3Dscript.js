//Helper Functions for getWeatherData()

// Function to fetch weather data
async function fetchWeatherData(cityName) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=fc58d7977c2a4037aab175512232308&q=${cityName}`); 
    const data = await response.json();
    return data;
}

// Function to refine weather data
function refineWeatherData(data) {
    const refinedData = {
        location: {
            city: data["location"]["name"],
            country: data["location"]["country"],
            is_day: data["current"]["is_day"]
        },
        weather: {
            condition: data["current"]["condition"]["text"],
            temperature: data["current"]["temp_c"],
            wind: data["current"]["wind_kph"],
            humidity: data["current"]["humidity"],
            feels_like: data["current"]["feelslike_c"]
        }
    };
    return refinedData;
}


async function getWeatherData(cityName) {
    const data = await fetchWeatherData(cityName);
    const refinedData = refineWeatherData(data)
    return refinedData;
}


const weatherText = document.querySelector('#weather-text')
const cityName = document.querySelector('#cityName')
const locationTag = document.querySelector('#location-text')
const tempText = document.querySelector('#temp-text')
const feelsLikeText = document.querySelector('#feels-like-text')
const windText = document.querySelector('#wind-text')
const humidityText = document.querySelector('#humidity-text')


cityName.addEventListener('keypress', async (event) => {
    if(event.key === "Enter") {
        let cityNameText = cityName.value;
        let data = await getWeatherData(cityNameText).catch(error => alert("City does not exist. Please check spelling."))
        console.log(data)
        weatherText.textContent = `${data["weather"]["condition"]}`
        locationTag.textContent = `${data["location"]["city"]}, ${data["location"]["country"]}`
        tempText.textContent = `${data["weather"]["temperature"]}°C`
        feelsLikeText.textContent = `FEELS LIKE: ${data["weather"]["feels_like"]}°C`
        windText.textContent = `Wind: ${data["weather"]["wind"]} MPH`
        humidityText.textContent = `HUMIDITY: ${data["weather"]["humidity"]}`

    }
})

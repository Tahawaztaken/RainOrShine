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



const cityName = document.querySelector('#cityName')
const pTag = document.querySelector('#data')
const button = document.querySelector('#getData')

button.addEventListener('click', async () => {
    let cityNameText = cityName.value;
    let data = await getWeatherData(cityNameText).catch(err => {
        alert("City does not exist. Please check spelling.")
        console.log(err)
    })
    console.log(data)
    pTag.textContent = data["location"]["city"]
})
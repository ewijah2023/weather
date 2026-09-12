import "./styles.css";

const searchForm = document.getElementById("search-form");
const locationInput = document.getElementById("location-input");
const resultsContainer = document.getElementById("weather-results");
const unitToggle = document.getElementById("unit-toggle");
let currentData = null;
let currentUnit = "C";



const iconMap = {
    "clear-day": "wi-day-sunny",
    "clear-night": "wi-night-clear",
    "partly-cloudy-day": "wi-day-cloudy",
    "partly-cloudy-night": "wi-night-alt-cloudy",
    "cloudy": "wi-cloudy",
    "rain": "wi-rain",
    "showers-day": "wi-day-showers",
    "showers-night": "wi-night-alt-showers",
    "thunder-rain": "wi-thunderstorm",
    "thunder-showers-day": "wi-day-thunderstorm",
    "snow": "wi-snow",
    "snow-showers-day": "wi-day-snow",
    "wind": "wi-strong-wind",
    "fog": "wi-fog",
};

unitToggle.addEventListener("click", () => {
    currentUnit = currentUnit === "C" ? "F" : "C";
    unitToggle.textContent = currentUnit ===  "C" ? "Switch to °F" : "Switch to °C";

    if (currentData) {
        renderWeather(currentData, resultsContainer, currentUnit);
    }
});

async function getWeatherData(location) {
    const apiKey = process.env.API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Weather data fetch failed: ${response.status}`);
    }

    const data = await response.json();
    return data

}

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const location = locationInput.value;

    resultsContainer.textContent = "Loading...";

    try {
        const data = await getWeatherData(location);
        currentData = data;
        renderWeather(currentData, resultsContainer, currentUnit);
    } catch (error) {
        console.error(error)
        resultsContainer.textContent = "Could not find weather for that location. Please try again."
    }
});

function renderWeather(data, container, unit) {
    container.innerHTML =  "";

    const convert = (celsius) => unit === "F" ? celsiusToFahrenheit(celsius).toFixed(1) : celsius;
    const unitLabel = unit === "F" ? "°F" : "°C";

    const location = document.createElement("h2");
    location.textContent = capitalizeWords(data.resolvedAddress);

    const currentTemp = document.createElement("p");
    currentTemp.textContent = `Temperature: ${convert(data.currentConditions.temp)}${unitLabel}`;

    const feelsLike = document.createElement("p");
    feelsLike.textContent = `Feels like: ${convert(data.currentConditions.feelslike)}${unitLabel}`

    const conditions = document.createElement("p");
    conditions.textContent = `Conditions: ${data.currentConditions.conditions}`

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`

    const highLow = document.createElement("p");
    highLow.textContent = `High: ${convert(data.days[0].tempmax)}${unitLabel}  / Low: ${convert(data.days[0].tempmin)}${unitLabel}`

    const iconClass = iconMap[data.currentConditions.icon] || "wi-na";
    
    const icon = document.createElement("i");
    icon.className = `wi ${iconClass}`;

    container.appendChild(location);
    container.appendChild(icon);
    container.appendChild(currentTemp);
    container.appendChild(feelsLike);
    container.appendChild(conditions);
    container.appendChild(humidity);
    container.appendChild(highLow);

};

function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
};

function capitalizeWords(str) {
    return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}





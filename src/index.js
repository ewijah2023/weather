import "./styles.css";

const searchForm = document.getElementById("search-form");
const locationInput = document.getElementById("location-input");
const resultsContainer = document.getElementById("weather-results");




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

    try {
        const data = await getWeatherData(location);
        renderWeather(data, resultsContainer);
        console.log(data);
    } catch (error) {
        console.error(error)
        resultsContainer.textContent = "Could not find weather for that location. Please try again."
    }
});

function renderWeather(data, container) {
    container.innerHTML =  "";

    const location = document.createElement("h2");
    location.textContent = data.resolvedAddress;

    const currentTemp = document.createElement("p");
    currentTemp.textContent = `Temperature: ${data.currentConditions.temp}°C`

    const feelsLike = document.createElement("p");
    feelsLike.textContent = `Feels like: ${data.currentConditions.feelslike}°C`

    const conditions = document.createElement("p");
    conditions.textContent = `Conditions: ${data.currentConditions.conditions}°C`

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.currentConditions.humidity}°C`

    const highLow = document.createElement("p");
    highLow.textContent = `High: ${data.days[0].tempmax}°C  / Low: ${data.days[0].tempmin}°C`

    container.appendChild(location);
    container.appendChild(currentTemp);
    container.appendChild(feelsLike);
    container.appendChild(conditions);
    container.appendChild(humidity);
    container.appendChild(highLow);

}
import "./styles.css";


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

(async () => {
    const data = await getWeatherData("London");
    console.log(data);
})();

console.log("Weather app starting...");
console.log("API_KEY loaded:", process.env.API_KEY);
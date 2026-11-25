async function getWeather() {
    let city = document.getElementById("city").value.trim();
    let result = document.getElementById("result");

    if (city == "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    result.innerHTML = "Loading...";

    try {
        // Get city coordinates
        let url = "https://geocoding-api.open-meteo.com/v1/search?name="
                  + encodeURIComponent(city) + "&count=1";

        let response = await fetch(url);
        let data = await response.json();

        if (!data.results) {
            result.innerHTML = "City not found!";
            return;
        }

        let lat = data.results[0].latitude;
        let lon = data.results[0].longitude;

        // Get weather details
        let weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;

        let weatherResponse = await fetch(weatherURL);
        let weather = await weatherResponse.json();

        let current = weather.current;

        result.innerHTML = `
            <h3>${data.results[0].name}</h3>
            <p>Temperature: ${current.temperature_2m} °C</p>
            <p>Humidity: ${current.relative_humidity_2m}%</p>
            <p>Weather Code: ${current.weather_code}</p>
        `;

    } catch (error) {
        result.innerHTML = "Unable to fetch weather data!";
    }
}
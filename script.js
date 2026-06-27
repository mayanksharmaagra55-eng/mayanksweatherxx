const apiKey = "21296c6834c606ceae2aa7d0fd0b01c4";

document.getElementById("cityInput").addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        getWeather();
    }
});

async function getWeather(){
    const city = document.getElementById("cityInput").value.trim();

    if(city===""){
        alert("Enter city name");
        return;
    }

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try{
        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        if(weatherData.cod != 200){
            alert("City not found");
            return;
        }

        document.getElementById("temp").innerHTML =
            `🌡 Temperature: ${weatherData.main.temp} °C`;

        document.getElementById("humidity").innerHTML =
            `💧 Humidity: ${weatherData.main.humidity}%`;

        document.getElementById("wind").innerHTML =
            `🌬 Wind: ${weatherData.wind.speed} km/h`;

        document.getElementById("weather").innerHTML =
            `☀ Weather: ${weatherData.weather[0].main}`;

        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        let forecastHTML = "";
        for(let i=0; i<forecastData.list.length; i+=8){
            let day = forecastData.list[i];
            let date = new Date(day.dt_txt).toLocaleDateString('en-US',{weekday:'short'});

            forecastHTML += `
                <div class="card">
                    ${date}<br>
                    ${day.weather[0].main}<br>
                    ${day.main.temp}°C
                </div>
            `;
        }

        document.getElementById("forecastGrid").innerHTML = forecastHTML;

        if(weatherData.weather[0].main.toLowerCase().includes("rain")){
            document.getElementById("alertBox").innerHTML =
                "⚠ Heavy rain possible. Carry umbrella.";
        } else {
            document.getElementById("alertBox").innerHTML =
                "✅ Weather looks normal.";
        }

    } catch(error){
        console.log(error);
        alert("Error fetching weather");
    }
}
const apiKey = '0af3fdd828f04012ad932ff5c72c1e71';  
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const geolocationButton = document.getElementById('geolocation-button');
const errorMessage = document.getElementById('error-message');
const currentWeather = document.getElementById('current-weather');
const airQuality = document.getElementById('air-quality');
const forecastContainer = document.getElementById('forecast-container');

const lastSearchedCity = localStorage.getItem('lastSearchedCity');
if (lastSearchedCity) {
    cityInput.value = lastSearchedCity;
    getWeatherData(lastSearchedCity);
}

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
        localStorage.setItem('lastSearchedCity', city);
    }
});

geolocationButton.addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherDataByCoords(lat, lon);
        }, () => {
            showError("Unable to retrieve your location");
        });
    } else {
        showError("Geolocation is not supported by your browser");
    }
});

function getWeatherData(city) {
    showLoading();
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?q=${city}&appid=${apiKey}`;

    Promise.all([
        fetch(weatherUrl).then(response => response.json()),
        fetch(forecastUrl).then(response => response.json()),
        fetch(airQualityUrl).then(response => response.json())
    ])
    .then(([weatherData, forecastData, airQualityData]) => {
        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
        displayAirQuality(airQualityData);
        hideLoading();
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        showError('Error fetching weather data. Please try again.');
        hideLoading();
    });
}

function getWeatherDataByCoords(lat, lon) {
    showLoading();
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    Promise.all([
        fetch(weatherUrl).then(response => response.json()),
        fetch(forecastUrl).then(response => response.json()),
        fetch(airQualityUrl).then(response => response.json())
    ])
    .then(([weatherData, forecastData, airQualityData]) => {
        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
        displayAirQuality(airQualityData);
        hideLoading();
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        showError('Error fetching weather data. Please try again.');
        hideLoading();
    });
}

function displayCurrentWeather(data) {
    currentWeather.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" class="weather-icon">
        <div class="temperature">${Math.round(data.main.temp)}°C</div>
        <div class="description">${data.weather[0].description}</div>
        <div class="weather-details">
            <div class="weather-detail">
                <i class="fas fa-tint"></i>
                <p>Humidity</p>
                <p>${data.main.humidity}%</p>
            </div>
            <div class="weather-detail">
                <i class="fas fa-wind"></i>
                <p>Wind Speed</p>
                <p>${data.wind.speed} m/s</p>
            </div>
            <div class="weather-detail">
                <i class="fas fa-compress-arrows-alt"></i>
                <p>Pressure</p>
                <p>${data.main.pressure} hPa</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';
    const temps = [];
    const labels = [];
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    dailyData.forEach(day => {
        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-card', 'fade-in');
        forecastDay.innerHTML = `
            <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', {weekday: 'short'})}</p>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}" class="weather-icon">
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${day.weather[0].description}</p>
        `;
        forecastContainer.appendChild(forecastDay);

        temps.push(day.main.temp);
        labels.push(new Date(day.dt * 1000).toLocaleDateString('en-US', {weekday: 'short'}));
    });

    renderForecastChart(labels, temps);
}

function renderForecastChart(labels, temps) {
    const ctx = document.getElementById('forecast-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function displayAirQuality(data) {
    const aqi = data.list[0].main.aqi;
    const aqiLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    airQuality.innerHTML = `
        <h2>Air Quality</h2>
        <div class="temperature">${aqiLevels[aqi - 1]}</div>
        <div class="weather-details">
            <div class="weather-detail">
                <i class="fas fa-smog"></i>
                <p>PM2.5</p>
                <p>${data.list[0].components.pm2_5.toFixed(2)}</p>
            </div>
            <div class="weather-detail">
                <i class="fas fa-radiation"></i>
                <p>NO2</p>
                <p>${data.list[0].components.no2.toFixed(2)}</p>
            </div>
            <div class="weather-detail">
                <i class="fas fa-sun"></i>
                <p>O3</p>
                <p>${data.list[0].components.o3.toFixed(2)}</p>
            </div>
        </div>
    `;
}

function showError(message) {
    errorMessage.textContent = message;
}

function showLoading() {
    errorMessage.innerHTML = '<p class="loading">Loading weather data...</p>';
}

function hideLoading() {
    errorMessage.textContent = '';
}

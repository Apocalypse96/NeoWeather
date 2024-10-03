# 🌦️ NeoWeather - Advanced Weather Dashboard

**NeoWeather** is an interactive and dynamic weather dashboard that provides current weather conditions, air quality index, and a 5-day weather forecast for any city around the globe. It also displays a temperature trend using Chart.js for a visual representation of weather data over time.

## 🖼️ Project Overview

- **Real-time weather data**: Get up-to-date weather information using the OpenWeatherMap API.
- **Air Quality Index**: View detailed air quality data for your location.
- **5-Day Forecast**: Provides daily weather forecasts for the next five days.
- **Temperature Trend Chart**: Visualizes temperature variations over the forecast period using Chart.js.
- **Geolocation**: Automatically fetches weather data for your current location using the browser's geolocation feature.
- **City Search**: Easily search for any city in the world and get weather updates.

## 🎥 Live Demo

Check out the live version of NeoWeather [Link](https://apocalypse96.github.io/NeoWeather/).

---

## 🚀 Features

- **City Search**: Enter any city name to fetch the current weather and forecast for that location.
- **Geolocation**: Click on the geolocation button to retrieve the weather for your current location automatically.
- **Air Quality Index (AQI)**: View the air quality levels for the selected city with detailed pollutant information (PM2.5, NO2, O3, etc.).
- **5-Day Forecast**: Displays the temperature, weather condition, and icon for the next five days.
- **Dynamic Temperature Chart**: A temperature trend line shows fluctuations for the next five days using Chart.js.

---

## 🛠️ Installation & Setup

To run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Apocalypse96/NeoWeather.git
   cd NeoWeather
   ```

2. **Set Up API Key**:

   - Create a `config.js` file in the project root.
   - Add your OpenWeatherMap API key to `config.js`:
     ```javascript
     const apiKey = 'your_openweathermap_api_key';
     export default apiKey;
     ```

3. **Run the App**:
   - Simply open the `index.html` file in your browser.

---

## 🔑 API Key Configuration

NeoWeather uses the [OpenWeatherMap API](https://openweathermap.org/api) to retrieve weather data. You'll need to sign up for a free API key:

1. Go to the [OpenWeatherMap](https://openweathermap.org/api) website.
2. Sign up and get your free API key.
3. Create a `config.js` file as explained above to store your API key (this file is ignored in `.gitignore` to keep your API key secure).

---

## 🖼️ Project Structure

```plaintext
├── index.html      # Main HTML file
├── styles.css      # CSS file for styling
├── script.js       # Main JavaScript file
├── config.example.js   # Example config file (replace with your own API key)
├── .gitignore      # Ignore config.js to secure API key
```

---

## 📦 Technologies Used

- **HTML5**: Markup language for creating the project structure.
- **CSS3**: For responsive and interactive styling.
- **JavaScript (ES6+)**: Logic for interacting with the OpenWeatherMap API and rendering data.
- **Chart.js**: For creating dynamic charts to display temperature trends.
- **OpenWeatherMap API**: To fetch real-time weather and air quality data.
- **Geolocation API**: To detect user’s location and show weather data for their current position.

---

## 🌍 Deployment

This project can be deployed easily on any static hosting service like:
- **GitHub Pages**
- **Netlify**
- **Vercel**

To deploy:
1. Upload the project folder to your hosting service.
2. Make sure to properly configure your API key using environment variables if necessary for production.

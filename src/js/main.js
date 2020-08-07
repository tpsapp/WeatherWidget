// Classes

// UI Class: Provides helper functions for accessing and controlling the UI.
// UI.initialize = Initializes the controls on the UI to their default values.
// UI.updateUI = Updates the UI with the information obtained from the weather API.
// UI.changeTemperatureType = Updates the temperature to show either fahrenheit or celsius.
class UI {
    static initialize() {
        // Get the current location of the device
        API.getLocation();
    }

    static updateUI(weatherInfo) {
        // Retrieve the various elements from the DOM so they can be updated
        const locationName = document.querySelector('#locationName');
        const locationIcon = document.querySelector('#locationIcon');
        const temperatureNumber = document.querySelector('#temperatureNumber');
        const temperatureDescription = document.querySelector('#temperatureDescription');

        // Update the location name with the city name returned from the API
        locationName.textContent = weatherInfo.name;
        // Update the img src for the weather icon with the API provided image
        locationIcon.src = `https://openweathermap.org/img/wn/${weatherInfo.weather['0'].icon}@4x.png`;
        // Add an alt tag to the image for accessibility purposes
        locationIcon.alt = weatherInfo.weather['0'].main;
        // Update the temperature with the API provide informaiton converted from kelvin to fahrenheit
        temperatureNumber.textContent = Conversion.kelvinToFahrenheit(weatherInfo.main.temp);
        // Update the weather description with the API provided text
        temperatureDescription.textContent = weatherInfo.weather['0'].description.toUpperCase();
    }

    static changeTemperatureType() {
        // Retrieve the various elements from the DOM so they can be updated
        const temperatureType = document.querySelector('#temperatureType');
        const temperatureNumber = document.querySelector('#temperatureNumber')
        
        // Get the current temperature so it can be converted
        let temperature = document.querySelector('#temperatureNumber').textContent;

        // Check to see if the temperature scale is fahrenheit or celsius
        if (temperatureType.textContent === 'F') {
            // Convert the current fahrenheit temperature to celsius
            temperature = Conversion.fahrenheitToCelsius(temperature);
            // Update the displayed temperature in the UI
            temperatureNumber.textContent = temperature;
            // Change the temperature scale to celsius
            temperatureType.textContent = 'C';
        }
        else {
            // Convert the current celsius temperature to fahrenheit
            temperature = Conversion.celsiusToFahrenheit(temperature);
            // Update the displayed temperature in the UI
            temperatureNumber.textContent = temperature;
            // Change the temperature scale to fahrenheit
            temperatureType.textContent = 'F';
        }
    }
}

// API Class:
// API.getLocation = Get the devices current location from the navigator component
// API.getWeather = Gets the current weather information from the OpenWeatherMap.org api
class API {
    static getLocation() {
        // Check to see if the use of the navigator is available or allowed
        if (navigator.geolocation) {
            // Get the devices current location according to the navigator
            navigator.geolocation.getCurrentPosition((pos) => {
                // Initalize an object to store the position information
                const result = {};
                // Store the latitude and longitude in the object
                result.latitude = pos.coords.latitude;
                result.longitude = pos.coords.longitude;

                // Get the weather information based on the navigator results
                this.getWeather(result);
            })
        }
        else {
            // Get the weather on a default location since the navigator is unavailable
            // Currently uses the coordinates for Nowhere, OK
            this.getWeather({ latitude: 35.159167, longitude: -98.442222 });
        }
    }

    static getWeather(pos) {
        // The API key for OpenWeatherMap.org which can be obtained from signing up for free
        // Replace this with the key obtained from https://home.openweathermap.org/api_keys after you sign up
        const apiKey = 'YouAPIKeyHere';
        // The URL of the API call to OpenWeatherMap.org with the position and API key inserted
        // Documentation can be found at https://openweathermap.org/current
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=${apiKey}`;

        // Fetch the information from the API URL
        fetch(apiURL).then((response) => {
            // Return the JSON stringified version of the API information
            return response.json();
        }).then((data) => {
            // Update the UI with the information obtained from the API
            UI.updateUI(data);
        });
    }
}

// Conversion Class:
// Conversion.kelvinToFahrenheit = Converts a kelvin temperature to fahrenheit.
// Conversion.fahrenheitToCelsius = Converts a fahrenheit temperature to celsius.
// Conversion.celsiusToFahrenheit = Converts a celsius temperature to fahrenheit.
class Conversion {
    static kelvinToFahrenheit(degreesK) {
        // Converts kelvin to fahrenheit and returns the result rounded to the nearest 100th
        // The formula for conversion is F = (K * 9/5) - 459.67
        return Math.round(((degreesK * (9/5)) - 459.67) * 10) / 10;
    }

    static fahrenheitToCelsius(degreesF) {
        // Converts fahrenheit to celsius and returns the result rounded to the nearest 100th
        // The formula for conversion is C = (F -32) * 5/9
        return Math.round((degreesF - 32) * ( 5 / 9) * 10) / 10
    }

    static celsiusToFahrenheit(degreesC) {
        // Converts celsius to fahrenheit and returns the result rounded to the nearest 100th
        // The formula for conversion is F = (C * 9/5) + 32
        return Math.round((degreesC * ( 9 / 5) + 32) * 10) / 10
    }
}

// Events

// Initalize UI on DOM load
document.addEventListener('DOMContentLoaded', UI.initialize);

// Change the temperature scale when the temperature is clicked
document.querySelector('#temperatureDegree').addEventListener('click', UI.changeTemperatureType);
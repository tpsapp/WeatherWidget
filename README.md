# WeatherWidget
A site to display the current weather at your location as retrieved from the OpenWeatherMap.org API.

OpenWeatherMap.org API information can be found at https:*openweathermap.org/current

The main.js has comments for what each function does but below is a list of each class and what it's functions are for.

## Classes

### UI Class

Provides helper functions for accessing and controlling the UI.

* UI.initialize = Initializes the controls on the UI to their default values.
* UI.updateUI = Updates the UI with the information obtained from the weather API.
* UI.changeTemperatureType = Updates the temperature to show either fahrenheit or celsius.

### API Class

Provides helper functions for getting weather information from OpenWeatherMap.

* API.getLocation = Get the devices current location from the navigator component
* API.getWeather = Gets the current weather information from the OpenWeatherMap.org api

### Conversion Class

Provides helper functions for converting between different temperature scales.

* Conversion.kelvinToFahrenheit = Converts a kelvin temperature to fahrenheit.
* Conversion.fahrenheitToCelsius = Converts a fahrenheit temperature to celsius.
* Conversion.celsiusToFahrenheit = Converts a celsius temperature to fahrenheit.

## Events

* Initalize UI on DOM load

    document.addEventListener('DOMContentLoaded', UI.initialize);

* Change the temperature scale when the temperature is clicked

    document.querySelector('#temperatureDegree').addEventListener('click', UI.changeTemperatureType);
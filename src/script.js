// Formated date and time

function showDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${day}, ${hour}:${min}`;
}

// Weather Forecast

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKeyF = "88724523008dc9e1be18f6eb6a959b67";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKeyF}&units=metric`;

  axios.get(`${apiUrlForecast}`).then(dislayForecast);
}

// Search city

function showActualTemp(response) {
  // City
  document.querySelector("h1").innerHTML = response.data.name;
  // Icon
  let icon = response.data.weather[0].icon;
  document
    .querySelector("#icon")
    .setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);

  // Temperature
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  // Weather discription
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].main;
  // humidity
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  // wind
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  celsius = response.data.main.temp;
  getForecast(response.data.coord);
}

function defaultCity(city) {
  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`)
    .then(showActualTemp);
}

function cityFromSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;

  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`)
    .then(showActualTemp);
}

function cityFromLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
    .then(showActualTemp);
}

function navigate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(cityFromLocation);
}

// Units temperature

function showFahrenTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  let fahrTemp = celsius * 1.8 + 32;
  temperature.innerHTML = Math.round(fahrTemp);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(celsius);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function nameDay(daynumber) {
  let date = new Date(daynumber * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function dislayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let tempMax = Math.round(forecastDay.temp.max);
      let tempMin = Math.round(forecastDay.temp.min);
      let icon = forecastDay.weather[0].icon;
      forecastHTML =
        forecastHTML +
        ` 
            <div class="col-2 forecast-block">
            <div class="forecast-day">${nameDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${icon}@2x.png"
              alt=""
              width="42"
            />
            <div class="forecast-temps">
              <span class="forecast-temp-max"> ${tempMax}° </span>
              <span class="forecast-temp-min"> ${tempMin}° </span>
            </div>
          </div>
      `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

// Global var

let apiKey = "e5472a0ed17ff5f3e2802e3b1bb3fa27";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityFromSearch);

let currentLocation = document.querySelector("#current-btn");
currentLocation.addEventListener("click", navigate);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsius = null;

defaultCity("Kyiv");

showDate(new Date());

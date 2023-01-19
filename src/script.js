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
  return `${day}, ${hour}:${min}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = showDate(new Date());

// Search city

function showActualTemp(response) {
  // City
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.name;
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
}
function defaultCity(city) {
  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=${units}`)
    .then(showActualTemp);
}
function cityFromSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;

  axios
    .get(`${apiUrl}q=${city}&appid=${apiKey}&units=${units}`)
    .then(showActualTemp);
}

function cityFromLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`)
    .then(showActualTemp);
}

function navigate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(cityFromLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityFromSearch);

let apiKey = "e5472a0ed17ff5f3e2802e3b1bb3fa27";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

let currentLocation = document.querySelector("#current-btn");
currentLocation.addEventListener("click", navigate);

defaultCity("Kyiv");

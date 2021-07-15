let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthsofYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getCurrentDay(dayNum) {
  if (dayNum > 6) {
    dayNum = dayNum - 7;
  }
  return daysOfWeek[dayNum];
}

function getCurrentMonth(MonthNum) {
  return monthsofYear[MonthNum];
}
function convertFarenheit() {
  let currentTemp = document.querySelector(".current-temp");
  let Ftemp = parseFloat(currentTemp.innerHTML);
  Ftemp = Ftemp * (9 / 5) + 32;
  currentTemp.innerHTML = Ftemp.toFixed(1);
  let unitButton = document.querySelector(".units-button");
  unitButton.innerHTML = "°F";
}

function convertCelcius() {
  let currentTemp = document.querySelector(".current-temp");
  let Ctemp = parseFloat(currentTemp.innerHTML);
  Ctemp = (Ctemp - 32) * (5 / 9);
  currentTemp.innerHTML = Ctemp.toFixed(1);
  let unitButton = document.querySelector(".units-button");
  unitButton.innerHTML = "°C";
}

function changeUnits(event) {
  event.preventDefault();
  let unitButton = document.querySelector(".units-button");
  if (unitButton.innerHTML === "°C") {
    convertFarenheit();
  } else {
    convertCelcius();
  }
}
function displayWeather(response) {
  let newSearchCity = document.querySelector(".search-bar");
  newSearchCity.value = response.data.name;
  let replaceCity = document.querySelector(".location-block .city");
  replaceCity.innerHTML = response.data.name;
  let country = document.querySelector(".location-block .country");
  country.innerHTML = response.data.sys.country;
  let newTemp = document.querySelector(".current-temp");
  let currentTemp = response.data.main.temp;
  newTemp.innerHTML = currentTemp.toFixed(1);
  let newHumidity = document.querySelector(".weather-data .humidity-value");
  newHumidity.innerHTML = response.data.main.humidity;
  let newWeatherDescription = document.querySelector(".search-result");
  console.log(
    response.data.weather[0].main +
      " with " +
      response.data.weather[0].description
  );
  newWeatherDescription.innerHTML =
    response.data.weather[0].main +
    " with " +
    response.data.weather[0].description;
  let weatherIcon = document.querySelector(".page-icon");
  weatherIcon = response.data.weather[0].icon;
  let currentWind = document.querySelector(".wind-value");
  currentWind.innerHTML = response.data.wind.speed;
}

function getWeather(newCity) {
  let units = "metric";
  let apiKey = "4fc9de9420224385e6f3f281435126d7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=${units}&appid=${apiKey}`;
  console.log(`URL is ${apiURL}`);
  if (axios.get(apiURL).then(displayWeather).cod === "404") {
    alert("Error: city not found.");
  }
}

function getCity(event) {
  event.preventDefault();
  let newCity = document.querySelector(".search-bar").value.toLowerCase();
  if (newCity.trim().length === 0) {
    alert("Please enter a city to continue.");
  } else {
    getWeather(newCity);
    /*else {
  let haveCity = false;
  if (!haveCity) {
    haveCity =   getWeather(newCity);
  }
  if (haveCity != true) {
     alert("Sorry, we don't have data on that city.");
  }*/
  }
}
function showWeatherforCurrentPosition(response) {
  let apiKey = "4fc9de9420224385e6f3f281435126d7";
  let units = "metric";
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiURL);
  axios.get(apiURL).then(displayWeather);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showWeatherforCurrentPosition);
}

function getCurrentDate() {
  let currentDate = document.querySelector(".date-block .current-day");
  let currentTime = document.querySelector(".date-block .current-time");
  let currentMonth = document.querySelector(".date-block .current-month");
  let currentYear = document.querySelector(".date-block .current-year");
  let now = new Date();
  currentDate.innerHTML = getCurrentDay(now.getDay());
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  currentTime.innerHTML = now.getHours() + ":" + minutes;
  currentMonth.innerHTML = getCurrentMonth(now.getMonth());
  currentYear.innerHTML = now.getFullYear();

  let todayPlusOne = document.querySelector(".today-plus-one");
  todayPlusOne.innerHTML = getCurrentDay(now.getDay() + 1);
  let todayPlusTwo = document.querySelector(".today-plus-two");
  todayPlusTwo.innerHTML = getCurrentDay(now.getDay() + 2);
  let todayPlusThree = document.querySelector(".today-plus-three");
  todayPlusThree.innerHTML = getCurrentDay(now.getDay() + 3);
  let todayPlusFour = document.querySelector(".today-plus-four");
  todayPlusFour.innerHTML = getCurrentDay(now.getDay() + 4);
  let todayPlusFive = document.querySelector(".today-plus-five");
  todayPlusFive.innerHTML = getCurrentDay(now.getDay() + 5);
}

getCurrentDate();
let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", getCity);

let locationButton = document.querySelector(".current-location-button");
locationButton.addEventListener("click", getLocation);

let unitButton = document.querySelector(".units-button");
unitButton.addEventListener("click", changeUnits);

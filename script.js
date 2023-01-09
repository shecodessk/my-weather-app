// Function for the current Day

function formatDate() {
  let now = new Date();
  let today = now.getDay();
  let dayNames = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayNames[today]
}

let currentDay = document.querySelector(".day-container");
currentDay.innerHTML = formatDate();

// Function for the current time

function formatHour(results) {
  
  let parts = {
    hours: (results.getHours() %12) || 12,
    minute: results.getMinutes().toString().padStart(2,"0"),
    amOrPm: results.getHours() < 12 ? "AM" : "PM"
  };
      return `${parts.hours}:${parts.minute} ${parts.amOrPm}`;
}

let now = new Date();
let time = document.querySelector(".time-container");
time.innerHTML = formatHour(now);

// Function to change F° & C°

function convertToFahrenheit(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#temp-digit-container")
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 75
  }
  function convertToCelsius(event){
    event.preventDefault;
    let temperatureElement = document.querySelector("#temp-digit-container")
    temperatureElement.innerHTML = 35
  }
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);

// Temperature based on city.

function showTemp(response) { 
  console.log(response.data);
  document.querySelector(".title-container").innerHTML = response.data.name;
  document.querySelector("#temp-digit-container").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".title-container").innerHTML = response.data.name;
  document.querySelector("#temp-digit-container").innerHTML = Math.round(response.data.main.temp);
  
}

function search(city) {
  let units = "metric";
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    
  axios.get(apiUrl).then(showTemp); 
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-query").value;
  search(city);
  }

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);

 //Display a default city when page loads. 

 search("san francisco");

 // Current Location Button
 function showCurrentPosition(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let units = "metric";
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let endTail = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${endTail}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    
  axios.get(apiUrl).then(showTemp);
}  

function showGeoTemp() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", showGeoTemp);



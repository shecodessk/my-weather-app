// Function to get the current Day

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let today = now.getDay();
  let dayNames = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let hours = now.getHours(timestamp);
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes(timestamp);
  if (minutes < 10){
    minutes = `0${minutes}`;
  }
  let amOrPm = now.getHours(timestamp) < 12 ? "AM" : "PM";
  
  return `${dayNames[today]} ${hours}:${minutes} ${amOrPm}`;

}
//forecast

function displayForecast() {
  let forecastElement = document.querySelector(".forecast");
  let forecastHtml = "";
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function(day) {
    forecastHtml = forecastHtml + `
        <div class="col-3">
          <div class="list-day second-day">${day}</div>
          <span class="temp-number-min">70°</span>
          <span class="temp-number-max">70°</span>
          <div class="list-emoji"><img src="icons/002-sun.png" /></div>
        </div>
        </div>
      `;
  })
  
  
      forecastElement.innerHTML = forecastHtml; 
  
}

// Function to replace html with API data

function showTemp(response) { 
  console.log(response.data);
  document.querySelector(".title-container").innerHTML = response.data.name;
  document.querySelector("#temp-digit-container").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);  
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);  
  document.querySelector(".date-container").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector(".emoji-container").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
  document.querySelector(".weather-description").innerHTML = response.data.weather[0].description;  

  
celciusTemperature = response.data.main.temp;
}

// Function to access weather API data

function search(city) {
  let units = "metric";
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    
  axios.get(apiUrl).then(showTemp); 
}

//Function for search button
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-query").value;
  search(city);
  }



 // Function for current location button weather API access

 function showCurrentPosition(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;
  let units = "metric";
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let endTail = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${endTail}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    
  axios.get(apiUrl).then(showTemp);
}  

// Function for geolocation

function showGeoTemp() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

// Function to change temperature to F°/C°

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-digit-container");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  function displayCelsius(event) {
    event.preventDefault;
    celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temp-digit-container");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
    
  }

celciusTemperature = null;
// Event Listeners

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", showGeoTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

//Function to display your default city when page loads
search("san francisco");
displayForecast();
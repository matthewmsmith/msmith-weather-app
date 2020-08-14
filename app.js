const locationTimeZone = document.querySelector(".location-timezone");
const temperatureDegree = document.querySelector(".temperature-degree");
const temperatureDescription = document.querySelector(".temperature-description");
const icon = document.querySelector('#weather-icon')
const inputValue = document.querySelector(".temperature-input-value");
const button = document.querySelector(".button");
let lon;
let lat;

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const myLocationWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fec17107f5bf9d5ec947195fcd401778`;

      fetch(myLocationWeather)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const name = data.name;
          const { temp } = data.main;
          const { id, description } = data.weather[0];
        

          locationTimeZone.textContent = name;
          temperatureDegree.textContent = Math.round(temp - 273.15) * 9/5 + 32;
          temperatureDescription.textContent = description;
 
         
          if (id < 250) {
            icon.src = "./icons/thunderstorm.svg";
          } else if (id < 350) {
            icon.src = "./icons/drizzle.svg";
          } else if (id < 550) {
            icon.src = "./icons/rain.svg";
          } else if (id < 650) {
            icon.src = "./icons/snow.svg";
          }  else if (id === 800) {
            icon.src = "./icons/clear.svg";
          } else if (id === 802) {
            icon.src = "./icons/clouds.svg";
          }

          console.log(data);
        });
    });
  }
});

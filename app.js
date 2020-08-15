const locationTimeZone = document.querySelector(".location-timezone");
const temperatureDegree = document.querySelector(".temperature-degree");
const temperatureDescription = document.querySelector(".temperature-description");
const icon = document.querySelector('#weather-icon')
const inputValue = document.querySelector(".temperature-input-value");
let temperature = document.querySelector('.temperature');
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
            temperature.style.background = 'linear-gradient(rgba(82, 50, 134, 0.993), rgb(129, 106, 150), rgba(0, 0, 0, 0.849))';
          } else if (id < 350) {
            icon.src = "./icons/drizzle.svg";
            temperature.style.background = 'linear-gradient(rgb(15, 18, 29), rgb(201, 198, 198), rgb(50, 49, 53, 0.849))';
          } else if (id < 550) {
            icon.src = "./icons/rain.svg";
           temperature.style.background = 'linear-gradient(rgb(15, 18, 29), rgb(201, 198, 198), rgb(50, 49, 53, 0.849))';
          } else if (id < 650) {
            icon.src = "./icons/snow.svg";
            temperature.style.background = 'linear-gradient( rgb(245, 244, 244), rgb(201, 198, 198), rgb(245, 243, 243))';
          }  else if (id === 800) {
            icon.src = "./icons/clear.svg";
            temperature.style.background = 'linear-gradient(rgb(72, 140, 218), rgb(31, 95, 235), rgb(255, 255, 255))';
          } else if (id === 802) {
            icon.src = "./icons/clouds.svg";
           temperature.style.background = 'linear-gradient(rgb(90, 89, 89), rgb(158, 154, 154), rgb(185, 185, 185))';
          }
        
          console.log(data);
        });
    });
  }
});

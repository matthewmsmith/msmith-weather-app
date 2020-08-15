let wrapper = document.querySelector(".wrapper");

const locationName = document.querySelector(".location-name");

const icons = document.querySelector(".weather");
const temperatureDescription = document.querySelector(
  ".temperature-description"
);

const degree = document.querySelector(".degree");

const locationInput = document.querySelector(".location-input");
const button = document.querySelector(".location-submit");

let lon;
let lat;

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const myLocationWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fec17107f5bf9d5ec947195fcd401778`;

      fetch(myLocationWeatherApi)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const name = data.name;
          const { temp } = data.main;
          let {id, description } = data.weather[0];
          let {icon} = data.weather[0]

          
          locationName.textContent = name;
          degree.textContent = (Math.round(temp - 273.15) * 9) / 5 + 32;
          temperatureDescription.textContent = description;
          icons.textContent = icon;
          changeBackgroundColor(id);
          console.log(data);
        });
      
    });
  }
 
});

button.addEventListener('click', () => {
      const searchLocationApi = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=fec17107f5bf9d5ec947195fcd401778`;

      fetch(searchLocationApi) 
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const name = data.name;
          const { temp } = data.main;
          const {description } = data.weather[0];
          let {id} = data.weather[0]
          let {icon} = data.weather[0]

          icons.textContent = icon;
          locationName.textContent = name;
          degree.textContent = (Math.round(temp - 273.15) * 9) / 5 + 32;
          temperatureDescription.textContent = description;
          
          changeBackgroundColor(id);
         
        })
    
      });

      function changeBackgroundColor(id) {
        if (id < 250) {
          icons.src = "./icons/thunderstorm.svg";
          wrapper.style.background =
            "linear-gradient(rgba(82, 50, 134, 0.993), rgb(129, 106, 150), rgba(0, 0, 0, 0.849))";
        } else if (id < 350) {
          icons.src = "./icons/drizzle.svg";
          wrapper.style.background =
            "linear-gradient(rgb(15, 18, 29), rgb(201, 198, 198), rgb(50, 49, 53, 0.849))";
        } else if (id < 550) {
           icons.src = "./icons/rain.svg";
          wrapper.style.background =
            "linear-gradient(rgb(15, 18, 29), rgb(201, 198, 198), rgb(50, 49, 53, 0.849))";
        } else if (id < 650) {
          icons.src = "./icons/snow.svg";
          wrapper.style.background =
            "linear-gradient( rgb(245, 244, 244), rgb(201, 198, 198), rgb(245, 243, 243))";
        } else if (id === 800) {
          icons.src = "./icons/clear.svg";
          wrapper.style.background =
            "linear-gradient(rgb(72, 140, 218), rgb(31, 95, 235), rgb(255, 255, 255))";
        } else if (id === 802) {
          icons.src = "./icons/clouds.svg";
          wrapper.style.background =
            "linear-gradient(rgb(90, 89, 89), rgb(158, 154, 154), rgb(185, 185, 185))";
        }
      }
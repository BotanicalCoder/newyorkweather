const errorHandler = () => {
  document.getElementById("error").style.display = "block";
  setTimeout(clearError, 5000);
};

const clearError = () => {
  document.getElementById("error").style.display = "none";
};

/*set data from local storage*/

const setResult = (...data) => {
  localStorage.setItem("Data", JSON.stringify(data));
  getResult();
  displayResult();

 
};

/*get data from local storage*/
const getResult = () => {
  let str = localStorage.getItem("Data");
  if (str != null) {
    return (data = JSON.parse(str));
  } /*else {
    return console.log("no data");
  }*/
  console.log("result displayed");
};

const displayResult = () => {
  getResult();
  const [weather, main, wind, visibility, name] = data;

  const { id, description, icon, ...weatherCondition } = weather;

  const { feels_like, humidity, pressure, temp, temp_min, temp_max } = main;

  const { speed, deg } = wind;

  /*main_object dom elements*/
  let feels_like_dom = document.getElementById("feels_like");
  let humidity_dom = document.getElementById("humidity");
  let pressure_dom = document.getElementById("pressure");
  let temp_dom = document.getElementById("temp");
  let temp_min_dom = document.getElementById("temp_min");
  let temp_max_dom = document.getElementById("temp_max");
  let city_name_dom = document.getElementById("city");

  /*weather_object dom elements*/
  let description_dom = document.getElementById("description");
  let icon_dom = document.getElementById("icon");
  let currweatherCondition_dom = document.getElementById(
    "currweatherCondition"
  );
  /*wind_object dom elements*/
  let speed_dom = document.getElementById("speed");
  let deg_dom = document.getElementById("deg");
  /*visibility dom element*/
  let visibility_dom = document.getElementById("visibility");

  /*assigning the value of the get request to the dom elements */
  city_name_dom.innerHTML = `City: ${name}`;
  feels_like_dom.innerHTML = `Feels like: ${feels_like}  <sup>o</sup>C`;
  humidity_dom.innerHTML = `Humidity: ${humidity} %`;
  pressure_dom.innerHTML = `Pressure: ${pressure} hPa`;
  temp_dom.innerHTML = temp;
  temp_min_dom.innerHTML = `Min temp: ${temp_min}  <sup>o</sup>C`;
  temp_max_dom.innerHTML = `Max temp: ${temp_max}  <sup>o</sup>C`;
  description_dom.innerHTML = description;
  icon_dom.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  currweatherCondition_dom.innerHTML = `Weather description: ${weatherCondition.main}`;
  speed_dom.innerHTML = `Wind speed: ${speed} m/s`;
  deg_dom.innerHTML = `Wind degree: ${deg}`;
  visibility_dom.innerHTML = `Visibility : ${visibility} m`;

  console.log("result displayed");
};

const updateUi = () => {
  let updateCity = document.getElementById("searchValue").value;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${updateCity}&units=metric&appid=${key}`;

  console.log("ui updated");
  console.log(updateCity);

  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      const { weather, main, wind, visibility, name } = json;
      setResult(...weather, main, wind, visibility, name);
    })
    .catch(function (error) {
      console.error();
      errorHandler();
    });
};

let updateButton = document.getElementById("newupdate");

updateButton.addEventListener("click", updateUi);

/*register service worker*/

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

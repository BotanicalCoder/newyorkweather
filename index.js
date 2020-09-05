let updateButton = document.getElementById("update");

//icon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@3x.png`);

let arr = [];

/*set data from local storage*/

const setResult = (...data) => {
  localStorage.setItem("Data", JSON.stringify(data));
  getResult();
  displayResult();

  console.log("hiiii");
  /*
  const [weather, main, wind, visibility] = data;

  const { id, description, icon, ...weatherCondition } = weather;

  const { feels_like, humidity, pressure, temp, temp_min, temp_max } = main;

  const { speed, deg } = wind;
  console.log(wind);*/
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
  const [weather, main, wind, visibility] = data;

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
  feels_like_dom.innerHTML = `feels like: ${feels_like} celcius`;
  humidity_dom.innerHTML = `humidity: ${humidity}`;
  pressure_dom.innerHTML = `pressure: ${pressure}`;
  temp_dom.innerHTML = temp;
  temp_min_dom.innerHTML = `min temperature in celcius: ${temp_min}`;
  temp_max_dom.innerHTML = `max temperature in celcius: ${temp_max}`;
  description_dom.innerHTML = description;
  icon_dom.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@4x.png`
  );
  currweatherCondition_dom.innerHTML = `weather description: ${weatherCondition.main}`;
  speed_dom.innerHTML = `wind speed in meters per seconds: ${speed}`;
  deg_dom.innerHTML = `wind degree: ${deg}`;
  visibility_dom.innerHTML = `visibility in meters: ${visibility}`;

  console.log("result displayed");
};

const updateUi = () => {
  console.log("ui updated");

  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      const { weather, main, wind, visibility } = json;
      setResult(...weather, main, wind, visibility);
    })
    .catch(function (error) {
      console.error();
    });
};

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

/*
{"id": 5128581, "name": "New York City", "state": "NY", "country": "US", 
"coord": {"lon": -74.005966, "lat": 40.714272}}

https://api.openweathermap.org/data/2.5/weather?id=5128581&appid=key*/

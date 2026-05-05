import { conditionMap } from "./constants";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const temperature = data.main.temp;
  const condition = normalizeCondition(data.weather[0].main.toLowerCase());
  const isDaytime = isDay(data.sys, Date.now());

  return {
    city: data.name,
    temp: { F: temperature },
    type: getWeatherType(temperature),
    condition,
    isDay: isDaytime,
  };
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};

const normalizeCondition = (condition) => {
  return conditionMap[condition] || condition;
};

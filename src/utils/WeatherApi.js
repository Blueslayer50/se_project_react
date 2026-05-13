import { checkResponse } from "./api";
import { conditionMap } from "./constants";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeather = ({ latitude, longitude }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`,
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const temperatureF = Math.round(data.main.temp);
  const temperatureC = Math.round(((data.main.temp - 32) * 5) / 9);

  const normalizedCondition = normalizeCondition(
    data.weather[0].main.toLowerCase(),
  );

  return {
    city: data.name,
    temp: {
      F: temperatureF,
      C: temperatureC,
    },
    type: getWeatherType(temperatureF),
    condition: normalizedCondition,
    isDay: isDay(data.sys, Date.now()),
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

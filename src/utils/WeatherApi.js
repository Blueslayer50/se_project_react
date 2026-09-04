import { checkResponse } from "./api";
import {
  conditionMap,
  weatherOptions,
  defaultWeatherOptions,
} from "./constants";

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

  const isDayTime = isDay(data.sys, Date.now());

  return {
    city: data.name,
    date: formatDate(data.dt, data.timezone),
    temp: {
      F: temperatureF,
      C: temperatureC,
    },
    type: getWeatherType(temperatureF),
    condition: normalizedCondition,
    isDay: isDayTime,
    image: getWeatherImage(normalizedCondition, isDayTime),
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

const getWeatherImage = (condition, isDayTime) => {
  const match = weatherOptions.find(
    (option) => option.condition === condition && option.day === isDayTime,
  );

  if (match) return match.url;

  return isDayTime
    ? defaultWeatherOptions.day.url
    : defaultWeatherOptions.night.url;
};

// data.dt is a UTC unix timestamp; data.timezone is the location's UTC offset in seconds
const formatDate = (dt, timezoneOffsetSeconds) => {
  const localMs = (dt + timezoneOffsetSeconds) * 1000;
  return new Date(localMs).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

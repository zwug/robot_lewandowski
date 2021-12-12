// @TODO output weather
import fetch from 'node-fetch';

const lat = '55.757688'
const lon = '37.577250'
const lang = 'ru'


export const fetchWeather = async () => {
  const result = await fetch(`https://api.weather.yandex.ru/v2/informers?lat=${lat}&lon=${lon}&lang=${lang}`, {
    headers: {
      'X-Yandex-API-Key': 'KEY'
    },
  });

  const resJSON = await result.json();
  console.log(JSON.stringify(resJSON));
}
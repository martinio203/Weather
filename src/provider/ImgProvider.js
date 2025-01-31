import {findWeatherData} from "./AssetsProvider";

export const getWeatherBcg = (weatherCode) => {
    const weatherInfo = findWeatherData(weatherCode);
    return weatherInfo ? weatherInfo[1] : "default";
}

import {findWeatherData} from "./AssetsProvider";


export const getBackgroundColor = (weatherCode) => {
    const weatherInfo = findWeatherData(weatherCode);
    return weatherInfo ? weatherInfo[2] : "default";
}
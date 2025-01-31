import {findWeatherData} from "./AssetsProvider";


export const getWeatherIcon = (weatherCode) => {
    const weatherInfo = findWeatherData(weatherCode);
    const iconName = weatherInfo ? weatherInfo[0] : "error.png";
    return require(`../assets/icons/${iconName}`);
};

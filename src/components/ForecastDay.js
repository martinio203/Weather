import {ForecastWeatherApi} from "../api/ForecastApi";

const ForecastDay = () => {
    const {forecastWeather, icon} = ForecastWeatherApi();

    return (
        <div className={"day-weather"}>
            <div className={"day-name"}><h3>{forecastWeather.time}</h3></div>
                <img src={icon} alt="" className={"weather-day"}/>
                <ul>
                    <li>Maksymalna temperatura: {Math.floor(forecastWeather.temperature_max)}<sup>°</sup>C</li>
                    <li>Minimalna temperatura: {Math.floor(forecastWeather.temperature_min)}<sup>°</sup>C</li>
                    <li>Maksymalna prędkość wiatru: {forecastWeather.wind_speed} km/h</li>
                    <li>Kierunek wiatru: {forecastWeather.wind_direction}<sup>°</sup></li>
                </ul>
        </div>
    )
};

export default ForecastDay;
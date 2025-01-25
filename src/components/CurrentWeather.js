import { CurrentWeatherApi} from "../api/CurrentApi";
import {useState} from "react";
import {CityApi} from "../api/CityApi";

const CurrentWeather = () => {
    const {currentWeather, iconPath} = CurrentWeatherApi();
    const {setCurrentCity, currentCity} = CityApi();
    const [inputValue, setInputValue] = useState("");

    const extractDate = (date) => {
        if (typeof date === "string")
            return date.split("T")[0];
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSearch = () => {
        setCurrentCity(inputValue);
    }

    return (
        <div className={"current-container"}>
            <div className={"left"}>
                <div className={"city"}>
                    <span>{currentCity}</span>
                </div>
                <div className={"info"}>
                    <div className={"day"}>
                        <span>Dzisiaj, {extractDate(currentWeather.time)}</span>
                    </div>
                    <div className={"degrees"}>
                        <span>{Math.floor(currentWeather.temperature)}</span><sup>°</sup><span>C</span>
                    </div>
                </div>
            </div>
            <div className={"right"}>
                <img src={iconPath} alt="" className={"weather-icon"}/>
                <div className={"search-container"}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={"Wyszukaj miasto"}
                    />
                    <button type="button" onClick={handleSearch}>Wyszukaj</button>
                </div>
                <ul>
                    <li>Wilgotność: {currentWeather.humidity}%</li>
                    <li>Prędkość wiatru: {currentWeather.wind_speed} km/h</li>
                    <li>Kierunek wiatru: {currentWeather.wind_direction} <sup>o</sup></li>
                </ul>
            </div>
        </div>
    )
};
export default CurrentWeather;
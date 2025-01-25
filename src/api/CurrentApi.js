import {createContext, useContext, useEffect, useState} from "react";
import {getWeatherIcon} from "../components/IconProvider";
import {CityApi} from "./CityApi";

const CurrentContext = createContext();

export const CurrentWeatherApi = () => {
    return useContext(CurrentContext);
}

export const CurrentApi = ({children, date}) => {
    const [currentWeather, setCurrentWeather] = useState({});
    const [iconPath, setIconPath] = useState("");
    const {coordinates} = CityApi();

    const fetchCurrentWeather = async () => {
        const {lat, lon} = coordinates;
        if (!lat || !lon) return;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin&start_date=${date}&end_date=${date}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const {
                time,
                temperature_2m,
                relative_humidity_2m,
                wind_speed_10m,
                wind_direction_10m,
                weather_code
            } = data.current;
            setCurrentWeather(
                {
                    time,
                    temperature: temperature_2m,
                    humidity: relative_humidity_2m,
                    wind_speed: wind_speed_10m,
                    wind_direction: wind_direction_10m,
                    weather_code
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchCurrentWeather();
    }, [coordinates]);

    useEffect(() => {
        if (currentWeather.weather_code) {
            setIconPath(getWeatherIcon(currentWeather.weather_code));
        }
    }, [currentWeather]);

    return (
        <CurrentContext.Provider value={{currentWeather, iconPath}}>
            {children}
        </CurrentContext.Provider>
    )
}
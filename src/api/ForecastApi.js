import {createContext, useContext, useEffect, useState} from "react";
import {getWeatherIcon} from "../provider/IconProvider";


const ForecastContext = createContext();

export const ForecastWeatherApi = () => {
    return useContext(ForecastContext);
}

export const ForecastApi = ({children, day, startDate, endDate, coordinates}) => {

    const [forecastWeather, setForecastWeather] = useState({});
    const [icon, setIcon] = useState("");

    const fetchForecastWeather = async () => {
        const {lat, lon} = coordinates;
        if (!lat || !lon) return;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FBerlin&start_date=${startDate}&end_date=${endDate}`;

        const getDayName = (date, locale) => {
            const currentDayName = new Date(date).toLocaleDateString(locale, {weekday: "long"});
            return currentDayName.charAt(0).toUpperCase()
                + currentDayName.slice(1);
        }

        const dayName = (date) => {
            if (day === 1) return "Jutro";
            if (day === 2) return "Pojutrze";
            return getDayName(date, "pl-PL");
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            const {
                time,
                temperature_2m_max,
                temperature_2m_min,
                wind_speed_10m_max,
                wind_direction_10m_dominant,
                weather_code
            } = data.daily;
            setForecastWeather(
                {
                    time: dayName(time[day]),
                    temperature_max: temperature_2m_max[day],
                    temperature_min: temperature_2m_min[day],
                    wind_speed: wind_speed_10m_max[day],
                    wind_direction: wind_direction_10m_dominant[day],
                    weather_code: weather_code[day]
                });
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchForecastWeather();
    }, [startDate, endDate, coordinates]);

    useEffect(() => {
        setIcon(getWeatherIcon(forecastWeather.weather_code));
    }, [forecastWeather]);

    return (
        <ForecastContext.Provider value={{forecastWeather, icon}}>
            {children}
        </ForecastContext.Provider>
    )

}

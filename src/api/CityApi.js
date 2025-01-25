import {createContext, useContext, useEffect, useState} from "react";

const CityContext = createContext();

export const CityApi = () => {
    return useContext(CityContext);
}

export const CityProvider = ({children, city}) => {
    const [coordinates, setCoordinates] = useState({});
    const [currentCity, setCurrentCity] = useState(city);

    const fetchCityCoordinates = async (cityName) => {
        const url = `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const {
                lat,
                lon
            } = data[0];
            setCoordinates(
                {
                    lat: parseFloat(lat),
                    lon: parseFloat(lon)
                });
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (currentCity) {
            fetchCityCoordinates(currentCity);
        }
    }, [currentCity]);

    return (
        <CityContext.Provider value={{coordinates, setCurrentCity, currentCity}}>
            {children}
        </CityContext.Provider>
    )

}
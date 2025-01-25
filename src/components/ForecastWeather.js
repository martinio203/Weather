import ForecastDay from "./ForecastDay";
import {ForecastApi} from "../api/ForecastApi";
import {CityApi} from "../api/CityApi";

const ForecastWeather = ({startDate, endDate}) => {
    const {coordinates} = CityApi();

    return (
        <div className={"forecast-container"}>
            {[...Array(7)].map((_, index) => (
                <ForecastApi key={index} day={index + 1} startDate={startDate} endDate={endDate} coordinates={coordinates}>
                    <ForecastDay />
                </ForecastApi>
            ))}
        </div>
    );
};

export default ForecastWeather;

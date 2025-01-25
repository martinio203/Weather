import Header from "./Header";
import ForecastWeather from "./ForecastWeather";
import {CurrentApi} from "../api/CurrentApi";
import CurrentWeather from "./CurrentWeather";
import {CityProvider} from "../api/CityApi";

const MainPage = () => {

    const currentDate = () => {
        const date = new Date();
        return date.toISOString().split("T")[0]
    };

    const endDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().split("T")[0]
    }

    return (
        <div className={"container"}>
            <Header/>
            <CityProvider city={"Katowice"}>
                <CurrentApi date={currentDate()}>
                    <CurrentWeather/>
                </CurrentApi>
                <ForecastWeather startDate={currentDate()} endDate={endDate()} />
            </CityProvider>
        </div>
    );
};

export default MainPage;
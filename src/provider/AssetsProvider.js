const weatherData = new Map([
    [[55, 65, 67, 77, 82], ["heavy_rain.png", "rain", "rain-body"]],
    [[51, 53, 61, 63, 66, 80, 81], ["light_rain.png", "rain", "rain-body"]],
    [[0, 1], ["sun.png", "sun", "sun-body"]],
    [[2, 3], ["cloud.png", "cloud", "cloud-body"]],
    [[45, 48], ["fog.png", "fog", "fog-body"]],
    [[71, 73, 74, 85, 86], ["snow.png", "snow", "snow-body"]],
    [[95, 96, 99], ["thunder_rain.png", "thunder", "thunder-body"]],
]);

export const findWeatherData = (weatherCode) => {
    for (const [codes, values] of weatherData) {
        if (codes.includes(weatherCode)) {
            return values;
        }
    }
    return null;
}









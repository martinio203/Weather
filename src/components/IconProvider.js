const weatherIcons = new Map([
    [[55, 65, 67, 77, 82], "heavy_rain.png"],
    [[51, 53, 61, 63, 66, 80, 81], "light_rain.png"],
    [[0, 1], "sun.png"],
    [[2, 3], "cloud.png"],
    [[45, 48], "fog.png"],
    [[71, 73, 74, 85, 86], "snow.png"],
    [[95, 96, 99], "thunder_rain.png"],
]);

export const getWeatherIcon = (weatherCode) => {
    let iconName;
    for (const [codes, icon] of weatherIcons) {
        if (codes.includes(weatherCode)) {
            iconName = icon;
            break;
        } else {
            iconName = "error.png";
        }
    }

    return require(`../assets/icons/${iconName}`);
};

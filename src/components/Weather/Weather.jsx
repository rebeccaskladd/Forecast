const Weather = ({ currentWeather }) => {
    console.log(currentWeather);
    return (
        <div>
            <p>{currentWeather.name}</p>
        </div>
    )
};

export default Weather;
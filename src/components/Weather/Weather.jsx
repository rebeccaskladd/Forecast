import ForecastItem from "../ForecastItem/ForecastItem";

const Weather = ({ location, currentWeather, forecast }) => {
    console.log(location);
    console.log(currentWeather);
    console.log(forecast);

    const { city, state, date: todaysDate } = location;
    const { temperature, weather, windSpeed, windDirection, isDayTime } = currentWeather;

    const { high_temp } = forecast[0];

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div>
            <div>
                <p>{daysOfWeek[todaysDate.getDay()]}, {months[todaysDate.getMonth()]} {todaysDate.getDate()}, {todaysDate.getFullYear()}</p>
                <p>{`${city}, ${state}`}</p>
            </div>
            <div>
                <p>Wind: {windSpeed} {windDirection}</p>
            </div>
            <div>
                <p>{temperature}&#176;F</p>
                <p>{weather}</p>
                <p>The high today will be {high_temp}&#176;F.</p>
            </div>

            {
                forecast.map((item) => (
                    <ForecastItem key={item.key} item={item} daysOfWeek={daysOfWeek} />
                ))
            }
        </div>
    )
};

export default Weather;
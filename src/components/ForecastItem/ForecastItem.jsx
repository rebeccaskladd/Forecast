import sunny from '../../assets/sunny.png';
import mostlySunny from '../../assets/mostly-sunny.png';
import cloudy from '../../assets/cloudy.png';
import rain from '../../assets/slight-rain.png';
import storms from '../../assets/storms.png';

const ForecastItem = ({ item, daysOfWeek }) => {
    const { date, high_temp, low_temp, weather } = item;

    let weatherIcon = "";
    if (weather.toLowerCase().includes('thunderstorms')) {
        weatherIcon = storms;
    }
    else if (weather.toLowerCase().includes('rain')) {
        weatherIcon = rain;
    }
    else if (weather.toLowerCase() === 'sunny') {
        weatherIcon = sunny;
    }
    else if (weather.toLowerCase().includes('mostly sunny')) {
        weatherIcon = mostlySunny;
    }


    return (
        <div>
            <p>{date === 'Today' ? 'Today' : daysOfWeek[date.getDay()]}</p>
            {/* <p>{weather}</p> */}
            <img src={weatherIcon} alt="Weather icon" />
            <p>{high_temp}&#176;F</p>
            <p>{low_temp}&#176;F</p>
        </div>
    )
};

export default ForecastItem;
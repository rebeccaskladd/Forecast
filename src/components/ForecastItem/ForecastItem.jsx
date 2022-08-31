import sunny from '../../assets/sunny.png';
import mostlySunny from '../../assets/mostly-sunny.png';
import cloudy from '../../assets/cloudy.png';
import rain from '../../assets/slight-rain.png';
import storms from '../../assets/storms.png';

import './ForecastItem.css';

const ForecastItem = ({ item, daysOfWeek }) => {
    const { date, high_temp, low_temp, weather } = item;

    let weatherIcon = "";
    let weatherCheck = weather.toLowerCase();

    if (weatherCheck.includes('thunderstorms') || weatherCheck.includes('storms')) {
        weatherIcon = storms;
    }
    else if (weatherCheck.includes('rain') || weatherCheck.includes('showers')) {
        weatherIcon = rain;
    }
    else if (weatherCheck === 'sunny') {
        weatherIcon = sunny;
    }
    else if (weatherCheck.includes('mostly sunny') || weatherCheck.includes('partly sunny')) {
        weatherIcon = mostlySunny;
    }
    else if (weatherCheck.includes('clouds') || weatherCheck.includes('cloudy')) {
        weatherIcon = cloudy;
    }

    return (
        <div className='item'>
            <p className='date'>{new Date().getDay() === date.getDay() ? 'Today' : daysOfWeek[date.getDay()]}</p>
            <img className="icon" src={weatherIcon} alt="Weather icon" />
            <div className='high-low-temp'>
                <span className='high'>{high_temp}&#176;</span>
                <span className='low'>{low_temp}&#176;</span>
            </div>
        </div>
    )
};

export default ForecastItem;
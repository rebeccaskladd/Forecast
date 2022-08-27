import { useState } from 'react';
import ZipCodeForm from './components/ZipCodeForm/ZipCodeForm';
import Weather from './components/Weather/Weather';

import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
    const [currentWeather, setCurrentWeather] = useState(null);

    const getWeather = (zipCode) => {
        try {
            fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}&units=imperial`)
                .then(response => response.json())
                .then(data => {
                    const { temp, feels_like, temp_max, temp_min, humidity } = data.main;

                    setCurrentWeather({
                        name: data.name,
                        temp: Math.round(temp),
                        feels_like: Math.round(feels_like),
                        temp_max: Math.round(temp_max),
                        temp_min: Math.round(temp_min),
                        humidity: humidity
                    });
                });
        }
        catch (error) {
            console.log('An error has occurred:', error);
        }
    }

    return (
        <div>
            {
                currentWeather ?
                    <Weather currentWeather={currentWeather} />
                    : <ZipCodeForm getWeather={getWeather} />
            }
        </div>
    )
};

export default App;

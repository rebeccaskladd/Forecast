import { useState } from 'react';
import ZipCodeForm from './components/ZipCodeForm/ZipCodeForm';
import Weather from './components/Weather/Weather';

import defaultBackground from './assets/default-background.jpg';
import sunnyBackground from './assets/sunny-background.jpg';
import rainBackground from './assets/rain-background.jpg';
import stormsBackground from './assets/storms-background.jpg';
import cloudyBackground from './assets/cloudy-background.jpg';

import './App.css';

const ACCU_KEY = 'zWALoAII7yEPdoMfpW6rvYF7FtgROG4G';

function App() {
    const [location, setLocation] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [background, setBackground] = useState(defaultBackground);
    const [errorMessage, setErrorMessage] = useState("");

    const getWeather = async (zipCode) => {
        let locationKey = "";

        try {
            await fetch(`https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${ACCU_KEY}&q=${zipCode}`)
                .then(response => response.json())
                .then(data => {
                    let locationData = null;
                    data.forEach((dataPoint) => {
                        if (dataPoint.Country.ID === 'US') {
                            locationData = dataPoint;
                        }
                    });

                    const { Key, LocalizedName, AdministrativeArea } = locationData;
                    locationKey = Key;

                    setLocation({
                        date: new Date(),
                        city: LocalizedName,
                        state: AdministrativeArea.ID
                    });
                })
        }
        catch (error) {
            console.log('An error has occurred:', error);
            setErrorMessage('Invalid Zip Code');
        }

        try {
            await Promise.all([
                fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationKey}?apikey=${ACCU_KEY}`),
                fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${ACCU_KEY}`)
            ])
                .then(responses => responses.map(response => response.json()))
                .then(dataArray => dataArray.forEach((data, index) => data.then(value => {
                    if (index === 0) {
                        const { IconPhrase, Temperature, PrecipitationProbability, IsDaylight } = value[0];

                        setCurrentWeather({
                            weather: IconPhrase,
                            isDaytime: IsDaylight,
                            temperature: Temperature.Value,
                            precipitation: PrecipitationProbability
                        });

                        let weatherName = IconPhrase.toLowerCase();
                        if (weatherName.includes('thunderstorms')) {
                            setBackground(stormsBackground);
                        }
                        else if (weatherName.includes('rain') || weatherName.includes('storms') || weatherName.includes('showers')) {
                            setBackground(rainBackground);
                        }
                        else if (weatherName.includes('sunny')) {
                            setBackground(sunnyBackground);
                        }
                        else if (weatherName.includes('cloudy') || weatherName.includes('clouds')) {
                            setBackground(cloudyBackground);
                        }
                    }
                    else {
                        console.log(value);
                        setForecast(value.DailyForecasts.map((element, index) => {
                            const { Date: date, Day, Temperature } = element;

                            return {
                                key: index,
                                date: new Date(date),
                                weather: Day.IconPhrase,
                                high_temp: Temperature.Maximum.Value,
                                low_temp: Temperature.Minimum.Value
                            };
                        }));
                    }
                })));
        }
        catch (error) {
            console.log('An error has occurred:', error);
        }
    }

    return (
        <div className='main' style={{ backgroundImage: `url(${background})` }}>
            <div className="modal">
                <div className='container'>
                    {
                        (currentWeather && forecast) ? (
                            <Weather location={location} currentWeather={currentWeather} forecast={forecast} />
                        ) : <ZipCodeForm getWeather={getWeather} errorMessage={errorMessage} />
                    }
                </div>
            </div>
        </div >
    )
};

export default App;

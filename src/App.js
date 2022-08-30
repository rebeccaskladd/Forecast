import { useState } from 'react';
import ZipCodeForm from './components/ZipCodeForm/ZipCodeForm';
import Weather from './components/Weather/Weather';

import './App.css';

const ACCU_KEY = 'zWALoAII7yEPdoMfpW6rvYF7FtgROG4G';

function App() {
    const [location, setLocation] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);

    const getWeather = async (zipCode) => {
        let locationKey = "";

        // get latitude/longitude from zipcode
        // http://dev.virtualearth.net/REST/v1/Locations?postalCode=${zipCode}&key=${BING_KEY}
        try {
            await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${ACCU_KEY}&q=${zipCode}`)
                .then(response => response.json())
                .then(data => {
                    const { Key, LocalizedName, AdministrativeArea } = data[0];
                    locationKey = Key;
                    // const { address, point } = data.resourceSets[0].resources[0];
                    // lat = point.coordinates[0];
                    // long = point.coordinates[1];

                    // console.log(lat, long);
                    setLocation({
                        date: new Date(),
                        city: LocalizedName,
                        state: AdministrativeArea.ID
                    });
                })
        }
        catch (error) {
            console.log('An error has occurred:', error);
        }

        try {
            Promise.all([
                fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationKey}?apikey=${ACCU_KEY}`),
                fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${ACCU_KEY}`)
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
                    }
                    else {
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
        <div className="modal">
            <div className='container'>
                {
                    currentWeather && forecast ? (
                        <Weather location={location} currentWeather={currentWeather} forecast={forecast} />
                    ) : <ZipCodeForm getWeather={getWeather} />
                }
            </div>
        </div>
    )
};

export default App;

import { useState } from 'react';
import ZipCodeForm from './components/ZipCodeForm/ZipCodeForm';
import Weather from './components/Weather/Weather';

import './App.css';

const BING_KEY = 'Aid6JaHRZ6FLi6bt1k3NG1VyntcD82zf8_Xrc8oQ-ly842jD8zv11uETwXzoWauA';

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
            await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationKey}?apikey=${ACCU_KEY}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    const { IconPhrase, Temperature, PrecipitationProbability, IsDaylight } = data[0];

                    setCurrentWeather({
                        weather: IconPhrase,
                        isDaytime: IsDaylight,
                        temperature: Temperature.Value,
                        precipitation: PrecipitationProbability
                    });
                });
        }
        catch (error) {
            console.log('An error has occurred:', error);
        }

        // try {
        //     await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${ACCU_KEY}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             data.DailyForecasts.map((element, index) => {
        //                 return {

        //                 };
        //             })
        //         });
        // }
        // catch (error) {
        //     console.log('An error has occurred:', error);
        // }

        // get api urls for relevant data
        // try {
        //     await fetch(`https://api.weather.gov/points/${lat},${long}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             const { forecast, forecastHourly } = data.properties;
        //             currentURL = forecastHourly;
        //             forecastURL = forecast;
        //         });
        // }
        // catch (error) {
        //     console.log('An error has occurred:', error);
        // }

        // // get current weather and forecast data
        // try {
        //     Promise.all([
        //         fetch(currentURL),
        //         fetch(forecastURL)
        //     ])
        //         .then(responses => responses.map(response => response.json()))
        //         .then(dataArray => dataArray.forEach((data, index) => data.then(value => {
        //             // current weather data
        //             if (index === 0) {
        //                 const {
        //                     isDaytime,
        //                     shortForecast,
        //                     temperature,
        //                     windSpeed,
        //                     windDirection
        //                 } = value.properties.periods[1];

        //                 setCurrentWeather({
        //                     isDaytime,
        //                     weather: shortForecast,
        //                     temperature,
        //                     windSpeed,
        //                     windDirection
        //                 });
        //             }
        //             else {
        //                 // 6 day weather forecast data
        //                 const forecastData = value.properties.periods.map((data, index) => {
        //                     if (index % 2 === 0) {
        //                         return { weather: data.shortForecast, temperature: data.temperature };
        //                     }
        //                     else {
        //                         return { temperature: data.temperature };
        //                     }
        //                 });

        //                 // organize forecast data
        //                 const organizedData = [];
        //                 let key = 1;
        //                 for (let i = 0; i < forecastData.length; i += 2) {
        //                     let date = "";

        //                     if (i === 0) {
        //                         date = "Today";
        //                     }
        //                     else {
        //                         date = new Date(Date.now() + (86400000 * (i / 2)));
        //                     }

        //                     key++;

        //                     organizedData.push(
        //                         {
        //                             key,
        //                             date,
        //                             weather: forecastData[i].weather,
        //                             low_temp: forecastData[i + 1].temperature,
        //                             high_temp: forecastData[i].temperature
        //                         }
        //                     );
        //                 }

        //                 setForecast(organizedData);
        //             }
        //         }
        //         )));
        // }
        // catch (error) {
        //     console.log('An error has occurred:', error);
        // }
    }

    return (
        <div className="modal">
            <div className='container'>
                {
                    currentWeather ? (
                        <Weather location={location} currentWeather={currentWeather} forecast={forecast} />
                    ) : <ZipCodeForm getWeather={getWeather} />
                }
            </div>
        </div>
    )
};

export default App;

import ZipCodeForm from './components/ZipCodeForm/ZipCodeForm';

import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
    const getWeather = (zipCode) => {
        try {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => console.log(data));
        }
        catch (error) {
            console.log('An error has occurred:', error);
        }
    }

    return (
        <ZipCodeForm getWeather={getWeather} />
    )
};

export default App;

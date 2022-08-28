const ForecastItem = ({ item, daysOfWeek }) => {
    const { date, high_temp, low_temp, weather } = item;

    return (
        <div>
            <p>{date === 'Today' ? 'Today' : daysOfWeek[date.getDay()]}</p>
            <p>{weather}</p>
            <p>{high_temp}&#176;F</p>
            <p>{low_temp}&#176;F</p>
        </div>
    )
};

export default ForecastItem;
var apiKey = "fba8993979a04a47adb193110201409";
var baseURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=`;
//var forecastBaseURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=`;
//var forecastEndURL = 
//var storedZipOrCity;
//var forecast ={};


function getData(fullURL){
    $.get(fullURL, function(data){
        console.log(data);

        $(".content").append(
            `
            <h2>Forecast Information</h2>
            <p>City Name: ${data.location.name}</p>
            <p>State: ${data.location.region}</p>
            <p>Latitude: ${data.location.lat}</p>
            <p>Longitude: ${data.location.lon}</p>
            <p>Current Time: ${data.location.localtime}</p>
            <p>Wind Degree: ${data.current.wind_degree}</p>
            <p>Wind Direction: ${data.current.wind_dir}</p>
            <h1>---------------------------------</h1>
            
            `
        )
        daysforecast = data.forecast;
        console.log(daysforecast);

        parseForecast(daysforecast);

    }).catch(function(error){
        console.log(error);
        console.log("invalid zipcode");
    });
}

function initListeners(){
    $("#getWeather").click(function() {
        var zip = $("#zipcode").val();
        var daycount = $("#daycount").val();
        var connector = "&days=";
        console.log(daycount);
        var fullURL = baseURL + zip +connector + daycount;
        console.log(fullURL);
        getData(fullURL);
    });
}

function parseForecast(daysforecast){
    

    $.each(daysforecast, function(idx, forecastdays) {
        $.each(forecastdays, function(idx, forecastday) {
            console.log(forecastday);

            $(".content").append(

                 `
                 <h3>Day: ${forecastday.date} </h3>
                 <p>Average Humidity: ${forecastday.day.avghumidity}</p>
                 <p>Average Temp (C): ${forecastday.day.avgtemp_c}</p>
                 <p>Average Temp(F): ${forecastday.day.avgtemp_f}</p>
                 <p>Average Visbility(KM): ${forecastday.day.avgvis_km}</p>
                 <p>Average Visibility(MI): ${forecastday.day.avgvis_miles}</p>
                 <img src=" ${forecastday.day.condition.icon} ">
                 <p>Weather: ${forecastday.day.condition.text}</p>
                 <p>Chance of Rain: ${forecastday.day.daily_chance_of_rain}</p>
                 <p>Chance of Snow: ${forecastday.day.daily_chance_of_snow}</p>
                 <p>Max Temp(C): ${forecastday.day.maxtemp_c}</p>
                 <p>Max Temp(F): ${forecastday.day.maxtemp_f}</p>
                 <p>Min Temp(C): ${forecastday.day.mintemp_c}</p>
                 <p>Min Temp(F): ${forecastday.day.mintemp_f}</p>
                 <p>Max Wind Speed (KPH): ${forecastday.day.maxwind_kph}</p>
                 <p>Max Wind Speed (MPH): ${forecastday.day.maxwind_mph}</p>
                 <p>Total Precipitation (IN): ${forecastday.day.totalprecip_in}</p>
                 <p>Total Precipitation (MM): ${forecastday.day.totalprecip_mm}</p>
                 <p>UV Index: ${forecastday.day.uv}</p>

                 <h1>---------------------------------</h1>

                 `   

            )
            
            $(".astrology").append(
                `
                
                <h3>Astrology For: ${forecastday.date}</h3>
                <p>Moonrise: ${forecastday.astro.moonrise}</p>
                <p>Moonset: ${forecastday.astro.moonset}</p>
                <p>Sunrise: ${forecastday.astro.sunrise}</p>
                <p>Sunset: ${forecastday.astro.sunset}</p>
                
                `
            )

        });
    });
}

$(document).ready(function() {
    initListeners();
});
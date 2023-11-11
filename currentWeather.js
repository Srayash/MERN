const apiKey = "4236ab8c7654596ba7533fa5099be3cd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBar = document.querySelector(".searchBar input");
const locButton = document.getElementById("btn");
const searchBtn = document.querySelector(".searchBar button");
const weatherIcon = document.querySelector(".weatherIcon");

// refresh on Hitting logo

const logo= document.querySelector(".logo");

logo.addEventListener("click", ()=>{
    location.reload();
})

// adding currentWeather

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".currentWeather").style.display="none";
        document.querySelector(".bottomSection").style.display="none";
        document.querySelector(".emote").src="https://media.giphy.com/media/Hzdph9ISDR3e5q0UBy/giphy.gif?cid=ecf05e47iobajmkv4fiyeds7zbiydoosrpcdga4294w3kj3e&ep=v1_stickers_search&rid=giphy.gif&ct=s"
    }

    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".tempMain").innerHTML =  Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".windspeed").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".weatherMain").innerHTML = data.weather[0].main;

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "./Icons/Cloudy.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "./Icons/Rain.png"
    }
    else if(data.weather[0].main == "Thunderstorm"){
        weatherIcon.src = "./Icons/Bolt.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "./Icons/Sunny.png"
    }

    

    document.querySelector(".currentWeather").style.display = "flex";
    document.querySelector(".bottomSection").style.display = "block";
    document.querySelector(".error").style.display="none";
    document.querySelector(".emote").src="https://media.giphy.com/media/Ku9szLGyD3RuMb2hmB/giphy.gif?cid=ecf05e47iobajmkv4fiyeds7zbiydoosrpcdga4294w3kj3e&ep=v1_stickers_search&rid=giphy.gif&ct=s"
}

let locationButton = document.getElementById("btn");

locationButton.addEventListener("click", ()=> {
        navigator.geolocation.getCurrentPosition
        (showLocation);
    });

const showLocation= async (position) => {
    let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);


let dataLoc = await response.json();
checkWeather(dataLoc.address.postcode); 
};

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBar.value);
})

locButton.addEventListener("click", ()=>{
    checkWeather(dataLoc.address.postcode)
})


checkWeather();

const testLMap = new L.Map("map", {
    key: "web.c86fb42531a3486f86d842cdafc96c4e",
    maptype: "neshan",
    poi: false,
    traffic: false,
    center: [31.5591, 53.6247],
    zoom: 5,
})

testLMap.on('click', function (e) {
    //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    checkWeather(e.latlng.lat, e.latlng.lng);
});

const apiKy = "61ce2cf3d405c33feabd140528358391";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

let weatherIcon="";

async function checkWeather(lat, lon) {
    const response = await fetch(apiUrl + `&lat=${lat}` + `&lon=${lon}` + `&appid=${apiKy}`);

    var data = await response.json();

    switch (data.weather[0].main) {
        case 'Clouds':
            weatherIcon = "images/clouds.png";
            break;
        case 'Clear':
            weatherIcon = "images/clear.png";
            break;
        case 'Rain':
            weatherIcon = "images/rain.png";
            break;
        case 'Drizzle':
            weatherIcon = "images/drizzle.png";
            break;
        case 'Mist':
            weatherIcon = "images/mist.png";
            break;
        default:
            break;
    }

    Swal.fire({
        background:'linear-gradient(135deg, #00feba, #5b548a)',
        width: 350,
        padding: "0,0,10px,0",
        showConfirmButton: false,
        showCloseButton: true,
        html:
        `<div class="weather">
        <img src=${weatherIcon} class="img-fluid">
        <h1 class="text-center text-white">${Math.round(data.main.temp)}°c</h1>
        <h2 class="text-center text-white">${data.name}</h2>
        <div class="d-flex justify-content-around">
            <div class="col d-flex justify-content-center align-items-center">
                <img src="images/humidity.png">
                <div>
                    <p class="text-start text-white humidity">${data.main.humidity}%</p>
                    <p class="text-start text-white">humidity</p>
                </div>
            </div>
            <div class="col d-flex justify-content-center align-items-center">
                <img src="images/wind.png">
                <div>
                    <p class="text-start text-white Wind">${data.wind.speed}km/h</p>
                    <p class="text-start text-white">Wind Speed </p>
                </div>
            </div>
        </div>
    </div>`
    });

    

}
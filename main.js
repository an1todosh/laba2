const coords = [50.485474, 30.462582];
const coords1 = [49.239121, 28.423435];
const coords2 = [53.8843138, 27.3131922];

const map = L.map('map').setView(coords, 6);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    zoom: 2,
    id: 'mapbox/navigation-guidance-day-v4',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiemFta292YSIsImEiOiJja2E5bzhodzcwb3d2MnlvMzQwZG91dHJ3In0.OWsDw9dxq3wA9-eruYNang'
}).addTo(map);

async function getWeather(lat, lng) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=1b5ee5a1a74d624a74750350327ea372`);
    const result = await response.json();
    const weather = result['weather'][0];
    const myIcon = L.icon({
        iconUrl: `http://openweathermap.org/img/w/${weather.icon}.png`,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
    });

    L.marker([lat, lng], {
        icon: myIcon
    }).addTo(map);
}

map.on('click', function (ev) {
    var newCoords = ev.latlng;
    getWeather(newCoords.lat, newCoords.lng);
});

getWeather(coords[0], coords[1]);
getWeather(coords1[0], coords1[1]);
getWeather(coords2[0], coords2[1]);

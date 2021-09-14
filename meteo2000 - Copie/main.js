const divContent = document.querySelector('.content');
const divForm = document.querySelector('.form');
const token = "fd870a6f268bda29e0ac3ed28ba22ccb";
const tokenIp = "a3844b4e639e483b8aaa70beece724c3";
const h1 = document.querySelector('h1');
const title = document.querySelector('title');

formChoixVille();

function formChoixVille() {

    divForm.innerHTML = 
        `<div class="form-group mb-3 justify-content-center col-6">
            <h5 class="text-primary">Entrez une ville : </h5>
            <input id="input-ville" class="form-control form-control-lg" type="text" placeholder="Nom de la ville " id="inputLarge">
        </div>
        <div>
        <button class="btn btn-primary" id="btn-ville">Voir la météo</button>
        <button class="btn btn-primary" id="btn-ville-position">Voir la météo à ma position</button>
        </div>`;

    const inputVille = document.querySelector('#input-ville');
    const btnVille = document.querySelector('#btn-ville');

    btnVille.addEventListener('click', ()=> {
        if (inputVille.value != "") {
            getMeteo(inputVille.value);
        } else {
            alert('Veuillez entrer une ville')
        }
        inputVille.value = "";
    })

    const btnVillePosition = document.querySelector('#btn-ville-position');
    btnVillePosition.addEventListener('click', ()=> {
        ip();
        inputVille.value = "";
    })

}

ip();

function getMeteo(ville) {

    let url = `http://api.openweathermap.org/data/2.5/weather?appid=${token}&q=${ville}&units=metric&lang=fr`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);

    xhr.onreadystatechange = function() { 
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            xhr.onload = () => {
                let weatherObject = JSON.parse(xhr.responseText);
                console.log(weatherObject);
                showMeteo(weatherObject, ville);
            }
        } else {
            alert('La ville ' + ville +' n\'existe pas, veuillez entrer une ville valide')
        }
    }
   
    xhr.send()

}

function showMeteo(weatherObject, ville){

    let temperature = weatherObject.main.temp;
    let temperatureRessentie = weatherObject.main.feels_like;
    let vent = weatherObject.wind.speed;

    let arrayTemps = weatherObject.weather;
        let temp = arrayTemps[0];
        let temps = temp.description;

    let arrayMain = weatherObject.weather;
        let temp2 = arrayMain[0];
        let temps3 = temp2.main;
    console.log(arrayMain);
    switch (temps3) {
        case 'Clouds' :
            document.body.style.backgroundImage = "url('img/clouds.jpg')";
            title.innerHTML = "☁️ Météo de " + ville;
            break;
        case 'Thunderstorm' :
            document.body.style.backgroundImage = "url('img/thunderstorm.jpg')";
            title.innerHTML = "🌩️ Météo de " + ville;
            break;
        case 'Drizzle' :    
            document.body.style.backgroundImage = "url('img/drizzle.jpg')";
            title.innerHTML = "☂️ Météo de " + ville;
            break;
        case 'Rain' : 
            document.body.style.backgroundImage = "url('img/rain.jpg')";
            title.innerHTML = "🌧️ Météo de " + ville;
            break;
        case 'Snow' : 
            document.body.style.backgroundImage = "url('img/snow.jpg')";
            title.innerHTML = "❄️ Météo de " + ville;
            break;
        case 'Clear' : 
            document.body.style.backgroundImage = "url('img/clear.jpg')";
            title.innerHTML = "🌞 Météo de " + ville;
            break;
        default : 
            title.innerHTML = "🌫️ Météo de " + ville;
            document.body.style.backgroundImage = "url('img/default.jpg')";
    }

    divContent.innerHTML = 
        `<div class="card">
            <div class="card-body">
                <h5 class="card-title">Météo de ${ville} : </h5>
                <p>
                    <ul>
                        <li>Ciel : ${temps}</li>
                        <li>Temperature : ${temperature} °C, (ressentie : ${temperatureRessentie} °C)</li>
                        <li>Vitesse du vent : ${vent} m/s</li>
                    </ul>
                </p>
            </div>
        </div>`;

    h1.innerHTML = "Météo de " + ville;
}
 
function ip() {
    let url = `https://api.ipify.org`;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = () => {
        let ip = xhr.responseText;
            getCityByIp(ip);
    }
    xhr.send()
}

function getCityByIp(ip) {

    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${tokenIp}&ip=${ip}&lang=fr`;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = () => {
        let ville = JSON.parse(xhr.responseText);
            getMeteo(ville.city);
    }
    xhr.send()
}

favicon();

function favicon() {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link = '🌞';
}
fetch("https://restcountries.com/v2/all")
    .then(response => response.json())
    .then(data => Countrydata(data))
    .catch(error => console.log(error))

function Countrydata(data) {
    var container = document.querySelector(".container");
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let i = 0; i < data.length; i++) {
        var col = document.createElement("div");
        col.setAttribute("class", "col-lg-4 col-sm-12"); // Updated class name
        var card = document.createElement("div");
        card.setAttribute("class", "card");
        var cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "card-header");
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        cardBody.style.backgroundColor = "rgb(194, 191, 191)";
        var name = document.createElement("div");
        name.setAttribute("class", "main");
        name.style.backgroundColor = "black";
        name.style.color = "white";
        name.textContent = data[i].name;
        var flag = document.createElement("img");
        flag.setAttribute("src", data[i].flag);
        flag.setAttribute("class", "img-thumbnail");
        flag.style.width = "300px";
        flag.style.height = "200px";
        var capital = document.createElement("div");
        capital.setAttribute("class", "cydetails");
        capital.textContent = "Capital: " + data[i].capital;
        var region = document.createElement("div");
        region.setAttribute("class", "cydetails");
        region.textContent = "Region: " + data[i].region;
        var cioc = document.createElement("div");
        cioc.setAttribute("class", "cydetails");
        cioc.textContent = "Country code: " + data[i].cioc;
        var lat = data[i].latlng[0];
        var lng = data[i].latlng[1];
        var weatherBtn = document.createElement("button");
        weatherBtn.setAttribute("class", "card cydetails btn btn-primary");
        weatherBtn.textContent = "Click for weather";
        weatherBtn.style.display = "block";
        weatherBtn.style.margin = "5px auto";
        weatherBtn.addEventListener("click", function () {
            showWeather(data[i].latlng[0], data[i].latlng[1]);
        });
        cardBody.append(name, flag, capital, region, cioc, weatherBtn);
        card.append(cardHeader, cardBody);
        col.append(card);
        row.append(col);
        container.append(row);
    }
}


function showWeather(lat, lng) {
    var res = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b5c1876ade71064f26c4332ff7ae0116`)
    res.then((d) => d.json()).then((data) => getWeather(data)).catch((err) => console.log(err))
}

function getWeather(data) {
    var modal = document.getElementById('weatherModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.setAttribute('class', 'modal fade');
        modal.setAttribute('id', 'weatherModal');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'weatherModalLabel');
        modal.setAttribute('aria-hidden', 'true');
        var modalDialog = document.createElement('div');
        modalDialog.setAttribute('class', 'modal-dialog');
        modalDialog.setAttribute('role', 'document');
        var modalContent = document.createElement('div');
        modalContent.setAttribute('class', 'modal-content');
        var modalHeader = document.createElement('div');
        modalHeader.setAttribute('class', 'modal-header');
        var modalTitle = document.createElement('h5');
        modalTitle.setAttribute('class', 'modal-title');
        modalTitle.setAttribute('id', 'weatherModalLabel');
        modalTitle.innerText = 'Weather for your location';
        var modalBody = document.createElement('div');
        modalBody.setAttribute('class', 'modal-body');
        var modalFooter = document.createElement('div');
        modalFooter.setAttribute('class', 'modal-footer');
        var closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('class', 'btn btn-secondary');
        closeButton.setAttribute('data-dismiss', 'modal');
        closeButton.innerText = 'Close';
        modalFooter.appendChild(closeButton);
        modalHeader.appendChild(modalTitle);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        document.body.appendChild(modal);
    }
    var modalBody = modal.querySelector('.modal-body');
    var weatherDesc = data.weather[0].description;
    var temp = Math.round(data.main.temp - 273.15);
    var feelsLike = Math.round(data.main.feels_like - 273.15);
    var humidity = data.main.humidity;
    modalBody.innerHTML = `
      <p>Weather: ${weatherDesc}</p>
      <p>Temperature: ${temp}&deg;C</p>
      <p>Feels like: ${feelsLike}&deg;C</p>
      <p>Humidity: ${humidity}%</p>
    `;
    $('#weatherModal').modal('show');
}




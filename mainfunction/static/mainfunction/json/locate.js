searchBtn = document.querySelector("#btn-search");

let getLocationPromise = new Promise((resolve, reject) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude
            long = position.coords.longitude
            resolve(
                position.coords
                );
        }, () => { }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })

    } else {
        reject("your browser doesn't support geolocation API")
    }
})

async function getLocation() {
    var ret;
    await getLocationPromise.then((location) => {
        ret = location;
    }).catch((err) => {
        console.log(err)
    })
    return ret;
}

async function getAddress() {
    searchbtn
    const coords = await getLocation();
    console.log(coords);
    api_url = `https://api.geoapify.com/v1/geocode/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json&apiKey=4b08f58977ec4401b0c5dbf49fdae3b7`
    const response = await fetch(api_url);
    const address = await response.json();

    console.log(address);
    console.log(address['results'][0]['formatted']);
    return address['results'][0]['formatted'];
}

async function alertAddress() {
    alert(await getAddress());
}

async function getNearbyLib() {
    const coords = await getLocation();
    //console.log(coords);
    api_url = `https://api.geoapify.com/v2/places?categories=education
    .library&filter=circle:${coords.longitude},${coords.latitude},5000&bias=proximity:${coords.longitude},${coords.latitude}&limit=10&apiKey=4b08f58977ec4401b0c5dbf49fdae3b7`
    //console.log(api_url);
    const response = await fetch(api_url);
    const libs = await response.json();   
    return libs;
}

async function showLib() {
    searchBtn.innerText = "Loading..."
    const resultContainer = document.querySelector(".search-result")
    while(resultContainer.firstChild){
        resultContainer.removeChild(resultContainer.firstChild);
    }
    const title_el = document.createElement("p");
    title_el.classList.add("search-title");
    title_el.innerText = "Search result:"
    resultContainer.appendChild(title_el);

    var len = (await getNearbyLib())['features'].length;
    for (let i=0; i<len; i++){
        if(typeof((await getNearbyLib())['features'][i]['properties']['name'])!="undefined"){
             //console.log((await getNearbyLib())['features'][i]['properties']['formatted']);


            const result_el = document.createElement("div");
            result_el.classList.add("result");

            const content_el = document.createElement("div");
            content_el.classList.add("result-content");


            const content_name_el = document.createElement("a");
            content_name_el.setAttribute('href', 'https://www.google.com.my/maps/search/'+(await getNearbyLib())['features'][i]['properties']['formatted']);
            content_name_el.setAttribute('target', '_blank');
            content_name_el.classList.add("result-content-name");
            content_name_el.innerText = (await getNearbyLib())['features'][i]['properties']['name'];

            const content_address_el = document.createElement("p");
            content_address_el.classList.add("result-content-address");
            content_address_el.innerText = (await getNearbyLib())['features'][i]['properties']['formatted'];

            content_el.appendChild(content_name_el);
            content_el.appendChild(content_address_el);
            result_el.appendChild(content_el);
            resultContainer.appendChild(result_el);
        }
       
    }
    searchBtn.innerText = "Search";
}

searchBtn.addEventListener("click", showLib);


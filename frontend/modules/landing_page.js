import config from "../conf/index.js";
console.log(config.backendEndpoint);
console.log("It is  working");
async function init() {
  console.log("Init is working");
  //Fetches list of all cities along with their images and description
    let cities = await fetchCities();
    //Updates the DOM with the cities
    if (cities) {
      cities.forEach((key) => {
        console.log("I am freedom");
        addCityToDOM(key.id, key.city, key.description, key.image);
      });
    }
  
    // console.log("ERROR", e);
    // console.error('Error fetching cities:', e);
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
  let response = await fetch(`${config.backendEndpoint}/cities`);
  console.log(response);
  let cities = await response.json(); // Parse the response body as JSON
  console.log(cities);
  return cities;
  }
  catch(e) {
    return null;
  }


}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  console.log(id);
  console.log(city);
  console.log(description);
  console.log(image);
  const divCard = document.getElementById("data");
  console.log(divCard);
  const newCard = document.createElement("div");
  newCard.className = "col-12 col-md-6 col-lg-3 mb-4";
  newCard.innerHTML = `
  <a href="./pages/adventures/?city=${id}" id="${id}">
          <div class="tile">
            <div class="tile-text text-centre">
              <h5>${city}</h5>
              <p>${description}</p>
            </div>
            <img class="image-responsive" src='${image}'>
          </div>
        </a>
  `;

  divCard.appendChild(newCard);
}

export { init, fetchCities, addCityToDOM };

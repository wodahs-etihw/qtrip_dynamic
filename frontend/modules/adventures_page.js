import config from "../conf/index.js";
console.log(config.backendEndpoint);
//Implementation to extract city from query params
// let urlParameter = location;
// console.log(urlParameter);
// let search = urlParameter.search;
// console.log(search);
function getCityFromURL(search) {
  console.log(search);
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  // console.log(params.get("city"));
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    // let cityName = getCityFromURL(search);
    // console.log("cityName->" + cityName)
    let cityAdventures = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    // console.log(cityAdventures);
    let citiesAdventuresJson = await cityAdventures.json(); // Parse the response body as JSON
    // console.log(citiesAdventuresJson);
    // console.log(typeof citiesAdventuresJson);
    return citiesAdventuresJson;
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // console.log(adventures);
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let row = document.getElementById("data");
  row.innerHTML = "";
  adventures.forEach((element) => {
    let codeHtml = `<div class="col-sm-6 col-lg-3 my-4">
    <a href="detail/?adventure=${element.id}" id="${element.id}" target="_blank">
        <div class="activity-card">
            <div class="category-banner">
                <h5 class="my-0">${element.category}</h5>
            </div>
            <img
                src="${element.image}">
            <div class="d-flex justify-content-between align-items-center py-2" style="width: 90%">
                <div>
                    <h6>${element.name}</h6>
                    <h6>Duration</h6>
                </div>
                <div>
                    <h6>${element.costPerHead}</h6>
                    <h6>${element.duration}</h6>
                </div>
            </div>
        </div>
    </a>
  </div>`;
    row.innerHTML += codeHtml;
  });

  // row.append(codeHtml);
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  console.log("filterByDuration", list, low, high);
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter(
    (key) => key.duration >= low && key.duration <= high
  );
  console.log(filteredList);
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log("filterByCategory",list ,categoryList);
  let filteredData = [];
  categoryList.forEach((cat) => {
    let filtered = list.filter((c) => {
      return c.category == cat;
    });
    // console.log(filtered ) ;
    filteredData = filteredData.concat(filtered);
  });

  console.log("filteredData", filteredData);
  return filteredData;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  console.log(list);
  console.log(filters);
  // console.log(filters.category);

  // console.log("filters.category->", filters.category.length);
  // console.log("filters.duration->", filters.duration.length);
  if (filters.duration.length > 0 && filters.category.length > 0) {
    console.log("Both condition satisfied");
    let str = filters.duration;
    let splitValues = str.split("-");
    let low = splitValues[0];
    let high = splitValues[1];
    console.log(low);
    console.log(high);
    let durationSelected = filterByDuration(list, low, high);
    let durationAndCategory = filterByCategory(
      durationSelected,
      filters.category
    );
    return durationAndCategory;
    console.log("durationAndCategory", durationAndCategory);
  } else if (filters.duration.length > 0) {
    let str = filters.duration;
    let splitValues = str.split("-");
    let low = splitValues[0];
    let high = splitValues[1];
    console.log(low);
    console.log(high);
    return filterByDuration(list, low, high);
  } else if (filters.category.length > 0) {
    return filterByCategory(list, filters.category);
  } else {
    console.log("Else Part Running");
  }

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  console.log("saveFiltersToLocalStorage",filters)
  localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

// let remove = document.getElementsByClassName('remove');
// remove.addEventListener("click",()=>{

// });

function generateFilterPillsAndUpdateDOM(filters) {
  console.log("generateFilterPillsAndUpdateDOM", filters.category);
  let generatePill = filters.category; // Assuming generatePill is an array of categories
  let categoryPill = document.getElementById("category-list");
  categoryPill.innerHTML = ""; // Clear the innerHTML before appending new pills

  generatePill.forEach((e) => {
    // Create a new pill element for each category
    let pill = document.createElement("div");
    pill.classList.add(
      "category-filter",
      "badge",
      "rounded-pill",
      "text-dark",
      "p-2",
      "text-capitalize",
      "text-center"
    );
    pill.innerHTML = `
          ${e}
      `;

    // Append the pill to the category list
    categoryPill.appendChild(pill);
  });

  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

import config from "../conf/index.js";
//13.200.12.224:8082/adventures/detail?adventure=2447910730
http: console.log(config.backendEndpoint);

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const adventureId = urlParams.get("adventure");
  console.log("adventureId", adventureId);

  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    let adventureDetail = await response.json();
    console.log("adventureDetail", adventureDetail);
    return adventureDetail;
  } catch (e) {
    console.log("Error" + Error);
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log("adventure", adventure);
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  adventure.images.forEach((imageLink) => {
    let img = document.createElement("img");
    img.src = imageLink;
    img.classList.add("activity-card-image");
    img.alt = "Adventure Image";
    document.getElementById("photo-gallery").append(img);
  });
  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
  images.map((image, index) => {
    let ele = document.createElement("div");
    ele.className = `carousel-item ${index === 0 ? "active" : ""}`;
    ele.innerHTML = `
     <img
     src=${image}
     alt="Images"
     class="activity-card-image rounded-2"
     />
     `;
    document.getElementById("carousel-inner").appendChild(ele);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead
  console.log("conditionalRenderingOfReservationPanel", adventure);
  if (adventure.available === true) {
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;

  } else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = totalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  document.getElementById("myForm").addEventListener("submit",async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get form data
    const formData = new FormData(this);
    console.log(formData);
    const name = formData.get("name");
    const date = formData.get("date");
    const person = formData.get("person");
    const adventureID = adventure.id;
    console.log("Name:", name);
    console.log("date:", date);
    console.log("person", person);
    console.log("adventureID", adventureID);
    let bookingData = {name: name,date:date,person: person, adventure:adventureID }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    };

    console.log(options);

    try {
      let response =await fetch(`${config.backendEndpoint}/reservations/new`, options);
      console.log(response);
      if (response.ok) {
        alert("success!");
        window.location.reload();
      }
      else {
        let data =await response.json();
        console.log(data);
        alert(`Failed`);
      }

    } catch (error) {
       console.log("error",error);
    }


    // You can then use the form data as needed, such as sending it to a server via AJAX
  });

  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
   }
   else{
    document.getElementById("reserved-banner").style.display="none"
   }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let res = await fetch(`${config.backendEndpoint}/reservations`);
    let reservation = await res.json();
    console.log(reservation);
    return reservation;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  document.getElementById("no-reservation-banner").style.display = "none";
  document.getElementById("reservation-table-parent").style.display = "block";
  if (reservations.length > 0) {
    console.log("addReservationToTable", reservations);
    var table = document.getElementById("reservation-table");
    reservations.forEach((data) => {
      let tableRow = document.createElement("tr");
      
      let getDate = new Date(data.time).toLocaleString("en-IN", {
        year:"numeric",
        day:"numeric",
        month:"long",
        hour:"numeric",
        minute:"numeric",
        second:"numeric",
        hour12: true,
      })

      var convertedDateString = getDate.replace(" at", ",").trim();
      console.log(convertedDateString);
      tableRow.innerHTML = `
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.adventureName}</td>
    <td>${data.person}</td>
    <td>${new Date(data.date).toLocaleDateString("en-IN")}</td>
    <td>${data.price}</td>
    <td>${convertedDateString}</td>
    <td><div class="reservation-visit-button" id=${data.id}>
    <a href="../detail/?adventure=${
      data.adventure
    }">Visit Adventure</a></div></td>`;

      table.append(tableRow);
    });
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };

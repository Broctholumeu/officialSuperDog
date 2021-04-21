let eventArray = [{
    name: "Comic Con",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "6/1/2017"
}, {
    name: "Comic Con",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "6/1/2018"
}, {
    name: "Comic Con",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "6/1/2019"
}, {
    name: "Comic Con",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "6/1/2017"
}, {
    name: "Comic Con",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "6/1/2018"
}, {
    name: "Comic Con",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "6/1/2019"
}, {
    name: "Heroes Con",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "6/1/2017"
}, {
    name: "Heroes Con",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "6/1/2018"
}, {
    name: "Heroes Con",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "6/1/2019"
}];

// Filtered events below
let filteredEvents = eventArray;

function buildDropDown() {
    let eventDD = document.getElementById("eventDropDown");
    let curEvents = JSON.parse(sessionStorage.getItem("eventArray")) || eventArray;
    // filtering data to capture distint items from "thing"
    // ...; three dot notation allows things to happen
    let distinctEvents = [...new Set(curEvents.map((event) => event.city))];

    // below is a string of HTML
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All">All</a>';
    let resultHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        // The "getEvents(this)"represents the entire a tag
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultHTML += linkHTMLEnd;
    eventDD.innerHTML = resultHTML;
    displayStats();
}



// stats function below
function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }

    average = total / filteredEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        // placing a format so no remainders
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
}

// Get events for selected city
function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(sessionStorage.getItem("eventArray")) || eventArray;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if (city !== "ALL") {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        });
    }
    displayStats();
}

// Below is for lower table

loadEventBook();
// Below is the parent of all our data currently
function loadEventBook() {
    let eventBook = [];
    eventBook = getData();
    displayData(eventBook);
}

// This is a local storage type application
// localStorage.getItem scours entire code in site searching for array or creates an empty new array
function getData() {
    let eventBook = JSON.parse(sessionStorage.getItem("eventArray")) || [];

    // after searching local, if one is not found (0) then this creates a new array,
    // eventArray, asign it to adressBook and then assign it to the localstorage
    if (eventBook.length == 0) {
        eventBook = eventArray;
        sessionStorage.setItem("eventArray", JSON.stringify(eventArray));
    }
    return eventBook;
}

// creates address locally in function below
function saveEvent() {
    // Grab the events out of local storage
    let eventBook = JSON.parse(sessionStorage.getItem("eventArray")) || eventArray;

    // below identifies object and then assigns it to it's new property
    // Below also creates the exact same "object" as we made at the top of this file
    let obj = {};
    obj["name"] = document.getElementById("newName").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = parseInt(document.getElementById("newAttendance").value, 10);
    obj["date"] = new Date(document.getElementById("newDate").value).toLocaleDateString();

    // puts captured info at end of array; push
    eventBook.push(obj);
    // sets item, replaces what was there before
    sessionStorage.setItem("eventArray", JSON.stringify(eventBook));

    // access the values from the form by ID and add an object to the array
    document.forms[0].reset();
    buildDropDown();
    displayData(eventBook);
}

function displayData(eventBook) {
    const template = document.getElementById("resultsData-Template");
    const resultsBody = document.getElementById("resultsBody");
    // clear table first
    resultsBody.innerHTML = "";

    for (let i = 0; i < eventBook.length; i++) {
        const dataRow = document.importNode(template.content, true);
        // apply items into array based on objects we refer to
        dataRow.getElementById("name").textContent = eventBook[i].name;
        dataRow.getElementById("city").textContent = eventBook[i].city;
        dataRow.getElementById("state").textContent = eventBook[i].state;
        dataRow.getElementById("attendance").textContent = eventBook[i].attendance;
        dataRow.getElementById("date").textContent = eventBook[i].date;

        resultsBody.appendChild(dataRow);
    }
}
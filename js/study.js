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
    let distinctEvents = [...new Set(eventArray.map((event) => event.city))];
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All">All</a>';
    let resultHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }
    resultHTML += linkHTMLEnd;
    eventDD.innerHTML = resultHTML;
    displayStats();
    displayData(curEvents);
}


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
    document.getElementById("average").innerHTML = average.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString(
        // placing a format so no remainders
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}

function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(sessionStorage.getItem("eventArray")) || eventArray;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if (city != "ALL") {
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

function loadEventBook() {
    let eventBook = [];
    eventBook = getData();
    displayData(eventBook);
}

function getData() {
    let eventBook = JSON.parse(sessionStorage.getItem("eventArray")) || [];
    if (eventBook.length == 0) {
        eventBook = eventArray;
        sessionStorage.setItem("eventArray", JSON.stringify(eventArray));
    }
    return eventBook;
}

function saveEvent() {
    let eventBook = JSON.parse(sessionStorage.getItem("eventArray")) || eventArray;
    let obj = {};
    obj["name"] = document.getElementById("newName").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = parseInt(document.getElementById("newAttendance").value, 10);
    obj["date"] = new Date(document.getElementById("newDate").value).toLocaleDateString();
    eventBook.push(obj);
    sessionStorage.setItem("eventArray", JSON.stringify(eventBook));

    buildDropDown();
    displayData(eventBook);
}

function displayData(eventBook) {
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
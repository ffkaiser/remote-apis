
// Fetch function
async function fetchCountriesData() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/region/europe");
        if (!response.ok) {
            console.log(`Network response was not ok - Status: ${response.status}`);
            return;
        }
        const data = await response.json();
        console.log(data);
        // Verify the code is working by logging the data to the console
        console.log(data);
        // Call the display function
        displayCountriesData(data);
    } catch (error) {
        const container = document.getElementById("remote-data-container");
        container.innerHTML = '<p class="error">⚠️ Failed to load data. Please try again later.</p>';   
        console.error(`Error fetching data: ${error}`);
    }
}

async function fetchUsersData() {
    try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        if (!response.ok) {
            console.log(`Network response was not ok - Status: ${response.status}`);
            return;
        }
        const data = await response.json();
        console.log(data);
        // Verify the code is working by logging the data to the console
        console.log(data);
        // Call the display function
        displayUsersData(data.results);
    } catch (error) {
        const container = document.getElementById("remote-data-container");
        container.innerHTML = '<p class="error">⚠️ Failed to load data. Please try again later.</p>';   
        console.error(`Error fetching data: ${error}`);
    }
}

async function fetchRickMortyData() {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");

        if (!response.ok) {
            console.log(`Network response was not ok - Status: ${response.status}`);
            return;
        }

        const data = await response.json();

        console.log(data); // ✅ Log first (as required)

        // Characters array is inside data.results
        displayRickMortyData(data.results);

    } catch (error) {
        const container = document.getElementById("remote-data-container");
        container.innerHTML = '<p class="error">⚠️ Failed to load data. Please try again later.</p>';
        console.error(`Error fetching data: ${error}`);
    }
}

// Display function
function displayCountriesData(countriesArray) {
    const container = document.getElementById("remote-data-container");
    let htmlOutput = "";

    countriesArray.forEach(country => {
        htmlOutput += `
    <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px;"><img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
         <p>
            <b>${country.name.common}</b><br>
            Capital: ${country.capital[0]}<br>
            Population: ${country.population.toLocaleString()}<br>            
            Region: ${country.region}
         </p>
    </div>
`;
    });

    container.innerHTML = htmlOutput;
}

function displayUsersData(usersArray) {
    const container = document.getElementById("remote-data-container");
    let htmlOutput = "";

    usersArray.forEach(user => {
        htmlOutput += `
        <p><img src="${user.picture.thumbnail}" alt="Picture of ${user.name.first} ${user.name.last}" width="50"></p>
            <p>
            <b>${user.name.first} ${user.name.last}</b><br>
            Email: ${user.email}<br>              
            Location: ${user.location.city}, ${user.location.country}
            </p>
        `;
    });
    container.innerHTML = htmlOutput;
}

function displayRickMortyData(rmArray) {
    const container = document.getElementById("remote-data-container");
    let htmlOutput = "";

    rmArray.forEach(character => {
        htmlOutput += `
        <p><img src="${character.image}" alt="Image of ${character.name}" width="50"></p> 
        <p> 
        <b>${character.name}</b><br> 
        Status: ${character.status}<br> 
        Species: ${character.species} 
        </p>
        `;
    });

    container.innerHTML = htmlOutput;
}

// Event listener on the parent container

// Event listener on the parent container
document.getElementById("button-container").addEventListener("click", function(e) {

    const button = e.target.closest("button");
    if (!button) return;

    if (button.id === "btn-countries") {
        fetchCountriesData();
    } 
    else if (button.id === "btn-users") {
        fetchUsersData();
    }
    else if (button.id === "btn-rm") {
        fetchRickMortyData();
    }
});


async function fetchCountriesData() {

    const region = document.getElementById("region-select").value;

    try {

        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);

        if (!response.ok) {
            console.log("Network error:", response.status);
            return;
        }

        const data = await response.json();

        console.log(data);

        displayCountriesData(data);

    } catch (error) {

        const container = document.getElementById("remote-data-container");
        container.innerHTML = "<p>⚠️ Failed to load countries.</p>";

        console.error(error);
    }
}



async function fetchUsersData() {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            console.log("Network error:", response.status);
            return;
        }

        const data = await response.json();

        console.log(data);

        displayUsersData(data);

    } catch (error) {

        const container = document.getElementById("remote-data-container");
        container.innerHTML = "<p>⚠️ Failed to load users.</p>";

        console.error(error);
    }
}



async function fetchRickMortyData() {

    try {

        const response = await fetch("https://rickandmortyapi.com/api/character");

        if (!response.ok) {
            console.log("Network error:", response.status);
            return;
        }

        const data = await response.json();

        console.log(data);

        displayRickMortyData(data.results);

    } catch (error) {

        const container = document.getElementById("remote-data-container");
        container.innerHTML = "<p>⚠️ Failed to load characters.</p>";

        console.error(error);
    }
}



async function searchRickMorty() {

    const name = document.getElementById("rm-search").value;

    try {

        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);

        if (!response.ok) {
            throw new Error("Character not found");
        }

        const data = await response.json();

        displayRickMortyData(data.results);

    } catch (error) {

        const container = document.getElementById("remote-data-container");
        container.innerHTML = "<p>No character found.</p>";

    }
}



function displayCountriesData(countriesArray) {

    const container = document.getElementById("remote-data-container");

    let html = "";

    countriesArray.forEach(country => {

        html += `
        <div class="card">

        <img src="${country.flags.png}" width="100">

        <p>
        <b>${country.name.common}</b><br>
        Capital: ${country.capital ? country.capital[0] : "N/A"}<br>
        Population: ${country.population.toLocaleString()}<br>
        Region: ${country.region}
        </p>

        </div>
        `;
    });

    container.innerHTML = html;
}



function displayUsersData(usersArray) {

    const container = document.getElementById("remote-data-container");

    let html = "";

    usersArray.forEach(user => {

        html += `
        <div class="card">

        <p>
        <b>${user.name}</b><br>
        Email: ${user.email}<br>
        City: ${user.address.city}<br>
        Company: ${user.company.name}
        </p>

        </div>
        `;
    });

    container.innerHTML = html;
}



function displayRickMortyData(rmArray) {

    const container = document.getElementById("remote-data-container");

    let html = "";

    rmArray.forEach(character => {

        html += `
        <div class="card">

        <img src="${character.image}" width="100">

        <p>
        <b>${character.name}</b><br>
        Status: ${character.status}<br>
        Species: ${character.species}
        </p>

        </div>
        `;
    });

    container.innerHTML = html;
}



document.getElementById("button-container").addEventListener("click", function(e){

    const button = e.target.closest("button");

    if(!button) return;

    if(button.id === "btn-countries"){
        fetchCountriesData();
    }

    else if(button.id === "btn-users"){
        fetchUsersData();
    }

    else if(button.id === "btn-rm"){
        fetchRickMortyData();
    }

});


document.getElementById("rm-search-btn").addEventListener("click", searchRickMorty);
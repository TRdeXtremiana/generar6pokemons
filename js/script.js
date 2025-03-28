
// Función para obtener un número aleatorio entre 1 y 1025 
function getRandomPokemonId() {
    return Math.floor(Math.random() * 1025 ) + 1;
}

// Función para elegir aleatoriamente uno de los métodos de búsqueda de Pokémon
function fetchPokemonRandomMethod() {
    const methods = [fetchPokemonXMLHttpRequest, fetchPokemonFetchAPI, fetchPokemonJQuery];
    const randomMethod = methods[Math.floor(Math.random() * methods.length)];

    randomMethod(); 
}


// 1. Método con XMLHttpRequest
function fetchPokemonXMLHttpRequest() {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = ""; // Limpiar el contenedor antes de añadir nuevos Pokémon

    for (let i = 0; i < 6; i++) {
        let xhr = new XMLHttpRequest();
        let id = getRandomPokemonId();
        xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${id}`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                displayPokemon(data);
            }
        };
        xhr.send();
    }
}

// 2. Método con Fetch API
function fetchPokemonFetchAPI() {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = ""; // Limpiar el contenedor antes de añadir nuevos Pokémon

    for (let i = 0; i < 6; i++) {
        let id = getRandomPokemonId();
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data => displayPokemon(data))
            .catch(error => console.error("Error fetching Pokémon:", error));
    }
}

// 3. Método con jQuery
function fetchPokemonJQuery() {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = ""; 

    for (let i = 0; i < 6; i++) {
        let id = getRandomPokemonId();
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
            method: "GET",
            success: function (data) {
                displayPokemon(data);
            },
            error: function (error) {
                console.error("Error fetching Pokémon:", error);
            }
        });
    }
}

// Función para mostrar la información de un Pokémon en el contenedor
function displayPokemon(pokemon) {
    const container = document.getElementById("pokemon-container");
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    
    card.innerHTML = `
        <h3>${pokemon.name.toUpperCase()}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Tipo: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
    `;
    container.appendChild(card);
}

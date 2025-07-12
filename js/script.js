let contador1 = 0;
let contador2 = 0;
let contador3 = 0;

let pokemon1 = null;
let pokemon2 = null;
let pokemon3 = null;

let cartaSeleccionada1 = null;
let cartaSeleccionada2 = null;
let cartaSeleccionada3 = null;

// Nos da un número aleatorio entre 1 y 1025 (todos los Pokémon)
function numAleatorio() {
    return Math.floor(Math.random() * 1025) + 1;
}

// Elegir aleatoriamente un método para cada jugador
function metodoAleatorio() {
    contador1 = 0;
    contador2 = 0;
    contador3 = 0;

    const contenedores = [
        contenedorJugador1 = document.getElementById("jugador1"),
        contenedorJugador2 = document.getElementById("jugador2"),
        contenedorJugador3 =document.getElementById("jugador3"),
    ];

    // Limpiar los contenedores
    contenedores.forEach(contenedor => {
        contenedor.innerHTML = '';
    });

    PokemonXMLHttpRequest(contenedorJugador1);
    PokemonFetchAPI(contenedorJugador2);
    PokemonJQuery(contenedorJugador3);
}

// 1. Método con XMLHttpRequest
function PokemonXMLHttpRequest(contenedor) {
    for (let i = 0; i < 6; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${numAleatorio()}`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                enseniaPokemon(data, contenedor);
            }
        };
        xhr.send();

        contador1++;
    }
}

// 2. Método con Fetch API
function PokemonFetchAPI(contenedor) {
    for (let i = 0; i < 6; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${numAleatorio()}`)
            .then(response => response.json())
            .then(data => enseniaPokemon(data, contenedor))
            .catch(error => console.error("Error fetching Pokémon:", error));

            contador2++;
    }
}

// 3. Método con jQuery
function PokemonJQuery(contenedor) {
    for (let i = 0; i < 6; i++) {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${numAleatorio()}`,
            method: "GET",
            success: function (data) {
                enseniaPokemon(data, contenedor);
            },
            error: function (error) {
                console.error("Error fetching Pokémon:", error);
            }
        });

        contador3++;
    }
}

// Asignar Pokémon al jugador correspondiente
function asignar(id, pokemon) {
    let jugador = 0;

    if (id === "jugador1") {
        jugador = 1;
        pokemon1 = pokemon;
            if (cartaSeleccionada1) {
                cartaSeleccionada1.style.backgroundColor = "white";
            }
        cartaSeleccionada1 = event.currentTarget;
        cartaSeleccionada1.style.backgroundColor = "yellow";
    } else if (id === "jugador2") {
        jugador = 2;
        pokemon2 = pokemon;
            if (cartaSeleccionada2) {
                cartaSeleccionada2.style.backgroundColor = "white";
            }
        cartaSeleccionada2 = event.currentTarget;
        cartaSeleccionada2.style.backgroundColor = "yellow";
    } else if (id === "jugador3") {
        jugador = 3;
        pokemon3 = pokemon;
            if (cartaSeleccionada3) {
                cartaSeleccionada3.style.backgroundColor = "white";
            }
        cartaSeleccionada3 = event.currentTarget;
        cartaSeleccionada3.style.backgroundColor = "yellow";
    } else {
        console.error("ID de jugador no válido:", id);
        return;
    }

    const sumaTotal = pokemon.stats[1].base_stat + pokemon.stats[2].base_stat;
    console.log(`El jugador ${jugador} seleccionó a ${pokemon.name.toUpperCase()} con una suma de = ${sumaTotal}`);
}

// Función para determinar el ganador entre los tres jugadores
function pelea() {
    if (!todosElegidos()) return;

    const ganadores = calcularGanador();
    aplicarResultado(ganadores);
}

// Comprobar que todos los jugadores han elegido un Pokémon
function todosElegidos() {
    let jugadores = [];

    if(contador1 > 0){
        jugadores.unshift(pokemon1);
    } 

    if(contador2 > 0){
        jugadores.unshift(pokemon2);
    } 

    if(contador3 > 0){
        jugadores.unshift(pokemon3);
    } 

    // if(jugadores.length >= 2){
    //     for (let i = 0; i < jugadores.length; i++) {
    //         if (jugadores[i] == false){
    //             alert("Todos los jugadores restantes deben elegir pokémon");
    //             return false;
    //         }            
    //     }
    // }

    return true;
}

function calcularGanador() {
    let jugadores = [];

    if(contador1 > 0) {

        if (!pokemon1) {
            alert("Todos los jugadores deben elegir pokémon");
            return;
        }

        jugadores.push({pokemon: pokemon1, index: 1});
    } 

    if(contador2 > 0) {

        if (!pokemon2) {
            alert("Todos los jugadores deben elegir pokémon");
            return;
        }

        jugadores.push({pokemon: pokemon2, index: 2});
    } 
    
    if(contador3 > 0) {

        if (!pokemon3) {
            alert("Todos los jugadores deben elegir pokémon");
            return;
        }

        jugadores.push({pokemon: pokemon3, index: 3});
    }

    let sumas = jugadores.map(jugador => jugador.pokemon.stats[1].base_stat + jugador.pokemon.stats[2].base_stat);
    const maxStat = Math.max(...sumas);

    // Devolver los índices de los jugadores que tienen el valor máximo
    return jugadores.filter((jugador, index) => sumas[index] === maxStat).map(jugador => jugador.index);
}


function aplicarResultado(ganadores) {
    if (!ganadores.includes(1) && cartaSeleccionada1) {
        cartaSeleccionada1.remove();
        cartaSeleccionada1 = null;
        pokemon1 = null;
        contador1--; // Restamos la carta
        // console.log("al jugador 1 le quedan " + contador1 + " cartas");
    }
    if (!ganadores.includes(2) && cartaSeleccionada2) {
        cartaSeleccionada2.remove();
        cartaSeleccionada2 = null;
        pokemon2 = null;
        contador2--;
        // console.log("al jugador 2 le quedan " + contador2 + " cartas");
    }
    if (!ganadores.includes(3) && cartaSeleccionada3) {
        cartaSeleccionada3.remove();
        cartaSeleccionada3 = null;
        pokemon3 = null;
        contador3--; 
        // console.log("al jugador 3 le quedan " + contador3 + " cartas");
    }

    console.log(`Ganador(es): Jugador ${ganadores.join(" y ")}`);

    // Comprobar si alguien ha ganado (si queda un solo jugador con cartas)
    let vivos = [];
    if (contador1 > 0) vivos.push(1);
    if (contador2 > 0) vivos.push(2);
    if (contador3 > 0) vivos.push(3);

    // Si solo queda uno, ese gana la partida
    if (vivos.length === 1) {
        alert(`¡Jugador ${vivos[0]} gana la partida!`);
    }
}

// Enseñar la info de un Pokémon en el contenedor
function enseniaPokemon(pokemon, contenedor) {
    const carta = document.createElement("div");
    carta.classList.add("pokemonCard");

    // Carta del Pokémon
    carta.innerHTML = `
    <h3 class="pokemon-line">${pokemon.name.toUpperCase()}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"> 
    <p class="pokemon-line">HP: ${pokemon.stats[0].base_stat}</p>
    <p class="pokemon-line">Ataque: ${pokemon.stats[1].base_stat}</p>
    <p class="pokemon-line">Defensa: ${pokemon.stats[2].base_stat}</p>
    <p class="pokemon-line">Ataque especial: ${pokemon.stats[3].base_stat}</p>
    <p class="pokemon-line">Defensa especial: ${pokemon.stats[4].base_stat}</p>
    <p class="pokemon-line">Velocidad: ${pokemon.stats[5].base_stat}</p>
    `;

    carta.style.backgroundColor = "white";

    contenedor.appendChild(carta);

    carta.id = contenedor.id;
    carta.addEventListener("click", () => asignar(carta.id, pokemon));
}

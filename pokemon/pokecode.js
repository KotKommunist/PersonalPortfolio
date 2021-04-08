const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");

loadButton.addEventListener("click", () => {
  loadPage();
});

async function getAPIData(url) {
  try {
    const response = await fetch(url); // try getting data from the API at the url
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function loadPage() {
  getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`).then((data) => {
    for (const singlePokemon of data.results) {
        await getAPIData(singlePokemon.url).then(
            (pokeData) => populatePokeCard(pokeData)
        )
      
    }
  });
}

function populatePokeCard(singlePokemon) {
  console.log(singlePokemon);
  let pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  let pokeCard = document.createElement("div");
  pokeCard.className = "card";
pokeCard.addEventListener('click', () => {
  pokeCard.classList.toggle('is-flipped')
})
  pokeCard.appendChild(populateCardFront(singlePokemon));
  pokeCard.appendChild(populateCardBack(singlePokemon));
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
    console.log(pokemon)
  let pokeFront = document.createElement("div");
  pokeFront.className = "card__face card__face--front";
  let frontLabel = document.createElement("p");
  frontLabel.textContent = pokemon.name;
  let frontImage = document.createElement("img");
  frontImage.src = "images/OO${pokemon.id}.png";

  pokeFront.appendChild(frontLabel);
  pokeFront.appendChild(frontImage);
  return pokeFront;
}

function populateCardBack(pokemon){
    let pokeBack = document.createElement('div')
    pokeBack.className = "card__face card__face--back";
    let backLabel = document.createElement("p");
  backLabel.textContent = `Moves: $(pokemon.moves.length)`;
  
}

function getImageFileName(pokemon) {
    if (pokemon.id < 10) {
        return `00${pokemon.id}`
    } else if (pokemon.id > 9 && pokemon.id < 100) {
        return `0${pokemon.id}`
    }
}

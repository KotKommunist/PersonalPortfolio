const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('#fetchSelectedPokemon')
const newButton = document.querySelector('#newPokemon')

class Pokemon {
  constructor(name, height, weight, abilities, moves, types) {
    this.id = 1000
    this.name = name
    this.height = height
    this.weight = weight
    this.abilities = abilities
    this.moves = moves
    this.types = types
  }
}

loadButton.addEventListener('click', () => loadPage())

newButton.addEventListener('click', () => {
  let pokeName = prompt('What is the name of your new Pokémon?')
  let pokeHeight = prompt('What is the height of your Pokémon?')
  let pokeWeight = prompt('Pokémon weight?')
  let pokeAbilities = prompt(
    'What are your Pokémon abilities? (use a comma separated list)',
  )
  let pokeMove = prompt("What is your Pokémon's best move?")
  let pokeType = prompt("What is your Pokémon's type?")
  let abilitiesArray = getAbilitiesArray(pokeAbilities)
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    abilitiesArray,
    [
      {
        move: {
          name: pokeMove,
        },
      },
    ],
    [
      {
        type: {
          name: pokeType,
        },
      },
    ],
  )
  populatePokeCard(newPokemon)
})

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(',')
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    }
  })
}

fetchButton.addEventListener('click', () => {
  let pokeNameOrId = prompt('Enter Pokémon ID or Name:').toLowerCase()
  console.log(pokeNameOrId)
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then((data) =>
    populatePokeCard(data),
  )
})

async function getAPIData(url) {
  try {
    const response = await fetch(url) // try getting data from the API at the url
    const data = await response.json() // convert the response into JSON
    return data // return the data from the fuction to whoever called it
  } catch (error) {
    // must have been an error
    console.log(error)
  }
}

function loadPage() {
  getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=660`).then(
    async (data) => {
      for (const singlePokemon of data.results) {
        await getAPIData(singlePokemon.url).then((pokeData) =>
          populatePokeCard(pokeData),
        )
      }
    },
  )
}

function populatePokeCard(singlePokemon) {
  // console.log(singlePokemon)
  let pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  let pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', () => {
    pokeCard.classList.toggle('is-flipped')
  })
  pokeCard.appendChild(populateCardFront(singlePokemon))
  pokeCard.appendChild(populateCardBack(singlePokemon))
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  console.log(pokemon)
  let pokeFront = document.createElement('div')
  pokeFront.className = 'card__face card__face--front'
  let frontLabel = document.createElement('p')
  frontLabel.textContent = pokemon.name.toUpperCase()
  let frontImage = document.createElement('img')
  frontImage.src = getImageFileName(pokemon)

  frontImage.addEventListener(
    'error',
    (err) => (frontImage.src = 'images/MissingNo..png'),
  )
  typesBackground(pokemon, pokeFront)

  pokeFront.appendChild(frontLabel)
  pokeFront.appendChild(frontImage)
  return pokeFront
}

function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name
  if (pokemon.types.length > 1) {
    let pokeType2 = pokemon.types[1].type.name
    card.style.setProperty(
      'background',
      `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(
        pokeType2,
      )})`,
    )
  } else {
    card.style.setProperty('background', getPokeTypeColor(pokeType1))
  }
}

function populateCardBack(pokemon) {
  let pokeBack = document.createElement('div')
  pokeBack.className = 'card__face card__face--back'
  typesBackground(pokemon, pokeBack)
  let backLabel = document.createElement('p')
  backLabel.textContent = `Moves: ${pokemon.moves.length}`
  pokeBack.appendChild(backLabel)

  let typeLabel = document.createElement('h3')
  typeLabel.textContent = 'Types:'
  pokeBack.appendChild(typeLabel)

  pokemon.types.forEach((pokeType) => {
    let backType = document.createElement('p')
    backType.textContent = pokeType.type.name.toUpperCase()
    pokeBack.appendChild(backType)
  })
  let abilityLabel = document.createElement('h3')
  abilityLabel.textContent = 'Abilities:'
  pokeBack.appendChild(abilityLabel)
  pokemon.abilities.forEach((pokeAbility) => {
    let ability = document.createElement('p')
    ability.textContent = pokeAbility.ability.name.toUpperCase()
    pokeBack.appendChild(ability)
  })

  return pokeBack
}

function getImageFileName(pokemon) {
  let pokeId
  if (pokemon.id < 10) pokeId = `00${pokemon.id}`
  if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
  if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
  if (pokemon.id === 1000) {
    return `images/pokeball.png`
  }
  return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}
function getPokeTypeColor(pokeType) {
  let color;
  switch (pokeType) {
    case "grass":
      color = "#78C850";
      break;
    case "fire":
      color = "#F08030";
      break;
    case "water":
      color = "#6890F0";
      break;
    case "bug":
      color = "#A8B820";
      break;
    case "normal":
      color = "#A8A878";
      break;
    case "flying":
      color = "#A890F0";
      break;
    case "poison":
      color = "#A040A0";
      break;
    case "electric":
      color = "#F8D030";
      break;
    case "grass":
      color = "#78C850";
      break;
    case "psychic":
      color = "#F85888";
      break;
    case "dark":
      color = "#705848";
      break;
    case "fighting":
      color = "#C03028";
      break;
    case "ground":
      color = "#E0C068";
      break;
    case "rock":
      color = "#B8A038";
      break;
    case "ice":
      color = "#98D8D8";
      break;
    case "dragon":
      color = "#7038F8";
      break;
    case "ghost":
      color = "#705898";
      break;
    case "steel":
      color = "#B8B8D0";
      break;
    case "fairy":
      color = "#EE99AC";
      break;
    default:
      color = "#68A090";
  }
  return color;
}

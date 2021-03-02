import { films } from '../data/films.js'

console.log(films[6])

let filmOne = document.querySelector('#film1')
let filmTwo = document.querySelector('#film2')
let filmThree = document.querySelector('#film3')
let filmFour = document.querySelector('#film4')

filmOne.textContent = films[0].title
filmTwo.textContent = films[1].title
filmThree.textContent = films[2].title
filmFour.textContent = films[3].title
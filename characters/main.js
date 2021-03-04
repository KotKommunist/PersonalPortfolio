import {people} from '../Data/people.js'

const mainElement = document.querySelector('#main')

const mainHeader = document.createElement('header')

const MaleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
mainHeader.appendChild(maleButton)

document.body.insertBefore(mainHeader, mainElement)

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')

populateDOM(maleCharacters)

function populateDOM(characters){

characters.forEach((person) => {
    console.log(person.name, index + 1)
const charFigure = document.createElement('figure')
const charImg = document.createElement('img')
let charNum = getLastNumber(person.url)
charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
const charCaption = document.createElement('figcaption')
charCaption.textContent = person.name

charFigure.appendChild(charImg)
charFigure.appendChild(charCaption)
mainElement.appendChild(charFigure)
})
}

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
    if (url.charAt(start) === '/') {
        start++
    }
    return url.slice(start, end)
 }


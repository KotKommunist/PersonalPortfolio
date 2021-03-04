import {people} from '../Data/people.js'

const mainElement = document.querySelector('#main')

people.forEach((person, index) => {
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

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
    if (url.charAt(start) === '/') {
        start++
    }
    return url.slice(start, end)
 }
import { people } from '../data/people.js'

const mainElement = document.querySelector('#main')

const mainHeader = document.createElement('header')

document.body.insertBefore(mainHeader, mainElement)

const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
mainHeader.appendChild(maleButton)
maleButton.addEventListener('click', () => populateDOM(maleCharacters))

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
mainHeader.appendChild(femaleButton)
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))

const othersButton = document.createElement('button')
othersButton.textContent = 'Other Characters'
mainHeader.appendChild(othersButton)
othersButton.addEventListener('click', () => populateDOM(otherCharacters))

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => {
    if (person.gender === 'n/a' ||
        person.gender === 'hermaphrodite') {
        return person
    } //TODO: make sure to also include gender: 'none'
})
function populateDOM(characters) {
    removeChildren(mainElement)
    characters.forEach((person) => {
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

function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }

}

/* while (element.firstChild) {
    element.removeChild(element.firstChild);
  } */
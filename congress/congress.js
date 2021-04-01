import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'

const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const birthdayButton = document.querySelector('#birthdayButton')

seniorityButton.addEventListener('click', () => {
    senioritySort()
})

birthdayButton.addEventListener('click', () => {
    birthdaySort()
})

function populateCongressGrid(simplePeople) {
    console.log(simplePeople)
    simplePeople.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figureDiv'
        let personFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = person.imgURL
        figCaption.textContent = `${person.name}`

        personFig.appendChild(figImg)
        personFig.appendChild(figCaption)
        personDiv.appendChild(personFig)
        congressGrid.appendChild(personDiv)
    })
}

function getSimplifiedCongress(congressPeople) {
    return congressPeople.map(person => {
        let middleName = person.middle_name ? `${person.middle_name}` : ``
        return {
            id: person.id,
            name: `${person.first_name} ${middleName} ${person.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-200px.jpeg`
        }
    })
}

populateCongressGrid(getSimplifiedCongress(senators))
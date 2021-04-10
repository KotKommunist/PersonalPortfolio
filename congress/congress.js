import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

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
    removeChildren(congressGrid)
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
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-200px.jpeg`,
            seniority: parseInt(person.seniority, 10),
            date_of_birth: parseInt(person.date_of_birth, 10)
        }
    })
}

function senioritySort() {
     populateCongressGrid(getSimplifiedCongress(senators).sort(
        (a, b) => a.seniority - b.seniority
    ).reverse())
}

function birthdaySort() {
    populateCongressGrid(getSimplifiedCongress(senators).sort(
        (a, b) => a.date_of_birth - b.date_of_birth
    ))
}

populateCongressGrid(getSimplifiedCongress(senators))
populateCongressGrid(getSimplifiedCongress(representatives))
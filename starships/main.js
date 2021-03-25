import { starships } from '../data/starships.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

console.log(starships.length)

const nav = document.querySelector('nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.imageDisplay')

function populateNav(starships) {
    starships.forEach((starship) => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        anchorWrap.addEventListener('click', () => populateimageDisplay(starship))
        let listItem = document.createElement('li')
        listItem.textContent = starship.name

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
    })
}

function populateimageDisplay(shipData) {
    removeChildren(shipView)
    let shipNum = getLastNumber(shipData.url)
    let shipImage = document.createElement('img')
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
    shipImage.addEventListener('error', (err) => {
        console.log(`Oops! Image doesn't exist.`)
        shipImage.hidden = true
    })
    shipView.appendChild(shipImage)
}

// function addStarField(element, numStars) {
//     element.style.setProperty('background-color', '#000')
//     for (let i = 0; i < numStars; i++) {
//         let star = document.createElement('div')
//         star.style.setProperty('position', 'absolute')
//         star.style.setProperty('width', '2px')
//         star.style.setProperty('height', '2px')
//         star.style.setProperty('background-color', 'white')
//         let xy = getRandomPosition()
//         star.style.left = `${xy[0]}px`
//         star.style.top = `${ xy[1]}px`
//         element.appendChild(star)
//     }
// }

// function getRandomPosition() {
//     let y = document.body.scrollHeight
//     let x = document.body.scrollWidth
//     let randomY = Math.floor(Math.random() * y)
//     let randomX = Math.floor(Math.random() * x)
//     return [randomX, randomY]
// }

populateNav(starships)

addStarField(document.querySelector('body'), 1000)
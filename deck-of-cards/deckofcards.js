const getCardBtn = document.getElementById('get-card-btn')
const drawBtn = document.getElementById('draw-btn')
const cardContainer = document.getElementById('cards')
const hearder = document.getElementById('header')
const remaining = document.getElementById('remaining')
const computerScoreEl = document.getElementById('computer-score')
const myScoreEl = document.getElementById('my-score')
let computerScore = 0
let myScore = 0
let deckId = ""

function handleFunction() {
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
         .then(result => result.json())
         .then((data) => {
            remaining.textContent = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
         })
}
getCardBtn.addEventListener('click', handleFunction)

drawBtn.addEventListener('click', () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(result => result.json())
        .then((data) => {
            remaining.textContent = `Remaining Cards: ${data.remaining}`
            cardContainer.children[0].innerHTML = `
               <img src="${data.cards[0].image}" alt='first_image' class="card"/>
            `
            cardContainer.children[1].innerHTML = `
            <img src="${data.cards[1].image}" alt='second_image' class="card"/>
         `
         const winnerText = determineCardWinner(data.cards[0], data.cards[1])
         hearder.textContent = winnerText
         if (data.remaining === 0) {
            drawBtn.disabled = true
            if (computerScore > myScore) {
                hearder.textContent = "Computer won the game!"
            } else if (myScore > computerScore) {
                hearder.textContent = "You won the game!"
            } else {
                hearder.textContent = "It's a tie game!"
            }
         }
        }) 
})


function determineCardWinner(card1, card2) {
    const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = "Computer Score:" + computerScore
        return "Computer Wins"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = "My Score:" + myScore
        return "You Win"
    } else {
        return "It's a tie"
    }
}
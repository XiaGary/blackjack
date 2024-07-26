let deckID = ' '

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=7')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data);
        deckID = data.deck_id;
    })
    .catch(err => {
        console.log(`error ${err}`);
    })

document.querySelector('button').addEventListener('click', dealCards)

document.querySelector('.hit').classList.add('hidden');
document.querySelector('.stand').classList.add('hidden')
document.querySelector('.p2h1').classList.add('hidden')

let player1Val = ''
let player2Val = ''

function dealCards(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.querySelector('.player1card1').src = data.cards[0].image;
            document.querySelector('.player1card2').src = data.cards[1].image;
            document.querySelector('.player2card1').src = data.cards[2].image;
            document.querySelector('.player2card2').src = data.cards[3].image;
            player1Val = convertToNums(data.cards[0].value) + convertToNums(data.cards[1].value)
            player2Val = convertToNums(data.cards[2].value) + convertToNums(data.cards[3].value)
            document.querySelector('.dealer-score').innerText = player1Val;
            document.querySelector('.player-score').innerText = player2Val;
            document.querySelector('.draw-cards').classList.toggle('hidden')
            document.querySelector('.hit').classList.toggle('hidden')
            document.querySelector('.stand').classList.toggle('hidden')
        })
        .catch(err =>{
            console.log(`error ${err}`);
        })

}

const hitme = document.querySelector('.hit').addEventListener('click', hit)
function hit(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.querySelector('.p2h1').classList.toggle('hidden')
        document.querySelector('.p2h1').src = data.cards[0].image;
        player2Val += convertToNums(data.card[0].value)
    })
}

function convertToNums(val){
    if(val === "ACE"){
        return 11;
    } else if (val === "KING"){
        return 10;
    } else if (val === "QUEEN"){
        return 10;
    } else if(val === "JACK"){
        return 10;
    } else {
        return Number(val);
    }
}
function whoWins(){
    if((player1Val >= 22) && (player2Val >= 22)){
        alert(`It's a tie! Both players exceeded 21`)
    } else if(player1Val >= 22){
        alert(`Player 2 wins`)
    } else if(player2Val >= 22){
        alert(`Player 1 wins`)
    } else if(player1Val === player2Val){
        alert(`It's a tie`)
    } else if(player1Val > player2Val){
        alert(`Player 1 wins`)
    } else {
        alert(`Player 2 wins`)
    }
}

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

function dealCards(){
    // const url = `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`
    
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.querySelector('.player1card1').src = data.cards[0].image;
            document.querySelector('.player1card2').src = data.cards[1].image;
            document.querySelector('.player2card1').src = data.cards[2].image;
            document.querySelector('.player2card2').src = data.cards[3].image;
            let player1Val = convertToNums(data.cards[0].value) + convertToNums(data.cards[1].value)
            let player2Val = convertToNums(data.cards[2].value) + convertToNums(data.cards[3].value)
        })
        .catch(err =>{
            console.log(`error ${err}`);
        })
}

function convertToNums(val){
    if(val === "ACE"){
        return 14;
    } else if (val === "KING"){
        return 13;
    } else if (val === "QUEEN"){
        return 12;
    } else if(val === "JACK"){
        return 11;
    } else {
        return Number(val);
    }
}

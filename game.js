const handArr = [];
const cardOrderHoldingArr = [];
const cardOrder = [];
const selectedCardsID = [];

let deck = standardFullDeck;

function shuffle() {
  for (let i = 0; i < standardFullDeck.length; i++) {
    cardOrderHoldingArr.push(i);
  }

  for (let j = 0; j < standardFullDeck.length; j++) {
    let randIndex = Math.floor(Math.random() * cardOrderHoldingArr.length);
    cardOrder.push(cardOrderHoldingArr[randIndex]);
    cardOrderHoldingArr.splice(randIndex, 1);
  }

  console.log(cardOrder);
}

function getTopCard() {
  return cardOrder.shift();
}

function getPokerHand() {
  const cardContainer = [];
  const selectedRanks = [];
  const selectedSuits = [];
  for (let card of selectedCardsID) {
    cardContainer.push(standardFullDeck[card]);
  }

  for (let card of cardContainer) {
    selectedRanks.push(card.rank);
    selectedSuits.push(card.suit);
  }

  //replace this with the full check hand function

  console.log(selectedRanks);
  console.log(checkAlikeCards(selectedRanks));
}

function fillFirstHand() {
  shuffle();
  for (let i = 0; i < 8; i++) {
    let topCardID = getTopCard();
    handArr[i] = document.createElement("img");
    document.querySelector("#hand").appendChild(handArr[i]);
    handArr[i].id = topCardID;
    handArr[i].src = standardFullDeck[topCardID].imgSrc;
    handArr[i].style.width = "10%";
    handArr[i].style.paddingRight = "10px";
    handArr[i].addEventListener("click", (event) => {
      if (!selectedCardsID.some((id) => id === handArr[i].id)) {
        document.querySelector("#playArea").appendChild(handArr[i]);
        selectedCardsID.push(handArr[i].id);
        console.log(selectedCardsID);
        getPokerHand();
      } else {
        document.querySelector("#hand").appendChild(handArr[i]);
        selectedCardsID.splice(selectedCardsID.indexOf(handArr[i].id), 1);
      }
    });
  }
}

fillFirstHand();

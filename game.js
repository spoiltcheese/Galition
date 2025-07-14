const handArr = [];
const cardOrderHoldingArr = [];
const cardOrder = [];
let selectedCardsID = [];
let cardsInHand = 0;
let handValue = 0;

let deck = standardFullDeck;

function init() {
  discard.addEventListener("click", (event) => {
    console.log("discard pressed");
    document.querySelector("#playArea").replaceChildren();
    console.log("cards in hand " + cardsInHand);
    fillHand(cardsInHand);

    handValue = 0;
    document.querySelector("#pokerHandType").innerHTML = "";
    selectedCardsID = [];
  });
  shuffle();
}

function shuffle() {
  for (let i = 0; i < standardFullDeck.length; i++) {
    cardOrderHoldingArr.push(i);
  }

  for (let j = 0; j < standardFullDeck.length; j++) {
    let randIndex = Math.floor(Math.random() * cardOrderHoldingArr.length);
    cardOrder.push(cardOrderHoldingArr[randIndex]);
    cardOrderHoldingArr.splice(randIndex, 1);
  }

  //console.log(cardOrder);
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

  console.log(cardContainer);
  for (let card of cardContainer) {
    selectedRanks.push(card.rank);
    selectedSuits.push(card.suit);
  }

  //checks the value of the hand

  //step 1: check the number of like cards
  let alikeCards = checkAlikeCards(selectedRanks);

  switch (alikeCards) {
    case 1:
      handValue = 0;
      break;
    case 2:
      handValue = 1;
      break;
    case 3:
      handValue = 2;
      break;
    case 4:
      handValue = 6;
      break;
  }

  console.log("SELECTED RANKS");
  console.log(selectedRanks);
  let hasStraight = checkStraight(selectedRanks);
  let hasFlush = checkFlush(selectedSuits);
  let hasTwoPair = checkTwoPair(selectedRanks);

  if (hasStraight && hasFlush) handValue = 8;
  else if (hasStraight) handValue = 4;
  else if (hasFlush) handValue = 5;

  if (hasTwoPair) handValue = 2;
  document.querySelector("#pokerHandType").innerHTML = pokerHands[handValue];

  //console.log(selectedRanks);
  //console.log();
}

function cardPressed() {}

function fillHand(cardsAlreadyInside) {
  for (let i = cardsAlreadyInside; i < 8; i++) {
    cardsInHand = 8;
    let topCardID = getTopCard();
    handArr[i] = document.createElement("img");
    document.querySelector("#hand").appendChild(handArr[i]);
    handArr[i].id = "c" + topCardID;
    handArr[i].src = standardFullDeck[topCardID].imgSrc;
    handArr[i].style.width = "10%";
    handArr[i].style.paddingRight = "10px";
    handArr[i].addEventListener("click", (event) => {
      let idStr = event.target.id;
      let id = idStr.split("c")[1];
      let currentCard = document.querySelector("#" + idStr);
      if (!selectedCardsID.some((x) => x === id)) {
        console.log("CARD NOT FOUND");
        console.log(currentCard);
        document.querySelector("#playArea").appendChild(currentCard);

        selectedCardsID.push(id);
        handArr.splice(handArr.indexOf(id));
        cardsInHand--;
        getPokerHand();
      } else {
        console.log("CARD FOUND");
        console.log(currentCard);
        document.querySelector("#hand").appendChild(currentCard);
        selectedCardsID.splice(selectedCardsID.indexOf(id), 1);
        cardsInHand++;
        getPokerHand();
      }
    });
  }
}

init();

fillHand(cardsInHand);

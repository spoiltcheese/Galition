const handImgArr = [];
const cardOrderHoldingArr = [];
const cardOrder = [];
let selectedCardsID = [];
let cardsInHand = 0;
let handValue = 0;
let cardsInPlay = 0;

let handScore = 0;
let cardsScore = 0;
let mult = 0;

let runningScore = 0;
let addedScore = 0;

const scoreElements = [];

const levels = [250, 300, 400, 520, 635, 750, 885, 1000];

let levelMinimumScore = 0;
let currentLevel = 0;

let deck = standardFullDeck;

function clearPlayArea() {
  document.querySelector("#playArea").replaceChildren();
  fillHand(cardsInHand);

  handValue = 0;
  document.querySelector("#pokerHandType").innerHTML = "";
  selectedCardsID = [];
  cardsInPlay = 0;
  document.querySelector("#score").innerHTML = "";
}

function init() {
  discard.addEventListener("click", (event) => {
    console.log("discard pressed");
    clearPlayArea();
  });

  playHand.addEventListener("click", (event) => {
    clearPlayArea();
    runningScore += addedScore;
    addedScore = 0;

    document.querySelector("#runningScore").innerHTML =
      "Score: " + runningScore;

    if (runningScore >= levels[currentLevel] && currentLevel < 8) {
      currentLevel++;
      runningScore = 0;

      console.log(levels[currentLevel]);
      console.log(currentLevel);

      getLevel(currentLevel);

      document.querySelector("#runningScore").innerHTML =
        "Currrent score: " + runningScore;
      //todo: regenerate deck
    } else if (currentLevel >= 8) {
      //you win!
    }
  });
  shuffle();
  getLevel(currentLevel);

  document.querySelector("#runningScore").innerHTML =
    "Currrent score: " + runningScore;
}

function getLevel(level) {
  document.querySelector("#levelScoreMinimum").innerHTML =
    "Minimum score: " + levels[level];
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
      handValue = 3;
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
  let hasFullHouse = checkFullHouse(selectedRanks);

  if (hasStraight && hasFlush) handValue = 8;
  else if (hasStraight) handValue = 4;
  else if (hasFlush) handValue = 5;

  if (hasFullHouse) handValue = 6;
  else if (hasTwoPair) handValue = 2;

  handScore = baseScore[handValue].score;
  mult = baseScore[handValue].mult;
  addedScore = (handScore + cardsScore) * mult;
  addCardScore();

  document.querySelector("#pokerHandType").innerHTML = pokerHands[handValue];
  document.querySelector(
    "#score"
  ).innerHTML = `(${handScore} + ${cardsScore}) x ${mult} = ${addedScore}`;
}

function addCardScore() {
  document.querySelector("#individualCardScore").innerHTML = "";
  cardsScore = 0;
  let isFirstElement = true;
  for (let card of selectedCardsID) {
    cardsScore += standardFullDeck[card].value;
    console.log(standardFullDeck[card].value);
    if (!isFirstElement) {
      document.querySelector("#individualCardScore").innerHTML += " + ";
    }
    document.querySelector("#individualCardScore").innerHTML +=
      standardFullDeck[card].value;
    isFirstElement = false;
  }

  document.querySelector("#individualCardScore").innerHTML +=
    " = " + cardsScore;
}

function fillHand(cardsAlreadyInside) {
  for (let i = cardsAlreadyInside; i < 8; i++) {
    cardsInHand = 8;
    let topCardID = getTopCard();
    handImgArr[i] = document.createElement("img");
    document.querySelector("#hand").appendChild(handImgArr[i]);
    handImgArr[i].id = "c" + topCardID;
    handImgArr[i].src = standardFullDeck[topCardID].imgSrc;
    handImgArr[i].style.width = "10%";
    handImgArr[i].style.paddingRight = "10px";
    handImgArr[i].addEventListener("click", (event) => {
      let idStr = event.target.id;
      let id = idStr.split("c")[1];
      let currentCard = document.querySelector("#" + idStr);
      if (!selectedCardsID.some((x) => x === id)) {
        if (cardsInPlay < 5) {
          document.querySelector("#playArea").appendChild(currentCard);
          selectedCardsID.push(id);
          handImgArr.splice(handImgArr.indexOf(id));
          cardsInHand--;
          getPokerHand();
          cardsInPlay++;
        }
      } else {
        document.querySelector("#hand").appendChild(currentCard);
        selectedCardsID.splice(selectedCardsID.indexOf(id), 1);
        cardsInHand++;
        getPokerHand();
        cardsInPlay--;
      }
    });
  }
}

init();

fillHand(cardsInHand);

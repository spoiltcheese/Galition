const handImgArr = [];
let cardOrderHoldingArr = [];
let cardOrder = [];
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

//const levels = [250, 300, 400, 520, 635, 750, 885, 1000];

const levels = [100, 100, 100];

let levelMinimumScore = 0;
let currentLevel = 0;

let maxLevels = levels.length;
//let maxLevels = 2;

let deck = standardFullDeck;

let plusScoreValue = 0;
let plusMultValue = 0;
let timesMultValue = 1;

let gold = 0;
const levelReward = 5;

const maxHands = 4;
const maxDiscards = 4;

let currentHand = maxHands;
let currentDiscard = maxDiscards;

function shuffle() {
  cardOrderHoldingArr = [];
  cardOrder = [];
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

function getLevel(level) {
  document.querySelector("#levelScoreMinimum").innerHTML =
    "Minimum score: " + levels[level];
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

function newLevel() {
  document.querySelector("#notif").style.display = "none";
  document.querySelector("#message").style.display = "none";
  shuffle();
  getLevel(currentLevel);

  currentHand = maxHands;
  currentDiscard = maxDiscards;

  document.querySelector("#numHands").style.display = "block";
  document.querySelector("#numDiscards").style.display = "block";
  document.querySelector("#runningScore").style.display = "block";
  document.querySelector("#levelScoreMinimum").style.display = "block";
  document.querySelector("#individualCardScore").style.display = "block";
  document.querySelector("#pokerHandType").style.display = "block";
  document.querySelector("#score").style.display = "block";
  document.querySelector("#buttons").style.display = "block";
  document.querySelector("#currentLevel").style.display = "block";

  document.querySelector("#currentLevel").innerHTML =
    "Current level: " + (currentLevel + 1);

  document.querySelector("#numHands").innerHTML = "Hands: " + currentHand;
  document.querySelector("#numDiscards").innerHTML =
    "Discards: " + currentDiscard;
  fillHand(0);
}

function goldTransaction(cost) {
  if (gold - cost < 0) return false;
  else {
    gold -= cost;
    document.querySelector("#gold").innerHTML = "Gold: " + gold;
    return true;
  }
}

function hideTopUI() {
  document.querySelector("#playArea").replaceChildren();
  document.querySelector("#runningScore").style.display = "none";
  document.querySelector("#levelScoreMinimum").style.display = "none";
  document.querySelector("#individualCardScore").style.display = "none";
  document.querySelector("#pokerHandType").style.display = "none";
  document.querySelector("#score").style.display = "none";
  document.querySelector("#buttons").style.display = "none";
  document.querySelector("#numHands").style.display = "none";
  document.querySelector("#numDiscards").style.display = "none";
}

function levelWon() {
  console.log("show overlay");
  document.querySelector("#notif").style.display = "block";
  document.querySelector("#playArea").replaceChildren();
  document.querySelector("#hand").replaceChildren();
  hideTopUI();

  gold += levelReward;

  document.querySelector("#gold").innerHTML = "Gold: " + gold;
}

function gameWon() {
  hideTopUI();
  document.querySelector("#message").style.display = "block";
  document.querySelector("#message").innerHTML = "You Win!";
}

function gameOver() {
  hideTopUI();

  document.querySelector("#message").style.display = "block";
  document.querySelector("#message").innerHTML = "Game Over!";
}

function clearPlayArea() {
  document.querySelector("#playArea").replaceChildren();
  fillHand(cardsInHand);

  handValue = 0;
  document.querySelector("#pokerHandType").innerHTML = "";
  document.querySelector("#individualCardScore").innerHTML = "";
  selectedCardsID = [];
  cardsInPlay = 0;
  document.querySelector("#score").innerHTML = "";
}

function init() {
  nextLevel.addEventListener("click", (event) => {
    newLevel();
  });
  discard.addEventListener("click", (event) => {
    if (currentDiscard > 0) {
      currentDiscard--;
      console.log("discard pressed");
      clearPlayArea();
      document.querySelector("#numDiscards").innerHTML =
        "Discards: " + currentDiscard;
    }
  });

  playHand.addEventListener("click", (event) => {
    clearPlayArea();
    runningScore += addedScore;
    addedScore = 0;

    document.querySelector("#runningScore").innerHTML =
      "Score: " + runningScore;

    if (runningScore >= levels[currentLevel] && currentLevel + 1 < maxLevels) {
      currentLevel++;
      runningScore = 0;

      getLevel(currentLevel);

      document.querySelector("#runningScore").innerHTML =
        "Currrent score: " + runningScore;

      levelWon();
    } else if (currentLevel + 1 >= maxLevels) {
      //you win!
      gameWon();
    } else if (currentHand > 1) {
      currentHand--;
      document.querySelector("#numHands").innerHTML = "Hands: " + currentHand;
    } else if (currentHand - 1 <= 0) {
      gameOver();
    }
  });
  newLevel();

  document.querySelector("#runningScore").innerHTML =
    "Currrent score: " + runningScore;

  buyPlusScore.addEventListener("click", (event) => {
    if (goldTransaction(1)) {
      plusScoreValue += 10;
      document.querySelector("#plusScore").innerHTML =
        "+" + plusScoreValue + " score";
    }
  });

  buyPlusMult.addEventListener("click", (event) => {
    if (goldTransaction(1)) {
      plusMultValue += 1;
      document.querySelector("#plusMult").innerHTML =
        "+" + plusMultValue + " mult";
    }
  });

  buyTimesMult.addEventListener("click", (event) => {
    if (goldTransaction(1)) {
      //workaround for JS not supporting floating point operations
      timesMultValue += 0.1;
      timesMultValue *= 10;
      timesMultValue = Math.round(timesMultValue);
      timesMultValue /= 10;
      document.querySelector("#timesMult").innerHTML =
        "x" + timesMultValue + " mult";
    }
  });

  document.querySelector("#numHands").innerHTML = "Hands: " + maxHands;
  document.querySelector("#numDiscards").innerHTML = "Discards: " + maxDiscards;
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

  handScore = baseScore[handValue].score + plusScoreValue;
  addCardScore();

  let totalMult = (baseScore[handValue].mult + plusMultValue) * timesMultValue;
  addedScore = Math.round((handScore + cardsScore) * totalMult);

  document.querySelector("#pokerHandType").innerHTML = pokerHands[handValue];
  document.querySelector(
    "#score"
  ).innerHTML = `[${baseScore[handValue].score} + ${plusScoreValue} + ${cardsScore}] x [(${baseScore[handValue].mult} + ${plusMultValue}) x ${timesMultValue}]  = ${addedScore}`;
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

init();

fillHand(cardsInHand);

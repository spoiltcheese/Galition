const handArr = [];
const cardOrderHoldingArr = [];
const cardOrder = [];

let deck = standardFullDeck;

function fillFirstHand() {
  shuffle();
  for (let i = 0; i < 8; i++) {
    console.log(getTopCard());
    handArr[i] = document.createElement("img");
    document.querySelector("#hand").appendChild(handArr[i]);
    handArr[i].src = standardFullDeck[getTopCard()].imgSrc;
    handArr[i].style.width = "10%";
    handArr[i].style.paddingRight = "10px";
  }
}

fillFirstHand();

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

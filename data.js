/* the reason why we do not do this programitically is because:
    1. Ace is an outlier
    2. We might need to change values on a case by case basis for balancing purposes
*/
const ranks = [
  {
    rank: 0,
    name: "2",
    fullName: "Two",
    value: 2,
  },
  {
    rank: 1,
    name: "3",
    fullName: "Three",
    value: 3,
  },
  {
    rank: 2,
    name: "4",
    fullName: "Four",
    value: 4,
  },
  {
    rank: 3,
    name: "5",
    fullName: "Five",
    value: 5,
  },
  {
    rank: 4,
    name: "6",
    fullName: "Six",
    value: 6,
  },
  {
    rank: 5,
    name: "7",
    fullName: "Seven",
    value: 7,
  },
  {
    rank: 6,
    name: "8",
    fullName: "Eight",
    value: 8,
  },
  {
    rank: 7,
    name: "9",
    fullName: "Nine",
    value: 9,
  },
  {
    rank: 8,
    name: "10",
    fullName: "Ten",
    value: 10,
  },
  {
    rank: 9,
    name: "Jack",
    fullName: "Jack",
    value: 11,
  },
  {
    rank: 10,
    name: "Queen",
    fullName: "Queen",
    value: 12,
  },
  {
    rank: 11,
    name: "King",
    fullName: "King",
    value: 13,
  },
  {
    rank: 12,
    name: "Ace",
    fullName: "Ace",
    value: 11,
  },
];

const baseScore = [
  { score: 5, mult: 1 },
  { score: 10, mult: 2 },
  { score: 20, mult: 2 },
  { score: 30, mult: 3 },
  { score: 30, mult: 4 },
  { score: 35, mult: 4 },
  { score: 40, mult: 4 },
  { score: 60, mult: 7 },
  { score: 100, mult: 8 },
  { score: 100, mult: 8 },
];

const suits = ["Diamonds", "Hearts", "Clubs", "Spades"];

function generateStandardFullDeck() {
  let output = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      let card = new Card(
        rank.rank,
        suit,
        rank.value,
        `img/${rank.name.toLowerCase()}_of_${suit.toLowerCase()}.png`,
        `${rank.name} of ${suit}`
      );
      output.push(card);
    }
  }

  //console.dir(output);
  return output;
}

const standardFullDeck = generateStandardFullDeck();

const pokerHands = [
  "High card",
  "Pair",
  "Two Pairs",
  "Three of a Kind",
  "Straight",
  "Flush",
  "Full House",
  "Four of a Kind",
  "Straight Flush",
  "Royal Flush",
];

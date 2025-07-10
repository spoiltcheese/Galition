/* the reason why we do not do this programitically is because:
    1. Ace is an outlier
    2. We might need to change values on a case by case basis for balancing purposes
*/
const ranks = [
  {
    name: "2",
    fullName: "Two",
    value: 2,
  },
  {
    name: "3",
    fullName: "Three",
    value: 3,
  },
  {
    name: "4",
    fullName: "Four",
    value: 4,
  },
  {
    name: "5",
    fullName: "Five",
    value: 5,
  },
  {
    name: "6",
    fullName: "Six",
    value: 6,
  },
  {
    name: "7",
    fullName: "Seven",
    value: 7,
  },
  {
    name: "8",
    fullName: "Eight",
    value: 8,
  },
  {
    name: "9",
    fullName: "Nine",
    value: 9,
  },
  {
    name: "10",
    fullName: "Ten",
    value: 10,
  },
  {
    name: "Jack",
    fullName: "Jack",
    value: 11,
  },
  {
    name: "Queen",
    fullName: "Queen",
    value: 12,
  },
  {
    name: "King",
    fullName: "King",
    value: 13,
  },
  {
    name: "Ace",
    fullName: "Ace",
    value: 11,
  },
];

const suits = ["Diamonds", "Hearts", "Clubs", "Spades"];

function generateStandardFullDeck() {
  let output = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      let card = {
        ...rank,
        suit: suit,
        img: `img/${rank.name.toLowerCase()}_of_${suit.toLowerCase()}`,
      };
      output.push(card);
    }
  }

  console.dir(output);
  return output;
}

const standardFullDeck = generateStandardFullDeck();

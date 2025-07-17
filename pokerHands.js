function populateCountMap(cards) {
  //The Map object holds key-value pairs and remembers the original insertion order of the keys. (Normal objects in JS are order agnostic, unlike OOP languages.) Any value (both objects and primitive values) may be used as either a key or a value.
  const countMap = new Map();

  // Count occurrences of each card
  for (const card of cards) {
    if (countMap.has(card)) {
      //if the card already exists, add one to it
      countMap.set(card, countMap.get(card) + 1);
    } else {
      //add a new item to the map with the value of 1
      countMap.set(card, 1);
    }
  }

  return countMap;
}

function checkAlikeCards(cards) {
  const countMap = populateCountMap(cards);
  // find the maximum value of the values of the countMap
  let maxCount = 0;
  for (const count of countMap.values()) {
    if (count > maxCount) {
      maxCount = count;
    }
  }

  return maxCount;
}

function checkTwoPair(cards) {
  const countMap = populateCountMap(cards);
  // Make sure are at least 4 cards
  if (cards.length < 4) {
    return false;
  }

  let numberOfPairs = 0;
  for (const count of countMap.values()) {
    if (count == 2) {
      numberOfPairs++;
    }
  }
  // If you found at least two distinct ranks that each have a count of 2,
  // then you have two pair.
  return numberOfPairs >= 2;
}

//because populateCountMap will return the *maximum* amount of a card occuring, checkFullHouse will return false if the pair is part of a higher-order card set for instance where cards >5 (e.g.: [x,x,x,y,y,y]). This is intended behaviour.
function checkFullHouse(cards) {
  //by definition, a full house is a set of five cards, so we skip the check if the set does not include at least 5 cards
  if (cards.length > 5) return false;
  else {
    const countMap = populateCountMap(cards);

    let hasPair = false;
    let hasTriplet = false;
    for (const count of countMap.values()) {
      if (count === 2) hasPair = true;
      if (count === 3) hasTriplet = true;
    }

    if (hasPair && hasTriplet) return true;
    else return false;
  }
}

function checkStraight(cards) {
  if (cards.length !== 5) return false;
  else {
    cards.sort((a, b) => a - b);
    if (
      parseInt(cards[0] + 1) === parseInt(cards[1]) &&
      parseInt(cards[1] + 1) === parseInt(cards[2]) &&
      parseInt(cards[2] + 1) === parseInt(cards[3]) &&
      parseInt(cards[3] + 1) === parseInt(cards[4])
    ) {
      return true;
    } else return false;
  }
}

function checkFlush(cards) {
  if (cards.length !== 5) return false;
  else {
    return cards.every((val) => val === cards[0]);
  }
}

function populateCountMap(...cards) {
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

function checkAlikeCards(...cards) {
  const countMap = populateCountMap(...cards);
  // find the maximum value of the values of the countMap
  let maxCount = 0;
  for (const count of countMap.values()) {
    if (count > maxCount) {
      maxCount = count;
    }
  }

  return maxCount;
}

//because populateCountMap will return the *maximum* amount of a card occuring, checkFullHouse will return false if the pair is part of a higher-order card set for instance where cards >5 (e.g.: [x,x,x,y,y,y]). This is intended behaviour.
function checkFullHouse(...cards) {
  //by definition, a full house is a set of five cards, so we skip the check if the set does not include at least 5 cards
  if (cards.length > 5) return false;
  else {
    const countMap = populateCountMap(...cards);

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

function unitTests() {
  console.log(checkAlikeCards(1, 1, 2));

  console.log(checkAlikeCards(1, 2, 2, 2, 3));

  console.log(checkAlikeCards(1, 2, 2, 2, 2));

  console.log(checkAlikeCards(1, 2, 2, 2, 1));

  console.log(checkFullHouse(1, 2, 2, 2, 1));
}

unitTests();

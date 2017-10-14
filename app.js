// ======================================================================
//                         VARIABLES
// ======================================================================

// Intruction Variables
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');

let missed = 0;

const phrases = [
  "pumpkins can be delicious",
  "There is a capital T in this phrase",
  "a cat person or a dog person does it matter though",
  "hard working and trying hard feels good and gets you far",
  "drinking no sugar water only takes about two weeks to get used to completely",
  "never give up",
  "mind is a very powerful tool",
  "brain is like a muscle the more you use it the more it can do",
  "weight loss is very simple but does require determination and strong will",
  "enjoy your days as much as possible and be grateful"
];

// My Variables
const startButton = document.querySelector('.btn__reset');
const startOverlay = document.querySelector('#overlay');

// Testing Selections
console.log(qwerty);
console.log(phrase);
console.log(startButton);
console.log(startOverlay);
console.log(phrases);

// ======================================================================
//                         FUNCTIONS
// ======================================================================

// Returns a number between min (inclusive) and max (exclusive)
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  // [0 - 0.99) * (10 - 0)
  // [0 - 0.99) * 10 => always < 10 => always 0 - 9 values
  // (0 - 9) + 0 => 0 - 9 values
}

function getRandomPhraseAsArray(array) {
  let randomIndex = getRandom(0, array.length);
  console.log(randomIndex);

  let randomPhrase = phrases[randomIndex];
  console.log(randomPhrase);

  // str.split([separator[, limit]])
  // Tip: If an empty string ("") is used as the separator,
  // the string is split between each character.
  console.log(randomPhrase.split(""));
  return randomPhrase.split("");
}

getRandomPhraseAsArray(phrases);

// ======================================================================
//                         EVENT LISTENERS
// ======================================================================

// Event Listeners
startButton.addEventListener('click', function() {
  // $(startOverlay).hide();
  startOverlay.style.display = "none";
});













//

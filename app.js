// ======================================================================
//                         VARIABLES
// ======================================================================

// Intruction Variables
const keyboard = document.querySelector('#qwerty');
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
const overlay = document.querySelector('#overlay');
const tries = document.querySelectorAll('.tries');

// Testing Selections
console.log(keyboard);
console.log(phrase);
console.log(startButton);
console.log(overlay);
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

function addPhraseToDisplay(array) {
  const phraseUl = document.querySelector('#phrase ul');

  for (let i = 0; i < array.length; i++) {
    const li = document.createElement("li");
    li.textContent = array[i];
    if (array[i] !== ' ') {
      li.className = "letter";
    } else {
      li.className = "space";
    }

    phraseUl.appendChild(li);
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(guess) {
  const letters = document.querySelectorAll('.letter');
  let matching = null;
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent === guess.textContent) {
      letters[i].className += " show";
      matching = guess.textContent;
    }
  }
  return matching;
}

function checkWin() {
  const showCount = document.querySelectorAll('.show');
  const letterCount = document.querySelectorAll('.letter');
  if (showCount.length === letterCount.length) {
    overlay.className = "win";
    overlay.textContent = "You are victorious!";
    overlay.style.display = "flex";
  }
  else if (missed >= 5) {
    overlay.className = "lose";
    overlay.textContent = "Game over!";
    overlay.style.display = "flex";
  }
}

// ======================================================================
//                         EVENT LISTENERS
// ======================================================================

// Event Listeners
startButton.addEventListener('click', function() {
  // $(overlay).hide();
  overlay.style.display = "none";
});

keyboard.addEventListener('click', function(e) {

  console.log(e.target);

  const clicked = e.target;
  if (clicked.tagName === 'BUTTON') {
    clicked.style.className += " chosen";
    clicked.setAttribute("disabled", true);
    let letterFound = checkLetter(clicked);
    if (letterFound === null) {

      console.log(tries[missed]);

      tries[missed].style.display = "none";
      missed++;
    }
  }
  checkWin();
});











//

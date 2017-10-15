// ======================================================================
//                         VARIABLES
// ======================================================================

// Intruction Variables
const keyboard = document.querySelector('#qwerty'); // was const
const phrase = document.querySelector('#phrase');

let missed = 0;

const phrases = [
  "pumpkins can be delicious",
  "there used to be a capital t in this phrase",
  "delicious healthy food exists",
  "working hard gets you far",
  "drink a lot of water",
  "never give up",
  "mind is powerful ",
  "brain is like a muscle the more you use it the more it can do",
  "determination and strong will",
  "enjoy and be grateful"
];

// My Variables
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let tries = document.querySelectorAll('.tries'); // was const
const scoreboard = document.querySelector('#scoreboard'); // was const

const keyboardDefault = keyboard.innerHTML;
const phraseDefault = phrase.innerHTML;
const scoreboardDefault = scoreboard.innerHTML;

// Testing Selections
// console.log(keyboard);
// console.log(phrase);
// console.log(startButton);
// console.log(overlay);
// console.log(phrases);

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
    let li = document.createElement("li"); // was const
    li.textContent = array[i];
    if (array[i] !== ' ') {
      li.className = "letter";
    } else {
      li.className = "space";
    }

    phraseUl.appendChild(li);
  }
}

let phraseArray = getRandomPhraseAsArray(phrases); // was const
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
    overlay.innerHTML = "<br><br><br><br><br>"
    overlay.innerHTML += "You are victorious!";
    overlay.style.display = "flex";
    // RESET
    // restart() // ADD AS AN EVENT LISTENER TO THE BUTTON

    // adding a button for RESET
    overlay.innerHTML += "<br>";
    overlay.innerHTML += "<a class='btn__reset'>RESTART</a>";
  }
  else if (missed >= 5) {
    overlay.className = "lose";
    overlay.innerHTML = "<br><br><br><br><br>"
    overlay.innerHTML += "Game over!";
    overlay.style.display = "flex";
    // RESET
    // restart()

    // adding a button for RESET
    overlay.innerHTML += "<br>";
    overlay.innerHTML += "<a class='btn__reset'>RESTART</a>";
  }
}

function restart() {
  // resetting phrase
  phrase.innerHTML = phraseDefault;
  // resetting keyboard
  keyboard.innerHTML = keyboardDefault;
  // resetting scoreboard
  scoreboard.innerHTML = scoreboardDefault;
  // generating a new random phrase
  // addPhraseToDisplay(phraseArray);
  let phraseArray = getRandomPhraseAsArray(phrases); // was const
  addPhraseToDisplay(phraseArray);
  // setting the number of misses to zero
  missed = 0;
  // hiding overlay
  overlay.style.display = "none";

  // giving scoreboard LI
  let newTries = document.querySelectorAll('.tries');
  for (let i = 0; i < newTries.length; i++) {
    newTries[i].className += " NEW-TRY";
  }
  // resetting TRIES
  tries = document.querySelectorAll(".tries");
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

  const clicked = e.target; // was const
  if (clicked.tagName === 'BUTTON') {
    clicked.style.className += " chosen";
    clicked.setAttribute("disabled", true);
    let letterFound = checkLetter(clicked);
    if (letterFound === null) {

      console.log(tries[missed]);
      console.log("TRIES DISPLAY TO NONE: " + tries[missed].style.display);

      tries[missed].style.display = "none";
      missed++;
      console.log(">>> MISSED: " + missed);
    }
  }
  checkWin();
});

overlay.addEventListener('click', function(e) {
  if (e.target.innerHTML === "RESTART") {
    restart();
  }
});







//

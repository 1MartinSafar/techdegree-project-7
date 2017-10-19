// ======================================================================
//                         VARIABLES
// ======================================================================

// Intruction Variables
const keyboard = document.querySelector('#qwerty');
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
let tries = document.querySelectorAll('.tries');
const scoreboard = document.querySelector('#scoreboard');

const keyboardDefault = keyboard.innerHTML;
const phraseDefault = phrase.innerHTML;
const scoreboardDefault = scoreboard.innerHTML;

// ======================================================================
//                         FUNCTIONS
// ======================================================================

// Returns a number between min (inclusive) and max (exclusive)
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Gets a random phrase from the phrases array of strings, returns an array
function getRandomPhraseAsArray(array) {
  let randomIndex = getRandom(0, array.length);
  let randomPhrase = phrases[randomIndex];
  return randomPhrase.split("");
}
getRandomPhraseAsArray(phrases);

// Adds the phrase to the game display
function addPhraseToDisplay(array) {
  const phraseUl = document.querySelector('#phrase ul');

  for (let i = 0; i < array.length; i++) {
    let li = document.createElement("li");
    li.textContent = array[i];
    if (array[i] !== ' ') {
      li.className = "letter";
    } else {
      li.className = "space";
    }
    phraseUl.appendChild(li);
  }
}

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Checks if the chosen letter is a match
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

// Checks if the game has ended
function checkWin() {
  const showCount = document.querySelectorAll('.show');
  const letterCount = document.querySelectorAll('.letter');

  if (showCount.length === letterCount.length) {
    overlay.className = "win";
    overlay.innerHTML = "<br><br><br><br><br>"
    overlay.innerHTML += "You are victorious!";
    overlay.style.display = "flex";
    // adding a button for RESET
    overlay.innerHTML += "<br>";
    overlay.innerHTML += "<a class='btn__reset'>RESTART</a>";
  }

  else if (missed >= 5) {
    overlay.className = "lose";
    overlay.innerHTML = "<br><br><br><br><br>"
    overlay.innerHTML += "Game over!";
    overlay.style.display = "flex";
    // adding a button for RESET
    overlay.innerHTML += "<br>";
    overlay.innerHTML += "<a class='btn__reset'>RESTART</a>";
  }
}

// restarts the game
function restart() {
  // resetting phrase
  phrase.innerHTML = phraseDefault;
  // resetting keyboard
  keyboard.innerHTML = keyboardDefault;
  // resetting scoreboard
  scoreboard.innerHTML = scoreboardDefault;
  // generating a new random phrase
  let phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
  // setting the number of misses to zero
  missed = 0;
  // hiding overlay
  overlay.style.display = "none";
  // resetting TRIES
  tries = document.querySelectorAll(".tries");
}

// ======================================================================
//                         EVENT LISTENERS
// ======================================================================

startButton.addEventListener('click', function() {
  overlay.style.display = "none";
});

keyboard.addEventListener('click', function(e) {
  const clicked = e.target;

  if (clicked.tagName === 'BUTTON') {
    clicked.style.className += " chosen";
    clicked.setAttribute("disabled", true);
    let letterFound = checkLetter(clicked);

    if (letterFound === null) {
      tries[missed].style.display = "none";
      missed++;
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

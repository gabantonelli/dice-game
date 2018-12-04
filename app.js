/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, currentScore, activePlayer, gameGoing;

init();

// define an init function for starting a new game
function init() {
  gameGoing = true;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  // Before the first launch hide the dice image
  document.querySelector(".dice").style.display = "none";
  // Before the first roll set scores to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // correct name of the player
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  // remove winner class if any
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

// define function to switch player
function changePlayer() {
  // hide the dice again
  document.querySelector(".dice").style.display = "none";
  //bring score to 0
  currentScore = 0;
  document.getElementById("current-" + activePlayer).textContent = currentScore;
  // remove visual class 'active' from the player
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // add visual class 'active' to the new player
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("active");
}

// create an event listener for the button to roll the dice
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gameGoing) {
    // roll the dice to generate a random number from 1 to 6
    var randomDice = Math.floor(Math.random() * 6) + 1;
    // display the result of the dice roll
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + randomDice + ".png";
    // if the dice is not a 1 update score
    if (randomDice !== 1) {
      //update scores
      currentScore += randomDice;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = currentScore;
    } else {
      changePlayer();
    }
  }
});

// create an event listener for the 'hold' button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gameGoing) {
    // add current score to global score
    score[activePlayer] += currentScore;
    // update the UI
    document.getElementById("score-" + activePlayer).textContent =
      score[activePlayer];
    // check if the user won the game
    if (score[activePlayer] >= 100) {
      gameGoing = false;
      document.getElementById("name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
    } else {
      changePlayer();
    }
  }
});

// create event listener for the "new game" button, chiamando la funizione init
document.querySelector(".btn-new").addEventListener("click", init);

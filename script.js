'use strict';

const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');

let scores, activePlayer, currentScore, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice.classList.add('hidden');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
};

const changePLayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

init();

roll.addEventListener('click', function () {
  if (playing) {
    const num = Math.floor(Math.random() * 6 + 1);

    if (dice.classList.contains('hidden')) {
      dice.classList.remove('hidden');
    }

    dice.src = `dice-${num}.png`;

    if (num != 1) {
      currentScore += num;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      changePLayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      changePLayer();
    }
  }
});

newGame.addEventListener('click', init);

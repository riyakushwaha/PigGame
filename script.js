'use strict';

const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const playerOneScore = document.getElementById('score--0');
const playerTwoScore = document.getElementById('score--1');
const playerOneCurrScore = document.getElementById('current--0');
const playerTwoCurrScore = document.getElementById('current--1');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');

let player1score, player2score, player1curr, player2curr;

const initialConditions = function () {
  player1score = 0;
  player2score = 0;
  player1curr = 0;
  player2curr = 0;
  dice.classList.add('hidden');
  playerOneScore.textContent = player1score;
  playerOneCurrScore.textContent = player1curr;
  playerTwoScore.textContent = player2score;
  playerTwoCurrScore.textContent = player2curr;
};

const changePLayer = function () {
  if (playerOne.classList.contains('player--active')) {
    player1score += player1curr;
    playerOneScore.textContent = player1score;
    playerOne.classList.remove('player--active');
    playerTwo.classList.add('player--active');
    player1curr = 0;
    playerOneCurrScore.textContent = player1curr;
  } else {
    player2score += player2curr;
    playerTwoScore.textContent = player2score;
    playerTwo.classList.remove('player--active');
    playerOne.classList.add('player--active');
    player2curr = 0;
    playerTwoCurrScore.textContent = player2curr;
  }
};

initialConditions();

roll.addEventListener('click', function () {
  let num = Math.floor(Math.random() * 6 + 1);
  dice.setAttribute('src', 'dice-' + num + '.png');

  if (dice.classList.contains('hidden')) {
    dice.classList.remove('hidden');
  }

  if (playerOne.classList.contains('player--active')) {
    console.log('player one is active');
    if (num === 1) {
      player1curr = 0;
      changePLayer();
    } else {
      player1curr += num;
    }
    playerOneCurrScore.textContent = player1curr;
  } else {
    if (num === 1) {
      player2curr = 0;
      changePLayer();
    } else {
      player2curr += num;
      playerTwoCurrScore.textContent = player2curr;
    }
  }
});

hold.addEventListener('click', function () {
  changePLayer();
  if (player1score >= 20) {
    playerOne.classList.add('player--winner');
    dice.classList.add('hidden');
  } else if (player2score >= 20) {
    playerTwo.classList.add('player--winner');
    dice.classList.add('hidden');
  }
});

newGame.addEventListener('click', function () {
  initialConditions();
  if (playerTwo.classList.contains('player--active')) {
    changePLayer();
    playerTwo.classList.remove('player--winner');
  } else {
    playerOne.classList.remove('player--winner');
  }
});

'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct!';
// document.querySelector('.score').textContent = 17;

// document.querySelector('.guess').value = 14;

//Variable initialisation

const randomResult = function () {
	return Math.floor(Math.random() * 20) + 1;
};

const displayMessage = function (messageText) {
	document.querySelector('.message').textContent = messageText;
	return;
};

const displayScore = function (score) {
	document.querySelector('.score').textContent = score;
	return;
};

const displayHistory = function (history) {
	for (let i = 0; i < 4; i++) {
		const tag = `#history${i + 1}`;
		document.querySelector(tag).textContent = history[i];
	}
	return;
};

const shiftHistory = function (guess, history) {
	for (let i = history.length - 1; i > 0; i--) {
		history[i] = history[i - 1];
	}
	history[0] = guess;
	displayHistory(history);
	return;
};

const initialHistory = function (historyLength) {
	let history = [];
	for (let i = 0; i < historyLength; i++) {
		history.push('');
	}
	return history;
};

let result = randomResult();
const maxScore = Number(document.querySelector('.score').textContent);
let score = maxScore;
let highScore = 0;
const historyLength = 4;
let history = initialHistory(historyLength);

//Resetting the game
const reset = function () {
	result = randomResult();
	document.querySelector('.number').textContent = '?';
	score = maxScore;
	displayScore(score);
	document.querySelector('.guess').value = '';
	document.querySelector('body').style.backgroundColor = '#222222';
	document.querySelector('.number').style.width = '15rem';
	displayMessage('Start guessing...');
	history = initialHistory(historyLength);
	displayHistory(history);
	return;
};

//Checking the guess and acting accordingly
const checkGuess = function () {
	const input = document.querySelector('.guess').value;
	//No input
	if (!input) {
		displayMessage('No value!');
		return;
	}
	const guess = Number(input);
	if (guess === result) {
		//Correct guess
		displayMessage('Correct!');
		document.querySelector('.number').textContent = result;
		if (score > highScore) {
			highScore = score;
			document.querySelector('.highscore').textContent = highScore;
		}
		document.querySelector('body').style.backgroundColor = '#22aa22';
		if (result >= 10) document.querySelector('.number').style.width = '20rem';
	} else {
		//Incorrect guess
		if (score > 0) score--;
		displayScore(score);
		shiftHistory(guess > result ? `<${guess}` : `>${guess}`, history);
		if (score === 0) {
			displayMessage('You lose :-(');
			document.querySelector('body').style.backgroundColor = '#aa2222';
			return;
		}
		displayMessage(guess > result ? 'Too high!' : 'Too low!');
	}
};

console.log(result);
document.querySelector('.check').addEventListener('click', checkGuess);
document.querySelector('.again').addEventListener('click', reset);

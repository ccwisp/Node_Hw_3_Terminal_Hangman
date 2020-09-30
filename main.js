const colors = require('colors'); // For string coloring
const logUpdate = require('log-update'); // Lib for console update, but it works pretty badly
const words = require('an-array-of-english-words'); // Picking a random word from words lib
const HANGMANPICS = require('./pics');

let targetWord;
let guessedWord;
let failCount;

const init = () => {
  failCount = 0;
  targetWord = words[Math.floor(Math.random() * words.length)];
  guessedWord = [];

  console.log(
    '\x1b[36m%s\x1b[0m',
    `
  ██╗  ██╗ █████╗ ███╗   ██╗ ██████╗ ███╗   ███╗ █████╗ ███╗   ██╗
  ██║  ██║██╔══██╗████╗  ██║██╔════╝ ████╗ ████║██╔══██╗████╗  ██║
  ███████║███████║██╔██╗ ██║██║  ███╗██╔████╔██║███████║██╔██╗ ██║
  ██╔══██║██╔══██║██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██║██║╚██╗██║
  ██║  ██║██║  ██║██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██║  ██║██║ ╚████║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ `
  );
  console.log(
    'Welcome to the game of hangman, I am going to give you some empty dashes '
      .magenta +
      'and you would guess the word in question by typing one letter at a time,'
        .magenta +
      ' well that is before you are hanged! -:)'.magenta
  );
  console.log('_ '.repeat(targetWord.length));
  console.log('\n');
};

const askLetter = () => {
  const readlineSync = require('readline-sync'); // Getting the input
  return (char = readlineSync.question('letter> '));
};

const checkword = (letter) => {
  // Check whether input char is in target word
  let tick;
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i].toLowerCase() === letter) {
      logUpdate(HANGMANPICS[failCount]);
      guessedWord[i] = targetWord[i];
      tick = true;
    } else if (guessedWord[i] === undefined) {
      guessedWord[i] = '_';
    }
  }

  if (tick) {
    tick = false;
  } else failCount++;

  if (failCount === 6) {
    // Game over if count gets 6
    logUpdate(HANGMANPICS[failCount]);
    console.log('Game over, you are hanged'.red);
    console.log('Word is ', targetWord.america);
    nextGamePrompt();
    return;
  } else {
    logUpdate(HANGMANPICS[failCount]);
  }

  console.log(guessedWord.join(' '));
  if (guessedWord.includes('_')) checkword(askLetter());
  else console.log('You have won, shnorhavor ^_^'.rainbow);
};

const nextGamePrompt = () => {
  // Asking user whether to replay the game or not
  var readlineSync = require('readline-sync');
  if (readlineSync.keyInYN('Do you want to play again?')) {
    // 'Y' key was pressed.
    console.log('Let`s start again :)'.rainbow);
    startGame();
  } else {
    console.log('Good Luck then!');
  }
};

const startGame = () => {
  // Starting the game
  init();
  checkword(askLetter());
};

startGame();

let targetWord = '';
let dashes = '';
let dArray = [];
let failCount = 0;

const categories = {
  clubs: ['Manchester United', 'Barcelona', 'Real Madrid', 'Bayern Munich', 
    'Manchester City', 'Arsenal', 'Chelsea', 'Liverpool', 'Juventus', 'Tottenham Hotspur',
    'Borussia Dortmund', 'Atletico Madrid', 'Inter Milan', 'West Ham United', 'Roma',
    'Napoli', 'Everton', 'Newcastle United'],
  places: ['New York', 'Los Angeles', 'California', 'Chicago', 'Illinois',  
    'Houston', 'Texas', 'Philadelphia', 'Pennsylvania', 'Phoenix', 'Arizona', 'San Antonio', 
    'San Diego', 'Dallas', 'San Jose', 'Austin', 'Texas', 'Jacksonville', 'Florida', 
    'San Francisco', 'Indianapolis', 'Indiana', 'Massachusetts', 'Mississippi'],
  movies: ["The Godfather", "The Shawshank Redemption", "Schindler's List",
    "Raging Bull", "Casablanca", "Citizen Kane", "Gone With The Wind", "The Wizard Of Oz",
    "Inception"]
}

const hangmanPics = [
  ` 
    +---+
    |   |
        |
        |
        |
        |
  =========`, 
 
  ` 
    +---+
    |   |
    O   |
        |
        |
        |
  =========`, 
 
  ` 
    +---+
    |   |
    O   |
    |   |
        |
        |
  =========`, 
 
  ` 
    +---+
    |   |
    O   |
   /|   |
        |
        |
  =========`, 
 
  ` 
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
  =========`, 
 
  ` 
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
  =========`, 
 
  ` 
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
  =========`]


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'guess> '
});

rl.on('line', (line) => {
  checkword(line);
}).on('close', () => {
  process.exit(0);
});

function init() {
  console.log("\x1b[43m%s\x1b[0m",'Welcome to the game of hangman, I am going to give you some empty dashes ' +
    'and you would guess the word in question by typing one letter or space at a time,' + 
    ' well that is before you are hanged! -:)');

  const options = ["clubs", "places", "movies"];
  const select = options[getRandom(3)];
  targetWord = categories[select][getRandom(getRandom(categories[select].length))];
  dArray = Array(targetWord.length);
  failCount = 0;

  console.log('Category is ' + select + '\n' + dArray.join('_ ') + '_');
  rl.prompt();  
}

function checkword(letter) {
  let tick;
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i].toLowerCase() === letter) {
      dArray[i] = targetWord[i];
      tick = true;
    } else if (dArray[i] === undefined) {
      dArray[i] = '_';
    }
  }

  tick ? tick = false : failCount++;
  
  if (failCount === 6) {
    console.log(hangmanPics[failCount]);
    console.log('Game over, you are hanged');
    console.log('Word is ', targetWord);
    init();
    return;
  } else {
    console.log(hangmanPics[failCount]);
  }
  dArray.includes('_') ? rl.prompt() : console.log('You have won, you won! yea');
  console.log(dArray.join(' '));
}

//for getting random things
function getRandom(max) {
  return Math.floor(Math.random() * (max));
}

init();
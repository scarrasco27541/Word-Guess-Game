
// Static values:
var guessesPerRound = 10;
var availableLetters = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var alphaKeycodes = [32, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
var keyedAlphabet = {"32": " ", "65": "a", "66": "b", "67": "c", "68": "d", "69": "e", "70": "f", "71": "g", "72": "h", "73": "i", "74": "j", "75": "k", "76": "l", "77": "m", "78": "n", "79": "o", "80": "p", "81": "q", "82": "r", "83": "s", "84": "t", "85": "u", "86": "v", "87": "w", "88": "x", "89": "y", "90": "z"};

var availableWords = ["wingardium leviosa", "Harry Potter", "dragon", "dementor", "Hogwarts", "Hermione", "wand", "Voldemort", "expeliarmus", "Hagrid"]
// 0,1,2,3

// Maintained/edited throughout:
var wins = 0;
var losses = 0;
var stillPlaying = true;

// Reset each round:
var lettersGuessed = [];
var currentWord;



function findFairNumberOfGuesses(word) {
var uniqueLetters =[];
var i;
	for (i = 0; i<word.length; i++) {
		if (uniqueLetters.indexOf(word[i]) < 0) {
			uniqueLetters.push(word[i]);
		}
	}
	return uniqueLetters.length+5;	
}


function drawWord() {
	var guessword = "";
	var finished = true;
	console.log(currentWord.toLowerCase());
	for (var i=0;i<currentWord.length;i++) {
		// Temporarily convert word to lower case and compare THAT
		// This allows you to retain the capitalization for nice display on the screen
		if (lettersGuessed.indexOf(currentWord.toLowerCase()[i])>-1) {
			// Enforce actual spacing distance in case of a blank space 'letter' by using &nbsp; character instead of just ' '
//			guessword += " " + currentWord[i] + " ";
			guessword += "<span class='letterspace'>" + currentWord[i] + "</span>";
		} else {
//			guessword += " _ ";
			guessword += "<span class='letterspace'>_</span>";
			finished = false;
		}
	}
	document.getElementById('theWord').innerHTML = guessword;
	document.getElementById('lettersGuessed').innerHTML = lettersGuessed.join(",");
	document.getElementById('remainingGuesses').innerHTML = guessesPerRound - lettersGuessed.length;
	if (finished) {
		wins++;
		newRound();
	} else {
		if (lettersGuessed.length >= guessesPerRound) {
			losses++;
			newRound();
		} else {
			
		}
	}
}




function hitKey(e) {
	
//	console.log(e.keyCode);
	
	if (stillPlaying) {
		var kc = e.keyCode;
		var letter = keyedAlphabet[kc];
		if (letter!=undefined && lettersGuessed.indexOf(letter) < 0) {		
			lettersGuessed.push(letter);
			drawWord();
		}
	}
}


function newRound() {
	if (wins+losses >= availableWords.length) {
		// end game, but how?
		stillPlaying = false;
		document.getElementById('theWord').innerHTML = "<strong>Game Over!</strong>";

		
	} else {
		lettersGuessed = [];
		currentWord = availableWords[(wins+losses)];
		guessesPerRound = findFairNumberOfGuesses(currentWord);
		drawWord();	
	}
	document.getElementById('wins').innerHTML = wins;
	document.getElementById('losses').innerHTML = losses;
}

//// ---------------------------------------------------------------------------
//// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
//// ---------------------------------------------------------------------------
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
//// ---------------------------------------------------------------------------

window.addEventListener("load", function() {
	// Start our first round
	shuffle(availableWords);	
	newRound();
	window.addEventListener("keydown", hitKey);		
});







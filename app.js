var time, scores, activePlayer, gameRunning;
var timeEl, namesEl, scoresEl, guessWordEl, tabooWordsEl;
var apiUrl, pageNumber
var words, usedWords, hardcoded_words, currentGuessWord, wordCount, totalWords, currentWordSkipped;

scores = [0 , 0];

words = useHardCodedWords();

usedWords = [];

timeEl = document.getElementById("time");

namesEl = [
    document.getElementById('name-1'), 
    document.getElementById('name-2')
];

scoresEl = [
    document.getElementById('score-1'), 
    document.getElementById('score-2')
];

guessWordEl = document.getElementById('guess-word');

tabooWordsEl = document.querySelectorAll(".taboo-word")

initGame();
setInterval(update, 1000);

function initGame() {

    // Check localStorage for game values, otherwise use defaults
    if (localStorage.startingTime) {
        time = parseInt(localStorage.startingTime);
    } else {
        time = 60;
    }

    if (localStorage.activePlayer) {
        activePlayer = parseInt(localStorage.activePlayer);
    } else {
        activePlayer = 0;
    }

    if (localStorage.scores) {
        scores = localStorage.scores.split(",");
    } else {
        scores = [0, 0];
    }

    if (localStorage.usedWords) {
        usedWords = localStorage.usedWords.split(",");
    } else {
        usedWords.length = 0;
    }
    
    wordCount = 0;

    currentWordSkipped = 0;
    
    timeEl.textContent = time;

    if(activePlayer === 0){
        namesEl[0].classList.add("bold");
        namesEl[1].classList.remove("bold");
    } else {
        namesEl[1].classList.add("bold");
        namesEl[0].classList.remove("bold");
    }

    scoresEl[0].textContent = scores[0];
    scoresEl[1].textContent = scores[1];


}

function getNewWord() {

    newWord = selectWord();

    // Save the current guess word
    currentGuessWord = guessWordEl.textContent = newWord;

    wordCount++;

}

function selectWord() {

    dice = Math.floor(Math.random() * words.length);
    selectedWord = words[dice];

    if (usedWords.length === 250) {

        // Empty our used words list if we have no words left
        console.log("Used word array cleared");
        usedWords.length = 0;

    } else if (usedWords.includes(selectedWord)) {

        // Try again to get an unused word
        console.log("Repeated a word: " + selectedWord);
        console.log(usedWords.length);
        selectWord();

    } else {
        
        // Add the word to the used words list
        usedWords.push(selectedWord);

        // Add the used words list to local storage, separated by commas
        // TODO: Change from objects to plain text
        localStorage.setItem("usedWords", usedWords.join());

    }

    return selectedWord;

}

function update() {

    if(gameRunning) {

        // Check if we are out of time
        if (time < 1) {

            // Switch Player
            switchPlayer();

            // Pause the game
            pauseGame();

        } else {

            // Count down on the timer
            time--;
            timeEl.textContent = time;

        }
    }
  }

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    localStorage.setItem("activePlayer", activePlayer);

    namesEl[0].classList.toggle("bold");
    namesEl[1].classList.toggle("bold");
}

function hideWords() {
    guessWordEl.textContent = "---";
}

function showWords() {
    guessWordEl.textContent = currentGuessWord;
}

document.getElementById('btn-got-it').addEventListener('click', function() {

    if (gameRunning) {

        // Give the active player two points and update the score
        scores[activePlayer]++;
        scoresEl[activePlayer].textContent = scores[activePlayer]

        // Reset the skip counter
        currentWordSkipped = 0;

        // Get a new word
        getNewWord();

    }

});

document.getElementById('btn-skip').addEventListener('click', function() {

    if (gameRunning) {

        // Give the word to the other team
        currentWordSkipped++;
        switchPlayer();

        // If both teams skip the word, then choose a new word.
        if (currentWordSkipped > 1) {
            getNewWord();
            currentWordSkipped = 0;
        }

    }

});

document.getElementById('btn-new-game').addEventListener('click', function() {
    
    // Restart game
    if (confirm("Start a new game?")) {

        // Clear some game variables
        localStorage.removeItem("activePlayer");
        localStorage.removeItem("scores");
        localStorage.removeItem("usedWords");

        initGame();

    }

});

var pauseBtn = document.getElementById('btn-pause')

pauseBtn.addEventListener('click', pauseGame = function() {

    if (gameRunning) {

        gameRunning = false;

        pauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
        pauseBtn.classList.toggle("my-pulse");

        hideWords();

    } else {

        // Get a new word if this is the first time since initGame() was called
        if (wordCount == 0) {
            getNewWord();
        }
        
        gameRunning = true;

        pauseBtn.innerHTML = '<i class="material-icons">pause</i>';
        pauseBtn.classList.toggle("my-pulse");
        
        showWords();

        if (time < 1) {

            // Set the timer back to the starting time
            if (localStorage.startingTime) {
                time = parseInt(localStorage.startingTime);
            } else {
                time = 60;
            }

            timeEl.textContent = time;

            // Choose a new word
            getNewWord();
        }

    }

});

var configBtn = document.getElementById('btn-config');

configBtn.addEventListener('click', function() {

    pauseGame();

});

var saveConfig = document.getElementById('config-save');
var startingTimeEl = document.getElementById('starting-time');

saveConfig.addEventListener('click', function() {

    // Save all settings to localStorage
    localStorage.setItem("startingTime", startingTimeEl.value);

});

function useHardCodedWords() {
    console.log("Words loaded.")
    return [
        "you, your, you're",
        "will",
        "Jehovah",
        "that",
        "with",
        "love",
        "when",
        "what",
        "also",
        "give",
        "from",
        "God's",
        "this",
        "heart",
        "know",
        "life",
        "they",
        "have",
        "things",
        "make",
        "help",
        "word",
        "name",
        "time",
        "never",
        "come",
        "need",
        "praise",
        "keep",
        "kingdom",
        "we",
        "them",
        "were",
        "just",
        "take",
        "true",
        "their",
        "truth",
        "good",
        "peace",
        "each",
        "faith",
        "right",
        "through",
        "want",
        "always",
        "here",
        "loyal",
        "show",
        "strong",
        "care",
        "live",
        "then",
        "sing",
        "those",
        "feel",
        "let's",
        "hear",
        "more",
        "bring",
        "down",
        "find",
        "look",
        "ones",
        "people",
        "world",
        "father",
        "hope",
        "like",
        "though",
        "prayer",
        "words",
        "could",
        "friend",
        "Jesus",
        "don't",
        "earth",
        "fear",
        "great",
        "best",
        "hearts",
        "news",
        "pray",
        "work",
        "done",
        "ever",
        "light",
        "serve",
        "faithful",
        "strength",
        "thats",
        "friends",
        "spirit",
        "stand",
        "above",
        "share",
        "these",
        "Christ",
        "might",
        "mind",
        "where",
        "place",
        "soon",
        "theres",
        "trust",
        "before",
        "cause",
        "please",
        "belong",
        "gave",
        "obey",
        "precious",
        "song",
        "walk",
        "brothers",
        "days",
        "Lord",
        "must",
        "preach",
        "alone",
        "honor",
        "makes",
        "near",
        "won't",
        "gives",
        "sure",
        "teach",
        "thank",
        "would",
        "back",
        "firm",
        "grow",
        "hand",
        "king",
        "should",
        "been",
        "learn",
        "long",
        "about",
        "eyes",
        "happy",
        "hard",
        "loving",
        "many",
        "means",
        "tell",
        "times",
        "courage",
        "holy",
        "made",
        "over",
        "side",
        "speak",
        "stay",
        "brings",
        "deep",
        "endure",
        "even",
        "gift",
        "guide",
        "really",
        "rejoice",
        "together",
        "bear",
        "blessings",
        "clear",
        "heard",
        "living",
        "preaching",
        "rule",
        "said",
        "seek",
        "smile",
        "some",
        "someone",
        "study",
        "ways",
        "whatever",
        "ahead",
        "away",
        "declare",
        "delight",
        "glory",
        "still",
        "than",
        "thankful",
        "call",
        "comfort",
        "door",
        "glad",
        "kind",
        "knows",
        "search",
        "step",
        "young",
        "around",
        "comes",
        "giving",
        "making",
        "paradise",
        "part",
        "sons",
        "start",
        "think",
        "turn",
        "which",
        "wisdom",
        "along",
        "free",
        "meek",
        "mighty",
        "night",
        "weak",
        "blessed",
        "build",
        "favor",
        "forever",
        "future",
        "hands",
        "known",
        "last",
        "matter",
        "other",
        "pace",
        "real",
        "thoughts",
        "anointed",
        "another",
        "choice",
        "devotion",
        "fast",
        "follow",
        "hold",
        "power",
        "proclaim",
        "provides",
        "send",
        "sheep",
        "sisters",
        "thanks",
        "trusting",
        "witness",
        "worship",
        "again",
        "beyond",
        "dear",
        "direction",
        "doubt",
        "given",
        "heavens",
            ];
        
}
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
    currentGuessWord = guessWordEl.textContent = newWord.guessWord;

    wordCount++;

}

function selectWord() {

    dice = Math.floor(Math.random() * words.length);
    selectedWord = words[dice];

    if (usedWords.length === 99) {

        // Empty our used words list if we have no words left
        console.log("Used word array cleared");
        usedWords.length = 0;

    } else if (usedWords.includes(selectedWord.guessWord)) {

        // Try again to get an unused word
        console.log("Repeated a word: " + selectedWord.guessWord);
        console.log(usedWords.length);
        selectWord();

    } else {
        
        // Add the word to the used words list
        usedWords.push(selectedWord.guessWord);

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
    return [ 
        {"guessWord": "Solomon", "tabooWords": ["King", "David", "Wisdom", "Wives"]},
        {"guessWord": "Jesus", "tabooWords": ["God's Son", "King", "Teacher", "Firstborn"]},
        {"guessWord": "Gideon", "tabooWords": ["Judge", "300", "Fleece", "Midian"]},
        {"guessWord": "Samson", "tabooWords": ["Hair", "Delilah", "Strong", "Philistines"]},
        {"guessWord": "Tabernacle", "tabooWords": ["Lampstand", "Tent", "Holy", "Priest"]},
        {"guessWord": "Ark of the Covenant", "tabooWords": ["Cherub", "Most Holy", "Box", "Carried"]},
        {"guessWord": "Temple", "tabooWords": ["Jerusalem", "Solomon", "Gold", "Sacrifice"]},
        {"guessWord": "Adam", "tabooWords": ["Eve", "First Man", "Dust", "Father"]},
        {"guessWord": "Eve", "tabooWords": ["Adam", "Fruit", "Serpent", "Rib"]},
        {"guessWord": "Paul", "tabooWords": ["Apostle", "Saul", "Writer", "Timothy"]},
        {"guessWord": "Burning Bush", "tabooWords": ["Holy Ground", "Moses", "Fire", "Jehovah God"]},
        {"guessWord": "Jericho", "tabooWords": ["Rahab", "Walls", "Spies", "Israelites"]},
        {"guessWord": "Jerusalem", "tabooWords": ["Temple", "King", "David", "City"]},
        {"guessWord": "Stones", "tabooWords": ["Bread", "Goliath", "David", "Sling"]},
        {"guessWord": "Ephesus", "tabooWords": ["Congregation", "First Century", "Letter", "Paul"]},
        {"guessWord": "Nisan 14", "tabooWords": ["Month", "Passover", "Memorial", "Jesus"]},
        {"guessWord": "Annointed", "tabooWords": ["144 000", "Holy Spirit", "Oil", "Heaven"]},
        {"guessWord": "Hannah", "tabooWords": ["Samuel", "Drunk", "Prayer", "Eli"]},
        {"guessWord": "Abraham (Abram)", "tabooWords": ["Sarah", "Patriarch", "Seed", "Isaac"]},
        {"guessWord": "Isaac", "tabooWords": ["Sacrifice", "Abraham", "Sarah", "Rebekah"]},
        {"guessWord": "Samuel", "tabooWords": ["Hannah", "Prophet", "Coat", "Priest"]},
        {"guessWord": "Altar", "tabooWords": ["Sacrifices", "Tabernacle", "Priest", "Temple"]},
        {"guessWord": "Amen", "tabooWords": ["So Be It", "Prayer", "End", "Agreement"]},
        {"guessWord": "Noah's Ark", "tabooWords": ["Flood", "Rainbow", "Animals", "Deluge"]},
        {"guessWord": "Angel", "tabooWords": ["Gabriel", "Spirit", "Cherub", "Seraph"]},
        {"guessWord": "Scripture", "tabooWords": ["Chapter", "Text", "Read", "Verse"]},
        {"guessWord": "Good News", "tabooWords": ["Preach", "Matthew 24:14", "Ministry", "Kingdom"]},
        {"guessWord": "Preach", "tabooWords": ["Ministry", "Service", "Evangelize", "Door to Door"]},
        {"guessWord": "Door to Door", "tabooWords": ["Ministry", "Preach", "House", "Magazine"]},
        {"guessWord": "Ministry", "tabooWords": ["Preach", "Kingdom", "Accomplish", "Service"]},
        {"guessWord": "Local Needs", "tabooWords": ["Month", "Elder", "Service Meeting", "Counsel"]},
        {"guessWord": "Miracle", "tabooWords": ["Holy Spirit", "Wine", "Jesus", "Supernatural"]},
        {"guessWord": "Prophecy", "tabooWords": ["Future", "Foretell", "Vision", "Daniel"]},
        {"guessWord": "Colporteurs", "tabooWords": ["Pioneer", "Service", "Time", "Hours"]},
        {"guessWord": "Pioneer", "tabooWords": ["Coleporter", "Auxiliary", "Hours", "Service"]},
        {"guessWord": "Sea of Galilee", "tabooWords": ["Jesus", "Storm", "Walked", "Boat"]},
        {"guessWord": "Sacred Secret", "tabooWords": ["Seed", "Messiah", "Kingdom", "Purpose"]},
        {"guessWord": "Covenant", "tabooWords": ["Agreement", "Contract", "Abrahamic", "Mosaic"]},
        {"guessWord": "New Release", "tabooWords": ["Regional/District Convention", "Publication", "Book", "DVD"]},
        {"guessWord": "Convention", "tabooWords": ["Regional", "District", "International", "Drama"]},
        {"guessWord": "Celestial Chariot", "tabooWords": ["Ezekiel", "Eyes", "Moving", "Wheel"]},
        {"guessWord": "Manna", "tabooWords": ["Bread", "Heaven", "Cakes", "Food"]},
        {"guessWord": "Unleavened Bread", "tabooWords": ["Unfermented", "Yeast", "Memorial", "Festival"]},
        {"guessWord": "Festival", "tabooWords": ["Booths", "Jubilee", "Weeks", "Celebration"]},
        {"guessWord": "Jezebel", "tabooWords": ["Wicked", "Queen", "Dogs", "Ahab"]},
        {"guessWord": "Morning Worship", "tabooWords": ["Bethel", "Daily Text", "Broadcast", "Breakfast"]},
        {"guessWord": "Hopper", "tabooWords": ["Free", "Bethel", "Donate", "Clothes"]},
        {"guessWord": "Jehovah", "tabooWords": ["God", "Almighty", "Most High", "Love"]},
        {"guessWord": "Babylon the Great", "tabooWords": ["Harlot", "False Religion", "Revelation", "Fallen"]},
        {"guessWord": "Resurrection", "tabooWords": ["Lazarus", "Dead", "Raise", "Paradise"]},
        {"guessWord": "Our Kingdom Ministry", "tabooWords": ["Service Meeting", "Presentations", "Monthly", "Oral Review"]},
        {"guessWord": "Love ", "tabooWords": ["Agape", "Identifying", "Mark", "God"]},
        {"guessWord": "Justice", "tabooWords": ["Qualities", "Attribute", "Cardinal", "Scales"]},
        {"guessWord": "Wisdom", "tabooWords": ["Qualities", "Solomon", "Knowledge", "Philosophy"]},
        {"guessWord": "Peace", "tabooWords": ["Surpass", "Fruitage", "Love", "Forgive"]},
        {"guessWord": "Joy", "tabooWords": ["Qualities", "Happiness", "Spirit", "Enter"]},
        {"guessWord": "Patience", "tabooWords": ["Endurance", "Wait", "Long", "Time"]},
        {"guessWord": "Leprosy", "tabooWords": ["Heal", "Miracle", "Unclean", "Grateful"]},
        {"guessWord": "Absalom", "tabooWords": ["Pride", "Hair", "David", "Betray"]},
        {"guessWord": "Esther", "tabooWords": ["Queen", "Beautiful", "Hamaan", "Mordecai"]},
        {"guessWord": "Rahab", "tabooWords": ["Cord", "Prostitute", "Hid", "Spies"]},
        {"guessWord": "Levi", "tabooWords": ["Tribe", "Inheritance", "Ark", "Son"]},
        {"guessWord": "Lazarus", "tabooWords": ["Resurrection", "Jesus", "Dead", "Wept"]},
        {"guessWord": "Memorial", "tabooWords": ["Bread", "Wine", "Nisan", "Sun down"]},
        {"guessWord": "Passover", "tabooWords": ["Memorial", "Jews", "Egypt", "Blood"]},
        {"guessWord": "Egypt", "tabooWords": ["Slaves", "Red", "Pharaoh", "Joseph"]},
        {"guessWord": "New World Translation", "tabooWords": ["2013", "Gray", "Bible", "Committee"]},
        {"guessWord": "Gerrit Losch", "tabooWords": ["Governing", "Body", "Austria", "Broadcast"]},
        {"guessWord": "Purple Triangle", "tabooWords": ["Video", "Nazi", "Camp", "Firm"]},
        {"guessWord": "Jews", "tabooWords": ["Gentiles", "Circumcision", "King", "Nation"]},
        {"guessWord": "Israelites", "tabooWords": ["Jehovah", "People", "Nation", "Jacob"]},
        {"guessWord": "Israel", "tabooWords": ["Jacob", "Kingdom", "Tribe", "Jerusalem"]},
        {"guessWord": "Bible Students", "tabooWords": ["International", "Study", "Learn", "God's Word"]},
        {"guessWord": "Holy Spirit", "tabooWords": ["Anoint", "Active Force", "Power", "Father"]},
        {"guessWord": "United Nations", "tabooWords": ["Gog of Magog", "Beast", "Standing", "League"]},
        {"guessWord": "Umim and Thummin", "tabooWords": ["Lots", "Decision", "Priests", "Hebrew"]},
        {"guessWord": "Ephod", "tabooWords": ["Aaron", "Priest", "Wear", "Stones"]},
        {"guessWord": "Family Worship", "tabooWords": ["Study", "Broadcast", "Together", "Praise"]},
        {"guessWord": "Book Study", "tabooWords": ["Congregation", "Meeting", "Group", "Home"]},
        {"guessWord": "Ten Commandments", "tabooWords": ["Shall", "Moses", "Sinai", "Tablet"]},
        {"guessWord": "Gog of Magog", "tabooWords": ["Ezekiel", "Attack", "Great Tribulation", "Coalition"]},
        {"guessWord": "Armageddon", "tabooWords": ["Judgement", "Megiddo", "War", "Destruction"]},
        {"guessWord": "Annointed", "tabooWords": ["144,000", "King", "Immortality", "Priest"]},
        {"guessWord": "Millenial Reign", "tabooWords": ["1000", "Year", "After", "Abyss"]},
        {"guessWord": "God's Kingdom", "tabooWords": ["Heart", "Rules", "Theme", "Government"]},
        {"guessWord": "Insight", "tabooWords": ["Green", "Book", "Research", "Scriptures"]},
        {"guessWord": "Bible Brown", "tabooWords": ["Black", "Preach", "Africa", "Sierra Leone"]},
        {"guessWord": "Mount Carmel", "tabooWords": ["Elijah", "Sugar", "Baal", "Fire"]},
        {"guessWord": "Bethel", "tabooWords": ["Warwick", "Wallkill", "Brooklyn", "New York"]},
        {"guessWord": "Mount Sinai", "tabooWords": ["Commandments", "Moses", "Calf", "Red Sea"]},
        {"guessWord": "Megiddo", "tabooWords": ["Mount", "Armageddon", "Revelation", "Gathered"]},
        {"guessWord": "Canaan", "tabooWords": ["Milk", "Honey", "Giant", "Grapes"]},
        {"guessWord": "Sodom and Gomorrah", "tabooWords": ["Lot", "Destruction", "Fire", "Sulfur"]},
        {"guessWord": "Philistia", "tabooWords": ["Goliath", "Nation", "Feathers", "Enemy"]},
        {"guessWord": "Warwick", "tabooWords": ["Bethel", "Upstate", "Headquarters", "Move"]},
        {"guessWord": "Wallkill", "tabooWords": ["Bethel", "Farm", "Upstate", "Facility"]},
        {"guessWord": "Patterson", "tabooWords": ["New York", "Education", "Gilead", "Art"]},
        {"guessWord": "Sin", "tabooWords": ["Death", "Adam", "Ransom", "Born"]},
        {"guessWord": "Allegheny", "tabooWords": ["Russell", "Bible", "Proclaimers", "Pensylvania"]},
        {"guessWord": "Lion's Den", "tabooWords": ["Daniel", "Pray", "Shut", "Angel"]},
        {"guessWord": "Immense Image", "tabooWords": ["Nebuchadnezzar", "Kingdom", "Babylon", "Head"]},
        {"guessWord": "Golden Calf", "tabooWords": ["Earrings", "Aaron", "Melt", "Worship"]},
        {"guessWord": "Red Sea", "tabooWords": ["Part", "Staff", "Moses", "Army"]},
        ];
}
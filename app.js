var scores, words;
var namesEl, scoresEl, guessWordEl, tabooWordsEl;

scores = [0 , 0];

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

words = [
    {
        guessWord: "Solomon",
        tabooWords: [
            "King",
            "David",
            "Wisdom",
            "Peaceful"
        ]
    },
    {
        guessWord: "Jesus",
        tabooWords: [
            "God's Son",
            "King",
            "Teacher",
            "Firstborn"
        ]
    },
];


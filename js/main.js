const playBtn = document.getElementById("play");
const infoPage = document.getElementById("page-info");
const gamePage = document.getElementById("page-game");
const playerInput = document.getElementById("playerInput");
const playerScore = document.getElementById("score");
const topScore = document.getElementById("bestScore");
const info = document.getElementById("info");
const playerTime = document.getElementById("time");
const tl = new TimelineLite();

let score = 0;
let time = 5;
let timeControl = "";
let check = "";
let isPlaying = false;
let bestScore = 0;

if (localStorage.bestscore) {
    bestScore = localStorage.bestscore;
    topScore.innerHTML = bestScore;
}

playBtn.addEventListener("click", () => {
    tl.to(infoPage, 0.4, { opacity: "0", zIndex: "1" }).to(
        gamePage,
        0.4,
        { opacity: "1", zIndex: "2" },
        "+=0.2"
    );

    playerInput.focus();

    check = setInterval(checkState, 50);

    playerInput.addEventListener("input", () => {
        info.innerHTML = "[ Type the word ]";
        if (isPlaying === false) {
            isPlaying = true;
            timeControl = setInterval(countDown, 1000);
        }
        if (playerInput.value === word.innerHTML) {
            correct();
        }
    });
});

const correct = () => {
    score++;
    playerScore.innerHTML = score;
    info.innerHTML = "[ Correct!!! ]";
    playerInput.value = "";
    time = 5;
    playerTime.innerHTML = time + " ";
    window.clearInterval(timeControl);
    timeControl = setInterval(countDown, 1000);
    getNewWord();
};

const countDown = () => {
    if (time) {
        time--;
        playerTime.innerHTML = time + " ";
    }
};

const checkState = () => {
    if (time === 0) {
        isPlaying = false;
        playerInput.value = "";
        info.innerHTML = "[ Game Over!! Type to restart.]";
        window.clearInterval(timeControl);
        time = 5;
        playerTime.innerHTML = time + " ";
        bestScore = score > bestScore ? score : bestScore;
        score = 0;
        playerScore.innerHTML = score;
        topScore.innerHTML = bestScore;
        localStorage.bestscore = bestScore;
        getNewWord();
    }
};

const getNewWord = () => {
    const wordList = fetch("../resource/wordlist.txt");
    console.log(wordList);
};

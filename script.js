let userScore = 0;
let compScore = 0;
let roundCount = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const resetButton = document.getElementById("reset-button");
const best = document.querySelector(".best");

const userScoreRef = document.querySelector("#user-score");
const compScoreRef = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.trunc(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game is Draw. Play again.";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScoreRef.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    } else {
        compScore++;
        compScoreRef.innerText = compScore;
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    }
};

const playGame = (userChoice) => {
    //Generate computer choice
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        //Draw Game
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            //scissors, paper
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            //rock, scissors
            userWin = compChoice === "scissors" ? false : true;
        } else {
            //rock, paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }

    roundCount++;
    best.innerText = `Best Of 5 : ${roundCount} `;
    if (roundCount >= 5) {
        msg.innerText = "Well Played 👏🎉 Best Of Luck Next Time!";
        endGame();
    }
};

const endGame = () => {
    // Show reset button
    resetButton.style.display = "block";
    // Disable choices
    choices.forEach(choice => {
        choice.removeEventListener("click", handleClick);
    });
};

const resetGame = () => {
    // Reset scores and round count
    userScore = 0;
    compScore = 0;
    roundCount = 0;
    userScoreRef.innerText = 0;
    compScoreRef.innerText = 0;
    // Hide reset button
    resetButton.style.display = "none";
    // Clear message
    best.innerText = `Best Of 5 : 0 `;
    msg.innerHTML = `Choose to Start the GAME <i id="arrow" class="fas fa-hand-pointer fa-beat"></i>`;

    // ${<i id="arrow" class="fa-solid fa-hand-pointer fa-beat fa-l"></i>}
    document.querySelector('#reset-button').innerText = 'Play again !';
    // Re-enable choices
    choices.forEach(choice => {
        choice.addEventListener("click", handleClick);
    });
};

const handleClick = (event) => {
    const userChoice = event.currentTarget.getAttribute("id");
    playGame(userChoice);
};

choices.forEach(choice => {
    choice.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);
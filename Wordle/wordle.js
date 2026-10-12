
const board = document.getElementById("game-board");
const input = document.getElementById("guess");
const button = document.getElementById("submit");
const message = document.getElementById("message");

let target = words[Math.floor(Math.random() * words.length)];
let attempt = 0;

for (let i = 0; i < 6; i++) {
    let row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < 5; j++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        row.appendChild(cell);
    }

    board.appendChild(row);
}

button.addEventListener("click", function () {
    let guess = input.value;

    if (attempt >= 6) {
        return;
    }

    let rows = document.querySelectorAll(".row");
    let cells = rows[attempt].children;
    let remaining = target.split("");
    let result = [];

    for (let i = 0; i < 5; i++) {
        cells[i].textContent = guess[i];

        if (guess[i] === target[i]) {
            result[i] = "correct";
            remaining[i] = "";
        } else {
            result[i] = "absent";
        }
    }

    for (let i = 0; i < 5; i++) {
        if (result[i] !== "correct") {
            let index = remaining.indexOf(guess[i]);

            if (index !== -1) {
                result[i] = "present";
                remaining[index] = "";
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        cells[i].classList.add(result[i]);
    }

    attempt++;
    input.value = "";

    if (guess === target) {
        message.textContent = "Congratulations! You guessed the word!";
    } else if (attempt === 6) {
        message.textContent = "Game over, the word was " + target;
    } else {
        return;
    }

    input.disabled = true;
    button.disabled = true;
});

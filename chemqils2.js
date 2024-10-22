const levels = [
    { 
        level: 1, 
        time: 3 * 60, // 3 menit
        questions: [
            { question: "What is the chemical symbol for water?", correctCard: "card1", answers: ["H2O", "CO2", "O2"] }
        ] 
    },
    { 
        level: 2, 
        time: 3 * 60, // 3 menit
        questions: [
            { question: "What is the atomic number of oxygen?", correctCard: "card1", answers: ["8", "6", "12"] },
            { question: "Which element is represented by the symbol 'Na'?", correctCard: "card2", answers: ["Nitrogen", "Sodium", "Sulfur"] }
        ] 
    }
];

let currentLevel = 0; // Index level
let currentQuestionIndex = 0; // Index soal di dalam level
let timeLeft;
let timerInterval;

// Timer display
const timerDisplay = document.getElementById("timer");

// Drag and Drop functionality
const cards = document.querySelectorAll('.card');
const answerBox = document.getElementById('answer-box');

cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id); // Simpan id kartu
}

answerBox.addEventListener('dragover', (e) => {
    e.preventDefault();
});

answerBox.addEventListener('drop', (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    answerBox.innerHTML = '';
    answerBox.appendChild(card);
    checkAnswer(cardId);
});

// Memuat soal pertama
function loadQuestion() {
    const questionData = levels[currentLevel].questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    // Set pilihan jawaban di kartu
    document.getElementById("card1").textContent = questionData.answers[0];
    document.getElementById("card2").textContent = questionData.answers[1];
    document.getElementById("card3").textContent = questionData.answers[2];
}

// Update timer
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        window.location.href = "chemqils_fail.html"; // Redirect ke halaman FAIL
    }

    timeLeft--;
}

// Mulai timer untuk level saat ini
function startTimer() {
    timeLeft = levels[currentLevel].time;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Cek jawaban
function checkAnswer(cardId) {
    const correctCard = levels[currentLevel].questions[currentQuestionIndex].correctCard;
    if (cardId === correctCard) {
        currentQuestionIndex++;

        if (currentQuestionIndex >= levels[currentLevel].questions.length) {
            clearInterval(timerInterval);
            if (currentLevel + 1 < levels.length) {
                window.location.href = "chemqils_win.html"; // Pindah ke halaman WIN
            } else {
                alert('Congratulations, you completed all levels!');
            }
        } else {
            loadQuestion(); // Lanjut ke soal berikutnya dalam level ini
        }
    } else {
        alert("Incorrect! Try again.");
    }
}

// Mulai level
function startLevel(levelIndex) {
    currentLevel = levelIndex;
    currentQuestionIndex = 0;
    document.getElementById("level-display").textContent = levels[currentLevel].level;
    loadQuestion();
    startTimer();
}

// Mulai dari level pertama
startLevel(0);
const levels = [
    { 
        level: 1, 
        time: 1 * 60, 
        questions: [
            { question: "What is the chemical symbol for water?", correctCard: "card1", answers: ["H2O", "CO2", "O2"] }
        ] 
    },
    { 
        level: 2, 
        time: 2 * 60,
        questions: [
            { question: "What is the atomic number of oxygen?", correctCard: "card1", answers: ["8", "6", "12"] },
            { question: "Which element is represented by the symbol 'Na'?", correctCard: "card2", answers: ["Nitrogen", "Sodium", "Sulfur"] }
        ] 
    },
    {
        level: 3,
        time: 2 * 60,
        questions: [
            { question: "What is the chemical formula for sulfuric acid?", correctCard: "card1", answers: ["H2SO4", "H2S", "SO4"] },
            { question: "What is the pH of a neutral solution?", correctCard: "card3", answers: ["5", "9", "7"] },
            { question: "What type of reaction is  2H2 + O2 → 2H2O?", correctCard: "card2", answers: ["Decomposition", "Synthesis", "Combustion"] }
        ]
    },
    {
        level: 4,
        time: 3 * 60,
        questions: [
            { question: "In a Lewis structure, what do dots represent?", correctCard: "card3", answers: ["Protons", "Neutrons", "Electrons"] },
            { question: "Which of the following molecules has a double bond in its Lewis structure?", correctCard: "card2", answers: ["CH4", "CO2", "NH3"] },
            { question: "How many valence electrons does oxygen have in its Lewis structure?", correctCard: "card1", answers: ["6", "4", "8"] },
            { question: "Which of the following correctly shows the Lewis structure for carbon dioxide (CO₂)?", correctCard: "card1", answers: ["O=C=O", "O-C-O", "C-O-O"] }
        ]
    },
    {
        level: 5,
        time: 3 * 60,
        questions: [
            { question: "What is the primary unit of energy in chemistry?", correctCard: "card2", answers: ["Newton", "Joule", "Pascal"] },
            { question: "In an exothermic reaction, energy is:", correctCard: "card2", answers: ["Absorbed", "Released", "Destroyed"] },
            { question: "What type of energy is stored in chemical bonds?", correctCard: "card3", answers: ["Thermal energy", "Kinetic energy", "Chemical potential energy"] },
            { question: "Which law states that energy cannot be created or destroyed?", correctCard: "card3", answers: ["Law of Definite Proportions", "Law of Conservation of Mass", "First Law of Thermodynamics"] },
            { question: "What happens to the energy in an endothermic reaction?", correctCard: "card2", answers: ["Energy is released", "Energy is absorbed", "Energy is neutral"] }
        ]
    }
];

let currentLevel = 0; 
let currentQuestionIndex = 0;
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
    e.dataTransfer.setData('text/plain', e.target.id); 
}

answerBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    handleDrop(cardId);
});

answerBox.addEventListener('drop', (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    answerBox.innerHTML = '';
    answerBox.appendChild(card);
    checkAnswer(cardId);
});

// Mobile drag and drop
cards.forEach(card => {
    card.addEventListener('touchstart', touchStart, {passive: false});
    card.addEventListener('touchmove', touchMove, {passive: false});
    card.addEventListener('touchend', touchEnd, {passive: false});
});

let draggedCard = null;
let startX, startY;

function initDragAndDrop() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('touchstart', touchStart, { passive: false });
    });

    document.addEventListener('touchmove', touchMove, { passive: false });
    document.addEventListener('touchend', touchEnd);
}

function touchStart(e) {
    e.preventDefault();
    draggedCard = e.target.closest('.card');
    if (!draggedCard) return;

    const touch = e.touches[0];
    const rect = draggedCard.getBoundingClientRect();
    startX = touch.clientX - rect.left;
    startY = touch.clientY - rect.top;

    draggedCard.style.position = 'fixed';
    draggedCard.style.zIndex = 1000;

    updateCardPosition(touch);
}

function touchMove(e) {
    if (!draggedCard) return;
    e.preventDefault();
    updateCardPosition(e.touches[0]);
}

function touchEnd(e) {
    if (!draggedCard) return;
    e.preventDefault();
    const touch = e.changedTouches[0];
    const answerBox = document.getElementById('answer-box');
    const answerBoxRect = answerBox.getBoundingClientRect();
    const cardRect = draggedCard.getBoundingClientRect();

    if (
        cardRect.left < answerBoxRect.right &&
        cardRect.right > answerBoxRect.left &&
        cardRect.top < answerBoxRect.bottom &&
        cardRect.bottom > answerBoxRect.top
    ) {
        handleDrop(draggedCard.id);
    } else {
        resetCardPosition(draggedCard);
    }

    draggedCard.style.zIndex = '';
    draggedCard = null;
}

function updateCardPosition(touch) {
    draggedCard.style.left = `${touch.clientX - startX}px`;
    draggedCard.style.top = `${touch.clientY - startY}px`;
}

function resetCardPosition(card) {
    card.style.position = '';
    card.style.left = '';
    card.style.top = '';
}

function handleDrop(cardId) {
    const card = document.getElementById(cardId);
    const answerBox = document.getElementById('answer-box');
    
    answerBox.innerHTML = '';
    answerBox.appendChild(card);
    
    resetCardPosition(card);
    checkAnswer(cardId);
    
    // Log for debugging
    console.log('Dropped card:', cardId);
}

// Make sure to call this function to initialize the touch events
initDragAndDrop();

function resetCards() {
    const cardContainer = document.querySelector('.container'); 
    const answerBox = document.getElementById('answer-box'); 

    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");
    const card3 = document.getElementById("card3");

    cardContainer.appendChild(card1);
    cardContainer.appendChild(card2);
    cardContainer.appendChild(card3);

    answerBox.innerHTML = 'Drop answer here';
}


function loadQuestion() {
    resetCards(); 
    const questionData = levels[currentLevel].questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    document.getElementById("card1").textContent = questionData.answers[0];
    document.getElementById("card2").textContent = questionData.answers[1];
    document.getElementById("card3").textContent = questionData.answers[2];
}


function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        window.location.href = "fail.html"; 
    }

    timeLeft--;
}

function startTimer() {
    timeLeft = levels[currentLevel].time;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function checkAnswer(cardId) {
    console.log("Checking answer. Current level:", currentLevel, "Current question:", currentQuestionIndex);
    const correctCard = levels[currentLevel].questions[currentQuestionIndex].correctCard;
    if (cardId === correctCard) {
        currentQuestionIndex++;
        console.log("Correct answer. New question index:", currentQuestionIndex);

        if (currentQuestionIndex >= levels[currentLevel].questions.length) {
            console.log("Level completed. Attempting to move to next level.");
            clearInterval(timerInterval);
            if (currentLevel + 1 < levels.length) {
                const nextLevel = currentLevel + 2; 
                console.log("Moving to win page. Next level:", nextLevel);
                window.location.href = `win.html?nextLevel=${nextLevel}`;
            } else {
                console.log("Game completed. Moving to end page.");
                window.location.href = "end.html";
            }
        } else {
            loadQuestion();
        }
    } else {
        console.log("Incorrect answer.");
        alert("Incorrect! Try again.");
    }
}

function startLevel(levelIndex) {
    console.log("Starting level:", levelIndex);
    currentLevel = levelIndex;
    currentQuestionIndex = 0;
    document.getElementById("level-display").textContent = levels[currentLevel].level;
    loadQuestion();
    startTimer();
}

const urlParams = new URLSearchParams(window.location.search);
const nextLevel = urlParams.get('nextLevel');
startLevel(nextLevel ? parseInt(nextLevel) : 0);
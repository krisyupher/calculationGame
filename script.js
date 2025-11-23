/**
 * Sum Memory Game Logic
 */

// Game Configuration
const CONFIG = {
    numberCount: 5,
    minNumber: 1,
    maxNumber: 10,
    displayDuration: 1500, // ms per number
    pauseDuration: 500,   // ms between numbers
};

// DOM Elements
const screens = {
    start: document.getElementById('screen-start'),
    countdown: document.getElementById('screen-countdown'),
    playing: document.getElementById('screen-playing'),
    input: document.getElementById('screen-input'),
    result: document.getElementById('screen-result'),
};

const elements = {
    btnStart: document.getElementById('btn-start'),
    btnSubmit: document.getElementById('btn-submit'),
    btnRestart: document.getElementById('btn-restart'),
    countdownDisplay: document.getElementById('countdown-display'),
    numberDisplay: document.getElementById('number-display'),
    inputAnswer: document.getElementById('input-answer'),
    resultTitle: document.getElementById('result-title'),
    resultMessage: document.getElementById('result-message'),
    statUserAnswer: document.getElementById('stat-user-answer'),
    statCorrectAnswer: document.getElementById('stat-correct-answer'),
    resultIcon: document.getElementById('result-icon'),
};

// Game State
let gameState = {
    numbers: [],
    sum: 0,
    currentNumberIndex: 0,
};

// Initialize
function init() {
    setupEventListeners();
}

function setupEventListeners() {
    elements.btnStart.addEventListener('click', startGame);
    elements.btnSubmit.addEventListener('click', submitAnswer);
    elements.btnRestart.addEventListener('click', resetGame);
    
    // Allow Enter key to submit answer
    elements.inputAnswer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });
}

function switchScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    }
}

function startGame() {
    // Reset state
    gameState.numbers = generateNumbers(CONFIG.numberCount);
    gameState.sum = gameState.numbers.reduce((a, b) => a + b, 0);
    gameState.currentNumberIndex = 0;
    
    // Clear input
    elements.inputAnswer.value = '';
    
    // Start Countdown
    startCountdown();
}

function generateNumbers(count) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * (CONFIG.maxNumber - CONFIG.minNumber + 1)) + CONFIG.minNumber);
    }
    return numbers;
}

function startCountdown() {
    switchScreen('countdown');
    let count = 3;
    elements.countdownDisplay.textContent = count;
    
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            elements.countdownDisplay.textContent = count;
        } else {
            clearInterval(interval);
            startNumberSequence();
        }
    }, 1000);
}

async function startNumberSequence() {
    switchScreen('playing');
    
    for (const number of gameState.numbers) {
        await showNumber(number);
    }
    
    // Finished showing numbers
    setTimeout(() => {
        switchScreen('input');
        elements.inputAnswer.focus();
    }, 500);
}

function showNumber(number) {
    return new Promise(resolve => {
        // Show number
        elements.numberDisplay.textContent = number;
        elements.numberDisplay.classList.remove('pop-in');
        void elements.numberDisplay.offsetWidth; // Trigger reflow
        elements.numberDisplay.classList.add('pop-in');
        
        // Wait for display duration
        setTimeout(() => {
            // Clear number (optional, or just wait)
            // elements.numberDisplay.textContent = '';
            
            // Wait for pause duration
            setTimeout(() => {
                resolve();
            }, CONFIG.pauseDuration);
            
        }, CONFIG.displayDuration);
    });
}

function submitAnswer() {
    const userAnswer = parseInt(elements.inputAnswer.value);
    
    if (isNaN(userAnswer)) {
        alert('Please enter a valid number');
        return;
    }
    
    showResult(userAnswer);
}

function showResult(userAnswer) {
    switchScreen('result');
    
    elements.statUserAnswer.textContent = userAnswer;
    elements.statCorrectAnswer.textContent = gameState.sum;
    
    if (userAnswer === gameState.sum) {
        elements.resultTitle.textContent = 'Correct!';
        elements.resultTitle.style.color = 'var(--success-color)';
        elements.resultMessage.textContent = 'Great memory and calculation skills!';
        elements.resultIcon.textContent = '🎉';
    } else {
        elements.resultTitle.textContent = 'Wrong!';
        elements.resultTitle.style.color = 'var(--error-color)';
        elements.resultMessage.textContent = 'Close, but not quite. Try again!';
        elements.resultIcon.textContent = '❌';
    }
}

function resetGame() {
    switchScreen('start');
}

// Run init
init();

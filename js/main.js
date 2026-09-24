import { Game } from './game.js';
import { QuizLockAdapter } from './quiz-lock-adapter.js';

// Setup debug mode
const DEBUG_MODE = false; 
if(DEBUG_MODE) {
    document.getElementById('debugPanel').classList.remove('hidden');
}

const canvas = document.getElementById('gameCanvas');
const ui = {
    level: document.getElementById('ui-level'),
    time: document.getElementById('ui-time'),
    moves: document.getElementById('ui-moves')
};

const game = new Game(canvas, ui);

// Future Quiz Lock Setup
const quizAdapter = new QuizLockAdapter(
    () => { game.state.isPaused = true; }, 
    () => { game.state.isPaused = false; game.state.lastTime = performance.now(); }
);

// Buttons
document.getElementById('btnStart').addEventListener('click', (e) => {
    e.target.parentElement.classList.add('hidden');
    game.startLevel(1);
    
    // Example: Trigger mock quiz lock after 30 seconds active playtime
    setTimeout(() => {
        quizAdapter.triggerQuiz();
    }, 30000);
});

document.getElementById('btnNextLevel').addEventListener('click', (e) => {
    e.target.parentElement.classList.add('hidden');
    game.startLevel(game.state.level + 1);
});

document.getElementById('btnReplay').addEventListener('click', (e) => {
    e.target.parentElement.classList.add('hidden');
    game.startLevel(game.state.level); // Re-generates a new maze of same difficulty level
});

export class QuizLockAdapter {
    constructor(onPause, onResume) {
        this.onPause = onPause;
        this.onResume = onResume;
        this.quizOverlay = document.getElementById('quizOverlay');
        
        // Mock Quiz Button
        document.getElementById('btnMockQuizPass').addEventListener('click', () => {
            this.resumeGame();
        });
    }

    triggerQuiz() {
        this.onPause();
        this.quizOverlay.classList.remove('hidden');
    }

    resumeGame() {
        this.quizOverlay.classList.add('hidden');
        this.onResume();
    }
}

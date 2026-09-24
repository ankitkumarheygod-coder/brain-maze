export class GameState {
    constructor() {
        this.level = 1;
        this.timeMs = 0;
        this.isPaused = false;
        this.lastTime = performance.now();
    }

    updateTime() {
        if (!this.isPaused) {
            let now = performance.now();
            this.timeMs += (now - this.lastTime);
            this.lastTime = now;
        } else {
            this.lastTime = performance.now(); // Keep synced while paused
        }
    }

    getFormattedTime() {
        let totalSecs = Math.floor(this.timeMs / 1000);
        let m = Math.floor(totalSecs / 60).toString().padStart(2, '0');
        let s = (totalSecs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    resetTime() {
        this.timeMs = 0;
        this.lastTime = performance.now();
    }
}

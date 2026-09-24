export class Controls {
    constructor(canvas) {
        this.canvas = canvas;
        this.dirX = 0;
        this.dirY = 0;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isTouching = false;
        
        // Count interactions for "moves"
        this.moveChanges = 0; 

        this.keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, w: false, a: false, s: false, d: false };

        this.initListeners();
    }

    initListeners() {
        // Touch events (Virtual Joystick)
        this.canvas.addEventListener('touchstart', (e) => {
            this.isTouching = true;
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            this.moveChanges++;
        });

        this.canvas.addEventListener('touchmove', (e) => {
            if (!this.isTouching) return;
            let currentX = e.touches[0].clientX;
            let currentY = e.touches[0].clientY;
            let dx = currentX - this.touchStartX;
            let dy = currentY - this.touchStartY;
            
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 10) { // Threshold
                this.dirX = dx / dist;
                this.dirY = dy / dist;
            }
        });

        this.canvas.addEventListener('touchend', () => {
            this.isTouching = false;
            this.dirX = 0;
            this.dirY = 0;
        });

        // Keyboard
        window.addEventListener('keydown', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                if(!this.keys[e.key]) this.moveChanges++;
                this.keys[e.key] = true;
                this.updateKeyDirection();
            }
        });

        window.addEventListener('keyup', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = false;
                this.updateKeyDirection();
            }
        });
    }

    updateKeyDirection() {
        let dx = 0, dy = 0;
        if (this.keys.ArrowUp || this.keys.w) dy -= 1;
        if (this.keys.ArrowDown || this.keys.s) dy += 1;
        if (this.keys.ArrowLeft || this.keys.a) dx -= 1;
        if (this.keys.ArrowRight || this.keys.d) dx += 1;
        
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
            this.dirX = dx / dist;
            this.dirY = dy / dist;
        } else {
            this.dirX = 0;
            this.dirY = 0;
        }
    }

    getVector() {
        return { x: this.dirX, y: this.dirY };
    }

    getMoves() {
        return this.moveChanges;
    }

    resetMoves() {
        this.moveChanges = 0;
    }
}

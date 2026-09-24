import { resolveCircleLineCollision } from './collision.js';

export class Player {
    constructor(startX, startY, radius) {
        this.x = startX;
        this.y = startY;
        this.radius = radius;
        this.speed = radius * 0.45; // Speed strictly less than radius prevents tunnel bugs
    }

    update(controls, mazeSegments) {
        let vec = controls.getVector();
        
        // Move player
        this.x += vec.x * this.speed;
        this.y += vec.y * this.speed;

        // Resolve collisions multiple times to handle corners smoothly
        for (let i = 0; i < 3; i++) {
            let collided = false;
            for (let line of mazeSegments) {
                if (resolveCircleLineCollision(this, line)) {
                    collided = true;
                }
            }
            if (!collided) break;
        }
    }
}

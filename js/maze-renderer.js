export class MazeRenderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    render(player, segments, target, cellSize, mazeWidth, mazeHeight) {
        // Camera Follow Logic (Keep player centered)
        let camX = player.x - this.canvas.width / 2;
        let camY = player.y - this.canvas.height / 2;

        // Clamp camera to maze bounds
        camX = Math.max(0, Math.min(camX, mazeWidth - this.canvas.width));
        camY = Math.max(0, Math.min(camY, mazeHeight - this.canvas.height));

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(-camX, -camY);

        // Draw Target (Goal)
        this.ctx.fillStyle = '#ef4444';
        this.ctx.beginPath();
        this.ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#ef4444';
        this.ctx.fill(); // Glow

        // Draw Player
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = '#facc15';
        this.ctx.beginPath();
        this.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw Walls (Continuous Lines)
        this.ctx.strokeStyle = '#38bdf8';
        this.ctx.lineWidth = segments.length > 0 ? segments[0].thickness : 4;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = '#0284c7';

        this.ctx.beginPath();
        for (let line of segments) {
            this.ctx.moveTo(line.x1, line.y1);
            this.ctx.lineTo(line.x2, line.y2);
        }
        this.ctx.stroke();

        this.ctx.restore();
    }
}

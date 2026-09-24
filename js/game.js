import { MazeGenerator } from './maze-generator.js';
import { MazeRenderer } from './maze-renderer.js';
import { Player } from './player.js';
import { Controls } from './controls.js';
import { LevelManager } from './level-manager.js';
import { analyzeMaze } from './pathfinder.js';
import { calculateDifficultyScore } from './difficulty.js';
import { GameState } from './game-state.js';
import { XPAdapter } from './xp-adapter.js';

export class Game {
    constructor(canvas, uiElements) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ui = uiElements;
        
        this.controls = new Controls(this.canvas);
        this.renderer = new MazeRenderer(this.canvas, this.ctx);
        this.state = new GameState();
        
        this.mazeSegments = [];
        this.target = null;
        this.player = null;
        this.mazeWidth = 0;
        this.mazeHeight = 0;
        this.analysis = null;
        this.diffScore = 0;

        this.animationId = null;
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    startLevel(levelNumber) {
        this.state.level = levelNumber;
        let data = LevelManager.getLevelData(levelNumber);
        
        // Generate and Validate Solvable Maze
        let generator = new MazeGenerator(data.cols, data.rows, data.cellSize, data.wallThickness);
        let mazeData = generator.generate();
        
        this.analysis = analyzeMaze(mazeData.rawGrid, data.cols, data.rows);
        
        // If somehow impossible (shouldn't happen with strict backtracker), regenerate
        if (!this.analysis.isSolvable) {
            return this.startLevel(levelNumber);
        }

        this.mazeSegments = mazeData.segments;
        this.diffScore = calculateDifficultyScore(this.analysis, data.cols, data.rows);

        this.mazeWidth = data.cols * data.cellSize;
        this.mazeHeight = data.rows * data.cellSize;

        // Init Player inside first cell
        let startX = data.cellSize / 2;
        let startY = data.cellSize / 2;
        this.player = new Player(startX, startY, data.cellSize * 0.35);

        // Init Target inside last cell
        this.target = {
            x: (data.cols - 0.5) * data.cellSize,
            y: (data.rows - 0.5) * data.cellSize,
            radius: data.cellSize * 0.25
        };

        this.state.resetTime();
        this.controls.resetMoves();
        this.updateUI();

        // Debug info update
        document.getElementById('ui-diff').innerText = this.diffScore;
        document.getElementById('ui-path').innerText = this.analysis.shortestPath;
        document.getElementById('ui-deadends').innerText = this.analysis.deadEnds;

        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.state.isPaused = false;
        this.loop();
    }

    loop() {
        if (this.state.isPaused) {
            this.animationId = requestAnimationFrame(() => this.loop());
            return;
        }

        this.state.updateTime();
        this.player.update(this.controls, this.mazeSegments);
        this.renderer.render(this.player, this.mazeSegments, this.target, 45, this.mazeWidth, this.mazeHeight);
        
        this.updateUI();
        this.checkWinCondition();

        this.animationId = requestAnimationFrame(() => this.loop());
    }

    checkWinCondition() {
        let dx = this.player.x - this.target.x;
        let dy = this.player.y - this.target.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < this.target.radius + this.player.radius) {
            this.state.isPaused = true;
            this.handleLevelComplete();
        }
    }

    handleLevelComplete() {
        let earnedXP = XPAdapter.addXP(this.diffScore + 10);
        
        document.getElementById('out-level').innerText = this.state.level;
        document.getElementById('out-diff').innerText = this.diffScore;
        document.getElementById('out-time').innerText = this.state.getFormattedTime();
        document.getElementById('out-moves').innerText = this.controls.getMoves();
        document.getElementById('out-xp').innerText = `+${earnedXP}`;
        
        document.getElementById('completionOverlay').classList.remove('hidden');
    }

    updateUI() {
        this.ui.level.innerText = this.state.level;
        this.ui.time.innerText = this.state.getFormattedTime();
        this.ui.moves.innerText = this.controls.getMoves();
    }
}

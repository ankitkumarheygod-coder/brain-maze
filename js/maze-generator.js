export class MazeGenerator {
    constructor(cols, rows, cellSize, wallThickness) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.wallThickness = wallThickness;
        this.grid = [];
        // grid[x][y] = { top: true, right: true, bottom: true, left: true, visited: false }
    }

    generate() {
        for (let x = 0; x < this.cols; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.rows; y++) {
                this.grid[x][y] = { top: true, right: true, bottom: true, left: true, visited: false };
            }
        }

        let stack = [];
        let curr = { x: 0, y: 0 };
        this.grid[curr.x][curr.y].visited = true;

        let unvisitedCount = this.cols * this.rows - 1;

        while (unvisitedCount > 0) {
            let neighbors = this.getUnvisitedNeighbors(curr.x, curr.y);
            if (neighbors.length > 0) {
                let next = neighbors[Math.floor(Math.random() * neighbors.length)];
                stack.push(curr);
                this.removeWalls(curr, next);
                curr = next;
                this.grid[curr.x][curr.y].visited = true;
                unvisitedCount--;
            } else if (stack.length > 0) {
                curr = stack.pop();
            }
        }

        return this.convertToSegments();
    }

    getUnvisitedNeighbors(x, y) {
        let neighbors = [];
        if (y > 0 && !this.grid[x][y - 1].visited) neighbors.push({ x, y: y - 1, dir: 'top' });
        if (x < this.cols - 1 && !this.grid[x + 1][y].visited) neighbors.push({ x: x + 1, y, dir: 'right' });
        if (y < this.rows - 1 && !this.grid[x][y + 1].visited) neighbors.push({ x, y: y + 1, dir: 'bottom' });
        if (x > 0 && !this.grid[x - 1][y].visited) neighbors.push({ x: x - 1, y, dir: 'left' });
        return neighbors;
    }

    removeWalls(a, b) {
        if (a.x === b.x && a.y === b.y + 1) { a.dir = 'top'; b.dir = 'bottom'; }
        if (a.x === b.x - 1 && a.y === b.y) { a.dir = 'right'; b.dir = 'left'; }
        if (a.x === b.x && a.y === b.y - 1) { a.dir = 'bottom'; b.dir = 'top'; }
        if (a.x === b.x + 1 && a.y === b.y) { a.dir = 'left'; b.dir = 'right'; }

        if (a.dir === 'top') { this.grid[a.x][a.y].top = false; this.grid[b.x][b.y].bottom = false; }
        if (a.dir === 'right') { this.grid[a.x][a.y].right = false; this.grid[b.x][b.y].left = false; }
        if (a.dir === 'bottom') { this.grid[a.x][a.y].bottom = false; this.grid[b.x][b.y].top = false; }
        if (a.dir === 'left') { this.grid[a.x][a.y].left = false; this.grid[b.x][b.y].right = false; }
    }

    convertToSegments() {
        let segments = [];
        let cs = this.cellSize;
        let wt = this.wallThickness;

        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                let cell = this.grid[x][y];
                // Top
                if (cell.top) segments.push({ x1: x * cs, y1: y * cs, x2: (x + 1) * cs, y2: y * cs, thickness: wt });
                // Right
                if (cell.right) segments.push({ x1: (x + 1) * cs, y1: y * cs, x2: (x + 1) * cs, y2: (y + 1) * cs, thickness: wt });
                // Bottom
                if (cell.bottom) segments.push({ x1: x * cs, y1: (y + 1) * cs, x2: (x + 1) * cs, y2: (y + 1) * cs, thickness: wt });
                // Left
                if (cell.left) segments.push({ x1: x * cs, y1: y * cs, x2: x * cs, y2: (y + 1) * cs, thickness: wt });
            }
        }
        return { segments, rawGrid: this.grid };
    }
}

export function analyzeMaze(grid, cols, rows) {
    let queue = [{ x: 0, y: 0, dist: 0 }];
    let visited = Array.from({ length: cols }, () => Array(rows).fill(false));
    visited[0][0] = true;
    
    let targetX = cols - 1;
    let targetY = rows - 1;
    let shortestPath = 0;
    
    // BFS for shortest path
    while(queue.length > 0) {
        let curr = queue.shift();
        if (curr.x === targetX && curr.y === targetY) {
            shortestPath = curr.dist;
            break;
        }

        let cell = grid[curr.x][curr.y];
        if (!cell.top && !visited[curr.x][curr.y - 1]) { visited[curr.x][curr.y - 1] = true; queue.push({x: curr.x, y: curr.y - 1, dist: curr.dist + 1}); }
        if (!cell.right && !visited[curr.x + 1][curr.y]) { visited[curr.x + 1][curr.y] = true; queue.push({x: curr.x + 1, y: curr.y, dist: curr.dist + 1}); }
        if (!cell.bottom && !visited[curr.x][curr.y + 1]) { visited[curr.x][curr.y + 1] = true; queue.push({x: curr.x, y: curr.y + 1, dist: curr.dist + 1}); }
        if (!cell.left && !visited[curr.x - 1][curr.y]) { visited[curr.x - 1][curr.y] = true; queue.push({x: curr.x - 1, y: curr.y, dist: curr.dist + 1}); }
    }

    // Count Dead Ends
    let deadEnds = 0;
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            if (x === 0 && y === 0) continue; // Start
            if (x === targetX && y === targetY) continue; // End
            
            let cell = grid[x][y];
            let walls = (cell.top?1:0) + (cell.right?1:0) + (cell.bottom?1:0) + (cell.left?1:0);
            if (walls === 3) deadEnds++;
        }
    }

    return { shortestPath, deadEnds, isSolvable: shortestPath > 0 };
}

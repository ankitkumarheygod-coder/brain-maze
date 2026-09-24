export function calculateDifficultyScore(analysis, cols, rows) {
    let maxPossiblePath = cols * rows;
    let pathScore = (analysis.shortestPath / maxPossiblePath) * 50;
    let deadEndScore = (analysis.deadEnds / (cols * rows * 0.4)) * 50;
    
    let total = pathScore + deadEndScore;
    return Math.min(100, Math.floor(total));
}

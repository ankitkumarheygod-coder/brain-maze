export class LevelManager {
    static getLevelData(level) {
        // Base dimensions
        let cols = 5;
        let rows = 5;

        // Level 1-20: Specific scale
        // Level 21-400: Extrapolated growth
        if (level <= 20) {
            cols = 5 + Math.floor(level * 1.0);
            rows = 5 + Math.floor(level * 1.0);
        } else {
            cols = 25 + Math.floor((level - 20) * 0.5);
            rows = 25 + Math.floor((level - 20) * 0.5);
        }

        // Cap size for mobile memory/performance limits
        cols = Math.min(cols, 60);
        rows = Math.min(rows, 60);

        return {
            level: level,
            cols: cols,
            rows: rows,
            cellSize: 45, // Fixed physical size (ensures corridors feel same size on screen)
            wallThickness: 4
        };
    }
}

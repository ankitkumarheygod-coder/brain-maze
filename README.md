# Brutal Brain Maze (Mobile-First)

A high-difficulty, procedurally generated line-based maze game designed specifically for mobile touch controls. Built purely in HTML5, CSS, and vanilla ES Modules.

## 🎯 Game Features
- **Continuous Wall Lines**: No blocks, tiles, or grids rendered. True line segment collision logic.
- **Procedural Solvable Mazes**: Recursive Backtracker guarantees high dead-end difficulty, validated by internal BFS Pathfinder.
- **Dynamic Camera System**: The camera follows the player seamlessly across massive 400-level-ready maze structures without scaling down graphics.
- **Relative Virtual Joystick**: Smooth drag controls for mobile (Arrow keys/WASD supported for desktop testing).

## 🚀 GitHub Pages Deployment
1. Upload this entire folder to your GitHub repo.
2. Ensure folder structure is exact (e.g., `index.html` at root, `js/` folder containing modules).
3. Go to **Settings > Pages** on GitHub.
4. Set source to `main` branch.
5. Save and deploy. No build steps (Vite/NPM) required.

*Note for local development: ES Modules require a local web server to prevent CORS errors (use VSCode Live Server or `python -m http.server`).*

## 🔧 Future Architecture Readiness (Adapters)
- `quiz-lock-adapter.js`: Handles pausing active timer and freezing state.
- `xp-adapter.js`: Extracts calculation output to easily connect to a database later.
- `level-manager.js`: Formula-based growth curve. Will seamlessly handle Levels 21–400.

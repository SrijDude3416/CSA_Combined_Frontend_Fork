// GameControl.js
import GameEnv from "./GameEnv.js";
import GameLevelWater from "./GameLevelWater.js";
import GameLevelDesert from "./GameLevelDesert.js";
import MiniLevel from "./MiniLevel.js";
import Stats from "./Stats.js";
import Prompt from "./Prompt.js";

class GameControl {
    constructor() {
        this.currentPass = 0;
        this.currentLevelIndex = 0;
        this.levelClasses = [];
        this.path = '';
        this.savedLevelState = null;
        this.currentLevel = null;
    }

    start(path) {
        GameEnv.create();
        this.levelClasses = [GameLevelDesert, GameLevelWater];
        this.currentLevelIndex = 0;
        this.path = path;
        this.addExitKeyListener();
        this.loadLevel();
        const stats = new Stats();
        stats.fetchStats();
        const promptInstance = new Prompt();
        promptInstance.initializePrompt();
    }

    loadLevel() {
        GameEnv.continueLevel = true;
        GameEnv.gameObjects = [];
        this.currentPass = 0;
        const LevelClass = this.levelClasses[this.currentLevelIndex];
        const levelInstance = new LevelClass(this.path);
        this.loadLevelObjects(levelInstance);
    }

    loadLevelObjects(gameInstance) {
        for (let object of gameInstance.objects) {
            if (!object.data) object.data = {};
            new object.class(object.data);
        }
        this.gameLoop();
    }

    gameLoop() {
        if (!GameEnv.continueLevel) {
            this.handleLevelEnd();
            return;
        }
        GameEnv.clear();
        for (let object of GameEnv.gameObjects) {
            object.update();
        }
        this.handleLevelStart();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    handleLevelStart() {
        if (this.currentLevelIndex === 0 && this.currentPass === 10) {
            alert("Start Level.");
        }
        this.currentPass++;
    }

    handleLevelEnd() {
        if (this.currentLevelIndex < this.levelClasses.length - 1) {
            alert("Level ended.");
        } else {
            alert("Game over. All levels completed.");
        }
        for (let index = GameEnv.gameObjects.length - 1; index >= 0; index--) {
            GameEnv.gameObjects[index].destroy();
        }
        this.currentLevelIndex++;
        this.loadLevel();
    }

    handleMiniLevelEnd() {
        // Clear game objects from the mini-level
        for (let index = GameEnv.gameObjects.length - 1; index >= 0; index--) {
            GameEnv.gameObjects[index].destroy();
        }

        // Reset game state if necessary
        GameEnv.continueLevel = true;
        GameEnv.gameObjects = [];
    
        // Check if we're still in a mini-level state or need to go to the next main level
        if (this.savedLevelState) {
            // We're in the saved state after the mini-level, so continue to the next main level
            this.currentLevelIndex = this.savedLevelState.currentLevelIndex + 1; // Move to the next level
            this.path = this.savedLevelState.path;
            this.savedLevelState = null; // Clear the saved state after returning from the mini-level
            this.loadLevel();
        } else {
            // In case we reach this point without a saved state, go to the next main level
            alert("Mini Level ended.");
            this.currentLevelIndex++; // Go to the next main level
            this.loadLevel();
        }
    }

    resize() {
        GameEnv.resize();
        for (let object of GameEnv.gameObjects) {
            object.resize();
        }
    }

    addExitKeyListener() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                GameEnv.continueLevel = false;
            }
        });
    }

    startMiniLevel(npcInstance) {
        // Save the current level state
        this.savedLevelState = {
            currentLevelIndex: this.currentLevelIndex,
            path: this.path
        };

        // Destroy current game objects
        for (let index = GameEnv.gameObjects.length - 1; index >= 0; index--) {
            GameEnv.gameObjects[index].destroy();
        }
        GameEnv.gameObjects = [];

        // Create and load mini-level
        const miniLevelInstance = new MiniLevel(this.path, () => {
            this.handleMiniLevelEnd();
        });

        this.currentLevel = miniLevelInstance;
        this.loadLevelObjects(miniLevelInstance);
    }

}

const gameControlInstance = new GameControl();
export default gameControlInstance;

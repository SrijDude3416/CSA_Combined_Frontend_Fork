import Player1 from './Player1.js';

class PlayerChillGuy extends Player1 {
    constructor(data = null) {
        super(data);
    }

    /**
     * gameLoop: Watch for Player collision events 
     */
    handleCollisionStart() {
        this.handleCollisionEvent("Octocat");
        this.handleCollisionEvent("Tux");
    }

    handleCollisionAction() {
        // Empty method to be overridden by subclasses if needed
    }
    
}

export default PlayerChillGuy;
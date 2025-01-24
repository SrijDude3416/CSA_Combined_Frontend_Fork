import GameEnv from "./GameEnv.js";
import GameObject from "./GameObject.js";
import { showCustomPrompt, submitAnswer, isPromptCurrentlyOpen } from "./PromptHandler.js";

class Npc extends GameObject {
    constructor(data = null, quiz="", questions=[]) {
        super(data);
        this.quiz = quiz;
        this.questions = questions
        this.alertTimeout = null;
    }

    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     * 
     * @override
     */
    update() {
        this.draw();
    }

    /**
     * Handles keydown events for proximity interaction.
     * This method is triggered when a key is pressed and checks for proximity interactions.
     * 
     * @param {Object} event - The event object containing the key that was pressed.
     * @param {string} event.key - The key that was pressed.
     * 
     * Keys handled:
     * - 'e': Proximity interaction for Player 1
     * - 'u': Proximity interaction for Player 2
     * 
     * This method calls checkProximityToNPC() if either 'e' or 'u' is pressed.
     */
    handleKeyDown({ key }) {

        if (isPromptCurrentlyOpen() && (key === 'e' || key === 'u')) {
            return; 
        }

        switch (key) {
            case 'e': // Player 1 
            case 'u': // Player 2 
                this.checkProximityToNPC();
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * It also clears the alert timeout if the 'e' or 'u' key is released.
     * 
     * @param {Object} event - The keyup event object.
     * @param {string} event.key - The key that was released.
     */
    handleKeyUp({ key }) {
        // Check if the released key is 'e' or 'u'
        if (key === 'e' || key === 'u') {
            // Clear the alert timeout to cancel the alert
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    /**
     * Custom alert mechanism to handle responses.
     * 
     * @param {string} message - The message to be displayed in the alert.
     */
    handleResponse(message) {
        if (isPromptCurrentlyOpen()) {
            return; 
        }
        
        // Clear any existing alert timeout
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }
        
        // Set a new alert timeout
        this.alertTimeout = setTimeout(() => {
            alert(message);
        }, 0);
    }
    
     // Get a random question from the array
     getRandomQuestion() {
        let randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    }

    /**
     * Check for proximity of objects.
     * This method checks if any players are within a certain distance of the NPC.
     * If players are within the specified distance, their names are collected and a response is generated.
     */
    checkProximityToNPC() {
        // Filter all Player objects from the game environment
        const players = GameEnv.gameObjects.filter(obj => obj instanceof GameObject);
        const npc = this;
        const names = [];


        if (players.length > 0 && npc) {
            players.forEach(player => {
                // The Euclidean distance between two points in a 2D space
                var distance = Math.sqrt(
                    Math.pow(player.position.x - npc.position.x, 2) + Math.pow(player.position.y - npc.position.y, 2)
                );
                // The distance is less than 100 pixels
                if (player != npc && distance <= 500) {
                    names.push(player.spriteData.id);
                }
            });
            // Join all player names inside the proximity
            if (names.length > 0) {
                this.handleResponse(`Hello, ${names.join(', ')}`);
                const quiz = this.quiz;
                const question = this.getRandomQuestion();
                showCustomPrompt(`${quiz}\n${question}`, async (input) => {
                    const score = await submitAnswer(input, 1);
                    this.handleResponse(`${score} points have been added to your balance.`);
                });
            }
        }
    }
}

export default Npc;

import GameEnv from "./GameEnv.js";
import Character from "./Character.js";
import Prompt from "./Prompt.js";
import NpcTracker from "./NpcTracker.js"; // Import the NPC Tracker

class Npc extends Character {
    constructor(data = null) {
        super(data);
        this.npcName = data?.id || "Unknown NPC"; // Assign NPC name
        this.quiz = data?.quiz?.title; // Quiz title
        this.questions = Prompt.shuffleArray(data?.quiz?.questions || []); // Shuffle questions
        this.currentQuestionIndex = 0; // Start from the first question
        this.alertTimeout = null;
        this.bindEventListeners();
    }

    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     */
    update() {
        this.draw();
    }

    /**
     * Bind key event listeners for proximity interaction.
     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Handle keydown events for interaction.
     * @param {Object} event - The keydown event.
     */
    handleKeyDown({ key }) {
        if (key === 'e' || key === 'u') { // Player interaction
            this.shareQuizQuestion();
            NpcTracker.addNpc(this.npcName); // Add this specific NPC
        }
    }

    /**
     * Handle keyup events to stop player actions.
     * @param {Object} event - The keyup event.
     */
    handleKeyUp({ key }) {
        if (key === 'e' || key === 'u') {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
            }
        }
    }

    /**
     * Get the next question in the shuffled array.
     * @returns {string} - The next quiz question.
     */
    getNextQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.questions.length; // Cycle through questions
        return question;
    }

    /**
     * Handle proximity interaction and share a quiz question.
     */
    shareQuizQuestion() {
        const players = GameEnv.gameObjects.filter(obj => obj.state.collisionEvents.includes(this.spriteData.id));
        const hasQuestions = this.questions.length > 0;
        if (players.length > 0 && hasQuestions) {
            players.forEach(player => {
                if (!Prompt.isOpen) {
                    // Assign this NPC as the current NPC in the Prompt system
                    Prompt.currentNpc = this;
                    // Open the Prompt panel with this NPC's details
                    Prompt.openPromptPanel(this);
                }
            });
        }
    }
}

export default Npc;

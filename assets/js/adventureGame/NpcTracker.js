class NpcTracker {
    constructor() {
        this.encounteredNpcs = []; // Store NPC names in order
        this.trackerContainer = this.createTrackerContainer();
    }

    // Create the UI element for displaying NPCs
    createTrackerContainer() {
        const container = document.createElement("div");
        container.id = "npc-tracker";
        container.style.position = "absolute";
        container.style.top = "100px"; // Positioned below the time display
        container.style.left = "10px";
        container.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        container.style.color = "white";
        container.style.padding = "10px";
        container.style.borderRadius = "5px";
        container.style.fontSize = "14px";
        document.body.appendChild(container);
        return container;
    }

    // Add only one NPC at a time in order
    addNpc(npcName) {
        if (!this.encounteredNpcs.includes(npcName)) {
            this.encounteredNpcs.push(npcName);
            this.updateTrackerDisplay();
        }
    }

    // Refresh the displayed list of NPCs
    updateTrackerDisplay() {
        this.trackerContainer.innerHTML = `<strong>NPCs Encountered:</strong><br>` + 
            this.encounteredNpcs.join("<br>");
    }
}

// Create an instance of NpcTracker and attach it to the window for global use
window.NpcTracker = new NpcTracker();
export default window.NpcTracker;

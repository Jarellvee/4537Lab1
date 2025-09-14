/**
 * This class manages the Reader class, and handles page navigation and auto-refreshing of notes.
 */
class ReaderManager {

    constructor() {
        this.reader = new Reader();
        this.returnBtn = document.getElementById("returnButton");
        this.initButtons();
        this.startAutoRefresh();
    }

    /**
     * Initialize button event listener for page navigation.
     */
    initButtons() {
        this.returnBtn.addEventListener("click", () => {
            location.href = UI_CONFIG["INDEX"];
        });
    }

    /**
     * Refreshes the notes display every 2 seconds by calling the loadNotes method of the Reader.
     * Similar to autoSave in writer.js 
     */
    startAutoRefresh() {
        setInterval(() => {
            this.reader.loadNotes();
        }, 2000);// 2000 equates to 2 secs
    }

}

/**
 * The Reader class is responsible for fetching and displaying notes from localStorage.
 * In contrast to the Writer class, it does not allow editing or deletion of notes.
 */
class Reader {

    constructor() {
        this.container = document.getElementById("notesContainer");
        this.lastFetched = document.getElementById("lastFetched");
    }

    /**
     * Fetches notes from localStorage to display them on the UI.
     * These fetched notes are available when the page is reloaded and they are not open for editing (since divs are used instead of textareas).
     */
    loadNotes() {
        // AI was used to help find a way to parsing the string back to an array of objects, similar to the saveNotes in writer.js
        const notesData = JSON.parse(localStorage.getItem("notes") || "[]"); //  fetch notes from local storage or empty arr if none
        this.displayNotes(notesData);
        const now = new Date();
        if (this.lastFetched) {
            this.lastFetched.textContent = `${UI_CONFIG["LASTFETCHED"]} ${now.toLocaleTimeString()}`;
        }

    }

    /**
     * Displays the fetched notes on the UI.
     */
    displayNotes(notes) {
        this.container.innerHTML = ""; // Clear 
        notes.forEach(note => {
            const noteDiv = document.createElement("div"); // used divs to prevent editing and utilize bootstrap classes for styling
            noteDiv.classList.add("card", "my-3", "p-3", "mx-auto", "border-dark", "shadow", "note-card");

            const cardBody = document.createElement("div");// card body to hold the note message
            cardBody.classList.add("card-body");
            cardBody.textContent = note.message;

            noteDiv.appendChild(cardBody);
            this.container.appendChild(noteDiv); // add to the container
        });
    }
}


/**
 * Load the manager class once DOM loads.
 */
window.addEventListener('DOMContentLoaded', () => {
    new ReaderManager();
});

/**
 * AI use Acknowledgment: Ai has been used to help fix syntax errors  and suggest some methods for efficiency.
 * However, the core logic and structure of the code have been developed by me
 */
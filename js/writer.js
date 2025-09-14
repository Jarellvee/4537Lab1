/**
 * The Writer Manager class is responsible for instantiating the Writer class.
 * It handles the navigation buttons, and the auto save functionality.
 */
class WriterManager {

    constructor() {
        this.writer = new Writer();
        this.addBtn = document.getElementById("addNote");
        this.returnBtn = document.getElementById("returnButton");
        this.initButtons();
        this.autoSaveNote();
    }

    /**
     * Initialize button event listeners for page navigation and note creation. 
     */
    initButtons() {
        this.addBtn.addEventListener("click", () => {
            this.writer.addNote();
        });
        this.returnBtn.addEventListener("click", () => {
            location.href = UI_CONFIG["INDEX"];
            console.log("return back to index");
        });
    }

    /**
     * Saves notes to localStorage every 2 seconds.
     * This method uses setInterval to keep recalling the saveNotes method of the Writer.
     */
    autoSaveNote() {
        setInterval(() => {
            this.writer.saveNotes();
        }, 2000); // 2000 equates to 2 secs
    }


}


/**
 * The Writer class manages the creation, deletion, and storage of notes.
 * It interacts with the Note class to create note elements then handles it by saving, deleting and loading notes from localStorage.
 */
class Writer {
    constructor() {
        this.notes = [];
        this.lastSaved = document.getElementById("lastSaved");
        this.nextId = 1; // to assign unique IDs to notes, it is used for deletion.
        this.loadNotes();
    }

    /**
     *  Adds a new note to the note array  and renders  it.
     * The rendering is called from the note class, with this class appending a delete button to the 
     * creation of the text area.
     * @param {string} msg - The initial message for the note, the default is an empty string.
     */
    addNote(msg = "") {
        const note = new Note(this.nextId++, msg);
        note.renderTextArea();

        const delBtn = document.createElement("button");
        delBtn.textContent = UI_CONFIG["DELETE"];
        delBtn.classList.add("btn", "btn-danger", "btn-sm", "mt-2", "id",); // Ai helped with class list instead of.className with +=  since it makes it more manageable
        delBtn.addEventListener("click", () => {
            this.deleteNote(note);
        });

        const deleteContainer = document.createElement("div");
        deleteContainer.classList.add("d-flex", "justify-content-end", "mt-2");
        deleteContainer.appendChild(delBtn);
        note.textArea.parentElement.appendChild(deleteContainer);

        this.notes.push(note); // add to notes array
        this.saveNotes(); // this is for instant save in local storage, ui won't show until next auto save.

    }

    /**
     * Deletes a note from the note array and the DOM
     * Once deleted, it calls the saveNotes method to update localStorage.
     * @param {Note} note - The note instance to delete.
     */
    deleteNote(note) {
        this.notes = this.notes.filter(n => n.id !== note.id);
        note.remove();
        this.saveNotes(); // similarly, instant save after deletion in local storage
    }

    /**
     * Saves the current notes to localStorage and update its timestamp on the UI.
     */
    saveNotes() {
        //AI suggested to use map and JSON.stringify for efficient storage rather than using a foreach loop and do it manually
        const noteData = this.notes.map(note => note.getNoteData()); // the map works by calling the getNoteData method of each note instance to return an object with id and message only

        localStorage.setItem("notes", JSON.stringify(noteData)); // use stringify to convert to string for storage because the passed value is an array of objects
        if (this.lastSaved) { // if it exists, update the last saved time to now
            const now = new Date();
            this.lastSaved.textContent = `${UI_CONFIG["LASTSAVED"]} ${now.toLocaleTimeString()}`; // convert to local timezone
        }

    }

    /**
     * Fetches notes from localStorage to display them on the UI.
     * These fetched notes are available when the page is reloaded and they are open for editing (since textareas are used).
     * It also updates the nextId to ensure unique IDs for new notes.
     */
    loadNotes() {
        const notes = JSON.parse(localStorage.getItem("notes") || "[]");
        notes.forEach(n => this.addNote(n.message));
        if (notes.length > 0) {
            this.nextId = Math.max(...notes.map(n => n.id)) + 1; // ensure unique IDs  by getting the highest current ID and adding 1
        }
    }
}

/**
 * Load the manager class once DOM loads.
 */
window.addEventListener('DOMContentLoaded', () => {
    new WriterManager();
});

/**
 * AI use Acknowledgment: Ai has been used to help fix syntax errors  and suggest some methods for efficiency.
 * However, the core logic and structure of the code have been developed by me
 */
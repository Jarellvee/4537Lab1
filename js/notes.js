/**
 * Note class represents a single note with its properties and methods to manage its UI representation.
* Contains separated methods for creating the note container, text area and displaying them for better readability and maintenance.
 */
class Note {
    constructor(id, message) {
        this.id = id;
        this.message = message;
        this.container = document.getElementById("notesContainer");
        this.element = null;
        this.textArea = null;
        this.delBtn = null;
    }

    /**
     * Creates the container div for the note.
     * @returns {HTMLElement} - The container div for the note.
     */
    createNoteContainer() {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.id = this.id; // set the id for identification during deletion
        this.element = noteDiv;
        return noteDiv;
    }

    /**
     * Creates the text area for the note.
     * Text area is used to allow for editing of the note content.
     * @returns {HTMLElement} - The text area element for the note.
     */
    createTextArea() {
        const textArea = document.createElement("textarea");
        textArea.value = this.message;
        textArea.addEventListener("input", () => {
            this.message = textArea.value; // update the message whenever input changes
        });
        this.textArea = textArea;
        return textArea;
    }

    /**
     * Displays the note on the UI by creating its container and text area, then appending them to the main container.
     */
    renderTextArea() {
        const noteDiv = this.createNoteContainer();
        noteDiv.classList.add("card", "m-3", "p-3", "shadow-md",); // for styling using bootstrap classes

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "p-2", "bg-light");

        const textArea = this.createTextArea();
        textArea.classList.add("form-control");
        cardBody.appendChild(textArea); // append textarea to card body

        noteDiv.appendChild(cardBody);// then the card body to the note div
        this.container.appendChild(noteDiv); // and finally the note div to the main container div
    }

    /**
     * Accessor method to get the note data in a structured format for storage.
     * Contains the message and id only, excluding the DOM elements.
     * @returns {Object} - The structured note data containing id and message.
     */
    getNoteData() {
        return ({ id: this.id, message: this.message });
    }

    /**
     * Removes the note element from the DOM.
     * Thsi method is called when a note is deleted, ensuring that the UI is updated whenever a note is removed.
     */
    remove() {
        if (this.element) {
            this.element.remove();
        }
    }
}

import moment from "moment";
import { getNotes, sortNotes } from "./notes";
import { getFilter } from "./filter";

// Render notes
const renderNote = () => {
    const noteFilter = getFilter();
    const notes = sortNotes(noteFilter.sortBy);
    const displayNotes = notes.filter((note) => note.title.toLowerCase().includes(noteFilter.searchText.toLowerCase()));
    const noteDiv = document.querySelector("#notes");
    noteDiv.innerHTML = "";
    if (displayNotes.length > 0) {
        displayNotes.forEach((note) => {
            noteDiv.appendChild(addNoteDOM(note));
        });
    } else {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "Empty notes";
        emptyMsg.classList.add("empty-message");
        noteDiv.appendChild(emptyMsg);
    }
};

// Add DOM structures to the notes
const addNoteDOM = (note) => {
    const newNoteDiv = document.createElement("a");
    const newNote = document.createElement("p");
    const noteStatus = document.createElement("p");

    // Note title
    if (note.title.length > 0) {
        newNote.textContent = note.title;
    } else {
        newNote.textContent = "Unset title";
    }
    newNote.classList.add("list-item__title");
    newNoteDiv.appendChild(newNote);

    // Note status
    noteStatus.textContent = generateLastEdited(note.updatedAt);
    noteStatus.classList.add("list-item__subtitle");
    newNoteDiv.appendChild(noteStatus);

    // Note link
    newNoteDiv.classList.add("list-item");
    newNoteDiv.setAttribute("href", `/edit.html#${note.id}`);
    return newNoteDiv;
};

// Generate last edited time string
const generateLastEdited = (timeStamp) => `Last Edited at ${moment(timeStamp).fromNow()}`;

// Initialize edited page
const initializeEditedPage = (noteId) => {
    const noteTitle = document.querySelector("#note-title");
    const noteBody = document.querySelector("#note-body");
    const lastEdited = document.querySelector("#last-edited");

    const notes = getNotes();
    const noteItem = notes.find((note) => note.id === noteId);
    if (!noteItem) {
        location.assign("/index.html");
    }
    noteTitle.value = noteItem.title;
    noteBody.value = noteItem.body;
    lastEdited.textContent = generateLastEdited(noteItem.updatedAt);
};

export {renderNote, addNoteDOM, generateLastEdited, initializeEditedPage};


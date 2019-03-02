import uuidv4 from "uuid/v4";
import moment from "moment";

let notes = [];

// Load notes if notes in the local storage
const loadNotes = () => {
    const notesStorage = localStorage.getItem("notes");
    try {
        return notesStorage ? JSON.parse(notesStorage) : [];
    } catch (e) {
        return [];
    }
};

// Get notes
const getNotes = () => notes;

// Save notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
};

// Create a note
const createNote = () => {
    const createTime = moment().valueOf();
    const newId = uuidv4();
    const newNote = {
        id: newId,
        title: "",
        body: "",
        createAt: createTime,
        updatedAt: createTime
    };
    notes.push(newNote);
    saveNotes(notes);
    return newId;
};

// Remove a note
const removeNote = (noteId) => {
    const targetIndex = notes.findIndex((note) => note.id === noteId);
    if (targetIndex > -1) {
        notes.splice(targetIndex, 1);
        saveNotes(notes);
    }
};

// Sort notes
const sortNotes = (sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createAt > b.createAt) {
                return -1;
            } else if (a.createAt < b.createAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byAlpha") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        console.log(sortBy);
    }
}

// Update Notes
const updateNote = (id, updates) => {
    const target = notes.find((note) => note.id === id);
    if (!target) {
        return;
    }
    if (typeof updates.title === "string") {
        target.title = updates.title;
        target.updatedAt = moment().valueOf();
    }
    if (typeof updates.body === "string") {
        target.body = updates.body;
        target.updatedAt = moment().valueOf();
    }
    saveNotes(notes);
    return target;
};

notes = loadNotes();

export {getNotes, createNote, removeNote, sortNotes, updateNote};
import { updateNote, removeNote } from "./notes";
import { initializeEditedPage, generateLastEdited } from "./view";

const noteId = location.hash.substring(1);
const noteTitle = document.querySelector("#note-title");
const noteBody = document.querySelector("#note-body");
const removeBtn = document.querySelector("#remove-btn");
const lastEdited = document.querySelector("#last-edited");

initializeEditedPage(noteId);

noteTitle.addEventListener("change", (e) => {
    const noteItem = updateNote(noteId, {
        title: e.target.value
    });
    lastEdited.textContent = generateLastEdited(noteItem.updatedAt);
});

noteBody.addEventListener("change", (e) => {
    const noteItem = updateNote(noteId, {
        body: e.target.value
    });
    lastEdited.textContent = generateLastEdited(noteItem.updatedAt);
});

removeBtn.addEventListener("click", () => {
    removeNote(noteId);
    location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        initializeEditedPage(noteId);
    }
});
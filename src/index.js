import {createNote} from "./notes";
import {updateFilter} from "./filter";
import {renderNote} from "./view";

renderNote();

const inputField = document.querySelector("#search-note");
inputField.addEventListener("input", (e) => {
    updateFilter({
        searchText: e.target.value
    });
    renderNote();
});

document.querySelector("#sort-by").addEventListener("change", (e) => {
    updateFilter({
        sortBy: e.target.value
    });
    renderNote();
});

const form = document.querySelector("#add-notes");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newNoteID = createNote();
    location.assign(`/edit.html#${newNoteID}`);
});

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        renderNote();
    }
});
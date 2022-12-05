export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete }) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list">
                    
                </div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="Enter a title...">
                <textarea class="notes__body">Write something</textarea>
            </div>
        `;

        const addBtn = document.querySelector('.notes__add');
        const noteTitle = document.querySelector('.notes__title');
        const noteBody = document.querySelector('.notes__body');

        addBtn.addEventListener('click', () => {
            this.onNoteAdd();
        });
    }
}
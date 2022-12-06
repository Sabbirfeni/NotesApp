// import NotesAPI from '../js/NotesAPI.js';
// import NotesView from './NotesView.js';


class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem('noteApp-notes') || '[]');
        
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }  

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const exiting = notes.find(note => note.id === noteToSave.id);

        if(exiting) {
            exiting.title = noteToSave.title;
            exiting.body = noteToSave.body;
            exiting.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem('noteApp-notes', JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem('noteApp-notes', JSON.stringify(newNotes));
    }
}


class NotesView {
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

        [noteTitle, noteBody].forEach((inputField) => {
            inputField.addEventListener('blur', () => {
                const updatedTitle = noteTitle.value.trim();
                const updatedBody = noteBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            })
        })


        console.log(this._createListItemHTML(34, 'title', 'body', new Date()))
    }


    _createListItemHTML(id, title, body, updated) {
        return `
        <div class="notes__list-item notes__list-item--selected" data-note-id='${id}'>
            <div class="notes__small-title">${title} <span class='delete__button' data-note-id='${id}'>X</span></div>
            
            <div class="notes__small-body">
                ${body.substr(0, 60)}
                ${body.length > 60 ? '...' : ''}
            </div>
            <div class="notes__small-updated">
                ${updated.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}
            </div>
        </div>
        `
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector('.notes__list');
       
        // Empty list
        notesListContainer.innerHTML = '';

        for(const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));
            notesListContainer.insertAdjacentHTML('beforeend', html);
        }

        notesListContainer.querySelectorAll('.notes__list-item').forEach(noteListItem => {
            noteListItem.addEventListener('click', () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            })
        })

        this.root.querySelectorAll('.delete__button').forEach(dlt_btn => {
            dlt_btn.addEventListener('click', () => {

                const check = confirm('Are you sure?');
                if(check) {
                    this.onNoteDelete(dlt_btn.dataset.noteId);
                }
                
            })
        })
    }

    updateActiveNote(note) {
        this.root.querySelector('.notes__title').value = note.title;
        this.root.querySelector('.notes__body').value = note.body;

        this.root.querySelectorAll('notes__list-item')
    }
}





let app = document.getElementById('app');

const view = new NotesView(app, {
    onNoteSelect(id) {
        // console.log('Selected id is: ' + id)
    },
    onNoteAdd() {
        console.log('add a note')
    },
    onNoteEdit(newTitle, newBody) {
        console.log(newTitle, newBody);
    },
    onNoteDelete(id) {
        console.log('Delete note : ' + id)
    }
})

// NotesAPI.saveNote({
//     title: 'sabbir',
//     body: 'another body',
// })

const notes = NotesAPI.getAllNotes();

view.updateNoteList(notes);
view.updateActiveNote(notes[0]);
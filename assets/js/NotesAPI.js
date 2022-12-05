export default class NotesAPI {
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

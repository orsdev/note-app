const fs = require('fs');

const getAllNotes = () => {
 const notes = loadNotes();

 if (notes.length > 0) {
  notes.forEach(note => console.log(note.title));
 } else {
  console.log('Empty note');
 }
};

const addNote = (title, body) => {
 const notes = loadNotes();

 const duplicateNotes = isNoteAlreadyAdded(notes, title);

 if (duplicateNotes.length == 0) {
  notes.push({
   title: title,
   body: body
  });

  saveNotes(notes);
 } else {
  console.log('Note already added')
 }

};

const isNoteAlreadyAdded = (notes, title) => {
 return notes.filter((note) => {
  return note.title == title;
 })
};

const removeNote = (title) => {
 const notes = loadNotes();

 const filterNote = notes.filter((note) => {
  return note.title !== title;
 });

 if (notes.length > filterNote.length) {
  console.log('Note removed')
  saveNotes(filterNote);
 } else {
  console.log('Note not found');
 }
}

const readNote = (title) => {
 const notes = loadNotes();

 const filter = notes.find((note) => {
  return note.title == title;
 });

 if (filter) {
  console.log('Title: ' + filter.title);
  console.log('Body: ' + filter.body);
 } else {
  console.log('Note not found!');
 }
}

const saveNotes = (notes) => {
 const dataJSON = JSON.stringify(notes);
 fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {

 try {
  const dataBuffer = fs.readFileSync('notes.json');
  const dataJSON = dataBuffer.toString();
  return JSON.parse(dataJSON);
 } catch (e) {
  return [];
 }
};

module.exports = {
 addNote: addNote,
 removeNote: removeNote,
 getAllNotes: getAllNotes,
 readNote: readNote
};
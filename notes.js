const fs = require('fs');
const chalk = require('chalk');

const NOTES_JSON = 'notes.json';

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicatedNotes = notes.filter((note) =>
    note.title.toLowerCase() === title.toLowerCase());

  if (duplicatedNotes.length === 0) {
    const note = {
      title: title,
      body: body
    };
    notes.push(note);
    saveNotes(notes);
    console.log(chalk.green('Added new note: ', JSON.stringify(note)));
  } else {
    console.log(chalk.yellow('Title already exists: ', title));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const noteIndex = notes.findIndex((note) =>
    note.title.toLowerCase() === title.toLowerCase());

  if (noteIndex === -1) {
    console.log(chalk.yellow(`Title doesn't exist`));
  } else {
    notes.splice(noteIndex, 1);
    saveNotes(notes);
    console.log(chalk.green('Note successfully removed'));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteIndex = notes.findIndex((note) =>
    note.title.toLowerCase() === title.toLowerCase());

  if (noteIndex === -1) {
    console.log(chalk.yellow(`Title doesn't exist`));
  } else {
    const note = notes[noteIndex];
    console.log(JSON.stringify(note, null, 2));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log(chalk.yellow('There are currently no notes'));
  } else {
    console.log(JSON.stringify(notes, null, 2));
  }
};

const loadNotes = () => {
  try {
    const notesJSON = fs.readFileSync(NOTES_JSON).toString();
    const notes = JSON.parse(notesJSON);
    return notes;
  } catch (e) {
    // console.log(chalk.red(e.message));
    return [];
  }
};

const saveNotes = (notes) => {
  try {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync(NOTES_JSON, notesJSON);
  } catch (e) {
    // console.log(chalk.red(e.message));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
  listNotes: listNotes
};
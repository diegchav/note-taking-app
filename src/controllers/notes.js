const fs = require('fs');
const chalk = require('chalk');

const Note = require('../models/note');

const addNote = async (title, body) => {
  const note = Note({
    title,
    body
  });
  await note.save();
  console.log(chalk.green('Added new note: ', JSON.stringify(note)));
};

const removeNote = (title) => {
  Note
    .deleteOne({ title })
    .then(res => {
      if (res.deletedCount == 0) {
        console.log(chalk.yellow(`Title doesn't exist`));
      } else {
        console.log(chalk.green('Successfully delete note'));
      }
    })
    .catch(err => {
      console.log(chalk.red('Error removing note: ', err.message));
    });
};

const readNote = async (title) => {
  await Note
    .find({ title })
    .then(docs => {
      if (docs.length === 0) {
        console.log(chalk.yellow(`Title doesn't exist`));
      } else {
        const note = docs[0];
        console.log(JSON.stringify(note, null, 2));
      }
    })
    .catch(err => {
      console.log(chalk.red('Error loading note: ', err.message));
    });
};

const listNotes = async () => {
  await Note
    .find()
    .then(docs => {
      if (docs.length === 0) {
        console.log(chalk.yellow('There are currently no notes'));
      } else {
        console.log(JSON.stringify(docs, null, 2));
      }   
    })
    .catch(err => {
      console.log(chalk.red('Error loading notes: ', err.message));
    });
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
  listNotes: listNotes
};
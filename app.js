const yargs = require('yargs');
const dotenv = require('dotenv');
const chalk = require('chalk');
const readline = require('readline');

// Load env variables.
dotenv.config();

// Connect to db.
const db = require('./src/db/database');

// Configure readline.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

// Configure yargs.
yargs.exitProcess(false); // Don't exit when help command is entered.

yargs.showHelpOnFail(false, `Enter 'help' for available options`);

yargs.fail((msg, err, yargs) => {
  if (err) {
    console.log(chalk.red('Error: ', err));
    rl.close();
  }
});

// Load controller.
const notes = require('./src/controllers/notes');

// add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Text of the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title of the note to remove',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Title of the note to read',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

// list command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    notes.listNotes();
  }
});

// help command.
yargs.command({
  command: 'help',
  describe: 'Show this help',
  handler() {
    yargs.help();
  }
});

// exit command.
yargs.command({
  command: 'exit',
  describe: 'Exit the application',
  handler() {
    // Close db connection.
    db.close(() => {
      console.log(chalk.yellow('Closing DB connection'));
    });

    // Close readline stream.
    rl.close();
  }
})

rl.prompt();

rl.on('line', (input) => {
  yargs.parse(input.split(' '));
  rl.prompt();
});

rl.on('close', () => {
  process.exit(0);
});

rl.on('SIGINT', () => {
  rl.close();
});
const mongoose = require('mongoose');
const chalk = require('chalk');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000
};

mongoose.connect(url, options);
const db = mongoose.connection;

db
.then(() => {
  console.log(chalk.green('Successfully connected to DB'));
})
.catch((err) => {
  console.log(chalk.red('DB connection error: ', err.message));
});

const gracefulExit = () => {
  db.close(() => {
    console.log(chalk.yellow('Closing DB connection due to app termination'));
    process.exit(0);
  });
};

process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);

module.exports = db;
const express = require("express")
const mongoose = require("mongoose");
const cfg = require("./server/config");

const app = express();
const logServerBootup = () => {
    console.info(
        '--------------------------[ Starting server ]--------------------------'
    );
    console.info('Application root path: ' + __dirname);
};

const setupDataStorage = async () => {
    // If error is encountered, log error and exit program
    if (!cfg.dbUri || !cfg.dbCredentials) {
      console.error('No db connections and credentials found!');
      process.exit(0);
    } else {
      // Connect to db, if `config.dbUri` and `config.dbOptions` are available
      const dbConnection = await require('./server/core/mongoose')();
      // Return database connection and redis connection
      return { dbConnection };
    }
};


const setupApp = dbConnection => {
    // Otherwise, setup express app
    const app = require('./server/core/express')(dbConnection);

    app.listen(cfg.port,'0.0.0.0', () => {
      console.info('Application started!');
      console.info('----------------------------------------------');
      console.info(
        'Environment:\t' +
          process.env.NODE_ENV || 'development'
      );
      console.info('Port:\t' + cfg.port);
      console.info('----------------------------------------------');
      console.log('');
    });
  };

logServerBootup();

setupDataStorage()
  .then(({ dbConnection }) => {
    // Only setup app, once connected to the database
    setupApp(dbConnection);
    console.log("ready to set up the app")
  })
  .catch(error => {
    // If error is encountered, log error and exit program
    console.error(error);
    process.exit(0);
  });

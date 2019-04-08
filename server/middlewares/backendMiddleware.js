const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

module.exports = function backendMiddleware(app) {
  dotenv.config();
  app.use(bodyParser.json());
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  let uri = null;
  if (process.env.NODE_ENV !== 'production') {
    uri = 'mongodb://localhost:27017/jogging_track';
  } else {
    uri = process.env.MONGO_PROD;
  }
  mongoose.connect(
    uri,
    options,
    err => {
      if (err) {
        // console.log('some errors have occured in connecting to mongodb');
      }
    },
  );
};

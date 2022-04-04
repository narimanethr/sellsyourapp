const mongoose =require('mongoose');
const dbURI = require('../config/db.config.js').DB_URI;
const dbConnection =mongoose.createConnection(dbURI,{
  useUnifiedTopology:true,
});
module.exports=dbConnection;
dbConnection.on('connected',
  () => console.log(`db.controller.js : connected to ${dbURI}`)
);
dbConnection.on('disconnected',
  () => console.log(`db.controller.js : disconnected from ${dbURI}`)
);
dbConnection.on('error',
  err => console.log(`db.controller.js : connection error ${err} `)
);
const shutdown = (msg, callback) => {
  dbConnection.close(
    () => {
      console.log(` Mongoose shutdown : ${msg}`);
      callback();
    }
  );
}
const readline = require('readline');
if (process.platform === 'win32') {
    readline
      .createInterface({
        input: process.stdin,
        output: process.stdout
      })
      .on('SIGINT', function() {
        process.emit('SIGINT');
      })
  };

// application killed (ctrl+c)
process.on('SIGINT', () => shutdown('application ends', () => process.exit(0)) );
// process killed (POSIX)
process.on('SIGTERM', () =>  shutdown('SIGTERM received', () => process.exit(0)) );

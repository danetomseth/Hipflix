var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var spawn = require('child_process').spawn;
var Promise = require('bluebird');
var path = require('path');
var DATABASE_URI = require(path.join(__dirname, './server/env')).DATABASE_URI;
var dumpArgs = ['fsg-app', '--eval', "db.dropDatabase()"]
var dumpDB = spawn('/usr/local/bin/mongo', dumpArgs);

// var mongoose = require('mongoose');
/* Connect to the DB */
mongoose.connect(DATABASE_URI,function(){
    mongoose.connection.once('open', ()=> {

        mongoose.connection.db.dropDatabase(function (err) {
          console.log('db dropped');
          var args = ['--db', 'fsg-app', 'fsg-app']
          var mongorestore = spawn('/usr/local/bin/mongorestore', args);

          mongorestore.stdout.on('data', function (data) {
              console.log('stdout: ' + data);
          });
          mongorestore.stderr.on('data', function (data) {
              console.log('stderr: ' + data);
          });
          mongorestore.on('exit', function (code) {
            console.log('mongorestore exited with code ' + code);
          });
          //process.exit(0);
      })

    })
    /* Drop the DB */
});


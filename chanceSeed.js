var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/fsg-app').connection;
var mchance = require('mchance')(db);

db.model('User', new mongoose.Schema({
    name: {
        type: String,
        seed: mchance.name
    },
  email: {
    type: String,
    seed: mchance.email
  }
}));


db.seed({
  User: 1,    // generate 1 user
  Comment: 2  // generate 2 comments
})
.then(function (dbCache) {
  // dbCache contains ref names and *saved* documents
  console.log('---seeded users---');
  console.log(dbCache.User);
  console.log('---seeded comments---');
  console.log(dbCache.Comment);
});

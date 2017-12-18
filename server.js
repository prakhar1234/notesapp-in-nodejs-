var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('note', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

var items = sequelize.define('items',{ id:{
      type: Sequelize.BIGINT(100),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    note: Sequelize.STRING});

    var note=[];




var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/notes', function(req, res) {

  sequelize.query("select id,note,createdAt,updatedAt from items order by  id asc").spread((results, metadata) => {});
  var not1=[];
  items.all({attribute:['note']}).then(notes=> {
    for(i=0;i<notes.length;i++){
      if(notes[i].dataValues&&notes[i].dataValues.note){
        not1.push(notes[i].dataValues);}}
        note=not1;
        not1=[];
    console.log(note);
  });
    res.send({ notes: note });
});

app.post('/notes', function(req, res) {

  sequelize.query("select id,note,createdAt,updatedAt from items order by  id asc").spread((results, metadata) => {});

    var note2 = req.body.name;

    sequelize.sync().then(function () {
      items.create({
        id:(note.length+1),
         note:note2
      }).then(function (data) {

        note.push(data.dataValues);

    }).catch(function(err){console.log(err);})
    });

});

app.put('/notes/:id', function(req, res) {


    var id = req.params.id;
    var newnote = req.body.note;

    items.update({
          note:newnote
        }, {
          where: {
            id:id
          }
        }
      );





});

app.delete('/notes/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
sequelize.query("select id,note,createdAt,updatedAt from items order by  id asc").spread((results, metadata) => {
    sequelize.sync().then(function () {
    items.create({ id: id }).then(task => {
  return task.destroy({ force: true });
}).catch(function(err){console.log(err);})
});
});});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});

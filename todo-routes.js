var express = require("express");
var app = module.exports = express.Router();
var Todo = require("./todo");

app.get("/todos", function(req, res){
  Todo.find({}, function(err, allTodo){
      if (err){
        res.json({"success":false, "msg": "Error while fetching from MongoDB database", "err": err});
      } else {
        res.status(200).send({"success":true, "msg": "Successfully fetched from database", "result": allTodo});
      }
  });
});

app.post('/todos',function(req, res){
  if (!req.body.text) {
    return res.status(400).send({"success": false, "msg": "You need to send the text of todo."});
  } else {
    var newTodo = new Todo({
      text: req.body.text
    });
    newTodo.save(function(err){
      if (err) {
          console.log({"some error": err});
          return res.json({
            "success": false,
            "msg": "Error while creating Todo",
            "error" : err
          });
      } else {
        res.status(200).send({"success": true, "msg": "Data successfully entered in the database."});
      }
    });
  }
});

app.delete("/todos/:todoId",function(req, res){
    var lectionId = req.params.todoId;
    if (!lectionId || lectionId === "") {
      return res.json({"success": false, "msg": "No todoId received!","error" : err});
    }
    Todo.findByIdAndRemove(lectionId, function(err, removed){
      if (err) {
        return res.json({"succes": false, "msg": "Some error occured while deleting the object from database.", "error": err});
      }
      res.status(200).json({
        "success": true,
        "msg": "Data successfully deleted from the MongoDB database"
      });
    });
})

const express = require("express");
const router = express.Router();
var ObjectId = require("mongodb").ObjectID;

const { ToDo } = require("../models/todo.js");

router.get("/", (req, res) => {
  ToDo.find((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error in Retriving ToDo's: " + JSON.stringify(err, undefined, 2)
      );
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  ToDo.findById(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log(
        "Error in Retriving ToDo: " + JSON.stringify(err, undefined, 2)
      );
  });
});

router.post("/", (req, res) => {
  const todo = new ToDo({
    title: req.body.title,
    desc: req.body.desc,
    whenToDo: req.body.whenToDo,
    done: req.body.done,
  });
  todo.save((err, doc) => {
    if (!err) res.send(doc);
    else
      console.log("Error in ToDo Save: " + JSON.stringify(err, undefined, 2));
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  const todo = {
    title: req.body.title,
    desc: req.body.desc,
    whenToDo: req.body.whenToDo,
    done: req.body.done,
  };
  ToDo.findByIdAndUpdate(
    req.params.id,
    { $set: todo },
    { new: true },
    (err, doc) => {
      if (!err) res.send(doc);
      else
        console.log(
          "Error in ToDo Update: " + JSON.stringify(err, undefined, 2)
        );
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  ToDo.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else
      console.log("Error in ToDo Delete: " + JSON.stringify(err, undefined, 2));
  });
});

module.exports = router;

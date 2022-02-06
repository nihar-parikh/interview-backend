import express from "express";
import Task from "../models/tasks.js";
const router = express.Router();

//creating task
router.post("/", async (req, res) => {
  const task = new Task(req.body);

  try {
    const addTask = await task.save();
    res.status(200).send(addTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get a task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get all tasks
router.get("/", async (req, res) => {
  try {
    const task = await Task.find();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

//updating task
router.put("/updatetask/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedTask = {};

    if (title) {
      updatedTask.title = title;
    }
    if (description) {
      updatedTask.description = description;
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updatedTask, {
      new: true,
    });
    if (!task) {
      return res.status(404).send(error);
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

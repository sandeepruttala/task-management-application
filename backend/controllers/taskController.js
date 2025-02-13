const Task = require("../models/Task");
const express = require("express");

// create
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json({ message: "Task Created Successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// read
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update
const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, {
      title,
      description,
      status,
      updated_at: Date.now(),
    });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// mark as completed
const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, {
      status: "completed",
      updated_at: Date.now(),
    });
    res.status(200).json({ message: "Marked as completed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask,
};

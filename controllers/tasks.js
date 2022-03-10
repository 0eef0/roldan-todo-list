const Task = require('../models/task');

const getAllTasks = async (req,res) => {
    try {
        const task = await Task.find({});
        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const updateTask = async (req, res) => {
    try {
        const { name, completed } = req.query;
        const task = await Task.findByIdAndUpdate(req.params.id, {name: name, completed: completed });
        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const deleteTask = async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.status(201).json({task});
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
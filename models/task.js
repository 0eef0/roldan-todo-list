const mongoose = require('mongoose');

// so what is schema
// const TaskSchema = new mongoose.Schema({
//     name: String,
//     completed: Boolean
// });

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Must Provide The Task'],
        trim: true,
        maxlength: [20, 'Name Cannot Be More Than 20 Characters'],
    },
    dueDate: {
        type: String,
        required: [true, 'Must Provide The Due Date'],
    },
    dueTime: {
        type: String,
        required: [true, 'Must Provide The Due Time'],
    },
    subject: {
        type: String,
        required: [true, 'Must Provide The Subject'],
    }
});

// this is basic validation not advanced
module.exports = mongoose.model('Task', TaskSchema);


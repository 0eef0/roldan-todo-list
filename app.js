const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(express.json());
app.use('/api/v1/tasks', tasks);
app.use(express.static('./public'));

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listening on port ${port}`));
    } catch (err) {
        console.error(err);
    }
};
start();
const express = require('express');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter')

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter)

module.exports = app;
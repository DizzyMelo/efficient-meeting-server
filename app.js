const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const meetingRouter = require('./routes/meetingRouter');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/meetings', meetingRouter);

app.use(globalErrorHandler);

module.exports = app;
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const meetingRouter = require('./routes/meetingRouter');
const notificationRouter = require('./routes/notificationRouter');
const reviewRouter = require('./routes/reviewRouter');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/meetings', meetingRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use(globalErrorHandler);

module.exports = app;
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const app = require('./app');

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const server = app.listen(port, () => {
  console.log('server running');
});
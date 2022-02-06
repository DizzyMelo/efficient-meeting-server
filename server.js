const mongoose = require('mongoose');

const app = require('./app');

const port = 3000;

mongoose
  .connect("mongodb+srv://daniel-melo:Dado201094@cluster0.wtuon.mongodb.net/efficient-meeting?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const server = app.listen(port, () => {
  console.log('server running');
});
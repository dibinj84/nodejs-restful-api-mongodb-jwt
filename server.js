const app = require('./app');
const dotenv = require('dotenv').config();
const port = process.env.PORT;


const server = app.listen(port, () => {
  console.log('Express server listening to port ' + port);
})

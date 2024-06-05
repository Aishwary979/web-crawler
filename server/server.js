const AppWrapper = require('./app');
const port = process.env.PORT || 3000;

const app = new AppWrapper();
app.start(port);

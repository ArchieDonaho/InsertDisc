// express/sql
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

// sessions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// handlebars
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

//use environment variables created in the .env file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// create sessions object
const sess = {
  secret: process.env.SECRET,
  cookie: {
    // session expires after 10 minutes of inactivity
    // TODO: uncomment this once we have a working login/logout/session functionality
    // expires: 600000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// set up sessions
app.use(session(sess));

// create handlebars object
const hbs = exphbs.create({ helpers });

// set handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// link our routes
app.use(routes);

// connect to database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
});

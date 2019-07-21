/* jshint esnext: true */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const homePageData = require('./config/home.json');
const dataPickingPageData = require('./config/dataPicking.json');
// homePageData.css = '/public/css/home.css';

app.set('view engine', 'pug');
app.set('views', path.resolve('./views'));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  // console.log(homePageData);
  res.render('home', homePageData);
});

app.get('/projects/datapicking', (req, res) => {
  res.render('dataPicking', dataPickingPageData);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}!`);
});

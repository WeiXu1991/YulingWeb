/* jshint esnext: true */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const projectList = new Map([['datepicking', 'datePicking'], ['planning', 'planning']]);

const homePageData = require('./config/home.json');
const dataPickingPageData = require('./config/dataPicking.json');
// homePageData.css = '/public/css/home.css';

app.set('view engine', 'pug');
app.set('views', path.resolve('./views'));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  homePageData.currentYear = (new Date()).getFullYear();
  res.render('home', homePageData);
});

app.get('/projects/:projectName', (req, res) => {
  const projectName = req.params.projectName.toLowerCase();
  if (!projectList.has(projectName)) {
    const errorMessage = `No project found with project name: ${req.params.projectName}, please double check and try again!`;
    res.status(404).render('errorPage', {
      errorMessage,
      css: '/public/css/error.css',
    });
    return;
  }
  dataPickingPageData.currentYear = (new Date()).getFullYear();
  res.render(projectList.get(projectName), dataPickingPageData);
});

app.get('*', (req, res) => {
  const errorMessage = `No page found with ${req.originalUrl}.`;
  res.status(404).render('errorPage', {
    errorMessage,
    css: '/public/css/error.css',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}!`);
});

/* jshint esnext: true */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const projectList = new Map([['datepicking', 'datePicking'], ['planning', 'planning'], ['sfccdm320', 'sfccdm320']]);

const homePageData = require('./config/home.json');
const dataPickingPageData = require('./config/dataPicking.json');
const planningPageData = require('./config/planning.json');
const sfccPageData = require('./config/sfccdm320.json');
// homePageData.css = '/public/css/home.css';

app.set('view engine', 'pug');
app.set('views', path.resolve('./views'));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  homePageData.currentYear = (new Date()).getFullYear();
  res.render('home', homePageData);
});

app.get('/projects/datepicking', (req, res) => {
  // const projectName = req.params.projectName.toLowerCase();
  // if (!projectList.has(projectName)) {
  //   const errorMessage = `No project found with project name: ${req.params.projectName}, please double check and try again!`;
  //   res.status(404).render('errorPage', {
  //     errorMessage,
  //     css: '/public/css/error.css',
  //   });
  //   return;
  // }
  dataPickingPageData.currentYear = (new Date()).getFullYear();
  dataPickingPageData.projects = [];
  dataPickingPageData.projects.push(homePageData.projects[0]);
  dataPickingPageData.projects.push(homePageData.projects[2]);
  res.render('datePicking', dataPickingPageData);
});

app.get('/projects/planning', (req, res) => {
  planningPageData.currentYear = (new Date()).getFullYear();
  planningPageData.projects = [];
  planningPageData.projects.push(homePageData.projects[1]);
  planningPageData.projects.push(homePageData.projects[2]);
  res.render('planning', planningPageData);
});

app.get('/projects/SFCCDM320', (req, res) => {
  sfccPageData.currentYear = (new Date()).getFullYear();
  sfccPageData.projects = [];
  sfccPageData.projects.push(homePageData.projects[0]);
  sfccPageData.projects.push(homePageData.projects[1]);
  res.render('sfccdm320', sfccPageData);
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

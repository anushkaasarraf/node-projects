const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly} = require('./middlewares/auth')


const {connectToDatabase} = require('./connection');
const URL = require('./models/url');


const urlRoutes = require('./routes/url');
const staticRoutes = require('./routes/static');
const userRoute = require('./routes/user');

const app = express();
const port = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));   //To support the form data as well
app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use('/url', restrictToLoggedInUserOnly, urlRoutes);
app.use('/', staticRoutes);
app.use("/user", userRoute);

// app.get('/test', async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render('home',{
//     urls: allUrls
//   });
// });


app.get('/url/:shortid', async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate({ shortId }, {$push:{
    visitHistory: { timestamp : Date.now() }
  }})

res.redirect(entry.redirectUrl)
})

connectToDatabase('mongodb://127.0.0.1:27017/short_url')
.then(() => {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');

const app = express();

//
// CONNECT DB
//
const dbURI =
  'mongodb+srv://mechell:2060@cluster0-6uq9l.mongodb.net/node?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log(`DB Connected to ${res.connection.host}`);
    app.listen(3000, () => console.log('SV Listening on port 3000.'));
  })
  .catch((err) => console.error(err.message));
//
// VIEW ENGINE
//
app.set('view engine', 'ejs'); //app.set('views', 'my-views')
//
// LISTEN
//
// app.listen(3000);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
//
// LOG MIDDLEWARE
//
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = '/';
  next();
});

//
// SANDBOX ROUTES FOR MONGOOSE & MONGO
//
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog',
//   });

//   blog
//     .save()
//     .then((result) => res.send(result))
//     .catch((err) => console.error(err));
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.error(err));
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('5efb7e310e8291aab60f8221')
//     .then((result) => res.send(result))
//     .catch((err) => console.error(err));
// });

//
// ROUTES
//
app.get('/', (req, res) => {
  res.redirect('/blogs');
  // const blogs = [
  //   {
  //     title: 'Yoshi finds eggs',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  //   {
  //     title: 'Mario finds stars',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  //   {
  //     title: 'How to defeat bowser',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  // ];
  // res.send('<p>Home page</p>');
  // res.sendFile('/views/index.html', { root: __dirname });
  // res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  // res.sendFile(__dirname + '/views/about.html');
  res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => console.error(err));
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then(() => res.redirect('/blogs'))
    .catch((err) => console.error(err));
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result });
    })
    .catch((err) => console.error(err));
});

//
// 404
//
app.use((req, res) => {
  // res.status(404).sendFile(__dirname + '/views/404.html');
  res.status(404).render('404', { title: '404' });
});

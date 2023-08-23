const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts');
const port = 3000

const path = require('path');
const fs = require('fs');


const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage })




app.use(express.urlencoded({extended:true}));
//Static file and view engine
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static('public'));
app.use(expressLayout);
app.set('layout','./layout/main');
app.set('view engine','ejs')


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/view', (req, res) => {
  fs.readdir(path.join(__dirname, 'upload'), (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render('view', { files });
  });
});


app.post('/upload', upload.single('file_name'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    res.redirect("/");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
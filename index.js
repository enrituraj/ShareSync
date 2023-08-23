const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts');
const port = 3000
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
app.use(express.static('public'));
app.use(expressLayout);
app.set('layout','./layout/main');
app.set('view engine','ejs')


app.get('/', (req, res) => {
    res.render('index')
})


app.post('/upload', upload.single('file_name'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    res.redirect("/");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
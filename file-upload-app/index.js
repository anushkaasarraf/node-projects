const path = require("path");
const express = require("express");
const multer = require("multer");

const port = 8000;
const app = express();
const upload = multer({ dest: 'uploads/' })                              //Middleware

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    return cb(null,`${Date.now()} - ${file.originalname}`)
  }
});

const uploads = multer({ storage })

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended : false}));

app.get('/', (req, res) =>{
    return res.render("home");
})

app.post('/upload', upload.single("profileImg"), (req,res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})


app.listen(port, () => {
    console.log("Successfull");
})
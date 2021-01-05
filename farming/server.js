
var express =   require("express");
var multer  =   require('multer');
var app     =   express();
var fs = require('fs');
const path = require('path'); 

static = require('serve-static')

app.use('/public', express.static(path.join(__dirname+ '/public')));
app.use('/image', express.static(path.join(__dirname + '/public/image')));
app.get('/',function(req,res){
      res.sendFile(__dirname + "/public/homepage.html");
      
});

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    fs.mkdir('./uploads', function(err) {
        if(err) {
            console.log(err.stack)
        } else {
            callback(null, './uploads');
        }
    })
  },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
});

app.post('/file/upload',function(req,res){
    var upload = multer({ storage : storage}).single('userFile');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3500,function(){
    console.log("Working on port 3500");
});
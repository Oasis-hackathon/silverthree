<<<<<<< HEAD

var express =   require("express");
var multer  =   require('multer');
var app     =   express();
var fs = require('fs');
const path = require('path'); 

static = require('serve-static')
=======
var express =   require("express");
var multer  =   require('multer');
var app  =   express();
var fs = require('fs');
const { PythonShell } = require('python-shell');
>>>>>>> 40803961462477275a24a06d93f25a48da5d53be

app.use('/public', express.static(path.join(__dirname+ '/public')));
app.use('/image', express.static(path.join(__dirname + '/public/image')));
app.get('/',function(req,res){
<<<<<<< HEAD
      res.sendFile(__dirname + "/public/homepage.html");
      
});

=======
      //res.sendFile("/home/hyeonji/silverthree/homepage.html");
      res.sendFile(__dirname+"/index.html");
});


>>>>>>> 40803961462477275a24a06d93f25a48da5d53be
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
<<<<<<< HEAD
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
=======
  //filename: function (req, file, callback) {
  //  callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  //}
>>>>>>> 40803961462477275a24a06d93f25a48da5d53be
});

app.post('/file/upload',function(req,res){
    var upload = multer({ storage : storage}).single('userFile');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        console.log("Asdf");
        PythonShell.run('/home/hyeonji/silverthree/src/detection.py', null, (err, results) => {
        if (err) throw err;
        console.log(`results: ${results}`);
        res.end(`${results}`);
    });

});
});


app.listen(3500,function(){
    console.log("Working on port 3500");
});

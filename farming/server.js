var express =   require("express");
var multer  =   require('multer');
var app  =   express();
var fs = require('fs');
const { PythonShell } = require('python-shell');
static = require('serve-static')
const path = require('path');

app.use('/public', express.static(path.join(__dirname+ '/public')));
app.use('/image', express.static(path.join(__dirname + '/public/image')));
app.get('/',function(req,res){
      res.sendFile(__dirname + "/public/homepage.html");
});

app.get('/api/result', function(req, res){
    console.log("detecting...");
    PythonShell.run('/home/hyeonji/silverthree/src/detection.py', null, (err, results) => {
    if (err) throw err;
    console.log(`results: ${results}`);
    res.send(`${results}`);
});
})

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

});

app.get('/file/upload',function(req,res){
    var upload = multer({ storage : storage}).single('userFile');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
     });
});


app.listen(3500,function(){
    console.log("Working on port 3500");
});

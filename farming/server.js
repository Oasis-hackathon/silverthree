
// const express = require('express') //서버 모듈불러오기
// const fs = require('fs')
// const http = require('http')
// const app = express()  //express 객체 생성
// const server = http.createServer(app); 
// const PORT = process.env.PORT || 3200;
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const router = express.Router();
// const uploader = multer({dest:'uploads/'})

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(express.static('src'))
// app.use(function(req, res, next){
//     console.log('첫 번째 미들웨어에서 요청을 처리함.');

//     res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
//     res.end('<h1>Express 서버에서 응답한 결과입니다.</h1>');
// })

// app.get('/', (req, res) => {
//   fs.readFile('./src/index.html', (error, data)=>{
//     if(error){console.log(error);}
//     else{
//         res.writeHead(200, { 'Content-Type': 'text/html'});
//         res.end(data);
//   //res.send('index page')
//     }
// });
// });

// // app.get('/download/:id', function(req,res){
// //     var filename = req.params.id;
// //     filepath = __dirname + "/files/" + filename;
// //     res.download(filepath);
// // })

// app.post('/upload',uploader.single('은방울'),(req, res,next)=>{
//   fs.readFile(req.files.uploadFile.path, function(error, data){
//     var filePath = __dirname + "\\files\\" + req.files.uploadFile.name;
//     fs.writeFile(filePath, data, function(error){
//       if (error){
//         throw err;
//       } else {
//         res.redirect("back")
//       }
//     })
//   })

// })

// app.listen(3200, () => { //포트번호 설정
//   console.log('3200 port open')
// })
///////////////////////////////////////////////////
var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var fs = require('fs');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
  }).single('userFile');

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
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
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
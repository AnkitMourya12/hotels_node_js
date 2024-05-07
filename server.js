
//console.log("sever run");

// function add(a,b){
//     return a+b;
// }
// var add=(a,b)=>{return a+b;}

// var n=add(2,7);
// console.log(n);


// function callback(){
//     console.log("callback");
// }

// const add=function(a,b,callback){
//     var res=a+b;
//     console.log(res);
//     callback();
// }

// add(5,6,callback);


// OS and FS Library

// var fs=require('fs');
// var os=require('os');
// var user=os.userInfo();
// console.log(user);
// fs.appendFile('greeting.txt','Hi ' + user.username + '!\n', ()=>{
//     console.log("file is created");
// });




// Import file

// var notes=require('./node.js');
// var _ = require('lodash');
// var age=notes.age;
// console.log(age);
// //lodash
// var data=["person","person",1,2,1,"age","name",'2'];
// var filter = _.uniq(data);
// console.log(filter);

// json to object convert

// const jsonString= '{"name":"Ankit Mourya","age":"30"}';
// const j_to_obj=JSON.parse(jsonString);
// console.log( j_to_obj.name);

const express = require('express')
const app = express();
const db= require('./db');
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json());

// const Person=require('./models/person');
// const MenuItem=require('./models/MenuItem');
app.get('/', function (req, res) {
  res.send('Welcome to my swiggy... How i can help u')
})
const PORT=process.env.PORT||3001;


// import person-router files
const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

// import manu-routes  files
const manueRoutes=require('./routes/manueRoutes');
app.use('/manueitem',manueRoutes);

app.listen(PORT, ()=>{
  console.log("listening on port 3001");
})



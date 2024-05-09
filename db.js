const mongoose=require('mongoose');
require('dotenv').config();
const mongoURL=process.env.MONGODB_URL_LOCAL;  // replace dbname of your db name
//const mongoURL=process.env.DB_URL;
//setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
} );

//get the default connection 
//mongoose maintains a default connection object represention the mongodb connection
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("connected to mongodb server");
})
db.on('error',(err)=>{
    console.error('connected error:',err);
})
db.on('disconnected',()=>{
    console.log(" mongodb disconnected");
})
module.exports = db;
const mongoose=require('mongoose');
const mongoURL='mongodb://127.0.0.1:27017/hotels'  // replace dbname of your db name

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
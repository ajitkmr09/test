const http= require('http');   
const mongoose=require('mongoose'); 
const app=require('../app');
const port=process.env.PORT||3000;
const server=http.createServer(app);
let conString="mongodb://localhost:27017/coading_test_wipro";
mongoose.connect(conString, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true});
mongoose.Promise=global.Promise;
server.listen(port);
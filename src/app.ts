import * as express from "express";
import * as bodyParser from "body-parser";
import * as middleware from "./controller/task";
import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

(<any>mongoose).Promise = bluebird;
mongoose.connect('mongodb://localhost:27017/task').then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  // process.exit();
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('build'));

app.post('/task/create', middleware.insertTask);
app.post('/task/finish', middleware.finishTask);
app.post('/task/redo',middleware.redoTask);
app.post('/task/getAllTask', middleware.getAllTask);
app.post('/task/delete', middleware.deleteTask);
app.get('/index', function(req,res){
  res.json({data: true})
  console.log("hahah")
})


app.listen(3000);
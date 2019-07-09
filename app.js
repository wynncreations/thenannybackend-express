const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json({
    type: "application/json"
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));


dotenv.config();

// some logger stuff
app.use(logger("dev"));

// db

mongoose.connect(
    process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);


const port = process.env.PORT || 8001;

//routes go here
const auth = require('./routes/auth');


//plug the routes in.
app.use('/auth', auth);

app.get('/', (req, res, next) => {
    res.send("Welcome to The Nanny Backend Server");
});

//app.get('/inventory',(req,res,next)=>{
//    res.send("Inventory");
//});
// create the server
app.listen(port, () => {
    console.log(`Server online, please proceed to port ${port} for rapid assimilation.`);
});
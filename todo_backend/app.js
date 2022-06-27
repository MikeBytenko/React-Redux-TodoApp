const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const notesRouter = require('./api/notes')

//initialize
const app = express();
dotenv.config();
connectDB();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
const PORT = process.env.PORT || 5000;


// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers',  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
  });

  app.use('/todos', notesRouter)
  app.get("/about", (req, res) => res.send("read about me"));

//run
app.listen(PORT, () => console.log(`app has been started on port ${process.env.PORT}`));

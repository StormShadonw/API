const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//MIDDLEWARES

app.use("/",bodyParser.json());
app.use("/",cors());

//ROUTES
const usersRouter = require("./Routes/users");
const appsRouter = require("./Routes/apps");
const rolesRouter = require("./Routes/roles");
app.get("/",(req,res) => {
    res.send("we are in home listening in port 2020");
});
app.use("/users",usersRouter);
app.use("/apps",appsRouter);
app.use("/roles",rolesRouter);

//CONNECT TO DB
mongoose.connect("mongodb://161.35.11.127:27017/generador_licencias_db",{useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connect to DB");
});

//LISTENING IN WICH PORT
app.listen(2020);
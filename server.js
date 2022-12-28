const express = require('express')
const app = express() 
const mongoose =require('mongoose')

mongoose.connect("mongodb+srv://walid:walid@cluster0.lunspyi.mongodb.net/?retryWrites=true&w=majority",()=>console.log("database is connected"))

app.use(express.json());
app.use("/user", require("./routes/userRoutes"));

app.listen(5000,(err)=> err ? console.log(err) : console.log("server is running"))

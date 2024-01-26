const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const authRouters = require("./Routers/authRoutes")
const PollRoutes = require("./Routers/PollingRoutes")
const mongoose = require("mongoose")
const cors = require("cors")
const requireAuth = require("./MiddleWares/authMiddleware")
const cookies = require("cookie-parser")

app.use(cookies())
app.use(cors())
async function serverTurnON() {    
    await mongoose.connect("mongodb://localhost:27017/Hackathon");
    app.listen(3000,function (){  console.log("Server is activated")})
}
serverTurnON()

app.use(express.json())
app.use(authRouters)   // **************Individually working fine****************
app.use("/Poll",requireAuth,PollRoutes)

app.use(function (err,req,res,next) {
    res.json({msg : "Something is up with the server"})
    console.log(err)
})
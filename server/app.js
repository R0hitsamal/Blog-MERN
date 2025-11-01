const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routes/userRoute");
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/blogging")
.then(()=> console.log("DB Connected Succesfully"))
.catch(()=> console.log("DB Connection ERROR"))

app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to GITAVERS")
})

app.listen(5000,()=>{
    console.log("App is listining to port no. 5000")
})
const express = require("express")
//const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const blogRoute = require("./routes/blog")

require("dotenv").config()

const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log("connect to database"))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cors())
//app.use(morgan("dev"))


//route
app.use("/api",blogRoute)

const port = process.env.PORT || 3000
app.listen(port,()=>
    console.log(`start server in port ${port}`)
)
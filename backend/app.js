const express = require("express")
const mongoose = require("mongoose");
const router = require('./routes/user-routes.js')
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(cookieParser())
app.use(express.json())
app.use('/api',router)
mongoose.connect("mongodb://127.0.0.1:27017/mern-auth")
.then(()=>{
	app.listen(5000);
	console.log("Database is connected . Listening to Localhost :5000")
})
.catch((err)=>{
	console.log(err)
})
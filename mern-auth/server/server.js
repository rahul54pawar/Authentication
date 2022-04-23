const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
// connect to db
mongoose.connect(process.env.DATABASE)
.then(()=>console.log('DB Connected'))
.catch(err=>console.log('DB CONNECTION ERROR: ', err))

//import routes
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user.js')

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use(cors()); //allows all origin 
if((process.env.NODE_ENV = 'development')){
	app.use(cors({origin:`http://localhost:3000`}));
} // allows only this domain 

//middleware
app.use('/api',authRoutes)
app.use('/api',userRoutes)


const port = process.env.PORT || 8000 
app.listen(port,()=>{
	console.log(`Api is running on port ${port}-${process.env.NODE_ENV}`)
})
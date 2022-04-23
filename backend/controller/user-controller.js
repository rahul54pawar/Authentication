const User = require('../model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "MyKEY" //put in env file


exports.signup = async (req,res,next) =>{
	const {name,email,password} = req.body
	let existingUser;
	try{
		existingUser = await User.findOne({email})
	}catch(err){
		console.log(err)
	}

	if(existingUser){
		return res.status(400).json({message:"User already exists! Try Login"})
	}
	const hashedPasswor = bcrypt.hashSync(password,bcrypt.genSaltSync(10))


	const user = new User({name,email,password:hashedPasswor})
	try{
		await user.save();
	}catch(err){
		console.log(err)
	}
	return res.status(201).json({message:user})
}

exports.login = async (req,res,next) =>{
	const {email,password} = req.body
	let existingUser;
	try{
		existingUser =await User.findOne({email})
	}catch(err){
		console.log(err)
	}

	if(!existingUser){
		return res.status(400).json({message:"User not found signup please"})
	}
	const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)

	if(!isPasswordCorrect){
		return res.status(400).json({message:"Invalid Email password/Email"})
	}
	const token = jwt.sign({id:existingUser._id},JWT_SECRET_KEY,{ expiresIn: '35s' })

	if (req.cookies[`${existingUser._id}`]){
		req.cookies[`${existingUser._id}`] = ""
	}
	res.cookie(String(existingUser._id),token,{
		
		expires:new Date(Date.now()+1000*30),
		httpPnly:true,
		sameSite:'lax'
	})
	return res.status(200).json({message:"Successfully Logged In",user:existingUser,token})
}

exports.verifytoken = (req,res,next) =>{
 	const cookies = req.headers.cookie;
 	const token= cookies.split("=")[1];
 	console.log(token)
 	if(!token){
 		res.status(400).json({message:"No Token found"})
 	}
 	jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
 		if(err){
 			return res.status(400).json({message:"Invalid token"})
 		}
 		console.log(user.id)
 		req.id = user.id
 	})
 	next()
  }

exports.getUser = async(req,res,next)=>{
 	const userId=req.id
 	let user;
 	try{
 		user = await User.findById({_id:userId},"-password");
 	}catch(err){
 		return new Error(err)
 	}
 	if(!user){
 		return res.status(404).json({message:"user Not Found"})
 	}
 	return res.status(200).json({user})
 }

exports.refreshToken = (req,res,next)=>{
	const cookies = req.headers.cookie
	const prevToken = cookies.split("=")[1]
	if(!prevToken){
		return res.status(400).json({message:"Couldn't find token"})
	}
	jwt.verify(String(prevToken),JWT_SECRET_KEY,(err,user)=>{
		if(err){
			console.log(err)
			return res.status(403).json({message:"Authentication failed"})
		}
		res.clearCookie(`${user.id}`);
		req.cookies[`${user.id}`] = "";


		const token = jwt.sign({id:user.id},JWT_SECRET_KEY,{ expiresIn: '35s' })

	    res.cookie(String(user.id),token,{expires:new Date(Date.now()+1000*30),httpPnly:true,sameSite:'lax'})

	    req.id = user.id
	    next()

	})
}


exports.logout = (req,res,next)=>{
	const cookies = req.headers.cookie
	const prevToken = cookies.split("=")[1]
	if(!prevToken){
		return res.status(400).json({message:"Couldn't find token"})
	}
		jwt.verify(String(prevToken),JWT_SECRET_KEY,(err,user)=>{
		if(err){
			console.log(err)
			return res.status(403).json({message:"Authentication failed"})
		}
		res.clearCookie(`${user.id}`);
		req.cookies[`${user.id}`] = "";
		return res.status(200).json({message:"Successfully Logged Out"})
	})
}
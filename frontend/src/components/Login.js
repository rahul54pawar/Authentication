import React,{useState} from "react";
import {Box,form,TextField,Button,Typography} from '@mui/material'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {authActions} from "../store";

import {useSelector,useDispatch} from "react-redux"

const Login = ()=>{
	const dispatch = useDispatch()
	const history = useNavigate()
	const [input,setInput] = useState({
		email:"",
		password:""
	})
	const handleChange = (e) =>{
		setInput(prev=>({
			...prev,
			[e.target.name]:e.target.value
		}))
	}
	const sendRequest = async (e) => {
		const res = await axios.post('http://localhost:5000/api/login',{
			email:input.email,
			password:input.password
		}).catch(err=>console.log(err))
		const data = await res.data;
		return data 
	}
	const handleSubmit = (e) =>{
		e.preventDefault();
		sendRequest().then(()=>{dispatch(authActions.login())}).then(()=>history("/user"))
	}
	return (
		<>
		<div>
		
			<form onSubmit={handleSubmit}>
				<Box 
				marginLeft="auto" 
				marginRight="auto" 
				width={300} 
				display="flex" 
				flexDirection={"column"}
				justifyContent="center"
				alignItems="center"
				>
				  <Typography variant="h2">Login</Typography>
				  
				  
				  <TextField name="email" onChange={handleChange} type="email" value={input.email} variant="outlined" placeholder="Email" margin="normal"/>
				  <TextField name="password" onChange={handleChange} value={input.password} variant="outlined" placeholder="Password" margin="normal"/>
				  <Button variant="contained" type="submit">Login</Button>
				 </Box>
			</form>
		</div>
		</>
	)
}

export default Login;
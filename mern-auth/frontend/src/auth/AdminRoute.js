import React,{Component} from 'react';
import {Route,Navigate} from 'react-router-dom';
import {isAuth} from './helpers'

const AdminRoute = ({children}) =>{
	
	return (
		
		
			isAuth()&&isAuth().role==='admin'?children:<Navigate to="/signin"/>
		
		)
}

export default AdminRoute
import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios';
import {authenticate,isAuth} from './helpers'

const Google = ({informParent = f => f }) =>{

	const responseGoogle = (response) =>{
		console.log(response)
		axios({
			method:"POST",
			url:'/api/google-login',
			data:{
				idToken:response.tokenId
			} 
		})
		.then(response=>{
			console.log('GOOGLE SIGNIN SUCCESS',response)
			//inform parent component
			informParent(response)
		})
		.catch((error)=>{
			console.log('GOOGLE SIGNIN ERROR',error.response)
		})
	}

		return (
			<div className="pb-3">
				 <GoogleLogin
					    clientId="45363825607-qs6r5t9nortdea2lr19d67v02inchv82.apps.googleusercontent.com"
					    render={renderProps => (
					      <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-danger btn-lg btn-block"><i className="fab fa-google pr-2"></i>Login With Google</button>
					    )}
					    buttonText="Login"
					    onSuccess={responseGoogle}
					    onFailure={responseGoogle}
					    cookiePolicy={'single_host_origin'}
  />,

			</div>
			)
}

export default Google
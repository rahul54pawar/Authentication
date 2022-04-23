import React, { useState,useEffect } from 'react'
import { Link, Navigate,useNavigate ,useParams  } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios';
import {authenticate,isAuth} from './helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import jwt_decode from "jwt-decode";

const Reset = () => {
     let webtoken = useParams().token
    let navigate = useNavigate()
    const [values,setValues] = useState({
        name:"",
        token:'',
        newPassword:'',
        buttonText:'Reset password'
    });

    useEffect(()=>
    {
         let token = webtoken
         let {name} = jwt_decode(token)
         if(token){
            setValues({...values,name,token})
        }
    },[])

    const {name,token,newPassword,buttonText} = values;

    const handleChange = event=> {
        setValues({...values,newPassword:event.target.value })
    }

    const clickSubmit = event =>{
            
            event.preventDefault()
            setValues({...values,buttonText:'Submitting'})
            axios({
                method:"PUT",
                url:`/api/reset-password`,
                data:{newPassword,resetPasswordLink:token}
            })
            .then(response=>{
                console.log('RESET PASSWORD SUCCESS',response)
                toast.success(response.data.message)
                 setValues({...values,buttonText:'Done'})
                 navigate('/signin')
            })
            .catch(error=>{
                console.log('RESET PASSWORD SUCCESS',error.response.data)
                 toast.error(error.response.data.error);
                setValues({...values,buttonText:'Reset Password'});
               
            })
    }

    const passwordResetForm = () =>(
        <form>
            
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange} value={newPassword} type="password" className='form-control' placeholder="Type new  password" required/>
            </div>

            <div className='form-group'>
                <button className='btn btn-primary' onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )
    return (
        <>
            <Layout>  
            <div >
                <ToastContainer />
               
                <h1 className='p-5 text-center'>Hey {name},type your new password</h1>
                {passwordResetForm()}
            </div>
            </Layout>
        </>
    )

}

export default Reset
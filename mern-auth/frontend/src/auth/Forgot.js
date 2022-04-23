import React, { useState } from 'react'
import { Link, Navigate,useNavigate   } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios';
import {authenticate,isAuth} from './helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'


const Forgot = () => {
   
    let navigate = useNavigate()
    const [values,setValues] = useState({
        email:"",
         buttonText:'Request password reset link'
    });

    const {email,buttonText} = values;

    const handleChange = name => event=> {
        setValues({...values,[name]:event.target.value })
    }

    const clickSubmit = event =>{
            
            event.preventDefault()
            setValues({...values,buttonText:'Submitting'})
            axios({
                method:"PUT",
                url:`/api/forgot-password`,
                data:{email}
            })
            .then(response=>{
                console.log('FORGOT PASSWORD SUCCESS',response)
                toast.success(response.data.message)
                 setValues({...values,buttonText:'Requested'})
            })
            .catch(error=>{
                console.log('FORGOT PASSWORD SUCCESS',error.response.data)
                 toast.error(error.response.data.error);
                setValues({...values,buttonText:'Request password reset link'});
               
            })
    }

    const passwordforgotForm = () =>(
        <form>
            
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className='form-control' />
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
                
                <h1 className='p-5 text-center'>Forgot password</h1>
                {passwordforgotForm()}
            </div>
            </Layout>
        </>
    )

}

export default Forgot
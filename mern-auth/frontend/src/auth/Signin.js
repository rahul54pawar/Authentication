import React, { useState } from 'react'
import { Link, Navigate,useNavigate   } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios';
import {authenticate,isAuth} from './helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Google from './Google'
import Facebook from './Facebook'

const Signin = () => {
   
    let navigate = useNavigate()
    const [values,setValues] = useState({
        email:"",
        password:"",
        buttonText:'Submit'
    });

    const {email,password,buttonText} = values;

    const handleChange = name => event=> {
        setValues({...values,[name]:event.target.value })
    }
    const informParent = response =>{
                        authenticate(response,()=>{
                        // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                         isAuth() && isAuth().role === 'admin'?navigate('/admin') : navigate('/private');
                      
                    
                    })
    }
    const clickSubmit = event =>{
            
            event.preventDefault()
            setValues({...values,buttonText:'Submitting'})
            axios({
                method:"POST",
                url:`/api/signin`,
                data:{email,password}
            })
            .then(response=>{
                console.log('SIGNUP SUCCESS',response)

                //save the response (user, token) localstorage/cookie
                authenticate(response,()=>{
                    setValues({...values,email:'',password:'',buttonText:'Submitted'});
                    // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                isAuth() && isAuth().role === 'admin'?navigate('/admin') : navigate('/private');
                  
                    
                    })
               



                
            })
            .catch(error=>{
                console.log('SIGNUP ERROR',error.response.data)
                setValues({...values,buttonText:'Submit'});
                toast.error(error.response.data.error);
            })
    }

    const signinForm = () =>(
        <form>
            
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className='form-control' />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className='form-control' />
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
                 {isAuth() ? navigate('/') : null}
                <h1 className='p-5 text-center'>Signin</h1>
                <Google informParent={informParent}/>
                // <Facebook informParent={informParent}/>
                {signinForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
            </div>
            </Layout>
        </>
    )

}

export default Signin
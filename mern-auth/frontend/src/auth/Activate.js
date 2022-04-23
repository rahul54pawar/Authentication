import React, { useState,useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useNavigate,useParams } from "react-router-dom";

const Activate = () => {
    const [values,setValues] = useState({
        name:"",
        token:'',
        show:true
    });

    let webtoken = useParams().token
   


 


    useEffect(()=>{
        let token = webtoken
        let {name} = jwt_decode(token)
        if(token){
            setValues({...values,name,token})
        }

    },[]);

       const {name,token,show} = values;

    

    const clickSubmit = event =>{
            
            event.preventDefault()
            setValues({...values,buttonText:'Submitting'})
            axios({
                method:"POST",
                url:`/api/account-activation`,
                data:{token}
            })
            .then(response=>{
                console.log('ACCOUNT ACTIVATION',response)
                setValues({...values,show:false})
                toast.success(response.data.message)
            })
            .catch(error=>{
                console.log('ACCOUNT ACTIVATION ERROR',error.response.data.error)
                
                toast.error(error.response.data.error);
            })
    }

    const activationLink = () =>(
        <div className="text-center">
            <h1 className='p-5'>Hey {name},Ready to activate your account?</h1>
            <button className='btn btn-outline-primary' onClick={clickSubmit} >Activate Account</button>
        </div>
    )
  
    return (
        <>
            <Layout>
            <div >
                <ToastContainer />
                
                {activationLink()}
            </div>
            </Layout>
        </>
    )

}

export default Activate;
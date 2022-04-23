import React from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import {isAuth,signout} from '../auth/helpers'


const Layout = ({children}) =>{

    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) =>{
        if(location.pathname === path){
            return {color:'#000'};
        }else{
            return{color:'#fff'}
        }
    };

    const Nav = () =>{
        return (
            <>
                <ul className="nav nav-tabs bg-primary">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={isActive('/')}>
                            Home
                        </Link>
                    </li>
                    {
                        !isAuth() && (
                        <>
                        <li className="nav-item">
                        <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                            Signup
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                            Signin
                        </Link>
                        </li>
                        </>
                            )
                    }


                     {
                        isAuth() && isAuth().role === 'admin' && (

                        <li className="nav-item">
                            
                            <Link className="nav-link" style={isActive('/private')} to="/admin">{isAuth().name}</Link>
                           
                        </li>

                            )
                    }

                                         {
                        isAuth() && isAuth().role === 'subscriber' && (

                        <li className="nav-item">
                            
                            <Link className="nav-link" style={isActive('/private')} to="/private">{isAuth().name}</Link>
                           
                        </li>

                            )
                    }

                                         {
                        isAuth() && (

                        <li className="nav-item">
                            <span className="nav-link" style={{cursor:'pointer', color:'#fff'}} onClick={()=>{
                                signout(()=>{
                                    navigate('/')
                                })
                            }}>SignOut</span>
                        </li>

                            )
                    }
                </ul>
            </>
        )
      
    }
    return(
        <>
            <Nav />
            <div className="container">{children}</div>
        </>
    )
}

export default Layout
import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import LOGO from '../../images/logo1.png';
import './header.scss';

const Header = () => {
    const {isLogin} = useSelector(state => state);
    console.log(isLogin)
    const dispatch = useDispatch();
    const handleClick = async() => {
        try{
            // const signOut = await axios.post('http://localhost:5000/logout');
            // console.log(signOut)
            dispatch({type: "LOGOUT"})
            console.log(isLogin)
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div className="header">
            <div className="logo-area">
                <NavLink to="/">
                    <img src={LOGO} alt="logo" className="logo"/>
                </NavLink>
            </div>
            <div className="link-area">
                <ul className="head-ul">
                    <NavLink to="/men">
                        <li className="head-li">Men</li>
                    </NavLink>
                    <NavLink to="/women">
                        <li className="head-li">Women</li>
                    </NavLink>
                    {!isLogin ? 
                        <NavLink to="/sign">
                            <li className="head-li">SignIn</li>
                        </NavLink>
                    :
                        <li className="head-li" onClick={handleClick}>SignOut</li>
                    }
                    <NavLink to="/cart">
                        <li className="head-li">Cart</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Header;

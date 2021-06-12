import React from 'react';
import {NavLink} from 'react-router-dom';
import LOGO from '../../images/logo1.png';
import './header.scss';

const Header = () => {
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
                    <NavLink to="/sign">
                        <li className="head-li">SignIn</li>
                    </NavLink>
                    <NavLink to="/cart">
                        <li className="head-li">Cart</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Header;

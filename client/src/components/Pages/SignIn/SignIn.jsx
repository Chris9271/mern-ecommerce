import React from 'react';
import Footer from '../../Footer/Footer';
import './SignIn.scss';

const SignIn = () => {
    return (
        <>
        <div className="sign-form">
            <div className="left-row">
                <h4>SignIn</h4>
                <form className="login">
                    <div className="input-field col s12">
                        <input type="email" className="login-email"/>
                        <label htmlFor="login-email">E-mail</label>
                    </div>
                    <div className="input-field col s12">
                        <input type="password" className="login-password"/>
                        <label htmlFor="login-password">Password</label>
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                </form>
            </div>
            <div className="right-row">
                <h4>SignUp</h4>
                    <form className="signup">
                        <div className="input-field col s12">
                            <input type="text" className="username" required/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="input-field col s12">
                            <input type="email" className="email"/>
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="input-field col s12">
                            <input type="password" className="password"/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field col s12">
                            <input type="password" className="confirmpassword"/>
                            <label htmlFor="confirmpassword">ConfirmPassword</label>
                        </div>
                        <button type="submit" className="btn-signup">SignUp</button>
                    </form>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default SignIn;

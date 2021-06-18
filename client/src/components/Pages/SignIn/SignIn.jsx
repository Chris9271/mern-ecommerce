import React, {useState} from 'react';
import {Formik, Form, useField} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Footer from '../../Footer/Footer';
import './SignIn.scss';


const SignIn = () => {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const {isLogin} = useSelector(state => state)
    const dispatch = useDispatch();

    const switchHandler = () => {
        setIsLoginMode((isLoginMode) => !isLoginMode)
    }
    // console.log(isLoginMode)

const validationSchemaLeft = Yup.object({
    email: Yup.string()
    .email('Email is in valid')
    .required('Email is required'),
    password: Yup.string()
    .min(8, 'Password has to be longer than 8 characters')
    .required('Please enter password')
    .matches(/^(?=[A-Za-z]*.)(?=\d*.)(?=[!@#$%&*?]*.)[A-Za-z\d!@#$%&*?]{8,}$/, "Should contain 8 chars, at least one number and special case chars")
})

const validationSchemaRight = Yup.object({
    username: Yup.string()
    .min(3, 'Username should longer than 3 characters')
    .concat(!isLoginMode ? Yup.string().required('Please enter your username') : null),
    // .required('Please enter your username'),
    email: Yup.string()
    .email('Email is in valid')
    .required('Email is required'),
    password: Yup.string()
    .min(8, 'Password has to be longer than 8 characters')
    .required('Please enter password')
    .matches(/^(?=[A-Za-z]*.)(?=\d*.)(?=[!@#$%&*?]*.)[A-Za-z\d!@#$%&*?]{8,}$/, "Should contain 8 chars"),
    confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password is not match')
    .concat(!isLoginMode ? Yup.string().required('Please enter password again') : null)
    // .required('Please enter password again')
})

const CustomInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    // console.log(label)
    // console.log(props)
    // console.log(field)
    // console.log(meta)
    if(props.type === "text"){
        return(
            <div className="input-field col s12">
                <input {...field}{...props}/>
                <label htmlFor={props.name}>{label}</label>
                {meta.touched && meta.error ? (
                    <span className="error-msg">{meta.error}</span>
                ): null}
            </div>
        )
    }else{
        return(
            <div className="input-field col s12">
                <input {...field}{...props}/>
                <label htmlFor={props.name}>{label}</label>
                {meta.touched && meta.error ? (
                    <span className="error-msg">{meta.error}</span>
                ): null}
            </div>
        )
    }
}

const authSubmitHandler = async(values) => {
    console.log(values)
    if(!isLoginMode){
        try{
            const addUser = await axios.post('http://localhost:5000/sign', values)
            console.log(addUser);
            dispatch({type: "LOGIN", payload: addUser.data._id})
        }catch(err){
            console.log(err)
        }
    }else{
        try{
            const signUser = await axios.post('http://localhost:5000/login', values)
            console.log(signUser)
            dispatch({type: "LOGIN", payload: signUser.data._id})
        }catch(err){
            console.log(err)
        }
    }
}

if(isLogin) return <Redirect to = "/"/>

    return (
        <>
            <div className="sign-form">
                    <Formik
                        initialValues={!isLoginMode ? {
                            username: '',
                            email: '',
                            password: '',
                            confirmpassword: ''
                        }:{
                            email: '',
                            password: ''
                        }}
                        // initialValues={{
                        //     username: '',
                        //     email: '',
                        //     password: '',
                        //     confirmpassword: ''
                        // }}
                        validationSchema={!isLoginMode ? validationSchemaRight : validationSchemaLeft}
                        onSubmit={(values, {resetForm, submitForm, setSubmitting})=>{
                            setSubmitting(false);
                            resetForm();
                            submitForm();
                            authSubmitHandler(values)
                        }}
                    >
                    {(props)=>{
                        return(
                        <div className="right-row">
                            <h4>{!isLoginMode ? "Sign Up" : "Sign In"}</h4>
                            <Form>
                                {!isLoginMode && (
                                    <CustomInput
                                        label="Username"
                                        type="text"
                                        name="username"
                                    />
                                )
                                }
                                <CustomInput
                                    label="Email"
                                    type="text"
                                    name="email"
                                />
                                <CustomInput
                                    label="Password"
                                    type="password"
                                    name="password"
                                />
                                {!isLoginMode && (
                                    <CustomInput
                                        label="ConfirmPassword"
                                        type="password"
                                        name="confirmpassword"
                                    />
                                )
                                }
                                <button 
                                    type="submit" 
                                    className="btn-signup"
                                    disabled={props.isSubmitting}
                                >
                                    {props.isSubmitting ? "Loading..." : "Submit"}
                                </button>
                            </Form>
                        </div>
                        )
                    }}
                    </Formik>
                    <div className="switch-area">
                        <h5>
                            {isLoginMode ? "Don't have account?" : "Already register?"}
                        </h5>
                        <button 
                            className="btn-switch" 
                            type="reset"
                            onClick={() => {
                                switchHandler();
                                // props.resetForm();
                            }}>
                            Switch To {isLoginMode ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                    {/* </div>
                        )
                    }}
                    </Formik> */}
            </div>
            <Footer/>
        </>
    )
}

export default SignIn;
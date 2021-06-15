import React from 'react';
import {useField} from 'formik';

//label & props from SignIn page input props
const CustomInput = ({label, ...props}) => {
    //field => input
    const [field, meta] = useField(props); 
    if(props.type === "text"){
        return (
            <div className="input-field col s12">
                <input {...field} {...props}/>
                <label htmlFor={props.name}>{label}</label>
                {meta.touched && meta.error ? (
                <span>{meta.error}</span>
                ):null}
            </div>
        )
    }else{
        return (
            <div className="input-field col s12">
                <input {...field} {...props}/>
                <label htmlFor={props.name}>{label}</label>
                {meta.touched && meta.error ? (
                <span>{meta.error}</span>
                ):null}
            </div>
        )
    }
}

export default CustomInput;

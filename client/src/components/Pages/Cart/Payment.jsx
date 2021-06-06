import React from 'react';
import {Redirect} from 'react-router-dom';

const Payment = () => {
    alert("Payment Successful")
    return (
        <Redirect to="/"/>
    )
}

export default Payment;

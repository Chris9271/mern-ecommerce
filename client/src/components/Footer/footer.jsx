import React from 'react';
import './footer.scss';

const footer = () => {
    return (
        <div className="footer">
            <div className="footer-link">
                <ul className="foot-ul">
                    <li className="foot-li">Contact Us</li>
                    |
                    <li className="foot-li">Privacy Policy</li>
                    |
                    <li className="foot-li">Order Tracking</li>
                    |
                </ul>
                <ul className="foot-ul">
                    <li className="foot-li">Returns & Refunds</li>
                    |
                    <li className="foot-li">Terms & Conditions</li>
                    |
                    <li className="foot-li">Shipping & Delivery</li>
                </ul>
            </div>
                <p className="copyright">Copyright &copy; 2021 by Chris Weng. All right reserved.</p>
        </div>
    )
}

export default footer;

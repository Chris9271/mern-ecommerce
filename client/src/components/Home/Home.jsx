import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../Footer/Footer';
import './home.scss';

const Home = () => {
    return (
        <>
        <div className="homepage">
            <div className="pic-box">
                <div className="sale">
                    <div className="sale-img">
                        <Link to="/sale">
                            <button className="btn-sale">
                                <p className="title">SPRING SALE</p>
                                <p className="content">SHOP NOW</p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="new-item">
                    <div className="item-img">
                        <Link to="/new">
                            <button className="btn-new">
                                <p className="title">NEW DESIGN</p>
                                <p className="content">SHOP NOW</p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="accessory">
                    <div className="accessory-img">
                        <Link to="/accessory">
                            <button className="btn-accessory">
                                <p className="title">ACCESSORIES</p>
                                <p className="content">SHOP NOW</p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="men">
                    <div className="men-img">
                        <Link to="/men">
                            <button className="btn-men">
                                <p className="title">MENS</p>
                                <p className="content">SHOP MENS</p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="women">
                    <div className="women-img">
                        <Link to="/women">
                            <button className="btn-women">
                                <p className="title">WOMENS</p>
                                <p className="content">SHOP WOMENS</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Home;

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HoverImage from 'react-hover-image';
import {Link} from 'react-router-dom';
import Footer from '../../Footer/footer';
import './Accessory.scss';

const Accessory = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        try{
            const source = axios.CancelToken.source();
            const productList = async() => {
                const list = await axios.get('http://localhost:5000/accessory', {cancelToken: source.token});
                setProducts(list.data);
            }
            productList();
            // return () => {
            //     source.cancel();
            // }
        }catch(err){
            if(axios.isCancel(err)){
                console.log("Request cancel: ", err);
            }
        }
    }, [])
    return (
        <>
        <div className="accessory-products">
            {products.map((product)=>(
                <div className="accessory-product-box" key={product._id}>
                    <div className="accessory-content-box">
                        <div className="accessory-product-image">
                            <Link to={`/${product._id}`}>
                                <HoverImage src={product.image} hoverSrc={product.hoverImage} alt="product" className="accessory-image-size"/>
                            </Link>
                        </div>
                        <div className="accessory-product-info">
                            <span className="accessory-product-name">{product.productName}</span>
                            <span className="accessory-product-price">${product.price}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
            <Footer/>
        </>
    )
}

export default Accessory;

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HoverImage from 'react-hover-image';
import {Link} from 'react-router-dom';
import Footer from '../../Footer/footer';
import './Women.scss';

const Women = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        try{
            const source = axios.CancelToken.source();
            const productList = async() => {
                const list = await axios.get('http://localhost:5000/women', {cancelToken: source.token})
                setProducts(list.data)
            }
            productList();
            // return () => {
            //     source.cancel();
            // }
        }catch(err){
            if(axios.isCancel(err)){
                console.log("Request cancel: ", err)
            }
        }
    },[])

    return (
        <>
        <div className="women-products">
            {products.map((product) => (
                <div className="women-product-box" key={product._id}>
                    <div className="women-content-box">
                        <div className="women-product-image">
                            <Link to={`/product/${product._id}`}>
                                <HoverImage src={product.image} hoverSrc={product.hoverImage} alt="product" className="women-image-size"/>
                            </Link>
                        </div>
                        <div className="women-product-info">
                            <span className="women-product-name">{product.productName}</span>
                            <span className="women-product-price">${Number(product.price).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
            <Footer/>
        </>
    )
}

export default Women;

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HoverImage from 'react-hover-image';
import {Link} from 'react-router-dom';
import Footer from '../../Footer/footer';
import './Sale.scss';

const Sale = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        try{
            const source = axios.CancelToken.source();
            const productList = async() => {
                const list = await axios.get('http://localhost:5000/sale', {cancelToken: source.token});
                setProducts(list.data);
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
    }, [])
    
    return (
        <>
        <div className="sale-products">
            {products.map((product)=>(
                <div className="sale-product-box" key={product._id}>
                    <div className="sale-content-box">
                        <div className="sale-product-image">
                            <Link to={`/${product._id}`}>
                                <HoverImage src={product.image} hoverSrc={product.hoverImage} alt="product" className="sale-image-size"/>
                            </Link>
                        </div>
                        <div className="sale-product-info">
                            <span className="sale-product-name">{product.productName}</span>
                            <span className="sale-product-price">${product.price}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
            <Footer/>
        </>
    )
}

export default Sale;

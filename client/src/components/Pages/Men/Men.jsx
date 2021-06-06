import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HoverImage from 'react-hover-image';
import {Link} from 'react-router-dom';
import Footer from '../../Footer/footer';
import './Men.scss';

const Men = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        // axios comes with a cancellation option to finish a request before it ends
        // This is useful besides the cleanup function to prevent memory leaking.
        try{
            // create a cancel token in order to cancel request
            const source = axios.CancelToken.source();
            const productList = async() => {
                const list = await axios.get('http://localhost:5000/men', {cancelToken: source.token})
                setProducts(list.data)
            }
                productList();
            // return () => {
            //     source.cancel();
            //     }
        }catch(err){
            if(axios.isCancel(err)){
                console.log("Request cancel: ", err)
            }
        }
    }, [])



    return (
        <>
        <div className="men-products">
            {products.map((product)=>(
                <div className="men-product-box" key={product._id}>
                    <div className="men-content-box">
                        <div className="men-product-image">
                            <Link to={`/${product._id}`}>
                                <HoverImage src={product.image} hoverSrc={product.hoverImage} alt="product" className="men-image-size"/>
                            </Link>
                            {/* <button className="btn-cart">Product Page</button>  */}
                        </div>
                        <div className="men-product-info">
                            <span className="men-product-name">{product.productName}</span>
                            <span className="men-product-price">${Number(product.price).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <Footer/>
        </>
    )
}

export default Men;

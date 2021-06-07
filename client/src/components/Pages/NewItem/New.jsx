import React, {useState, useEffect} from 'react';
import axios from 'axios';
import HoverImage from 'react-hover-image';
import {Link} from 'react-router-dom';
import Footer from '../../Footer/footer';
import './New.scss';

const New = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        try{
            const source = axios.CancelToken.source();
            const productList = async() => {
                const list = await axios.get('http://localhost:5000/new', {cancelToken: source.token});
                setProducts(list.data);
            }   
            productList();
            // return() => {
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
        <div className="new-products">
            {products.map((product) => (
                <div className="new-product-box" key={product._id}>
                    <div className="new-content-box">
                        <div className="new-product-image">
                            <Link to={`/product/${product._id}`}>
                                <HoverImage src={product.image} hoverSrc={product.hoverImage} alt="product" className="new-image-size"/>
                            </Link>
                        </div>
                        <div className="new-product-info">
                            <span className="new-product-name">{product.productName}</span>
                            <span className="new-product-price">${Number(product.price).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
            <Footer/>
        </>
    )
}

export default New;

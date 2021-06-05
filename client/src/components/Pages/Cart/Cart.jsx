import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Cart.scss';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [qty, setQty] = useState(); //used to rerender page when quantity in/decrease
    const [totalPrice, setTotalPrice] = useState(0); //store total price
    const [noItem, setNoItem] = useState();

    useEffect(()=>{
        try{
            const source = axios.CancelToken.source();
            const cartItem = async() => {
                const item = await axios.get("http://localhost:5000/cart", {cancelToken: source.token});
                if(item.data.length !== 0){
                    setCart(item.data[0].items)
                    setTotalPrice(item.data[0].subTotal)
                }else{
                    setNoItem(item.config.maxBodyLength)
                }
            }
                cartItem();
            // return () => {
            //     source.cancel();
            // }
        }catch(err){
            if(axios.isCancel(err)){
                console.log("Request cancel: ", err);
            }else{
                console.log(err)
            }
        }
        const total = () => {
            let totalPrice = 0;
            for(let i = 0; i < cart.length; i++){
                totalPrice += cart[i].price * cart[i].quantity
            }
            setTotalPrice(totalPrice);
        }
        total()
        }, [qty, totalPrice])

    const handleAddClick = async(e, id) => {
        e.stopPropagation();
        const updateQty = await axios.put('http://localhost:5000/cart', {params: {id}, option:"ADD"});
        setQty(updateQty)
    }

    const handleMinusClick = async(e, id)=>{
        e.stopPropagation();
        const updateQty = await axios.put('http://localhost:5000/cart', {params: {id}});
        setQty(updateQty)
    }

    const handleRemove = async(e, id) => {
        e.stopPropagation();
        // 傳送指定 id 以刪除cart中符合之product, so use query params, indicate an id in a path
        const removeProduct = await axios.delete('http://localhost:5000/cart', {params: {id}})
        console.log(removeProduct);
        // console.log(cart.length)
        if(cart.length > 0){
            const updateTotal = await axios.patch('http://localhost:5000/cart');
            // console.log(updateTotal)
            setTotalPrice(updateTotal.data.subTotal)
        }else{
            setTotalPrice(0)
        }
        setCart(cart.filter(item => item._id !== id))
    }

    return (
        <>
        {(noItem === -1) ? 
        <div className="cart-empty">
            <h2>You don't have any item in shopping cart.</h2>
            <a href="/" className="return-btn"><button className="cart-return">Back To Home</button></a>
        </div>
        :
        <div className="cart-content">
            <div className="cart-head">
                <p className="cart-my">My Cart</p>
                <p className="cart-qty">Quantity</p>
                <p className="cart-price">Price</p>
                <p className="cart-remove">Remove</p>
            </div>
                {cart.map((item, i) => (
                    <div key={i}>
                        <div className="cart-info">
                            <div className="cart-image-product">
                                <div className="cart-image">
                                    <img src={item.hoverImage} alt="product" className="cart-image-size"/>
                                </div>
                                <div className="cart-product-name">
                                    {item.productName}
                                </div>
                            </div>
                            <div className="cart-qty">
                                {(item.quantity <= 1) ?
                                    <button className="minus" onClick={(e)=>handleMinusClick(e, item._id)} disabled><img src="https://img.icons8.com/android/14/000000/minus.png" alt="minus"/></button>
                                :
                                    <button className="minus" onClick={(e)=>handleMinusClick(e, item._id)}><img src="https://img.icons8.com/android/14/000000/minus.png" alt="minus"/></button>
                                }   
                                <input type="number" value={item.quantity} className="show-qty" min={1} max={10} readOnly/>
                                {(item.quantity >= 10) ?
                                    <button className="plus" onClick={(e)=>handleAddClick(e, item._id)} disabled><img src="https://img.icons8.com/android/14/000000/plus.png" alt="plus"/></button>
                                :
                                    <button className="plus" onClick={(e)=>handleAddClick(e, item._id)}><img src="https://img.icons8.com/android/14/000000/plus.png" alt="plus"/></button>
                                }
                            </div>
                            <div className="cart-price">
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="cart-remove">
                                <button className="remove" onClick={(e)=>handleRemove(e, item._id)}>X</button>
                            </div>
                        </div>
                            <hr/>
                    </div>
                ))}
            <div className="show-total">
                <p>Item Total: ${totalPrice}</p>
            </div>
        </div>
        }
        </>
    )
}

export default Cart;

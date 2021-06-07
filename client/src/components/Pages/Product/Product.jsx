import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Footer from '../../Footer/footer';
import './Product.scss';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        height: '90vh'
    }
}

const customPicStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: 'none'
    }
}
// Make sure to bind modal to index.html appElement
Modal.setAppElement("#modal-root");

// match is an object contain info about <Route> path (or can use - useParams())
// ex: This route is /:id, so match will record this, store in params property (record dynamic route)
const Product = ({match}) => {
    const [item, setItem] = useState([]);
    const [switchPic, setSwitchPic] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openPicModal, setOpenPicModal] = useState(false);

    const handleSwitch = () => {
        setSwitchPic(!switchPic)
    }

    const handleOpen = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const handlePicOpen = () => {
        setOpenPicModal(true);
    }

    const handlePicClose = () => {
        setOpenPicModal(false);
    }
    
    const sendData = async(e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/cart', item);
    }

    useEffect(()=>{
        try{
            const source = axios.CancelToken.source();
            const product = async() => {
                const singleItem = await axios.get(`http://localhost:5000/product/${match.params.id}`, {cancelToken: source.token});
                // console.log(singleItem)
                setItem(singleItem.data);
            }
                product();
            // return ()=>{
            //     source.cancel();
            // }
        }catch(err){
            if(axios.isCancel(err)){
                console.log("Request cancel: ", err);
            }else{
                console.log(err)
            }
        }
    }, [match.params.id])

    return (
        <>
            <div className="product">
                <Modal
                    isOpen={openModal}
                    onRequestClose={handleClose}
                    style={customStyles}
                >
                    <img src="https://cdn.shopify.com/s/files/1/1380/3157/files/168293_original_1-2_2048x2048.png?v=1474813445" alt="" className="size-image"/>   
                </Modal>
                <Modal
                    isOpen={openPicModal}
                    onRequestClose={handlePicClose}
                    style={customPicStyles}
                >
                    <img src={item.image} alt="" className="size-modal-image"/>   
                </Modal>
                <div className="product-box">
                    <div className="product-info">
                        <div className="product-image">
                            {!(switchPic) ?
                                <img src={item.image} alt="product" className="image-size" onClick={handlePicOpen}/>
                            :   
                                <img src={item.hoverImage} alt="product" className="image-size"/>
                            }    
                            <i className="material-icons left" onClick={handleSwitch}>keyboard_arrow_left</i>
                            <i className="material-icons right" onClick={handleSwitch}>keyboard_arrow_right</i>
                        </div>
                        <div className="product-detail">
                            <h4 className="item-name">{item.productName}</h4>
                            <h6 className="item-price">CAD ${Number(item.price).toFixed(2)}</h6>
                            <p>{item.description}</p>
                            <hr/>
                            <p className="size-chart" onClick={handleOpen}><i className="material-icons">straighten</i>Size chart</p>
                            {/* <a href="/cart" className="cart-wrap"> */}
                                <button className="cart" onClick={sendData}>
                                    <i className="material-icons">shopping_cart</i>
                                    <span>Add To Cart</span>
                                </button>
                            {/* </a> */}
                        </div>
                    </div>
                    <div className="product-statement">
                        <h5 className="item-detail">Material</h5>
                        {/* avoid nested value return undefined  */}
                        <p className="statement-one">{item && item.detail ? item.detail.farbicDetail : ""}</p>
                        <hr/>
                        <h5 className="item-detail">Washing Instructions</h5>
                        <p className="statement-two">{item && item.detail ? item.detail.washingInstruction : ""}</p>
                        <p className="statement-three">{item && item.detail ? item.detail.warning : ""}</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Product;

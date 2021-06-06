require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.SERVER_STRIPE_SECRET_KEY);
// const router = express.Router();
const ProductSchema = require('./model/product');
const CartSchema = require('./model/cart');
const HttpRes = require('./model/httpResponse');
const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, ()=>{
    console.log('PORT is connected!');
})


app.get('/men', async (req, res)=>{
    try{
        const listMen = await ProductSchema.find({gender: "men"});
        return res.json(listMen);
    }catch(e){
        console.log(e)
    }
})


app.get('/women', async(req, res)=>{
    try{
        const listWomen = await ProductSchema.find({gender: "women"});
        return res.json(listWomen);
    }catch(e){
        console.log(e)
    }
})


app.get('/sale', async(req, res)=>{
    try{
        const listSale = await ProductSchema.find({sale: true});
        return res.json(listSale);
    }catch(e){
        console.log(e)
    }
})


app.get('/new', async(req, res)=>{
    try{
        const listNew = await ProductSchema.find({new: true});
        return res.json(listNew);
    }catch(e){
        console.log(e)
    }
})


app.get('/accessory', async(req, res)=>{
    try{
        const listAccessory = await ProductSchema.find({accessory: true});
        if(!listAccessory){
            return res.status(500).json({
                type: "Accessory Not Found!",
                msg: "Invalid Request"
            })
        }
        return res.json(listAccessory);
    }catch(err){
        console.log(err)
        return res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err
        })
    }
})

app.post('/cart', async(req, res)=>{
    const id = req.body._id;
    const qty = req.body.quantity;
    const price = req.body.price;
    try{
        let cart = await CartSchema.find();
        if(cart.length !== 0){
                const productIndex = cart[0].items.findIndex(item => item.productId == id)
                if(productIndex >= 0 && productIndex === productIndex){
                    cart[0].items[productIndex].quantity = cart[0].items[productIndex].quantity + qty;
                    cart[0].items[productIndex].price = price;
                    cart[0].items[productIndex].total = (cart[0].items[productIndex].quantity * price).toFixed(2);
                    cart[0].subTotal = cart[0].items.map(item => item.total).reduce((acc, next) => acc + next);
                }else if(productIndex === -1){
                        cart[0].items.push({
                            productId: id,
                            productName: req.body.productName,
                            hoverImage: req.body.hoverImage,
                            price: price,
                            quantity: qty,
                            total: price * qty
                        })
                        cart[0].subTotal = cart[0].items.map(item => item.total).reduce((arr, next) => arr + next)
                }
                else{
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart[0].save();
                    return res.json(data)
    }else{
        const newData = {
                items:[{
                    productId: id,
                    productName: req.body.productName,
                    hoverImage: req.body.hoverImage,
                    price: price * qty,
                    quantity: qty,
                    total: price * qty
                }],
                    subTotal: price
            }
                let cart = await CartSchema.create(newData);
                return res.json(cart);
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
})


app.get('/cart', async(req, res)=>{
    try{
        const cartProduct = await CartSchema.find({});
        return res.json(cartProduct)
    }catch(err){
        console.log(err)
    }
})

app.put('/cart', async(req, res)=>{
    try{
        const {id} = req.body.params
        if(req.body.option === "ADD"){
            let cart = await CartSchema.find();
            const productIndex = cart[0].items.findIndex(item => item._id == id);
                cart[0].items[productIndex].quantity = cart[0].items[productIndex].quantity + 1;
                cart[0].items[productIndex].total = (cart[0].items[productIndex].quantity * cart[0].items[productIndex].price).toFixed(2);
                cart[0].subTotal = cart[0].items.map(item => item.total).reduce((acc, next) => acc + next);
            let data = await cart[0].save();
            return res.json(data);
        }else{
            let cart = await CartSchema.find();
            const productIndex = cart[0].items.findIndex(item => item._id == id)
                cart[0].items[productIndex].quantity = cart[0].items[productIndex].quantity - 1;
                cart[0].items[productIndex].total = (cart[0].items[productIndex].quantity * cart[0].items[productIndex].price).toFixed(2);
                cart[0].subTotal = cart[0].items.map(item => item.total).reduce((acc, next) => acc + next).toFixed(2);
            let data = await cart[0].save();
            return res.json(data);
        }
    }catch(err){
        console.log(err)
    }
})

app.patch('/cart', async(req, res)=>{
    try{
        let cart = await CartSchema.find();
            if(cart[0].items.length > 0){
                const id = cart[0]._id;
                let adjustTotal = cart[0].subTotal;
                adjustTotal = cart[0].items.map(item => item.total).reduce((arr, next) => arr + next);
                let data = await CartSchema.findByIdAndUpdate(id, {subTotal: adjustTotal}, {new: true})
                return res.json(data)
            }else{
                let deleteAll = await CartSchema.deleteMany({})
                return res.json(deleteAll)
            }
            
    }catch(err){
        console.log(err)
    }
})

app.delete('/cart', async(req, res)=>{
    try{
        const {id} = req.query;
        let cart = await CartSchema.find();
        let deleteCartItem = cart[0].items.id({_id: id}).remove()
        let updateCart = await cart[0].save(deleteCartItem);
        return res.json(updateCart)
    }catch(err){
        console.log(err)
    }
})

app.post('/create-checkout-session', async(req, res)=>{
    try{
    const cartProduct = await CartSchema.find({});
    const productName = cartProduct[0].items.map(item => item.productName);
    const productNames = productName.join(" & ");
    const productPrice = cartProduct[0].subTotal * 100;
    const productQuantity = cartProduct[0].items[0].quantity;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items:[
            {
                price_data:{
                    currency: 'cad',
                    product_data: {
                        name: productNames
                    },
                    unit_amount: productPrice
                },
                quantity: productQuantity
            }
        ],
        success_url: 'http://localhost:3000/payment',
        cancel_url: 'http://localhost:3000/cart'
    })
    res.json({id: session.id})
    await CartSchema.deleteMany({})
    }catch(err){
        console.log(err)
    }
})


app.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const listProduct = await ProductSchema.findById(id);
        return res.json(listProduct);
    }catch(err){
        console.log(err)
    }
})




mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
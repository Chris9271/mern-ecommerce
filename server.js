require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.SERVER_STRIPE_SECRET_KEY);
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
const CartSchema = require('./model/cart');
const HttpError = require('./model/httpResponse');
const pageRouter = require('./routes/page-route');
const userRouter = require('./routes/user-route');
// const User = require('./model/user');
const app = express();
// const store = new MongoDBStore({
//     uri: process.env.MONGODB_URL,
//     collection: 'session'
// })

app.use(cors());
app.use(express.json());

// create a new session 
// app.use(session({
//     secret: 'userLogin',
//     resave: false,
//     saveUninitialized: false,
//     store: store
// }))

// app.use((req, res, next)=>{
//     if(!req.session.user){
//         return next();
//     }
//     User.findById(req.session.user._id)
//         .then(user => {
//            // create new property in request
//         req.user = user
//            // if not next here will stop and not execute the route
//         next();
//     })
//     .catch(err => console.log(err))
// })


app.use('/', pageRouter);
app.use('/', userRouter);

app.post('/create-checkout-session', async(req, res, next)=>{
    let cartProduct;
    let session;
    try{
    cartProduct = await CartSchema.find({});
    const productName = cartProduct[0].items.map(item => item.productName);
    const productNames = productName.join(" & ");
    const productPrice = cartProduct[0].subTotal * 100;
    session = await stripe.checkout.sessions.create({
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
                quantity: '1'
            }
        ],
        success_url: 'http://localhost:3000/payment',
        cancel_url: 'http://localhost:3000/cart'
        })
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "Something went wrong, please try again later..."))
    }
    // console.log(session)
    res.json({id: session.id})
    await CartSchema.deleteMany({})
})

app.use((req, res, next)=>{
    throw new HttpError(404, "Can't find this route")
})

// next() - used to jump to next middleware function
// Default error handler (add custom error handler)
app.use((err, req, res, next)=>{
    // Boolean property that indicates if the app sent HTTP headers for the response.
    if(res.headersSent){
        return next(err)
    }
    return res.status(err.code || 500).json({message: err.message || "An unknown error occured"})
})

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(()=>{
        app.listen(5000);
        console.log('PORT is connected!');
    })
    .catch(err => console.log(err))


// app.get/post/put/delete/patch('/cart', async(req, res, next)=>{
// })
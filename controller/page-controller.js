const ProductSchema = require('../model/product');
const CartSchema = require('../model/cart');
const HttpError = require('../model/httpResponse');

exports.getMensProduct = async(req, res, next) => {
    let listMen;
    try{
        listMen = await ProductSchema.find({gender: "men"});
    }catch(err){
        console.log(err);
        return next(new HttpError(500, "Something went wrong, can't find men's items"))
    }
    res.json(listMen);
}

exports.getWomensProduct = async(req, res, next) => {
    let listWomen;
    try{
        listWomen = await ProductSchema.find({gender: "women"});
    }catch(err){
        console.log(err);
        return next(new HttpError(500, "Something went wrong, can't find women's items"))
    }
    res.json(listWomen);
}

exports.getSaleProduct = async(req, res, next) => {
    let listSale;
    try{
        listSale = await ProductSchema.find({sale: true});
    }catch(err){
        console.log(err);
        return next(new HttpError(500, "Something went wrong, can't find items on sale"))
    }
    res.json(listSale);
}

exports.getNewProduct = async(req, res, next) => {
    let listNew;
    try{
        listNew = await ProductSchema.find({new: true});
    }catch(err){
        console.log(err);
        return next(new HttpError(500, "Something went wrong, can't find new items"))
    }
    res.json(listNew);
}

exports.getAccessoryProduct = async(req, res, next) => {
    let listAccessory;
    try{
        listAccessory = await ProductSchema.find({accessory: true});
    }catch(err){
        console.log(err);
        return next(new HttpError(500, "Something went wrong, can't find accessory items"))
    }
    res.json(listAccessory);
}

exports.postNewCart = async(req, res, next) => {
    // 此處id 為 product collection 之 _id = cart collection productId
    const id = req.body._id; 
    const qty = req.body.quantity;
    const price = req.body.price;
    try{
        let cart = await CartSchema.find();
        if(cart.length !== 0){
                const productIndex = cart[0].items.findIndex(item => item.productId == id)
                // if(productIndex >= 0 && productIndex === productIndex){
                    if(productIndex >= 0){
                    cart[0].items[productIndex].quantity = cart[0].items[productIndex].quantity + 1;
                    cart[0].items[productIndex].price = price;
                    cart[0].items[productIndex].total = (cart[0].items[productIndex].quantity * price).toFixed(2);
                    cart[0].subTotal = cart[0].items.map(item => item.total).reduce((acc, next) => acc + next).toFixed(2);
                }
                // else if(productIndex === -1){
                else{
                    cart[0].items.push({
                        productId: id,
                        productName: req.body.productName,
                        hoverImage: req.body.hoverImage,
                        price: price,
                        quantity: qty,
                        total: price * qty
                    })
                    cart[0].subTotal = cart[0].items.map(item => item.total).reduce((arr, next) => arr + next).toFixed(2)
                }
                // else{
                //     return next(new HttpError(500, "Something went wrong"))
                // }
                let data = await cart[0].save();
                    return res.json(data)
    }else{
        const newData = {
                items:[{
                    productId: id,
                    productName: req.body.productName,
                    hoverImage: req.body.hoverImage,
                    price: price,
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
        return next(new HttpError(500, "Something went wrong"))
    }
}

exports.getCart = async(req, res, next) => {
    let cartProduct;
    try{
        cartProduct = await CartSchema.find();
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "Something went wrong, can't find cart items"))
    }
    res.json(cartProduct)
}

exports.putUpdateItemAmount = async(req, res, next) => {
    // 此處id 為 cart collection 中 item[index] 之 _id
    const {id} = req.body.params;
    let cart;
    let productIndex;
    let data;
    try{
        if(req.body.option === "ADD"){
            cart = await CartSchema.find();
            productIndex = cart[0].items.findIndex(item => item._id == id);
                cart[0].items[productIndex].quantity = cart[0].items[productIndex].quantity + 1;
                cart[0].items[productIndex].total = (cart[0].items[productIndex].quantity * cart[0].items[productIndex].price).toFixed(2);
                cart[0].subTotal = cart[0].items.map(item => item.total).reduce((acc, next) => acc + next).toFixed(2);
            data = await cart[0].save();
        }else{
            cart = await CartSchema.find();
            productIndex = cart[0].items.findIndex(item => item._id == id)
                cart[0].items[productIndex].quantity = cart[0].items[productIndex].quantity - 1;
                cart[0].items[productIndex].total = (cart[0].items[productIndex].quantity * cart[0].items[productIndex].price).toFixed(2);
                cart[0].subTotal = cart[0].items.map(item => item.total).reduce((acc, next) => acc + next).toFixed(2);
            data = await cart[0].save();
        }
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "Something went wrong, can't update specific item's data"))
    }
    res.json(data);
}

exports.patchAdjustCart = async(req, res, next) => {
    let cart;
    let data;
    try{
        cart = await CartSchema.find();
            if(cart[0].items.length > 0){
                // 此處id 為 cart collection 之 _id
                const id = cart[0]._id;
                let adjustTotal = cart[0].subTotal;
                adjustTotal = cart[0].items.map(item => item.total).reduce((arr, next) => arr + next).toFixed(2);
                data = await CartSchema.findByIdAndUpdate(id, {subTotal: adjustTotal}, {new: true})
            }else{
                data = await CartSchema.deleteMany({})
            }
            
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "Something went wrong, can't update specific item's data"))
    }
    res.json(data)
}

exports.deleteCart = async(req, res, next) => {
    // 此處id 為 cart collection 中 item[index] 之 _id
    const {id} = req.query;
    let cart;
    let updateCart;
    try{
        cart = await CartSchema.find();
        // cart[0].items.id({_id: id}) - return document match the id condition from collection
        let deleteCartItem = cart[0].items.id({_id: id}).remove()
        updateCart = await cart[0].save(deleteCartItem);
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "Something went wrong, can't delete specific item"))
    }
    res.json(updateCart)
}

exports.getSingleProduct = async(req, res, next) => {
    // 此處id 為 product collection 之 _id
    const {id} = req.params;
    let listProduct;
    try{
        listProduct = await ProductSchema.findById(id);
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "Something went wrong, can't get specific item"))
    }
    res.json(listProduct);
}
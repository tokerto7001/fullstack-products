const Product = require('../models/products');
const catchError = require('../utils/catchError');

exports.allProductsControler = (req, res, next) => {
    Product.find({})
        .then(data => res.status(200).json({
            data: data,
            message: 'success'
        }))
        .catch(err => res.send(err.message));
};

// ---- move this part into the /utils/catchError.js
// const catchError = func => {
//     console.log('catchError');
//     return (req, res, next) => {
//         console.log('runs when requested')
//         func(req, res, next).catch(err => next(err))
//     }
// }



exports.newProductController = catchError(async (req, res, next) => {
    // try{
    //     const newProduct = await new Product({ name: name, price: price, category: category });
    //     await newProduct.save();
    //     res.status(200).json({
    //         message: 'success'
    //     });
    // }catch(err) {
    //     res.status(400).send({ message: 'Invalid input' })
    // }
    const {name, price, category} = req.body;
    const newProduct = await new Product({ name: name, price: price, category: category });
    await newProduct.save();
    res.status(200).json({
        message: 'success'
    });

});

exports.oneProductController = catchError(async (req, res, next) => {
        const { id } = req.params;
        // if (!id) res.status(400).send({ message: 'Invalid id' });
        const product = await Product.findById(id)
        res.status(200).send({ data: product, message: 'success' });
 
})

exports.deleteProductController =catchError(async (req, res, next) => {
        const { id } = req.params;
        // if (!id) res.status(400).send({ message: 'Invalid id' });
        await Product.findByIdAndDelete(id)
        res.status(200).send({ message: 'success' });
});


exports.updateProductController = catchError(async (req, res, next) => {
        const { id } = req.params;
        const { name, price, category } = req.body;
        if (name && price && category && id) {
            const product = await Product.findByIdAndUpdate(id, { name: name, price: price, category: category }, { runValidators: true, new: true });
            res.status(200).send({ data: product, message: 'success' });
        }
})
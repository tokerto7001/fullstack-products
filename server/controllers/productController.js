const Product = require('../models/products');

exports.allProductsControler = (req, res, next) => {
    Product.find({})
        .then(data => res.status(200).json({
            data: data,
            message: 'success'
        }))
        .catch(err => res.send(err.message));
};

exports.newProductController = async (req, res, next) => {
    try {
        const { name, price, category } = req.body;
        if (name && price && category) {
            const newProduct = await new Product({ name: name, price: price, category: category });
            await newProduct.save();
            res.status(200).json({
                message: 'success'
            });
        } else {
            res.status(400).send({ message: 'Invalid input' })
        }
    } catch (err) {
        res.send(err.message)
    }

}

exports.oneProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) res.status(400).send({ message: 'Invalid id' });
        const product = await Product.findById(id)
        res.status(200).send({ data: product, message: 'success' });
    } catch (err) {
        res.send(err.message);
    }
}

exports.deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) res.status(400).send({ message: 'Invalid id' });
        await Product.findByIdAndDelete(id)
        res.status(200).send({ message: 'success' });
    } catch (err) {
        res.send(err.message);
    }
}

exports.updateProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, category } = req.body;
        if (name && price && category && id) {
            const product = await Product.findByIdAndUpdate(id, { name : name, price : price, category : category}, { runValidators : true, new : true});
            res.status(200).send({ data : product, message : 'success'});
        }

    } catch (err) {
        res.send(err.message);
    }
}
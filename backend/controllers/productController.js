const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		sucess: true,
		product,
	});
});

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
	const products = await Product.find();

	res.status(200).json({ sucess: true, products });
});

// Get Product Details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHander("Product not found", 404));
	}

	res.status(200).json({
		success: true,
		product,
	});
});

//Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(500).json({
			success: false,
			messge: "Product not found",
		});
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		sucess: true,
		product,
	});
});

//Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(500).json({
			success: false,
			messge: "Product not found",
		});
	}

	await product.remove();

	res.status(200).json({
		success: true,
		message: "Product deleted successfully",
	});
});

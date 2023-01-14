const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");

const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return next(new ErrorHander("Please login to access this resource", 401));
	}

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);

	//await User.findById(decodedData.not_id, just.id)
	req.user = await User.findById(decodedData.id);

	next();
});

exports.authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHander(
					`Role:${req.user.role} is not allowed to access this resouce`,
					403
				)
			);
		}

		next();
	};
};

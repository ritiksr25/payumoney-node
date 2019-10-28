const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		txnid: { type: String, required: true },
		amount: { type: Number, default: 0 },
		productinfo: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: Number },
		status: { type: String },
		payuMoneyId: { type: Number },
		mode: { type: String },
		addedon: { type: String },
		bank_ref_num: { type: Number }
	},
	{ timestamps: true }
);

module.exports = Payment = mongoose.model("Payment", PaymentSchema);

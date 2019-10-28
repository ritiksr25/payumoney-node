const crypto = require("crypto");
require("dotenv").config();

module.exports.index = (req, res) => {
	let key = process.env.PAYU_KEY,
		salt = process.env.PAYU_SALT,
		message = "Payment at Sample!!";
	let data = {
		key,
		salt,
		surl: "http://localhost:5000/response",
		furl: "http://localhost:5000/response",
		mode: "dropout",
		message
	};
	res.render("checkout", { data });
};

module.exports.getDetails = (req, res) => {
	let { txnid, amount, productinfo, firstname, email, phone } = req.body;
	let key = process.env.PAYU_KEY,
		salt = process.env.PAYU_SALT,
		sha = process.env.PAYU_SHA,
		message = "Payment at Sample!!";

	let hashSequence = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||${message}||||||${salt}`;
	let cryp = crypto.createHash(sha, hashSequence);
	cryp.update(hashSequence);
    let hash = cryp.digest("hex");
    console.log(hash);
	res.setHeader("Content-Type", "text/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({ data: hash });
};

module.exports.response = async (req, res) => {
	let {
		txnid,
		amount,
		firstname,
		email,
		status,
		payuMoneyId,
		mode,
		addedon,
		bank_ref_num
	} = req.body;
	let data = { ...req.body };
	await Payment.create(data);
	res.render("response", { data });
};

module.exports.payments = async (req, res) => {
	let data = await Payment.find().sort({ createdAt: "desc" });
	res.render("payments", { data });
};

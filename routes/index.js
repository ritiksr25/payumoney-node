const express = require("express");
const router = express();

let {
	index,
	getDetails,
	response,
	payments
} = require("../controllers/index_controller");

router.get("/", index);
router.post("/", getDetails);
router.post("/response", response);
router.get("/payments", payments);

module.exports = router;

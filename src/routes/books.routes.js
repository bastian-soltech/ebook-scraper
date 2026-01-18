const express = require("express");
const router = express.Router();
const {getAllCategory} = require("../controllers/books.controller");

router.get("/v1/all-category", getAllCategory);

module.exports = router;

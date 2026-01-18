const express = require("express");
const router = express.Router();
const {getAllCategory, getSubCategory} = require("../controllers/books.controller");

router.get("/v1/all-category", getAllCategory);
router.get("/v1/subcategory", getSubCategory);

module.exports = router;

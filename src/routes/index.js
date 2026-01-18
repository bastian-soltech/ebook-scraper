const express = require("express");
const router = express.Router();

router.use("/api/books",require('./books.routes'))

module.exports = router;
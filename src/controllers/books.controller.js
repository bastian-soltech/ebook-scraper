const {freeComBooks} = require("../services/books.service");

exports.getAllCategory = async(req, res) => {
    try {
        const result = await freeComBooks.getAllCategory();
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

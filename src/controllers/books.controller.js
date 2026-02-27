const booksService = require("../services/books.service");

exports.getAllCategory = async (req, res) => {
    try {
        const result = await booksService.getAllCategories();
        res.json(result);
    } catch (err) {
        console.error('[Controller] Error in getAllCategory:', err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.getSubCategory = async (req, res) => {
    try {
        const { categoryPath } = req.query;
        const result = await booksService.getSubCategory(categoryPath);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBookByCategory = async (req, res) => {
    try {
        const { subCategoryPath } = req.query;
        const result = await booksService.getBookByCategory(subCategoryPath);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBookByCategoryV2 = async (req, res) => {
    try {
        const { slug, page } = req.query;
        const result = await booksService.getBooksByCategoryV2(slug, page);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getDetailsBook = async (req, res) => {
    try {
        const { bookPath } = req.query;
        const result = await booksService.getBookDetail(bookPath);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.searchBook = async (req, res) => {
    try {
        const { q } = req.query;
        const result = await booksService.searchBook(q);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

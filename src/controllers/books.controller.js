
const {freeComBooks, dbooks} = require("../services/books.service");
exports.getAllCategory = async(req, res) => {
    
        // const result = await freeComBooks.getAllCategory();
        try{
const [FreeComBooks, Dbooks] = await Promise.allSettled([
            freeComBooks.getAllCategory(),
            dbooks.getAllCategory()
        ]);
        const result = [...FreeComBooks.value, ...Dbooks.value];
        res.json(result);
        }catch(err){
            console.error(err);
            res.status(500).json({error: err.message});


        }
        
       
    
}
exports.getSubCategory = async(req, res) => {
    try {
        const result = await freeComBooks.getSubCategory(req.query.categoryPath);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

    
}

exports.getBookByCategory = async(req, res) => {
    try {
        const result = await freeComBooks.getBookByCategory(req.query.subCategoryPath);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getDetailsBook = async(req, res) => {
    try {
        const result = await freeComBooks.getBookDetail(req.query.bookPath);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.searchBook = async(req, res) => {
    try {
        const result = await freeComBooks.searchBook(req.query.q);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}



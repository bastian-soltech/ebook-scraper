const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors')
const apiRoutes = require("./src/routes/index");
const compression = require("compression");

app.use(cors({origin:'*'}))
app.use(express.json());
app.use(compression());
app.use("/", apiRoutes)
    
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// const FreeComBooks = require("./src/scraper/targets/freecombooks");
// (async () => {
//     const freeComBooks = new FreeComBooks();

//     const mathCategory = await freeComBooks.getCategoryList("/eeCategory.html");
//     const mathDetailBooks = await freeComBooks.getBookDetail("/Ethical-Hacking-by-Gabriel-Rovesti.html");
//     const allCategory = await freeComBooks.getAllCategory();
//     console.log(allCategory);
//     // console.log(mathDetailBooks);
// })();

// https://z-lib.id/categories/ind
// https://ebook.twointomedia.com/



const FreeComBooks = require("./src/scraper/targets/freecombooks");

(async () => {
    const freeComBooks = new FreeComBooks();

    const mathCategory = await freeComBooks.getCategoryList("/eeCategory.html");
    const mathDetailBooks = await freeComBooks.getBookDetail("/Ethical-Hacking-by-Gabriel-Rovesti.html");
    const allCategory = await freeComBooks.getAllCategory();
    console.log(allCategory);
    // console.log(mathDetailBooks);
})();


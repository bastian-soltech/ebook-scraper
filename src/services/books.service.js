const FreeComBooks = require("../scraper/targets/freecombooks");
const Dbooks = require("../scraper/targets/Dbooks");

class BooksService {
    constructor() {
        this.freeComBooks = new FreeComBooks();
        this.dbooks = new Dbooks();
    }

    /**
     * Aggregates categories from all providers
     */
    async getAllCategories() {
        const results = await Promise.allSettled([
            this.freeComBooks.getAllCategory(),
            this.dbooks.getAllCategory()
        ]);

        const aggregated = results.reduce((acc, curr) => {
            if (curr.status === 'fulfilled' && Array.isArray(curr.value)) {
                return [...acc, ...curr.value];
            }
            return acc;
        }, []);

        return aggregated;
    }

    // Proxy methods to maintain existing API logic
    async getSubCategory(path) {
        return await this.freeComBooks.getSubCategory(path);
    }

    async getBookByCategory(path) {
        return await this.freeComBooks.getBookByCategory(path);
    }

    async getBooksByCategoryV2(slug, page) {
        return await this.dbooks.getBooksByCategory(slug, page);
    }

    async getBookDetail(path) {
        return await this.freeComBooks.getBookDetail(path);
    }

    async searchBook(query) {
        return await this.freeComBooks.searchBook(query);
    }
}

module.exports = new BooksService();

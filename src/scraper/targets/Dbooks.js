const fetcher = require("../../utils/fetcher");
const cheerio = require("cheerio");
const { PROVIDERS } = require("../../config/constants");

class Dbooks {
    constructor() {
        this.baseUrl = PROVIDERS.DBOOKS.BASE_URL;
        this.sourceName = PROVIDERS.DBOOKS.NAME;
    }

    async getAllCategory() {
        try {
            const data = await fetcher(`${this.baseUrl}`);
            const $ = cheerio.load(data);
            const listCategory = $("div.subject div.main").find("a");
            const result = [];

            listCategory.each((_, element) => {
                const subject = $(element).text().trim();
                const fullUrl = $(element).attr("href");
                if (fullUrl) {
                    const path = new URL(fullUrl).pathname;
                    const slug = path.replace('/subject/', '').replace('/', '');
                    result.push({ subject, slug, source: this.sourceName });
                }
            });
            return result;
        } catch (error) {
            console.error(`[Dbooks] Error in getAllCategory:`, error.message);
            return []; // Return empty array on failure to prevent crashing Promise.all
        }
    }

    async getBooksByCategory(slug, page = 1) {
        try {
            const data = await fetcher(`${this.baseUrl}subject/${slug}/${page}`);
            const $ = cheerio.load(data);
            const listBooks = $("div.main").find("div.wrap");
            const totalPages = $("p.pagination").find("a").length;

            const result = { books: [], totalPages };
            
            listBooks.each((_, element) => {
                const title = $(element).find("a").text().trim();
                const imageUrl = $(element).find("img").attr("data-src");
                
                if (imageUrl) {
                    const bookId = imageUrl.replace("/img/books/", "").replace(".jpg", "").replace("s", "");
                    result.books.push({ title, bookId, imageUrl });
                }
            });

            return result;
        } catch (error) {
            console.error(`[Dbooks] Error in getBooksByCategory:`, error.message);
            throw error;
        }
    }
}

module.exports = Dbooks;

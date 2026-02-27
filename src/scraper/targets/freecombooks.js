const fetcher = require("../../utils/fetcher");
const cheerio = require('cheerio');
const { getBrowser } = require("../browser");
const { PROVIDERS } = require("../../config/constants");

class FreeComBooks {
    constructor() {
        this.baseUrl = PROVIDERS.FREECOMBOOKS.BASE_URL;
        this.sourceName = PROVIDERS.FREECOMBOOKS.NAME;
    }

    async getAllCategory() {
        try {
            const data = await fetcher(`${this.baseUrl}/sitemap.html`);
            const $ = cheerio.load(data);
            const allSubject = $('a.categoryTitle');
            const result = [];

            allSubject.each((_, element) => {
                const subject = $(element).text().trim();
                const slug = $(element).attr("href");
                if (slug) {
                    result.push({ subject, slug, source: this.sourceName });
                }
            });
            return result;
        } catch (error) {
            console.error(`[FreeCom] Error in getAllCategory:`, error.message);
            return [];
        }
    }

    async getSubCategory(categoryPath) {
        const data = await fetcher(`${this.baseUrl}/${categoryPath}`);
        const $ = cheerio.load(data);
        const listSubject = $("div#subjects").find("a");
        const result = [];

        listSubject.each((_, element) => {
            const subject = $(element).text().trim();
            const subCategoryUrl = $(element).attr("href");
            if (subCategoryUrl) {
                result.push({ subject, subCategoryUrl });
            }
        });
        return result;
    }

    async getBookByCategory(subCategoryPath) {
        const data = await fetcher(`${this.baseUrl}/${subCategoryPath}`);
        const $ = cheerio.load(data);
        const listBooks = $("ul#newBooksL").find("li");

        const result = [];
        listBooks.each((_, element) => {
            const title = $(element).find("a").text().trim();
            const detailUrl = $(element).find("a").attr("href");
            const imgPath = $(element).find("img").attr("src");
            const imgUrl = imgPath ? `${this.baseUrl}/${imgPath}` : null;
            
            result.push({ title, detailUrl, imgUrl });
        });

        return result;
    }

    async getBookDetail(bookPath) {
        const data = await fetcher(`${this.baseUrl}/${bookPath}`);
        const $ = cheerio.load(data);
        const result = {
            info: {},
            downloadLinks: []
        };

        const bookInformation = $("div#booktitle ul li");
        const bookImage = $("td.imageColumn img").attr("src");
        
        if (bookImage) {
            result.info.image = `${this.baseUrl}/${bookImage}`;
        }

        bookInformation.each((_, el) => {
            const fullText = $(el).text().trim();

            if (fullText.includes(":")) {
                const splitText = fullText.split(":");
                const key = splitText[0].trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
                const value = splitText.slice(1).join(":").trim();

                if (key !== 'share_this') {
                    result.info[key] = value;
                }
            } else if (fullText.toLowerCase().includes("author")) {
                result.info.authors = fullText.replace(/author\(s\)/i, "").trim();
            }
        });

        const bookDescription = $("div#bookdesccontent p").eq(1).text().trim();
        result.info.description = bookDescription;

        const downloadList = $('#downloadLinks').nextAll('ul').first();
        downloadList.find('li a').each((_, el) => {
            result.downloadLinks.push({
                label: $(el).text().trim(),
                url: $(el).attr('href')
            });
        });

        return result;
    }

    async searchBook(q) {
        if (!q) {
            throw new Error('Search query (q) is required');
        }

        let browser = null;
        try {
            browser = await getBrowser();
            const page = await browser.newPage();

            const searchUrl = `${this.baseUrl}/search2.html?q=${encodeURIComponent(q)}`;
            await page.goto(searchUrl, { waitUntil: 'networkidle0' });
            await page.waitForSelector('.gsc-result', { timeout: 6000 });

            const results = await page.evaluate(() => {
                const data = [];
                const items = document.querySelectorAll('.gsc-webResult.gsc-result');

                items.forEach(item => {
                    const titleElement = item.querySelector('a.gs-title');
                    if (!titleElement) return;

                    const bookPath = new URL(titleElement.href).pathname.replace('/', '');
                    const detailElement = item.querySelector('.gs-snippet');
                    const imageElement = item.querySelector('img.gs-image');

                    data.push({
                        title: titleElement.innerText.trim(),
                        slug: bookPath,
                        url: bookPath,
                        image: imageElement ? imageElement.src : null,
                        detail: detailElement ? detailElement.innerText.trim() : ''
                    });
                });
                return data;
            });

            return results;
        } catch (error) {
            console.error('[FreeCom] Error in searchBook:', error.message);
            return [];
        } finally {
            if (browser) await browser.close();
        }
    }
}

module.exports = FreeComBooks;

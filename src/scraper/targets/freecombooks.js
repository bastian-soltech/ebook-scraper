
const fetcher = require("../fetcher");
const cheerio = require('cheerio')
class FreeComBooks {
    constructor(){
        this.baseUrl = "https://freecomputerbooks.com";   
    }
    async getAllCategory(){
    const data = await fetcher(`${this.baseUrl}/sitemap.html`);
    const $ = cheerio.load(data);
    const allSubject = $('a.categoryTitle');
    const result = [];
    allSubject.each((index, element) => {
        const subject = $(element).text();
        const url = $(element).attr("href");
        result.push({subject, htmlPath});
    });
    return result;
   }

   async getSubCategory(htmlPath){
    const data = await fetcher(`${this.baseUrl}/${htmlPath}`);
    const $ = cheerio.load(data);
    const listSubject = $("div#subjects").find("a");
    const result = [];
    listSubject.each((index, element) => {
        const subject = $(element).text();
        const url = $(element).attr("href");
        result.push({subject, url});
    });
    return result;
   }

  
   async getBookByCategory(htmlPath){
    const data = await fetcher(`${this.baseUrl}${htmlPath}`);
    const $ = cheerio.load(data);
    const listBooks = $("ul#newBooksL").find("li");
    
    const result = [];
    listBooks.each((index, element) => {
        const title = $(element).find("a").text();
        const detailUrl = $(element).find("a").attr("href");
        const imgUrl = this.baseUrl + $(element).find("img").attr("src");
        result.push({title, detailUrl, imgUrl});
    });
   
    return result;
   }

  async getBookDetail(htmlPath) {
    const data = await fetcher(`${this.baseUrl}/${htmlPath}`);
    const $ = cheerio.load(data);
    const result = {
        info: {},
        downloadLinks: [] 
    };
 
    const bookInformation = $("div#booktitle ul li");
    bookInformation.each((i, el) => {
        const fullText = $(el).text().trim();
        
    
        if (fullText.includes(":")) {
            const splitText = fullText.split(":");
            const key = splitText[0].trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
            const value = splitText.slice(1).join(":").trim(); // Menangani jika ada ":" di dalam teks
            
            if (key !== 'share_this') {
                result.info[key] = value;
            }
        } else {
            if (fullText.toLowerCase().includes("author")) {
                result.info.authors = fullText.replace(/author\(s\)/i, "").trim();
            }
        }
    });
    const bookDescription = $("div#bookdesccontent p").eq(1).text().trim();
    result.info.description = bookDescription;
    const downloadList = $('#downloadLinks').nextAll('ul').first();
    downloadList.find('li a').each((i, el) => {
        result.downloadLinks.push({
            label: $(el).text().trim(),
            url: $(el).attr('href')
        });
    });

    return result;
}
  
}

module.exports = FreeComBooks;
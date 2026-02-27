# 📚 E-Book Scraper API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

A powerful and clean RESTful API designed to fetch electronic book (E-Book) data from various popular sources in real-time. This project is built using **Clean Architecture** principles to ensure the code is maintainable, scalable, and easy to understand.

## ✨ Key Features

- 🚀 **Multi-Source Aggregation**: Seamlessly combines data from Dbooks.org and FreeComputerBooks.
- 🔍 **Dynamic Search**: Advanced book search powered by Puppeteer for highly accurate results.
- 📂 **Categorized Browsing**: Structured navigation through various categories and sub-categories.
- ⚡ **Performance Optimized**: Utilizes `Promise.allSettled` for parallel data fetching and Gzip compression for faster responses.
- 🛠️ **Clean Code**: Clear separation of concerns between Controllers, Services, and Scrapers.

## 🏗️ Project Structure

```text
src/
├── config/         # Global configuration & constants
├── controllers/    # Request handling & response logic
├── routes/         # API endpoint definitions
├── services/       # Business logic & data aggregation
├── scraper/        
│   ├── targets/    # Provider-specific scraping implementations
│   └── browser.js  # Browser configuration (Puppeteer)
└── utils/          # Functional helpers (Fetcher)
```

## 🚀 Installation & Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/bastian-soltech/ebook-scraper.git
   cd ebook-scraper
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run in Development Mode**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

## 📖 API Documentation

All endpoints are GET-based and return responses in JSON format.

### v1 (FreeComBooks & Aggregated)
| Endpoint | Parameters | Description |
| :--- | :--- | :--- |
| `/api/books/v1/all-category` | - | Fetches all categories from all available sources. |
| `/api/books/v1/subcategory` | `categoryPath` | Fetches sub-categories for a specific category path. |
| `/api/books/v1/get-books` | `subCategoryPath` | Lists books within a specific sub-category. |
| `/api/books/v1/detail` | `bookPath` | Fetches full book details including download links. |
| `/api/books/v1/search` | `q` | Performs a global search for books. |

### v2 (Dbooks)
| Endpoint | Parameters | Description |
| :--- | :--- | :--- |
| `/api/books/v2/get-books` | `slug`, `page` | Fetches books from Dbooks with pagination support. |

## 🛠️ Tech Stack

- **Framework:** [Express.js](https://expressjs.com/) (v5)
- **Scraping:** [Cheerio](https://cheerio.js.org/) & [Puppeteer](https://pptr.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Runtime:** Node.js
- **Deployment Ready:** Optimized for Vercel with `@sparticuz/chromium`

## 🤝 Contributing

Contributions are always welcome! If you want to add a new book provider or fix a bug:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

---
Built with ❤️ by [Bastian](https://github.com/bastian-soltech)

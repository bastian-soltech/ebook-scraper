const axios = require("axios");

/**
 * Common fetcher to get HTML content from a URL
 * @param {string} url 
 * @returns {Promise<string>}
 */
const fetcher = async (url) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 10000 // 10s timeout
        });
        return data;
    } catch (error) {
        console.error(`Error fetching URL: ${url}`, error.message);
        throw new Error(`Failed to fetch data from source: ${error.message}`);
    }
}

module.exports = fetcher;

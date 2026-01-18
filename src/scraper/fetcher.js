const axios = require("axios");

const fetcher = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = fetcher;

const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const { CHROMIUM } = require("../config/constants");

const isProduction = process.env.NODE_ENV === 'production';
chromium.setGraphicsMode = false;

/**
 * Utility to handle puppeteer browser instances
 */
const getBrowser = async () => {
    return await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: isProduction
            ? await chromium.executablePath()
            : CHROMIUM.EXECUTABLE_PATH,
        headless: isProduction ? chromium.headless : false,
    });
};

module.exports = { getBrowser };

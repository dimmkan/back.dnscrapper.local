const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        console.log("Открывается браузер......");
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--disable-setuid-sandbox", "--disable-notifications", "--start-maximized"],
            ignoreHTTPSErrors: true
        });
    } catch (err) {
        console.log("Не удалось создать экземпляр браузера => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};
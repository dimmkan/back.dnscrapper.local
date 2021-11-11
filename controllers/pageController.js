const pageScraper = require('../scrappers/pageScrapper');
async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        return await pageScraper.scraper(browser);
    }
    catch(err){
        console.log("Не удалось запустить экземпляр браузера => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
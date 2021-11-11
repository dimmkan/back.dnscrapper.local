const scraperObject = {
    url: process.env.URL,
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url, {waitUntil: 'networkidle2'})
        await page.waitForSelector('div.product-buy__price product-buy__price_active')
        const price = await page.$eval('.product-buy__price product-buy__price_active', text => text.textContent);
        console.log(price)
    }
}


module.exports = scraperObject;
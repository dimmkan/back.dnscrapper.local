const userAgent = require('user-agents')
const useragent = new userAgent(/Safari/, {"deviceCategory": "desktop"});
const fs = require('fs')


const scraperObject = {
    url: process.env.URL,
    async scraper(browser) {
        const resultObject = {
            price: 0,
            shops: []
        }
        let page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (request.resourceType() === 'image') request.abort();
            else request.continue();
        });
        await page.setUserAgent(useragent.toString())
        console.log(`Переход на ${this.url}`)
        await page.goto(this.url, {waitUntil: 'domcontentloaded'})
        const cityButton = page.$('a.btn.btn-additional')
        if(cityButton){
            await page.click('a.btn.btn-additional')
        }
        await page.waitForSelector('div.product-buy__price.product-buy__price_active')
        resultObject.price = await page.$eval('div.product-buy__price.product-buy__price_active', el => {
            const price = el.innerText
            const priceArr = price.split('₽')
            if(priceArr.length){
                return +priceArr[0].replace(' ', '')
            }
            return 0
        })
        console.log('price', resultObject.price)
        await page.waitForSelector('div.order-avail-wrap')
        const inStock = await page.$eval('div.order-avail-wrap', el => {
            return el.innerText
        })
        if(inStock !== "Товара нет в наличии"){
            console.log('in stock')
            const click = await page.$('div.order-avail-wrap > a')
            if(click){
                await page.click('div.order-avail-wrap > a')
                console.log('click')
                await page.waitForTimeout(5000)
                console.log('load modal')
                await page.waitForSelector('div.base-shop-choose-list.vue-shop-avail__shops-list')
                await page.waitForSelector('div.base-shop-choose-list__item-list > div.base-shop-view.base-shop-choose-list__shop.base-shop-choose-list__shop-btn > div.base-shop-view__issue-date')
                const shopArray = await page.$$('div.base-shop-choose-list.vue-shop-avail__shops-list > div.base-shop-choose-list__item-list > div.base-shop-view.base-shop-choose-list__shop.base-shop-choose-list__shop-btn')
                for(const content of shopArray){
                    const count = await content.$eval('div.base-shop-view__issue-date', el => {
                        return el.innerText
                    })
                    if(count !== 'нет в наличии'){
                        const shop = await content.$eval('div.base-shop-view__title', el => {
                            return el.innerText
                        })
                        resultObject.shops.push(shop)
                    }
                }
            }

        }
        browser.close()
        console.log('Браузер закрыт')
        return resultObject
    }
}


module.exports = scraperObject;
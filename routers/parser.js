const router = require('express').Router();
const browserObject = require('../utils/browser');
const scraperController = require('../controllers/pageController');

router.get('/', (req, res) => {
    console.log(1)
    let browserInstance = browserObject.startBrowser();
    scraperController(browserInstance)
});

module.exports = router
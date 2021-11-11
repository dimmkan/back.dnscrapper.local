const router = require('express').Router();
const browserObject = require('../utils/browser');
const scraperController = require('../controllers/pageController');

router.get('/', async (req, res) => {
    try{
        let browserInstance = browserObject.startBrowser();
        const obj = await scraperController(browserInstance)
        res.status(200).json({obj})
    }catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
});

module.exports = router
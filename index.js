//dunzo parcel price getter automation
const puppeteer = require('puppeteer')
const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware 
const cheerio = require('cheerio');
const axios = require('axios');
const { raw } = require('body-parser');

var urlForZomato = `https://www.bing.com/maps?q=chemist+shops+in%20400009`;
// urlForZomato = urlForZomato.split(' ').join('+')

app.set('view engine', 'ejs');
// app.set('views', './');

var urlForSwiggy, urlForZomato;
var extractLinksOfSwiggy, extractLinksOfZomato, matchedDishes = {};
var matchedDishesForSwiggy, matchedDishesForZomato, tempAddress, discCodesForZomato, addr, linkOld = '';
var z, s, w;
var sdfd, tempurl, tempurl2;
var Offers = 0;
var final = [];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var newItem;
// Route to Login Page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/result', async (req, res) => {
    // Insert Login Code Here   
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
      

    })
    const page = await browser.newPage();

    await page.setViewport({
        width: 1240,
        height: 880,
        deviceScaleFactor: 1,
      });

    await page.goto(`https://www.netmeds.com/prescriptions/crocin-650mg-tablet-15-s`);
    
    try {
        await page.evaluate(() => {
            document.querySelector('button[title="ADD TO CART"]').click();
        });
        await page.evaluate(() => {
            document.querySelector('button[class="mc_cartBtn"]').click();
        });
        console.log("Added to cart");
        await page.waitForTimeout(1000);
    } catch (error) {
        console.log(error);
    }
});

const port = process.env.PORT || 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));

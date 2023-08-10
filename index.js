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

        const browser = await puppeteer.launch({ headless: false });
    
        const page = await browser.newPage();
        await page.goto('https://quotes.toscrape.com/search.aspx');
    
        await page.waitForSelector('#author');
        await page.select('#author', 'Albert Einstein');
    
        await page.waitForSelector('#tag');
        await page.select('#tag', 'learning');
    
        await page.click('.btn');
        await page.waitForSelector('.quote');
    
        // extracting information from code
        let quotes = await page.evaluate(() => {
    
            let quotesElement = document.body.querySelectorAll('.quote');
            let quotes = Object.values(quotesElement).map(x => {
                return {
                    author: x.querySelector('.author').textContent ?? null,
                    quote: x.querySelector('.content').textContent ?? null,
                    tag: x.querySelector('.tag').textContent ?? null,
    
                }
            });
    
            return quotes;
    
        });
    
        // logging results
        console.log(quotes);
        await browser.close();
    
    
});

const port = process.env.PORT || 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));

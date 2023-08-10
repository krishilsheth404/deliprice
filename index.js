//dunzo parcel price getter automation
const puppeteer = require('puppeteer')
const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware 
const cheerio = require('cheerio');
const axios = require('axios');
const { raw } = require('body-parser');
const { google } = require('reverse-image-search');

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
    const nameOfMed = req.body.dataOfMed + '\n';



    // Fetching HTML

    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]

    })
    const page = await browser.newPage();


    console.log('typeing')
    try {
        
        await page.goto(`https://yandex.com/images/search?rpt=imageview&url=https://i.imgur.com/XLXBB9z.jpg`);
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);


        const $ = cheerio.load(data, { xmlMode: false });
        
        $('.CbirSection-Title').map((i, elm) => {
           if($(elm).text()=="Image appears to contain"){
            console.log('yes')


               $(elm).next().map((i, elm) => {
                   console.log($(elm).text());
               });
           }
        });
        
    

        // await page.$eval(('img[class=img-responsive]'), node => node.src);
    } catch (e) {
        console.log(e);
    }
    // await page.type('input[placeholder=Enter Image URL]');

    // try {
    //     const data = await page.evaluate(() => document.querySelector('*').outerHTML);

    //     var $ = cheerio.load(data);
    //     console.log($.html())
    //     await page.waitForSelector('.tit');
    //     $('.tit').map(async (i, elm) => {
    //         console.log($(elm).text());
    //     })//for city
    //     await browser.close();

    // } catch (error) {
    //     console.log(error)
    // }








    // const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    //     console.log("got the link for zomato");
    // console.log(data)
    // await page.close();
    // const data=await axios.get(url);
    // Using cheerio to extract <a> tags
    // const $ = cheerio.load(data);
    // console.log($.html())



    console.log('final---' + z);

});

const port = process.env.PORT || 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));

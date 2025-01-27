import puppeteer from "puppeteer";

async function start() {

    const url = `https://books.toscrape.com/`;
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url);

    await browser.close();
}

start();
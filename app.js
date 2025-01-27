import puppeteer from "puppeteer";

async function start() {

    const url = `https://books.toscrape.com/`;
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url);

    let posts = await page.evaluate(()=>{
        let items = [];
        document.querySelectorAll('li > article > h3 > a').forEach((item)=>{
            let post = {'titulo' : item.title};
            items.push(post);
        });
        document.querySelectorAll('.price_color').forEach((item, i)=>{
            items[i].preco = item.textContent
            // items.push({preço: item.textContent});
        });

        return items;
    });

    console.log(posts);

    await browser.close();
};

start();
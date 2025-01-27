import puppeteer from "puppeteer";
import fs from 'node:fs';

async function start() {

    const url = `https://books.toscrape.com/`;
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url);

    let posts = await page.evaluate(()=>{

        let items = [];

        document.querySelectorAll('li > article > h3 > a').forEach((item)=>{
            let post = {'title' : item.title};
            items.push(post);
        });

        document.querySelectorAll('.price_color').forEach((item, i)=>{
            items[i].price = item.textContent
        });

        return items;
    });

    
    await posts.forEach((post)=>{

        let data = `titulo: ${post.title}\npreço: ${post.price}\n--------------------------------\n`;

        fs.appendFile('posts.txt',data , (err)=>{
            if(err){
    
                console.error(err);
            }else{
                console.log('salvo com sucesso.');
            };
    
        });
    });


    await browser.close();
};

start();
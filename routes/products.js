const express = require('express'); // use express
const routes = express.Router(); // importing Router ()
const Products = require('../models/Products');  // importing model of your collection
const axios = require('axios');
const cheerio = require('cheerio');

function daysBetweenDates(date1, date2) {
    const differenceInMilliseconds = date2.getTime() - date1.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    return differenceInDays;
}

const webScraping = async(keyWord)=>{

    try {
        
        const array = [];
            
        // Flipkart Website 
        const Flipkarturl = `https://www.flipkart.com/search?q=${keyWord}`;
        var { data } = await axios.get(Flipkarturl);
        var $ = cheerio.load(data);
        const flipkartTitle = $('._4rR01T:first').text();
        const flipkartRating = $('._3LWZlK:first').text();
        let flipkartReviewCount = $('._2_R_DZ:first span').eq(3).text();
        const index = flipkartReviewCount.indexOf(' ');
        flipkartReviewCount = flipkartReviewCount.substring(0,index);
        let flipkartPrice = $('._30jeq3:first').text();
        const flipkartCurrency = flipkartPrice[0];
        flipkartPrice=flipkartPrice.substring(1);
        flipkartPrice=flipkartPrice.replaceAll(',','');
        flipkartPrice = parseInt(flipkartPrice);
        if(flipkartCurrency==="$"){
            flipkartPrice*=83.29;
        }
        array.push({"title":flipkartTitle, "url":Flipkarturl, "total_review_count":flipkartReviewCount, "rating":flipkartRating,"price":flipkartPrice,"currency":flipkartCurrency,"webSite":"Flipkart"});
        console.log(array.length);

        // Ebay Website
        const ebayUrl = `https://www.ebay.com/sch/i.html?_nkw=${keyWord}`;
        var { data } = await axios.get(ebayUrl);
        var $ = cheerio.load(data);
        const ebayTitle= $('.s-item__title span:eq(2)').text();    
        let ebayPrice = $('.s-item__price:eq(1)').text();
        const ebayInnerUrl = $('.s-item__link:eq(1)').attr('href');
        var { data } = await axios.get(ebayInnerUrl);
        var $ = cheerio.load(data);
        const ebayRatting = $('.fdbk-detail-seller-rating__value:first').text();
        let ebayRevewCount = $('.SECONDARY').text();
        ebayRevewCount = ebayRevewCount.substring(1,ebayRevewCount.length-1);
        const ebayCurrency = ebayPrice[0];

        ebayPrice=ebayPrice.substring(1);
        ebayPrice=ebayPrice.replaceAll(',','');
        ebayPrice = parseInt(ebayPrice);

        if(ebayCurrency==="$") ebayPrice*=83.29;

        array.push({"title":ebayTitle, "url":ebayUrl, "total_review_count":ebayRevewCount, "rating":ebayRatting,"price":ebayPrice,"currency":ebayCurrency,"webSite":"Ebay"});
        console.log(array.length);
        
        // SnapDeal website
        const snapdealUrl = `https://www.snapdeal.com/search?keyword=${keyWord}`;
        var { data } = await axios.get(snapdealUrl);  
        var $ =  cheerio.load(data);
        const snapdealTitle= $('.product-title:eq(1)').text();
        let snapdealPrice= $('.product-price-row:eq(1)').text();
        let snapdealReviews = $('.product-rating-count:eq(1)').text();
        const snapdealinnerUrl = $('.product-desc-rating:eq(1) a').attr('href');
        var { data } = await axios.get(snapdealinnerUrl);  
        var $ = cheerio.load(data);
        let sanpdealRating = $('.avrg-rating:first').text();  

        const p=snapdealPrice.split(' ');
        snapdealPrice = p[3];
        snapdealPrice = snapdealPrice.replace(',','');
        snapdealPrice = parseInt(snapdealPrice);
        snapdealReviews = snapdealReviews.substring(1,snapdealReviews.length-1);
        sanpdealRating = sanpdealRating.substring(1,sanpdealRating.length-1);
        array.push({"title":snapdealTitle, "url":snapdealUrl, "total_review_count":snapdealReviews, "rating":sanpdealRating,"price":snapdealPrice,"currency":"₹","webSite":"Snapdeal"});

        console.log(array.length);

        // ShopClues Website
        const shopcluesUrl = `https://www.shopclues.com/search?q=${keyWord}`;    
        var { data } = await axios.get(shopcluesUrl);  
        var $ = cheerio.load(data);
        const shopcluesTitle= $('.search_blocks:eq(1) h2').text();
        let shopcluesPrice= $('.search_blocks:eq(1) .p_price').text() || 0;
        const shopcluesInnerUrl = $('.search_blocks:eq(1) a').attr('href');
        var { data } = await axios.get(shopcluesInnerUrl);  
        var $ = cheerio.load(data);
        let temp = $('.ratings:first').text();
        temp = temp.split(" ");
        const shopcluesRating = temp[0];
        const shopcluesReviews = temp[1].substring(1,temp[1].length-1);
        const shopcluesCurrency = shopcluesPrice[0];
        shopcluesPrice = shopcluesPrice.substring(1);
        shopcluesPrice = shopcluesPrice.replaceAll(',','');
        shopcluesPrice = parseInt(shopcluesPrice);
        
        if(shopcluesCurrency==="$") shopcluesPrice*=83.29;
        array.push({"title":shopcluesTitle, "url":shopcluesUrl, "total_review_count":shopcluesReviews, "rating":shopcluesRating,"price":shopcluesPrice,"currency":shopcluesCurrency,"webSite":"Shopclues"});

        console.log(array.length);
        // Zappos Website
        const zapposUrl = `https://www.zappos.com/red-pant/.zso?t=${keyWord}`;
        var { data } = await axios.get(zapposUrl);  
        var $ = cheerio.load(data);
        const zapposTitle= $('.Dl-z:eq(1)').text();
        let zapposPrice= $('.Yfa-z:eq(1)').text();
        const zapposRating = $('.MS-z:eq(1)').text();
        let zapposReviews = $('.NS-z:eq(1)').text();
        zapposReviews = zapposReviews.substring(1,zapposReviews.length-1);
        const zapposCurrency = zapposPrice[0];
        zapposPrice = zapposPrice.substring(1);
        zapposPrice = zapposPrice.replaceAll(',','');
        zapposP66rice = parseInt(zapposPrice) || 0;

        if(zapposCurrency==="$") zapposPrice*=83.29;
        array.push({"title":zapposTitle, "url":zapposUrl, "total_review_count":zapposReviews, "rating":zapposRating,"price":zapposPrice,"currency":zapposCurrency,"webSite":"Zappos"});

        console.log(array.length);

        await Products.create({
            keyWord,
            websiteArray:array
        });
    } catch (error) {
        console.log(error);   
    }
}

routes.get('/search', async (req, res) => {
    let keyWord = req.query.keyWord;
    try {         
        keyWord = keyWord.replaceAll(' ', '+');
        keyWord = keyWord.toLowerCase();
        let filter = req.query.filter || "low_price";
        let top = req.query.top || 2;
        top=parseInt(top);   

        let result;
        var order = -1;      
        var filterType = "websiteArray.price"      
        // console.log(filterType);
        if(filter==="high_price") {  
            filterType="websiteArray.price"; order=-1;
        }
        else if(filter==="low_price") {    
            filterType="websiteArray.price"; order=1;
        }
        else if(filter==="high_rating") {
            filterType="websiteArray.rating"; order=-1;
        }


        result = await Products.aggregate([
            {$match:{keyWord}},
            { $unwind: "$websiteArray" },
            {$sort:{[filterType]:order}},
            {
                $group: {    
                  _id: "$_id",
                  keyWord: { $first: "$keyWord" },
                  date: { $first: "$date" },
                  websiteArray: { $push: "$websiteArray" },
                  __v: { $first: "$__v" }
                }
            },
            {
                $project: {
                  _id: 1,
                  keyWord: 1,
                  date: 1,
                  websiteArray: { $slice: ["$websiteArray", top] },
                  __v: 1
                }
            },
            
        ]);
        
        result=result[0];
        
        if (result) {
            var productDate = result.date;
            var presentDate = new Date();
            const numberOfDays = daysBetweenDates(productDate, presentDate);
            if(numberOfDays<7){
                res.json(result);
            }
            else{
                const result = await Products.deleteOne({keyWord});
                const products =await webScraping(keyWord);    
                result = await Products.aggregate([
                    {$match:{keyWord}},
                    { $unwind: "$websiteArray" },
                    {$sort:{[filterType]:order}},
                    {
                        $group: {    
                          _id: "$_id",
                          keyWord: { $first: "$keyWord" },
                          date: { $first: "$date" },
                          websiteArray: { $push: "$websiteArray" },
                          __v: { $first: "$__v" }
                        }
                    },
                    {
                        $project: {
                          _id: 1,
                          keyWord: 1,
                          date: 1,
                          websiteArray: { $slice: ["$websiteArray", top] },
                          __v: 1
                        }
                    },
                    
                ]);
                
                result=result[0];
                res.json(result);
            }
        }   
        else {  
            const products =await webScraping(keyWord);
            result = await Products.aggregate([
                {$match:{keyWord}},
                { $unwind: "$websiteArray" },
                {$sort:{[filterType]:order}},
                {
                    $group: {    
                      _id: "$_id",
                      keyWord: { $first: "$keyWord" },
                      date: { $first: "$date" },
                      websiteArray: { $push: "$websiteArray" },
                      __v: { $first: "$__v" }
                    }
                },
                {
                    $project: {
                      _id: 1,
                      keyWord: 1,
                      date: 1,
                      websiteArray: { $slice: ["$websiteArray", top] },
                      __v: 1
                    }
                },
                
            ]);
            
            result=result[0];
            res.json(result);
        }       

    } catch (error) {   
        console.log(error);
           
    }
})


module.exports = routes;







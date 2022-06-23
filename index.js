const PORT = process.env.PORT || 4000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const newspapers  = [
    {
        name:'worldairlinenews',
        address: 'https://worldairlinenews.com/', 
        base:''
    },
    {
        name:'breakingtravelnews',
        address: 'https://www.breakingtravelnews.com/news/category/airline/',
        base: ''
    },
    {
        name:'cnbc',
        address: 'https://www.cnbc.com/airlines/',
        base: ''
    },
    {
        name:'skift',
        address: 'https://skift.com/airlines/',
        base: ''
    },
    {   name:'indiatimes',
        address: 'https://economictimes.indiatimes.com/industry/transportation/airlines-/-aviation',
        base: ''
    },
    {
        name:'usatoday',
        address: 'https://www.usatoday.com/travel/airline-news/',
        base: ''
    }

    
]

const articles = []

newspapers.forEach((newspaper) => {
    axios.get(newspaper.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("airline")', html).each(function (){
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })

        })


    }).catch((err) => console.log(err))
})


app.get('/', (req, res) => {
    res.json ('Welcome to Airline Travel News')
})

app.get('/news', (req, res) => {
   // axios.get('https://www.newsnow.co.uk/h/Industry+Sectors/Airlines')
   // .then((response)=>{
   //     const html = response.data
   //    const $ = cheerio.load(html)
//
   //    $('a:contains("airline")', html).each(function(){
   //         const title = $(this).text()
   //         const url = $(this).attr('href')
   //         articles.push({
   //             title,
   //             url
   //         })
   //    })
           res.json(articles)
   // }).catch((err) => console.log(err))

})

app.get('/news/:newspaperId', (req, res) =>{
    const newspaperId = req.params.newspaperId
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

    //console.log(newspaperAddress)
    axios.get(newspaperAddress)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const specificArticles = []

        $('a:contains("airline")', html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')
            someArticles.push({
                title,
                url: newspaperBase + url,
                source: newspaperId
            })
        })
        res.json(someArticles)
    }).catch(err => console.log(err))
})



app.listen(PORT, () => console.log(`Server running on ${PORT}`))
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const HOST = 'localhost'
const PORT = 8000
app.listen(PORT, HOST, () => {console.log('Success! Server is running http://localhost:8000')})
const postsPath = path.join(__dirname, "posts.json")
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))


app.get('/timestamp', (req, res) => {
    console.log('New GET request')
    res.json(getDate())
})
app.get('/posts',(req, res) => {
    console.log(posts)
    res.json(posts)
})

const moment = require('moment')
function getCurrentDay(){console.log(moment().format('dddd'))} 
function getCurrentMonth(){console.log(moment().format('MMMM'))}
function getCurrentYear(){console.log(moment().format('YYYY'))} 
function getDate(){console.log(moment().format('YYYY/DD/MM HH:mm:ss'))}
getDate()

function getCurrentWeekday(){console.log(moment().format('dddd'))}
getCurrentWeekday() 
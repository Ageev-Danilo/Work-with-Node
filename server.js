const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')
const express = require('express')
const app = express()
const HOST = 'localhost'
const PORT = 8000
app.use(express.json)

const postsPath = path.join(__dirname, "posts.json")
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

app.get('/posts/:id', (req, res) => {
    const id = +req.params.id
    if (isNaN(id)){
        res.status(400).json("Id is not Number")
        return
    }

    const searchedPost = posts.find((somePost) => { 
        return somePost.id === id
    })
    if (!searchedPost) {
        res.status(404).json("There is no post")
        return
    }
    res.status(200).json(searchedPost)
})

app.get('/timestamp', (req, res) => {
    console.log('New GET request')
    res.json(getDate())
})
app.get('/posts', (req, res) => {
    const take = req.query.take
    const skip = req.query.skip
    if(!take && !skip){
        res.status(200).json(posts)
        return
    }
    if(isNaN(+take)){
        if(typeof(+take) != undefined){
            res.status(400).json(typeof(take))
            return
        }
        return
    }
    if(isNaN(+skip)){
        if(typeof(+skip) != undefined){
            res.status(400).json("Skip is not a Number")
            return
        }
        return
    }
    const slicedPosts = posts.slice(+skip, +take)
    res.status(200).json(slicedPosts)
    console.log(slicedPosts)
})

app.post('/posts',async  (req, res) => {
    const body = req.body
    if(!body){
        res.status(422).json('There is no body!')
        return
    }
    const newPost = {...body, id: posts.length + 1}
    if(!newPost.name){
        res.status(422).json('There is no name!')
        return
    }
    if(!newPost.description){
        res.status(422).json('There is no description!')
        return
    }
    if(!newPost.image){
        res.status(422).json('There is no image!')
        return
    }
    try {
        posts.push(newPost)
        await fsPromises.writeFile(postsPath, JSON.stringify(newPost))
        res.status(201).json(newPost)
    } catch (error) {
        console.log(error)
        res.status(500).json('A problem with product creation has occured.')
    }
})

app.listen(PORT, HOST, () => {console.log('Success! Server is running http://localhost:8000')})
const moment = require('moment')
const { promises } = require('dns')
function getCurrentDay(){console.log(moment().format('dddd'))} 
function getCurrentMonth(){console.log(moment().format('MMMM'))}
function getCurrentYear(){console.log(moment().format('YYYY'))} 
//function getDate(){console.log(moment().format('YYYY/DD/MM HH:mm:ss'))}
//getDate()

//function getCurrentWeekday(){console.log(moment().format('dddd'))}
//getCurrentWeekday() 
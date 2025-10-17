
import { PostRouter } from "./Post/post.router"
import express from "express"
const app = express()
const HOST = 'localhost'
const PORT = 8000
app.use(express.json())
app.use(PostRouter)

app.listen(PORT, HOST, () => {console.log('Success! Server is running http://localhost:8000')})

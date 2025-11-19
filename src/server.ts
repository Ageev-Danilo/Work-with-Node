import { TagRouter } from "./Tag/tag.router"
import { PostRouter } from "./Post/post.router"
import { UserRouter } from "./User/user.router"
import express from "express"
const app = express()
const HOST = 'localhost'
const PORT = 8000
app.use(express.json())
app.use(PostRouter)
app.use(TagRouter)
app.use(UserRouter)
app.listen(PORT, HOST, () => {console.log('Success! Server is running http://localhost:8000')})

import testImgRouter from './routers/test_img.js'
import userRouter from './routers/users.js'
import fileUpload from 'express-fileupload'
import testRouter from './routers/test.js'
import express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
dotenv.config()
const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(userRouter)
app.use(testRouter)
app.use(testImgRouter)

app.use((error,req,res,next) => {
    if(error.status != 500){
        return res.status(error.status).json({
            status: error.status,
            massage: `${error.name} : ${error.massage}`,
            data: null,
            token: null
        })
    }
    fs.appendFileSync(
        path.join(process.cwd(), 'src', 'log.txt'),
        `${req.method}___${req.url}___${Date.now()}___${error.name}___${error.massage}\n`
    )

    res.status(error.status).json({
        status: error.status,
        message: 'Internal Server Error',
        data: null,
        token: null
    })

    process.exit()
})
app.listen(PORT,()=>console.log(`Server is run... `))

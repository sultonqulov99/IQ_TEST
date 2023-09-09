import pool from '../config/db.js'
import path from 'path'
import {InternalServerError} from "../utils/errors.js"

const POST_QUESTION_IMG = async(req,res,next) => {
    try {
        let {file} = req.files
        let img = Date.now() + file.name.replace(/\s/g,'')

        const {question_text,question_test_id,correct_answer} = req.body
        
        let questionImg = await pool.query(`INSERT INTO question_img(img,question_text,question_test_id,correct_answer) VALUES ($1,$2,$3,$4) RETURNING * `,
        [img,question_text,question_test_id,correct_answer])
        
        file.mv(path.join(process.cwd(),'src','uploads',img))
        return res.status(201).json({
            status:201,
            massage:"Img question succasfully added",
            data:questionImg.rows
        })
    } catch (error) {
        console.log(error);
        return next(new InternalServerError(500,error.massage))
    }
}
const POST_ANSWER_IMG = async(req,res,next) =>{
    try {
        let {question_img_id,chosen_answer} = req.body
        let answer = await pool.query(`INSERT INTO answer_img(question_img_id,chosen_answer) VALUES
        ($1,$2) RETURNING *`,[question_img_id,chosen_answer])

      return res.status(201).json({
          status:201,
          massage:"Img question answer succasfully added",
          data:answer.rows
      })
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}


export default {
    POST_QUESTION_IMG,POST_ANSWER_IMG
}
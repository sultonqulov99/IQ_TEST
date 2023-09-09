import pool from '../config/db.js'
import {InternalServerError} from "../utils/errors.js"

const POST_QUESTION = async(req,res,next) => {
    try {
        const {level,test_text,subject_id,correct_answer} = req.body
        let test = await pool.query(`INSERT INTO question_test(level,test_text,subject_id,correct_answer) VALUES
          ($1,$2,$3,$4) RETURNING *`,[level,test_text,subject_id,correct_answer])
            
        return res.status(201).json({
            status:201,
            massage:"Test succasfully added",
            data:test.rows
        })
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}
const POST_ANSWER = async(req,res,next) =>{
    try {
        let {id} = req.params
        let {question_test_id,chosen_answer} = req.body
        let test = await pool.query(`SELECT * FROM question_test WHERE id = '${question_test_id}'`)
        let isCorrect = test.rows[0].correct_answer
    
        
        let key_ball = await pool.query(`SELECT * FROM key_ball WHERE user_id = ${id}`)
        key_ball = key_ball.rows[0]
        let user_id = 0
        let key = key_ball.key + 1
        let ball = key_ball.ball + 5

        if(isCorrect == chosen_answer){
            let bal = await pool.query(`UPDATE key_ball SET key=${key},ball=${ball} WHERE user_id=${id}`)
        }
        let answer = await pool.query(`INSERT INTO answer_test(question_test_id,chosen_answer) VALUES
        ($1,$2) RETURNING *`,[question_test_id,chosen_answer])

        return res.status(201).json({
          status:201,
          massage:"Test answer succasfully added",
          data:answer.rows,
          correct:(isCorrect == chosen_answer) ? true : false,
          key,
          ball
      })
    } catch (error) {
        return next(new InternalServerError(500,error))
    }
}
const GET = async(req,res,next)=>{
    try {
        let {level,subject_id} = req.query
        let test = await pool.query(`SELECT * FROM question_test WHERE level = '${level}' and subject_id = '${subject_id}'`)
        test = test.rows

        const tests = []
        for (const el of test) {
            let s =await pool.query(`SELECT * FROM question_img WHERE question_test_id = '${el.id}'`)
            tests.push(s.rows[0])
        }
        console.log(tests);
        let s = test.map(el => {
            let t = tests.filter(e => e.question_test_id == el.id)
            el.imgTest = t[0]

            return el
        })
        console.log(s);
        return res.status(200).json({
            status:200,
            massage:"OK",
            data:s
        })
    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}

export default {
    POST_QUESTION,POST_ANSWER,GET
}
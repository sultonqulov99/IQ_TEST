import pool from '../config/db.js'
import nodemailer from 'nodemailer'
import {InternalServerError} from "../utils/errors.js"
import JWT from 'jsonwebtoken'
import sha256 from 'sha256'

function emailSender(userEmail,email_code){
  let res = true
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        
        auth: {
          user: 'omonov2006omonov@gmail.com', 
          pass: 'wkocegbefwfizukv'
        }
      });
    const mailOptions = {
        from: 'omonov2006omonov@gmail.com', 
        to: userEmail,
        subject: 'Tasdiqlash kodi',
        text: `Sizning tasdiqlash kod: ${email_code}`
      };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res = false
        } else {
          console.log('Xabar yuborildi: ' + info.response);
          res = true
        }
      });
    return res
}


const POST = async(req,res,next) => {
    try {
        let key = 0
        let ball = 0
        const email_code = Math.floor(Math.random() * 10000);
        let {name,surname,status_id,password,email} = req.body
        password = sha256(password)
        let login = await pool.query(`SELECT * FROM users WHERE email = '${email}' and password ='${password}'`)
        login = login.rows
        if(login.length != 0){
          return res.status(202).json({
            status:202,
            massage: "User already exists"
          })
        }
        if(emailSender(email,email_code)){
          let user = await pool.query(`INSERT INTO users(name,surname,email,status_id,password,email_code) VALUES
          ($1,$2,$3,$4,$5,$6) RETURNING *`,[name,surname,email,status_id,password,email_code])
          let key_ball = await pool.query(`INSERT INTO key_ball(user_id,key,ball) VALUES
          ($1,$2,$3) RETURNING *`,[user.rows[0].user_id,key,ball])
          return res.status(201).json({
            status:201,
            massage:"Confirm your email addres. We sent emailCode",
            data:user.rows,
            token: JWT.sign({userId: user.rows[0].user_id},'12345'),
        })  
        }
        return res.status(409).json({
          status:409,
          message:"Error"
        })
    } catch (error) {
      return next(new InternalServerError(500,error.massage))
    }
}
const GET = async(req,res,next)=>{
    try {
      let {emailCode} = req.params
      let user = await pool.query(`select * from users where email_code = '${emailCode}'`)
      user = user.rows
      if(user.length == 0){
        return res.status(404).json({
          status:404,
          massage:"No such email code exists",
        })
      }
      return res.status(200).json({
        status:200,
        massage:"Email found"
      })
    } catch (error) {
      return next(new InternalServerError(500,error.massage))
    }
}

const GET_STATUS = async(req,res,next) => {
  try {
    let {statusId} = req.params
    let subjects = await pool.query(`select * from subject where status_id = '${statusId}'`)
    subjects = subjects.rows
    if(subjects.length == 0){
      return res.status(404).json({
        status:404,
        massage:"Status not found",
        data:[]
      })
    }
    return res.status(200).json({
      status:200,
      massage:"ok",
      data:subjects
    })
  } catch (error) {
    return next(new InternalServerError(500,error.massage))
  }
}
const POST_LOGIN = async(req,res,next) =>{
    try {
      let {email,password} = req.body 
      password = sha256(password)
      let login = await pool.query(`SELECT * FROM users WHERE email = '${email}' and password ='${password}'`)
      login = login.rows
      if(login.length == 0){
        return res.status(404).json({
          status:404,
          massage:"User not found"
        })
      }
      return res.status(200).json({
        status:200,
        massage:login,
        token: JWT.sign({userId: login[0].user_id},'12345'),
      })
    } catch (error) {
      return next(new InternalServerError(500,error.massage))
    }
}
const POST_STATUS = async(req,res,next) => {
  try {
    let {name} = req.body
    let status = await pool.query(`INSERT INTO status(name) VALUES($1) RETURNING *`,[name])
    return res.status(201).json({
      status:201,
      massage:"Status succass added",
      data:status.rows
  })   
  } catch (error) {
    return next(new InternalServerError(500,error.massage))
  }
}

const POST_SUBJECT = async(req,res,next) => {
  try {
    let {name,status_id} = req.body
    let subject = await pool.query(`INSERT INTO subject(name,status_id) VALUES($1,$2) RETURNING *`,[name,status_id])
    return res.status(201).json({
      status:201,
      massage:"Subject succass added",
      data:subject.rows
  })   
  } catch (error) {
    return next(new InternalServerError(500,error.massage))
  }
}

const GET_USERS = async(req,res,next) => {
  try {
    let users = await pool.query(`SELECT * FROM users`)
    users = users.rows

    return res.status(200).json({
      status:200,
      massage:"All users",
      data:users
    })
  } catch (error) {
    return next(new InternalServerError(500,error.massage))
  }
}

const TOKEN_VERIFY = (req,res,next) => {
  try {
    let {token} = req.query
    let token_verify = JWT.verify(token,'12345')
    
    if(token_verify){
        return res.status(200).json({
          status:200,
          massage:"OK",
        })
    }
  } catch (error) {
    return next(new InternalServerError(500,error.massage))
  }
}



const STATUS = async(req,res,next) => {
  try {
    let status = await pool.query(`select * from status`)
    status = status.rows
    return res.status(200).json({
      status:200,
      massage:"ok",
      data:status
    })
  } catch (error) {
    return next(new InternalServerError(500,error.massage))
  }
}
export default {
    POST,
    GET,
    GET_STATUS,
    POST_LOGIN,
    POST_STATUS,
    POST_SUBJECT,
    GET_USERS,
    TOKEN_VERIFY,
    STATUS
}
import validation from "../midllewares/validation.js";
import controller from '../controllers/users.js'
import { Router } from "express";

const router = Router()

router.post('/api/register',validation,controller.POST)
router.post('/api/login',validation,controller.POST_LOGIN)
router.post('/api/statusAdd',validation,controller.POST_STATUS)
router.post('/api/subjectAdd',validation,controller.POST_SUBJECT)

router.get('/api/users/emailCode/:emailCode',controller.GET)
router.get('/api/users/statusId/:statusId',controller.GET_STATUS)
router.get('/api/users',controller.GET_USERS)
router.get('/api/users/token',controller.TOKEN_VERIFY)

export default router
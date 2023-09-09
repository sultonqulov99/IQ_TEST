import controller from '../controllers/test_img.js'
import { Router } from "express";

const router = Router()

router.post('/api/testImgAdd',controller.POST_QUESTION_IMG)
router.post('/api/testImgAnswer',controller.POST_ANSWER_IMG)

export default router
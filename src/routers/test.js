import controller from '../controllers/test.js'
import { Router } from "express";

const router = Router()

router.post('/api/testAdd',controller.POST_QUESTION)
router.post('/api/testAnswer/:id',controller.POST_ANSWER)
router.get('/api/testLevel',controller.GET)

export default router
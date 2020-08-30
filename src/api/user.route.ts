import { Router } from 'express'
import { signup } from '../services/user.services'

const router = Router()

router.route('/signup').post(signup)

export default router

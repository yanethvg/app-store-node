import { Router } from 'express'
import { signup, signin } from '../api/user.controller'

const router = Router()

router.route('/signup').post(signup)
router.route('/signin').post(signin)

export default router

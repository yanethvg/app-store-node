import { Router } from 'express'
import { signup, signin, signout } from '../api/auth.controller'
import { getUserById } from '../middleware/user.midleware'

const router = Router()

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/signout').get(signout)

// any route containing: userId, our app will first execute userById
router.param('userId', getUserById)

export default router

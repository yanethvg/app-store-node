import { Router } from 'express'
import { getUsers, getUser, updateUser, deleteUser } from '../api/user.controller'
import { getUserById } from '../middleware/user.middleware'
import { requireSignin } from '../middleware/auth.middleware'

const router = Router()

// use validate jwt
router.use(requireSignin)

router.route('/').get(getUsers)
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser)

// any route containing: userId, our app will first execute userById
router.param('userId', getUserById)

export default router

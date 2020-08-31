import { Router } from 'express'
import { getUsers, getUser, updateUser, deleteUser } from '../api/user.controller'
import { getUserById } from '../middleware/user.midleware'

const router = Router()

router.route('/').get(getUsers)
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser)

// any route containing: userId, our app will first execute userById
router.param('userId', getUserById)

export default router

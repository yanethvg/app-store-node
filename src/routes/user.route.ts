import { Router } from 'express'
import { getUsers, getUser, updateUser, deleteUser } from '../api/user.controller'
import { getUserById } from '../middleware/user.middleware'
import { requireSignin } from '../middleware/auth.middleware'

const router = Router()

router.route('/').get(requireSignin, getUsers)
router
  .route('/:userId')
  .get(requireSignin, getUser)
  .put(requireSignin, updateUser)
  .delete(requireSignin, deleteUser)

// any route containing: userId, our app will first execute userById
router.param('userId', getUserById)

export default router

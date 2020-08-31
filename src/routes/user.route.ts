import { Router } from 'express'
import { getUsers, getUser, updateUser, deleteUser } from '../api/user.controller'
import { getUserById } from '../middleware/user.middleware'
import { hasAuthorization } from '../middleware/auth.middleware'

const router = Router()

router.route('/').get(getUsers)
router
  .route('/:userId')
  .get(hasAuthorization, getUser)
  .put(hasAuthorization, updateUser)
  .delete(hasAuthorization, deleteUser)

// any route containing: userId, our app will first execute userById
router.param('userId', getUserById)

export default router

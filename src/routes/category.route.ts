import { Router } from 'express'
import { getUserById } from '../middleware/user.middleware'
import { requireSignin } from '../middleware/auth.middleware'
import {
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory
} from '../api/category.controller'

const router = Router()

// use validate jwt
router.use(requireSignin)

router.route('/').get(getCategories).post(createCategory)

router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory)

// any route containing: userId, our app will first execute userById
router.param('userId', getUserById)

export default router

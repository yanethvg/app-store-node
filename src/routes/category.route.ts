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
import { getCategoryById } from '../middleware/category.middleware'

const router = Router()

router.route('/').get(requireSignin, getCategories).post(requireSignin, createCategory)

router
  .route('/:categoryId')
  .get(requireSignin, getCategory)
  .put(requireSignin, updateCategory)
  .delete(requireSignin, deleteCategory)

// any route containing: userId, our app will first execute userById
router.param('userId', getUserById)
router.param('categoryId', getCategoryById)

export default router

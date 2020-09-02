import { Router } from 'express'
import { getUserById } from '../middleware/user.middleware'
import { requireSignin } from '../middleware/auth.middleware'
import { getCategoryById } from '../middleware/category.middleware'
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplication,
  updateStatusApplication
} from '../api/application.controller'

const router = Router()

// use validate jwt
router.use(requireSignin)

router.route('/').get(getApplications)

router.route('/status/:id').get(updateStatusApplication)

router.route('/:userId').post(getCategoryById, createApplication)

router
  .route('/:id')
  .put(getCategoryById, updateApplication)
  .delete(getCategoryById, deleteApplication)
  .get(getApplication)

// any route containing: userId, our app will first execute userById
router.param('userId', getUserById)

export default router

import { UserAfterLoginInterface } from '../../interfaces/auth.interface'
import { Category } from '../../models/Category'

declare global {
  namespace Express {
    export interface Request {
      currentUser: UserAfterLoginInterface
      auth: UserAfterLoginInterface
      category: Category
    }
  }
}

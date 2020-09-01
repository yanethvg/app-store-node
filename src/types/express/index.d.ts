import { UserAfterLoginInterface } from '../../interfaces/auth.interface'
declare global {
  namespace Express {
    export interface Request {
      currentUser: UserAfterLoginInterface
      auth: UserAfterLoginInterface
    }
  }
}

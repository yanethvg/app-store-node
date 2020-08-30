export interface UserInterface {
  id: number
  name: string
  email: string
  password: string
}

export interface UserAfterLoginInterface {
  id: number
  name: string
  email: string
  role: string
}
export interface UserTokenInterface {
  token: string
  user: UserAfterLoginInterface
}

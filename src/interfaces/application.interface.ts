import { CategoryInterface } from './category.interface'

export interface ApplicationInterface {
  id: number
  name: string
  price: number
  category: CategoryInterface
}

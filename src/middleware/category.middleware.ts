import { Request, Response, NextFunction, RequestParamHandler } from 'express'
import { Category } from '../models/Category'
import { getRepository } from 'typeorm'

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: RequestParamHandler
): Promise<void> => {
  try {
    const userRepository = getRepository(Category)
    const idCategory = Number(id)
    const category = await userRepository.findOne(idCategory)
    if (!category) {
      res.status(400).json({
        err: 'Category not found'
      })
      return
    } else {
      req.category = category
      next()
    }
  } catch (err) {
    next(err)
  }
}

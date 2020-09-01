import { Request, Response, NextFunction } from 'express'
import { Category } from '../models/Category'
import { getRepository } from 'typeorm'

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categoryRepository = getRepository(Category)
    await categoryRepository.findOneOrFail(req.body.categoryId)
    next()
  } catch (err) {
    res.status(400).json({
      err: 'Category not found'
    })
  }
}

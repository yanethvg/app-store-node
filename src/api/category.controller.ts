import { Request, Response } from 'express'
import { Category } from '../models/Category'
import { getRepository } from 'typeorm'

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryRepository = getRepository(Category)
    const categories = await categoryRepository.find()
    res.json({ categories })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const getCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryRepository = getRepository(Category)
    const category = await categoryRepository.findOne(req.category.id)
    res.json({ category })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryRepository = getRepository(Category)
    const category = await categoryRepository.create(req.body)
    await categoryRepository.save(category)
    res.json({
      message: 'Category created successfully'
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryRepository = getRepository(Category)
    const category = await categoryRepository.findOneOrFail(req.category.id)
    categoryRepository.merge(category, req.body)
    await categoryRepository.save(category)
    res.json({
      message: 'Category updated successfully'
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryRepository = getRepository(Category)
    await categoryRepository.delete(req.category.id)
    res.json({
      message: 'Category deleted successfully'
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

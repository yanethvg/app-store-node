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
    const userRepository = getRepository(Category)
    const idCategory = Number(req.params.id)
    const category = await userRepository.findOne(idCategory)
    if (!category) {
      res.status(400).json({
        err: 'Category not found'
      })
      return
    } else {
      res.json({ category })
    }
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
    const categorySave = await categoryRepository.save(category)
    res.json({
      message: 'Category created successfully',
      category: categorySave
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
    const idCategory = Number(req.params.id)
    const category = await categoryRepository.findOneOrFail(idCategory)
    categoryRepository.merge(category, req.body)
    const categorySave = await categoryRepository.save(category)
    res.json({
      message: 'Category updated successfully',
      category: categorySave
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
    const idCategory = Number(req.params.id)
    await categoryRepository.findOneOrFail(idCategory)
    await categoryRepository.delete(idCategory)
    res.json({
      message: 'Category deleted successfully'
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

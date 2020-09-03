import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Application } from '../models/Application'

export const getApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    const take = Number(req.query.take) || 2
    const currentPage = Number(req.query.page) || 1
    const skip = (currentPage - 1) * take
    const applicationRepository = getRepository(Application)

    const [applications, total] = await applicationRepository
      .createQueryBuilder('application')
      .innerJoin('application.user', 'user')
      //.innerJoinAndSelect('application.category', 'category') one to many
      .leftJoinAndSelect('application.categories', 'category')
      .addSelect(['user.id', 'user.name', 'user.role'])
      .orderBy('application.id', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount()

    res.json({ applications, count: total })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const getApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicationRepository = getRepository(Application)
    const application = await applicationRepository
      .createQueryBuilder('application')
      .innerJoin('application.user', 'user')
      .addSelect(['user.id', 'user.name', 'user.role'])
      //.innerJoinAndSelect('application.category', 'category') one to many
      .leftJoinAndSelect('application.categories', 'category')
      .where(`application.id = ${req.params.id}`)
      .getOne()

    if (!application) {
      res.status(400).json({
        err: 'Application not found'
      })
      return
    }
    res.json({ application })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const createApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicationRepository = getRepository(Application)
    const categories = req.categories
    const application = await applicationRepository.create({
      ...req.body,
      categories,
      userId: req.currentUser.id
    })
    await applicationRepository.save(application)
    res.json({
      message: 'Application created successfully'
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const updateApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicationRepository = getRepository(Application)
    const categories = req.categories
    const application = await applicationRepository.findOneOrFail(req.params.id)
    application.categories = categories
    applicationRepository.merge(application, req.body)
    await applicationRepository.save(application)
    res.json({
      message: 'Application updated successfully'
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const deleteApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicationRepository = getRepository(Application)
    await applicationRepository.findOneOrFail(req.params.id)
    await applicationRepository.delete(req.params.id)
    res.json({
      message: 'Application deleted successfully'
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const updateStatusApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const applicationRepository = getRepository(Application)
    const application = await applicationRepository.findOneOrFail(req.params.id)
    application.status = !application.status
    await applicationRepository.save(application)
    res.json({
      message: 'Application updated status successfully'
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm'
import { Application } from './Application'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number

  @Index({ unique: true })
  @Column()
  name!: string

  @OneToMany((type) => Application, (application) => application.category)
  applications!: Application[]
}

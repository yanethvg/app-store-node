import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { Category } from './Category'

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  price!: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date

  @ManyToOne((type) => Category, (category) => category.applications)
  category!: Category

  @Column({
    type: 'bytea',
    nullable: true
  })
  logo!: Buffer
}

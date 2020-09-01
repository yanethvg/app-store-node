import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
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

  @Column({
    default: false
  })
  status!: boolean

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date

  @Column({ type: 'int', nullable: true })
  categoryId!: number

  @ManyToOne((type) => Category, (category) => category.applications)
  @JoinColumn({ name: 'categoryId' })
  category!: Category

  @Column({
    type: 'bytea',
    nullable: true
  })
  logo!: Buffer
}

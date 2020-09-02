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
import { User } from './User'

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

  @Column({ type: 'int', nullable: true })
  userId!: number

  @ManyToOne(() => Category, (category) => category.applications)
  @JoinColumn({ name: 'categoryId' })
  category!: Category

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'userId' })
  user!: User

  @Column({
    type: 'bytea',
    nullable: true
  })
  logo!: Buffer
}

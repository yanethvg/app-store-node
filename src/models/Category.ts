import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number

  @Index({ unique: true })
  @Column()
  name!: string
}

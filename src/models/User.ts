import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm'
import { IsEmail } from 'class-validator'

export enum UserRole {
  ADMIN = 'admin',
  DEVELOPER = 'developer',
  CLIENT = 'client'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  name!: string

  @Index('UQ_user_email', { unique: true })
  @Column()
  @IsEmail()
  email!: string

  @Column({ nullable: false })
  password!: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT
  })
  role!: UserRole

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date
  /*
  @Column('blob', {
    nullable: true,
    name: 'graphic'
  })
  image!: Buffer*/
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, IsDate } from 'class-validator'

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
  firstName!: string

  @Column({ nullable: false })
  lastName!: string

  @Column({ nullable: false })
  @IsEmail()
  email!: string

  @Column({ nullable: false })
  hashed_password!: string

  @Column({ nullable: false })
  salt!: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
    nullable: false
  })
  role!: UserRole

  @Column({ nullable: false })
  @IsDate()
  createDate!: Date

  @Column({ nullable: false })
  @IsDate()
  updatedDate!: Date

  @Column('blob', { nullable: true })
  image!: Blob
}

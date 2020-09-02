import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany
} from 'typeorm'
import { IsEmail } from 'class-validator'
import { Application } from './Application'

export enum UserRole {
  ADMIN = 'admin',
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

  @OneToMany(() => Application, (application) => application.user)
  applications!: Application[]

  @Column({
    type: 'bytea',
    nullable: true
  })
  photo!: Buffer
}

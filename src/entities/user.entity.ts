import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import {Schedules} from "./scheduleUserProperties.entity";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column( {length:60 })
    name: string

    @Column({length: 60, unique: true})
    email: string

    @Column({length: 120})
    @Exclude()
    password: string

    @Column()
    isAdm: boolean

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Schedules, schedule => schedule.id)
    schedules: Schedules[]

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export {User}
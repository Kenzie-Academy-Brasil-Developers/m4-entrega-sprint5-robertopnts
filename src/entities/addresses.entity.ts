import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./properties.entity";

@Entity('addresses')
class Address{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 60})
    district: string

    @Column({length: 15, nullable: true})
    number: string

    @Column({length: 40})
    city: string

    @Column({length: 2})
    state: string

    @Column({length: 8})
    zipCode: string

    @OneToOne(() => Property) @JoinColumn()
    property: Property
}

export {Address}
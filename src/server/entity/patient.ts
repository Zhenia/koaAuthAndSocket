import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Patient {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

}
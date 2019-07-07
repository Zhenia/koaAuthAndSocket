import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    text: string;

    @Column()
    author: string;

    @Column()
    date: date;

}
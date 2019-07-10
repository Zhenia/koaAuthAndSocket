import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    text: string;

    @Column()
    author: string;

    @Column()
    date: Date;
}
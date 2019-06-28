import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
const crypto = require('crypto'); 

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(10, 80)
    name: string;

    @Column({
        length: 100
    })
    @Length(10, 100)
    @IsEmail()
    email: string;

    @Length(10, 80)
    password: string;

    @Length(10, 80)
    salt: string;

    async validatePassword(plainTextPassword: string) {
      //  if (!plainTextPassword) return false;
      //  if (!this.password) return false;
      //  return crypto.pbkdf2Sync(plainTextPassword, this.salt, 1, 128, 'sha1') == this.password;
        return (plainTextPassword==this.password)
    }

    async setPassword(plainTextPassword: string) {
        if (plainTextPassword) {
          this.salt = crypto.randomBytes(128).toString('base64');
          this.password = crypto.pbkdf2Sync(plainTextPassword, this.salt, 1, 128, 'sha1');
        } else {
          this.salt = undefined;
          this.password = undefined;
        }
    }

    async getPassword() {
        return this.password;
    }

}
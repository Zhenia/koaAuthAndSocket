import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(UserRepository)
export class UserRepository extends Repository<User> {

    findOrCreate(email: string) {
        this.findOne({email}).then((user)=>{
            console.log(999)

        })
    }

}
import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
const jwt = require('jsonwebtoken');
import { config } from '../config/config';
export default class AuthController {
    public static async login (ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const user: User = await userRepository.findOne({
            email: ctx.request.body.email,
            password: ctx.request.body.password
        });
        if (user) {
            const payload = {
                id: user.id,
                displayName: user.name,
                email: user.email
            };
            const token = jwt.sign(payload, config.jwtSecret);
            ctx.body = {user: user.name, token: 'JWT '+token};
            ctx.status = 200;
        } else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    }

    public static async googleAuth (ctx: BaseContext) {
        if (ctx.isAuthenticated()){
            const user = ctx.state.user;
            const payload = {
                id: user.id,
                displayName: user.name,
                email: user.email
            };
            const token = jwt.sign(payload, config.jwtSecret);
            // @todo надо дописать вход через JWT и iframe 
            ctx.body = {user: user.name, token: 'JWT '+token};
            ctx.status = 200;
        }
        else {
            ctx.status = 400;
            ctx.body = { status: 'error' };
        }
    }
}
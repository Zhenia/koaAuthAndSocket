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

    public static async googleSuccess (ctx: BaseContext) {
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

    public static async googleFailure (ctx: BaseContext) {
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
}
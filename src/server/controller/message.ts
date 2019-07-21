import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Message } from '../entity/message';

interface dataMap { [s: string]: string; }

export default class MessageController {
    
    public static async createMessage (data: dataMap ) {
        const messageRepository: Repository<Message> = getManager().getRepository(Message);
        const messageToBeSaved: Message = new Message();
        messageToBeSaved.text = data.text;
        messageToBeSaved.author = data.userId;
        messageToBeSaved.date = new Date();

        const errors: ValidationError[] = await validate(messageToBeSaved);

        if (errors.length > 0) {
           console.error('Error');
        } else {
            const user = await messageRepository.save(messageToBeSaved);
        }

    }

    public static async list () {
        const messageRepository: Repository<Message> = getManager().getRepository(Message);
        const messageList: Message[] = await messageRepository.find();
        return messageList;
    }

    public static async getMessages (ctx: BaseContext,next) {
        const messageRepository: Repository<Message> = getManager().getRepository(Message);
        const messageList: Message[] = await messageRepository.find();
        ctx.status = 200;
        ctx.body = messageList;
        
    }

}
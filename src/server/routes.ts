import * as Router from 'koa-router';
import controller = require('./controller');
import {passport} from './passport';
const router = new Router();

// GENERAL ROUTES
//router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// USER ROUTES
router.get('/users', controller.user.getUsers);
router.post('/login', controller.user.login);
router.get('/getUsername', controller.user.getUserName);
router.get('/users/:id', controller.user.getUser);
router.post('/users', controller.user.createUser);
router.put('/users/:id', controller.user.updateUser);
router.delete('/users/:id', controller.user.deleteUser);

function veryfyToken (req,res,next){
    var bearerHeader = req.headers['authorization'];
    console.log(req.req);
}

export { router };
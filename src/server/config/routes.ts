import * as Router from 'koa-router';
import controller = require('./../controller');
import {passport} from './passport';
const router = new Router();

// GENERAL ROUTES
//router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// USER ROUTES
router.get('/users', controller.user.getUsers);
router.post('/login', controller.auth.login);
router.get('/getUsername', passport.authenticate('jwt', { session: false }), controller.user.getUserName);
router.get('/users/:id', controller.user.getUser);
router.post('/users', controller.user.createUser);
router.put('/users/:id', controller.user.updateUser);
router.delete('/users/:id', controller.user.deleteUser);

// MESSAGES ROUTES
router.get('/messages', controller.message.getMessages);


router.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));

router.get( '/auth/google/callback', 
    passport.authenticate('google', 
    { scope:	[ 'email', 'profile' ] }), controller.auth.googleAuth);

export { router };
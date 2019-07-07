import * as Router from 'koa-router';
import controller = require('./../controller');
import {passport} from './passport';
const router = new Router();

// GENERAL ROUTES
//router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// USER ROUTES
router.get('/users/list', controller.user.getUsers);
router.post('/login', controller.auth.login);
router.get('/getUsername', passport.authenticate('jwt', { session: false }), controller.user.getUserName);
router.get('/users/:id', controller.user.getUser);
router.post('/users', controller.user.createUser);
router.put('/users/:id', controller.user.updateUser);
router.delete('/users/:id', controller.user.deleteUser);


router.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));
 
router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

router.get('/auth/google/success',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
    ),controller.auth.googleSuccess);

router.get('/auth/google/failure',controller.auth.googleFailure);

export { router };
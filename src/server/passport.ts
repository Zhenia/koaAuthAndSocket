import * as passport from 'koa-passport';
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt; 
import { getManager, Repository, Not, Equal } from 'typeorm';
import { User } from './entity/user';
import { config } from './config';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });



passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, (username, password, done) => {
     const userRepository = getManager().getRepository(User);
     return userRepository.findOne({email:username})
  .then((user) => {
    if (!user) return done(null, false, {message:'email error'});
    if (user.validatePassword(password)) {
      return done(null, user);
    } else {
      return done(null, false, {message:'password error'});
    }
  })
  .catch((err) => { return done(err); });
}));

const jwtOptions = {
  jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) =>{
  console.log(payload);
  const userRepository = getManager().getRepository(User);
  return userRepository.findOne(payload.id).
  then((user) => {
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  .catch((err) => { return done(err); });
  })
);
export { passport };
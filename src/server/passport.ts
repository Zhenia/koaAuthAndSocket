import * as passport from 'koa-passport';
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt; 
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
import { getManager, Repository, Not, Equal, getConnection,getCustomRepository } from 'typeorm';
import { User } from './entity/user';
import { config } from './config';
import * as dotenv from 'dotenv';
import {UserRepository} from './repository/UserRepository';
dotenv.config({ path: '.env' });
 getCustomRepository(UserRepository); 


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
  jwtFromRequest:  ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.jwtSecret
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) =>{
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


 
passport.use(new GoogleStrategy({
    clientID:     config.google_client_id,
    clientSecret: config.google_client_secret,
    callbackURL: config.domain+"/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    const userRepository = getManager().getRepository(User);
    console.log(profile);
   // userRepository.findOrCreate({ googleId: profile.id }, function (err, user) {
    //  return done(err, user);
   // });
  }
));


export { passport };
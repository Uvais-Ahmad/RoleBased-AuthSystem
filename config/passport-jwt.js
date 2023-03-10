const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');    

const opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken() ,
    secretOrKey : 'uvaisDeveloper'
}


passport.use(new JWTStrategy(opts , function( jwtPayload , done){
    //now find the user
    User.findById(jwtPayload._id ,  function(user , err){
        if(err){ console.log('Error in finding the user : ',err); return;}

        if(user){
            return done(null , user)
        }
        else{
            return done(null , false);
        }
    })
}))

module.exports = passport;
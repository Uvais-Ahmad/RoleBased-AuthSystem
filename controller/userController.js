const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const logger = require('../logger');

// Homepage
module.exports.home = function( req , res ){
    return res.render('_home',{
        title:"Home RB Auth"
    })
}


module.exports.login = function( req , res ){
    res.render('_logIn',{
        title : 'Log In'
    });
}


// Create a new account in DB while signUp
 
module.exports.register = async function(req , res ){
    try{
        let data = req.body;
        //check user passwords
        if(data.pass != data.confirm_pass){
            logger.warn("Both password not equal");
            return res.redirect('back');
        }

        //Check user is already register
        let existUser = await User.findOne({email : data.email});
        if(existUser){
            
            return res.render('_logIn',{
                title : 'Log In'
            })
        }
        else{
            // Generate hash password
            let salt = await bcrypt.genSalt(saltRounds);
            let hash = await bcrypt.hash(data.pass , salt);

            //create User and store hash password
            let user = await User.create({name :data.name , email : data.email ,password : hash });
            
            return res.redirect('/');
        }
    }
    catch(err){
        logger.error(err)
        return res.redirect('back');
    }     
}


//SecretOrkey : uvaisDeveloper


module.exports.createSession = async function( req , res ){
    try{
        let data = req.body;
        //find via email
        
        let user = await User.findOne({email : data.email});
        
        let isMatch;
        if(user ){
            isMatch = await bcrypt.compare(data.pass , user.password);
        }
        
        if( !user || !isMatch){
            return res.redirect('back');
        }

        let token =await jwt.sign(user.toJSON() , 'uvaisDeveloper' , {expiresIn : '100000000'} );

        res.locals.user = user;
        // user is found
        
        return res.cookie("access_token",token).redirect('/');

    }
    catch( err ){
        logger.error("Error while logIn : ",err);
        return res.redirect('back');
    }
}   


module.exports.logOut = function(req , res ){

    return res.clearCookie("access_token").redirect('/logIn');
}

module.exports.dashboard = function( req , res ){
    return res.render('_dashboard',{
        title : "Dashboard"
    })
}
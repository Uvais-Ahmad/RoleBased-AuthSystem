const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
            // return res.status(401).json({
            //     message : "Both password and confirm password must equal"
            // })
            console.log("Both password not equal");
            return res.redirect('back');
        }

        //Check user is already register
        let existUser = await User.findOne({email : data.email});
        if(existUser){
            // return res.status(409).json({
            //     message : "Already you have an account , Please login with same mail "
            // })
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
            console.log("User created ",user);
            return res.redirect('/');
            // return res.status(200).json({
            //     message : "Successfully Account created",
            //     data : {
            //         user : user
            //     }
            // })
        }
    }
    catch(err){
        console.log(err)
        return res.redirect('back');
        // return res.status(400).json({
        //     message : "Error while register user"
        // })
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
            // return res.status(401).json({
            //     message : "Invalid username and password"
                
            // })
            return res.redirect('back');
        }

        let token =await jwt.sign(user.toJSON() , 'uvaisDeveloper' , {expiresIn : '100000000'} );

        res.locals.user = user;
        // user is found
        console.log("LogggedInUser ",user);
        return res.cookie("access_token",token).redirect('/');

        // return res.cookie("access_token",token).status(200).json({
        //     message : "SignIn successfull",
        //     data : {
        //         //here we generate the token using encrpt key "codeial"
        //         access_token : token 
        //     }
        // })
    }
    catch( err ){
        console.log("Error while logIn : ",err);
        // return res.status(400).json({
        //     message : "Error while login"
        // })

        return res.redirect('back');
    }
}   


module.exports.logOut = function(req , res ){

    // let access_token = req.cookies.access_token;

    // return res.clearCookie("access_token").status(200).json({
    //     message : "logOut successfully"
    // })
    return res.clearCookie("access_token").redirect('/logIn');
}

module.exports.dashboard = function( req , res ){
    return res.render('_dashboard',{
        title : "Dashboard"
    })
}
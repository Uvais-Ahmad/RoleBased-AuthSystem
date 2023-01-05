const User = require('../models/user');

module.exports.signUp = function( req , res ){
    //if requested user is not admin we cant show signUp page
    if(!req.user.isAdmin){
        return res.redirect('back');
    }

    res.render('_signUp',{
        title : 'Sign Up'
    })
}


module.exports.allMember = function( req , res ){
    User.find( {} , function(err , users ){
        if(err){ console.log('Error occur while finding employes');}

        if(req.user.isAdmin){
            return res.render('_allMember',{
                title : "All Members",
                users : users
            });
        }
        else{
            return res.redirect('/');
        }
    })
}
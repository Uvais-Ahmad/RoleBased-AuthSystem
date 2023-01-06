const logger = require('../logger');
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
        if(err){ logger.error('Error occur while finding employes');}

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


module.exports.deleteMember = function( req , res ){
    let id = req.params.id;
    if(!req.user.isAdmin){return res.redirect('/');}
    User.findByIdAndRemove(id , function( err , user ){
        if(err){ logger.error('Error occur while updating'); return; }
        return res.redirect('back');
    })
}

module.exports.biling = function( req , res ){
    return res.render('_biling',{
        title : "Biling"
    })
}
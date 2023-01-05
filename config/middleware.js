const jwt = require('jsonwebtoken');
const authenticateToken = (req , res , next )=>{
    
    const token = req.cookies.access_token;
    if(!token ){
        // return res.status(403).json({
        //     message : "Token missing"
        // })
        return res.redirect('/logIn');
    }
    const decoded_token = jwt.verify(token ,'uvaisDeveloper');
    if( !decoded_token ){
        // return res.status(401).json({
        //     message : "UnAuthorisez user"
        // })
        return res.redirect('/logIn');
    }
    req.user = decoded_token;
    res.locals.user = req.user;
    return next();
}
module.exports = authenticateToken;
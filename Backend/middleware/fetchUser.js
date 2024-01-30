const jwt = require('jsonwebtoken');
const JWT_SECRET = 'DURGAP&SWAIN@123'

const fetchUser = (req,res,next) => {
    //Get the user from the jwt token and add ID as req object
    
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:'Please authantcicate using a valid token'})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next();

    } catch (error) {
        return res.status(401).json({error:'Please authantcicate using a valid token'})
    }

    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user


    
}


module.exports = fetchUser;